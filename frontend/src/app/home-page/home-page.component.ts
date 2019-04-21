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

  @Output() showMenu: EventEmitter<String> = new EventEmitter<String>();

  constructor(private store: Store<AppState>, private router: Router)
  {
  }

  ngOnInit() {
  }
  logout(): void {
    this.store.dispatch(new LogOut);
  }

  settings(): void {
  this.store.dispatch(new AccountSettings() );
  }

  showMenufunc(): void {
    this.showMenu.emit("Show-Menu");
  }

}
