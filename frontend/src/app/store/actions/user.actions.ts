import { Action } from '@ngrx/store';

/**
  * @desc Actions describe state changes
  */
export enum AuthActionTypes {

  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register Success',
  REGISTER_FAILURE = '[Auth] Register Failure',
  LOGOUT = '[Auth] Logout',
  ACCOUNTSETTINGS = '[Auth] AccountSettings',
  UPDATEUSER = '[Auth] UpdateUser',
  UPDATEUSER_SUCCESS = '[Auth] Update User Success',
  UPDATEUSER_FAILURE = '[Auth] UpdateUser Failure'
}

/**
 * @desc implementation of Action for Login
 */
export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) {
    console.log("Inside LogIn Constructor", payload);
  }
}
/**
 * @desc implementation of Action for Login Success
 */
export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) { }
}

/**
 * @desc implementation of Action for Login Failure
 */
export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) { }
}

/**
 * @desc implementation of Action for Registration
 */
export class Register implements Action {
  readonly type = AuthActionTypes.REGISTER;
  constructor(public payload: any) { }
}

/**
 * @desc implementation of Action for Registration Success
 */
export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.REGISTER_SUCCESS;
  constructor(public payload: any) { }
}

/**
 * @desc implementation of Action for Registration Failure
 */
export class RegisterFailure implements Action {
  readonly type = AuthActionTypes.REGISTER_FAILURE;
  constructor(public payload: any) { }
}

/**
 * @desc implementation of Action for Logout
 */
export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

/**
 * @desc implementation of Action for Account Settings
 */
export class AccountSettings implements Action {
  readonly type = AuthActionTypes.ACCOUNTSETTINGS;
}

/**
 * @desc implementation of Action for update user
 */
export class UpdateUser implements Action {
  readonly type = AuthActionTypes.UPDATEUSER;
  constructor(public payload: any) { }
}
/**
 * @desc implementation of Action for Update Success
 */
export class UpdateUserSuccess implements Action {
  readonly type = AuthActionTypes.UPDATEUSER_SUCCESS;
  constructor(public payload: any) { }
}

/**
 * @desc implementation of Action for Update Failure
 */
export class UpdateUserFailure implements Action {
  readonly type = AuthActionTypes.UPDATEUSER_FAILURE;
  constructor(public payload: any) { }
}

export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | Register
  | RegisterSuccess
  | RegisterFailure
  | LogOut
  | AccountSettings
  | UpdateUser
  | UpdateUserSuccess
  | UpdateUserFailure;
