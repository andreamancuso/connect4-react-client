import {Dispatch} from "redux";
import {IGameEntity} from "../types";

export type GenericDispatch = Dispatch<IState>;

export type isLoading = boolean;
export type Error = string;

interface IListStore<T> {
    data: T[],
    isLoading: isLoading,
    error: Error,
}

interface IEntityStore<T> {
    data: T,
    isLoading: isLoading,
    error: Error,
}

export interface IGameState {
    games: IListStore<IGameEntity>,
    selectedGame: IEntityStore<IGameEntity>,
}

export interface IState {
    game: IGameState
}

export interface IGameRouteParams {
    id: string
}
