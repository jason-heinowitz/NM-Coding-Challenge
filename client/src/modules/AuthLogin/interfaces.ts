import { FC } from 'react';

export interface AuthLoginContainer extends MapState, DispatchState {
  notAuthedComponent: FC;
  isAuthedComponent: FC;
}

export interface AuthLoginReducer {
  isLoggedIn: boolean | null;
  isLoggingIn: boolean;
}

export interface Action {
  type: string;
}

export interface MapState {
  isLoggedIn: boolean | null;
}

export interface DispatchState {
  checkCookies(): any;
}
