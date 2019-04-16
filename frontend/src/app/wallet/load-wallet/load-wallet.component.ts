import { Component, OnInit } from '@angular/core';
import { Coin } from 'src/app/models/coin';
import { WalletService } from '../../services/wallet.service';
import { AuthService } from '../../services/auth.service';
import { WalletHistory } from 'src/app/models/wallet-history';
import { Router } from '@angular/router';

@Component({
  selector: 'app-load-wallet',
  templateUrl: './load-wallet.component.html',
  styleUrls: ['./load-wallet.component.scss']
})
export class LoadWalletComponent implements OnInit {

  coins: Coin[] = [
    {coin_name: 'BitCoin', _id: -1, coin_qty: 0, coin_rate: 0},
    {coin_name: 'LiteCoin', _id: -1, coin_qty: 0, coin_rate: 0},
    {coin_name: 'Ethereum', _id: -1, coin_qty: 0, coin_rate: 0},
    {coin_name: 'HuskyCoin', _id: -1, coin_qty: 0, coin_rate: 0},
    {coin_name: 'DashCoin', _id: -1, coin_qty: 0, coin_rate: 0},
  ];

  selectedCoin: Coin;
  user_id: string;
  walletTransaction = new WalletHistory();

  constructor(private walletService: WalletService, private router: Router, private authService: AuthService) {

    // Allow access only if user is authenticated
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/login');
    } else {
      this.user_id = this.authService.getUserId();
    }

    // Initialize selectedCoin
    this.selectedCoin = this.coins[0];

    // fetch coin rates for all coins
    for(const coin of this.coins){
      this.walletService.getCoinRate(coin.coin_name).subscribe(coinRate => {
        coin.coin_rate = coinRate[0].usdvalue;
      });
    }
  }

  ngOnInit() {
  }

  getCurrentCoinRate(): void {
    this.walletService.getCoinRate(this.selectedCoin.coin_name).subscribe(coinRate => {
      this.selectedCoin.coin_rate = coinRate[0].usdvalue;
    });
    this.updateUSDValue();
  }

  updateUSDValue(): void{
    this.walletTransaction.usd_value = this.selectedCoin.coin_rate * this.walletTransaction.coin_qty;
  }

  loadWallet(): void{
    this.walletTransaction.coin_name = this.selectedCoin.coin_name;
    this.walletTransaction.transaction_type = "wallet_load";
    this.walletTransaction.user_id = this.user_id;
    this.walletTransaction.status = "Success";
    this.walletService.createUserWalletTransaction(this.walletTransaction).subscribe(() => {
      this.updateUserWallet(new Coin(this.walletTransaction.coin_name, this.walletTransaction.coin_qty));
    });
  }

  updateUserWallet(newCoin: Coin){
    this.walletService.getUserWallet(this.user_id).subscribe(wallet => {
      let existing = false;
      for(const coin of wallet[0].coins){
        if(coin.coin_name === newCoin.coin_name){
          existing = true;
          coin.coin_qty += newCoin.coin_qty;
          break;
        }
      }

      if(!existing){
        wallet[0].coins.push(newCoin);
      }

      this.walletService.updateUserWallet(wallet[0]).subscribe();
    });
  }

}
