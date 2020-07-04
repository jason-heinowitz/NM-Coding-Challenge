import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { Switch, Route } from 'react-router';
import store, { history } from './store';
import { AuthLoginContainer, AuthFormsContainer, EmailOverviewContainer } from './modules';

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
    <ConnectedRouter history={history}>
      <h1 data-test="welcome-message">Welcome to Re(act)-Mail!</h1>

      <Switch>
        <Route path="/" exact>
          <AuthLoginContainer notAuthedComponent={AuthFormsContainer} isAuthedComponent={EmailOverviewContainer} />
        </Route>
        <Route path="*">
          <p>404 not found</p>
        </Route>
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;
