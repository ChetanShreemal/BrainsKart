import { Component, OnInit } from '@angular/core';
import {IUser} from "../../models/IUser";
import {UserService} from "../../services/user.service";
import {IAddress} from "../../models/IAddress";
import {select, Store} from "@ngrx/store";
import {State} from "../../../reducers";
import * as userActions from '../../actions/user.actions';
import * as userReducer from '../../reducers/user.reducer';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public userInfo:IUser = {} as IUser;
  public address:IAddress = {} as IAddress;
  public enableAddress:boolean = false;
  public loading:boolean = false;
  constructor(private userService:UserService,
              private store:Store<State>) { }

  ngOnInit(): void {
    this.userInfo = this.userService.getUserInfo();
    if(this.userInfo){
      this.address = this.userInfo.address;
    }

    // get address information from NGRX Store
    this.store.pipe(select(userReducer.userFeatureKey)).subscribe((state) => {
       this.loading = state.loading;
    });
  }

  public submitUpdateAddress(){
    this.address = this.trimAddress(this.address);
    this.store.dispatch(userActions.updateAddress({address : this.address}));
    // get the updated user from store
    this.store.pipe(select(userReducer.userFeatureKey)).subscribe((state) => {
      this.userInfo = state.user;
      this.address = state.user.address;
    });
    this.enableAddress = false;
  }

  public trimAddress(address:IAddress):IAddress{
    let tempAddress:IAddress = {
      flat : address.flat.trim(),
      street : address.street.trim(),
      landmark : address.landmark.trim(),
      city : address.city.trim(),
      state : address.state.trim(),
      country: address.country.trim(),
      pin : address.pin.trim(),
      mobile : address.mobile.trim(),
    };
    return  tempAddress;
  }

}
