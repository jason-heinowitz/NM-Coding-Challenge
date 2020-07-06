import React, { FC, useState } from 'react';
import { UserInfo, AuthFormsReducer } from '../interfaces';

interface PropTypes {
  submit(userInfo: UserInfo): any;
  status: AuthFormsReducer;
}

/**
 * Registration form for unauthenticated user
 */
const Register: FC<PropTypes> = ({ submit, status }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {
    isLoggingIn, isRegistering, registerFailed, registerSuccess,
  } = status;

  // enable enter key support to form inputs
  function submitForm(key: string): void {
    if (key === 'Enter') submit({ username, password, confirmPassword });
  }

  // dynamically assign register button text depending on state
  let registerButtonText;

  if (registerSuccess) registerButtonText = 'Registration successful. Redirecting...';
  else if (isRegistering) registerButtonText = 'Registering...';
  else registerButtonText = 'Register';

  return (
    <div className="form" data-test="register-form">
      <h3>Sign-Up</h3>
      <label htmlFor="register-username" data-test="register-username">Username</label>
      <input type="text" name="register-username" id="register-username" onKeyDown={(e): void => submitForm(e.key)} value={username} onChange={(e) => setUsername(e.target.value)} />

      <label htmlFor="register-password" data-test="register-password">Password</label>
      <input type="password" name="register-password" id="register-password" onKeyDown={(e): void => submitForm(e.key)} value={password} onChange={(e) => setPassword(e.target.value)} />

      <label htmlFor="register-confirm-password" data-test="register-confirm-password">Confirm Password</label>
      <input type="password" name="register-confirm-password" id="register-confirm-password" onKeyDown={(e): void => submitForm(e.key)} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

      <button disabled={isLoggingIn || isRegistering} type="submit" onClick={(): void => submitForm('Enter')} className="submit" data-test="register-submit">{registerButtonText}</button>
      {registerFailed ? <p className="auth-fail-message">{registerFailed}</p> : <p>‏‏‎ ‎</p>}
    </div>
  );
};

export default Register;
