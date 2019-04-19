import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../models/order';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  private userId: String = "5caebdd4c30e596a7216d4e5";
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