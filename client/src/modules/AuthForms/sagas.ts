import {
  put, call, take, fork, cancel, cancelled,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as types from './sagaTypes';
import * as actions from './actions';
import { UserInfo } from './interfaces';

/**
 * Attempt to login with a username + password combo that already exists in db
 * @param {UserInfo} userInfo information to login as an existing user
 */
function* login({ username, password }: UserInfo) {
  try {
    yield put(actions.loginStart());
    const { status } = yield call(fetch, '/api/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    // if login is not good, cancel login saga
    if (status !== 200) yield put({ type: types.CANCEL_LOGIN });
    else {
      yield put(actions.loginPass());

      // on successful log in, refresh page to update isLoggedIn state in auth
      // if connected react router was used, AuthLogin container would not update since isLoggedIn
      // is an independant piece of state
      location.reload();
    }
  } finally {
    // on cancel, dispatch loginFail action
    if (yield cancelled()) yield put(actions.loginFail());
  }
}

/**
 * Attempt to register a new user
 * @param {UserInfo} userInfo information to register a new user
 */
function* register({ username, password, confirmPassword }: UserInfo) {
  yield put(actions.registerStart());
  const { status } = yield call(fetch, '/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
      confirmPassword,
    }),
  });

  if (status !== 200) yield put(actions.registerFail());
  else yield put(actions.registerPass());
}

/**
 * Fetch logout route to attempt to de-authenticate current user
 */
function* logout() {
  yield put(actions.logoutStart());
  const { status } = yield call(fetch, '/api/auth/logout', {
    method: 'POST',
  });

  if (status !== 200) yield put(actions.logoutFail());
  else yield put(actions.logoutPass());
}

/**
 * Wait for log in/ log out triggers in a cycle to declaratively prevent logout
 * triggers before logging in and vice-versa.
 */
function* watchAuth() {
  // continually run through watching auth for login -> logout cycle
  while (true) {
    // wait for log in trigger
    // use take instead of takeLeading do differentiate between methods to run
    const toLogin = yield take([types.LOGIN, types.REGISTER]);

    let action;
    switch (toLogin.type) {
      case (types.LOGIN):
        action = yield fork(login, toLogin.userInfo);
        break;
      case (types.REGISTER):
        action = yield fork(register, toLogin.userInfo);
        break;
      default:
        break;
    }

    // wait for log out trigger
    const deAuthenticate = yield take([types.LOGOUT, types.CANCEL_LOGIN]);

    switch (deAuthenticate.type) {
      case (types.LOGOUT):
        yield logout();
        break;
      case (types.CANCEL_LOGIN):
        yield cancel(action);
        break;
      default:
        break;
    }

    // wait for log in trigger again
  }
}

export default {
  watchAuth,
};
