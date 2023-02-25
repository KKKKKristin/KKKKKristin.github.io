// import $ from 'jquery';
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


//check if the input boxes are not filled

const searchButton = document.getElementById("searchButton");
const keywordInput = document.getElementById("eventInput");
const locationInput = document.getElementById("addressInput");
const keywordError = document.getElementById("keywordError");
const locationError = document.getElementById("locationError");

  searchButton.addEventListener('click', function() {
  if (!keywordInput.checkValidity()) {
    keywordInput.reportValidity();
    return;
  } else {
      searchEvents();
 

  }

  if (!locationInput.checkValidity()) {
    locationInput.reportValidity();
      return;
        
  } else {
      
      searchEvents();


  }
});



//locationInput will disappear if checked

function toggleInput() {
    var checkbox = document.getElementById("checkbox");
    var locationInput = document.getElementById("addressInput");
    if (checkbox.checked) {
     locationInput.style.display = "none";
    } else {
      locationInput.style.display = "block";
    }
  }

  //clear button
function clearForm() {
    document.getElementById("eventInput").value = "";
    document.getElementById("distanceInput").value = "";
    document.getElementById("category").value = "default";
    document.getElementById("addressInput").value = "";
  }


// // Add event listener to search button, if clicked, search events
// document.getElementById("searchButton").addEventListener('click', searchEvents);



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
      // 调用函数，并传递经纬度参数
      sendSearchRequest(latitude, longitude, distance, event, category);

    } catch (error) {
      console.error(error);
    }
   }  
    getLocation();


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
        // console.log(response);
  
     
      }
    }
    xhr.open("GET", '/ip_api/'+ address, true);
    xhr.send();
  
}


//定义发送请求的函数sendsearchrequest()
function sendSearchRequest(latitude, longitude, distance, event, category) {
  // 使用XMLHttpRequest发送GET请求
  var xhr = new XMLHttpRequest();
  var url = "/search?latitude=" + latitude + "&longitude=" + longitude + "&distance=" + distance + "&event=" + event + "&category=" + category;
  
  //xhr.setRequestHeader("Content-Type", "application/json");
 
  xhr.onreadystatechange = function() {
 
    if (this.readyState === 4 && this.status === 200) {
      // 解析JSON响应并显示结果
      var response = JSON.parse(this.responseText);
       jsonArray = response;
       console.log(response);
      
    
       if(typeof response === "undefined" || typeof response._embedded === "undefined"){
        document.getElementById("searchResults").innerHTML="";
        document.getElementById("noRecordsNotice").innerHTML = `<div class="no_records">No Records Found<div/>`;

        document.getElementById("eventDetailResults").innerHTML = "";

        document.getElementById("showVenueDetail_notice").innerHTML = "";
        document.getElementById("arrow").innerHTML = "";
        document.getElementById("showVenueDetail").innerHTML = "";

        document.querySelector("#noRecordsNotice").style.display = 'block';
        window.scrollTo({
        top: document.querySelector("#noRecordsNotice").offsetTop,
        behavior: 'smooth'
        });

       } else{
        document.getElementById("noRecordsNotice").innerHTML = "";
        displaySearchResults(response);
        console.log("events are displayed!!!");

       }

 
    }else{
      console.log("sendSearchRequest failed.  Returned status of " + xhr.status);

    }
  };
  xhr.open("GET", url, true);
 // xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

  
}



