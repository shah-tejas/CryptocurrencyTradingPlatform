import { Component, OnInit } from '@angular/core';
import { WalletService } from '../services/wallet.service';
import { AuthService } from '../services/auth.service';
import { Wallet } from '../models/wallet';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

import { formatDate } from '@angular/common';

import { User } from '../models/user';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  userWallet: Wallet;
  user_id: string;
  walletTransactionsColumns: string[] = ['created_date', 'transaction_type', 'coin_name', 'coin_qty', 'usd_value', 'status'];
  coinBalanceColumns: string[] = ['coin_name', 'coin_qty', 'coin_rate', 'coin_total_rate']; Math = Math;

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
          coin.coin_rate = Math.round(coinRate[0].usdvalue * 100) / 100;
          this.userWallet.usd_value += Math.round(coin.coin_rate * coin.coin_qty * 100) / 100;
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

  formatMyDate(date: Date): string{
    return formatDate(date, 'MMM d, y', 'en-us');
  }

  downloadAsPdf(){
    const data = document.getElementById('UserWalletTransactions');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 10;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('WalletTransactions.pdf'); // Generated PDF
    });
  }

}
