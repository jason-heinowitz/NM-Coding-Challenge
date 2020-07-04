import * as types from './sagaTypes';
import { Action } from './interfaces';

const checkCookies = (): Action => ({
  type: types.CHECK_COOKIES,
});

export default {
  checkCookies,
};
