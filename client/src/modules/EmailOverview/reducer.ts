import * as types from './types';
import { EmailAction, EmailOverviewReducer } from './interfaces';

const initialState: EmailOverviewReducer = {
  emails: [],
  favorites: [],
  isFetchingEmails: false,
};

const reducer = (state = initialState, action: EmailAction): EmailOverviewReducer => {
  switch (action.type) {
    case (types.FETCH_EMAILS_START):
      return ({
        ...state,
        isFetchingEmails: true,
      });
    case (types.FETCH_EMAILS_PASS):
      return ({
        emails: action.emails,
        favorites: action.favorites,
        isFetchingEmails: false,
      });
    case (types.FETCH_EMAILS_FAIL):
      return ({
        ...state,
        isFetchingEmails: false,
      });
    default:
      return state;
  }
};

export default reducer;
