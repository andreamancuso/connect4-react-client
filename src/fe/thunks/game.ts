import {GameEntity, GameResult, PlayerCoinSlot} from "../../types";
import {State} from "../types";
import {
    addMove, createGame, createGameFailure, createGameSuccess,
    fetchGame, fetchGameFailure,
    fetchGames, fetchGamesFailure, fetchGamesSuccess, fetchGameSuccess, resetMoves,
    setResult, updateGame, updateGameFailure, updateGameSuccess
} from "../actions/game";
import APIClient from "../../lib/api/client";
import {getSelectedGameResult} from "../selectors/game";
import {AxiosResponse} from "@nestjs/common/http/interfaces/axios.interfaces";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

export const initialActionThunk = (): ThunkAction<Promise<void>, State, APIClient> =>
    (dispatch: Dispatch<State>, getState: () => State, apiClient: APIClient): Promise<void> => {
        return new Promise(async(resolve, reject) => {
            try {
                await dispatch(fetchGamesThunk());
                resolve();
            } catch (error) {
                reject(error);
            }
        })
    };

export const fetchGamesThunk = (): ThunkAction<Promise<void>, State, APIClient> =>
    (dispatch: Dispatch<State>, getState: () => State, apiClient: APIClient): Promise<void> => {
        return new Promise(async(resolve, reject) => {
            try {
                dispatch(fetchGames());
                const games: GameEntity[] = await apiClient.get<GameEntity[]>('games');
                dispatch(fetchGamesSuccess(games));
                resolve();
            } catch (error) {
                dispatch(fetchGamesFailure(String(error)));
                reject(error);
            }
        })
    };

export const fetchGameThunk = (gameId: string): ThunkAction<Promise<void>, State, APIClient> =>
    (dispatch: Dispatch<State>, getState: () => State, apiClient: APIClient): Promise<void> => {
        return new Promise(async(resolve, reject) => {
            try {
                dispatch(fetchGame());
                const game: GameEntity = await apiClient.get<GameEntity>(`games/${gameId}`);
                dispatch(fetchGameSuccess(game));
                resolve();
            } catch (error) {
                dispatch(fetchGameFailure(String(error)));
                reject(error);
            }
        })
    };

export const createGameThunk = (): ThunkAction<Promise<string>, State, APIClient> =>
    (dispatch: Dispatch<State>, getState: () => State, apiClient: APIClient): Promise<string> => {
        return new Promise(async(resolve, reject) => {
            try {
                const state: State = getState();
                const {player1, player2} = state.game.selectedGame.data;

                dispatch(createGame());
                const game: GameEntity = await apiClient.post<GameEntity>(`games`, {
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

export const updateGameThunk = (): ThunkAction<Promise<void>, State, APIClient> =>
    (dispatch: Dispatch<State>, getState: () => State, apiClient: APIClient): Promise<void> => {
        return new Promise(async(resolve, reject) => {
            try {
                const state: State = getState();
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

export const addMoveThunk = (playerCoinSlot: PlayerCoinSlot, columnIndex: number): ThunkAction<void, State, APIClient> =>
    (dispatch: Dispatch<State>, getState: () => State, apiClient: APIClient): void => {
        dispatch(addMove(playerCoinSlot, columnIndex));

        const state: State = getState();
        const gameResult: GameResult = getSelectedGameResult(state);

        if (gameResult !== GameResult.InProgress) {
            dispatch(setResult(gameResult));
        }

        dispatch(updateGameThunk()); // todo: handle failure
    };
