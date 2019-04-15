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
  private orders: Object[];
  private display: boolean = false;
  // private sellorders: Object[];
  // private buyorders: Object[];

  constructor(private orderhistory: OrderHistoryService) {
  }

  ngOnInit() {
    console.log("^^^^^^^^^^^^^^^^^^^^^");
    this.orderhistory.get()
    .subscribe({
      next: response => {
        console.log(response);
        this.orders = response["data"] as Order[];
        this.display = true;
      },
      error: err => console.log(err)
    })
    console.log(this.orders)
  }

}
