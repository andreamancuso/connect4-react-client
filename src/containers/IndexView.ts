import {connect} from "react-redux";

import IndexView from '../components/IndexView';
import {CoinSlot, GenericDispatch, Grid, PlayerCoinSlot, State} from "../types";
import {addCoin} from "../actions/grid";
import {
    getGridStatusSelector, getTransposedGridSelector, isGameInProgressSelector,
    nextPlayerSelector
} from "../selectors/grid";
import {beginNewGameThunk} from "../thunks/game";
import {getNumGamesWonByPlayer1GridSelector, getNumGamesWonByPlayer2GridSelector} from "../selectors/game";

interface StateFromProps {
    grid: Grid,
    gridStatus: CoinSlot,
    nextPlayer: PlayerCoinSlot,
    isGameInProgress: boolean,
    numGamesWonByPlayer1: number,
    numGamesWonByPlayer2: number,
}

export interface AddCoin {
    (playerCoinSlot: number, columnIndex: number): void;
}

interface DispatchFromProps {
    addCoin: AddCoin,
    beginNewGame: Function,
}



const mapStateToProps = (state: State): StateFromProps => ({
    grid: getTransposedGridSelector(state),
    gridStatus: getGridStatusSelector(state),
    isGameInProgress: isGameInProgressSelector(state),
    nextPlayer: nextPlayerSelector(state),
    numGamesWonByPlayer1: getNumGamesWonByPlayer1GridSelector(state),
    numGamesWonByPlayer2: getNumGamesWonByPlayer2GridSelector(state),
});

const mapDispatchToProps = (dispatch: GenericDispatch): DispatchFromProps => ({
    addCoin(playerCoinSlot: number, columnIndex: number) {
        dispatch(addCoin(playerCoinSlot, columnIndex));
    },
    beginNewGame() {
        dispatch(beginNewGameThunk());
    }
});

export default connect<StateFromProps, DispatchFromProps>(
    mapStateToProps,
    mapDispatchToProps
)(IndexView);