function displaySearchResults(results) {

  //document.getElementById("searchResults").innerHTML = table;

  document.getElementById("eventDetailResults").innerHTML = "";
  document.getElementById("showVenueDetail_notice").innerHTML = "";
  document.getElementById("arrow").innerHTML = "";
  document.getElementById("showVenueDetail").innerHTML = "";


 // table += `<tr><td><div class="inline-input">` + date + '\n' + time + `</div></td><td><div><img height="80px" width="auto" src="` + icon + `" /></div></td><td class="event_hover"><div id="cell" onclick="searchEventDetail(\'${eventId}\');">` + event + `</div></td><td><div>` + genre + `</div></td><td><div>` + venue + `</div></td></tr>`;

  // 创建HTML表格并填充搜索结果
  var table = `<table id='table'><tr><th>Date</th><th>Icon</th><th id='head_event'>Event</th><th id='head_genre' >Genre</th><th id='head_venue' >Venue</th></tr>`;
  
  
  var events = results._embedded.events;

  console.log(events);
  
  var len = events.length;
  if(len > 20){
    len = 20;
  }else{
    len = events.length;
  } 


  for (let i = 0; i < len; i++) {
    
    // console.log(events[i]);

    if(typeof events[i].dates.start.localTime === "undefined"){
      var date = events[i].dates.start.localDate; 
    }else{
      var date = events[i].dates.start.localDate;
      var time = events[i].dates.start.localTime;
    }

    if(typeof events[i].images === "undefined"){
      var icon = ""; 
    }else{
      var icon = events[i].images[0].url;
    }
    
    if(typeof events[i].name === "undefined"){
      var event = "";

    }else{
      var event = events[i].name;

    }
  
    if(typeof events[i].classifications === "undefined" || typeof events[i].classifications[0].genre ==="undefined"){
      var genre = "";

    }else{
      var genre = events[i].classifications[0].genre.name;
    }

    if(typeof events[i]._embedded === "undefined" || typeof events[i]._embedded.venues === "undefined"){
      var venue = "";

    }else{
      var venue = events[i]._embedded.venues[0].name;

    }
   

    // var icon = events[i].images[0].url
    // var event = events[i].name;
    // var genre = events[i].classifications[0].genre.name;
    // var venue = events[i]._embedded.venue[0].name;

   
    
   // var eventId = results[i].id; 
     var eventId = events[i].id; 
    
     console.log(venue);


    
     
//   table += "<tr><td>" + date+'\n'+ time + "</td><td><img src='" + icon + "' /></td><td><div id='cell' onclick='searchEventDetail(\'${nowObject.id}\')'> + event + "</div></td><td>" + genre + "</td><td>" + venue + "</td></tr>";
//onclick='searchEventDetail(\'${eventId}\')'
   
//table += `<tr><div class="inline-input" ><td><div> + date+"\n"+ time + '</div></td><td><div><img height="80px" width="auto" src=' + icon +' /></div></td><td><div id="cell" onclick="searchEventDetail(\'${eventId}\')">' + event + '</div></td><td><div>' + genre + '</div></td><td><div>' + venue + '</div></td></div></tr>`;
     table += `<tr><div class="inline-input"><td><div>` + date+`\n`+time + `</div></td><td><div><img height="80px" width="auto" src=" ` + icon +`" /></div></td><td class="event_hover" ><div id="cell"  onclick="searchEventDetail(\'${eventId}\');">` + event + `</div></td><td><div>` + genre + `</div></td><td><div>` + venue + `</div></td></div></tr>`;


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

  //scroll to view
  document.querySelector("#searchResults").style.display = 'block';
  window.scrollTo({
  top: document.querySelector("#searchResults").offsetTop,
  behavior: 'smooth'
 });


}
 
 //定义发送EVENT DETAIL的函数
function searchEventDetail(eventId) {
  

  document.getElementById("showVenueDetail").innerHTML = "";


  // 使用XMLHttpRequest发送GET请求
    var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var response = JSON.parse(this.responseText);
      jsonEvent = response;
      // console.log(response);
      displayEventDetails(response);
      //scroll to bottom 
   

     
    } else {
      console.log("sorry,search event detail request failed. returned status of: " + xhr.status);
    }
  }; 
    // xhr.setRequestHeader("Content-Type", "application/json");
  xhr.open("GET", "/event_detail?eventId=" + eventId, true);
  
  xhr.send();
  
}




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
   document.getElementById('table').innerHTML="";
  

 }

