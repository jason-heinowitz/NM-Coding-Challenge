import * as types from './sagaTypes';
import { Action } from './interfaces';

export const checkCookies = (): Action => ({
  type: types.CHECK_COOKIES,
});
