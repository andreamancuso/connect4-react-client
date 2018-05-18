import * as React from "react";
import {Col, Row, Button, Card, Form, Input, Icon, Table, Breadcrumb} from 'antd';
import {History} from "history";
import {Link} from 'react-router-dom';
import {IDeleteGame, ISetPlayerName} from "../containers/IndexView";
import {CoinSlot, GameResult, IGameEntity, PlayerCoinSlot} from "../../types";

export interface IndexViewProps {
    history: History,
    beginNewGame: () => Promise<string>,
    player1Name: string,
    player2Name: string,
    setPlayerName: ISetPlayerName,
    games: IGameEntity[],
    gamesLoading: boolean,
    fetchGames: Function,
    deleteGame: IDeleteGame,
}

const getFormattedGameStatus = (game: IGameEntity): string => {
    switch (game.result) {
        case GameResult.InProgress: return `In progress (${game.moves.length} moves)`;
        case GameResult.Draw: return 'Draw';
        case GameResult.Player1Won: return 'Player 1 won';
        case GameResult.Player2Won: return 'Player 2 won';
        default: return `In progress (${game.moves.length} moves)`;
    }
};



class IndexView extends React.Component<IndexViewProps, {}> {
    newGameFormOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.stopPropagation();
        e.preventDefault();

        this.props.beginNewGame()
            .then((gameId: string) => this.props.history.push(`/games/${gameId}`));
    };

    onPlayerNameChanged = (player1or2: PlayerCoinSlot) => (e: React.FormEvent<HTMLInputElement>) => {
        this.props.setPlayerName(player1or2, e.currentTarget.value);
    };

    componentDidMount() {
        this.props.fetchGames();
    }

    render() {
        const {player1Name, player2Name, games, gamesLoading} = this.props;
        const newGameButtonEnabled = player1Name.length > 0 && player2Name.length > 0;

        return (
            <React.Fragment>
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb>

                <Card style={{marginTop: 20}}>
                    <Form onSubmit={this.newGameFormOnSubmit}>
                        <Row gutter={16}>
                            <Col span={9}>
                                <Form.Item>
                                    <Input
                                        prefix={<Icon type="user" />}
                                        placeholder="Player 1: enter name"
                                        value={player1Name}
                                        onChange={this.onPlayerNameChanged(CoinSlot.Player1)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item>
                                    <Input
                                        prefix={<Icon type="user" />}
                                        placeholder="Player 2: enter name"
                                        value={player2Name}
                                        onChange={this.onPlayerNameChanged(CoinSlot.Player2)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" size="large" disabled={!newGameButtonEnabled}>
                                        Begin new game
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>

                <Card style={{marginTop: 30}}>
                    <Button onClick={() => this.props.fetchGames()}>Refresh</Button>
                    <Table dataSource={games} loading={gamesLoading}>
                        <Table.Column
                            title="Player 1"
                            dataIndex="player1"
                            key="player1"
                        />
                        <Table.Column
                            title="Player 2"
                            dataIndex="player2"
                            key="player2"
                        />
                        <Table.Column
                            title="Result"
                            key="result"
                            render={(text, record: IGameEntity) => (
                                <span>{getFormattedGameStatus(record)}</span>
                            )}
                        />
                        <Table.Column
                            title="Actions"
                            key="action"
                            render={(text, record: IGameEntity) => (
                                <span>
                                    <Link to={`/games/${record.id}`}>{record.result === GameResult.InProgress ? 'Resume' : 'View'}</Link>
                                    &nbsp;-&nbsp;
                                    <a onClick={() => (this.props.deleteGame(record.id))}>Delete</a>
                                </span>
                            )}
                        />
                    </Table>
                </Card>
            </React.Fragment>
        );
    }
}


export default IndexView;
