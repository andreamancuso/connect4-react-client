declare var API_URL: string;

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware, Store, Reducer } from 'redux';
import APIClient from '../lib/api/client';
import { IState } from './types';
import { IAPIClientConf } from '../types';

import { reducers } from './reducers/root';

const App = require('./containers/App').default;
const apiConf: IAPIClientConf = require('./resources/api-client-conf.json');

import 'antd/dist/antd.css';
import './index.less';
import { GameAction } from './actions/game';

const apiClient = new APIClient(API_URL, apiConf);
const rootReducer: Reducer<IState> = combineReducers<IState>(reducers);
const baseMiddlewares = applyMiddleware(thunk.withExtraArgument({ apiClient }));
const middlewares =
  process.env.NODE_ENV === 'production' ? baseMiddlewares : composeWithDevTools(baseMiddlewares);
const store: Store<IState, GameAction> = createStore(rootReducer, middlewares);

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <App />
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default;

    ReactDOM.render(
      <React.Fragment>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </React.Fragment>,
      document.getElementById('root')
    );
  });

  module.hot.accept('./reducers/root', () =>
    store.replaceReducer(combineReducers(require('./reducers/root').default))
  );
}
