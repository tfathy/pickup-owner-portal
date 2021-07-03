import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
    ,canLoad:[AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'country',
    loadChildren: () => import('./pages/country/country.module').then( m => m.CountryPageModule)
    ,canLoad:[AuthGuard]
  },
  {
    path: 'currency',
    loadChildren: () => import('./pages/currency/currency.module').then( m => m.CurrencyPageModule)
    ,canLoad:[AuthGuard]
  },
  {
    path: 'sub-request',
    loadChildren: () => import('./pages/sub-request/sub-request.module').then( m => m.SubRequestPageModule)
     ,canLoad:[AuthGuard]
  },
  {
    path: 'sub-mgt',
    loadChildren: () => import('./pages/sub-mgt/sub-mgt.module').then( m => m.SubMgtPageModule)
    ,canLoad:[AuthGuard]
  },
  {
    path: 'employee',
    loadChildren: () => import('./pages/employee/employee.module').then( m => m.EmployeePageModule)
    ,canLoad:[AuthGuard]
  },
  {
    path: 'services',
    loadChildren: () => import('./pages/services/services.module').then( m => m.ServicesPageModule)
    ,canLoad:[AuthGuard]
  },
  {
    path: 'category',
    loadChildren: () => import('./pages/category/category.module').then( m => m.CategoryPageModule)
    ,canLoad:[AuthGuard]
  },
  {
    path: 'items',
    loadChildren: () => import('./pages/items/items.module').then( m => m.ItemsPageModule)
    ,canLoad:[AuthGuard]
  },
  {
    path: 'uom',
    loadChildren: () => import('./pages/uom/uom.module').then( m => m.UomPageModule)
    ,canLoad:[AuthGuard]
  },
  {
    path: 'item-service',
    loadChildren: () => import('./pages/item-service/item-service.module').then( m => m.ItemServicePageModule)
    ,canLoad:[AuthGuard]
  },
  {
    path: 'pay-method',
    loadChildren: () => import('./pages/pay-method/pay-method.module').then( m => m.PayMethodPageModule)
    ,canLoad:[AuthGuard]
  },
  {
    path: 'vcl-type',
    loadChildren: () => import('./pages/vcl-type/vcl-type.module').then( m => m.VclTypePageModule)
    ,canLoad:[AuthGuard]
  },
  {
    path: 'building-type',
    loadChildren: () => import('./pages/building-type/building-type.module').then( m => m.BuildingTypePageModule)
    ,canLoad:[AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then( m => m.UsersPageModule)
    ,canLoad:[AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
