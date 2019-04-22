import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../models/user';
import {Login} from '../models/login';
import { AppState, selectAuthState } from '../store/state/app.states';
import { LogIn } from '../store/actions/user.actions';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-log-in',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginDetailsFormGroup: FormGroup;

  /**
   *  @var login  creating an instance  of Login class
   *  @var getState Observable
   *  @var errorMessage String value could  be string or nulll
   */
  login:Login = new Login();
  //error msgs
  getState: Observable<any>;
  errorMessage: string | null;
  @Output() authenticate: EventEmitter<String> = new EventEmitter<String>();

  constructor(private router: Router,
    private store: Store<AppState>,private _formBuilder: FormBuilder
  ) {this.getState = this.store.select(selectAuthState); }

  ngOnInit() {
    /**
     * @desc the if loop check if the token is present in the local storage .
     *  if the token is present then it will directly be redirected to home page
     */

    if(localStorage.getItem('token')){
      this.router.navigateByUrl('/wallet');
    }
    /**
     * @desc subscribed the getstate observable to print the error message if there is invalid credentials
     */
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });

    this.loginDetailsFormGroup = this._formBuilder.group({
      emailId: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*')]],
      password: ['', [Validators.required,Validators.pattern('[^\s]{6,13}')]],
    });
  }

  /**
   * @desc dispatch a new Login Action with input data
   */
  onSubmit(): void {
    this.store.dispatch(new LogIn(this.login));
    this.authenticate.emit("loggedin");
  }

}
