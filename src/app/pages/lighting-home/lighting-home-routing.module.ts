import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LightingHomePage } from './lighting-home.page';

const routes: Routes = [
  {
    path: '',
    component: LightingHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LightingHomePageRoutingModule {}
