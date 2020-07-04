import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, Link } from 'react-router-dom';


import store, { history } from './store';
import { AuthLoginContainer, AuthFormsContainer, EmailOverviewContainer } from './modules';

const App: FC<{}> = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <h1 data-test="welcome-message">Welcome to Re(act)-Mail!</h1>

      <Switch>
        <Route path="/*">
          <AuthLoginContainer notAuthedComponent={AuthFormsContainer} isAuthedComponent={EmailOverviewContainer} />
        </Route>
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;
