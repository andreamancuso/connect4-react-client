import {CoinSlot, GameEntity, GameResult, PlayerCoinSlot} from "../../types";
import {State} from "../types";
import {getGridStatusSelector} from "../selectors/grid";
import {
    addMove, createGame, createGameFailure, createGameSuccess,
    fetchGame, fetchGameFailure,
    fetchGames, fetchGamesFailure, fetchGamesSuccess, fetchGameSuccess, resetMoves,
    resetScore, setResult, updateGame, updateGameFailure, updateGameSuccess
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
                dispatch(createGame());
                const response: AxiosResponse = await apiClient.post(`games`, undefined);
                const gameId = response.headers.location;

                console.log(gameId);

                dispatch(createGameSuccess());
                resolve(gameId);
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
                await apiClient.put(`games/${gameId}`, {moves});
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
