import {GameState, PlayerCoinSlot} from "../types";
import {GameAction, RECORD_PLAYER_WIN} from "../actions/game";

export const getInitialState = (): GameState => ({
    games: []
});

export const gameReducer = (state = getInitialState(), action: GameAction): GameState => {
    switch (action.type) {
        case RECORD_PLAYER_WIN: {
            const newGames: Array<PlayerCoinSlot> = [...state.games];
            newGames.push(action.payload);

            return {
                ...state,
                games: newGames
            };
        }
    }

    return state;
};

export default gameReducer;
