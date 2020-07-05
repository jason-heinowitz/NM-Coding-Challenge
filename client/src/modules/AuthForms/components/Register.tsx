import React, { FC, useState } from 'react';
import { UserInfo, AuthFormsReducer } from '../interfaces';

interface PropTypes {
  submit(userInfo: UserInfo): any;
  status: AuthFormsReducer;
}

/**
 * Registration form for unauthenticated user
 * @param {PropTypes} props contains callback to submit new user registration info
 */
const Register: FC<PropTypes> = ({ submit, status }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { isLoggingIn, isRegistering, registerFailed } = status;

  return (
    <div className="form" data-test="register-form">
      <h3>Sign-Up</h3>
      <label htmlFor="register-username" data-test="register-username">Username</label>
      <input type="text" name="register-username" id="register-username" value={username} onChange={(e) => setUsername(e.target.value)} />

      <label htmlFor="register-password" data-test="register-password">Password</label>
      <input type="password" name="register-password" id="register-password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <label htmlFor="register-confirm-password" data-test="register-confirm-password">Confirm Password</label>
      <input type="password" name="register-confirm-password" id="register-confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

      <button disabled={isLoggingIn || isRegistering} type="submit" onClick={(): void => submit({ username, password, confirmPassword })} className="submit" data-test="register-submit">{isRegistering ? 'Registering...' : 'Sign Up'}</button>
      {registerFailed ? <p className="auth-fail-message">{registerFailed}</p> : ''}
    </div>
  );
};

export default Register;
