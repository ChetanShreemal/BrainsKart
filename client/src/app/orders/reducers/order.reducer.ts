import { Action, createReducer, on } from '@ngrx/store';
import {IProduct} from "../../products/models/IProduct";
import * as orderActions from '../actions/order.actions';
import {IOrder} from "../models/IOrder";

export const orderFeatureKey = 'order';

export interface State {
  cartItems:IProduct[],
  loading : boolean,
  errorMessage : string,
  orders : IOrder[]
}

export const initialState: State = {
  cartItems:[
    {
      "_id": "5fb5185887548e1774f1aab7",
      "name": "Kids School wear",
      "brand": "US Kids",
      "price": 1650,
      "qty": 1,
      "image": "data:image/jpeg;base64,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",
      "category": "KIDS",
      "description": "A classic self textured check shirt in mustard.\nCan be worn for from office to after meeting evening get together.\nLiked by Father and Son age groupsInvisible buttoned down collar so the collars \nstays at place all day with ease.100% premium Cotton with multicolor checks",
      "usage": "A classic self textured check shirt in mustard.\nCan be worn for from office to after meeting evening get together.\nLiked by Father and Son age groupsInvisible buttoned down collar so the collars \nstays at place all day with ease.100% premium Cotton with multicolor checks",
    }
  ],
  loading : false,
  errorMessage : '',
  orders : [] as IOrder[]
};

export const reducer = createReducer(
  initialState,
  // Add to Cart
  on(orderActions.addToCart, (state, {product, selectedQty}) => {
    let selectedProduct = {...product , qty : selectedQty};
    let existingProduct = state.cartItems.find((cartItem) => cartItem._id === product._id);
    if(existingProduct){
      return state;
    }
    return {
      ...state,
      cartItems : [...state.cartItems , selectedProduct]
    }
  }),
  // Increase Cart Item Qty
  on(orderActions.incrCartItemQty, (state , {product}) => {
    let updatedCartItems = state.cartItems.map((cartItem) => {
      if(cartItem._id === product._id){
         return {
           ...cartItem,
           qty : cartItem.qty + 1
         }
      }
      return cartItem;
    });
    return {
      ...state,
      cartItems : [...updatedCartItems]
    }
  }),
  // Decrease Cart Item Qty
  on(orderActions.decrCartItemQty, (state , {product}) => {
    let updatedCartItems = state.cartItems.map((cartItem) => {
      if(cartItem._id === product._id){
        return {
          ...cartItem,
          qty : (cartItem.qty - 1 > 0) ? cartItem.qty - 1 : 1
        }
      }
      return cartItem;
    });
    return {
      ...state,
      cartItems : [...updatedCartItems]
    }
  }),
  // Delete a Cart Item
  on(orderActions.deleteCartItem, (state , {product}) => {
    let remainingCartItems = state.cartItems.filter((cartItem) => {
      return cartItem._id !== product._id;
    });
    return {
      ...state,
      cartItems : [...remainingCartItems]
    }
  }),
  on(orderActions.sendCartItems, (state, {cartItems}) => {
    return {
      ...state,
      loading : true
    }
  }),
  on(orderActions.sendCartItemsSuccess, (state, {msg}) => {
    return {
      ...state,
      loading : false
    }
  }),
  on(orderActions.sendCartItemsFailure, (state, {error}) => {
    return {
      ...state,
      loading : false,
      errorMessage : error
    }
  }),
  // get all the orders
  on(orderActions.getAllOrders, (state) => {
    return {
      ...state,
      loading : true
    }
  }),
  on(orderActions.getAllOrdersSuccess, (state,{orders}) => {
    return {
      ...state,
      loading : false,
      orders : orders
    }
  }),
  on(orderActions.getAllOrdersFailure, (state, {error}) => {
    return {
      ...state,
      loading : false,
      errorMessage : error
    }
  }),
);

