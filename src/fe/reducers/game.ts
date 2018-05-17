import {Move, PlayerCoinSlot} from "../../types";
import {
    ADD_MOVE, CREATE_GAME, CREATE_GAME_FAILURE, CREATE_GAME_SUCCESS, FETCH_GAME, FETCH_GAME_FAILURE, FETCH_GAME_SUCCESS,
    FETCH_GAMES,
    FETCH_GAMES_FAILURE,
    FETCH_GAMES_SUCCESS,
    GameAction,
    RECORD_PLAYER_WIN,
    RESET_MOVES,
    RESET_SCORE, SET_RESULT, UPDATE_GAME, UPDATE_GAME_FAILURE, UPDATE_GAME_SUCCESS
} from "../actions/game";
import {GameState} from "../types";
import {getGameEntityModel} from "../../lib/models";

export const getInitialState = (): GameState => ({
    games: {
        isLoading: false,
        data: [],
        error: ''
    },
    selectedGame: {
        data: getGameEntityModel(),
        isLoading: false,
        error: ''
    }
});

export const gameReducer = (state = getInitialState(), action: GameAction): GameState => {
    switch (action.type) {
        case ADD_MOVE: {
            const newMoves: Move[] = [...state.selectedGame.data.moves];
            newMoves.push(action.payload);

            return {
                ...state,
                selectedGame: {
                    ...state.selectedGame,
                    data: {
                        ...state.selectedGame.data,
                        moves: newMoves
                    }
                }
            };
        }

        case SET_RESULT: {
            return {
                ...state,
                selectedGame: {
                    ...state.selectedGame,
                    data: {
                        ...state.selectedGame.data,
                        result: action.payload
                    }
                }
            };
        }

        case RESET_MOVES: {
            return {
                ...state,
                selectedGame: {
                    ...state.selectedGame,
                    data: {
                        ...state.selectedGame.data,
                        moves: []
                    }
                }
            };
        }

        case FETCH_GAME:
            return {
                ...state,
                selectedGame: {
                    ...state.selectedGame,
                    isLoading: true,
                    error: ''
                }
            };

        case FETCH_GAME_SUCCESS:
            return {
                ...state,
                selectedGame: {
                    ...state.selectedGame,
                    isLoading: false,
                    data: action.payload
                }
            };

        case FETCH_GAME_FAILURE:
            return {
                ...state,
                selectedGame: {
                    ...state.selectedGame,
                    isLoading: false,
                    error: action.payload
                }
            };

        case CREATE_GAME:
            return {
                ...state,
                selectedGame: {
                    data: getGameEntityModel(),
                    isLoading: true,
                    error: ''
                }
            };

        case CREATE_GAME_SUCCESS:
            return {
                ...state,
                selectedGame: {
                    ...state.selectedGame,
                    isLoading: false
                }
            };

        case CREATE_GAME_FAILURE:
            return {
                ...state,
                selectedGame: {
                    ...state.selectedGame,
                    isLoading: false,
                    error: action.payload
                }
            };

        case UPDATE_GAME:
            return {
                ...state,
                selectedGame: {
                    ...state.selectedGame,
                    isLoading: true,
                    error: ''
                }
            };

        case UPDATE_GAME_SUCCESS:
            return {
                ...state,
                selectedGame: {
                    ...state.selectedGame,
                    isLoading: false
                }
            };

        case UPDATE_GAME_FAILURE:
            return {
                ...state,
                selectedGame: {
                    ...state.selectedGame,
                    isLoading: false,
                    error: action.payload
                }
            };

        case FETCH_GAMES:
            return {
                ...state,
                games: {
                    ...state.games,
                    isLoading: true,
                    error: ''
                }
            };

        case FETCH_GAMES_SUCCESS:
            return {
                ...state,
                games: {
                    ...state.games,
                    isLoading: false,
                    data: action.payload
                }
            };

        case FETCH_GAMES_FAILURE:
            return {
                ...state,
                games: {
                    ...state.games,
                    isLoading: false,
                    error: action.payload
                }
            };
    }

    return state;
};

export default gameReducer;
