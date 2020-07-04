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

const container: FC<AuthFormsContainer> = (props) => {
  // give feedback to user than their form submission is being processed
  const currentAction = props.isLoggingIn
    ? 'Logging in...'
    : props.isRegistering
      ? 'Registering...' : '';

  return (
    <div>
      <Login submit={props.login} />
      <Register submit={props.register} />
      {currentAction}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(container);
