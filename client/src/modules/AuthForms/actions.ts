import * as types from './types';
import { Action } from './interfaces';

// login actions
export const loginStart = (): Action => ({
  type: types.LOGIN_START,
});

export const loginPass = (): Action => ({
  type: types.LOGIN_PASS,
});

export const loginFail = (errorMessage: string): Action => ({
  type: types.LOGIN_FAIL,
  errorMessage,
});

// register actions
export const registerStart = (): Action => ({
  type: types.REGISTER_START,
});

export const registerPass = (): Action => ({
  type: types.REGISTER_PASS,
});

export const registerFail = (): Action => ({
  type: types.REGISTER_FAIL,
});
