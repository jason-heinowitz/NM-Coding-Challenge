import React, { FC } from 'react';
import { connect } from 'react-redux';

import actions from './sagaActions';
import {
  UserInfo, AuthFormsReducer, MapDispatch, AuthFormsContainer,
} from './interfaces';
import { Login, Register } from './components';

const mapStateToProps = (state: any): AuthFormsReducer => ({
  isLoggingIn: state.authForms.isLoggingIn,
  isRegistering: state.authForms.isRegistering,
});

const mapDispatchToProps = (dispatch: any): MapDispatch => ({
  login: (userInfo: UserInfo) => dispatch(actions.login(userInfo)),
  register: (userInfo: UserInfo) => dispatch(actions.register(userInfo)),
});

const container: FC<AuthFormsContainer> = ({
  login, register, isLoggingIn, isRegistering,
}) =>
// give feedback to user than their form submission is being processed

  (
    <div id="auth-forms-container">
      <Login submit={login} status={{ isLoggingIn, isRegistering }} />
      <Register submit={register} status={{ isLoggingIn, isRegistering }} />
    </div>
  );
export default connect(mapStateToProps, mapDispatchToProps)(container);
