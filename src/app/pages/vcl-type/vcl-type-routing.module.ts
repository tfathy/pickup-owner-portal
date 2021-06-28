import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VclTypePage } from './vcl-type.page';

const routes: Routes = [
  {
    path: '',
    component: VclTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VclTypePageRoutingModule {}
