export interface Action {
  type: string;
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
}

export interface MapState {
  emails: Email[];
  favorites: [];
  isFetching: boolean;
}

export interface MapDispatch {
  fetchEmails(): any;
  deleteEmail(id: string): any;
}

export interface EmailOverviewContainer extends MapState, MapDispatch {

}

export interface Email {
  _id: string;
  from: string;
  to: string[];
  user: string;
  subject: string;
  body: string;
}
