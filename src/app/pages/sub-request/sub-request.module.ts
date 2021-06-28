import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubRequestPageRoutingModule } from './sub-request-routing.module';

import { SubRequestPage } from './sub-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubRequestPageRoutingModule
  ],
  declarations: [SubRequestPage]
})
export class SubRequestPageModule {}
