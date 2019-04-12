import { User } from '../../models/user';
import { AuthActionTypes, All } from '../actions/user.actions';
import { Token } from 'src/app/models/token';



export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  result: Token | null;
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  result: null,
  errorMessage: null
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        result: {
          token : action.payload,
          user : action.payload.user
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    case AuthActionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        result:{
          token: null,
          user: action.payload.User
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.REGISTER_FAILURE: {
      return {
        ...state,
        errorMessage: 'That email is already in use.'
      };
    }
    default: {
      return state;
    }
  }
}
