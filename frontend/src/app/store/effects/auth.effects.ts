import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';


import { AuthService } from '../../services/auth.service';


@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}


}