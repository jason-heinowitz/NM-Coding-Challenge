import * as types from './types';
import { EmailAction, EmailOverviewReducer } from './interfaces';

const initialState: EmailOverviewReducer = {
  emails: null,
  favorites: [],
  isFetchingEmails: false,
};

/**
 * Handles all fetched emails after a user logs in
 */
const reducer = (state = initialState, action: EmailAction): EmailOverviewReducer => {
  switch (action.type) {
    case (types.FETCH_EMAILS_START):
      return {
        ...state,
        isFetchingEmails: true,
      };
    case (types.FETCH_EMAILS_PASS):
      return {
        emails: action.emails,
        favorites: action.favorites,
        isFetchingEmails: false,
      };
    case (types.FETCH_EMAILS_FAIL):
      return {
        ...state,
        isFetchingEmails: false,
      };
    // after successful deletion of an email from db, remove it from user's client
    case (types.DELETE_EMAIL_PASS):
      return {
        ...state,
        emails: state.emails.filter((e) => e._id !== action.id),
        favorites: state.favorites.filter((e) => e._id !== action.id),
      };
    default:
      return state;
  }
};

export default reducer;