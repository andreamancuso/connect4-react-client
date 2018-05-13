import {CoinSlot, Move} from "../types";

export interface FirebaseConfig {
    readonly apiKey: string,
    readonly projectId: string,
    readonly authDomain: string
}

export interface CreateGameDto {
    readonly player1: string,
    readonly player2: string
}

export interface UpdateGameDto {
    readonly moves: Move[],
    readonly result: CoinSlot
}
