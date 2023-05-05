import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { TableItem } from '../search-form/tableItem';
import { Categories } from '../search-form/Categories';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ReviewComponent} from '../details-card/ReviewComponent';
import { Marker } from '../details-card/Marker';
import { MapOptions } from '../details-card/MapOptions';
import { FormControl, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Reservation } from '../details-card/Reservation';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.css'],
  providers:[DatePipe]
})
export class DetailsCardComponent implements OnInit {
  myDate = new Date();
  // @Input () BusinessItem: TableItem | undefined;
  @Input () eventsItem: any | undefined;
  @ViewChild("bookingForm") myNameElem: ElementRef | undefined;
  @ViewChild('closebutton') childModal: ElementRef | undefined;

  mapUrl: string;
  marker:Marker | undefined;
  mapOptions: MapOptions | undefined;
  myDateMin: any;
  isSubmitted = false;
  photos: string[]=[];
  review: ReviewComponent[] | undefined;

  venueLat:any;
  venueLng:any;

  spotifyResult:any;
  items: any[] = [];

  albumCovers:any;
  albumCovers_0:any;
  albumCovers_1:any;
  albumCovers_2:any;

  displayedGeneralRule: string;
  displayedChildRule: string;
  displayedOpenHours:string;
  fullGeneralRule: string;
  fullChildRule: string;
  openHours: string;
  maxLength = 50;
  showMoreLessBtn = false;
  showMoreLessBtn2 = false;
  showMoreLessBtn3 = false;
  showMoreText = 'Show More';
  showMoreText2 = 'Show More';
  showMoreText3 = 'Show More';


  @Output() goback = new EventEmitter<number>();

  constructor(private http: HttpClient, private datePipe: DatePipe) {
    this.myDateMin = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }

  async getAlbum(spotify_result:any){
    var album_url = ("https://ticketmaster-event.de.r.appspot.com/getAlbum?artistId="+spotify_result.artists.items[0].id);
    // var album_url = ("http://ticketmaster-event.de.r.appspot.com/getAlbum?artistId="+spotify_result.artists.items[0].id);

    console.log("album_url: "+album_url);

   
      let response = await fetch(album_url);
      let result = await response.json();
  
      this.albumCovers = result;
      
      console.log(this.albumCovers);
      this.albumCovers_0 = this.albumCovers[0];
      this.albumCovers_1 = this.albumCovers[1];
      this.albumCovers_2 = this.albumCovers[2];

   
  }
  //  async getArtistSpotify() {
  //   var spotify_url="";
  //   var spotify_url = ("https://ticketmaster-event.de.r.appspot.com/getSpotify?attraction="+this.eventsItem._embedded.attractions[0].name);
  //   console.log(spotify_url);
   
  //   let response = await fetch(spotify_url);
  //   let result = await response.json();

  //   this.spotifyResult = result;
  //   console.log(this.spotifyResult);
  //   }

