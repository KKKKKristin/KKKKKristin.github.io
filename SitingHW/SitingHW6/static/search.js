//import $ from 'jquery';

var jsonArray;
var jsonEvent;
var address;
var latitude;
var longitude;

var sort_incending_event = 1;
var sort_incending_genre = 1;
var sort_incending_venue = 1;



// 定义IPInfo API密钥
IPINFO_API_TOKEN = "e10417f04ac5a2"
IPINFO_URL = "https://ipinfo.io/?token=e10417f04ac5a2"

// 定义Ticketmaster API密钥
TM_API_KEY = 'AzXDl3G5mMF367WR2AgZok1yYIIcdlsR'



// Add event listener to search button
document.getElementById('searchButton').addEventListener('click', searchEvents);



function searchEvents() {
  // 获取用户输入的距离和事件名称
  
   var distance = document.getElementById("distanceInput").value;
   var event = document.getElementById("eventInput").value;
   var category = document.getElementById("category").value;
  //get address by ipinfo or geocode


  var checkbox = document.getElementById("checkbox");
  if(checkbox.checked==true){
     AddressAutoDetection();
  }else{
     AddressFromInput();
  }

}

function AddressAutoDetection(){

  var distance = document.getElementById("distanceInput").value;
   var event = document.getElementById("eventInput").value;
   var category = document.getElementById("category").value;

   async function getLocation() {
    try {
      const response = await fetch(IPINFO_URL);
      const data = await response.json();
      const { loc } = data;
      const [latitude, longitude] = loc.split(",");
      // 调用新函数，并传递经纬度参数
      sendSearchRequest(latitude, longitude, distance, event, category);

    } catch (error) {
      console.error(error);
    }
   }  
    getLocation();
  //  fetch(IPINFO_URL)
  //  .then(response => response.json())
  //  .then(data => {
  //    const { loc } = data;
  //    [latitude, longitude] = loc.split(",");
  //    console.log(latitude, longitude);
  //  })
  //  .catch(error => console.error(error));
 
  //  if(typeof latitude!=="undefined" && typeof longitude !== "undefined"){
  //   sendSearchRequest(latitude, longitude, distance, event, category);
  //  }

  // fetch(IPINFO_URL)
  // .then(response => response.json())
  // .then(data => {
  //   address = data.loc;
  //   console.log(address);
  // })
  // .catch(error => console.error(error));



  
  // // GET request python'/geocode_api/<address>'获取地址对应的经纬度
  // var xhr = new XMLHttpRequest();
  
  // xhr.onreadystatechange = function() {
 

  //   if (xhr.readyState === 4 && xhr.status === 200) {
  //     var response = JSON.parse(xhr.responseText);
  //     console.log(response);
  //      var latitude = response.loc.results[0].geometry.location.lat;
  //      var longitude = response.loc.results[0].geometry.location.lng;
  //      //将经纬度发送到后台的Python脚本进行处理
  //     sendSearchRequest(latitude, longitude, distance, event, category);
  //     console.log(response);

   
  //   }
  // }
  // xhr.open("GET", '/ip_api/'+ address, true);
  // xhr.send();

}

function AddressFromInput(){
  var distance = document.getElementById("distanceInput").value;
   var event = document.getElementById("eventInput").value;
   var category = document.getElementById("category").value;

  var address = document.getElementById("addressInput").value;
    // GET request python'/geocode_api/<address>'获取地址对应的经纬度
    var xhr = new XMLHttpRequest();
  
    xhr.onreadystatechange = function() {
   
  
      if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
         var latitude = response.loc.results[0].geometry.location.lat;
         var longitude = response.loc.results[0].geometry.location.lng;
         //将经纬度发送到后台的Python脚本进行处理
        sendSearchRequest(latitude, longitude, distance, event, category);
        console.log(response);
  
     
      }
    }
    xhr.open("GET", '/ip_api/'+ address, true);
    xhr.send();
  
}


