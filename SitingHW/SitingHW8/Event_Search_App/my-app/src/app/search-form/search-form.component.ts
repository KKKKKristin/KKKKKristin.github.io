import { Component, OnInit, Injectable, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormClass } from './formClass';
import { TableItem } from './tableItem';
import { Suggestion } from './suggestion';
import { Ipinfo } from './ipinfo';
import {Coordinates} from './Coordinates'
import { DetailsCardComponent } from '../details-card/details-card.component';


import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, filter } from 'rxjs/operators';

@Injectable ({
  providedIn: 'root'
})

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})

export class SearchFormComponent implements OnInit {
  keyWordCtrl = new FormControl();
  selectCtrl = new FormControl();
  filteredOptions: any;
  isLoading = false;
  errorMsg!: string;
  minLengthTerm = 1;
  buttonState = false;
  lng = 0;
  lat = 0;



@ViewChild("testing") myNameElem: ElementRef | undefined;
@ViewChild("locInput") locInput: ElementRef | undefined;

@ViewChild(DetailsCardComponent) detailsCardChildComponent: DetailsCardComponent;

  

  display_control = false;

  click_index = -1;


  // selectedKeyword: any = "";

  options: Array<string> = [];

  nrSelect = "Default";
  nrInput = "10";
  // Businesses: Array<TableItem> = [];
  Businesses: any[] = [];
  result: any[] = [];
  events: any[] = [];

  // port = '${process.env.API_BASE_URL}';
  
  // private url = 'https://ticketmaster-event.de.r.appspot.com/getTable';
  private url = 'https://ticketmaster-event.de.r.appspot.com/getTable';
  constructor (private http: HttpClient) {}

