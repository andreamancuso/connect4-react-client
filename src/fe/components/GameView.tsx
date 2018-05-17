import * as React from "react";
import {Col, Avatar, Row, Button, Badge} from 'antd';
import {CoinSlot, GameResult, Grid, PlayerCoinSlot} from "../../types";
import {AddMove} from "../containers/GameView";
import {History} from "history";

export interface GameViewProps {
    grid: Grid,
    gameResult: GameResult,
    isGameInProgress: boolean,
    nextPlayer: PlayerCoinSlot,
    addMove: AddMove,
    beginNewGame: Function,
    allowedColumns: number[],
    history: History
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

    handleBeginNewGameClick = () => {
        this.props.beginNewGame()
            .then((gameId: string) => this.props.history.push(`/games/${gameId}`));
    };

    render() {
        const {grid, nextPlayer, gameResult} = this.props;

        return (
            <div style={{position: 'relative' }}>
                <Row gutter={16}>
                    <Col span={12}>
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
                            <Col span={4}>
                                <h3>Score</h3>
                            </Col>
                            <Col span={6}>
                                <Avatar className={`grid__coin--player-1`} icon="user" /> Player 1
                            </Col>
                            <Col span={6}>
                                <Avatar className={`grid__coin--player-2`} icon="user" /> Player 2
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        {gameResult === GameResult.InProgress ?
                            <div>Next player: <Avatar className={`grid__coin--player-${nextPlayer}`} icon="user" /> Player {nextPlayer}</div>
                            : <div>
                                <Avatar className={`grid__coin--player-${gameResult}`} icon="user" /> Player {gameResult} wins!
                                &nbsp;
                                <Button onClick={this.handleBeginNewGameClick}>Begin new game</Button>
                            </div>
                        }

                    </Col>
                </Row>
            </div>
        );
    }
}

export default GameView;
