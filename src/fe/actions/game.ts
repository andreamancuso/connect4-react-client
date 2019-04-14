import { Error } from '../types';
import { IGameEntity, GameResult, IMove, PlayerCoinSlot } from '../../types';
import { Action } from 'redux';

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

export const DELETE_GAME = 'DELETE_GAME';
export type DELETE_GAME = typeof DELETE_GAME;

export const DELETE_GAME_SUCCESS = 'DELETE_GAME_SUCCESS';
export type DELETE_GAME_SUCCESS = typeof DELETE_GAME_SUCCESS;

export const DELETE_GAME_FAILURE = 'DELETE_GAME_FAILURE';
export type DELETE_GAME_FAILURE = typeof DELETE_GAME_FAILURE;

export const RESET_MOVES = 'RESET_MOVES';
export type RESET_MOVES = typeof RESET_MOVES;

export const RESET_GAME = 'RESET_GAME';
export type RESET_GAME = typeof RESET_GAME;

export const SET_PLAYER_NAME = 'SET_PLAYER_NAME';
export type SET_PLAYER_NAME = typeof SET_PLAYER_NAME;

export interface IAddMove extends Action {
  type: ADD_MOVE;
  payload: IMove;
}

export interface ISetResult extends Action {
  type: SET_RESULT;
  payload: GameResult;
}

export interface ISetPlayerName extends Action {
  type: SET_PLAYER_NAME;
  payload: {
    player1or2: PlayerCoinSlot;
    name: string;
  };
}

export interface IResetMoves extends Action {
  type: RESET_MOVES;
}

export interface IResetGame extends Action {
  type: RESET_GAME;
}

export interface IFetchGame extends Action {
  type: FETCH_GAME;
}

export interface IFetchGameSuccess extends Action {
  type: FETCH_GAME_SUCCESS;
  payload: IGameEntity;
}

export interface IFetchGameFailure extends Action {
  type: FETCH_GAME_FAILURE;
  payload: Error;
}

export interface IFetchGames extends Action {
  type: FETCH_GAMES;
}

export interface IFetchGamesSuccess extends Action {
  type: FETCH_GAMES_SUCCESS;
  payload: IGameEntity[];
}

export interface IFetchGamesFailure extends Action {
  type: FETCH_GAMES_FAILURE;
  payload: Error;
}

export interface ICreateGame extends Action {
  type: CREATE_GAME;
}

export interface ICreateGameSuccess extends Action {
  type: CREATE_GAME_SUCCESS;
}

export interface ICreateGameFailure extends Action {
  type: CREATE_GAME_FAILURE;
  payload: Error;
}

export interface IUpdateGame extends Action {
  type: UPDATE_GAME;
}

export interface IUpdateGameSuccess extends Action {
  type: UPDATE_GAME_SUCCESS;
}

export interface IUpdateGameFailure extends Action {
  type: UPDATE_GAME_FAILURE;
  payload: Error;
}

export interface IDeleteGame extends Action {
  type: DELETE_GAME;
}

export interface IDeleteGameSuccess extends Action {
  type: DELETE_GAME_SUCCESS;
}

export interface IDeleteGameFailure extends Action {
  type: DELETE_GAME_FAILURE;
  payload: Error;
}

export type GameAction =
  | ISetPlayerName
  | IAddMove
  | IResetMoves
  | IResetGame
  | ISetResult
  | IFetchGame
  | IFetchGameSuccess
  | IFetchGameFailure
  | IFetchGames
  | IFetchGamesSuccess
  | IFetchGamesFailure
  | ICreateGame
  | ICreateGameSuccess
  | ICreateGameFailure
  | IUpdateGame
  | IUpdateGameSuccess
  | IUpdateGameFailure
  | IDeleteGame
  | IDeleteGameSuccess
  | IDeleteGameFailure;

export function addMove(playerCoinSlot: PlayerCoinSlot, columnIndex: number): IAddMove {
  return {
    type: ADD_MOVE,
    payload: { player: playerCoinSlot, columnIndex }
  };
}

export function setResult(result: GameResult): ISetResult {
  return {
    type: SET_RESULT,
    payload: result
  };
}

export function setPlayerName(player1or2: PlayerCoinSlot, name: string): ISetPlayerName {
  return {
    type: SET_PLAYER_NAME,
    payload: { player1or2, name }
  };
}

export function resetMoves(): IResetMoves {
  return {
    type: RESET_MOVES
  };
}

export function resetGame(): IResetGame {
  return {
    type: RESET_GAME
  };
}

export function fetchGame(): IFetchGame {
  return {
    type: FETCH_GAME
  };
}

export function fetchGameSuccess(data: IGameEntity): IFetchGameSuccess {
  return {
    type: FETCH_GAME_SUCCESS,
    payload: data
  };
}

export function fetchGameFailure(error: string): IFetchGameFailure {
  return {
    type: FETCH_GAME_FAILURE,
    payload: error
  };
}

export function fetchGames(): IFetchGames {
  return {
    type: FETCH_GAMES
  };
}

export function fetchGamesSuccess(data: IGameEntity[]): IFetchGamesSuccess {
  return {
    type: FETCH_GAMES_SUCCESS,
    payload: data
  };
}

export function fetchGamesFailure(error: string): IFetchGamesFailure {
  return {
    type: FETCH_GAMES_FAILURE,
    payload: error
  };
}

export function createGame(): ICreateGame {
  return {
    type: CREATE_GAME
  };
}

export function createGameSuccess(): ICreateGameSuccess {
  return {
    type: CREATE_GAME_SUCCESS
  };
}

export function createGameFailure(error: string): ICreateGameFailure {
  return {
    type: CREATE_GAME_FAILURE,
    payload: error
  };
}

export function updateGame(): IUpdateGame {
  return {
    type: UPDATE_GAME
  };
}

export function updateGameSuccess(): IUpdateGameSuccess {
  return {
    type: UPDATE_GAME_SUCCESS
  };
}

export function updateGameFailure(error: string): IUpdateGameFailure {
  return {
    type: UPDATE_GAME_FAILURE,
    payload: error
  };
}

export function deleteGame(): IDeleteGame {
  return {
    type: DELETE_GAME
  };
}

export function deleteGameSuccess(): IDeleteGameSuccess {
  return {
    type: DELETE_GAME_SUCCESS
  };
}

export function deleteGameFailure(error: string): IDeleteGameFailure {
  return {
    type: DELETE_GAME_FAILURE,
    payload: error
  };
}
