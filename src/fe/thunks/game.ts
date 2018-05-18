import {IGameEntity, GameResult, PlayerCoinSlot} from "../../types";
import {IState} from "../types";
import {
    addMove, createGame, createGameFailure, createGameSuccess,
    fetchGame, fetchGameFailure,
    fetchGames, fetchGamesFailure, fetchGamesSuccess, fetchGameSuccess,
    setResult, updateGame, updateGameFailure, updateGameSuccess
} from "../actions/game";
import APIClient from "../../lib/api/client";
import {getSelectedGameResult} from "../selectors/game";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

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
