import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LightingHomePageRoutingModule } from './lighting-home-routing.module';

import { LightingHomePage } from './lighting-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LightingHomePageRoutingModule
  ],
  declarations: [LightingHomePage]
})
export class LightingHomePageModule {}
