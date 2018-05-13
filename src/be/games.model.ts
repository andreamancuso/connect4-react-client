import * as firebase from "firebase";
import {FirestoreGame} from "../types";

export const getGameFirestoreModel = (): FirestoreGame => ({
    player1: '',
    player2: '',
    moves: [],
    date: firebase.firestore.Timestamp.now(),
    result: null,
});

export const convertGameFirestoreModelIntoGameModel = (firestoreGameModel: FirestoreGame) => ({
    ...firestoreGameModel,
    date: firestoreGameModel.date.toDate()
});
