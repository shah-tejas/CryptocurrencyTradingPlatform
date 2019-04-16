import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { WalletComponent } from './wallet/wallet.component';
import { LoadWalletComponent } from './wallet/load-wallet/load-wallet.component';
import { WithdrawWalletComponent } from './wallet/withdraw-wallet/withdraw-wallet.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    WalletComponent,
    LoadWalletComponent,
    WithdrawWalletComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
