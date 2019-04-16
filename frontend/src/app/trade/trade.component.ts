import { AppState } from './../store/state/app.states';
import { LogOut } from './../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Order } from '../models/order';

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
    },
    {
      _id:"5cb2c9216bfe0e5cb1010af5",
      status:"pending",
      matched_order_id:"",
      user_id:"5caebdd4c30e596a7216d4e5",
      buy_or_sell:"sell",
      from_coin:"EOS",
      from_qty:50,
      from_value:45,
      to_coin:"PIC",
      to_qty:2000,
      to_value:24,
      created_date:"2019-04-14T05:46:09.357Z",
      completion_date:"2019-04-14T05:46:09.357Z"
    },
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
    },
    {
      _id:"5cb2c9216bfe0e5cb1010af5",
      status:"pending",
      matched_order_id:"",
      user_id:"5caebdd4c30e596a7216d4e5",
      buy_or_sell:"sell",
      from_coin:"EOS",
      from_qty:50,
      from_value:45,
      to_coin:"PIC",
      to_qty:2000,
      to_value:24,
      created_date:"2019-04-14T05:46:09.357Z",
      completion_date:"2019-04-14T05:46:09.357Z"
    },
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
    },
    {
      _id:"5cb2c9216bfe0e5cb1010af5",
      status:"pending",
      matched_order_id:"",
      user_id:"5caebdd4c30e596a7216d4e5",
      buy_or_sell:"sell",
      from_coin:"EOS",
      from_qty:50,
      from_value:45,
      to_coin:"PIC",
      to_qty:2000,
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
  },
  {
    _id:"5cb2c9216bfe0e5cb1010af5",
    status:"pending",
    matched_order_id:"",
    user_id:"5caebdd4c30e596a7216d4e5",
    buy_or_sell:"buy",
    from_coin:"EOS",
    from_qty:50,
    from_value:45,
    to_coin:"PIC",
    to_qty:2000,
    to_value:24,
    created_date:"2019-04-14T05:46:09.357Z",
    completion_date:"2019-04-14T05:46:09.357Z"
  },{
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
  },
  {
    _id:"5cb2c9216bfe0e5cb1010af5",
    status:"pending",
    matched_order_id:"",
    user_id:"5caebdd4c30e596a7216d4e5",
    buy_or_sell:"buy",
    from_coin:"EOS",
    from_qty:50,
    from_value:45,
    to_coin:"PIC",
    to_qty:2000,
    to_value:24,
    created_date:"2019-04-14T05:46:09.357Z",
    completion_date:"2019-04-14T05:46:09.357Z"
  },{
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
  },
  {
    _id:"5cb2c9216bfe0e5cb1010af5",
    status:"pending",
    matched_order_id:"",
    user_id:"5caebdd4c30e596a7216d4e5",
    buy_or_sell:"buy",
    from_coin:"EOS",
    from_qty:50,
    from_value:45,
    to_coin:"PIC",
    to_qty:2000,
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

  @ViewChild('buySort') public buySort: MatSort;
  @ViewChild('sellSort') public sellSort: MatSort;
  @ViewChild('buyPaginator') buyPaginator: MatPaginator;
  @ViewChild('sellPaginator') sellPaginator: MatPaginator;

  constructor(private store: Store<AppState>, public dialog: MatDialog)
  {

   }

  ngOnInit() {
    this.buyDataSource.sort = this.buySort;
    this.sellDataSource.sort = this.sellSort;
    this.buyDataSource.paginator = this.buyPaginator;
    this.sellDataSource.paginator = this.sellPaginator;
  }

  applyFilterBuy(filterValue: string) {
    this.buyDataSource.filter = filterValue.trim().toLowerCase();
    if (this.buyDataSource.paginator) {
      this.buyDataSource.paginator.firstPage();
    }
  }

  applyFilterSell(filterValue: string) {
    this.sellDataSource.filter = filterValue.trim().toLowerCase();
    if (this.sellDataSource.paginator) {
      this.sellDataSource.paginator.firstPage();
    }
  }

  logOut(): void {
    this.store.dispatch(new LogOut);
  }

  openDialog(row: Order){
    const dialogRef = this.dialog.open(ConfirmOrderDialogComponent, {
      width: '400px',
      maxHeight: '800px',
      data: {
        buy_or_sell: row['buy_or_sell'],
        from_coin: row['from_coin'],
        from_qty: row['from_qty'],
        from_value: '$'+row['from_value'],
        to_coin: row['to_coin'],
        to_qty: row['to_qty'],
        to_value: '$'+row['to_value']
        },
      panelClass: 'custom-dialog-box'
    });

    dialogRef.afterClosed().subscribe(result => {
      alert(`${result}`);
    });
  }

}


@Component({
  selector: 'confirm-order-dialog',
  templateUrl: 'confirm-order-dialog.html',
})
export class ConfirmOrderDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order) {}

    cancelClick(): void {
    this.dialogRef.close(undefined);
  }

}
