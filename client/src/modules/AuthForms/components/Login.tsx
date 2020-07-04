import React, { FC, useState } from 'react';
import { UserInfo } from '../interfaces';

interface PropTypes {
  submit(userInfo: UserInfo): any;
}

const Login: FC<PropTypes> = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="form" data-test="login-form">
      <label htmlFor="username" data-test="username">
        Username
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>

      <label htmlFor="password" data-test="password">
        Password
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>

      <button type="submit" onClick={() => props.submit({ username, password })} className="submit" data-test="login-submit">Log In</button>
    </div>
  );
};

export default Login;
