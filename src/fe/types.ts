import {Action, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {Move, PlayerCoinSlot} from "../types";

export type GenericThunkAction = ThunkAction<void, State, any>;

export interface GenericDispatch {
    <R>(asyncAction: (dispatch: Dispatch<GenericThunkAction>, getState: () => State, extra: any) => R): R;
    <R>(asyncAction: (dispatch: Dispatch<GenericThunkAction>, getState: () => State) => R): R;
    <R>(asyncAction: (dispatch: Dispatch<GenericThunkAction>) => R): R;
    (action: Action): void;
}

export interface AddCoinCoordinates {
    playerCoinSlot: number,
    columnIndex: number
}

export interface GameState {
    games: PlayerCoinSlot[],
    moves: Move[],
}

export interface State {
    game: GameState
}
