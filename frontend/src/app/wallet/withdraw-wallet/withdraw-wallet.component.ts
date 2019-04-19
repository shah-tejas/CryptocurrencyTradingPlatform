import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { AuthService } from '../../services/auth.service';
import { Coin } from 'src/app/models/coin';
import { WalletHistory } from 'src/app/models/wallet-history';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-withdraw-wallet',
  templateUrl: './withdraw-wallet.component.html',
  styleUrls: ['./withdraw-wallet.component.scss']
})
export class WithdrawWalletComponent implements OnInit {

  withdrawForm: FormGroup;
  coins: Array<Coin>;
  walletTransaction: WalletHistory;
  user_id: string;

  constructor(private walletService: WalletService,
              private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) {

    // build the user input form
    this.withdrawForm = this.formBuilder.group({
      coinName: [''],
      coinQty: ['', Validators.min(1)],
      coinRate: new FormControl({value: '', disabled: true}),
      totalUSDValue: new FormControl({value: '', disabled: true})
    });

  }

  ngOnInit() {

    // Allow access only if user is authenticated
    if (!localStorage.getItem('token')) {
      this.router.navigateByUrl('/login');
    } else {
      this.user_id = this.authService.getUserId();
    }

    // get the coins from user's wallet
    this.walletService.getUserWallet(this.user_id).subscribe(userWallet => {
      this.coins = userWallet[0].coins;
      for(const coin of this.coins){
        this.walletService.getCoinRate(coin.coin_name)
            .subscribe(coinRate => {
              coin.coin_rate = coinRate[0].usdvalue;
              this.withdrawForm.controls.coinName.setValue(this.coins[0].coin_name);
              this.withdrawForm.controls.coinQty.setValue(this.coins[0].coin_qty);
              this.withdrawForm.controls.coinRate.setValue(this.coins[0].coin_rate);
              this.withdrawForm.controls.totalUSDValue.setValue(this.coins[0].coin_qty * this.coins[0].coin_rate);
            });
      }
    });
  }

  onCoinChange(coinName?: string){
    coinName = this.withdrawForm.controls.coinName.value;
    for(const coin of this.coins){
      if(coinName === coin.coin_name){
        // get current rate for the coin
        this.walletService.getCoinRate(coin.coin_name)
            .subscribe(coinRate => {
              coin.coin_rate = coinRate[0].usdvalue;

              // update the qty and rate in the formcontrol
              this.withdrawForm.controls.coinQty.setValue(coin.coin_qty);
              this.withdrawForm.controls.coinRate.setValue(coin.coin_rate);
              this.withdrawForm.controls.totalUSDValue.setValue(coin.coin_qty * coin.coin_rate);
            });

        break;
      }
    }
  }

  updateUSDValue(){
    this.withdrawForm.controls.totalUSDValue.setValue(this.withdrawForm.controls.coinQty.value * this.withdrawForm.controls.coinRate.value);
  }

  submitWithdrawForm(){
    this.walletTransaction = new WalletHistory();
    this.walletTransaction.coin_name = this.withdrawForm.controls.coinName.value;
    this.walletTransaction.coin_qty = this.withdrawForm.controls.coinQty.value;
    this.walletTransaction.usd_value = this.withdrawForm.controls.totalUSDValue.value;
    this.walletTransaction.transaction_type = "wallet_unload";
    this.walletTransaction.user_id = this.user_id;
    this.walletTransaction.status = "Success";
    this.walletService.createUserWalletTransaction(this.walletTransaction).subscribe(() => {
      this.updateUserWallet();
    });
  }

  updateUserWallet(){
    this.walletService.getUserWallet(this.user_id).subscribe(wallet => {
      let removeCoin = false;
      let coinIndex = -1;
      for(let index = 0; index < wallet[0].coins.length; index++){
        if(wallet[0].coins[index].coin_name === this.walletTransaction.coin_name){
          if(wallet[0].coins[index].coin_qty === this.walletTransaction.coin_qty){
            removeCoin = true;
            coinIndex = index;
            break;
          }
          wallet[0].coins[index].coin_qty -= this.walletTransaction.coin_qty;
          break;
        }
      }
      if(removeCoin && coinIndex > -1){
        wallet[0].coins.splice(coinIndex, 1);
      }

      // update user's wallet object
      this.walletService.updateUserWallet(wallet[0])
          .subscribe(() => {
        // redirect to the wallet page
        this.router.navigateByUrl('/wallet');
      });
    });
  }

}
