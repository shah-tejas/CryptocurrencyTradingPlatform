import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { fade } from '../animations/Fade';
import { OrderHistoryService } from '../../services/order-history.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() public display: boolean;
  @Input() public data: Array<Order>;

  @Output() public notifyparent = new EventEmitter<String>();

  constructor(private orderhistory: OrderHistoryService){}

  ngOnInit() {}

  cancel = function($event){
    var child = $event.target;
    var parent = child.parentElement;
    var index = Array.prototype.indexOf.call(parent.children, child);

    $event.target.remove();
    let canceledOrder: Order = this.data[index];

    this.data.splice(index, 1);

    console.log(canceledOrder);
    this.orderhistory.cancel(this.data[index]._id, canceledOrder);


    this.notifyparent.emit("canceled");
  }
}
