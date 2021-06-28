import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubMgtPageRoutingModule } from './sub-mgt-routing.module';

import { SubMgtPage } from './sub-mgt.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubMgtPageRoutingModule,
    SharedModule
  ],
  declarations: [SubMgtPage]
})
export class SubMgtPageModule {}
