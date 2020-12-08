import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as productReducer from '../products/reducers/product.reducer';
import * as orderReducer from '../orders/reducers/order.reducer';
import * as userReducer from '../users/reducers/user.reducer';

export interface State {
  [productReducer.productFeatureKey] : productReducer.State,
  [orderReducer.orderFeatureKey] : orderReducer.State,
  [userReducer.userFeatureKey] : userReducer.State
}

export const reducers: ActionReducerMap<State> = {
  [productReducer.productFeatureKey] : productReducer.reducer,
  [orderReducer.orderFeatureKey] : orderReducer.reducer,
  [userReducer.userFeatureKey] : userReducer.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
