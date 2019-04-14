import { Component, OnInit } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { Wallet } from '../models/wallet';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  userWallet: Wallet;

  constructor(private walletService: WalletService) { }

  ngOnInit() {
    const userWalletObservable$: Observable<Wallet> = this.walletService.getUserWallet('123');
    userWalletObservable$.subscribe(wallet => {
      this.userWallet = wallet[0];
      this.userWallet.usd_value = 0;

      // get current rates of all coins in the wallet
      for(const coin of this.userWallet.coins){
        this.walletService.getCoinRate(coin.coin_name).subscribe(coinRate => {
          console.log(coinRate);
          coin.coin_rate = coinRate[0].usdvalue;
          this.userWallet.usd_value += coin.coin_rate * coin.coin_qty;
          // update the current wallet's usd_value in server
          this.walletService.updateUserWallet(this.userWallet).subscribe();
        });
      }


    });
  }

}
