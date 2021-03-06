import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TradeComponent } from './trade/trade.component';
import { WalletComponent } from './wallet/wallet.component';
import { LoadWalletComponent } from './wallet/load-wallet/load-wallet.component';
import { WithdrawWalletComponent } from './wallet/withdraw-wallet/withdraw-wallet.component';

const routes: Routes = [
  {path: 'wallet', component: WalletComponent},
  {path: 'loadWallet', component: LoadWalletComponent},
  {path: 'withdrawWallet', component: WithdrawWalletComponent},
  {path: 'buysell', component: TradeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
