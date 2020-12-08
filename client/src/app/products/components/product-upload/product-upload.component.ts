import { Component, OnInit } from '@angular/core';
import {IProduct} from "../../models/IProduct";
import * as productActions from '../../actions/product.actions';
import * as productReducer from '../../reducers/product.reducer';
import {Store} from "@ngrx/store";
import {State} from "../../../reducers";

@Component({
  selector: 'app-product-upload',
  templateUrl: './product-upload.component.html',
  styleUrls: ['./product-upload.component.css']
})
export class ProductUploadComponent implements OnInit {

  public product:IProduct = {
    _id : '',
    name : '',
    brand :'',
    image : '',
    price : null,
    qty : null,
    category : '',
    description :'',
    usage : ''
  };
  public imageFileName:any;

  constructor(private store:Store<State>) { }

  ngOnInit(): void {
  }

  // selectProductImage
  public selectProductImage(event:any){
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      this.imageFileName = file;
      reader.addEventListener('load', () => {
        return reader.result ? this.product.image = String(reader.result) : '';
      });
    }
  }

  public submitUploadProduct(){
    //dispatch an action for upload of a product
    this.store.dispatch(productActions.uploadProduct({product : this.product}));
  }
}
