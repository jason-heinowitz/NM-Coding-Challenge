import {
  takeLeading, put, call, takeEvery,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';

import * as types from './sagaTypes';
import * as actions from './actions';
import { SendEmailObj } from './interfaces';

/**
 * Attempt to fetch emails from db, returning error if failed
 */
function* fetchEmails() {
  yield put(actions.fetchEmailsStart());

  const emailResponse = yield call(fetch, '/api/email');

  if (emailResponse.status !== 200) yield put(actions.fetchEmailsFail());
  else {
    // if reponse is 200, call json method on readable stream to get data
    // TODO: implement reconciliation algorithim to optimize time to add new emails to current emails in redux store
    const { emails } = yield call([emailResponse, 'json']);
    const favorites = emails.filter((email) => email.favorite === true);

    // fetching emails successful, pass to redux store
    yield put(actions.fetchEmailsPass({
      emails,
      favorites,
    }));
  }
}

/**
 * Attempts to delete an email from db against id passed by user
 * @param {string} id mongo db id to delete
 */
function* deleteEmail({ id }) {
  yield put(actions.deleteEmailStart());

  const { status } = yield call(fetch, '/api/email', {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  });

  if (status !== 200) yield put(actions.deleteEmailFail(id));
  else (yield put(actions.deleteEmailPass(id)));
}

/**
 * Attempts to send an email
 * @param {SendEmailObj} email data to be processed by server
 */
function* sendEmail({ email }) {
  yield put(actions.sendEmailStart());
  const { to, subject, body } = email;

  const { status } = yield call(fetch, '/api/email', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      to,
      subject,
      body,
    }),
  });

  if (status !== 200) yield put(actions.sendEmailFail());
  else {
    // upon successful email send, return to '/' and fetch emails again
    yield put(actions.sendEmailPass());
    yield put(push('/'));
    yield put({ type: types.FETCH_EMAILS });
  }
}

/**
 * Waits for request to fetch emails from db
 */
function* watchFetchEmails() {
  yield takeLeading(types.FETCH_EMAILS, fetchEmails);
}

/**
 * Waits for request to delete a specific email
 * takeEvery to allow for concurrent deletions
 */
function* watchDeleteEmail() {
  yield takeEvery(types.DELETE_EMAIL, deleteEmail);
}

/**
 * Waits for request to send an email
 */
function* watchSendEmail() {
  yield takeLeading(types.SEND_EMAIL, sendEmail);
}

export default {
  watchFetchEmails,
  watchDeleteEmail,
  watchSendEmail,
};
