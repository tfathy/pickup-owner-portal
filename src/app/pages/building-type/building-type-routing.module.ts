import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuildingTypePage } from './building-type.page';

const routes: Routes = [
  {
    path: '',
    component: BuildingTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuildingTypePageRoutingModule {}
