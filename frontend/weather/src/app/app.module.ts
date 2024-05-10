import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { WeatherService } from './weather.service';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [WeatherService],
  bootstrap: [AppModule]
})
export class AppModule { }