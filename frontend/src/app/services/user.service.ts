import { LoginUserAction,RegisterUserAction } from './../store/actions/user.actions';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/user';

import { Observable } from 'rxjs';
import { take, concatMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/state';

@Injectable()
export class UserService {

  userResource: string;
  userResourceURL: string;

    /**
   * Constructor.
   */
  constructor(
    private http: HttpClient,
    private store: Store<AppState>
  ) {
    this.userResource = 'users';
    this.userResourceURL = `${environment.serverBaseURL}/${this.userResource}`;
  }

  /**
   * Returns all users.
   *
   * @return {Observable} {Observable user array of users}
   */
  public getUsers(): Observable<Array<User>> {
    const users$: Observable<Array<User>> = this.store.pipe(
      select('users')
    );
    return users$;
  }
}