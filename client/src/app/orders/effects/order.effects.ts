import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import * as orderActions from '../actions/order.actions';
import {OrderService} from "../services/order.service";
import * as productActions from "../../products/actions/product.actions";
import {catchError, concatMap, map, mergeMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class OrderEffects {

  constructor(private actions$: Actions,
              private orderService:OrderService,
              private router:Router) {}

  @Effect()
  public sendCartItems(){
    return this.actions$.pipe(
      ofType(orderActions.sendCartItems),
      concatMap((action) => this.orderService.sendCartItems(action.cartItems).pipe(
        map(({msg}) => orderActions.sendCartItemsSuccess({msg})),
        catchError((error) => of(orderActions.sendCartItemsFailure({error})))
      ))
    )
  }

  @Effect()
  public getAllOrders(){
    return this.actions$.pipe(
      ofType(orderActions.getAllOrders),
      mergeMap((action) => this.orderService.getAllOrders().pipe(
        map(({orders}) => orderActions.getAllOrdersSuccess({orders})),
        catchError((error) => of(orderActions.getAllOrdersFailure({error})))
      ))
    )
  }

  // if send Cart Items is success, redirect to checkout page
  @Effect({ dispatch: false })
  sendCartItemsSuccess$ = this.actions$.pipe(
    ofType(orderActions.sendCartItemsSuccess),
    tap(() => this.router.navigate(['/orders/checkout']))
  );


}
