export enum CoinSlot {
    Blank = 0,
    Player1 = 1,
    Player2 = 2,
}

export type PlayerCoinSlot = CoinSlot.Player1|CoinSlot.Player2;

export type Column = CoinSlot[];
export type Grid = Column[]

export interface Move {
    player: PlayerCoinSlot,
    columnIndex: number
}

export interface Game {
    player1: string,
    player2: string,
    moves: Move[],
    date: Date,
    result: null|CoinSlot
}

export interface GameEntity extends Game {
    id: string,
}
