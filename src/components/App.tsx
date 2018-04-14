import * as React from "react";
import {Layout} from 'antd';

import IndexView from "../containers/IndexView";

import './App.css';

const {Header, Footer, Content} = Layout;

export interface AppProps {

}

class App extends React.Component<AppProps, {}> {

    render() {
        return (
            <div className="App">
                <Layout>
                    <Header>
                        <h1 className="App-title">Puissance 4</h1>
                    </Header>
                    <Content style={{ padding: '20px 50px' }}>
                        <IndexView/>
                    </Content>
                    <Footer>Powered by React/Redux</Footer>
                </Layout>
            </div>
        );
    }
}

export default App;