//定义发送请求的函数sendsearchrequest()
function sendSearchRequest(latitude, longitude, distance, event, category) {
  console.log("lat = "+latitude)
  // 使用XMLHttpRequest发送GET请求
  var xhr = new XMLHttpRequest();
  var url = "/search?latitude=" + latitude + "&longitude=" + longitude + "&distance=" + distance + "&event=" + event + "&category=" + category;
  
  //xhr.setRequestHeader("Content-Type", "application/json");
 
  xhr.onreadystatechange = function() {
 
    if (this.readyState === 4 && this.status === 200) {
      // 解析JSON响应并显示结果
      var response = JSON.parse(this.responseText);
      jsonArray = response;
       console.log(jsonArray);
       displaySearchResults(response);
      // storeArray(response);
     

 
    }else{
      console.log("sendSearchRequest failed.  Returned status of " + xhr.status);
    }
  };
  xhr.open("GET", url, true);
 // xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  
}



function displaySearchResults(results) {

  document.getElementById("eventDetailResults").innerHTML = "";
  document.getElementById("showVenueDetail_notice").innerHTML = "";
  document.getElementById("arrow").innerHTML = "";
  document.getElementById("showVenueDetail").innerHTML = "";

  if(typeof results == "undefined"){
   document.getElementById("eventDetailResults").innerHTML = "No Records Found";

  }else{

  // 创建HTML表格并填充搜索结果
  var table = "<table id='table'><tr><th>Date</th><th>Icon</th><th id='head_event'>Event</th><th id='head_genre' >Genre</th><th id='head_venue' >Venue</th></tr>";
  var len = results.length;
  if(len > 20){
    len = 20;
  }else{
    len = results.length;
  } 

 

  for (var i = 0; i < len; i++) {
    //table
    
    if(results[i].date_time == "undefined"){
      var date = results[i].date; 
    }else{
      var date = results[i].date;
      var time = results[i].date_time;
    }
    
    var icon = results[i].icon;
    var event = results[i].event;
   
    var genre = results[i].genre;
    var venue = results[i].venue;

    
   // var eventId = results[i].id; 
    var eventId = results[i].id; 
    // console.log(eventId);


    
     
//   table += "<tr><td>" + date+'\n'+ time + "</td><td><img src='" + icon + "' /></td><td><div id='cell' onclick='searchEventDetail(\'${nowObject.id}\')'> + event + "</div></td><td>" + genre + "</td><td>" + venue + "</td></tr>";
//onclick='searchEventDetail(\'${eventId}\')'
   
//table += `<tr><div class="inline-input" ><td><div> + date+"\n"+ time + '</div></td><td><div><img height="80px" width="auto" src=' + icon +' /></div></td><td><div id="cell" onclick="searchEventDetail(\'${eventId}\')">' + event + '</div></td><td><div>' + genre + '</div></td><td><div>' + venue + '</div></td></div></tr>`;
          table += `<tr><div class="inline-input"><td><div>` + date+'\n'+time + `</div></td><td><div><img height="80px" width="auto" src=` + icon +` /></div></td><td ><div id="cell" onclick="searchEventDetail(\'${eventId}\');
        ">` + event + `</div></td><td><div>` + genre + `</div></td><td><div>` + venue + `</div></td></div></tr>`;


     //var eventButton = document.getElementById("cell");
    // eventButton.setAttribute("onclick", searchEventDetail("eventId")); 
   // const venueDetail = document.getElementById("showVenueDetail").innerHTML;
   // eventButton.setAttribute("onclick", remove(venueDetail)); 
   // var div = td.querySelector("div");   
   // div.onclick = function() {
     //   document.getElementById("showVenueDetail").innerHTML = "";

      //  };

  }

  table += "</table>";
  document.getElementById("searchResults").innerHTML = table;

  // 获取按钮元素
  var headButtonEvent = document.getElementById('head_event');
  var headButtonGenre = document.getElementById('head_genre');
  var headButtonVenue = document.getElementById('head_venue');

  // 添加点击事件监听器
  headButtonEvent.onclick = renewTableForEvent;
  headButtonGenre.onclick = renewTableForGenre;
  headButtonVenue.onclick = renewTableForVenue;

 }

}
 
 //定义发送EVENT DETAIL的函数
