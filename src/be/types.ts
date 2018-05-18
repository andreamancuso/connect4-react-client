import { IsString, IsNotEmpty } from 'class-validator';
import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

import {GameResult, IMove} from "../types";

export interface IFirebaseConfig {
    readonly apiKey: string,
    readonly projectId: string,
    readonly authDomain: string
}

export class CreateGameDto {
    @IsNotEmpty()
    @IsString()
    readonly player1: string;

    @IsNotEmpty()
    @IsString()
    readonly player2: string;
}

export class UpdateGameDto {
    readonly moves: IMove[];
    readonly result: GameResult;
}

export interface IFirestoreGame {
    player1: string,
    player2: string,
    moves: IMove[],
    date: Timestamp,
    result: GameResult
}
