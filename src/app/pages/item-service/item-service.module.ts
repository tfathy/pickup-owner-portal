import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemServicePageRoutingModule } from './item-service-routing.module';

import { ItemServicePage } from './item-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemServicePageRoutingModule
  ],
  declarations: [ItemServicePage]
})
export class ItemServicePageModule {}
