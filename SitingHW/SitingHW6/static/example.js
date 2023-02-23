// var user_location;
// var hash_location;
// let profile_data;
// let res_array = [];
// let event_details;
// let venue_details;
// let now_event_name;
// let now_venue_name;
// var sort_incending_date = 1;
// var sort_incending_event = 1;
// var sort_incending_genre = 1;
// var sort_incending_venue = 1;

// function onChange() {
//   let input1 = document.getElementById("mydistance");
//   input1.type = "number";
// }

// function onChange1() {
//   let input1 = document.getElementById("mydistance");
//   input1.type = "text";
// }

// function myHide() {
//   let chekbox = document.getElementById("mylocation");
//   let input = document.getElementById("mylocation1");
//   if (chekbox.checked == true) {
//     input.type = "hidden";
//     const userAction = async () => {
//       const response = await fetch("https://ipinfo.io/?token=cfdac1691c2d96");
//       const temp = await response.json();
//       user_location = temp.loc;
//     };
//     userAction();
//   } else {
//     input.type = "text";
//     user_location = "";
//   }
// }

// function search() {
//   const my_location = document.getElementById("mylocation1").value;
//   const mykeyword = document.getElementById("mykeyword");
//   const loc = document.getElementById("mylocation1");

//   if(!mykeyword.checkValidity()){
//     mykeyword.reportValidity();
//     return;
//   }
  
//   //check validity
//   if(!loc.checkValidity()){
//     loc.reportValidity();
//     return;
//   }

//   let checkbox = document.getElementById("mylocation");
//   if (checkbox.checked == false) {
//     getLocData(my_location);
//   } else {
//     sendValue();
//   }

//   return false;
// }

// function getLocData(my_location) {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       var nowTemp = JSON.parse(this.responseText);
//       user_location =
//         nowTemp.location.results[0].geometry.location.lat +
//         "," +
//         nowTemp.location.results[0].geometry.location.lng;
//       sendValue();
//     }
//     if (this.status == 404) {
//       console.log(this.status);
//     }
//   };
//   xhttp.open("GET", "/todo/api/ipinfo/" + my_location, true);
//   xhttp.send();
// }

// function sendValue() {
//   const myKeyword = document.getElementById("mykeyword").value;
//   const myDistance = document.getElementById("mydistance").value;
//   const myCategory = document.getElementById("mycategory").value;

