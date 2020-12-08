import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../users/services/user.service";
import {IAddress} from "../../../users/models/IAddress";
import {select, Store} from "@ngrx/store";
import {State} from "../../../reducers";
import * as orderReducer from '../../reducers/order.reducer';
import {IProduct} from "../../../products/models/IProduct";
import * as orderActions from "../../actions/order.actions";

import { loadStripe } from '@stripe/stripe-js';
import { environment } from "../../../../environments/environment";
import Axios from "axios";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  // stripe object
  public stripePromise = loadStripe(environment.stripe_publishable_key);
  public loadingSpinner:boolean = false;

  public billingAddress : IAddress;
  public cartItems:IProduct[] = [] as IProduct[];
  constructor(private userService:UserService,
              private store:Store<State>) { }

  ngOnInit(): void {
    this.billingAddress = this.userService.getUserInfo().address;
    this.store.pipe(select(orderReducer.orderFeatureKey)).subscribe((state) => {
      this.cartItems = state.cartItems;
    });
  }

  // calc Total
  public calcTotal():number{
    let total:number = 0;
    for(let cartItem of this.cartItems){
      total += (cartItem.price * cartItem.qty);
    }
    return total;
  }

  // calc Tax
  public calcTax():number{
    const PRODUCT_TAX:number = 5.0;
    return this.calcTotal() * PRODUCT_TAX / 100;
  }

  // calc Grand Total
  public calcGrandTotal():number{
    return this.calcTotal() + this.calcTax();
  }

  public clickCheckout(){
    this.store.dispatch(orderActions.sendCartItems({cartItems : this.cartItems}));
  }

  public async clickPayNow(){
    this.loadingSpinner = true;
    let response = await Axios.get(`${environment.apiURL}/order/create-checkout-session`);
    const stripe = await this.stripePromise;
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId : response.data.id
    });
  }

}
