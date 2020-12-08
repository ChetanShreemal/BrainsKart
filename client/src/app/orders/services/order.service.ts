import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IProduct} from "../../products/models/IProduct";
import {catchError, retry} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import {IOrder} from "../models/IOrder";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient : HttpClient) { }

  public sendCartItems(cartItems : IProduct[]):Observable<{msg : string}>{
      let dataURL:string = `${environment.apiURL}/order/send-cart`;
      return this.httpClient.post<{msg : string}>(dataURL, cartItems).pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // get all the placed orders list
  public getAllOrders():Observable<{orders : IOrder[]}>{
    let dataURL:string = `${environment.apiURL}/order/all`;
    return this.httpClient.get<{orders : IOrder[]}>(dataURL).pipe(
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
}
