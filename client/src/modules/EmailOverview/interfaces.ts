export interface Action {
  type: string;
}

export interface EmailAction extends Action {
  emails?: [];
  favorites?: [];
}

export interface EmailOverviewReducer {
  emails: [];
  favorites: [];
  isFetchingEmails: boolean;
}

export interface MapState {
  emails: [];
  favorites: [];
  isFetching: boolean;
}

export interface MapDispatch {
  fetchEmails(): any;
}

export interface EmailOverviewContainer extends MapState, MapDispatch {

}
