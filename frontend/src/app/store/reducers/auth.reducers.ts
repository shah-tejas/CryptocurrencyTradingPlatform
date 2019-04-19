import { User } from '../../models/user';
import { AuthActionTypes, All } from '../actions/user.actions';
import { Token } from 'src/app/models/token';

/**
 * @description Reducers - pure functions that create a new state
 */

 /**
  * @desc State interface
  * @var isAuthenticated boolean value
  * @var result should be instance of token model or null
  * @var errorMessage should be string or null
  */
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

/**
 * @desc there is switch case where it check which action needs to be performed and accordingly the state will be sent 
 * @param state defined a const intial state that is an implementation of State
 * @param action the actions that is defined in user.actions 
 * @returns State
 */
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
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    
    case AuthActionTypes.UPDATEUSER_SUCCESS:{
      return {
        ...state,
        isAuthenticated: true,
        result:{
          token: localStorage.getItem("token"),
          user: action.payload.User
        },
        errorMessage: null
      };
    };

    case AuthActionTypes.UPDATEUSER_FAILURE:{
      return {
        ...state,
        errorMessage: 'Please enter the right details'
      };
    }
    
    default: {
      return state;
    }
  }
}
