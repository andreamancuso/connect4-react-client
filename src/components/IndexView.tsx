import * as React from "react";
import {Col, Avatar, Row, Button, Badge} from 'antd';
import {CoinSlot, Grid, PlayerCoinSlot} from "../types";
import {AddCoin} from "../containers/IndexView";

export interface IndexViewProps {
    grid: Grid,
    gridStatus: CoinSlot,
    isGameInProgress: boolean,
    nextPlayer: PlayerCoinSlot,
    addCoin: AddCoin,
    beginNewGame: Function,
    resetScore: Function,
    numGamesWonByPlayer1: number,
    numGamesWonByPlayer2: number,
}

class IndexView extends React.Component<IndexViewProps, {}> {
    handleColClick = (columnIndex: number) => {
        if (this.props.isGameInProgress) {
            this.props.addCoin(this.props.nextPlayer, columnIndex);
        }
    };

    handleBeginNewGameClick = () => {
        this.props.beginNewGame();
    };

    handleResetScoreClick = () => {
        this.props.resetScore();
    };

    render() {
        const {grid, nextPlayer, gridStatus, numGamesWonByPlayer1, numGamesWonByPlayer2} = this.props;

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
                                <Badge count={numGamesWonByPlayer1} showZero><Avatar className={`grid__coin--player-1`} icon="user" /></Badge> Player 1
                            </Col>
                            <Col span={6}>
                                <Badge count={numGamesWonByPlayer2} showZero><Avatar className={`grid__coin--player-2`} icon="user" /></Badge> Player 2
                            </Col>
                            <Col span={4}>
                                <Button onClick={this.handleResetScoreClick}>Reset score</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        {gridStatus === 0 ?
                            <div>Next player: <Avatar className={`grid__coin--player-${nextPlayer}`} icon="user" /> Player {nextPlayer}</div>
                            : <div>
                                <Avatar className={`grid__coin--player-${gridStatus}`} icon="user" /> Player {gridStatus} wins!
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

export default IndexView;
