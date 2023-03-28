// const express = require('express')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const express = require("express");
const cors = require('cors');
const axios = require("axios");
const app = express();
const bodyParser = require("body-parser");
const querystring = require('querystring');
const geohash = require('ngeohash');
//const fs = require('fs');
let API_KEY = '3d6TMT9FEQ-Y93jPJTrPTFQXO1leS088w9e33d5xi40AX6_hQO8ht5Abu8Xv4ZqOngZ-mxx99mdjmLzj9LMIZkqYAkjkEDE4kGoWW2B-1KkUUM8O0sxQOoUn4EM5Y3Yx';
//定义Ticketmaster API密钥
var TM_API_KEY = 'AzXDl3G5mMF367WR2AgZok1yYIIcdlsR'
//define geocoding key(google cloud platform api)
GOOGLE_GEOCODING_KEY = 'AIzaSyBIOiZOjHy7QFvCNF4qTtHRxMPdAkx2kmA'



let API_HOST = 'api.yelp.com';
let SEARCH_PATH = '/v3/businesses/search';
let BUSINESS_PATH1 = '/v3/businesses/';
let CATEGORY_PATH = '/v3/categories';
let AUTO_PATH = '/v3/autocomplete';
// let HEADERS = {
//   // 'Authorization': 'Bearer ' + API_KEY,
//   'Authorization':"https://app.ticketmaster.com/discovery/v2/events.json?apikey="+TM_API_KEY
// };

// app.use(bodyParser.json());
// app.use(express.static(process.cwd()+"/busi-search/dist/busi-search"))

// app.get('/', (req,res)=> {
//   res.sendFile(process.cwd()+"/busi-search/dist/busi-search/index.html");
// });
// app.get('/search', (req,res)=> {
//   res.sendFile(process.cwd()+"/busi-search/dist/busi-search/index.html")
// });



app.use(cors({
  origin: '*'
}))

// Enable CORS for all routes
app.options('*', cors());

// app.use(cors());



// app.use(cors());

// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'https://localhost:4200');
//   next();
// });

// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'https://localhost:8080');
//   next();
// });

app.get('/getTable', (req, res) => {

  console.log(req.query);
  let keyword = req.query.key;
  let distance = req.query.dist;
  let category = req.query.cat;
  let location = req.query.loc;
  var lat = 0;
  var lng = 0;
  var latitude = 0;
  var longitude = 0;
  //console.log(process.cwd());

    console.log("distance="+distance);
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

  // console.log(distance);
  // console.log(keyword);
  //console.log(req.query);
  //console.log(req.query.autoLoc);
  if (req.query.autoLoc=='true') {
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

    console.log("auto param= "+params);

    const geocode = geohash.encode(lat, lng, precision=7);
    console.log("geocode1:"+geocode); 

    // ticketmaster search
    var url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey='+TM_API_KEY+'&keyword='+keyword+'&segementId'+segmentId +'&radius='+distance+'&unit=miles'+'&geoPoint='+geocode;
    // console.log(HEADERS);
    axios.get(url)
      .then((response) => {
        console.log(response.data);
        const events = response.data._embedded.events.map(event => ({
          name: event.name,
          date: event.dates.start.localDate,
          time: event.dates.start.localTime,
          venue: event._embedded.venues[0].name,
          imageUrl: event.images[0].url,
          url: event.url
        }));

        res.send(JSON.stringify(events));
        // res.send(response.data.businesses);

         console.log("auto detection");
      }) 
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while searching for events' });
      });
  }
  else {
    let loc_url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=AIzaSyBIOiZOjHy7QFvCNF4qTtHRxMPdAkx2kmA';
    // console.log(loc_url);
    axios.get(loc_url)
      .then((response) => {lat = response.loc.results[0].geometry.location.lat;
        response.loc.results[0].geometry.location.lng; console.log("address is translated to lat and lng!");
      let params = {
        keyword: keyword,
        latitude: lat,
        longitude: lng,
        // categories: category,
        segmentId: segmentId,
        // radius: radius
        distance: distance
      }

      console.log("un-auto param= "+params);

      const geocode = geohash.encode(latitude, longitude, precision=7);
      console.log("geocode2"+geocode); 

      var url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey='+TM_API_KEY+'&keyword='+keyword+'&segementId'+segmentId +'&radius='+distance+'&unit=miles'+'&geoPoint='+geocode;

      // var url = 'https://' + API_HOST + SEARCH_PATH;
      // console.log(HEADERS);
      axios.get(url)
      .then((response) => {
        const events = response.data._embedded.events.map(event => ({
          name: event.name,
          date: event.dates.start.localDate,
          time: event.dates.start.localTime,
          venue: event._embedded.venues[0].name,
          imageUrl: event.images[0].url,
          url: event.url
        }));

        res.header("Access-Control-Allow-Origin","*");


        res.json(events);
        // res.send(response.data.businesses);

         console.log("auto detection");
      }) 
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while searching for events' });
      });
    })

  }
})

app.get("/autoComplete", function(req, res) {
  let keyword = req.query.key;
  var auto_url = 'https://app.ticketmaster.com/discovery/v2/suggest?apikey='+TM_API_KEY+'&keyword' + keyword;
  // console.log(keyword);

  axios.get(auto_url)
    .then((response) => {

      // console.log(response.data.businesses[0].categories);
      // console.log(response.data.businesses[0].location.display_address);
      //console.log(response.data.businesses);
      // console.log(response.data);
      response.data.categories.map((item) => {delete item.alias; item['text'] = item.title; delete item.title;});
      
      res.header("Access-Control-Allow-Origin","*");
      
      //console.log(response.data.terms.concat(response.data.categories));
      res.send(response.data.terms.concat(response.data.categories));
    })


});

app.get("/card", function(req, res) {
  let id = req.query.id;
  var card_url = 'https://' + API_HOST + BUSINESS_PATH1 + id;
  axios.get(card_url)
    .then((response) => {

      // console.log(response.data.businesses[0].categories);
      // console.log(response.data.businesses[0].location.display_address);
      //console.log(response.data.businesses);

      // console.log(response.data.photos);
      res.send(response.data.photos);
    })
    .catch(function(error) {
      console.log(error);
    });

});

app.get("/review", function(req, res) {
  let id = req.query.id;
  var review_url = 'https://' + API_HOST + BUSINESS_PATH1 + id + '/reviews';
  // console.log(review_url);
  axios.get(review_url)
    .then((response) => {

      response.data.reviews.map((item) => {
        delete item.id;
        delete item.url;
        item.user = item.user.name;
      })

      // console.log(response.data.businesses[0].categories);
      // console.log(response.data.businesses[0].location.display_address);
      //console.log(response.data.businesses);

      // console.log(mapped_review);
      // console.log(response.data.reviews);

      //console.log(response.data.reviews[0].user);
      res.send(response.data.reviews);
    })
    .catch(function(error) {
      console.log(error);
    });

});

// const port = parseInt(process.env.PORT) ||8080;
// app.listen(port, function() {
//   console.log("server is running");
// });
app.listen(8080, () => {
  console.log('Server listening on port 8080');
});