import { Action, createReducer, on } from '@ngrx/store';
import {IUser} from "../models/IUser";
import * as userActions from '../actions/user.actions';

export const userFeatureKey = 'user';

export interface State {
  loading : boolean,
  errorMessage : string,
  user : IUser,
  token : string,
  isAuthenticated : boolean
}

export const initialState: State = {
  loading : false,
  errorMessage : '',
  user : {} as IUser,
  token : '',
  isAuthenticated : false
};

export const reducer = createReducer(
  initialState,
  // Register a User
  on(userActions.registerUser, (state , {user}) => {
    return {
      ...state,
      loading : true,
    }
  }),
  on(userActions.registerUserSuccess, (state , {result}) => {
    return {
      ...state,
      loading : false,
    }
  }),
  on(userActions.registerUserFailure, (state , {error}) => {
    return {
      ...state,
      loading : false,
      errorMessage : error
    }
  }),
  // login User
  on(userActions.loginUser, (state , {user}) => {
    return {
      ...state,
      loading : true
    }
  }),
  on(userActions.loginUserSuccess, (state , {result , token , user}) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return {
      ...state,
      loading : false,
      user : user,
      token : token,
      isAuthenticated : true
    }
  }),
  on(userActions.loginUserFailure, (state , {error}) => {
    return {
      ...state,
      loading : false,
      errorMessage : error
    }
  }),
  // update address
  on(userActions.updateAddress, (state , {address}) => {
    return {
      ...state,
      loading : true
    }
  }),
  on(userActions.updateAddressSuccess, (state , {result , user}) => {
    localStorage.setItem('user', JSON.stringify(user));
    return {
      ...state,
      loading : false,
      user : user
    }
  }),
  on(userActions.updateAddressFailure, (state , {error}) => {
    return {
      ...state,
      loading : false,
      errorMessage : error
    }
  }),
  on(userActions.logoutUser, (state) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return {
      ...state,
      user : {} as IUser,
      token : '',
      isAuthenticated : false
    }
  })
);

