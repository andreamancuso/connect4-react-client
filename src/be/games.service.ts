import { Injectable, Inject } from '@nestjs/common';
import {Game, GameEntity} from "../types";
import * as firebase from "firebase";
import {CreateGameDto, FirestoreGame, UpdateGameDto} from "./types";
import {convertGameFirestoreModelIntoGameModel, getGameFirestoreModel} from "./games.model";
import {PROVIDER_FIRESTORE} from "./constants";

@Injectable()
export class GamesService {
    private gamesCollectionRef: firebase.firestore.CollectionReference;

    constructor(@Inject(PROVIDER_FIRESTORE) private readonly firestore: firebase.firestore.Firestore) {
        this.gamesCollectionRef = firestore.collection('games');
    }

    findAll(): Promise<GameEntity[]> {
        return new Promise((resolve, reject) => {
            this.gamesCollectionRef
                .get()
                .then((gamesSnapshot: firebase.firestore.QuerySnapshot) => {
                    resolve(gamesSnapshot.docs
                        .map((gameSnapshot: firebase.firestore.QueryDocumentSnapshot): GameEntity => {
                            const {id} = gameSnapshot;
                            const documentData: firebase.firestore.DocumentData = gameSnapshot.data();
                            const game: FirestoreGame = documentData as FirestoreGame;

                            return {
                                id,
                                ...convertGameFirestoreModelIntoGameModel(game)
                            }
                        })
                    );
                })
                .catch(error => reject(error));
        });
    }

    findOne(id: string): Promise<Game|null> {
        return new Promise((resolve, reject) => {
            this.gamesCollectionRef
                .doc(id)
                .get()
                .then((gameSnapshot: firebase.firestore.DocumentSnapshot) => {
                    let result: Game|null = null;

                    if (gameSnapshot.exists) {
                        const documentData: firebase.firestore.DocumentData = gameSnapshot.data() as firebase.firestore.DocumentData;
                        const game: FirestoreGame = documentData as FirestoreGame;

                        result = convertGameFirestoreModelIntoGameModel(game);
                    }

                    resolve(result);
                })
                .catch(error => reject(error));
        });
    }

    create(createGameDto: CreateGameDto): Promise<GameEntity> {
        return new Promise(async (resolve, reject) => {
            try {
                const newGameRef = this.gamesCollectionRef.doc();
                const newGameData: FirestoreGame = {
                    ...getGameFirestoreModel(),
                    ...createGameDto
                };

                await newGameRef.set(newGameData);

                resolve({
                    ...convertGameFirestoreModelIntoGameModel(newGameData),
                    id: newGameRef.id
                });
            } catch(error) {
                reject(error);
            }
        });
    }

    /**
     * Optimistic update here, should verify that document exists first
     */
    update(id: string, updateGameDto: UpdateGameDto) {
        const dataToUpdate = {
            moves: updateGameDto.moves,
            result: updateGameDto != null ? updateGameDto.result : null
        };

        return this.gamesCollectionRef
            .doc(id)
            .update(dataToUpdate);
    }
}
