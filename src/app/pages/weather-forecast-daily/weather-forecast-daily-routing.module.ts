import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherForecastDailyPage } from './weather-forecast-daily.page';

const routes: Routes = [
  {
    path: '',
    component: WeatherForecastDailyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeatherForecastDailyPageRoutingModule {}
