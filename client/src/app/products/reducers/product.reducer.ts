import { Action, createReducer, on } from '@ngrx/store';
import {IProduct} from "../models/IProduct";
import * as productActions from '../actions/product.actions';

export const productFeatureKey = 'product';

export interface State {
  loading:boolean,
  products:IProduct[],
  product:IProduct | null,
  errorMessage:string,
  result : string
}

export const initialState: State = {
  loading:false,
  products:[],
  // product:{
  //   _id : '',
  //   name : '',
  //   brand :'',
  //   image : '',
  //   price : 0,
  //   qty : 0,
  //   category : '',
  //   description :'',
  //   usage : ''
  // },
  product: null,
  errorMessage:'',
  result : ''
};

export const reducer = createReducer(
  initialState,
  // Upload a product
  on(productActions.uploadProduct, (state , {product}) => {
    return {
      ...state,
      loading : true
    }
  }),
  on(productActions.uploadProductSuccess, (state , {result , product}) => {
    return {
      ...state,
      loading : false,
      result : result
    }
  }),
  on(productActions.uploadProductFailure, (state , {error}) => {
    return {
      ...state,
      loading : false,
      errorMessage : error
    }
  }),
  // Get Men's Collection
  on(productActions.getMenCollection, (state) => {
    return {
      ...state,
      loading : true
    }
  }),
  on(productActions.getMenCollectionSuccess, (state, {products}) => {
    return {
      ...state,
      loading : false,
      products : products
    }
  }),
  on(productActions.getMenCollectionFailure, (state, {error}) => {
    return {
      ...state,
      loading : false,
      errorMessage : error
    }
  }),
  // Get Women's Collection
  on(productActions.getWomenCollection, (state) => {
    return {
      ...state,
      loading : true
    }
  }),
  on(productActions.getWomenCollectionSuccess, (state, {products}) => {
    return {
      ...state,
      loading : false,
      products : products
    }
  }),
  on(productActions.getWomenCollectionFailure, (state, {error}) => {
    return {
      ...state,
      loading : false,
      errorMessage : error
    }
  }),
  // Get Kid's Collection
  on(productActions.getKidsCollection, (state) => {
    return {
      ...state,
      loading : true
    }
  }),
  on(productActions.getKidsCollectionSuccess, (state, {products}) => {
    return {
      ...state,
      loading : false,
      products : products
    }
  }),
  on(productActions.getKidsCollectionFailure, (state, {error}) => {
    return {
      ...state,
      loading : false,
      errorMessage : error
    }
  }),
  // Get a Single Product
  on(productActions.getProduct, (state, {productId}) => {
    return {
      ...state,
      loading : true
    }
  }),
  on(productActions.getProductSuccess, (state, {product}) => {
    return {
      ...state,
      loading : false,
      product : product
    }
  }),
  on(productActions.getProductFailure, (state, {error}) => {
    return {
      ...state,
      loading : false,
      errorMessage : error
    }
  }),
);

