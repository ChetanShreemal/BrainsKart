import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../reducers";
import * as orderActions from '../../actions/order.actions';
import * as orderReducer from '../../reducers/order.reducer';
import {IOrder} from "../../models/IOrder";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  public orders : IOrder[] = [] as IOrder[];
  public loading:boolean = false;
  public errorMessage:string = '';

  constructor(private store:Store<State>,private orderService:OrderService) { }

  ngOnInit(): void {
    /*// dispatch an action to get all orders
    this.store.dispatch(orderActions.getAllOrders());

    // get the orders information from NGRX Store
    this.store.pipe(select(orderReducer.orderFeatureKey)).subscribe((state) => {
      this.orders = state.orders;
      this.loading = state.loading;
      this.errorMessage = state.errorMessage;
    });*/
    this.orderService.getAllOrders().subscribe((data) => {
      this.orders = data.orders;
    });
  }

}
