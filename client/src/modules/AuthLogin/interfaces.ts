import { FC } from 'react';

export interface AuthLoginContainer extends MapState, MapDispatch {
  notAuthedComponent: FC;
  isAuthedComponent: FC;
}

export interface AuthLoginReducer {
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
}

export interface Action {
  type: string;
}

export interface MapState {
  isLoggedIn: boolean | null;
}

export interface MapDispatch {
  checkCookies(): any;
  logout(): any;
}
