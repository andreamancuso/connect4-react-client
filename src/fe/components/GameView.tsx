import * as React from "react";
import {Col, Avatar, Row, Button, Breadcrumb} from 'antd';
import {GameResult, Grid, PlayerCoinSlot} from "../../types";
import {IAddMove, IFetchGame} from "../containers/GameView";
import {History} from "history";
import {match} from "react-router";
import {Link} from "react-router-dom";
import {IGameRouteParams} from "../types";

export interface GameViewProps {
    grid: Grid,
    gameResult: GameResult,
    isGameInProgress: boolean,
    nextPlayer: PlayerCoinSlot,
    nextPlayerName: string,
    addMove: IAddMove,
    fetchGame: IFetchGame,
    resetGame: Function,
    allowedColumns: number[],
    history: History,
    match: match<IGameRouteParams>,
    player1Name: string,
    player2Name: string,
    winnerName: string,
    routes: any,
    params: any
}

class GameView extends React.Component<GameViewProps, {}> {
    handleColClick = (columnIndex: number) => {
        if (!this.props.isGameInProgress) {
            console.log('game over');
        } else if (this.props.allowedColumns.indexOf(columnIndex) === -1) {
            console.log('column is full');
        } else {
            this.props.addMove(this.props.nextPlayer, columnIndex);
        }
    };

    handleFinishGameClick = () => {
        this.props.resetGame();
        this.props.history.push(`/`);
    };

    componentDidMount() {
        const gameId = this.props.match.params.id;
        if (!gameId) {
            // todo: redirect to index?
        }

        this.props.fetchGame(gameId);
    }

    render() {
        const {grid, nextPlayer, gameResult, player1Name,
            player2Name, nextPlayerName, winnerName} = this.props;

        return (
            <div style={{position: 'relative' }}>
                <Breadcrumb>
                    <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Game</Breadcrumb.Item>
                </Breadcrumb>

                <Row gutter={16} style={{marginTop: 20}}>
                    <Col span={18}>
                        <div className="grid" style={{marginBottom: 30}}>
                        {
                            grid.map((column, columnIndex) => (
                                <Row key={columnIndex} type="flex" justify="center">
                                    {
                                        column.map((slot, slotIndex) => (
                                        <Col
                                            key={slotIndex}
                                            span={3}
                                            onClick={() => this.handleColClick(slotIndex)}
                                            className="grid__cell"
                                        >
                                            <Avatar className={`grid__coin--player-${slot}`} size="large"/>
                                        </Col>
                                        ))
                                    }
                                </Row>
                            ))
                        }
                        </div>

                        <Row gutter={16} type="flex" justify="center">
                            <Col span={6} offset={4}>
                                <Avatar className={`grid__coin--player-1`} icon="user" /> {player1Name}
                            </Col>
                            <Col span={6}>
                                <Avatar className={`grid__coin--player-2`} icon="user" /> {player2Name}
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        {gameResult === GameResult.InProgress ?
                            <div>Next player: <Avatar className={`grid__coin--player-${nextPlayer}`} icon="user" /> {nextPlayerName}</div>
                            : <React.Fragment>
                                <div style={{marginBottom: 10}}>
                                    <Avatar className={`grid__coin--player-${gameResult}`} icon="user" /> {winnerName} wins!
                                </div>
                                <Button onClick={this.handleFinishGameClick}>Back to main page</Button>
                            </React.Fragment>
                        }

                    </Col>
                </Row>
            </div>
        );
    }
}

export default GameView;
