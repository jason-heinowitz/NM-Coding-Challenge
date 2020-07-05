import * as types from './types';
import { AuthFormsReducer, Action } from './interfaces';

const initialState: AuthFormsReducer = {
  isLoggingIn: false,
  isRegistering: false,
  loginFailed: '',
  registerFailed: '',
};

/**
 * Handles login, registration, and logout functionality of the main email application
 */
const reducer = (state = initialState, action: Action): AuthFormsReducer => {
  switch (action.type) {
    // log in handlers
    case (types.LOGIN_START):
      return ({
        ...state,
        isLoggingIn: true,
        loginFailed: '',
        registerFailed: '',
      });
    case (types.LOGIN_PASS):
      return ({
        ...state,
        isLoggingIn: false,
      });
    case (types.LOGIN_FAIL):
      return ({
        ...state,
        isLoggingIn: false,
        loginFailed: action.errorMessage,
      });

    // register handlers
    case (types.REGISTER_START):
      return ({
        ...state,
        isRegistering: true,
        loginFailed: '',
        registerFailed: '',
      });
    case (types.REGISTER_PASS):
      return ({
        ...state,
        isRegistering: false,
      });
    case (types.REGISTER_FAIL):
      return ({
        ...state,
        isRegistering: false,
        registerFailed: action.errorMessage,
      });
    default:
      return state;
  }
};

export default reducer;
