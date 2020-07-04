import * as types from './types';
import { AuthLoginReducer, Action } from './interfaces';

// initial state has isLoggedIn set to null as flag to check cookies, as opposed to false representing bad cookies/ not logged in
const initialState: AuthLoginReducer = {
  isLoggedIn: null,
  isLoggingIn: false,
  isLoggingOut: false,
};

/**
 * Highest-level reducer to check if user is currently logged in by sending a request to server and checking user's token
 */
const reducer = (state = initialState, action: Action): AuthLoginReducer => {
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
    case (types.LOGOUT_START):
      return {
        ...state,
        isLoggingOut: true,
      };
    case (types.LOGOUT_PASS):
      return {
        ...state,
        isLoggingOut: false,
      };
    case (types.LOGOUT_FAIL):
      return {
        ...state,
        isLoggingOut: false,
      };
    default:
      return state;
  }
};

export default reducer;