function searchEventDetail(eventId) {
  
  document.getElementById("showVenueDetail").innerHTML = "";


  // 使用XMLHttpRequest发送GET请求
    var xhr = new XMLHttpRequest();
    console.log(eventId);

  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var response = JSON.parse(this.responseText);
      jsonEvent = response;
      console.log(response);
      displayEventDetails(response);
      //scroll to bottom 
      scrollToBottom();

     
    } else {
      console.log("sorry,search event detail request failed. returned status of: " + xhr.status);
    }
  }; 
    // xhr.setRequestHeader("Content-Type", "application/json");
  xhr.open("GET", "/event_detail?eventId=" + eventId, true);
  
  xhr.send();
  
}

// function checkIsUndefined(str) {
//   if (typeof str !== "undefined") {
//     return true;
//   }
// }


function renewTableForEvent(){

  clearTable();
  sort_event();
  
}

function renewTableForGenre(){

  clearTable();
  sort_genre();
  
}

function renewTableForVenue(){

  clearTable();
  sort_venue();
  
}

function clearTable(){
  const table = document.getElementById('table');
  table.remove();

 }

function sort_event() {
    
    
  if (sort_incending_event == 1) {
    sort_incending_event = 0;
    jsonArray.sort(function (a, b) {
      return a.event.localeCompare(b.event);
    });
    console.log('jsonArray+'+jsonArray);
    displaySearchResults(jsonArray);
    
  } else {
    sort_incending_event = 1;
    jsonArray.sort(function (a, b) {
      return b.event.localeCompare(a.event);
    });
    console.log('jsonArray+'+jsonArray);
    
    displaySearchResults(jsonArray)
  }
}

function sort_genre() {
    
    
  if (sort_incending_genre == 1) {
    sort_incending_genre = 0;
    jsonArray.sort(function (a, b) {
      return a.genre.localeCompare(b.genre);
    });
    console.log('jsonArray+'+jsonArray);
    displaySearchResults(jsonArray);
    
  } else {
    sort_incending_genre = 1;
    jsonArray.sort(function (a, b) {
      return b.genre.localeCompare(a.genre);
    });
    console.log('jsonArray+'+jsonArray);
    displaySearchResults(jsonArray);
  }
}

function sort_venue() {
    
    
  if (sort_incending_venue == 1) {
    sort_incending_venue = 0;
    jsonArray.sort(function (a, b) {
      return a.venue.localeCompare(b.venue);
    });
    console.log('jsonArray+'+jsonArray);
    displaySearchResults(jsonArray);
    
  } else {
    sort_incending_venue = 1;
    jsonArray.sort(function (a, b) {
      return b.venue.localeCompare(a.venue);
    });
    
    console.log('jsonArray+'+jsonArray);
    displaySearchResults(jsonArray);
  }
}

