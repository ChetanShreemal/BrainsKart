import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { StoreModule } from '@ngrx/store';
import * as fromState from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffects } from './effects/order.effects';


@NgModule({
  declarations: [OrdersComponent, CartComponent, CheckoutComponent, OrderListComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    StoreModule.forFeature(fromState.stateFeatureKey, fromState.reducers, { metaReducers: fromState.metaReducers }),
    EffectsModule.forFeature([OrderEffects])
  ]
})
export class OrdersModule { }
