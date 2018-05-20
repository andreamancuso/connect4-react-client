import {IGameEntity, GameResult, PlayerCoinSlot} from "../../types";
import {IState} from "../types";
import {
    addMove,
    createGame,
    createGameFailure,
    createGameSuccess,
    deleteGame,
    deleteGameFailure,
    deleteGameSuccess,
    fetchGame,
    fetchGameFailure,
    fetchGames,
    fetchGamesFailure,
    fetchGamesSuccess,
    fetchGameSuccess,
    setResult,
    updateGame,
    updateGameFailure,
    updateGameSuccess
} from "../actions/game";
import APIClient from "../../lib/api/client";
import {getSelectedGameResult} from "../selectors/game";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

/**
 * Very first thunk triggered by first render of the application, triggers the fetch games thunk.
 *
 * @returns {ThunkAction<Promise<void>, IState, APIClient>}
 */
export const initialActionThunk = (): ThunkAction<Promise<void>, IState, APIClient> =>
    (dispatch: Dispatch<IState>, getState: () => IState, apiClient: APIClient): Promise<void> => {
        return new Promise(async(resolve, reject) => {
            try {
                await dispatch(fetchGamesThunk());
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    };

/**
 * It fetches all games' data by triggering an HTTP request.
 *
 * @returns {ThunkAction<Promise<void>, IState, APIClient>}
 */
export const fetchGamesThunk = (): ThunkAction<Promise<void>, IState, APIClient> =>
    (dispatch: Dispatch<IState>, getState: () => IState, apiClient: APIClient): Promise<void> => {
        return new Promise(async(resolve, reject) => {
            try {
                dispatch(fetchGames());
                const games: IGameEntity[] = await apiClient.get<IGameEntity[]>('games');
                dispatch(fetchGamesSuccess(games));
                resolve();
            } catch (error) {
                dispatch(fetchGamesFailure(String(error)));
                reject(error);
            }
        })
    };

/**
 * It fetches game data based on the received game ID, by triggering an HTTP request.
 *
 * @param {string} gameId
 * @returns {ThunkAction<Promise<void>, IState, APIClient>}
 */
export const fetchGameThunk = (gameId: string): ThunkAction<Promise<void>, IState, APIClient> =>
    (dispatch: Dispatch<IState>, getState: () => IState, apiClient: APIClient): Promise<void> => {
        return new Promise(async(resolve, reject) => {
            try {
                dispatch(fetchGame());
                const game: IGameEntity = await apiClient.get<IGameEntity>(`games/${gameId}`);
                dispatch(fetchGameSuccess(game));
                resolve();
            } catch (error) {
                dispatch(fetchGameFailure(String(error)));
                reject(error);
            }
        })
    };

/**
 * Creates a game by triggering an HTTP request. The game ID, generated and returned by the server,
 * is exposed through the Promise.
 *
 * @returns {ThunkAction<Promise<string>, IState, APIClient>}
 */
export const createGameThunk = (): ThunkAction<Promise<string>, IState, APIClient> =>
    (dispatch: Dispatch<IState>, getState: () => IState, apiClient: APIClient): Promise<string> => {
        return new Promise(async(resolve, reject) => {
            try {
                const state: IState = getState();
                const {player1, player2} = state.game.selectedGame.data;

                dispatch(createGame());
                const game: IGameEntity = await apiClient.post<IGameEntity>(`games`, {
                    player1, player2
                });

                dispatch(createGameSuccess());
                resolve(game.id);
            } catch (error) {
                dispatch(createGameFailure(String(error)));
                reject(error);
            }
        })
    };

/**
 * Updates a game by triggering an HTTP request.
 *
 * @returns {ThunkAction<Promise<void>, IState, APIClient>}
 */
export const updateGameThunk = (): ThunkAction<Promise<void>, IState, APIClient> =>
    (dispatch: Dispatch<IState>, getState: () => IState, apiClient: APIClient): Promise<void> => {
        return new Promise(async(resolve, reject) => {
            try {
                const state: IState = getState();
                const {id: gameId, moves, result} = state.game.selectedGame.data;

                dispatch(updateGame());
                await apiClient.put(`games/${gameId}`, {moves, result});
                dispatch(updateGameSuccess());
                resolve();
            } catch (error) {
                dispatch(updateGameFailure(String(error)));
                reject(error);
            }
        })
    };

/**
 * Deletes a game by triggering an HTTP request.
 *
 * @param {string} gameId
 * @returns {ThunkAction<Promise<void>, IState, APIClient>}
 */
export const deleteGameThunk = (gameId: string): ThunkAction<Promise<void>, IState, APIClient> =>
    (dispatch: Dispatch<IState>, getState: () => IState, apiClient: APIClient): Promise<void> => {
        return new Promise(async(resolve, reject) => {
            try {
                dispatch(deleteGame());
                await apiClient.delete(`games/${gameId}`);
                dispatch(deleteGameSuccess());
                resolve();
            } catch (error) {
                dispatch(deleteGameFailure(String(error)));
                reject(error);
            }
        })
    };

/**
 * Triggers the delete game thunk, then triggers a refresh of the games list.
 *
 * @param {string} gameId
 * @returns {ThunkAction<Promise<void>, IState, APIClient>}
 */
export const deleteGameAndRefreshGameListThunk = (gameId: string): ThunkAction<Promise<void>, IState, APIClient> =>
    (dispatch: Dispatch<IState>, getState: () => IState, apiClient: APIClient): Promise<void> => {
        return new Promise(async(resolve, reject) => {
            try {
                await dispatch(deleteGameThunk(gameId));
                await dispatch(fetchGamesThunk());
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    };

/**
 * Adds a move then queries the grid to establish whether the game is ended, in which case
 * the result is updated. Finally, it triggers the update game thunk.
 *
 * @param {PlayerCoinSlot} playerCoinSlot
 * @param {number} columnIndex
 * @returns {ThunkAction<void, IState, APIClient>}
 */
export const addMoveThunk = (playerCoinSlot: PlayerCoinSlot, columnIndex: number): ThunkAction<void, IState, APIClient> =>
    (dispatch: Dispatch<IState>, getState: () => IState, apiClient: APIClient): void => {
        dispatch(addMove(playerCoinSlot, columnIndex));

        const state: IState = getState();
        const gameResult: GameResult = getSelectedGameResult(state);

        if (gameResult !== GameResult.InProgress) {
            dispatch(setResult(gameResult));
        }

        dispatch(updateGameThunk()); // todo: handle failure
    };
