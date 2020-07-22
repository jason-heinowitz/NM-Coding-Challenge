import * as types from './types';
import { Action, EmailAction } from './interfaces';

export const fetchEmailsStart = (): Action => ({
  type: types.FETCH_EMAILS_START,
});

export const fetchEmailsPass = ({ emails, favorites }: EmailAction): EmailAction => ({
  type: types.FETCH_EMAILS_PASS,
  emails,
  favorites,
});

export const fetchEmailsFail = (): Action => ({
  type: types.FETCH_EMAILS_FAIL,
});


export const deleteEmailStart = (): Action => ({
  type: types.DELETE_EMAIL_START,
});

export const deleteEmailPass = (id: string): EmailAction => ({
  type: types.DELETE_EMAIL_PASS,
  id,
});

export const deleteEmailFail = (id: string): EmailAction => ({
  type: types.DELETE_EMAIL_FAIL,
  id,
});

export const sendEmailStart = (): Action => ({
  type: types.SEND_EMAIL_START,
});

export const sendEmailPass = (): Action => ({
  type: types.SEND_EMAIL_PASS,
});

export const sendEmailFail = (): Action => ({
  type: types.SEND_EMAIL_FAIL,
});
