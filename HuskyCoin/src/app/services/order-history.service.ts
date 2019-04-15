import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../models/order';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  private url: String = "localhost:3000/orders"
  constructor( private http: HttpClient ) { }

  public get = function(): Observable<Order[]>{
    return this.http.get(this.url,JSON.stringify({buy_or_sell: "sell"}));
    // return this.http.get((this.url+"5caebdd4c30e596a7216d4e5"),{body: { hey: "there"}});
  }
}
