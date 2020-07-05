import React, { FC, useState } from 'react';
import { UserInfo, AuthFormsReducer } from '../interfaces';

interface PropTypes {
  submit(userInfo: UserInfo): any;
  status: AuthFormsReducer;
}

/**
 * Login form for unauthenticated user
 * @param {PropTypes} props contains callback to submit login request
 */
const Login: FC<PropTypes> = ({ submit, status }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggingIn, isRegistering, loginFailed } = status;

  function validateInput(): void {
    if (username.length === 0) {
      alert('Username cannot be empty.');
      return;
    }

    if (password.length === 0) {
      alert('Password cannot be empty');
      return;
    }

    submit({ username, password });
  }

  return (
    <div className="form" data-test="login-form">
      <h3>Log In</h3>
      <label htmlFor="login-username" data-test="login-username">Username</label>
      <input type="text" name="login-username" id="login-username" value={username} onChange={(e) => setUsername(e.target.value)} />

      <label htmlFor="login-password" data-test="login-password">Password</label>
      <input type="password" name="login-password" id="login-password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button disabled={isLoggingIn || isRegistering} type="submit" onClick={(): void => validateInput()} className="submit" data-test="login-submit">{isLoggingIn ? 'Logging in...' : 'Log In'}</button>
      {loginFailed ? <p>{loginFailed}</p> : ''}
    </div>
  );
};

export default Login;
