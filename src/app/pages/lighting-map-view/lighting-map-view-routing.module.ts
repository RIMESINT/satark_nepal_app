import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LightingMapViewPage } from './lighting-map-view.page';

const routes: Routes = [
  {
    path: '',
    component: LightingMapViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LightingMapViewPageRoutingModule {}
