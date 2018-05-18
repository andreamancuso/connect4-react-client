import {connect} from "react-redux";

import GameView from '../components/GameView';
import {GameResult, Grid, PlayerCoinSlot} from "../../types";
import {
    getAllowedColumns,
    getTransposedGridSelector,
    isGameInProgressSelector,
    nextPlayerNameSelector,
    nextPlayerSelector,
    winnerNameSelector
} from "../selectors/game";
import {
    addMoveThunk,
    fetchGameThunk,
} from "../thunks/game";
import {GenericDispatch, IState} from "../types";
import {getSelectedGameResult} from "../selectors/game";
import {resetGame} from "../actions/game";

interface IStateFromProps {
    grid: Grid,
    gameResult: GameResult,
    nextPlayer: PlayerCoinSlot,
    isGameInProgress: boolean,
    allowedColumns: number[],
    player1Name: string,
    player2Name: string,
    nextPlayerName: string,
    winnerName: string
}

export interface IAddMove {
    (playerCoinSlot: number, columnIndex: number): void;
}

export interface IFetchGame {
    (gameId: string): Promise<void>;
}

interface IDispatchFromProps {
    addMove: IAddMove,
    fetchGame: IFetchGame,
    resetGame: Function,
}

const mapStateToProps = (state: IState): IStateFromProps => ({
    grid: getTransposedGridSelector(state),
    gameResult: getSelectedGameResult(state),
    isGameInProgress: isGameInProgressSelector(state),
    nextPlayer: nextPlayerSelector(state),
    nextPlayerName: nextPlayerNameSelector(state),
    allowedColumns: getAllowedColumns(state),
    player1Name: state.game.selectedGame.data.player1,
    player2Name: state.game.selectedGame.data.player2,
    winnerName: winnerNameSelector(state)
});

const mapDispatchToProps = (dispatch: GenericDispatch): IDispatchFromProps => ({
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

export default connect<IStateFromProps, IDispatchFromProps>(
    mapStateToProps,
    mapDispatchToProps
)(GameView);
