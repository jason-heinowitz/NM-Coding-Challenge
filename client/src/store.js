import {
  combineReducers, createStore, compose, applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

// import all reducers and sagas from modules
import {
  AuthLoginReducer, AuthLoginSagas, AuthFormsReducer, AuthFormsSagas, EmailOverviewReducer,
} from './modules';

// initialize history api and export to enable interaction through redux actions
export const history = createBrowserHistory();

// combine reducers together
const reducers = combineReducers({
  router: connectRouter(history),
  auth: AuthLoginReducer,
  authForms: AuthFormsReducer,
  emails: EmailOverviewReducer,
});

// initialize redux-saga middleware handler
const sagaMiddleware = createSagaMiddleware();

// create store with reducers (and dev tools only in development)
const store = process.env.NODE_ENV === 'development'
  ? createStore(reducers, compose(applyMiddleware(sagaMiddleware, routerMiddleware(history)), composeWithDevTools()))
  // exclude dev tools if outside of development
  : createStore(reducers, compose(applyMiddleware(sagaMiddleware, routerMiddleware(history))));

// watch for saga actions
sagaMiddleware.run(AuthLoginSagas.watchCookies);
sagaMiddleware.run(AuthFormsSagas.watchAuth);

// export for use in App.tsx
export default store;
