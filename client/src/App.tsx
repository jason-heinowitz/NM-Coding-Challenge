import React, { FC } from 'react';
import { Provider } from 'react-redux';

import store from './store';
import { AuthLoginContainer } from './modules';

const t1: FC<{}> = () => (
  <div>
    <p>not authed</p>
  </div>
);

const t2: FC<{}> = () => (
  <div>
    <p>is authed</p>
  </div>
);

const App: FC<{}> = () => (
  <Provider store={store}>
    <h1 data-test="welcome-message">Welcome to Re(act)-Mail!</h1>
    <AuthLoginContainer notAuthedComponent={t1} isAuthedComponent={t2} />
  </Provider>
);

export default App;
