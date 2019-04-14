import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WalletComponent } from './wallet/wallet.component';
import { LoadWalletComponent } from './wallet/load-wallet/load-wallet.component';

const routes: Routes = [
  {path: 'wallet', component: WalletComponent},
  {path: 'loadWallet', component: LoadWalletComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
