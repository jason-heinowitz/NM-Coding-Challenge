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
 * Request logout from api where token should be deleted upon successful logout
 */
function* logout() {
  yield put(actions.logoutStart());

  // get status from logout
  const { status } = yield call(fetch, '/api/auth/logout', {
    method: 'POST',
  });

  // if logout failed, don't do anything
  if (status !== 200) yield put(actions.logoutFail());
  else {
    // if logout successful, refresh page
    yield put(actions.logoutPass());
    location.reload();
  }
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

/**
 * Watches for logout trigger
 */
function* watchLogout() {
  yield takeLeading(types.LOGOUT, logout);
}

export default {
  watchCookies,
  watchLogout,
};
