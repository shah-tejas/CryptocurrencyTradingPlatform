import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../models/order';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  private userId: String = "5cb5307547154f31a0980fae";
  private url: String = "http://localhost:3000/orderhistory/";

  constructor( private http: HttpClient ) { }

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