function sort_event() {
    
 const events = jsonArray._embedded.events;

    
  if (sort_incending_event == 1) {
    sort_incending_event = 0;
    events.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
    // console.log('jsonArray+'+jsonArray);
    displaySearchResults(jsonArray);
    
  } else {
    sort_incending_event = 1;
    events.sort(function (a, b) {
      return b.name.localeCompare(a.name);
    });
    // console.log('jsonArray+'+jsonArray);
    
    displaySearchResults(jsonArray)
  }
}

function sort_genre() {
    
 const events = jsonArray._embedded.events;

    
  if (sort_incending_genre == 1) {
    sort_incending_genre = 0;
    events.sort(function (a, b) {
      return a.classifications[0].genre.name.localeCompare(b.classifications[0].genre.name);
    });
    // console.log('jsonArray+'+jsonArray);
    displaySearchResults(jsonArray);
    
  } else {
    sort_incending_genre = 1;
    events.sort(function (a, b) {
      return b.classifications[0].genre.name.localeCompare(a.classifications[0].genre.name);
    });
    // console.log('jsonArray+'+jsonArray);
    displaySearchResults(jsonArray);
  }
}


function sort_venue() {
  
 const events = jsonArray._embedded.events;

  if (sort_incending_venue == 1) {
    sort_incending_venue = 0;
    events.sort(function (a, b) {
      return a._embedded.venues[0].name.localeCompare(b._embedded.venues[0].name);
    });
    // console.log('jsonArray+'+jsonArray);
    displaySearchResults(jsonArray);
    
  } else {
    sort_incending_venue = 1;
    events.sort(function (a, b) {
      return b._embedded.venues[0].name.localeCompare(a._embedded.venues[0].name);
    });
    
    displaySearchResults(jsonArray);
  }
}

