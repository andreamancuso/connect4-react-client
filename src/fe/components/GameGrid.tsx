import * as React from "react";
import {Avatar, Col, Row} from 'antd';
import {Grid} from "../../types";

export interface GridProps {
    grid: Grid,
    colClick: Function
}

class GameGrid extends React.Component<GridProps, {}> {
    render() {
        const {grid} = this.props;

        return (
            <div className="grid" style={{marginBottom: 30}}>
            {
                grid.map((column, columnIndex) => (
                    <Row key={columnIndex} type="flex" justify="center">
                        {
                            column.map((slot, slotIndex) => (
                            <Col
                                key={slotIndex}
                                span={3}
                                onClick={() => this.props.colClick(slotIndex)}
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
        );
    }
}

export default GameGrid;
