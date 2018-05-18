import {Dispatch} from "redux";
import {GameEntity} from "../types";

export type GenericDispatch = Dispatch<State>;

export type isLoading = boolean;
export type Error = string;

export interface ListStore<T> {
    data: T[],
    isLoading: isLoading,
    error: Error,
}

export interface EntityStore<T> {
    data: T,
    isLoading: isLoading,
    error: Error,
}

export interface GameState {
    games: ListStore<GameEntity>,
    selectedGame: EntityStore<GameEntity>,
}

export interface State {
    game: GameState
}

export interface IGameRouteParams {
    id: string
}
