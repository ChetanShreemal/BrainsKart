import { Component, OnInit } from '@angular/core';
import {IProduct} from "../../../products/models/IProduct";
import {select, Store} from "@ngrx/store";
import {State} from "../../../reducers";
import * as orderActions from '../../actions/order.actions';
import * as orderReducer from '../../reducers/order.reducer';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartItems:IProduct[] = [];

  constructor(private store:Store<State>) { }

  ngOnInit(): void {
    // get the cartItems from NGRx Store
    this.store.pipe(select(orderReducer.orderFeatureKey)).subscribe((state) => {
      this.cartItems = state.cartItems;
    });
  }

  // clickIncrCartItemQty
  public clickIncrCartItemQty(cartItem):void{
    this.store.dispatch(orderActions.incrCartItemQty({product : cartItem}));
  }

  // clickDecrCartItemQty
  public clickDecrCartItemQty(cartItem):void{
    this.store.dispatch(orderActions.decrCartItemQty({product : cartItem}));
  }

  // clickDeleteCartItem
  public clickDeleteCartItem(cartItem):void{
    this.store.dispatch(orderActions.deleteCartItem({product : cartItem}));
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
}
