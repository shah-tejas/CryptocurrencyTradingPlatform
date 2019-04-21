import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatToolbarModule,MatTabsModule, MatStepperModule, MatStepperIntl } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component'
import { RouterModule, CanActivate, Router } from '@angular/router';
import { MyMaterialModule } from './material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

// Store 
import { StoreModule } from '@ngrx/store';
import { environment } from '.././environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RegisterComponent } from './register/register.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AuthService } from './services/auth.service';
import { AuthEffects } from './store/effects/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/state/app.states';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { TradeComponent, ConfirmOrderDialogComponent } from './trade/trade.component';

// services
import { OrderHistoryService } from './services/order-history.service';
import { RateListService } from './services/rate-list.service';
// Order components
import { OrderHistoryComponent } from './order-history/order-history.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RateChartComponent } from './rate-chart/rate-chart.component';
import { TableComponent } from './order-history/table/table.component';
import { jqxChartComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxchart';
// Wallet components
import { WalletComponent } from './wallet/wallet.component';
import { LoadWalletComponent } from './wallet/load-wallet/load-wallet.component';
import { WithdrawWalletComponent } from './wallet/withdraw-wallet/withdraw-wallet.component';
import { ConfirmationBoxComponent } from './wallet/confirmation-box/confirmation-box.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomePageComponent,
    AccountSettingsComponent,
    ConfirmationBoxComponent,
    TradeComponent,
    ConfirmOrderDialogComponent,
    OrderHistoryComponent,
    NavBarComponent,
    TableComponent,
    jqxChartComponent,
    RateChartComponent,
    WalletComponent,
    LoadWalletComponent,
    WithdrawWalletComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    MyMaterialModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
    !environment.production ? StoreDevtoolsModule.instrument({ name: 'App Dev Tools'}) : [],
    /**
     * @desc RouterOutlet directive to tell Angular where to insert each of our HTML templates.
     */
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', component: LoginComponent },
      { path: 'home', component: HomePageComponent},
      {path: 'charts', component: RateChartComponent},
      {path: 'orderHistory', component: OrderHistoryComponent},
      // {path: ,component:ForgotPassword}
      { path: 'accountsettings', component: AccountSettingsComponent}
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  entryComponents: [ ConfirmationBoxComponent, ConfirmOrderDialogComponent ],
  exports: [MatButtonModule,MatToolbarModule,MatTabsModule],
  providers: [{provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}},
    AuthService, AuthGuardService, OrderHistoryService, RateListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
