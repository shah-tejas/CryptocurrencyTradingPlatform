import { Component, OnInit, Input } from '@angular/core';
// import { fade } from '../animations/Fade';
import { OrderHistoryService } from '../../services/order-history.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() data;

  ngOnInit() {

  }
}
