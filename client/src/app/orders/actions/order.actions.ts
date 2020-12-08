import { createAction, props } from '@ngrx/store';
import {IProduct} from "../../products/models/IProduct";
import {IOrder} from "../models/IOrder";

// Add to Cart
export const addToCart = createAction(
  '[Order] Add to Cart',
  props<{product : IProduct, selectedQty : number}>()
);

// Increase the Cart Item Qty
export const incrCartItemQty = createAction(
  '[Order] Increase Cart Item Qty',
  props<{product : IProduct}>()
);

// Decrease the Cart Item Qty
export const decrCartItemQty = createAction(
  '[Order] Decrease Cart Item Qty',
  props<{product : IProduct}>()
);

// delete an item from the cart
export const deleteCartItem = createAction(
  '[Order] Delete Cart Item',
  props<{product : IProduct}>()
);

// send cart Items to express server
export const sendCartItems = createAction(
  '[Order] Send Cart Items',
  props<{cartItems : IProduct[]}>()
);

export const sendCartItemsSuccess = createAction(
  '[Order] Send Cart Items Success',
  props<{msg : string}>()
);

export const sendCartItemsFailure = createAction(
  '[Order] Send Cart Items Failure',
  props<{error : string}>()
);

//Get All Orders
export const getAllOrders = createAction(
  '[Order] Get All Orders'
);
export const getAllOrdersSuccess = createAction(
  '[Order] Get All Orders Success',
  props<{orders : IOrder[]}>()
);
export const getAllOrdersFailure = createAction(
  '[Order] Get All Orders Failure',
  props<{error : string}>()
);

