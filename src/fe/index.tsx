import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { Provider } from 'react-redux';
import {combineReducers, createStore, applyMiddleware, Store, GenericStoreEnhancer, Reducer} from 'redux';
import APIClient from "../lib/api/client";
import {IState} from "./types";
import {IAPIClientConf} from "../types";

import {reducers} from './reducers/root';

const App = require('./containers/App').default;
const apiConf: IAPIClientConf = require('./resources/api-client-conf.json');

import 'antd/dist/antd.css';
import './index.less';

console.log(process.env.ENDPOINTS_BASE_URL);

const endpointsBaseUrl = typeof process.env.ENDPOINTS_BASE_URL === 'string' ? process.env.ENDPOINTS_BASE_URL : '';
const apiClient = new APIClient(endpointsBaseUrl, apiConf);
const rootReducer: Reducer<IState> = combineReducers<IState>(reducers);
const baseMiddlewares: GenericStoreEnhancer = applyMiddleware(thunk.withExtraArgument(apiClient));
const middlewares: GenericStoreEnhancer = process.env.NODE_ENV === 'production' ? baseMiddlewares : composeWithDevTools(baseMiddlewares);
const store: Store<IState> = createStore<IState>(
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
