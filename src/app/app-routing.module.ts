import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'country',
    loadChildren: () => import('./pages/country/country.module').then( m => m.CountryPageModule)
  },
  {
    path: 'currency',
    loadChildren: () => import('./pages/currency/currency.module').then( m => m.CurrencyPageModule)
  },
  {
    path: 'sub-request',
    loadChildren: () => import('./pages/sub-request/sub-request.module').then( m => m.SubRequestPageModule)
  },
  {
    path: 'sub-mgt',
    loadChildren: () => import('./pages/sub-mgt/sub-mgt.module').then( m => m.SubMgtPageModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./pages/employee/employee.module').then( m => m.EmployeePageModule)
  },
  {
    path: 'job',
    loadChildren: () => import('./pages/job/job.module').then( m => m.JobPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./pages/services/services.module').then( m => m.ServicesPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./pages/category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'items',
    loadChildren: () => import('./pages/items/items.module').then( m => m.ItemsPageModule)
  },
  {
    path: 'uom',
    loadChildren: () => import('./pages/uom/uom.module').then( m => m.UomPageModule)
  },
  {
    path: 'item-service',
    loadChildren: () => import('./pages/item-service/item-service.module').then( m => m.ItemServicePageModule)
  },
  {
    path: 'pay-method',
    loadChildren: () => import('./pages/pay-method/pay-method.module').then( m => m.PayMethodPageModule)
  },
  {
    path: 'vcl-type',
    loadChildren: () => import('./pages/vcl-type/vcl-type.module').then( m => m.VclTypePageModule)
  },
  {
    path: 'building-type',
    loadChildren: () => import('./pages/building-type/building-type.module').then( m => m.BuildingTypePageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then( m => m.UsersPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
