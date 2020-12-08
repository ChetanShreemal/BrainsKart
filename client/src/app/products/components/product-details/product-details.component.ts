import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {State} from "../../../reducers";
import * as productActions from '../../actions/product.actions';
import * as productReducer from '../../reducers/product.reducer';
import {IProduct} from "../../models/IProduct";
import * as orderActions from '../../../orders/actions/order.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  public selectedQty:string = '';
  public productId:string = '';
  public selectedProduct:IProduct;
  public errorMessage:string = '';
  public loading:boolean = false;
  constructor(private activatedRoute:ActivatedRoute,
              private store:Store<State>,
              private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param:ParamMap) => {
      this.productId = param.get('id');
    });

    // dispatch an action to get a single product info , and keep in NGRx Store
    this.store.dispatch(productActions.getProduct({productId : this.productId}));

    // get product info from NGRx Store
    this.store.pipe(select(productReducer.productFeatureKey)).subscribe((state) => {
      this.selectedProduct = state.product;
      this.errorMessage = state.errorMessage;
      this.loading = state.loading;
    });
  }

  // clickAddToCart
  public clickAddToCart(){
    // dispatch an action to add a product to cart
    let theQty = (this.selectedQty === '') ? 1 : Number(this.selectedQty);
    this.store.dispatch(orderActions.addToCart({product : this.selectedProduct, selectedQty : theQty}));
    this.router.navigate(['/orders/cart']);
  }

}
