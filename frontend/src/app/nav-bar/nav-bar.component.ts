import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventEmitter, Output } from '@angular/core';

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
  tabs: String[] = ["Home", "Pings", "Order History", "A/c Settings", "Wallet", "LoadWallet", "WithdrawWallet"];
  urls: String[] = ["home", "pings", "orderHistory", "accountsettings", "wallet", "loadWallet", "withdrawWallet"];
  @Output() logoutnav: EventEmitter<String> = new EventEmitter<String>();
  constructor(){
    // console.log("****************");
  }

  logedoutfunc(){
    this.logoutnav.emit("loggedout");
  }


  toggle=function(){
    console.log("-----------------");
    this.display = (this.display === 'invisible' ? 'visible' : 'invisible');
    this.isToggled = !this.isToggled;
  }
}