function displayEventDetails(result) {

  document.getElementById("showVenueDetail_notice").innerHTML = "";
  document.getElementById("arrow").innerHTML = "";
  document.getElementById("eventDetailResults").innerHTML = "";

 
  console.log(result); 

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
          var exist_art = "exist";
        }else {
          var artist_team = '';
          var artist_team_url =  '';
          var Artist_Team = '';
          var exist_art = '';

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
          var PriceRanges = "Price Ranges";
          var exist_price="exist";

        }else{
          var priceRanges = '';
          var PriceRanges = ''; 
          var exist_price = '';  
        }

        if(typeof result.dates.status.code == "undefined"){
         // var ticketStatus = result.dates.status.code;
         var ticketStatus = '';
         var TicketStatus = '';
         var className = '';

         
        }else{
          
          

          if(result.dates.status.code == "onsale"){
            var TicketStatus = "Ticket Status";
            var ticketStatus = "On Sale";
            var className = "onsale";
          }else if(result.dates.status.code == "rescheduled"){
            var TicketStatus = "Ticket Status";
            var ticketStatus = "Rescheduled";
            var className = "rescheduled";
          }else if(result.dates.status.code == "offsale"){
            var TicketStatus = "Ticket Status";
            var ticketStatus = "Off sale";
            var className = "offsale";
          }else if(result.dates.status.code == "canceled"){
            var TicketStatus = "Ticket Status";
            var ticketStatus = "Canceled";
            var className = "canceled";
          }else if(result.dates.status.code == "postponed"){
            var TicketStatus = "Ticket Status";
            var ticketStatus = "Postponed";
            var className = "postponed";
          }
         
      
        }

        if(typeof result.url !== "undefined"){
          var buyTicket_at = result.url;
          var BuyTicketAt = "Buy Ticket At";
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

           `<div class="eventDetail_window">
           <div class="event_head" >`+eventName+`</div>
          
           <div class="inline-input" >
            <div class="div_left">
                <div>
                  <div><h4>Date</h4></div>
                  <div><p>`+date_time+`</p></div>
                </div>
                
                <div>
                <div class=`+exist_art+`><h4>`+Artist_Team+`</h4></div>
                <div><p><a href=" ` +artist_team_url+ ` " target="_blank" class="hover">`+artist_team+`</a></p></div>
                
                </div>

              <div>
                <div><h4>`+Venue+`<h4></div>
                <div><p>`+venue+`</p></div>
              </div>

              <div>
                <div><h4>`+Genre+`</h4></div>
                <div><p>`+genre_total+`</p></div>
              </div>

              <div>
                <div class=`+exist_price+`><h4>`+PriceRanges+`</h4></div>
                <div><p>`+ priceRanges+`</p></div>
              </div>

              <div>
                <div><h4>`+TicketStatus+`</h4></div>
                <div><p class=`+className+`>`+ticketStatus+`</p></div>
              </div>

              <div>
                 <div><h4>`+BuyTicketAt+`<h4></div>
                <div><p><a href=" ` +buyTicket_at+ ` " target="_blank" class="hover">Ticketmaster</a></p></div>
              </div>
            </div>

            <div class="div_right">
              <div class="event_img"><img src=" ` +seatMap+ ` " height="320" width="350"/></div>
            </div>
        
          </div>
          </div>`;
        
    


        document.getElementById("eventDetailResults").innerHTML = eventDetailResults;

            // 获取所有的 <p> 和 <h> 元素
            var elements = document.querySelectorAll('p, h1, h2, h3, h4');

            // 循环遍历每个元素
            for (var i = 0; i < elements.length; i++) {
              var element = elements[i];
        
            // 判断元素内容是否为空
              if (element.innerHTML.trim() === '') {
          
            // 如果内容为空，则删除元素
             element.parentNode.removeChild(element);
             }
            }

       //add show venue detail notice
    const venueDetailNotice = document.createElement("div");
    venueDetailNotice.innerHTML = "Show Venue Details";
    document.getElementById("showVenueDetail_notice").appendChild(venueDetailNotice);
      //add downward arrow       
    const arrow = document.createElement("div");
    arrow.className = "arrow";


   document.getElementById("arrow").appendChild(arrow);

   //scroll to view
    document.querySelector("#eventDetailResults").style.display = 'block';
    window.scrollTo({
    top: document.querySelector("#eventDetailResults").offsetTop,
    behavior: 'smooth'
  });

  arrow.onclick = function() { searchVenueDetails(venue,venueDetailNotice,arrow,); };
        
}




function searchVenueDetails(venue, venueDetailNotice, arrow){
  
  
  //get request to google map api
  var xhr = new XMLHttpRequest();
  // console.log(venue);

  xhr.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    var response = JSON.parse(this.responseText);
   // jsonEvent = response;
    // console.log(response);
     //hide the two div elements
     venueDetailNotice.remove();
     arrow.remove();
    displayVenueDetails(response);
    //scroll to expand, and we add class="expanded" in the div
   
   
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

  document.getElementById("showVenueDetail_notice").innerHTML=""
  document.getElementById("arrow").innerHTML=""

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

  `<div class="venue_detail_window"><div class="black-border"><div><h3 class="venue_name">`+venueName+`</h3></div>
   

   
<div class="inline-input" id="parent">


  <div class="child_left">

    <div class="inline-input" id="top">
      <div class="address_head">Address:</div>
      <div class="address_data"><p class="address">`+address+`<br>`+city+", "+stateCode+`<br>`+postalCode+`</div>
    </div>

    <div id="bottom"><a href=" `+map_url+ ` " target="_blank" class="hover">Open in Google Maps</a></div>

  </div>

  <div class="divided"></div>

     <div class="child_right">
      <div class="upcoming"><a href=" ` +upcomingEvents+ ` " target="_blank" class="hover">`+upcoming_msg+`</a></div>
      
    </div>
  
</div>
</div>
</div>`;

document.getElementById("showVenueDetail").innerHTML = venueDetail;

document.querySelector("#showVenueDetail").style.display = 'block';
window.scrollTo({
top: document.querySelector("#showVenueDetail").offsetTop,
behavior: 'smooth'
});


}

 