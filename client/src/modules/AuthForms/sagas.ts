import {
  put, call, take, fork, cancel, cancelled,
} from 'redux-saga/effects';

import * as types from './sagaTypes';
import * as actions from './actions';
import { UserInfo } from './interfaces';

/**
 * Attempt to login with a username + password combo that already exists in db
 * @param {UserInfo} userInfo information to login as an existing user
 */
function* login({ username, password }: UserInfo) {
  yield put(actions.loginStart());
  const loginStream = yield call(fetch, '/api/auth/login', {
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
  if (loginStream.status !== 200) {
    const { error } = yield call([loginStream, 'json']);

    // if log in fails, pass error message to front end
    yield put(actions.loginFail(error));
    yield put({ type: types.CANCEL_LOGIN });
  } else {
    yield put(actions.loginPass());

    // on successful log in, refresh page to update isLoggedIn state in auth
    // if connected react router was used, AuthLogin container would not update since isLoggedIn
    // is an independant piece of state
    location.reload();
  }
}

/**
 * Attempt to register a new user
 * @param {UserInfo} userInfo information to register a new user
 */
function* register({ username, password, confirmPassword }: UserInfo) {
  yield put(actions.registerStart());

  // validate form fields
  if (username.length === 0) {
    yield put(actions.registerFail('Username cannot be empty'));
    yield put({ type: types.CANCEL_LOGIN });
  }

  if (password.length === 0) {
    yield put(actions.registerFail('Password cannot be empty'));
    yield put({ type: types.CANCEL_LOGIN });
  }

  if (confirmPassword.length === 0) {
    yield put(actions.registerFail('Confirm password cannot be empty'));
    yield put({ type: types.CANCEL_LOGIN });
  }

  if (password !== confirmPassword) {
    yield put(actions.registerFail('Password and confirm password must match'));
    yield put({ type: types.CANCEL_LOGIN });
  }

  // make fetch request after form data validated
  const registerStream = yield call(fetch, '/api/auth/register', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
      confirmPassword,
    }),
  });

  if (registerStream.status !== 200) {
    const { error } = yield call([registerStream, 'json']);

    // send error message to front end
    yield put(actions.registerFail(error));
    yield put({ type: types.CANCEL_LOGIN });
  } else {
    yield put(actions.registerPass());
    location.reload();
  }
}

/**
 * Wait for log in/ log out triggers in a cycle to declaratively prevent authentication cancel
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

    // wait for cancel trigger
    const deAuthenticate = yield take([types.CANCEL_LOGIN]);

    switch (deAuthenticate.type) {
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
