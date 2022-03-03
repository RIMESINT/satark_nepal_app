import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'lighting-home',
    loadChildren: () => import('./pages/lighting-home/lighting-home.module').then( m => m.LightingHomePageModule)
  },
  {
    path: 'lighting-map-view',
    loadChildren: () => import('./pages/lighting-map-view/lighting-map-view.module').then( m => m.LightingMapViewPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'weather-forecast-home',
    loadChildren: () => import('./pages/weather-forecast-home/weather-forecast-home.module').then( m => m.WeatherForecastHomePageModule)
  },
  {
    path: 'weather-forecast-daily',
    loadChildren: () => import('./pages/weather-forecast-daily/weather-forecast-daily.module').then( m => m.WeatherForecastDailyPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
