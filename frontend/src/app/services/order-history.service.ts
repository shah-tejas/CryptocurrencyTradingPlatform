// service to help render the view page for order history
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../models/order';
import { Observable } from "rxjs";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  private userId: String;
  private url: String = "http://localhost:3000/orderhistory/";

  constructor( private http: HttpClient ) {
    // this.userId = JSON.parse(localStorage.getItem('user'))._id;
  }

  // depending on weather or not the orderHistory Component
  // is instantiated this is used to set the UserId of the logged in user
  setUserID(userId: String): void {
    this.userId = userId;
  }

  // ajax call to the fetch all orders related to user whose order status
  // is mentioned in the arrgument of this function
  public get = function(status): Observable<Order[]>{
    return this.http.get(this.url+this.userId+"/"+status);
  }

  // to perform an put ajax call to cancel a particular pending order
  // the user had placed
  public cancel = function(orderId,order): Observable<Order[]>{
    return this.http.put((this.url+orderId),JSON.stringify(order))
    .subscribe({
      next: response => console.log(response),
      error: err => console.log(err),
    });
  }
}
