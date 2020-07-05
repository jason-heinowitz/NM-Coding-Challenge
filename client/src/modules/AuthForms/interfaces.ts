export interface Action {
  type: string;
  errorMessage?: string;
}

export interface UserInfo {
  username: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginAction extends Action {
  userInfo: UserInfo;
}

export interface RegisterAction extends Action {
  userInfo: UserInfo;
}

export interface AuthFormsReducer {
  isLoggingIn: boolean;
  isRegistering: boolean;
  loginFailed?: string;
  registerFailed?: string;
}

export interface MapDispatch {
  login(userInfo: UserInfo): any;
  register(userInfo: UserInfo): any;
}


export interface AuthFormsContainer extends MapDispatch, AuthFormsReducer {

}
