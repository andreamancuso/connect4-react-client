import {PlayerCoinSlot} from "../types";

export const RECORD_PLAYER_WIN = 'RECORD_PLAYER_WIN';
export type RECORD_PLAYER_WIN = typeof RECORD_PLAYER_WIN;

export const RESET_SCORE = 'RESET_SCORE';
export type RESET_SCORE = typeof RESET_SCORE;

export interface RecordPlayerWin {
    type: RECORD_PLAYER_WIN;
    payload: PlayerCoinSlot;
}

export interface ResetScore {
    type: RESET_SCORE;
}

export type GameAction = RecordPlayerWin | ResetScore;

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
