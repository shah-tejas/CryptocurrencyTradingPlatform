import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/state/app.states';
import { LogOut, AccountSettings } from '../store/actions/user.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  /**
   *  @var showMenu this event emitter is used to notify the nav bar component to show the menu
   *  when the user clicks on ☰, as this component is used in the nav-bar component
   */
  @Output() showMenu: EventEmitter<String> = new EventEmitter<String>();

  constructor(private store: Store<AppState>, private router: Router)
  {
  }

  ngOnInit() {
  }

  /**
  * @param {function(): void} param - this is function is used to logout once the logout button is clicked
  */
  logout(): void {
    this.store.dispatch(new LogOut);
  }

  /**
  * @param {function(): void} param - this is function is used to pull up the component for user setting manipulation,
  * also to store these changes to store
  */
  settings(): void {
  this.store.dispatch(new AccountSettings() );
  }

  /**
  * @param {function(): void} param - this is function emits event to its parent element
  * i.e nav-bar component to indicate that the user has clicked on ☰
  */
  showMenufunc(): void {
    this.showMenu.emit("Show-Menu");
  }

}
