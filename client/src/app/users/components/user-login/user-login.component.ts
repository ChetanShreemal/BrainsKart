import { Component, OnInit } from '@angular/core';
import {IUser} from "../../models/IUser";
import {Store} from "@ngrx/store";
import {State} from "../../../reducers";
import * as userActions from '../../actions/user.actions';
import * as userReducer from '../../reducers/user.reducer';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  public user:IUser = {
    name : '',
    email : '',
    password : ''
  };
  public isEmpty:boolean = false;

  constructor(private store:Store<State>) { }

  ngOnInit(): void {
  }

  public submitLogin(){
    if(this.user.email !== '' && this.user.password !== ''){
      // dispatch
      this.store.dispatch(userActions.loginUser({user : this.user}));
      this.isEmpty = false;
    }
    else{
      this.isEmpty = true;
    }
  }

}
