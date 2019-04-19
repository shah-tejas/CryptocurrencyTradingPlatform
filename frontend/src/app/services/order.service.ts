// Service to perform Order related interactions with REST services
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // Constructor
  constructor(private http: HttpClient) { }

  // Method to fetch the latest rates for cryptocurrency coins
  getCoinRate() {
    return this.http.get('http://localhost:3000/currentRate/');
  }

  // Method to fetch the BUY orders in PENDING state
  getPendingBuyOrders() : Observable<Array<Order>>{
    return this.http.get<Array<Order>>("http://localhost:3000/orders?orderType=BUY&status=pending");
  }

  // Method to fetch the SELL orders in PENDING state
  getPendingSellOrders() : Observable<Array<Order>>{
    return this.http.get<Array<Order>>("http://localhost:3000/orders?orderType=SELL&status=pending");
  }

  // Method to place new order on the cryptocurrency exchange
  addOrder(order: Order) {
    let orderJSON = JSON.stringify(order);
    return this.http.post("http://localhost:3000/orders", {
        "user_id": order.user_id,
        "buy_or_sell": order.buy_or_sell,
        "from_coin": order.from_coin,
        "from_qty": order.from_qty,
        "from_value": order.from_value,
        "to_coin": order.to_coin,
        "to_qty": order.to_qty,
        "to_value": order.to_value
    });
  }

  // Method to MATCH order with an existing PENDING order on cryptocurrency exchange
  matchOrder(order: Order) {
    return this.http.put("http://localhost:3000/orders/"+order.matched_order_id, {
        "user_id": order.user_id,
        "buy_or_sell": order.buy_or_sell,
        "from_coin": order.from_coin,
        "from_qty": order.from_qty,
        "from_value": order.from_value,
        "to_coin": order.to_coin,
        "to_qty": order.to_qty,
        "to_value": order.to_value,
        "matched_order_id": order.matched_order_id
    });
  }

}
