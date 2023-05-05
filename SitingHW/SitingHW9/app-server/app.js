const express = require("express");
const cors = require('cors');
const axios = require("axios");
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const querystring = require('querystring');
// const geohash = require('ngeohash');
const geohash = require('ngeohash');
// const geohash = require('geohash');

const SpotifyWebApi = require('spotify-web-api-node');
//define Ticketmaster API key
var TM_API_KEY = 'AzXDl3G5mMF367WR2AgZok1yYIIcdlsR'
//define geocoding key(google cloud platform api)
GOOGLE_GEOCODING_KEY = 'AIzaSyCNWAB2YD-iQQnV7ULpUopcC29QiXdhBOw'
//define spotify api key

var clientId = '8620c9cdbe594fb9931a885c205f4579',
clientSecret = '15b4636c18b84a4ba6909dcc0b01fdb1';



// Create the api object with the credentials
var spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant().then(
  function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  },
  function(err) {
    console.log('Something went wrong when retrieving an access token', err);
  }
);




app.use(cors({
  origin: '*'
}))

// Enable CORS for all routes
app.options('*', cors());

app.get("/autoComplete", function(req, res) {
    const keyword = req.query.key;
    var auto_url = 'https://app.ticketmaster.com/discovery/v2/suggest?apikey='+TM_API_KEY+'&keyword=' + keyword;
    // console.log(keyword);
  
    axios.get(auto_url)
      .then((response) => {

        var suggestion = [];
        var suggestion_count = 0;
        

        // console.log(response.data._embedded.venues);
        response.data._embedded.attractions.forEach(attraction => {
            console.log(attraction.name);
            if (attraction.name !== 0 && suggestion_count < 6) {
                
                const hash = { text: attraction.name  };

                 suggestion.push(hash);
                // suggestion["text"]= attraction.name;

                 suggestion_count++;
               
            }
        });
        suggestion_count = 0;
        console.log(keyword.toLowerCase());
        console.log(suggestion);

  
        res.header("Access-Control-Allow-Origin","*");
        res.send(suggestion);
       
      
        //   res.send(events);
      //   res.send(response.data.terms.concat(response.data.categories));
  
       
  
      })
  
  
  });


app.get('/getLoc', (req, res) => {

    console.log("input location by client!!!");
  
    let location = req.query.loc;
   

    let loc_url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=AIzaSyBIOiZOjHy7QFvCNF4qTtHRxMPdAkx2kmA';

    axios.get(loc_url)
      .then((response) => {
        lat = response.data.results[0].geometry.location.lat;
        lng =response.data.results[0].geometry.location.lng; 
        console.log("address is translated to lat and lng:"+"lat= "+lat+"+","+lng= "+lng);
        console.log(response.data);

        res.send(response.data.results[0].geometry.location);
 
    })
  
      
  
 
  
  });



