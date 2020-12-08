import { Component, OnInit } from '@angular/core';
import {IProduct} from "../../models/IProduct";
import {select, Store} from "@ngrx/store";
import {State} from "../../../reducers";
import * as productActions from "../../actions/product.actions";
import * as productReducer from "../../reducers/product.reducer";
import {Router} from "@angular/router";
import * as orderActions from '../../../orders/actions/order.actions';

@Component({
  selector: 'app-kids-wear',
  templateUrl: './kids-wear.component.html',
  styleUrls: ['./kids-wear.component.css']
})
export class KidsWearComponent implements OnInit {

  public products:IProduct[] = [];
  public errorMessage:string = '';
  public loading:boolean = false;

  constructor(private store:Store<State>,
              private router : Router) { }

  ngOnInit(): void {
    // dispatch an action to get all products, and keep in the NGRx store
    this.store.dispatch(productActions.getKidsCollection());

    // get the products from NGRx store
    this.store.pipe(select(productReducer.productFeatureKey)).subscribe((state) => {
      this.products = state.products;
      this.errorMessage = state.errorMessage;
      this.loading = state.loading;
    });
  }

  // clickAddToCart
  public clickAddToCart(product){
    this.store.dispatch(orderActions.addToCart({product : product , selectedQty : 1}));
    this.router.navigate(['/orders/cart']);
  }

}
