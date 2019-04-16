import { AppState } from './../store/state/app.states';
import { LogOut } from './../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

const BUY_DATA = [
    {
      _id:"5cb2c9216bfe0e5cb1010af5",
      status:"pending",
      matched_order_id:"",
      user_id:"5caebdd4c30e596a7216d4e5",
      buy_or_sell:"sell",
      from_coin:"BTC",
      from_qty:100,
      from_value:15,
      to_coin:"ETH",
      to_qty:300,
      to_value:24,
      created_date:"2019-04-14T05:46:09.357Z",
      completion_date:"2019-04-14T05:46:09.357Z"
    }
];
const SELL_DATA = [
  {
    _id:"5cb2c9216bfe0e5cb1010af5",
    status:"pending",
    matched_order_id:"",
    user_id:"5caebdd4c30e596a7216d4e5",
    buy_or_sell:"buy",
    from_coin:"BTC",
    from_qty:100,
    from_value:15,
    to_coin:"ETH",
    to_qty:300,
    to_value:24,
    created_date:"2019-04-14T05:46:09.357Z",
    completion_date:"2019-04-14T05:46:09.357Z"
  }
];
@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {
  displayedColumns: string[] = ["buy_or_sell", "from_coin", "from_qty", "from_value", "to_coin", "to_qty", "to_value"];
  buyDataSource = new MatTableDataSource(BUY_DATA);
  sellDataSource = new MatTableDataSource(SELL_DATA);

  constructor(private store: Store<AppState>)
  {

   }

  ngOnInit() {

  }

  logOut(): void {
    this.store.dispatch(new LogOut);
  }

}
