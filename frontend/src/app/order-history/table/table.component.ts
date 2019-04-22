import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { fade } from '../animations/Fade';
import { OrderHistoryService } from '../../services/order-history.service';
import { Order } from '../../models/order';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() public display: boolean = false;
  @Input() public data: Array<Order>;

  constructor(private orderhistory: OrderHistoryService){}

  ngOnInit() {}

  /**
  * @param {function(any): void} param - this is function is invoked when the user tries to cancel an order
  */
  cancel = function($event){
    var child = $event.target;
    // gets the row corresponding to order that the user wants to cancel
    var parent = child.parentElement;
    // to get the index of the row the user clicked on
    var index = Array.prototype.indexOf.call(parent.children, child);
    // to remove the row that the user has canceled
    $event.target.remove();
    let canceledOrder: Order = this.data[index];
    // removes the canceled order from the orders referencce
    this.data.splice(index, 1);
    // ajax call to cancel the order with the corresponding orderid
    this.orderhistory.cancel(canceledOrder._id, canceledOrder);
  }
}
