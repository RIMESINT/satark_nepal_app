import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeatherForecastHomePageRoutingModule } from './weather-forecast-home-routing.module';

import { WeatherForecastHomePage } from './weather-forecast-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeatherForecastHomePageRoutingModule
  ],
  declarations: [WeatherForecastHomePage]
})
export class WeatherForecastHomePageModule {}
