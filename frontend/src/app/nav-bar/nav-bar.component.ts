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
  /**
   *  @var dispaly variable is only for the fadein annimation efect
   *  @var showMenu is to toogle back and forth between the show menu or not
   *  @var tabs is just to display show intutive names for functionalities
   *  @var urls containes the actiual routerLink value for each tab in the menu
   *  @var showPlainBar is toogle weather to show plain toolbar when the user hasn't logged in yet
   *  @var showToolBar is toogle to logged in toolbar with actuall functionalities
   *  when the user clicks on ☰, as this component is used in the nav-bar component
   */
  display: string = 'invisible';
  private showMenu: boolean = false;
  noOfPings: Number = 10;
  tabs: String[] = ["Charts", "Wallet", "Order History", "BUY / SELL", "A/c Settings"];
  urls: String[] = ["home", "wallet", "orderHistory", "buysell", "accountsettings"];
  private showToolBar: boolean;
  private showPlainBar: boolean;

  constructor(private router: Router){
    this.showToolBar = false;
    this.showPlainBar = true;
  }

  /**
  * @param {function(): void} param - this is function is used to set the animation into paly when menu is displayed
  */
  showMenufunc=function(){
    // to toggle between fadein or not when the menu bar is displayed
    this.display = (this.display === 'invisible' ? 'visible' : 'invisible');
    // changing the boolean value of showMenu to display the menu bar
    this.showMenu = !this.showMenu;
  }

  /**
  * @param {function(): void} param - this is function is used to check which url is active if its login, register, ""
  * if so then show the PlainBar else show the ToolBar
  */
  onActivate($event): void{
    if(this.router.url === "/login" || this.router.url === "/register" || this.router.url === "/"){
      // if we are on login or registeration or / page
      // then hide the tool bar and show the Plain Bar
      this.showToolBar = false;
      this.showPlainBar = true;
    }else{
      // if we are on any page other than the ones mentioned above
      // then show the tool bar and hide the Plain Bar
      this.showToolBar = true;
      this.showPlainBar = false;
    }
  }
}