function displayEventDetails(result) {

  document.getElementById("showVenueDetail_notice").innerHTML = "&nbsp";
  document.getElementById("arrow").innerHTML = "&nbsp";
 
   
  // extract event detail elements
        var eventName = result.name;

        if(typeof result.dates.start.localTime == "undefined"){
          var date_time = result.dates.start.localDate;
        }else{
          var date_time = result.dates.start.localDate +' '+ result.dates.start.localTime;         
        }

        if(typeof result._embedded.attractions  !== "undefined" ){
          var artist_team = result._embedded.attractions[0].name ;
          var artist_team_url =  result._embedded.attractions[0].url ;
          var Artist_Team = "Artist/Team";
        }else {
          var artist_team = '';
          var artist_team_url =  '';
          var Artist_Team = '';
        }

        if(typeof result._embedded.venues !== "undefined"){
          var venue = result._embedded.venues[0].name;
          var Venue = "Venue" ;
        }else {
           var venue = '';
           var Venue = '' ;
        }

        if(typeof result.classifications[0].subGenre !== "undefined" && result.classifications[0].subGenre.name !== "Undefined" ){
          var subGenre = result.classifications[0].subGenre.name;
        }else{
          var subGenre = '';  
        }

        if(typeof result.classifications[0].genre == "undefined" ||  result.classifications[0].genre.name == "Undefined"){
           
            var genre = '';      
        }else if(typeof  result.classifications[0].genre !== "undefined" && result.classifications[0].subGenre == "undefined" ){
          var genre = result.classifications[0].genre.name;
        }else{
          var genre = " | " + result.classifications[0].genre.name;
        }

        if(typeof result.classifications[0].segment == "undefined" ||  result.classifications[0].segment.name == "Undefined"){
         
          var segment = ''; 
        }else if(typeof result.classifications[0].segment !== "undefined" && result.classifications[0].subGenre == "undefined" && result.classifications[0].genre == "undefined" ){
          var segment = result.classifications[0].segment.name;
        }else{
          var segment = " | " + result.classifications[0].segment.name;
        }

        if(typeof result.classifications[0].subType == "undefined" ||  result.classifications[0].subType.name == "Undefined"){
                 var subType = '';
        }else if(typeof result.classifications[0].subType !== "undefined" && result.classifications[0].subGenre == "undefined" && result.classifications[0].genre == "undefined" && result.classifications[0].segment == "undefined"){
          var subType = result.classifications[0].subType.name;
                    
        }else{
          var subType = " | " + result.classifications[0].subType.name;

        }

        

        if(typeof result.classifications[0].type == "undefined" ||  result.classifications[0].type.name == "Undefined"){
          var type = '';

        }else if(typeof result.classifications[0].type !== "undefined" && typeof result.classifications[0].subType == "undefined" && result.classifications[0].subGenre == "undefined" && result.classifications[0].genre == "undefined" && result.classifications[0].segment == "undefined"){
          var type = result.classifications[0].type.name;
       
        }else{
          var type = " | " + result.classifications[0].type.name;
          
        }

        if(typeof result.classifications[0].subGenre !== "undefined" ||result.classifications[0].genre !== "undefined"||result.classifications[0].segment !== "undefined"||result.classifications[0].subType !== "undefined"||result.classifications[0].type !== "undefined" ){
          var genre_total = subGenre + genre + segment + subType + type ;
          var Genre = "Genre";
        }else{
          var genre_total = '';
          var Genre = '';
        }

        if(typeof result.priceRanges !== "undefined"){
          var priceRanges_min = result.priceRanges[0].min;
          

        }else{
          var priceRanges_min = '';
           
        }

        if(typeof result.priceRanges !== "undefined"){
          var priceRanges_max = result.priceRanges[0].max;

        }else{
          var priceRanges_max = '';
       
        }

        if(typeof result.priceRanges !== "undefined"){
          var priceRanges = priceRanges_min+" - "+priceRanges_max;
          var PriceRanges = "Price"+" "+"Ranges"

        }else{
          var priceRanges = '';
          var PriceRanges = '';    
        }

        if(typeof result.dates.status.code !== "undefined"){
          var ticketStatus = result.dates.status.code;
          var TicketStatus = "Ticket"+" "+"Status";
        }else{
          var ticketStatus = '';
          var TicketStatus = '';
      
        }

        if(typeof result.url !== "undefined"){
          var buyTicket_at = result.url;
          var BuyTicketAt = "Buy"+" "+"Ticket"+" "+"At";
        }else{
          var buyTicket_at = '';
          var BuyTicketAt = '';
        }

        if(typeof result.seatmap.staticUrl !== "undefined"){
          var seatMap= result.seatmap.staticUrl;


        }else{
          var seatMap= '';

       
        }
       
       
      

        
       
        // display event detail        
 var eventDetailResults = 

           `<div>`+eventName+`</div>
          
           <div class="inline-input">
            <div>
                <div>
                  <div>Date</div>
                  <div>`+date_time+`</div>
                </div>
                
                <div>
                <div>`+Artist_Team+`</div>
                <div><a href=" ` +artist_team_url+ ` " target="_blank">`+artist_team+`</a></div>
                
                </div>

              <div>
                <div>`+Venue+`</div>
                <div>`+venue+`</div>
              </div>

              <div>
                <div>`+Genre+`</div>
                <div>`+genre_total+`</div>
              </div>

              <div>
                <div>`+PriceRanges+`</div>
                <div>`+ priceRanges+`</div>
              </div>

              <div>
                <div>`+TicketStatus+`</div>
                <div>`+ticketStatus+`</div>
              </div>

              <div>
                <div>`+BuyTicketAt+`</div>
                <div><a href=" ` +buyTicket_at+ ` " target="_blank">Ticketmaster</a></div>
              </div>
            </div>

            <div>
              <div><img src=" ` +seatMap+ ` " height="200px" width="auto"/></div>
            </div>
          
          </div>`;
        
        document.getElementById("eventDetailResults").innerHTML = eventDetailResults;

      

       //add show venue detail notice
    const venueDetailNotice = document.createElement("div");
    venueDetailNotice.innerHTML = "Show Venue Details";
    document.getElementById("showVenueDetail_notice").appendChild(venueDetailNotice);
      //add downward arrow       
    const arrow = document.createElement("div");

    // Set the styles for the arrow box
    arrow.style.width = "20px";
    arrow.style.height = "20px";
    arrow.style.border = "1px solid black";
    arrow.style.borderTop = "none";
    arrow.style.borderLeft = "none";
    arrow.style.transform = "rotate(45deg)";

  // Add the arrow  to the document body

  document.getElementById("arrow").appendChild(arrow);

  
  arrow.onclick = function() { searchVenueDetails(venue,venueDetailNotice,arrow,); };
        
}




