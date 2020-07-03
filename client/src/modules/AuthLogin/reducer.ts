import * as types from './types';
import { AuthLoginReducer, Action } from './interfaces';

// initial state has isLoggedIn set to null as flag to check cookies, as opposed to false representing bad cookies/ not logged in
const initialState: AuthLoginReducer = {
  isLoggedIn: null,
  isLoggingIn: false,
};

/**
 * Highest-level reducer to check if user is currently logged in by sending a request to server and checking user's token
 * @param {AuthLoginReducer} state current state of reducer
 * @param {Action} action sets current state of checking cookie process
 */
const authLoginReducer = (state = initialState, action: Action): AuthLoginReducer => {
  switch (action.type) {
    case (types.CHECK_COOKIES_START):
      return {
        ...state,
        isLoggingIn: true,
      };
    case (types.CHECK_COOKIES_PASS):
      return {
        ...state,
        isLoggedIn: true,
        isLoggingIn: false,
      };
    case (types.CHECK_COOKIES_FAIL):
      return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: false,
      };
    default:
      return state;
  }
};

export default authLoginReducer;
