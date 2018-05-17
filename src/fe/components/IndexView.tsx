import * as React from "react";
import {Col, Row, Button, Card} from 'antd';
import {History} from "history";

export interface IndexViewProps {
    history: History,
    beginNewGame: () => Promise<string>
}

class IndexView extends React.Component<IndexViewProps, {}> {
    navigateToOnClick = (path) => () => {
        this.props.history.push(path);
    };

    newGameOnClick = () => {
        this.props.beginNewGame()
            .then((gameId: string) => this.props.history.push(`/games/${gameId}`));
    };

    render() {

        return (
            <Row gutter={16}>
                <Col span={12}>
                    <Card style={{ width: 300 }}>
                        <Button size={'large'} onClick={this.newGameOnClick}>Begin new game</Button>
                    </Card>
                </Col>

                <Col span={12}>
                    <Card style={{ width: 300 }}>
                        <Button size={'large'} onClick={this.navigateToOnClick('/games')}>Resume a game</Button>
                    </Card>
                </Col>

            </Row>
        );
    }
}

export default IndexView;
