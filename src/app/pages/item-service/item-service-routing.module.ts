import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemServicePage } from './item-service.page';

const routes: Routes = [
  {
    path: '',
    component: ItemServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemServicePageRoutingModule {}