app.get('/getTable', (req, res) => {

  console.log(req.query);

  let keyword = req.query.key;
  let distance = req.query.dist;
  let category = req.query.cat;
  let lat = req.query.lat;
  let lng = req.query.lng;
//   let location = req.query.loc;
//   var lat = 0;
//   var lng = 0;
//   var latitude = 0;
//   var longitude = 0;

console.log("in server.js now!!!"+distance);

console.log(keyword);
console.log(distance);
console.log(category);
console.log(lat);
console.log(lng);
console.log(req.query);
  // distance = parseFloat(distance);
  // let radius = Math.floor(distance * 1609.344);

  const segment_Id = {
    "default": "",
    "music": "KZFzniwnSyZfZ7v7nJ",
    "sports": "KZFzniwnSyZfZ7v7nE",
    "artstheatre": "KZFzniwnSyZfZ7v7na",
    "film": "KZFzniwnSyZfZ7v7nn",
    "miscellaneous": "KZFzniwnSyZfZ7v7n1"
};

   var segmentId = segment_Id[category]
  
    lat = parseFloat(req.query.lat);
    lng = parseFloat(req.query.lng);

    let params = {
      keyword: keyword,
      latitude: lat,
      longitude: lng,
      // categories: category,
      segmentId: segmentId,
      // radius: radius
      distance: distance
      // limit: 10
    }

    console.log("params:");
    console.log(params);

    const geocode = geohash.encode(params.latitude, params.longitude, precision=7);
    console.log("geocode: "+geocode); 

    // ticketmaster search
    var url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey='+TM_API_KEY+'&keyword='+keyword+'&segementId='+segmentId +'&radius='+distance+'&unit=miles'+'&geoPoint='+geocode;
    console.log(url);
    axios.get(url)
      .then((response) => {
        console.log(response.data);

        res.header("Access-Control-Allow-Origin","*");

        const events = response.data._embedded.events.map(event => ({
            eventName: event.name,
            date: event.dates.start.localDate,
            time: event.dates.start.localTime? event.dates.start.localTime: null,
            image_url: event.images? event.images[0].url : null,
            venue: event._embedded.venues[0].name ,
          
            id: event.id,
            artist_team: event._embedded.attractions? event._embedded.attractions[0].name : null,
            genre: event.classifications&&event.classifications[0].genre ? event.classifications[0].genre.name : null,
            subGenre: event.classifications&& event.classifications[0].subGenre ? event.classifications[0].subGenre.name : null,
            segment: event.classifications&&event.classifications[0].segment ? event.classifications[0].segment.name : null,
            // Genre: event.classifications ? event.classifications[0] : null,

            price_min: event.priceRanges ? event.priceRanges[0].min : null,
            price_max: event.priceRanges? event.priceRanges[0].max : null,
            status: event.dates.status ? event.dates.status.code : null, 
            seatmap: event.seatmap ? event.seatmap.staticUrl : null,
            ticket_url: event.url,
          
            address1: event._embedded.venues? event._embedded.venues[0].address.line1 : null,
            city: event._embedded.venues? event._embedded.venues[0].city.name : null,
            stateCode: event._embedded.venues? event._embedded.venues[0].state.stateCode : null,
            postalCode: event._embedded.venues? event._embedded.venues[0].postalCode : null,
          
            openHours: event._embedded.venues && event._embedded.venues[0].boxOfficeInfo ? event._embedded.venues[0].boxOfficeInfo.openHoursDetail : null,
            phoneNumber: event._embedded.venues && event._embedded.venues[0].boxOfficeInfo ? event._embedded.venues[0].boxOfficeInfo.phoneNumberDetail : null,
            generalRule: event._embedded.venues && event._embedded.venues[0].generalInfo ? event._embedded.venues[0].generalInfo.generalRule : null,
            childRule: event._embedded.venues && event._embedded.venues[0].generalInfo ? event._embedded.venues[0].generalInfo.childRule : null,
          
            // coordinates: event._embedded.venues && event._embedded.venues[0].location ? event._embedded.venues[0].location : null,

            latitude: event._embedded.venues && event._embedded.venues[0].location ? event._embedded.venues[0].location.latitude : null,
            longitude: event._embedded.venues && event._embedded.venues[0].location ? event._embedded.venues[0].location.longitude : null


          }));
          
      
        res.send(events);
          
        // res.send(response.data._embedded.events);

         
      }) 
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while searching for events' });
      });
  

})



app.get("/getSpotify", function(req, res) {
  // let id = req.query.id;
  console.log(req.query);
  const spotifyKeyword = req.query.attraction;

  // Retrieve an access token.
  spotifyApi.clientCredentialsGrant().then(
  function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);

    axios.get('https://api.spotify.com/v1/search?', {
      headers: {
       'Authorization': 'Bearer ' + spotifyApi.getAccessToken()
      },
      params: {
        // q: ' '+spotifyKeyword+' ',
        q: spotifyKeyword,
        type: 'artist'
      }
    }).then(response => {
    // Process the artist data
    console.log(response.data.artists.items[0].id);

    const artistName = response.data.artists.items[0].name.toLowerCase();
    if (artistName.includes(spotifyKeyword.toLowerCase())) {
    // if (artistName === spotifyKeyword) {
    // The artist name contains the exact search term
      console.log(artistName+" = "+spotifyKeyword+" !");

      const items = response.data.artists.items.map(item => ({
       
        id: item.id,
        artist_name: item.name,
        spotify_image: item.images&&item.images[0]&&item.images[0].url? item.images[0].url: null,
        followers: item.followers.total,
        popularity: item.popularity,
        spotify_link: item.external_urls.spotify


      }));

    //   res.send(response.data);
     res.send(items);
    
    }else{
      res.send([]);
    }

    }).catch(error => {
      console.error(error);
    });

  },
  function(err) {
    console.log('Something went wrong when retrieving an access token', err);
  }
);


});

app.get("/getAlbum", function(req, res) {
  let artistId = req.query.artistId;

  console.log("artistId = :"+artistId)   

    axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
      headers: {
        'Authorization': 'Bearer ' + spotifyApi.getAccessToken()
      },
      params: {
        limit: 3
      }
    }).then(response => {
      // Process the album data
      console.log(response.data.items[0].image[0].url);
    //   let albums = response.data.items[0].image;
      const albums = [response.data.items[0].image[0].url,response.data.items[0].image[1].url,response.data.items[0].image[2].url];
    //   const albumCovers = albums.map(album => ({
    //     album: album.url
        // album_0: album.images && album.images[0].url ? album.images[0].url[0] : null,
        // album_1: album.images && album.images[0].url ? album.images[0].url[1] : null,
        // album_2: album.images && album.images[0].url ? album.images[0].url[2] : null,

    //   }));
      res.send(albums);

    }).catch(error => {
      console.error(error);
    });

  // }).catch(error => {
  //   console.error(error);
  // });
});




const port = parseInt(process.env.PORT) ||8080;
app.listen(port, function() {
  console.log("server is running");
});
// app.listen(8080, () => {
//   console.log('Server listening on port 8080');
// });