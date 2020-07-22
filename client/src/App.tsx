import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, Link } from 'react-router-dom';


import store, { history } from './store';
import { AuthLoginContainer, AuthFormsContainer, EmailOverviewContainer } from './modules';
import './styles.scss';

/**
 * Contains all components for the application
 * Connects store and react router to application
 */
const App: FC<{}> = () => (
  <div className="app">
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <h1 id="title" data-test="welcome-message">Re(act)-Mail</h1>

        <Switch>
          <Route path="/*">
            <AuthLoginContainer notAuthedComponent={AuthFormsContainer} isAuthedComponent={EmailOverviewContainer} />
          </Route>
        </Switch>
      </ConnectedRouter>
    </Provider>
  </div>
);

export default App;
