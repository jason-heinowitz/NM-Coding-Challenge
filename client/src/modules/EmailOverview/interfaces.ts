export interface Action {
  type: string;
}

export interface DeleteEmail extends Action {
  id: string;
}

export interface SendEmail extends Action {
  email: SendEmailObj;
}

export interface EmailAction extends Action {
  emails?: Email[];
  favorites?: Email[];
  id?: string;
}

export interface EmailOverviewReducer {
  emails: Email[];
  favorites: Email[];
  isFetchingEmails: boolean;
  isSendingEmail: boolean;
}

export interface MapState {
  emails: Email[];
  favorites: [];
  isFetching: boolean;
  isSending: boolean;
}

export interface MapDispatch {
  fetchEmails(): any;
  deleteEmail(id: string): any;
  sendEmail(email: SendEmailObj): any;
}

export interface EmailOverviewContainer extends MapState, MapDispatch {

}

export interface SendEmailObj {
  to: string;
  subject: string;
  body: string;
}

export interface Email {
  _id: string;
  from: string;
  to: string[];
  user: string;
  subject: string;
  body: string;
}
