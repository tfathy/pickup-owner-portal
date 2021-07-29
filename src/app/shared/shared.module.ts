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
import { ItemsComponent } from '../pages/items/items/items.component';
import { ItemServiceComponent } from '../pages/item-service/item-service/item-service.component';
import { EmployeeComponent } from '../pages/employee/employee/employee.component';
import { UsersComponent } from '../pages/users/users/users.component';
import { SubRequestComponent } from '../pages/sub-request/sub-request/sub-request.component';
import { SpComponent } from '../pages/sub-mgt/sp/sp.component';

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
    ItemsComponent,
    ItemServiceComponent,
    EmployeeComponent,
    UsersComponent,
    SubRequestComponent,
    SpComponent
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
    ItemsComponent,
    ItemServiceComponent,
    EmployeeComponent,
    UsersComponent,
    SubRequestComponent,
    SpComponent
  ],
})
export class SharedModule {}
