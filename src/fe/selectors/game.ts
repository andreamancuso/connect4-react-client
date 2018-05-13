import {createSelector} from 'reselect';
import {CoinSlot, Move, PlayerCoinSlot} from "../../types";
import {State} from "../types";

const gamesSelector = (state:State): Array<PlayerCoinSlot> => state.game.games;
export const movesSelector = (state:State): Move[] => state.game.moves;

export const getNumGamesWonByPlayer1GridSelector = createSelector(
    gamesSelector,
    (games: PlayerCoinSlot[]):number =>
        games.filter((playerCoinSlot: PlayerCoinSlot) => playerCoinSlot === CoinSlot.Player1).length
);

export const getNumGamesWonByPlayer2GridSelector = createSelector(
    gamesSelector,
    (games: PlayerCoinSlot[]):number =>
        games.filter((playerCoinSlot: PlayerCoinSlot) => playerCoinSlot === CoinSlot.Player2).length
);
