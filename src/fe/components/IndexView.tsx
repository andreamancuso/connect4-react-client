import * as React from "react";
import {Col, Row, Button, Card, Form, Input, Icon} from 'antd';
import {History} from "history";
import {ISetPlayerName} from "../containers/IndexView";
import {CoinSlot, PlayerCoinSlot} from "../../types";

export interface IndexViewProps {
    history: History,
    beginNewGame: () => Promise<string>,
    player1Name: string,
    player2Name: string,
    setPlayerName: ISetPlayerName
}

class IndexView extends React.Component<IndexViewProps, {}> {
    navigateToOnClick = (path) => () => {
        this.props.history.push(path);
    };

    newGameFormOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.stopPropagation();
        e.preventDefault();

        this.props.beginNewGame()
            .then((gameId: string) => this.props.history.push(`/games/${gameId}`));
    };

    onPlayerNameChanged = (player1or2: PlayerCoinSlot) => (e: React.FormEvent<HTMLInputElement>) => {
        this.props.setPlayerName(player1or2, e.currentTarget.value);
    };

    render() {
        const {player1Name, player2Name} = this.props;
        const newGameButtonEnabled = player1Name.length > 0 && player2Name.length > 0;

        return (
            <Row gutter={16}>
                <Col span={12}>
                    <Card>
                        <Form onSubmit={this.newGameFormOnSubmit}>
                            <Form.Item>
                                <Input
                                    prefix={<Icon type="user" />}
                                    placeholder="Player 1: enter name"
                                    value={player1Name}
                                    onChange={this.onPlayerNameChanged(CoinSlot.Player1)}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    prefix={<Icon type="user" />}
                                    placeholder="Player 2: enter name"
                                    value={player2Name}
                                    onChange={this.onPlayerNameChanged(CoinSlot.Player2)}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" size="large" disabled={!newGameButtonEnabled}>
                                    Begin new game
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>

                <Col span={12}>
                    <Card>
                        <Button size={'large'} onClick={this.navigateToOnClick('/games')}>Resume a game</Button>
                    </Card>
                </Col>

            </Row>
        );
    }
}

export default IndexView;
