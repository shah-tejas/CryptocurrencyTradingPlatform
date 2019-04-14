import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { WalletComponent } from './wallet/wallet.component';
import { LoadWalletComponent } from './wallet/load-wallet/load-wallet.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    WalletComponent,
    LoadWalletComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
