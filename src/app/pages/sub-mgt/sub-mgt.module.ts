import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubMgtPageRoutingModule } from './sub-mgt-routing.module';

import { SubMgtPage } from './sub-mgt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubMgtPageRoutingModule
  ],
  declarations: [SubMgtPage]
})
export class SubMgtPageModule {}