//scroll to the bottom of the page

function scrollToBottom() {
  window.scrollTo(0,document.body.scrollHeight);
}

function searchVenueDetails(venue, venueDetailNotice, arrow){
  
  
  //get request to google map api
  var xhr = new XMLHttpRequest();
  console.log(venue);

  xhr.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    var response = JSON.parse(this.responseText);
   // jsonEvent = response;
    console.log(response);
    displayVenueDetails(response);
    //scroll to expand, and we add class="expanded" in the div
    scrollToBottom();
    //hide the two div elements
    venueDetailNotice.remove();
    arrow.remove();
   
  } else {
    console.log("sorry, search venue detail request failed. returned status of: " + xhr.status);
  }
}; 
  // xhr.setRequestHeader("Content-Type", "application/json");
xhr.open("GET", "/venue_detail?venue=" + venue, true);

xhr.send();
  
}

function displayVenueDetails(result){

  var venueName = result._embedded.venues[0].name;


  if(typeof result._embedded.venues[0].address  !== "undefined" ){
  
  var address = result._embedded.venues[0].address.line1;

  }else {
  var address = '';
  }

  if(typeof result._embedded.venues[0].city  !== "undefined" ){
  
    var city = result._embedded.venues[0].city.name;

    }else {
    var city = '';
    }
   
  if(typeof result._embedded.venues[0].state !== "undefined" ){
  
    var stateCode = result._embedded.venues[0].state.stateCode;
 
    }else {
      var stateCode = '';
    }  
  
  if(typeof result._embedded.venues[0].postalCode !== "undefined" ){
  
      var postalCode = result._embedded.venues[0].postalCode;
    
    }else {
        var postalCode = '';
      }
      
  
     
  if(typeof result._embedded.venues[0].url !== "undefined" ){
  
    var upcomingEvents = result._embedded.venues[0].url;
    var upcoming_msg = "More events at this venue";

  }else {
    var upcomingEvents = '';
    var upcoming_msg = "N/A";

   }  
   
   var map_url = "https://www.google.com/maps/search/?api=1&query="+address+"%2C"+city+"%2C"+stateCode+"%2C"+postalCode

   //display venue details in webpage
  var venueDetail=
   `<div>`+venueName+`</div>
   <hr class="head-divider" />
   
   <div>&nbsp</div>
   
   <div class="inline-input" id="parent">
    <div class="child">
        
          <div>Address: `+address+`</div>
        
        
        
          <div>`+city+", "+stateCode+`</div>        
        

      
        <div>`+postalCode+`</div>       
      

      
        <div>&nbsp</div>      
      
   

      
        <div><a href=" ` +map_url+ ` " target="_blank">Open in Google Maps</a></div>
      

      
    </div>



    <div class="child">
      <div><a href=" ` +upcomingEvents+ ` " target="_blank">`+upcoming_msg+`</a></div>
      <div>&nbsp</div> 
      <div>&nbsp</div> 
      <div>&nbsp</div> 
      <div>&nbsp</div> 
    </div>
  
  </div>`;

  document.getElementById("showVenueDetail").innerHTML = venueDetail;


}




    // var artists_team = results[i].artists_team;
    // var subGenre = results[i].subGenre;
    // var segment = results[i].segment;
    // var subType = results[i].subType;
    // var type = results[i].type;
    // var PriceRanges_min = results[i].PriceRanges_min;
    // var PriceRanges_max = results[i].PriceRanges_max;
    // var TicketStatus = results[i].TicketStatus;
    // var BuyTicket_At = results[i].BuyTicket_At;
    // var SeatMap = results[i].SeatMap;
    
    // //venue detail
    // var venue = results[i].venue;
    // var Address = results[i].Address;
    // var city = results[i].city;
    // var state = results[i].state;
    // var PostalCode = results[i].PostalCode;
    // var UpcomingEvents = results[i].UpcomingEvents;


