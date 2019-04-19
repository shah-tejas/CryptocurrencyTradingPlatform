import { Coin } from "src/app/models/coin";
import { WalletService } from "./../services/wallet.service";
import { AuthService } from "./../services/auth.service";
import { CoinOrder } from "./../models/coin-order";
import { Observable } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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

@Component({
  selector: "app-trade",
  templateUrl: "./trade.component.html",
  styleUrls: ["./trade.component.scss"]
})
export class TradeComponent implements OnInit {
  // Variable-Declaration
  // User-Id
  userId: string;

  //BUY-SELL Section
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

  //PLACE-ORDER Section
  placeOrderForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;
  orderTypes: string[] = ["BUY", "SELL"];
  coins: string[] = []; // = ['BTC', 'EOS', 'ETH', 'LTC'];
  coinsArr: Array<CoinOrder>;

  //Wallet variable declaration
  matchingUserId: string = "";

  //Bind childs to tables in Buy-Sell Sections
  @ViewChild("buySort") public buySort: MatSort;
  @ViewChild("sellSort") public sellSort: MatSort;
  @ViewChild("buyPaginator") buyPaginator: MatPaginator;
  @ViewChild("sellPaginator") sellPaginator: MatPaginator;

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
        console.log(result);
        this.coinsArr = result as Array<CoinOrder>;
        for (let coinVar of this.coinsArr) {
          console.log("coin-name :" + coinVar.coinname);
          this.coins.push(coinVar.coinname);
        }
      });
    }
  }

  updateFromValue() {
    let coinName = this.placeOrderForm.get("fromCoin").value;
    let qty = this.placeOrderForm.get("fromQty").value;
    console.log("Coin-Name" + coinName);
    console.log("Coin-Qty" + qty);
    if (coinName.length > 0 && qty.length > 0) {
      for (let coin of this.coinsArr) {
        if (coin.coinname == coinName) {
          console.log("USD Value :" + coin.usdvalue);
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

  updateToValue() {
    let coinName = this.placeOrderForm.get("toCoin").value;
    let qty = this.placeOrderForm.get("toQty").value;
    console.log("Coin-Name" + coinName);
    console.log("Coin-Qty" + qty);
    if (coinName.length > 0 && qty.length > 0) {
      for (let coin of this.coinsArr) {
        if (coin.coinname == coinName) {
          console.log("USD Value :" + coin.usdvalue);
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

  onSubmit() {
    this.submitted = true;
    // Check if Form-Validations failed
    if (this.placeOrderForm.invalid) {
      return;
    }
    if (
      this.placeOrderForm.get("fromCoin").value ==
      this.placeOrderForm.get("toCoin").value
    ) {
      alert("FROM and TO coins cannot be same!");
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

    console.log(order);
    console.log(JSON.stringify(order));

    // Call to Add-Pending-Order REST-API
    this.orderService.addOrder(order).subscribe(order => {
      console.log(order["createdUser"]);
      this.success = true;
      this.loadBuyTable();
      this.loadSellTable();
    });
  }

  //Method to load data for pending orders for 'BUY'
  loadBuyTable() {
    let buyOrders$: Observable<
      Array<Order>
    > = this.orderService.getPendingSellOrders();
    buyOrders$.subscribe(result => {
      this.buyDataSource = new MatTableDataSource(result["data"]);
      console.log(this.buyDataSource);
      if (result["data"].length > 0) {
        this.buyDataSource.paginator = this.buyPaginator;
        this.buyDataSource.sort = this.buySort;
      } else {
        alert("No Pending-Orders exist");
      }
    });
  }

  loadSellTable() {
    let sellOrders$: Observable<
      Array<Order>
    > = this.orderService.getPendingBuyOrders();
    sellOrders$.subscribe(result => {
      this.sellDataSource = new MatTableDataSource(result["data"]);
      console.log(this.sellDataSource);
      if (result["data"].length > 0) {
        this.sellDataSource.paginator = this.sellPaginator;
        this.sellDataSource.sort = this.sellSort;
      } else {
        alert("No Pending-Orders exist");
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
        console.log(order);

        // Check if the logged-in user can make the trade
        this.walletService.getUserWallet(this.userId).subscribe(wallet => {
          console.log(wallet);
          let existingFrom = false;
          let existingTo = false;
          // Debit coins from the logged-In user's wallet
          for (const coin of wallet[0].coins) {
            if (coin.coin_name === order.from_coin) {
              existingFrom = true;
              coin.coin_qty -= order.from_qty;
              break;
            }
          }

          console.log("FROM: User-Coins: " + JSON.stringify(wallet[0].coins));

          if (!existingFrom) {
            alert("Insufficient Funds for the Order!!!!!");
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
            console.log("TO: User-Coins: " + JSON.stringify(wallet[0].coins));

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
                  if (coin.coin_name === order.to_coin) {
                    existingFrom = true;
                    coin.coin_qty -= order.to_qty;
                    break;
                  }
                }

                console.log(
                  "FROM: matched-Coins: " +
                    JSON.stringify(walletMatched[0].coins)
                );

                if (!existingFrom) {
                  alert("Insufficient Funds for the matched-user Order!!!!!");
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
                  console.log(
                    "TO: matched-Coins: " +
                      JSON.stringify(walletMatched[0].coins)
                  );
                  this.walletService
                    .updateUserWallet(walletMatched[0])
                    .subscribe();
                  console.log("updated matched-user wallet");
                }
              });

            // Update the logged-in-user's wallet with the transaction
            this.walletService.updateUserWallet(wallet[0]).subscribe();
            console.log("updated logged-user wallet");

            // Call to Add-Pending-Order REST-API
            this.orderService.matchOrder(order).subscribe(result => {
              console.log(result);
              alert("order matched successfully!");

              // reload the order-tables
              this.loadBuyTable();
              this.loadSellTable();
            });
          }
        });
      } else {
        alert("Pop up cancelled");
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
