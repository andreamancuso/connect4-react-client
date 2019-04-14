import { Dispatch, Action } from 'redux';
import { IGameEntity } from '../types';
import { GameAction } from './actions/game';
import APIClient from 'src/lib/api/client';
import { ThunkDispatch } from 'redux-thunk';

export type GenericDispatch = Dispatch<GameAction>;

export type isLoading = boolean;
export type Error = string;

interface IListStore<T> {
  data: T[];
  isLoading: isLoading;
  error: Error;
}

interface IEntityStore<T> {
  data: T;
  isLoading: isLoading;
  error: Error;
}

export interface IGameState {
  games: IListStore<IGameEntity>;
  selectedGame: IEntityStore<IGameEntity>;
}

export interface IState {
  game: IGameState;
}

export interface IGameRouteParams {
  id: string;
}

export interface IExtraThunkArgs {
  apiClient: APIClient;
}

export type ContainerDispatchType = Dispatch<Action> & ThunkDispatch<IState, any, Action>;
