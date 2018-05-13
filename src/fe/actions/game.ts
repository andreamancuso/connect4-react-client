import {Move, PlayerCoinSlot} from "../../types";

export const ADD_MOVE = 'ADD_MOVE';
export type ADD_MOVE = typeof ADD_MOVE;

export const RECORD_PLAYER_WIN = 'RECORD_PLAYER_WIN';
export type RECORD_PLAYER_WIN = typeof RECORD_PLAYER_WIN;

export const RESET_SCORE = 'RESET_SCORE';
export type RESET_SCORE = typeof RESET_SCORE;

export const RESET_MOVES = 'RESET_MOVES';
export type RESET_MOVES = typeof RESET_MOVES;

export interface AddMove {
    type: ADD_MOVE;
    payload: Move;
}

export interface RecordPlayerWin {
    type: RECORD_PLAYER_WIN;
    payload: PlayerCoinSlot;
}

export interface ResetScore {
    type: RESET_SCORE;
}

export interface ResetMoves {
    type: RESET_MOVES;
}

export type GameAction = RecordPlayerWin | ResetScore | AddMove | ResetMoves;

export function addMove(playerCoinSlot: PlayerCoinSlot, columnIndex: number): AddMove {
    return {
        type: ADD_MOVE, payload: {player: playerCoinSlot, columnIndex}
    };
}

export function recordPlayerWin(playerCoinSlot: PlayerCoinSlot): RecordPlayerWin {
    return {
        type: RECORD_PLAYER_WIN, payload: playerCoinSlot
    };
}

export function resetScore(): ResetScore {
    return {
        type: RESET_SCORE
    };
}

export function resetMoves(): ResetMoves {
    return {
        type: RESET_MOVES
    };
}