  // auto complete
  ngOnInit(): void {
    this.selectCtrl.setValue("all");
    this.keyWordCtrl.valueChanges.pipe(filter(res => {
      return res !== null && res.length >=this.minLengthTerm
    }),
    distinctUntilChanged(),
        debounceTime(1000),
        tap(() => {
          this.errorMsg = "";
          this.options = [];
          this.isLoading = true;
          console.log(this.isLoading);
        }),
        switchMap(value => this.http.get<any[]>('/autoComplete?key='+value)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            }),
          )
        )
      )
      .subscribe((data: Suggestion[]) => { //console.log(data);
        if (data == undefined) {
          this.errorMsg = data['Error'];
          this.options = [];
        } else {
          this.errorMsg = "";
          this.options = data.map((item)=>item["text"]);
          console.log(this.options);
        }
        //console.log(data);
      });


  }

  onclick_result(a:number) {

      this.click_index = a;

  }

  // check if it's auto-detection
  disableLoc(f:NgForm){
    if(!this.locInput)
      return;
    this.locInput.nativeElement.disabled = !f.value.autoLoc;
    f['controls']['loc'].reset();
    //this.locInput.nativeElement.disable() = f.value.checkbox;
  }

  async getLoc(){
    console.log("ipinfo get lat/lng");
    // return this.http.get<Ipinfo>("https://ipinfo.io/json?token=e7a797d54c1bba");
    var response = await fetch("https://ipinfo.io/json?token=e10417f04ac5a2");
    var result = await response.json();
    var arr = result.loc.split(",")
    this.lat = Number(arr[0]);
    this.lng = Number(arr[1]);
    console.log(this.lat, this.lng);
  }

  sortEvent() {
    this.events.sort(function (p1:any, p2:any) {
      return p1.dates.start.localDate.localeCompare(p2.dates.start.localDate);      
    });
}

  // http get request to send data to node.js
  async onSubmitTemplateBased(f:NgForm) {
    if(!this.myNameElem) return;
    // console.log(this.selectCtrl.value);
    // console.log(f.value);
    if(!this.myNameElem.nativeElement.reportValidity())
      return;
    console.log(2322223323);
    let url = "";

    if(f.value.autoLoc){
          await this.getLoc();
          // console.log(f);
          // let params = new HttpParams().set('key', this.keyWordCtrl.value)
          // .set('dist', f.value.dist)
          // .set('cat', this.selectCtrl.value)
          // .set('loc', f.value.loc)
          // .set('autoLoc', f.value.autoLoc)
          // .set('lat', this.lat)
          // .set('lng', this.lng);
          // console.log(params);
          // this.http.get<any[]>(this.url, { params: params, withCredentials: true})
          // console.log(this.lat, this.lng);
          // url = ("https://ticketmaster-event.de.r.appspot.com/getTable?key="+this.keyWordCtrl.value+"&dist="+f.value.dist+"&cat="+this.selectCtrl.value+"&loc="+f.value.loc+"&autoLoc="+f.value.autoLoc+"&lat="+this.lat+"&lng="+this.lng)
          url = ("https://ticketmaster-event.de.r.appspot.com/getTable?key="+this.keyWordCtrl.value+"&dist="+f.value.dist+"&cat="+this.selectCtrl.value+"&loc="+f.value.loc+"&autoLoc="+f.value.autoLoc+"&lat="+this.lat+"&lng="+this.lng)
          console.log(url);
          var response = await fetch(url);
          // console.log(response);
          var result = await response.json();
      
          this.result = result;

          // this.events = result._embedded.events;
          this.events = result?._embedded?.events||'';


          console.log(result);
          
          this.sortEvent();

          if(this.events.length>0){
            this.click_index = 21;
          }

          
        
    }
    else{
      let params = new HttpParams()
      .set('key', this.keyWordCtrl.value)
      .set('dist', f.value.dist)
      .set('cat', this.selectCtrl.value)
      .set('loc', f.value.loc)
      .set('autoLoc', f.value.autoLoc)
      .set('lat', this.lat)
      .set('lng', this.lng);
      console.log(params);
      // url = ("https://ticketmaster-event.de.r.appspot.com/getTable?key="+this.keyWordCtrl.value+"&dist="+f.value.dist+"&cat="+this.selectCtrl.value+"&loc="+f.value.loc+"&autoLoc="+f.value.autoLoc+"&lat="+this.lat+"&lng="+this.lng)
      url = ("https://ticketmaster-event.de.r.appspot.com/getTable?key="+this.keyWordCtrl.value+"&dist="+f.value.dist+"&cat="+this.selectCtrl.value+"&loc="+f.value.loc+"&autoLoc="+f.value.autoLoc+"&lat="+this.lat+"&lng="+this.lng)
      console.log(url);
      var response = await fetch(url);
      var result = await response.json();
      
      this.result = result;
      this.events = result?._embedded?.events||'';
      console.log(result);

      this.sortEvent();

      
      if(this.events.length>0){
        this.click_index = 21;
      }
        
      // this.http.get<any[]>("/getTable?latitude="+lat+"&longitude="+lng+"&distance="+f.value.dist+"&event="+this.keyWordCtrl.value+"&category="+this.selectCtrl.value)
      
      
      // this.http.get<any[]>(this.url, { params: params, withCredentials: true})
      // .subscribe(
      //   (data:any[]) => {console.log("already go in backend");this.Businesses = data; }

        // (data:TableItem[]) => {console.log("already go in backend");this.Businesses = data; if(data.length>0) this.click_index = 11;}
        
        // this.Businesses = data.map(item => {
        //   return {
        //     id: item.id,
        //     alias: item.alias,
        //     name: item.name,
        //     image_url: item.image_url,
        //     is_closed: item.is_closed,
        //     url: item.url,
        //     review_count: item.review_count,
        //     categories: item.categories,
        //     rating: item.rating,
        //     coordinates: item.coordinates,
        //     price: item.price,
        //     transactions: item.transactions,
        //     location: item.location,
        //     phone: item.phone,
        //     display_phone: item.display_phone,
        //     distance: item.distance
        //   };
        // });
      
        // `id: ${data.id} alias: ${data.alias}`
      // );
    }
    
    
    // await this.detailsCardChildComponent.getArtistSpotify();
   

 }

 // reset the form in web
 reset_function(f:NgForm){
   this.click_index = -1;
   this.keyWordCtrl.reset();
   this.selectCtrl.reset();
   this.selectCtrl.setValue("all");
   if(this.locInput)
   this.locInput.nativeElement.disabled = false;

   f.resetForm( {'dist':10});


 }


}
