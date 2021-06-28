import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubMgtPage } from './sub-mgt.page';

const routes: Routes = [
  {
    path: '',
    component: SubMgtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubMgtPageRoutingModule {}
