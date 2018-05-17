import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { Provider } from 'react-redux';
import {combineReducers, createStore, applyMiddleware, Store, GenericStoreEnhancer, Reducer} from 'redux';
import APIClient from "../lib/api/client";
import {State} from "./types";
import {APIClientConf} from "../types";

import {reducers} from './reducers/root';

const App = require('./containers/App').default;
const apiConf: APIClientConf = require('./resources/api-client-conf.json');

import 'antd/dist/antd.css';
import './index.less';

const apiClient = new APIClient(apiConf);
const rootReducer: Reducer<State> = combineReducers<State>(reducers);
const baseMiddlewares: GenericStoreEnhancer = applyMiddleware(thunk.withExtraArgument(apiClient));
const middlewares: GenericStoreEnhancer = process.env.NODE_ENV === 'production' ? baseMiddlewares : composeWithDevTools(baseMiddlewares);
const store: Store<State> = createStore<State>(
    rootReducer,
    middlewares
);

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <App/>
        </Provider>
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        const NextApp = require('./containers/App').default;

        ReactDOM.render(
            <AppContainer>
                <Provider store={store}>
                    <NextApp/>
                </Provider>
            </AppContainer>,
            document.getElementById('root')
        );
    });

    module.hot.accept('./reducers/root', () =>
        store.replaceReducer(combineReducers(require('./reducers/root').default))
    );
}
