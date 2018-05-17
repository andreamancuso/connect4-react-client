import {Error} from "../types";
import {GameEntity, GameResult, Move, PlayerCoinSlot} from "../../types";

export const ADD_MOVE = 'ADD_MOVE';
export type ADD_MOVE = typeof ADD_MOVE;

export const SET_RESULT = 'SET_RESULT';
export type SET_RESULT = typeof SET_RESULT;

export const FETCH_GAME = 'FETCH_GAME';
export type FETCH_GAME = typeof FETCH_GAME;

export const FETCH_GAME_SUCCESS = 'FETCH_GAME_SUCCESS';
export type FETCH_GAME_SUCCESS = typeof FETCH_GAME_SUCCESS;

export const FETCH_GAME_FAILURE = 'FETCH_GAME_FAILURE';
export type FETCH_GAME_FAILURE = typeof FETCH_GAME_FAILURE;

export const FETCH_GAMES = 'FETCH_GAMES';
export type FETCH_GAMES = typeof FETCH_GAMES;

export const FETCH_GAMES_SUCCESS = 'FETCH_GAMES_SUCCESS';
export type FETCH_GAMES_SUCCESS = typeof FETCH_GAMES_SUCCESS;

export const FETCH_GAMES_FAILURE = 'FETCH_GAMES_FAILURE';
export type FETCH_GAMES_FAILURE = typeof FETCH_GAMES_FAILURE;

export const CREATE_GAME = 'CREATE_GAME';
export type CREATE_GAME = typeof CREATE_GAME;

export const CREATE_GAME_SUCCESS = 'CREATE_GAME_SUCCESS';
export type CREATE_GAME_SUCCESS = typeof CREATE_GAME_SUCCESS;

export const CREATE_GAME_FAILURE = 'CREATE_GAME_FAILURE';
export type CREATE_GAME_FAILURE = typeof CREATE_GAME_FAILURE;

export const UPDATE_GAME = 'UPDATE_GAME';
export type UPDATE_GAME = typeof UPDATE_GAME;

export const UPDATE_GAME_SUCCESS = 'UPDATE_GAME_SUCCESS';
export type UPDATE_GAME_SUCCESS = typeof UPDATE_GAME_SUCCESS;

export const UPDATE_GAME_FAILURE = 'UPDATE_GAME_FAILURE';
export type UPDATE_GAME_FAILURE = typeof UPDATE_GAME_FAILURE;

export const RECORD_PLAYER_WIN = 'RECORD_PLAYER_WIN';
export type RECORD_PLAYER_WIN = typeof RECORD_PLAYER_WIN;

export const RESET_SCORE = 'RESET_SCORE';
export type RESET_SCORE = typeof RESET_SCORE;

export const RESET_MOVES = 'RESET_MOVES';
export type RESET_MOVES = typeof RESET_MOVES;

export interface AddMove {
    type: ADD_MOVE;
    payload: Move;
}

export interface SetResult {
    type: SET_RESULT;
    payload: GameResult
}
export interface ResetScore {
    type: RESET_SCORE;
}

export interface ResetMoves {
    type: RESET_MOVES;
}

export interface FetchGame {
    type: FETCH_GAME;
}

export interface FetchGameSuccess {
    type: FETCH_GAME_SUCCESS;
    payload: GameEntity
}

export interface FetchGameFailure {
    type: FETCH_GAME_FAILURE;
    payload: Error
}

export interface FetchGames {
    type: FETCH_GAMES;
}

export interface FetchGamesSuccess {
    type: FETCH_GAMES_SUCCESS;
    payload: GameEntity[]
}

export interface FetchGamesFailure {
    type: FETCH_GAMES_FAILURE;
    payload: Error
}

export interface CreateGame {
    type: CREATE_GAME;
}

export interface CreateGameSuccess {
    type: CREATE_GAME_SUCCESS;
}

export interface CreateGameFailure {
    type: CREATE_GAME_FAILURE;
    payload: Error
}

export interface UpdateGame {
    type: UPDATE_GAME;
}

export interface UpdateGameSuccess {
    type: UPDATE_GAME_SUCCESS;
}

export interface UpdateGameFailure {
    type: UPDATE_GAME_FAILURE;
    payload: Error
}

export type GameAction = ResetScore | AddMove | ResetMoves | SetResult |
    FetchGame | FetchGameSuccess | FetchGameFailure | FetchGames | FetchGamesSuccess | FetchGamesFailure |
    CreateGame | CreateGameSuccess | CreateGameFailure | UpdateGame | UpdateGameSuccess | UpdateGameFailure;

export function addMove(playerCoinSlot: PlayerCoinSlot, columnIndex: number): AddMove {
    return {
        type: ADD_MOVE, payload: {player: playerCoinSlot, columnIndex}
    };
}

export function setResult(result: GameResult): SetResult {
    return {
        type: SET_RESULT, payload: result
    };
}

export function resetScore(): ResetScore {
    return {
        type: RESET_SCORE
    };
}

export function resetMoves(): ResetMoves {
    return {
        type: RESET_MOVES
    };
}

export function fetchGame(): FetchGame {
    return {
        type: FETCH_GAME
    };
}

export function fetchGameSuccess(data: GameEntity): FetchGameSuccess {
    return {
        type: FETCH_GAME_SUCCESS,
        payload: data
    };
}

export function fetchGameFailure(error: string): FetchGameFailure {
    return {
        type: FETCH_GAME_FAILURE,
        payload: error
    };
}

export function fetchGames(): FetchGames {
    return {
        type: FETCH_GAMES
    };
}

export function fetchGamesSuccess(data: GameEntity[]): FetchGamesSuccess {
    return {
        type: FETCH_GAMES_SUCCESS,
        payload: data
    };
}

export function fetchGamesFailure(error: string): FetchGamesFailure {
    return {
        type: FETCH_GAMES_FAILURE,
        payload: error
    };
}

export function createGame(): CreateGame {
    return {
        type: CREATE_GAME
    };
}

export function createGameSuccess(): CreateGameSuccess {
    return {
        type: CREATE_GAME_SUCCESS
    };
}

export function createGameFailure(error: string): CreateGameFailure {
    return {
        type: CREATE_GAME_FAILURE,
        payload: error
    };
}

export function updateGame(): UpdateGame {
    return {
        type: UPDATE_GAME
    };
}

export function updateGameSuccess(): UpdateGameSuccess {
    return {
        type: UPDATE_GAME_SUCCESS,
    };
}

export function updateGameFailure(error: string): UpdateGameFailure {
    return {
        type: UPDATE_GAME_FAILURE,
        payload: error
    };
}
