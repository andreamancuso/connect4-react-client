import {IGameEntity, GameResult} from "../types";

export const getGameEntityModel = (): IGameEntity => ({
    id: '',
    player1: '',
    player2: '',
    moves: [],
    date: new Date(),
    result: GameResult.InProgress
});
