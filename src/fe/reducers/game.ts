import {Move, PlayerCoinSlot} from "../../types";
import {ADD_MOVE, GameAction, RECORD_PLAYER_WIN, RESET_MOVES, RESET_SCORE} from "../actions/game";
import {GameState} from "../types";

export const getInitialState = (): GameState => ({
    games: [],
    moves: []
});

export const gameReducer = (state = getInitialState(), action: GameAction): GameState => {
    switch (action.type) {
        case ADD_MOVE: {
            const newMoves: Move[] = [...state.moves];
            newMoves.push(action.payload);

            return {
                ...state,
                moves: newMoves
            };
        }

        case RECORD_PLAYER_WIN: {
            const newGames: Array<PlayerCoinSlot> = [...state.games];
            newGames.push(action.payload);

            return {
                ...state,
                games: newGames
            };
        }

        case RESET_SCORE: {
            return {
                ...state,
                games: []
            };
        }

        case RESET_MOVES: {
            return {
                ...state,
                moves: []
            };
        }
    }

    return state;
};

export default gameReducer;
