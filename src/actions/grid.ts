import {AddCoinCoordinates} from "../types";

export const ADD_COIN = 'ADD_COIN';
export type ADD_COIN = typeof ADD_COIN;

export const RESET_GRID = 'RESET_GRID';
export type RESET_GRID = typeof RESET_GRID;

export interface AddCoin {
    type: ADD_COIN;
    payload: AddCoinCoordinates;
}

export interface Reset {
    type: RESET_GRID;
}

export type GridAction = AddCoin | Reset;

export function addCoin(playerCoinSlot: number, columnIndex: number): AddCoin {
    return {
        type: ADD_COIN, payload: {playerCoinSlot, columnIndex}
    };
}

export function resetGrid(): Reset {
    return {
        type: RESET_GRID
    };
}
