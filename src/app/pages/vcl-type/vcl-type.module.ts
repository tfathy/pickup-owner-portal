import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VclTypePageRoutingModule } from './vcl-type-routing.module';

import { VclTypePage } from './vcl-type.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VclTypePageRoutingModule,
    SharedModule
  ],
  declarations: [VclTypePage]
})
export class VclTypePageModule {}
