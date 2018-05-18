import * as firebase from "firebase";
import {IFirestoreGame} from "./types";
import {GameResult} from "../types";

export const getGameFirestoreModel = (): IFirestoreGame => ({
    player1: '',
    player2: '',
    moves: [],
    date: firebase.firestore.Timestamp.now(),
    result: GameResult.InProgress,
});

export const convertGameFirestoreModelIntoGameModel = (firestoreGameModel: IFirestoreGame) => ({
    ...firestoreGameModel,
    date: firestoreGameModel.date.toDate()
});
