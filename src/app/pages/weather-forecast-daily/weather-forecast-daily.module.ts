import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeatherForecastDailyPageRoutingModule } from './weather-forecast-daily-routing.module';

import { WeatherForecastDailyPage } from './weather-forecast-daily.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeatherForecastDailyPageRoutingModule
  ],
  declarations: [WeatherForecastDailyPage]
})
export class WeatherForecastDailyPageModule {}
