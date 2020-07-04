import { takeLeading, put, call } from 'redux-saga/effects';

import * as types from './sagaTypes';
import * as actions from './actions';

/**
 * Make request to api, setting user state to logged in if response is 200 else not logged in
 */
function* checkCookies() {
  yield put(actions.checkCookiesStart());
  console.log('checking cookies...');

  const { status } = yield call(fetch, '/api/auth/validate');

  if (status !== 200) yield put(actions.checkCookiesFail());
  else yield put(actions.checkCookiesPass());
}

/**
 * Watches for request to start checking cookies
 */
function* watchCookies() {
  /**
   * A user shouldn't be able to make multiple requests on a single page load
   */
  yield takeLeading(types.CHECK_COOKIES, checkCookies);
}

export default {
  watchCookies,
};
