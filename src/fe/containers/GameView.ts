import {connect} from "react-redux";

import GameView from '../components/GameView';
import {GameResult, Grid, PlayerCoinSlot} from "../../types";
import {
    getAllowedColumns,
    getTransposedGridSelector,
    isGameInProgressSelector, nextPlayerNameSelector,
    nextPlayerSelector
} from "../selectors/game";
import {
    addMoveThunk,
    fetchGameThunk,
} from "../thunks/game";
import {GenericDispatch, State} from "../types";
import {getSelectedGameResult} from "../selectors/game";
import {resetGame} from "../actions/game";

interface StateFromProps {
    grid: Grid,
    gameResult: GameResult,
    nextPlayer: PlayerCoinSlot,
    isGameInProgress: boolean,
    allowedColumns: number[],
    player1Name: string,
    player2Name: string,
    nextPlayerName: string
}

export interface IAddMove {
    (playerCoinSlot: number, columnIndex: number): void;
}

export interface IFetchGame {
    (gameId: string): Promise<void>;
}

interface DispatchFromProps {
    addMove: IAddMove,
    fetchGame: IFetchGame,
    resetGame: Function,
}

const mapStateToProps = (state: State): StateFromProps => ({
    grid: getTransposedGridSelector(state),
    gameResult: getSelectedGameResult(state),
    isGameInProgress: isGameInProgressSelector(state),
    nextPlayer: nextPlayerSelector(state),
    nextPlayerName: nextPlayerNameSelector(state),
    allowedColumns: getAllowedColumns(state),
    player1Name: state.game.selectedGame.data.player1,
    player2Name: state.game.selectedGame.data.player2,
});

const mapDispatchToProps = (dispatch: GenericDispatch): DispatchFromProps => ({
    addMove(playerCoinSlot: PlayerCoinSlot, columnIndex: number) {
        dispatch(addMoveThunk(playerCoinSlot, columnIndex));
    },
    fetchGame(gameId: string): Promise<void> {
        return dispatch(fetchGameThunk(gameId));
    },
    resetGame(): void {
        dispatch(resetGame());
    }
});

export default connect<StateFromProps, DispatchFromProps>(
    mapStateToProps,
    mapDispatchToProps
)(GameView);
