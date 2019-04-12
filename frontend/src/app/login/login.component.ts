import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../models/user';
import {Login} from '../models/login';
import { AppState, selectAuthState } from '../store/state/app.states';
import { LogIn } from '../store/actions/user.actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-log-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // user: User = new User();
  login:Login = new Login();


  //error msgs
  getState: Observable<any>;
  errorMessage: string | null;
  constructor(
    private store: Store<AppState>
  ) {this.getState = this.store.select(selectAuthState); }

  ngOnInit() {
    if(this.store.select("token")!=null){
      
    }
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  /**
   * @desc dispatch a new Login Action with input data
   */
  onSubmit(): void {
    console.log(this.login);
    this.store.dispatch(new LogIn(this.login));
  }

}