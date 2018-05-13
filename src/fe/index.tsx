import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { Provider } from 'react-redux';
import {combineReducers, createStore, applyMiddleware, Store, GenericStoreEnhancer, Reducer} from 'redux';

import {reducers} from './reducers/root';

const App = require('./components/App').default;

import 'antd/dist/antd.css';
import './index.less';
import {State} from "./types";

const rootReducer: Reducer<State> = combineReducers<State>(reducers);
const baseMiddlewares: GenericStoreEnhancer = applyMiddleware(thunk);
const middlewares: GenericStoreEnhancer = process.env.NODE_ENV === 'production' ? baseMiddlewares : composeWithDevTools(baseMiddlewares);
const store: Store<State> = createStore<State>(
    rootReducer,
    middlewares
);

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <App history={history}/>
        </Provider>
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default;

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
