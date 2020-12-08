import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { StoreModule } from '@ngrx/store';
import * as fromState from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects/user.effects';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [UsersComponent, UserLoginComponent, UserRegisterComponent, UserProfileComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    UsersRoutingModule,
    StoreModule.forFeature(fromState.stateFeatureKey, fromState.reducers, { metaReducers: fromState.metaReducers }),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class UsersModule { }
