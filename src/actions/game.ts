import {PlayerCoinSlot} from "../types";

export const RECORD_PLAYER_WIN = 'RECORD_PLAYER_WIN';
export type RECORD_PLAYER_WIN = typeof RECORD_PLAYER_WIN;

export interface RecordPlayerWin {
    type: RECORD_PLAYER_WIN;
    payload: PlayerCoinSlot;
}

export type GameAction = RecordPlayerWin;

export function recordPlayerWin(playerCoinSlot: PlayerCoinSlot): RecordPlayerWin {
    return {
        type: RECORD_PLAYER_WIN, payload: playerCoinSlot
    };
}