//   fetch(
//     `/get_value?mykeyword=${myKeyword}&mydistance=${myDistance}&mycategory=${myCategory}&mylocation=${user_location}`
//   )
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       } else {
//         return response.json();
//       }
//     })
//     .then((data) => {
//       console.log(data.event._embedded.events);
//       profile_data = data.event._embedded.events;
//       buildArray(profile_data);
//       creatToTable();
//       // createCotab(data.event._embedded);
//     })
//     .catch((error) => {
//       console.error("There was a problem with the fetch operation:", error);
//       inValidValue();
//     });
// }

// function buildArray(profile_data) {
//   //renew array
//   res_array = [];
//   //build object-array
//   var row_length = profile_data.length;
//   if (row_length > 20) {
//     row_length = 20;
//   }
//   for (var i = 0; i < row_length; i++) {
//     res_array.push(profile_data[i]);
//   }
// }

// function creatToTable() {
//   //renew table
//   const div1 = document.getElementById("tab1");
//   while (div1.hasChildNodes()) {
//     tab1.removeChild(tab1.firstChild);
//   }

//   //create table
//   const table1 = document.createElement("table");
//   table1.className = "table1";

//   //create header_row
//   let header_row = table1.insertRow(0);
//   let head1 = header_row.insertCell(0);
//   head1.innerHTML = "Date";
//   const th1 = document.createElement("th");
//   th1.innerHTML = head1.innerHTML;
//   head1.parentNode.replaceChild(th1, head1);
//   th1.setAttribute("onclick", "sortDate()");

//   let head2 = header_row.insertCell(1);
//   head2.innerHTML = "Icon";
//   const th2 = document.createElement("th");
//   th2.innerHTML = head2.innerHTML;
//   head2.parentNode.replaceChild(th2, head2);

//   let head3 = header_row.insertCell(2);
//   head3.innerHTML = "Event";
//   const th3 = document.createElement("th");
//   th3.innerHTML = head3.innerHTML;
//   head3.parentNode.replaceChild(th3, head3);
//   th3.setAttribute("onclick", "sortEvent()");

//   let head4 = header_row.insertCell(3);
//   head4.innerHTML = "Genre";
//   const th4 = document.createElement("th");
//   th4.innerHTML = head4.innerHTML;
//   head4.parentNode.replaceChild(th4, head4);
//   th4.setAttribute("onclick", "sortGenre()");

//   let head5 = header_row.insertCell(4);
//   head5.innerHTML = "Venue";
//   const th5 = document.createElement("th");
//   th5.innerHTML = head5.innerHTML;
//   head5.parentNode.replaceChild(th5, head5);
//   th5.setAttribute("onclick", "sortVenue()");

//   //build tablebody
//   let table_body = document.createElement("tbody");

//   //for-loop to create table_body
//   for (var i = 0; i < profile_data.length; i++) {
//     let nowObject = res_array[i];
//     let now_row = document.createElement("tr");
//     //date-time
//     var now_date;
//     if (typeof nowObject.dates.start.localTime === "undefined") {
//       now_date = nowObject.dates.start.localDate;
//     } else {
//       now_date =
//         nowObject.dates.start.localDate +
//         "\n" +
//         nowObject.dates.start.localTime;
//     }
//     let td_date = document.createElement("td");
//     td_date.innerText = now_date;

//     //icon-picture
//     var now_picture_url = nowObject.images[0].url;
//     let td_icon = document.createElement("td");
//     var img = document.createElement("img");
//     img.src = now_picture_url;
//     img.style.height = "98px";
//     td_icon.appendChild(img);

//     //event-res
//     var event_name = nowObject.name;
//     let td_event = document.createElement("td");
//     td_event.innerText = event_name;
//     td_event.className = "event_hover";
//     var td_event_id = nowObject.id;
//     var td_event_venue = nowObject._embedded.venues[0].name;
//     td_event.setAttribute("value1", td_event_id);
//     td_event.setAttribute("value2", td_event_venue);
//     td_event.onclick = function () {
//       now_event_name = td_event.innerText;
//       let temp1 = td_event.getAttribute("value1");
//       //fetch event
//       fetch(`/get_event_details?td_event_id=${temp1}`)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           } else {
//             return response.json();
//           }
//         })
//         .then((data) => {
//           event_details = data.event_details;
//           console.log(event_details);
//           createEventPage1();
//         })
//         .catch((error) => {
//           console.error("There was a problem with the fetch operation:", error);
//         });

//       //fetch venue
//       let temp2 = td_event.getAttribute("value2");
//       now_venue_name = temp2;
//       fetch(`/get_venue_details?td_venue_keyword=${temp2}`)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           } else {
//             return response.json();
//           }
//         })
//         .then((data) => {
//           venue_details = data.venue_details._embedded.venues[0];
//           console.log(venue_details);
//         })
//         .catch((error) => {
//           console.error("There was a problem with the fetch operation:", error);
//         });

//     };

//     //genre
//     var now_genre = nowObject.classifications[0].segment.name;
//     let td_genre = document.createElement("td");
//     td_genre.innerText = now_genre;

//     //venue
//     var now_venue = nowObject._embedded.venues[0].name;
//     let td_venue = document.createElement("td");
//     td_venue.innerText = now_venue;
//     var td_venue_id = nowObject.id;
//     td_venue.setAttribute("value", td_venue_id);

//     //insert
//     now_row.appendChild(td_date);
//     now_row.appendChild(td_icon);
//     now_row.appendChild(td_event);
//     now_row.appendChild(td_genre);
//     now_row.appendChild(td_venue);

//     //tbody insert
//     table_body.appendChild(now_row);
//   }
//   table1.appendChild(table_body);
//   div1.appendChild(table1);
// }

// function sortDate() {
//   if (sort_incending_date == 1) {
//     sort_incending_date = 0;
//     res_array.sort(function (a, b) {
//       return a.dates.start.dateTime.localeCompare(b.dates.start.dateTime);
//     });
//     console.log(res_array);
//     creatToTable();
//   } else {
//     sort_incending_date = 1;
//     res_array.sort(function (a, b) {
//       return b.dates.start.dateTime.localeCompare(a.dates.start.dateTime);
//     });
//     console.log(res_array);
//     creatToTable();
//   }
// }

// function sortEvent() {
//   if (sort_incending_event == 1) {
//     sort_incending_event = 0;
//     res_array.sort(function (a, b) {
//       return a.name.localeCompare(b.name);
//     });
//     creatToTable();
//   } else {
//     sort_incending_event = 1;
//     res_array.sort(function (a, b) {
//       return b.name.localeCompare(a.name);
//     });
//     creatToTable();
//   }
// }

// function sortGenre() {
//   if (sort_incending_genre == 1) {
//     sort_incending_genre = 0;
//     res_array.sort(function (a, b) {
//       return a.classifications[0].segment.name.localeCompare(
//         b.classifications[0].segment.name
//       );
//     });
//     creatToTable();
//   } else {
//     sort_incending_genre = 1;
//     res_array.sort(function (a, b) {
//       return b.classifications[0].segment.name.localeCompare(
//         a.classifications[0].segment.name
//       );
//     });
//     creatToTable();
//   }
// }

// function sortVenue() {
//   if (sort_incending_venue == 1) {
//     sort_incending_venue = 0;
//     res_array.sort(function (a, b) {
//       return a._embedded.venues[0].name.localeCompare(
//         b._embedded.venues[0].name
//       );
//     });
//     creatToTable();
//   } else {
//     sort_incending_venue = 1;
//     res_array.sort(function (a, b) {
//       return b._embedded.venues[0].name.localeCompare(
//         a._embedded.venues[0].name
//       );
//     });
//     creatToTable();
//   }
// }

// function createEventPage1() {
//   let div2 = document.getElementById("events_detail");
//   while (div2.hasChildNodes()) {
//     div2.removeChild(div2.firstChild);
//   }

//   let buto_div = document.getElementById("buttonOfvenue");
//   while (buto_div.hasChildNodes()) {
//     buto_div.removeChild(buto_div.firstChild);
//   }

//   let venue_div = document.getElementById("venue_detail");
//   while (venue_div.hasChildNodes()) {
//     venue_div.removeChild(venue_div.firstChild);
//   }

//   let header = document.createElement("h3");
//   header.innerText = now_event_name;
//   div2.appendChild(header);

//   //create child_div
//   let child_div = document.createElement("div");
//   child_div.className = "child_div";
//   div2.appendChild(child_div);

//   //create child_div_left
//   let child_div_left = document.createElement("div");
//   child_div_left.className = "child_div_left";
//   child_div.appendChild(child_div_left);

//   //create child_div_right
//   let child_div_right = document.createElement("div");
//   child_div_right.className = "child_div_right";
//   child_div.appendChild(child_div_right);

//   //create left_data_date
//   let h1 = document.createElement("h4");
//   h1.innerText = "Date";

//   let p1 = document.createElement("p");
//   if (typeof event_details.dates !== "undefined") {
//     if (typeof event_details.dates.start.localTime === "undefined") {
//       p1.innerText = event_details.dates.start.localDate;
//     } else {
//       p1.innerText =
//         event_details.dates.start.localDate +
//         " " +
//         event_details.dates.start.localTime;
//     }
//     child_div_left.appendChild(h1);
//     child_div_left.appendChild(p1);
//   }

//   //create left_data_artist/team
//   let h2 = document.createElement("h4");
//   h2.innerText = "Artist/Team";

//   let a1 = document.createElement("a");
//   let size = event_details._embedded.length;
//   if (size == 1) {
//     let name = event_details._embedded.attrations[0].name;
//     a1.innerText = name;
//     a1.href = event_details._embedded.attrations[0].url;
//     a1.target = "_blank";
//     child_div_left.appendChild(h2);
//     child_div_left.appendChild(a1);
//   } else if (size == 2) {
//     child_div_left.appendChild(h2);
//     let name1 = event_details._embedded.attrations[0].name;
//     a1.innerText = name1 + " | ";
//     a1.href = event_details._embedded.attrations[0].url;
//     a1.target = "_blank";
//     child_div_left.appendChild(a1);
//     let name2 = event_details._embedded.attrations[1].name;
//     let a2 = document.createElement("a");
//     a2.innerText = name2;
//     a2.href = event_details._embedded.attrations[1].url;
//     a2.target = "_blank";
//     child_div_left.appendChild(a2);
//   }

//   //create venue-data
//   let h3 = document.createElement("h4");
//   h3.innerText = "Venue";

//   let p3 = document.createElement("p");
//   p3.innerText = event_details._embedded.venues[0].name;
//   if (typeof event_details._embedded.venues[0].name !== "undefined") {
//     child_div_left.appendChild(h3);
//     child_div_left.appendChild(p3);
//   }

//   //create Genres
//   let h4 = document.createElement("h4");
//   h4.innerText = "Genres";

//   let segment = " ";
//   let subGenre = " ";
//   let genre = " ";
//   let subType = " ";
//   let type = " ";

//   let p4 = document.createElement("p");
//   if (typeof event_details.classifications[0].segment !== "undefined") {
//     segment = event_details.classifications[0].segment.name;
//   }
//   if (typeof event_details.classifications[0].subGenre !== "undefined") {
//     subGenre = event_details.classifications[0].subGenre.name;
//   }
//   if (typeof event_details.classifications[0].genre !== "undefined") {
//     genre = event_details.classifications[0].genre.name;
//   }
//   if (typeof event_details.classifications[0].subType !== "undefined") {
//     subType = event_details.classifications[0].subType.name;
//   }
//   if (typeof event_details.classifications[0].type !== "undefined") {
//     type = event_details.classifications[0].type.name;
//   }
//   var now_text = "";
//   if (checkIsvalid(segment) && segment != " ") {
//     now_text += segment;
//   }

//   if (
//     checkIsvalid(subGenre) &&
//     checkIsvalid(genre) & (subGenre != " ") &&
//     genre != " "
//   ) {
//     now_text += " | " + subGenre + "/" + genre;
//   } else if (checkIsvalid(subGenre) && subGenre != " ") {
//     now_text += " | " + subGenre;
//   } else if (!checkIsvalid(subGenre) && genre != " ") {
//     now_text += " | " + genre;
//   }

//   if (
//     checkIsvalid(subType) &&
//     checkIsvalid(type) &&
//     subType != " " &&
//     type != " "
//   ) {
//     now_text += " | " + subType + "/" + type;
//   } else if (checkIsvalid(subType) && subType != " ") {
//     now_text += " | " + subType;
//   } else if (!checkIsvalid(subType) && type != " ") {
//     now_text += " | " + type;
//   }

//   p4.innerText = now_text;
//   if (typeof event_details.classifications[0] !== "undefined") {
//     child_div_left.appendChild(h4);
//     child_div_left.appendChild(p4);
//   }

//   //create price-range
//   let h5 = document.createElement("h4");
//   h5.innerText = "Price Ranges";

//   let p5 = document.createElement("p");
//   if (typeof event_details.priceRanges !== "undefined") {
//     p5.innerText =
//       event_details.priceRanges[0].min +
//       " - " +
//       event_details.priceRanges[0].max +
//       " USD";
//   }
//   if (typeof event_details.priceRanges !== "undefined") {
//     child_div_left.appendChild(h5);
//     child_div_left.appendChild(p5);
//   }

//   //create Ticket-status
//   let h6 = document.createElement("h4");
//   h6.innerText = "Ticket Status";

//   let p6 = document.createElement("p");
//   // p6.className = "ticket-status";
//   if (typeof event_details.dates.status.code !== "undefined") {
//     p6.innerText = event_details.dates.status.code;
//     //check status
//     if (p6.innerText == "onsale") {
//       p6.innerText = "On Sale";
//       p6.className = "onsale";
//     } else if (p6.innerText == "rescheduled") {
//       p6.innerText = "Rescheduled";
//       p6.className = "rescheduled";
//     } else if (p6.innerText == "offsale") {
//       p6.innerText = "Off sale";
//       p6.className = "offsale";
//     } else if (p6.innerText == "canceled") {
//       p6.innerText = "Canceled";
//       p6.className = "canceled";
//     } else if (p6.innerText == "postponed") {
//       p6.innerText = "Postponed";
//       p6.className = "rescheduled";
//     }

//     child_div_left.appendChild(h6);
//     child_div_left.appendChild(p6);
//   }

//   //create buy-ticket-at
//   let h7 = document.createElement("h4");
//   h7.innerText = "Buy Ticket At:";

//   let a3 = document.createElement("a");
//   if (typeof event_details.url !== "undefined") {
//     a3.href = event_details.url;
//     a3.target = "_blank";
//     a3.innerText = "Ticketmaster";
//     child_div_left.appendChild(h7);
//     child_div_left.appendChild(a3);
//   }

//   //seat-image
//   let img = document.createElement("img");
//   img.style.height = "300px";
//   if (typeof event_details.seatmap.staticUrl !== "undefined") {
//     img.src = event_details.seatmap.staticUrl;
//     child_div_right.appendChild(img);
//   }

//   //creat show-venue-more
//   let div3 = document.getElementById("buttonOfvenue");
//   let button_venue = document.createElement("div");
//   let show_vene = document.createElement("p");
//   show_vene.className = "show-venue";
//   show_vene.innerText = "Show Venue Details";
//   div3.appendChild(show_vene);
//   // button_venue.innerText = "\u2304";
//   button_venue.className = "button_venue";
//   //click button
//   // button_venue.onclick = get_venue_details();
//   button_venue.setAttribute("onclick", "get_venue_details()");

//   div3.appendChild(button_venue);

//   //jump to page
//   window.location.hash = '#events_detail';
// }

// function get_venue_details() {
//   let div = document.getElementById("buttonOfvenue");
//   while (div.hasChildNodes()) {
//     div.removeChild(div.firstChild);
//   }

//   //get outline-border
//   let div4 = document.getElementById("venue_detail");
//   div4.className = "outline_border";

//   //creat-inline-border
//   //create outline-border
//   let div5 = document.createElement("div");
//   div5.className = "venue_details";
//   div4.appendChild(div5);

//   let header_venue = document.createElement("h3");
//   header_venue.className = "header_venue";
//   header_venue.innerText = now_venue_name;
//   div5.appendChild(header_venue);

//   //creat HR
//   // let hr = document.createElement("hr");
//   // hr.className = "hr2";
//   // div5.appendChild(hr);

//   //create child_div4
//   let child_div4 = document.createElement("div");
//   child_div4.className = "child_div4";
//   div5.appendChild(child_div4);

//   //create-div-left
//   let child_div4_left = document.createElement("div");
//   child_div4_left.className = "child_div4_left";
//   child_div4.appendChild(child_div4_left);

//   //create-div-right
//   let child_div4_right = document.createElement("div");
//   child_div4_right.className = "child_div4_right";

//   //address-div
//   let address_div = document.createElement("div");
//   address_div.className = "address";
//   child_div4_left.appendChild(address_div);

//   //address-header-div
//   let header_div = document.createElement("div");
//   header_div.className = "data_header_div";
//   let address_header = document.createElement("b");
//   address_header.innerText = "Address:";
//   header_div.appendChild(address_header);
//   address_div.appendChild(header_div);

//   //address-data-div
//   let data_div = document.createElement("div");
//   data_div.className = "header_data_div";
//   let address_data = document.createElement("p");
//   address_data.className = "address_data";
//   let now_data_address = " ";
//   let city = " ";
//   let state = " ";
//   let postalCode = " ";
//   if (typeof venue_details.address.line1 !== "undefined") {
//     now_data_address = venue_details.address.line1;
//   }
//   if (typeof venue_details.city.name !== "undefined") {
//     city = venue_details.city.name;
//   }
//   if (typeof venue_details.state.stateCode !== "undefined") {
//     state = venue_details.state.stateCode;
//   }
//   if (typeof venue_details.postalCode !== "undefined") {
//     postalCode = venue_details.postalCode;
//   }
//   let text = "";
//   let url_text = "";
//   if (now_data_address != " ") {
//     text += now_data_address + "\n";
//     url_text += now_data_address + ",";
//   }
//   if (city != " ") {
//     text += city + ", ";
//     url_text += city + ",";
//   }
//   if (state != " ") {
//     text += state + "\n";
//     url_text += state + ",";
//   }
//   if (postalCode != " ") {
//     text += postalCode;
//     url_text + postalCode;
//   }
//   address_data.innerText = text;
//   data_div.appendChild(address_data);
//   address_div.appendChild(data_div);

//   //google-map link
//   let google_url = document.createElement("a");
//   google_url.innerText = "Open in Google Maps";
//   google_url.href =
//     "https://www.google.com/maps/search/?api=1&query=" +
//     now_venue_name +
//     "," +
//     url_text;
//   google_url.target = "_blank";
//   child_div4_left.appendChild(google_url);

//   //divided-line
//   let divided_line = document.createElement("div");
//   divided_line.className = "divided_line";
//   child_div4.appendChild(divided_line);

//   //more-event
//   let more_event = document.createElement("a");
//   more_event.innerText = "More events in this venue";
//   more_event.href = venue_details.url;
//   more_event.target = "_blank";
//   child_div4_right.appendChild(more_event);
//   child_div4.appendChild(child_div4_right);

//   //jump to page
//   window.location.hash = 'venue_detail';
// }

// function checkIsvalid(str) {
//   if (typeof str !== "undefined") {
//     return true;
//   }
// }

// function inValidValue() {
//   const tab1 = document.getElementById("tab1");
//   const event = document.getElementById("events_detail");
//   const button = document.getElementById("buttonOfvenue");
//   const venue = document.getElementById("venue_detail");
//   while (tab1.hasChildNodes()) {
//     tab1.removeChild(tab1.firstChild);
//   }
//   while (event.hasChildNodes()) {
//     event.removeChild(event.firstChild);
//   }
//   while (button.hasChildNodes()) {
//     button.removeChild(button.firstChild);
//   }
//   while (venue.hasChildNodes()) {
//     venue.removeChild(venue.firstChild);
//   }

//   venue.className = "none-display";

//   let errortag = document.createElement("div");
//   errortag.appendChild(document.createTextNode("No Records found"));
//   errortag.className = "errortag";
//   tab1.appendChild(errortag);
// }

// function clearall() {
//   const tab1 = document.getElementById("tab1");
//   const event = document.getElementById("events_detail");
//   const button = document.getElementById("buttonOfvenue");
//   const venue = document.getElementById("venue_detail");
//   while (tab1.hasChildNodes()) {
//     tab1.removeChild(tab1.firstChild);
//   }
//   while (event.hasChildNodes()) {
//     event.removeChild(event.firstChild);
//   }
//   while (button.hasChildNodes()) {
//     button.removeChild(button.firstChild);
//   }
//   while (venue.hasChildNodes()) {
//     venue.removeChild(venue.firstChild);
//   }

//   venue.className = "none-display";

//   const mykeyword = document.getElementById("mykeyword");
//   const distance = document.getElementById("mydistance");
//   const category = document.getElementById("mycategory");
//   const checkbox = document.getElementById("mylocation");
//   const location = document.getElementById("mylocation1");

//   mykeyword.value = "";
//   distance.value = "10";
//   category.value = "default";
//   checkbox.checked = false;
//   location.value = "";
//   location.type = "text";
//   user_location;
//   hash_location;
//   profile_data;
//   res_array = [];
//   event_details;
//   venue_details;
//   now_event_name;
//   now_venue_name;
//   sort_incending_date = 1;
//   sort_incending_event = 1;
//   sort_incending_genre = 1;
//   sort_incending_venue = 1;
// }






