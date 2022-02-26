import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LightingMapViewPageRoutingModule } from './lighting-map-view-routing.module';

import { LightingMapViewPage } from './lighting-map-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LightingMapViewPageRoutingModule
  ],
  declarations: [LightingMapViewPage]
})
export class LightingMapViewPageModule {}