// function storeArray(results){
//   //create an array named jsonArray to store json results
  
//   var length = results.length;
//   if(length > 20){
//     length = 20;
//   }else{
//     length = results.length;
//   } 
//   for (let i = 0; i < length; i++) {
//     jsonArray.push(results[i]);
//   }
  
// }
    
 
  
 


// $.ajax({
//   type:"GET",
//   url:"https://app.ticketmaster.com/discovery/v2/events/"+eventId[i]+".json?apikey="+TM_API_KEY,
//   async:true,
//   dataType: "json",
//   success: function(json) {
//               console.log(json);
//               // Parse the response.
//               // Do other things.
//            },
//   error: function(xhr, status, err) {
//               // This time, we do not end up here!
//               console.log("ajax Error: " + err);
//            }
// });


// function submitForm() {
//     // 获取表单输入数据
//     var event = document.getElementById("eventInput").value;
//     var distance = document.getElementById("distanceInput").value;
//     var address = document.getElementById("addressInput").value;

//     // 发送GET请求
//     var url = "/search?event=" + encodeURIComponent(event) + "&distance=" + encodeURIComponent(distance) + "&address=" + encodeURIComponent(address);
//     window.location.href = url;
// }

// fetch('http://localhost:8080/search')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error(error));


// // fetch('/search').then(response => response.json()).then(data => {
// //   // Process the search results and update the HTML page
// //   updateResults(data);
// // });


// // get the search results container element
// const resultsContainer = document.getElementById("results-container");

// // create a new table element
// const table = document.createElement("table");

// // create the table header row
// const headerRow = table.insertRow();
// headerRow.insertCell().innerHTML = "Event Name";
// headerRow.insertCell().innerHTML = "Date";
// headerRow.insertCell().innerHTML = "Venue";

// // loop through the events in the API response and add a new row to the table for each event
// for (const event of response._embedded.events) {
//   const row = table.insertRow();
//   row.insertCell().innerHTML = event.name;
//   row.insertCell().innerHTML = event.dates.start.localDate;
//   row.insertCell().innerHTML = event._embedded.venues[0].name;
// }

// // add the table to the search results container
// resultsContainer.appendChild(table);



// const form = document.getElementById('search-form');
// const resultsTable = document.getElementById('results-table');

// form.addEventListener('submit', (event) => {
//   event.preventDefault();

//   const eventInput = document.getElementById('event-input').value;
//   const distanceInput = document.getElementById('distance-input').value;
//   const addressInput = document.getElementById('address-input').value;

//   // Send GET request to server
//   const url = '/search?event=${eventInput}&distance=${distanceInput}&address=${addressInput}';
//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       // Clear previous results
//       resultsTable.querySelector('tbody').innerHTML = '';

//       // Add new results to table
//       data.forEach(event => {
//         const row = resultsTable.insertRow();
//         row.innerHTML = `
//           <td>${event.name}</td>
//           <td>${event.date}</td>
//           <td>${event.venue}</td>
//           <td><a href="${event.url}" target="_blank">Buy Tickets</a></td>
//         `;
//       });
//     })
//     .catch(error => console.error(error));
// });
