import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
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
  private showMenu: boolean = false;
  noOfPings: Number = 10;
  tabs: String[] = ["Charts", "Wallet", "Order History", "BUY / SELL", "Pings"];
  urls: String[] = ["home", "wallet", "orderHistory", "buyOrsell", "pings"];
  private showToolBar: boolean;
  private showPlainBar: boolean;

  constructor(private router: Router){
    this.showToolBar = false;
    this.showPlainBar = true;
  }

  showMenufunc=function(){
    // to toggle between fadein or not when the menu bar is displayed
    this.display = (this.display === 'invisible' ? 'visible' : 'invisible');
    // changing the boolean value of showMenu to display the menu bar
    this.showMenu = !this.showMenu;
  }

  onActivate($event): void{
    if(this.router.url === "/login" || this.router.url === "/register" || this.router.url === "/"){
      console.log(this.showToolBar);
      console.log(this.showPlainBar);
      this.showToolBar = false;
      this.showPlainBar = true;
    }else{
      this.showToolBar = true;
      this.showPlainBar = false;
    }
  }
}
