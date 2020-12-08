import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import * as userActions from '../actions/user.actions';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {catchError, concatMap, map, mergeMap, tap} from "rxjs/operators";
import * as productActions from "../../products/actions/product.actions";
import {of} from "rxjs";

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions,
              private userService:UserService,
              private router : Router) {}

  @Effect()
  public registerUser(){
    return this.actions$.pipe(
      ofType(userActions.registerUser),
      concatMap((action) => this.userService.registerUser(action.user).pipe(
        map(({result}) => userActions.registerUserSuccess({result})),
        catchError((error) => of(userActions.registerUserFailure({error})))
      ))
    )
  }

  @Effect()
  public loginUser(){
    return this.actions$.pipe(
      ofType(userActions.loginUser),
      concatMap((action) => this.userService.loginUser(action.user).pipe(
        map(({result , token , user}) => userActions.loginUserSuccess({result , token , user})),
        catchError((error) => of(userActions.loginUserFailure({error})))
      ))
    )
  }

  @Effect()
  public updateAddress(){
    return this.actions$.pipe(
      ofType(userActions.updateAddress),
      concatMap((action) => this.userService.updateAddress(action.address).pipe(
        map(({result , user}) => userActions.updateAddressSuccess({result, user})),
        catchError((error) => of(userActions.updateAddressFailure({error})))
      ))
    )
  }

// Registration is success -> redirect to Login Page
  @Effect({ dispatch: false })
  registerUserSuccess$ = this.actions$.pipe(
    ofType(userActions.registerUserSuccess),
    tap(() => this.router.navigate(['/users/login']))
  );

 // Login is success -> redirect to home Page
  @Effect({ dispatch: false })
  loginUserSuccess$ = this.actions$.pipe(
    ofType(userActions.loginUserSuccess),
    tap(() => this.router.navigate(['/']))
  );

}
