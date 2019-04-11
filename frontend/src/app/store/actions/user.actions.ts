import { User } from './../../models/user';
import { Action } from '@ngrx/store';

export enum UserActionType {
  REGISTER_USER = '[User] Add User',
  LOGIN_USER = '[User] Login  User',
  
}
/**
 * @desc
 */
export class RegisterUserAction implements Action {

  readonly type = UserActionType.REGISTER_USER

  constructor(public payload: User) { }
}

/**
 * @desc
 */
export class LoginUserAction implements Action {

  readonly type = UserActionType.LOGIN_USER;

  constructor(public payload: User) { }
}

/**
 * @desc 
 */
export type UserActions = RegisterUserAction | LoginUserAction ;