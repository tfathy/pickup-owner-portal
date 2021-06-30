import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HomeButtonComponent } from './components/home-button/home-button.component';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BuildingTypeComponent } from '../pages/building-type/components/building-type/building-type.component';
import { CategoryComponent } from '../pages/category/category/category.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [HomeButtonComponent,BuildingTypeComponent,CategoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
    DataTablesModule
  ],
  exports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    HttpClientModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
    DataTablesModule,
    HomeButtonComponent,
    CategoryComponent
  ],
})
export class SharedModule {}
