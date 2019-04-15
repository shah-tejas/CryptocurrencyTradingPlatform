import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../models/user';
import {Login} from '../models/login';
import { AppState, selectAuthState } from '../store/state/app.states';
import { LogIn } from '../store/actions/user.actions';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-log-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   *  @var login  creating an instance  of Login class
   *  @var getState Observable
   *  @var errorMessage String value could  be string or nulll
   */
  login:Login = new Login();
  //error msgs
  getState: Observable<any>;
  errorMessage: string | null;
  constructor(private router: Router,
    private store: Store<AppState>
  ) {this.getState = this.store.select(selectAuthState); }

  ngOnInit() {
    /**
     * @desc the if loop check if the token is present in the local storage .
     *  if the token is present then it will directly be redirected to home page
     */
    if(localStorage.getItem('token')){
      this.router.navigateByUrl('/home');
    }
    /**
     * @desc subbscribed the getstate observable to print the error message if there is invalid credentials
     */
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