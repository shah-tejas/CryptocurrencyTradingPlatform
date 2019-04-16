import { Component, OnInit } from '@angular/core';
// import { fade } from '../animations/Fade';
import { OrderHistoryService } from '../services/order-history.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  private orders: Array<Order>;
  private canceledOrders: Array<Order>;
  // private display: boolean = false;

  constructor(private orderhistory: OrderHistoryService) {
  }

  ngOnInit() {
    setInterval(this.reload, 2000);
  }

  reload = function(){
    this.orderhistory.get("pending")
    .subscribe({
      next: response => {
        this.orders = response["data"];
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
