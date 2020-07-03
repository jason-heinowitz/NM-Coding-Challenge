import {
  combineReducers, createStore, compose, applyMiddleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

// import all reducers and sagas from modules
import { AuthLoginReducer, AuthLoginSagas } from './modules';

// combine reducers together
const reducers = combineReducers({ auth: AuthLoginReducer });

const sagaMiddleware = createSagaMiddleware();

// create store with reducers (and dev tools in development)
const store = process.env.NODE_ENV === 'development'
  ? createStore(reducers, compose(applyMiddleware(sagaMiddleware), composeWithDevTools()))
  // exclude dev tools if outside of development
  : createStore(reducers, compose(applyMiddleware(sagaMiddleware)));

// watch for saga actions
sagaMiddleware.run(AuthLoginSagas.watchCookies);

export default store;
