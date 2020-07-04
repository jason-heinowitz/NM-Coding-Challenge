import * as types from './sagaTypes';

export const fetchEmails = () => ({
  type: types.FETCH_EMAILS,
});

export const deleteEmail = (id: string) => ({
  type: types.DELETE_EMAIL,
  id,
});
