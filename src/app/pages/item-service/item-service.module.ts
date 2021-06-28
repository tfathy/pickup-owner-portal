import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemServicePageRoutingModule } from './item-service-routing.module';

import { ItemServicePage } from './item-service.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemServicePageRoutingModule,
    SharedModule
  ],
  declarations: [ItemServicePage]
})
export class ItemServicePageModule {}
