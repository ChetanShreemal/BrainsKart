import { Component, OnInit } from '@angular/core';
import {IUser} from "../../models/IUser";
import {Store} from "@ngrx/store";
import {State} from "../../../reducers";
import * as userActions from '../../actions/user.actions';
import * as userReducer from '../../reducers/user.reducer';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  public user:IUser = {
    name : '',
    email : '',
    password : ''
  };
  public isEmpty:boolean = false;

  constructor(private store:Store<State>) { }

  ngOnInit(): void {
  }

  public submitRegister(){
    if(this.user.name !== '' && this.user.email !== '' && this.user.password !== ''){
      // dispatch
      this.store.dispatch(userActions.registerUser({user : this.user}));
      this.isEmpty = false;
    }
    else{
      this.isEmpty = true;
    }
  }
}
