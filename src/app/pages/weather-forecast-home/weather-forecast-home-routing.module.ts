import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherForecastHomePage } from './weather-forecast-home.page';

const routes: Routes = [
  {
    path: '',
    component: WeatherForecastHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeatherForecastHomePageRoutingModule {}
