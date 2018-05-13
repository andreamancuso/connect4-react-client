import {connect} from "react-redux";

import IndexView from '../components/IndexView';
import {CoinSlot, Grid, PlayerCoinSlot} from "../../types";
import {
    getAllowedColumns,
    getGridStatusSelector, getTransposedGridSelector, isGameInProgressSelector,
    nextPlayerSelector
} from "../selectors/grid";
import {beginNewGameThunk, resetScoreThunk} from "../thunks/game";
import {getNumGamesWonByPlayer1GridSelector, getNumGamesWonByPlayer2GridSelector} from "../selectors/game";
import {addMove} from "../actions/game";
import {GenericDispatch, State} from "../types";

interface StateFromProps {
    grid: Grid,
    gridStatus: CoinSlot,
    nextPlayer: PlayerCoinSlot,
    isGameInProgress: boolean,
    numGamesWonByPlayer1: number,
    numGamesWonByPlayer2: number,
    allowedColumns: number[],
}

export interface AddMove {
    (playerCoinSlot: number, columnIndex: number): void;
}

interface DispatchFromProps {
    addMove: AddMove,
    beginNewGame: Function,
    resetScore: Function
}

const mapStateToProps = (state: State): StateFromProps => ({
    grid: getTransposedGridSelector(state),
    gridStatus: getGridStatusSelector(state),
    isGameInProgress: isGameInProgressSelector(state),
    nextPlayer: nextPlayerSelector(state),
    numGamesWonByPlayer1: getNumGamesWonByPlayer1GridSelector(state),
    numGamesWonByPlayer2: getNumGamesWonByPlayer2GridSelector(state),
    allowedColumns: getAllowedColumns(state),
});

const mapDispatchToProps = (dispatch: GenericDispatch): DispatchFromProps => ({
    addMove(playerCoinSlot: PlayerCoinSlot, columnIndex: number) {
        dispatch(addMove(playerCoinSlot, columnIndex));
    },
    beginNewGame() {
        dispatch(beginNewGameThunk());
    },
    resetScore() {
        dispatch(resetScoreThunk());
    }
});

export default connect<StateFromProps, DispatchFromProps>(
    mapStateToProps,
    mapDispatchToProps
)(IndexView);