  ngOnInit(): void {
    //console.log(this.BusinessItem);
    if(!this.eventsItem)
      return;

   //google-map
    this.marker = new Marker(Number(this.eventsItem._embedded.venues[0].location.latitude),Number(this.eventsItem._embedded.venues[0].location.longitude));
    this.mapOptions = new MapOptions(this.marker, 18);
    // this.marker.lat = Number(this.eventsItem._embedded.venues[0].location.latitude);
    this.venueLat = parseFloat(this.eventsItem._embedded.venues[0].location.latitude);
    // this.marker.lng = Number(this.eventsItem._embedded.venues[0].location.latitude);
    this.venueLng = parseFloat(this.eventsItem._embedded.venues[0].location.longitude);
    console.log("the latlng send in google map is: "+this.venueLat+" "+this.venueLng);


    // this.mapUrl ="https://www.google.com/maps/search/?api=1&query={{eventsItem._embedded.venues[0].address.line1}}"
    //  console.log("google map search : "+ this.eventsItem._embedded.venues[0].location.latitude+" "+this.eventsItem._embedded.venues[0].location.longitude);
    // this.mapUrl ="https://www.google.com/maps/search/?api=1&query=${eventsItem._embedded.venues[0].address.line1}%2C${eventsItem._embedded.venues[0].city.name}%2C${eventsItem._embedded.venues[0].state.stateCode}%2C${eventsItem._embedded.venues[0].postalCode}"


    // artist/teams card

   
    // var spotify_url = ("https://ticketmaster-event.de.r.appspot.com/getSpotify?attraction="+this.eventsItem._embedded.attractions?.[0].name||'');
    var spotify_url = ("https://ticketmaster-event.de.r.appspot.com/getSpotify?attraction="+this.eventsItem._embedded.attractions?.[0].name||'');
    console.log(spotify_url);
   
    // let response = await fetch(spotify_url);
    // let result = await response.json();
    this.http.get(spotify_url).subscribe((data:any) => {this.spotifyResult = data;   this.items = this.spotifyResult?.artists?.items||''; console.log(this.items.length) ; this.getAlbum(this.spotifyResult)});


    // var album_url = ("/getAlbum?artistId"+this.spotifyResult.artists.items[0].id);

    // console.log("artist id: "+this.spotifyResult.artists.items[0].id);

    // this.http.get(album_url).subscribe((data:any) => {
    // console.log(data);
    // this.albumCovers = data;
    // });

    // this.items = this.spotifyResult.artists.items;

    // this.spotifyResult = this.result.json();

    // this.spotifyResult = result;


    // var params = new HttpParams().set('id', this.eventsItem.id);
    // var url = 'https://businesssearch-363201.uw.r.appspot.com/card';
    // this.http.get<string[]>(url, { params: params})
    // .subscribe(
    //  (data:string[]) => {this.photos = data;}
    // );

    //review card
    // var review_url = 'https://businesssearch-363201.uw.r.appspot.com/review';
    // this.http.get<ReviewComponent[]>(review_url, { params: params})
    // .subscribe(
    //  (data:ReviewComponent[]) => {this.review = data;}
    // );


    // for wrap message using "learn more buttom"
    this.fullGeneralRule = this.eventsItem._embedded.venues[0].generalInfo?.generalRule || '';

    if (this.fullGeneralRule.length > this.maxLength) {
      this.displayedGeneralRule = this.fullGeneralRule.substring(0, this.maxLength) + '...';
      this.showMoreLessBtn = true;
    } else {
      this.displayedGeneralRule = this.fullGeneralRule;
    }

    this.fullChildRule = this.eventsItem._embedded.venues[0].generalInfo?.childRule || '';

    if (this.fullChildRule.length > this.maxLength) {
      this.displayedChildRule = this.fullChildRule.substring(0, this.maxLength) + '...';
      this.showMoreLessBtn2 = true;
    } else {
      this.displayedChildRule = this.fullChildRule;
    }

    this.openHours = this.eventsItem._embedded.venues[0].boxOfficeInfo?.openHoursDetail || "";

    if (this.openHours.length > this.maxLength) {
      this.displayedOpenHours = this.openHours.substring(0, this.maxLength) + '...';
      this.showMoreLessBtn3 = true;
    } else {
      this.displayedOpenHours = this.openHours;
    }

  }

  goBack() {
      this.goback.emit(21);
      // this.goback.emit(11);
  }

  // toggle "learn more" and "learn less"
  toggleMoreLess(): void {
    if (this.showMoreText === 'Show More') {
      this.displayedGeneralRule = this.fullGeneralRule;
      this.showMoreText = 'Show Less';
    } else {
      this.displayedGeneralRule = this.fullGeneralRule.substring(0, this.maxLength) + '...';
      this.showMoreText = 'Show More';
    }
  }

  toggleMoreLess2(): void {
    if (this.showMoreText2 === 'Show More') {
      this.displayedChildRule = this.fullChildRule;
      this.showMoreText2 = 'Show Less';
    } else {
      this.displayedChildRule = this.fullChildRule.substring(0, this.maxLength) + '...';
      this.showMoreText2 = 'Show More';
    }
  }

  toggleMoreLess3(): void {
    if (this.showMoreText3 === 'Show More') {
      this.displayedOpenHours = this.openHours;
      this.showMoreText3 = 'Show Less';
    } else {
      this.displayedOpenHours = this.openHours.substring(0, this.maxLength) + '...';
      this.showMoreText3 = 'Show More';
    }
  }

  submitReservation(f:NgForm) {
    if(!this.myNameElem) return;
    // console.log(f.controls['date']);
    this.isSubmitted = true;
    if(f.valid==false)
      return;
    // console.log(f.controls['email'].valid);
    if (!this.eventsItem)
      return;
    var reservation = new Reservation(this.eventsItem.name,this.eventsItem.dates.start.localDate,this.eventsItem.classifications?.[0].genre?.name || '',this.eventsItem._embedded.venues[0].name );
    localStorage.setItem(this.eventsItem.id, JSON.stringify(reservation));
    console.log(JSON.stringify(reservation));
    alert("Event Added to Favorites!");
    console.log(this.childModal);
    if(this.childModal)
    {

      this.childModal.nativeElement.click();

    }



  }

  getErrors(f:NgForm,key:string){
    console.log(111);
    if(f.controls['key']){
      console.log(222);
      return f.controls['key'].invalid;
    }
    else
      return false;
  }

  haskey(key:string):boolean{
    if(localStorage.getItem(key) === null){
      return false;
    }
    else return true;
  }

  deleteBooking(key:string){
    localStorage.removeItem(key);
    alert("Event Removed from Favorites!");
  }

  closeModal(f:NgForm){
    this.isSubmitted = false;
    f.reset();
  }

  getCategory(data:Categories[]){
  var str = "";
  for(var i=0;i<data.length;i++){
      str += data[i].title;
      if(i<data.length-1)
        str += ' | ';
  }
  return str;
}



}
