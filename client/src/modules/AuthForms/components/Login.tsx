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
  const {
    isLoggingIn, isRegistering, loginFailed, loginSuccess,
  } = status;

  function submitForm(key: string): void {
    if (key === 'Enter') submit({ username, password });
  }

  let logInButtonText;

  if (loginSuccess) logInButtonText = 'Log in successful. Redirecting...';
  else if (isLoggingIn) logInButtonText = 'Logging in...';
  else logInButtonText = 'Log In';

  return (
    <div className="form" data-test="login-form">
      <h3>Log In</h3>
      <label htmlFor="login-username" data-test="login-username">Username</label>
      <input type="text" name="login-username" id="login-username" onKeyDown={(e): void => submitForm(e.key)} value={username} onChange={(e) => setUsername(e.target.value)} />

      <label htmlFor="login-password" data-test="login-password">Password</label>
      <input type="password" name="login-password" id="login-password" onKeyDown={(e): void => submitForm(e.key)} value={password} onChange={(e) => setPassword(e.target.value)} />

      <button disabled={isLoggingIn || isRegistering} type="submit" onClick={(): void => submitForm('Enter')} className="submit" data-test="login-submit">{logInButtonText}</button>
      {loginFailed ? <p className="auth-fail-message">{loginFailed}</p> : <p />}
    </div>
  );
};

export default Login;
