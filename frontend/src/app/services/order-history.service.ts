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

  setUserID(userId: String): void {
    this.userId = userId;
  }

  public get = function(status): Observable<Order[]>{
    return this.http.get(this.url+this.userId+"/"+status);
  }

  public cancel = function(orderId,order): Observable<Order[]>{
    return this.http.put((this.url+orderId),JSON.stringify(order))
    .subscribe({
      next: response => console.log(response),
      error: err => console.log(err),
    });
  }
}
