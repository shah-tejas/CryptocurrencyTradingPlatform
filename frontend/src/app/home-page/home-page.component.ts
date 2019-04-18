import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/state/app.states';
import { LogOut,AccountSettings } from '../store/actions/user.actions';
import { User } from '../models/user';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private store: Store<AppState>) 
  {
    
   }

  ngOnInit() {
  }
  logOut(): void {
    console.log("------hhiii--");
 console.log( JSON.parse((localStorage.getItem("user"))));
    
    this.store.dispatch(new LogOut);
  }

  settings(): void {
  console.log( JSON.parse((localStorage.getItem("user"))));
  this.store.dispatch(new AccountSettings() );
  }

}
