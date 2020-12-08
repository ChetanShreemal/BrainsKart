import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./root/components/home/home.component";

const routes: Routes = [
  { path : '' , component : HomeComponent},
  { path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
  { path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
