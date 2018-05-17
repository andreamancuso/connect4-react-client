import {connect} from "react-redux";

import GameView from '../components/GameView';
import {GameResult, Grid, PlayerCoinSlot} from "../../types";
import {
    getAllowedColumns,
    getTransposedGridSelector,
    isGameInProgressSelector,
    nextPlayerSelector
} from "../selectors/grid";
import {
    addMoveThunk,
    createGameThunk,
} from "../thunks/game";
import {GenericDispatch, State} from "../types";
import {getSelectedGameResult} from "../selectors/game";

interface StateFromProps {
    grid: Grid,
    gameResult: GameResult,
    nextPlayer: PlayerCoinSlot,
    isGameInProgress: boolean,
    allowedColumns: number[],
}

export interface AddMove {
    (playerCoinSlot: number, columnIndex: number): void;
}

interface DispatchFromProps {
    addMove: AddMove,
    beginNewGame: Function,
}

const mapStateToProps = (state: State): StateFromProps => ({
    grid: getTransposedGridSelector(state),
    gameResult: getSelectedGameResult(state),
    isGameInProgress: isGameInProgressSelector(state),
    nextPlayer: nextPlayerSelector(state),
    allowedColumns: getAllowedColumns(state),
});

const mapDispatchToProps = (dispatch: GenericDispatch): DispatchFromProps => ({
    addMove(playerCoinSlot: PlayerCoinSlot, columnIndex: number) {
        dispatch(addMoveThunk(playerCoinSlot, columnIndex));
    },
    beginNewGame(): Promise<string> {
        return dispatch(createGameThunk());
    }
});

export default connect<StateFromProps, DispatchFromProps>(
    mapStateToProps,
    mapDispatchToProps
)(GameView);
