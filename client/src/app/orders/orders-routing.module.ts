import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersComponent } from './orders.component';
import {CartComponent} from "./components/cart/cart.component";
import {OrderListComponent} from "./components/order-list/order-list.component";
import {AuthGuard} from "../root/guards/auth.guard";
import {CheckoutComponent} from "./components/checkout/checkout.component";

const routes: Routes = [
  { path: '', component: OrdersComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent , canActivate : [AuthGuard] },
  { path: 'order-list', component: OrderListComponent , canActivate : [AuthGuard] },

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
