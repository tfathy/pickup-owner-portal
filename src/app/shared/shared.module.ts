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
import { CountryComponent } from '../pages/country/country/country.component';
import { CurrencyComponent } from '../pages/currency/currency/currency.component';
import { VclTypeComponent } from '../pages/vcl-type/vcl-type/vcl-type.component';
import { UomComponent } from '../pages/uom/uom/uom.component';
import { PayMethodComponent } from '../pages/pay-method/pay-method/pay-method.component';
import { ServicesComponent } from '../pages/services/services/services.component';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    HomeButtonComponent,
    BuildingTypeComponent,
    CategoryComponent,
    CountryComponent,
    CurrencyComponent,
    VclTypeComponent,
    UomComponent,
    PayMethodComponent,
    ServicesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
    DataTablesModule,
    IonicSelectableModule,
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
    IonicSelectableModule,
    HomeButtonComponent,
    CategoryComponent,
    CountryComponent,
    CurrencyComponent,
    VclTypeComponent,
    UomComponent,
    PayMethodComponent,
    ServicesComponent,
  ],
})
export class SharedModule {}
