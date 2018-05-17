import {GameEntity, GameResult} from "../types";

export const getGameEntityModel = (): GameEntity => ({
    id: '',
    player1: '',
    player2: '',
    moves: [],
    date: new Date(),
    result: GameResult.InProgress
});
