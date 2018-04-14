import {createSelector} from 'reselect';
import {CoinSlot, PlayerCoinSlot, State} from "../types";

const gamesSelector = (state:State): Array<PlayerCoinSlot> => state.game.games;

export const getNumGamesWonByPlayer1GridSelector = createSelector(
    gamesSelector,
    (games: Array<PlayerCoinSlot>):number =>
        games.filter((playerCoinSlot: PlayerCoinSlot) => playerCoinSlot === CoinSlot.Player1).length
);

export const getNumGamesWonByPlayer2GridSelector = createSelector(
    gamesSelector,
    (games: Array<PlayerCoinSlot>):number =>
        games.filter((playerCoinSlot: PlayerCoinSlot) => playerCoinSlot === CoinSlot.Player2).length
);
