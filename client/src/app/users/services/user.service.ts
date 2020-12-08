import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { environment } from "../../../environments/environment";
import {IUser} from "../models/IUser";
import {catchError, retry} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {IAddress} from "../models/IAddress";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  // register a user
  public registerUser(user : IUser):Observable<{result : string}>{
    let dataURL : string = `${environment.apiURL}/user/register`;
    return this.httpClient.post<{result : string}>(dataURL, user).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // login a user
  public loginUser(user : IUser):Observable<{result : string ,token : string , user : IUser}>{
    let dataURL : string = `${environment.apiURL}/user/login`;
    return this.httpClient.post<{result : string, token : string , user : IUser}>(dataURL, user).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // update / create  an address
  public updateAddress(address : IAddress):Observable<{result : string , user : IUser}>{
    let dataURL : string = `${environment.apiURL}/user/address`;
    return this.httpClient.post<{result : string, user : IUser}>(dataURL, address).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  public handleError(error:HttpErrorResponse){
    let errorMessage:string = '';
    if(error.error instanceof ErrorEvent){
      // client Error
      errorMessage = `Error : ${error.error.message}`
    }
    else{
      // server error
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  // isLoggedIn
  public isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  // get token
  public getToken(){
    if(localStorage.getItem('token')){
      return localStorage.getItem('token');
    }
    else{
      return  "";
    }
  }

  // get UserInfo
  public getUserInfo():IUser{
    return JSON.parse(localStorage.getItem('user'));
  }

  // isAdmin
  public isAdminUser(){
    let user:IUser = this.getUserInfo();
    if(user){
      return user.isAdmin;
    }
    else{
      return false;
    }
  }

}
