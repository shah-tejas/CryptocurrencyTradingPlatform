import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../models/user';
import {Login} from '../models/login';
import { AppState } from '../store/state/app.states';
import { LogIn } from '../store/actions/user.actions';


@Component({
  selector: 'app-log-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // user: User = new User();
  login:Login = new Login();
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    
  }

  /**
   * @desc dispatch a new Login Action with input data
   */
  onSubmit(): void {
    console.log(this.login);
    this.store.dispatch(new LogIn(this.login));
  }

}