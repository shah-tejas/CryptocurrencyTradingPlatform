import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppState } from './../store/state/app.states';
import { LogOut } from './../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {  MatSort,  MatTableDataSource,  MatPaginator,  MatDialog,  MatDialogRef,  MAT_DIALOG_DATA } from '@angular/material';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {
  // Variable-Declaration
  //BUY-SELL Section
  displayedColumns: string[] = [
    'buy_or_sell',
    'from_coin',
    'from_qty',
    'from_value',
    'to_coin',
    'to_qty',
    'to_value'
  ];
  buyDataSource = new MatTableDataSource(this.buyDataSource);
  sellDataSource = new MatTableDataSource(this.sellDataSource);

  //PLACE-ORDER Section
  placeOrderForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;
  orderTypes: string[] = ['BUY', 'SELL'];
  coins: string[] = ['BTC', 'EOS', 'ETH', 'LTC'];

  //Wallet variable declaration


  //Bind childs to tables in Buy-Sell Sections
  @ViewChild('buySort') public buySort: MatSort;
  @ViewChild('sellSort') public sellSort: MatSort;
  @ViewChild('buyPaginator') buyPaginator: MatPaginator;
  @ViewChild('sellPaginator') sellPaginator: MatPaginator;

  constructor(private store: Store<AppState>, public dialog: MatDialog, private formBuilder: FormBuilder,
              private orderService: OrderService) {
    this.placeOrderForm = this.formBuilder.group({
      selectedOrderType: ['', Validators.required],
      fromCoin: ['',Validators.required],
      fromQty: ['', [Validators.required, Validators.pattern(/^([1-9][0-9]*)$/)]],
      fromValue: [{value: '123.00', disabled: true},],
      toCoin: ['',Validators.required],
      toQty: ['', [Validators.required, Validators.pattern(/^(0|[1-9][0-9]*)$/)]],
      toValue: [{value: '124.00', disabled: true},]
    });
  }

  onSubmit() {
    this.submitted = true;
    // Check if Form-Validations failed
    if (this.placeOrderForm.invalid) {
      return;
    }
    if(this.placeOrderForm.get('fromCoin').value == this.placeOrderForm.get('toCoin').value){
      alert('FROM and TO coins cannot be same!');
      return;
    }

    // Map Form-Control values to Order object
    let order = new Order();
    order.buy_or_sell = this.placeOrderForm.get('selectedOrderType').value;
    order.from_coin = this.placeOrderForm.get('fromCoin').value;
    order.from_qty = this.placeOrderForm.get('fromQty').value;
    order.from_value = this.placeOrderForm.get('fromValue').value;
    order.to_coin = this.placeOrderForm.get('toCoin').value;
    order.to_qty = this.placeOrderForm.get('toQty').value;
    order.to_value = this.placeOrderForm.get('toValue').value;
    order.user_id = '5caebdd4c30e596a7216d4e5';

    console.log(order);
    console.log(JSON.stringify(order));

    // Call to Add-Pending-Order REST-API
    this.orderService.addOrder(order).subscribe(order => {
      console.log(order['createdUser']);
      this.success = true;
    });
  }

  ngOnInit() {
    this.loadBuyTable();
    this.loadSellTable();
  }

  //Method to load data for pending orders for 'BUY'
  loadBuyTable() {
    let buyOrders$: Observable<Array<Order>> = this.orderService.getPendingSellOrders();
    buyOrders$.subscribe(result => {
      this.buyDataSource = new MatTableDataSource(result['data']);
      console.log(this.buyDataSource);
      if(result['data'].length > 0)
       {
        this.buyDataSource.paginator = this.buyPaginator;
        this.buyDataSource.sort = this.buySort;
      } else {
        alert('No Pending-Orders exist');
      }
    });
  }

  loadSellTable() {
    let sellOrders$: Observable<Array<Order>> = this.orderService.getPendingBuyOrders();
    sellOrders$.subscribe(result => {
      this.sellDataSource = new MatTableDataSource(result['data']);
      console.log(this.sellDataSource);
      if(result['data'].length > 0)
       {
        this.sellDataSource.paginator = this.sellPaginator;
        this.sellDataSource.sort = this.sellSort;
      } else {
        alert('No Pending-Orders exist');
      }
    });
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
    this.store.dispatch(new LogOut());
  }

  openDialog(row: Order) {
    const dialogRef = this.dialog.open(ConfirmOrderDialogComponent, {
      width: '600px',
      maxHeight: '800px',
      data: {
        buy_or_sell: row['buy_or_sell'] == 'BUY' ? 'SELL' : 'BUY',
        from_coin: row['to_coin'],
        from_qty: row['to_qty'],
        from_value: row['to_value'],
        to_coin: row['from_coin'],
        to_qty: row['from_qty'],
        to_value:  row['from_value'],
        user_id: row['user_id'],
        matched_order_id: row['_id']
      },
      panelClass: 'custom-dialog-box'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result != null){
        let obj = JSON.stringify(result);
        console.log(obj);
        // Map Form-Control values to Order object
        let order = result as Order;

        console.log(order);
        console.log(JSON.stringify(order));

        // Call to Add-Pending-Order REST-API
        this.orderService.matchOrder(order).subscribe(result => {
          console.log(result);
          alert('order matched successfully!');

          // Update the user's wallet

          // Update the order-tables
          this.loadBuyTable();
          this.loadSellTable();

        });
      } else {
        alert('Pop up cancelled');
      }

    });
  }
}


/*Confirm-Order Dialog Component */
@Component({
  selector: "confirm-order-dialog",
  templateUrl: 'confirm-order-dialog.html'
})
export class ConfirmOrderDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order
  ) {}

  cancelClick(): void {
    this.dialogRef.close(null);
  }
}
