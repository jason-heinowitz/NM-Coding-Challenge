import * as types from './types';
import { Action } from './interfaces';

export const checkCookiesStart = (): Action => ({
  type: types.CHECK_COOKIES_START,
});

export const checkCookiesPass = (): Action => ({
  type: types.CHECK_COOKIES_PASS,
});

export const checkCookiesFail = (): Action => ({
  type: types.CHECK_COOKIES_FAIL,
});


// logout actions
export const logoutStart = (): Action => ({
  type: types.LOGOUT_START,
});

export const logoutPass = (): Action => ({
  type: types.LOGOUT_PASS,
});

export const logoutFail = (): Action => ({
  type: types.LOGOUT_FAIL,
});
