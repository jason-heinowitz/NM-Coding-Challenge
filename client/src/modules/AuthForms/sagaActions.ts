import * as types from './sagaTypes';
import {
  LoginAction, RegisterAction, UserInfo,
} from './interfaces';

const login = (userInfo: UserInfo): LoginAction => ({
  type: types.LOGIN,
  userInfo,
});

const register = (userInfo: UserInfo): RegisterAction => ({
  type: types.REGISTER,
  userInfo,
});

export default {
  login,
  register,
};
