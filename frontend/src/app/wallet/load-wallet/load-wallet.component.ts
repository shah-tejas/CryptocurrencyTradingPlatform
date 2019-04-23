import { Component, OnInit } from '@angular/core';
import { Coin } from 'src/app/models/coin';
import { WalletService } from '../../services/wallet.service';
import { AuthService } from '../../services/auth.service';
import { WalletHistory } from 'src/app/models/wallet-history';
import { Router } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationBoxComponent } from '../confirmation-box/confirmation-box.component';

@Component({
  selector: 'app-load-wallet',
  templateUrl: './load-wallet.component.html',
  styleUrls: ['./load-wallet.component.scss']
})
export class LoadWalletComponent implements OnInit {

  // List of coins User can load in wallet
  coins: Coin[] = [
    { coin_name: 'BitCoin', _id: -1, coin_qty: 0, coin_rate: 0 },
    { coin_name: 'LiteCoin', _id: -1, coin_qty: 0, coin_rate: 0 },
    { coin_name: 'Ethereum', _id: -1, coin_qty: 0, coin_rate: 0 },
    { coin_name: 'HuskyCoin', _id: -1, coin_qty: 0, coin_rate: 0 },
    { coin_name: 'DashCoin', _id: -1, coin_qty: 0, coin_rate: 0 },
  ];

  selectedCoin: Coin;
  selectedCoinName: string;
  user_id: string;
  walletTransaction = new WalletHistory();
  isDisabled = true;

  constructor(private walletService: WalletService,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog) {

    // Allow access only if user is authenticated
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/login');
    } else {
      this.user_id = this.authService.getUserId();
    }

    // Initialize selectedCoin
    this.selectedCoin = this.coins[0];
    this.selectedCoinName = this.selectedCoin.coin_name;

    // fetch coin rates for all coins
    for (const coin of this.coins) {
      this.walletService.getCoinRate(coin.coin_name).subscribe(coinRate => {
        coin.coin_rate = Math.round(coinRate[0].usdvalue * 100) / 100;
      });
    }
  }

  ngOnInit() {
  }

  // Call the server to get the latest coin rate of the coin selected
  getCurrentCoinRate(): void {
    this.selectedCoin.coin_name = this.selectedCoinName;
    this.walletService.getCoinRate(this.selectedCoin.coin_name).subscribe(coinRate => {
      this.selectedCoin.coin_rate = Math.round(coinRate[0].usdvalue * 100) / 100;
      this.updateUSDValue();
    });
  }

  // Update the USD value of the transaction
  updateUSDValue(): void {
    if (this.walletTransaction.coin_qty < 1) {
      return;
    }
    this.isDisabled = false;
    this.walletTransaction.usd_value = Math.round(this.selectedCoin.coin_rate * this.walletTransaction.coin_qty * 100) / 100;
  }

  // method to save the transaction when user selects the Load button
  loadWallet(): void {
    this.walletTransaction.coin_name = this.selectedCoin.coin_name;
    this.walletTransaction.transaction_type = "wallet_load";
    this.walletTransaction.user_id = this.user_id;
    this.walletTransaction.status = "Success";

    // confirmation dialog box
    this.openDialog(this.walletTransaction);
  }

  // method to update the user's wallet
  updateUserWallet(newCoin: Coin) {
    this.walletService.getUserWallet(this.user_id).subscribe(wallet => {
      let existing = false;
      for (const coin of wallet[0].coins) {
        if (coin.coin_name === newCoin.coin_name) {
          existing = true;
          coin.coin_qty += newCoin.coin_qty;
          break;
        }
      }

      if (!existing) {
        wallet[0].coins.push(newCoin);
      }

      this.walletService.updateUserWallet(wallet[0])
        .subscribe(() => {
          // redirect to the wallet page
          this.router.navigateByUrl('/wallet');
        });
    });
  }

  // The dialog box for confirmation message
  openDialog(transaction: WalletHistory): void {
    const dialogRef = this.dialog.open(ConfirmationBoxComponent, {
      width: '450px',
      data: { action: 'load', walletTransaction: transaction }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null) {
        // Save the transaction
        this.walletService.createUserWalletTransaction(this.walletTransaction).subscribe(() => {
          this.updateUserWallet(new Coin(this.walletTransaction.coin_name, this.walletTransaction.coin_qty));
        });
      }
    });
  }

}
