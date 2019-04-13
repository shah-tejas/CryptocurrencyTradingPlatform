import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthActionTypes, LogIn, LogInSuccess, LogInFailure, Register, RegisterSuccess, RegisterFailure,LogOut, GetStatus } from '../actions/user.actions';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) { }

  @Effect()
  LogIn: Observable<any> = this.actions
    .ofType(AuthActionTypes.LOGIN)
    .map((action: LogIn) => action.payload)
    .switchMap(payload => {
      console.log("Inside Effect");
      return this.authService.logIn(payload.username, payload.password)
        .map((result) => {
          console.log("Inside map of Effect",result);
          return new LogInSuccess({ user: result.User, token: result.token });
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new LogInFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((result) => {
       localStorage.setItem('token', result.payload.token);
        localStorage.setItem('user', result.payload.user);
      this.router.navigateByUrl('/home');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  Register: Observable<any> = this.actions
    .ofType(AuthActionTypes.REGISTER)
    .map((action: Register) => action.payload)
    .switchMap(payload => {
      return this.authService.register(payload)
        .map((user) => {
          console.log(user);
          return new RegisterSuccess({ User: user });
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new RegisterFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  RegisterSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.REGISTER_SUCCESS),
    tap((user) => {
       localStorage.setItem('token', user.payload.token);
      alert("Registration Successful!!");
      this.router.navigateByUrl('/login');
    })
  );
  @Effect({ dispatch: false })
  RegisterFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.REGISTER_FAILURE)
  );

  //Add effect (to remove token from localStorage)
  @Effect({ dispatch: false })
  public LogOut: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap((user) => {
      localStorage.removeItem('token');
    })
  );

}