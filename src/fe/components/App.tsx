import * as React from "react";
import {Layout} from 'antd';

import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import IndexView from "../containers/IndexView";
import GameView from "../containers/GameView";

import './App.css';

const {Header, Footer, Content} = Layout;

export interface AppProps {
    initialAction: Function
}

class App extends React.Component<AppProps, {}> {
    componentWillMount() {
        this.props.initialAction();
    }

    render() {
        return (
            <div className="App">
                <Layout>
                    <Header>
                        <h1 className="App-title">Puissance 4</h1>
                    </Header>
                    <Content style={{ padding: '20px 50px' }}>
                        <Router>
                            <React.Fragment>
                                <Route breadcrumbName="index" name="index" exact path="/" component={IndexView}/>
                                <Route breadcrumbName="game" name="game" path="/games/:id" component={GameView}/>
                            </React.Fragment>
                        </Router>
                    </Content>
                    <Footer>Powered by React/Redux</Footer>
                </Layout>
            </div>
        );
    }
}

export default App;
