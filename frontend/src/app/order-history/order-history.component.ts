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
  private orders: Array<Order>;
  private completedOrders: Array<Order>;
  private canceledOrders: Array<Order>;

  constructor(private orderhistory: OrderHistoryService, private router: Router) {
  }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/login');
    }else{
      this.orderhistory.setUserID(JSON.parse(localStorage.getItem('user'))._id);
    }
    this.reload();
  }

  reload = function(){
    this.orderhistory.get("pending")
    .subscribe({
      next: response => {
        this.orders = response["data"];
      },
      error: err => console.log(err)
    });

    this.orderhistory.get("completed")
    .subscribe({
      next: response => {
        this.completedOrders = response["data"];
      },
      error: err => console.log(err)
    });

    this.orderhistory.get("canceled")
    .subscribe({
      next: response => {
        this.canceledOrders = response["data"];
      },
      error: err => console.log(err)
    })
  }
}
