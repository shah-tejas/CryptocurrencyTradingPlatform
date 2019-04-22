import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { OrderHistoryService } from '../services/order-history.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders: Array<Order>;

  constructor(private orderhistory: OrderHistoryService, private router: Router) {
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/login');
    }else{
      this.orderhistory.setUserID(JSON.parse(localStorage.getItem('user'))._id);
      this.reloadPendingOrders();
    }
  }

  reloadPendingOrders(): void {
    this.orderhistory.get("pending")
    .subscribe({
      next: response => {
        this.orders = response["data"];
        console.log(response["data"]);
      },
      error: err => console.log(err)
    });
  }

  reloadCompletedOrders(): void {
    this.orderhistory.get("completed")
    .subscribe({
      next: response => {
        this.orders = response["data"];
        console.log(response["data"]);
      },
      error: err => console.log(err)
    });
  }

  reloadCanceledOrders(): void {
    this.orderhistory.get("canceled")
    .subscribe({
      next: response => {
        this.orders = response["data"];
        console.log(response["data"]);
      },
      error: err => console.log(err)
    });
  }

  displayTable($event){
    let tabIndex = $event.index;
    if(tabIndex == 0) this.reloadPendingOrders();
    else if(tabIndex == 1) this.reloadCompletedOrders();
    else this.reloadCanceledOrders();
  }
}
