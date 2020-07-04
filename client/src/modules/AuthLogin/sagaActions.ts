import * as types from './sagaTypes';
import { Action } from './interfaces';

const checkCookies = (): Action => ({
  type: types.CHECK_COOKIES,
});

const logout = (): Action => ({
  type: types.LOGOUT,
});

export default {
  checkCookies,
  logout,
};
