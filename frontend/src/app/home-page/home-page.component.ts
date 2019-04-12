import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/state/app.states';
import { LogOut } from '../store/actions/user.actions';

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
    this.store.dispatch(new LogOut);
  }


}
