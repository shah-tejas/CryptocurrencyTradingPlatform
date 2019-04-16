import { Component, OnInit } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { AuthService } from '../services/auth.service';
import { Wallet } from '../models/wallet';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { User } from '../models/user';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  userWallet: Wallet;
  user_id: string;

  constructor(private walletService: WalletService, private authService: AuthService, private router: Router) { }

  ngOnInit() {

    // Allow access only if user is authenticated
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/login');
    } else {
      this.user_id = this.authService.getUserId();
    }

    const userWalletObservable$: Observable<Wallet> = this.walletService.getUserWallet(this.user_id);
    userWalletObservable$.subscribe(wallet => {
      this.userWallet = wallet[0];
      this.userWallet.usd_value = 0;

      // get current rates of all coins in the wallet
      for(const coin of this.userWallet.coins){
        this.walletService.getCoinRate(coin.coin_name).subscribe(coinRate => {
          coin.coin_rate = coinRate[0].usdvalue;
          this.userWallet.usd_value += coin.coin_rate * coin.coin_qty;
          // update the current wallet's usd_value in server
          this.walletService.updateUserWallet(this.userWallet).subscribe();
        });
      }

      // get user wallet's transactions
      this.walletService.getUserWalletTransactions(this.userWallet.user_id)
          .subscribe(walletTransactions => {
              this.userWallet.walletTransactions = walletTransactions;
          });

    });
  }

}
