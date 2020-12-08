import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../reducers";
import * as orderActions from '../../../orders/actions/order.actions';
import * as orderReducer from '../../../orders/reducers/order.reducer';
import {IProduct} from "../../../products/models/IProduct";
import {UserService} from "../../../users/services/user.service";
import {IUser} from "../../../users/models/IUser";
import * as userActions from '../../../users/actions/user.actions';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public cartItems:IProduct[] = [];
  constructor(private store:Store<State>,
              private userService:UserService,
              private router:Router) { }

  ngOnInit(): void {
    this.store.pipe(select(orderReducer.orderFeatureKey)).subscribe((state) => {
      this.cartItems = state.cartItems;
    });
  }

  public isAdmin(){
    return this.userService.isAdminUser();
  }
  public getUser():IUser{
    return this.userService.getUserInfo();
  }
  public isLoggedIn(){
    return this.userService.isLoggedIn();
  }

  public clickLogOut(){
    // dispatch logout action
    this.store.dispatch(userActions.logoutUser());
    // redirect to home Page
    this.router.navigate(['/']);
  }

}
