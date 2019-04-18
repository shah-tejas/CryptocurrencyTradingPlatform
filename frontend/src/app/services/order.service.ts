import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getCoinRate() {
    return this.http.get('http://localhost:3000/currentRate/');
  }

  getPendingBuyOrders() : Observable<Array<Order>>{
    return this.http.get<Array<Order>>("http://localhost:3000/orders?orderType=BUY&status=pending");
  }

  getPendingSellOrders() : Observable<Array<Order>>{
    return this.http.get<Array<Order>>("http://localhost:3000/orders?orderType=SELL&status=pending");
  }

  // Method to make REST API call to add-contact
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

  // Method to make REST API call to add-contact
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
