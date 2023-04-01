import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';


import { SearchComponent } from './search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { ResultsTableComponent } from './results-table/results-table.component';
import { DetailsCardComponent } from './details-card/details-card.component';
// import { ReservationFormComponent } from './reservation-form/reservation-form.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// import {RoundProgressModule} from 'angular-svg-round-progressbar';
// import { AgmCoreModule } from '@agm/core';
import {ModalModule} from 'ngx-bootstrap/modal';
import { RoundProgressModule } from 'angular-svg-round-progressbar';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FavoritesComponent,
    SearchFormComponent,
    ResultsTableComponent,
    DetailsCardComponent,
    // ReservationFormComponent
  ],
  imports: [
    AppRoutingModule,
    FontAwesomeModule,
    BrowserModule,
    BrowserAnimationsModule,
    // NgbModule,
    // NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,

    MatIconModule,
    MatButtonModule,

    MatTabsModule,
    GoogleMapsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RoundProgressModule,
    ModalModule.forRoot()
    // RoundProgressModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyDRm6eke0AgBCdf-4QGRrYOhktzb4y8Jos'
    // }),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
