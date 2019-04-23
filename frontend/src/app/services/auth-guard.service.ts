import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {
  
  constructor(public auth: AuthService, public router: Router) {}
  /**
   * @desc checks if the token is present or not and if not present takes it to login page.
   * @return boolean
   */
  canActivate(): boolean {
    if (!this.auth.getToken()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}