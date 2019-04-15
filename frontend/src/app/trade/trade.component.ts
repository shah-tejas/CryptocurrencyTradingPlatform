import { AppState } from './../store/state/app.states';
import { LogOut } from './../store/actions/user.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {

  constructor(private store: Store<AppState>)
  {

   }

  ngOnInit() {
  }
  logOut(): void {
    this.store.dispatch(new LogOut);
  }

}
