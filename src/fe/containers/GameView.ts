import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

import GameView from '../components/GameView';
import { GameResult, Grid, PlayerCoinSlot } from '../../types';
import {
  getAllowedColumns,
  getTransposedGridSelector,
  nextPlayerNameSelector,
  nextPlayerSelector,
  winnerNameSelector
} from '../selectors/game';
import { addMoveThunk, fetchGameThunk } from '../thunks/game';
import { GenericDispatch, IState, ContainerDispatchType } from '../types';
import { getSelectedGameResult } from '../selectors/game';
import { resetGame } from '../actions/game';
import { Dispatch, Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

interface IStateFromProps {
  grid: Grid;
  gameResult: GameResult;
  nextPlayer: PlayerCoinSlot;
  allowedColumns: number[];
  player1Name: string;
  player2Name: string;
  nextPlayerName: string;
  winnerName: string;
}

export interface IAddMove {
  (playerCoinSlot: number, columnIndex: number): void;
}

export interface IFetchGame {
  (gameId: string): Promise<void>;
}

interface IDispatchFromProps {
  addMove: IAddMove;
  fetchGame: IFetchGame;
  resetGame: Function;
}

const mapStateToProps: MapStateToProps<IStateFromProps, {}, IState> = (state): IStateFromProps => ({
  grid: getTransposedGridSelector(state),
  gameResult: getSelectedGameResult(state),
  nextPlayer: nextPlayerSelector(state),
  nextPlayerName: nextPlayerNameSelector(state),
  allowedColumns: getAllowedColumns(state),
  player1Name: state.game.selectedGame.data.player1,
  player2Name: state.game.selectedGame.data.player2,
  winnerName: winnerNameSelector(state)
});

const mapDispatchToProps: MapDispatchToProps<IDispatchFromProps, {}> = (
  dispatch: ContainerDispatchType
): IDispatchFromProps => ({
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
