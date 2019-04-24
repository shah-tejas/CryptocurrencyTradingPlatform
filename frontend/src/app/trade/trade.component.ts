// Imports for the component
import { Coin } from "src/app/models/coin";
import { WalletService } from "./../services/wallet.service";
import { AuthService } from "./../services/auth.service";
import { CoinOrder } from "./../models/coin-order";
import { Observable } from "rxjs";
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from "@angular/forms";
import { AppState } from "./../store/state/app.states";
import { LogOut } from "./../store/actions/user.actions";
import { Store } from "@ngrx/store";
import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import {
  MatSort,
  MatTableDataSource,
  MatPaginator,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material";
import { Order } from "../models/order";
import { OrderService } from "../services/order.service";
import { Router } from "@angular/router";
import { JsonPipe } from "@angular/common";

// TRADE Component
@Component({
  selector: "app-trade",
  templateUrl: "./trade.component.html",
  styleUrls: ["./trade.component.scss"]
})
export class TradeComponent implements OnInit {
  // Variable-Declaration
  // User-Id
  userId: string;

  // BUY-SELL Section : Tables
  displayedColumns: string[] = [
    "buy_or_sell",
    "from_coin",
    "from_qty",
    "from_value",
    "to_coin",
    "to_qty",
    "to_value"
  ];
  buyDataSource = new MatTableDataSource(this.buyDataSource);
  sellDataSource = new MatTableDataSource(this.sellDataSource);
  noBuyDataMsg: string = "No pending SELL Orders exist!";
  noSellDataMsg: string = "No pending BUY Orders exist!";

  // PLACE-ORDER Section
  placeOrderForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;
  error: boolean = false;
  errorMsg: string = "";
  orderMatchedMsg: string = "";
  insufficientFundsMsg: string = "";
  orderTypes: string[] = ["BUY", "SELL"];
  coins: string[] = []; // = ['BTC', 'EOS', 'ETH', 'LTC'];
  coinsArr: Array<CoinOrder>;

  // Wallet variable declaration
  matchingUserId: string = "";

  // Bind children to tables in BUY-SELL Sections
  @ViewChild("buySort") public buySort: MatSort;
  @ViewChild("sellSort") public sellSort: MatSort;
  @ViewChild("buyPaginator") buyPaginator: MatPaginator;
  @ViewChild("sellPaginator") sellPaginator: MatPaginator;

  // Constructor
  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private walletService: WalletService
  ) {
    this.placeOrderForm = this.formBuilder.group({
      selectedOrderType: ["", Validators.required],
      fromCoin: ["", Validators.required],
      fromQty: [
        "",
        [Validators.required, Validators.pattern(/^([1-9][0-9]*)$/)]
      ],
      fromValue: [{ value: "-", disabled: true }],
      toCoin: ["", Validators.required],
      toQty: [
        "",
        [Validators.required, Validators.pattern(/^(0|[1-9][0-9]*)$/)]
      ],
      toValue: [{ value: "-", disabled: true }]
    });
  }

  // Initialization Method
  ngOnInit() {
    // Allow access only if user is authenticated
    if (!localStorage.getItem("token")) {
      this.router.navigateByUrl("/login");
    } else {
      this.userId = this.authService.getUserId();
      this.loadBuyTable();
      this.loadSellTable();
      // Fetch latest rates for all coins
      this.orderService.getCoinRate().subscribe(result => {
        this.coinsArr = result as Array<CoinOrder>;
        for (let coinVar of this.coinsArr) {
          this.coins.push(coinVar.coinname);
        }
      });
    }
  }

  // Method to load data for Tab selected by the user
  displayTabData($event){
    let tabIndex = $event.index;
    if(tabIndex == 0) {
      this.submitted=false;
      this.success=false;
      this.error=false;
      this.loadBuyTable();
    } else if(tabIndex == 1) {
      this.submitted=false;
      this.success=false;
      this.error=false;
      this.loadSellTable();
    } else{
      //this.clearFields();
    }
  }

  // Method to clear the PLACE-ORDER Section
  clearFields(){
    this.placeOrderForm = this.formBuilder.group({
      selectedOrderType: ["", Validators.required],
      fromCoin: ["", Validators.required],
      fromQty: [
        "",
        [Validators.required, Validators.pattern(/^([1-9][0-9]*)$/)]
      ],
      fromValue: [{ value: "-", disabled: true }],
      toCoin: ["", Validators.required],
      toQty: [
        "",
        [Validators.required, Validators.pattern(/^(0|[1-9][0-9]*)$/)]
      ],
      toValue: [{ value: "-", disabled: true }]
    });
  }

  // Method to update the USD(From) Value in PLACE-ORDER Section
  updateFromValue() {
    let coinName = this.placeOrderForm.get("fromCoin").value;
    let qty = this.placeOrderForm.get("fromQty").value;
    if (coinName.length > 0 && qty.length > 0) {
      for (let coin of this.coinsArr) {
        if (coin.coinname == coinName) {
          let val = (coin.usdvalue * qty).toFixed(2);
          if (Number.isNaN(+val) || +val < 0) {
            this.placeOrderForm.get("fromValue").setValue("-");
          } else {
            this.placeOrderForm.get("fromValue").setValue(val);
          }
        }
      }
    }
  }

  // Method to update the USD(To) Value in PLACE-ORDER Section
  updateToValue() {
    let coinName = this.placeOrderForm.get("toCoin").value;
    let qty = this.placeOrderForm.get("toQty").value;
    if (coinName.length > 0 && qty.length > 0) {
      for (let coin of this.coinsArr) {
        if (coin.coinname == coinName) {
          let val = (coin.usdvalue * qty).toFixed(2);
          if (Number.isNaN(+val) || +val < 0) {
            this.placeOrderForm.get("toValue").setValue("-");
          } else {
            this.placeOrderForm.get("toValue").setValue(val);
          }
        }
      }
    }
  }

  // Method to submit order-details on the PLACE-ORDER Section
  onSubmit(formDirective: FormGroupDirective) {
    this.submitted = true;
    this.errorMsg = '';
    this.orderMatchedMsg = '';
    this.error = false;
    this.success =  false;
    // Check if Form-Validations failed
    if (this.placeOrderForm.invalid) {
      return;
    }

    // Check if FROM and TO coins are same
    if (
      this.placeOrderForm.get("fromCoin").value ==
      this.placeOrderForm.get("toCoin").value
    ) {
      this.errorMsg = "FROM and TO coins cannot be same!";
      this.error = true;
      return;
    }

    // Map Form-Control values to Order object
    let order = new Order();
    order.buy_or_sell = this.placeOrderForm.get("selectedOrderType").value;
    order.from_coin = this.placeOrderForm.get("fromCoin").value;
    order.from_qty = this.placeOrderForm.get("fromQty").value;
    order.from_value = this.placeOrderForm.get("fromValue").value;
    order.to_coin = this.placeOrderForm.get("toCoin").value;
    order.to_qty = this.placeOrderForm.get("toQty").value;
    order.to_value = this.placeOrderForm.get("toValue").value;
    order.user_id = this.userId;

    // Check if the logged-in user can make the trade
    this.walletService.getUserWallet(this.userId).subscribe(wallet => {
      let coinAvail = false;
      // Check coins in logged-In user's wallet
      for (const coin of wallet[0].coins) {
        if (coin.coin_name === order.from_coin) {
          if (coin.coin_qty >= order.from_qty) {
            coinAvail = true;
            break;
          }
        }
      }
      if (!coinAvail) {
        this.errorMsg = "Insufficient Funds for the Order!";
        this.error = true;
        return;
      } else {
        // Call to Add-Pending-Order REST-API
        this.orderService.addOrder(order).subscribe(order => {
          this.success = true;
          formDirective.resetForm();
          this.placeOrderForm.reset();
        });
      }
    });
  }

  // Method to load data for pending orders for 'BUY' Section
  loadBuyTable() {
    let buyOrders$: Observable<
      Array<Order>
    > = this.orderService.getPendingSellOrders();
    buyOrders$.subscribe(result => {
      this.buyDataSource = new MatTableDataSource(result["data"]);
      if (result["data"].length > 0) {
        this.buyDataSource.paginator = this.buyPaginator;
        this.buyDataSource.sort = this.buySort;
        this.noBuyDataMsg = "";
      } else {
        this.noBuyDataMsg = "No pending SELL Orders exist!";
      }
    });
  }

  // Method to load data for pending orders for 'SELL' Section
  loadSellTable() {
    let sellOrders$: Observable<
      Array<Order>
    > = this.orderService.getPendingBuyOrders();
    sellOrders$.subscribe(result => {
      this.sellDataSource = new MatTableDataSource(result["data"]);
      if (result["data"].length > 0) {
        this.sellDataSource.paginator = this.sellPaginator;
        this.sellDataSource.sort = this.sellSort;
        this.noSellDataMsg = "";
      } else {
        this.noSellDataMsg = "No pending BUY Orders exist!";
      }
    });
  }

  // Method to filter Orders in BUY Section
  applyFilterBuy(filterValue: string) {
    this.buyDataSource.filter = filterValue.trim().toLowerCase();
    if (this.buyDataSource.paginator) {
      this.buyDataSource.paginator.firstPage();
    }
  }

  // Method to filter Orders in SELL Section
  applyFilterSell(filterValue: string) {
    this.sellDataSource.filter = filterValue.trim().toLowerCase();
    if (this.sellDataSource.paginator) {
      this.sellDataSource.paginator.firstPage();
    }
  }

  // Method to logout from the application
  logOut(): void {
    this.store.dispatch(new LogOut());
  }

  // Method to open the Confirm-Order Dialog Box from BUY and SELL Sections
  openDialog(row: Order) {
    this.matchingUserId = row["user_id"];
    const dialogRef = this.dialog.open(ConfirmOrderDialogComponent, {
      width: "600px",
      maxHeight: "800px",
      data: {
        buy_or_sell: row["buy_or_sell"] == "BUY" ? "SELL" : "BUY",
        from_coin: row["to_coin"],
        from_qty: row["to_qty"],
        from_value: row["to_value"],
        to_coin: row["from_coin"],
        to_qty: row["from_qty"],
        to_value: row["from_value"],
        user_id: this.userId,
        matched_order_id: row["_id"]
      },
      panelClass: "custom-dialog-box"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        // Map Form-Control values to Order object
        let order = result as Order;

        // Check if the logged-in user can make the trade
        this.walletService.getUserWallet(this.userId).subscribe(wallet => {
          let existingFrom = false;
          let existingTo = false;
          // Debit coins from the logged-In user's wallet
          for (const coin of wallet[0].coins) {
            if ((coin.coin_name === order.from_coin) && (coin.coin_qty >= order.from_qty)) {
              existingFrom = true;
              coin.coin_qty -= order.from_qty;
              break;
            }
          }

          if (!existingFrom) {
            this.insufficientFundsMsg = "Insufficient Funds for the Order!!!!!";
            return;
          } else {
            // Add coins to loggedIn User's wallet
            for (const coin of wallet[0].coins) {
              if (coin.coin_name === order.to_coin) {
                existingTo = true;
                coin.coin_qty += order.to_qty;
                break;
              }
            }

            if (!existingTo) {
              wallet[0].coins.push(new Coin(order.to_coin, order.to_qty));
            }

            // Check matched-user's wallet for the transaction
            console.log(this.matchingUserId);
            this.walletService
              .getUserWallet(this.matchingUserId)
              .subscribe(walletMatched => {
                console.log(walletMatched);
                let existingFrom = false;
                let existingTo = false;
                // Debit coins from the matched-user wallet
                for (const coin of walletMatched[0].coins) {
                  if ((coin.coin_name === order.to_coin) && (coin.coin_qty >= order.to_qty)) {
                    existingFrom = true;
                    coin.coin_qty -= order.to_qty;
                    break;
                  }
                }

                if (!existingFrom) {
                  this.insufficientFundsMsg = "Insufficient Funds for the matched-user Order!";
                  return;
                } else {
                  // Add coins to loggedIn User's wallet
                  for (const coin of walletMatched[0].coins) {
                    if (coin.coin_name === order.from_coin) {
                      existingTo = true;
                      coin.coin_qty += order.from_qty;
                      break;
                    }
                  }

                  if (!existingTo) {
                    walletMatched[0].coins.push(
                      new Coin(order.from_coin, order.from_qty)
                    );
                  }
                  this.walletService
                    .updateUserWallet(walletMatched[0])
                    .subscribe();
                }
              });

            // Update the logged-in-user's wallet with the transaction
            this.walletService.updateUserWallet(wallet[0]).subscribe();

            // Call to Add-Pending-Order REST-API
            this.orderService.matchOrder(order).subscribe(result => {
              console.log(result);
              this.orderMatchedMsg = "Order Matched successfully!";

              // reload the order-tables
              this.loadBuyTable();
              this.loadSellTable();
            });
          }
        });
      }
    });
  }
}

/*Confirm-Order Dialog Component */
@Component({
  selector: "confirm-order-dialog",
  templateUrl: "confirm-order-dialog.html"
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
