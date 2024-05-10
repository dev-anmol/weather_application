import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faToggleOn } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from './weather.service';
import { FormsModule } from '@angular/forms';
import {format} from 'date-fns'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, FormsModule, CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'weather-app';
  weatherData: any[] = [];
  cities: string[] = ['Delhi', 'Mumbai', 'Bangalore'];
  today = format(new Date(), 'yyyy-MM-dd');
  faSearch = faSearch;
  faHome = faHome;
  faGear = faGear;
  faUser = faUser;
  faToggleOn = faToggleOn
  darkmode = false;
  searchCity: string = '';

  constructor(private weatherService: WeatherService,) {}
  ngOnInit() {
    this.getCitiesWeather();
  }
  getCitiesWeather() {
    this.weatherService.getWeather(this.cities).subscribe(
      (data) => {
        this.weatherData = data;
      },
      (error) => {
        console.error('Error fetching weather data:', error);
      }
    );
  }
  modetoggle(){
    this.darkmode = !this.darkmode;
    document.documentElement.setAttribute('data-theme', this.darkmode ? "dark" : "light");
  }
  searchWeather() {
    if (this.searchCity.trim() !== '') {
      this.weatherService.searchWeatherByCity(this.searchCity.trim()).subscribe(
        (data) => {
          console.log(data);
          this.weatherData = [data]; 
          this.searchCity = '';
        },
        (error) => {
          console.error('Error fetching weather data for city:', error);
          this.weatherData = [];
        }
      );
    }
  }
}
