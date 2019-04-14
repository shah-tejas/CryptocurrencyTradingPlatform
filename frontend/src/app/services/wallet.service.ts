import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Wallet } from '../models/wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) { }

  getUserWallet(user_id: string): Observable<Wallet>{
    return this.http.get<Wallet>('http://localhost:3000/wallet?user_id=' + user_id);
  }

  updateUserWallet(userWallet: Wallet): Observable<Wallet>{
    return this.http.put<Wallet>('http://localhost:3000/wallet/' + userWallet.user_id, userWallet);
  }

  getCoinRate(coin_name: string) {
    return this.http.get('http://localhost:3000/currentRate/' + coin_name);
  }

}
