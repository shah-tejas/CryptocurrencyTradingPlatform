import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/** @title Basic drawer */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  isToggled: boolean = false;
  tabs: String[] = ["Wallet", "Order History", "Buy / Sell", "Charts", "Pings", "A/c Settings", "Logout"];
  urls: String[] = ["wallet", "orderHistory", "buyOrsell", "charts", "pings", "Settings", "logout"];
  constructor(){}

  toggle=function(){
    console.log();
    this.isToggled = !this.isToggled;
  }
}
