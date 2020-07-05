import * as types from './sagaTypes';
import {
  SendEmail, SendEmailObj, Action, DeleteEmail,
} from './interfaces';

export const fetchEmails = (): Action => ({
  type: types.FETCH_EMAILS,
});

export const deleteEmail = (id: string): DeleteEmail => ({
  type: types.DELETE_EMAIL,
  id,
});

export const sendEmail = (email: SendEmailObj): SendEmail => ({
  type: types.SEND_EMAIL,
  email,
});
