import {Action, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

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

export enum CoinSlot {
    Blank = 0,
    Player1 = 1,
    Player2 = 2,
}

export type PlayerCoinSlot = CoinSlot.Player1|CoinSlot.Player2;

export type Column = Array<CoinSlot>;
export type Grid = Array<Column>

export interface GridState {
    grid: Grid,
    lastPlayerCoinSlot
}

export interface GameState {
    games: Array<PlayerCoinSlot>
}

export interface State {
    game: GameState,
    grid: GridState
}
