import {IMove} from "../../types";
import {
    ADD_MOVE,
    CREATE_GAME,
    CREATE_GAME_FAILURE,
    CREATE_GAME_SUCCESS, DELETE_GAME, DELETE_GAME_FAILURE, DELETE_GAME_SUCCESS,
    FETCH_GAME,
    FETCH_GAME_FAILURE,
    FETCH_GAME_SUCCESS,
    FETCH_GAMES,
    FETCH_GAMES_FAILURE,
    FETCH_GAMES_SUCCESS,
    GameAction, RESET_GAME,
    RESET_MOVES,
    SET_PLAYER_NAME,
    SET_RESULT,
    UPDATE_GAME,
    UPDATE_GAME_FAILURE,
    UPDATE_GAME_SUCCESS
} from "../actions/game";
import {IGameState} from "../types";
import {getGameEntityModel} from "../../lib/models";

export const getInitialState = (): IGameState => ({
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

export const gameReducer = (state = getInitialState(), action: GameAction): IGameState => {
    switch (action.type) {
        case RESET_GAME:
            return {
                ...state,
                selectedGame: {
                    data: getGameEntityModel(),
                    isLoading: false,
                    error: ''
                }
            };

        case ADD_MOVE: {
            const newMoves: IMove[] = [...state.selectedGame.data.moves];
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

        case SET_PLAYER_NAME: {
            return {
                ...state,
                selectedGame: {
                    ...state.selectedGame,
                    data: {
                        ...state.selectedGame.data,
                        [`player${action.payload.player1or2}`]: action.payload.name
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

        case DELETE_GAME:
            return {
                ...state,
                selectedGame: {
                    ...state.selectedGame,
                    isLoading: true,
                    error: ''
                }
            };

        case DELETE_GAME_SUCCESS:
            return {
                ...state,
                selectedGame: {
                    ...state.selectedGame,
                    isLoading: false
                }
            };

        case DELETE_GAME_FAILURE:
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
