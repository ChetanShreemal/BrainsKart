import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {ProductService} from "../services/product.service";
import * as  productActions from '../actions/product.actions';
import {catchError, concatMap, map, mergeMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import {Router} from "@angular/router";


@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions,
              private productService:ProductService,
              private router:Router) {}

  @Effect()
  public uploadProduct(){
    return this.actions$.pipe(
      ofType(productActions.uploadProduct),
      concatMap((action) => this.productService.uploadProduct(action.product).pipe(
        map(({result , product}) => productActions.uploadProductSuccess({result, product})),
        catchError((error) => of(productActions.uploadProductFailure({error})))
      ))
    )
  }

  @Effect()
  public getMenCollection(){
    return this.actions$.pipe(
      ofType(productActions.getMenCollection),
      mergeMap((action) => this.productService.getMenCollection().pipe(
        map((products) => productActions.getMenCollectionSuccess({products})),
        catchError((error) => of(productActions.getMenCollectionFailure({error})))
      ))
    )
  }

  @Effect()
  public getWomenCollection(){
    return this.actions$.pipe(
      ofType(productActions.getWomenCollection),
      mergeMap((action) => this.productService.getWomenCollection().pipe(
        map((products) => productActions.getWomenCollectionSuccess({products})),
        catchError((error) => of(productActions.getWomenCollectionFailure({error})))
      ))
    )
  }

  @Effect()
  public getKidsCollection(){
    return this.actions$.pipe(
      ofType(productActions.getKidsCollection),
      mergeMap((action) => this.productService.getKidsCollection().pipe(
        map((products) => productActions.getKidsCollectionSuccess({products})),
        catchError((error) => of(productActions.getKidsCollectionFailure({error})))
      ))
    )
  }

  @Effect()
  public getProduct(){
    return this.actions$.pipe(
      ofType(productActions.getProduct),
      mergeMap((action) => this.productService.getProduct(action.productId).pipe(
        map((product) => productActions.getProductSuccess({product})),
        catchError((error) => of(productActions.getProductFailure({error})))
      ))
    )
  }

  // if upload is success, redirect to home page
  @Effect({ dispatch: false })
  uploadProductSuccess$ = this.actions$.pipe(
    ofType(productActions.uploadProductSuccess),
    tap(() => this.router.navigate(['/']))
  );


}
