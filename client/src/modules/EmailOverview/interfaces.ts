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
