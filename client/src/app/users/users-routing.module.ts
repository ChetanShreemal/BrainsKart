import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import {UserLoginComponent} from "./components/user-login/user-login.component";
import {UserRegisterComponent} from "./components/user-register/user-register.component";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
