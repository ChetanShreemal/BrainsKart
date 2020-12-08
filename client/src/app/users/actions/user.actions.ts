import { createAction, props } from '@ngrx/store';
import {IUser} from "../models/IUser";
import {IAddress} from "../models/IAddress";

// Register a User
export const registerUser = createAction(
  '[User] Register User',
  props<{user : IUser}>()
);

export const registerUserSuccess = createAction(
  '[User] Register User Success',
  props<{result : string}>()
);

export const registerUserFailure = createAction(
  '[User] Register User Failure',
  props<{error : string}>()
);

// Login a User
export const loginUser = createAction(
  '[User] Login User',
  props<{user : IUser}>()
);

export const loginUserSuccess = createAction(
  '[User] Login User Success',
  props<{result : string ,token : string , user : IUser}>()
);

export const loginUserFailure = createAction(
  '[User] Login User Failure',
  props<{error : string}>()
);

// Update Address
export const updateAddress = createAction(
  '[User] Update Address',
  props<{address : IAddress}>()
);

export const updateAddressSuccess = createAction(
  '[User] Update Address Success',
  props<{result : string , user : IUser}>()
);

export const updateAddressFailure = createAction(
  '[User] Update Address Failure',
  props<{error : string}>()
);

// Logout a User
export const logoutUser = createAction(
  '[User] Logout User'
);
