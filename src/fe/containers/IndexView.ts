import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

import IndexView from '../components/IndexView';

import { IState, ContainerDispatchType } from '../types';
import {
  createGameThunk,
  deleteGameAndRefreshGameListThunk,
  fetchGamesThunk
} from '../thunks/game';
import { setPlayerName } from '../actions/game';
import { IGameEntity, PlayerCoinSlot } from '../../types';

export interface ISetPlayerName {
  (player1or2: PlayerCoinSlot, name: string): void;
}

export interface IDeleteGame {
  (gameId: string): void;
}

interface IStateFromProps {
  player1Name: string;
  player2Name: string;
  games: IGameEntity[];
  gamesLoading: boolean;
}

interface IDispatchFromProps {
  beginNewGame: () => Promise<string>;
  setPlayerName: Function;
  fetchGames: Function;
  deleteGame: IDeleteGame;
}

const mapStateToProps: MapStateToProps<IStateFromProps, {}, IState> = (state): IStateFromProps => ({
  player1Name: state.game.selectedGame.data.player1,
  player2Name: state.game.selectedGame.data.player2,
  games: state.game.games.data,
  gamesLoading: state.game.games.isLoading
});

const mapDispatchToProps: MapDispatchToProps<IDispatchFromProps, {}> = (
  dispatch: ContainerDispatchType
): IDispatchFromProps => ({
  beginNewGame(): Promise<string> {
    return dispatch(createGameThunk());
  },
  setPlayerName(player1or2: PlayerCoinSlot, name: string): void {
    dispatch(setPlayerName(player1or2, name));
  },
  fetchGames(): void {
    dispatch(fetchGamesThunk());
  },
  deleteGame(gameId: string): void {
    dispatch(deleteGameAndRefreshGameListThunk(gameId));
  }
});

export default connect<IStateFromProps, IDispatchFromProps>(
  mapStateToProps,
  mapDispatchToProps
)(IndexView);
