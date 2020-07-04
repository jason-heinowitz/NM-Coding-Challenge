import { takeLeading, put, call } from 'redux-saga/effects';

import * as types from './sagaTypes';
import * as actions from './actions';

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
 * Waits for request to fetch emails from db
 */
function* watchFetchEmails() {
  yield takeLeading(types.FETCH_EMAILS, fetchEmails);
}

export default {
  watchFetchEmails,
};
