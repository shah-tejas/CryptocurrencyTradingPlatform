import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { fadein } from '../animations/Fade';

/** @title Basic drawer */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [
    fadein
  ]
})
export class NavBarComponent {
  display: string = 'invisible';
  isToggled: boolean = false;
  noOfPings: Number = 10;
  tabs: String[] = ["Login", "Register", "Home", "Charts", "Pings", "Order History", "A/c Settings", "Wallet", "LoadWallet", "WithdrawWallet",  "Logout"];
  urls: String[] = ["login", "register", "home", "charts", "pings", "orderHistory", "accountsettings", "wallet", "loadWallet", "withdrawWallet", "logout"];
  constructor(){}

  toggle=function(){
    console.log(this.display);
    this.display = (this.display === 'invisible' ? 'visible' : 'invisible');
    this.isToggled = !this.isToggled;
  }
}
