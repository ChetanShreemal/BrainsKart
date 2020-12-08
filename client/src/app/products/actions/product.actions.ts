import { createAction, props } from '@ngrx/store';
import {IProduct} from "../models/IProduct";

// Upload a Product
export const uploadProduct = createAction(
  '[Product] Upload Product',
  props<{product : IProduct}>()
);

export const uploadProductSuccess = createAction(
  '[Product] Upload Product Success',
  props<{result : string , product : IProduct}>()
);

export const uploadProductFailure = createAction(
  '[Product] Upload Product Failure',
  props<{ error: string }>()
);

// Get Men's Collection
export const getMenCollection = createAction(
  "[Product] get Men's Collection"
);

export const getMenCollectionSuccess = createAction(
  "[Product] Get Men's Collection Success",
  props<{products : IProduct[]}>()
);

export const getMenCollectionFailure = createAction(
  "[Product] Get Men's Collection Failure",
  props<{ error: string }>()
);

// Get Women's Collection
export const getWomenCollection = createAction(
  "[Product] get Women's Collection"
);

export const getWomenCollectionSuccess = createAction(
  "[Product] Get Women's Collection Success",
  props<{products : IProduct[]}>()
);

export const getWomenCollectionFailure = createAction(
  "[Product] Get Women's Collection Failure",
  props<{ error: string }>()
);

// Get Kids Collection
export const getKidsCollection = createAction(
  "[Product] get Kids Collection"
);

export const getKidsCollectionSuccess = createAction(
  "[Product] Get Kids Collection Success",
  props<{products : IProduct[]}>()
);

export const getKidsCollectionFailure = createAction(
  "[Product] Get Kids Collection Failure",
  props<{ error: string }>()
);

// Get Single Product
export const getProduct = createAction(
  "[Product] get Product Collection",
  props<{productId : string}>()
);

export const getProductSuccess = createAction(
  "[Product] Get Product Collection Success",
  props<{product : IProduct}>()
);

export const getProductFailure = createAction(
  "[Product] Get Product Collection Failure",
  props<{ error: string }>()
);
