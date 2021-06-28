import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuildingTypePageRoutingModule } from './building-type-routing.module';

import { BuildingTypePage } from './building-type.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuildingTypePageRoutingModule,
    SharedModule
  ],
  declarations: [BuildingTypePage]
})
export class BuildingTypePageModule {}
