import { IsString, IsNotEmpty } from 'class-validator';
import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

import {CoinSlot, Move} from "../types";

export interface FirebaseConfig {
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
    readonly moves: Move[];
    readonly result: CoinSlot;
}

export interface FirestoreGame {
    player1: string,
    player2: string,
    moves: Move[],
    date: Timestamp,
    result: null|CoinSlot
}
