import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {IProduct} from "../models/IProduct";
import {environment} from "../../../environments/environment";
import {catchError, retry} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }

  // upload product
  public uploadProduct(product:IProduct):Observable<{result : string , product : IProduct}>{
    let dataURL:string = `${environment.apiURL}/product/upload`;
    return this.httpClient.post<{result : string , product : IProduct}>(dataURL, product).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // get Men's Collection
  public getMenCollection():Observable<IProduct[]>{
    let dataURL:string = `${environment.apiURL}/product/men`;
    return this.httpClient.get<IProduct[]>(dataURL).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // get Women's Collection
  public getWomenCollection():Observable<IProduct[]>{
    let dataURL:string = `${environment.apiURL}/product/women`;
    return this.httpClient.get<IProduct[]>(dataURL).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // get Kids's Collection
  public getKidsCollection():Observable<IProduct[]>{
    let dataURL:string = `${environment.apiURL}/product/kids`;
    return this.httpClient.get<IProduct[]>(dataURL).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // get a single Product
  public getProduct(productId:string | null):Observable<IProduct>{
    let dataURL:string = `${environment.apiURL}/product/${productId}`;
    return this.httpClient.get<IProduct>(dataURL).pipe(
      retry(1),
      catchError(this.handleError)
    );
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
