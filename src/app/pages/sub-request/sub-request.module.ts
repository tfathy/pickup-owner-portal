import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubRequestPageRoutingModule } from './sub-request-routing.module';

import { SubRequestPage } from './sub-request.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubRequestPageRoutingModule,
    SharedModule
  ],
  declarations: [SubRequestPage]
})
export class SubRequestPageModule {}
