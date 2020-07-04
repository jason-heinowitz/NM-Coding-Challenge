import React, { FC, useState } from 'react';
import { UserInfo } from '../interfaces';

interface PropTypes {
  submit(userInfo: UserInfo): any;
}

const Register: FC<PropTypes> = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="form" data-test="register-form">
      <label htmlFor="username" data-test="username">
        Username
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>

      <label htmlFor="password" data-test="pasword">
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>

      <label htmlFor="confirm-password" data-test="confirm-password">
        Confirm Password
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </label>

      <button type="submit" onClick={() => props.submit({ username, password, confirmPassword })} className="submit" data-test="register-submit">Sign Up</button>
    </div>
  );
};

export default Register;
