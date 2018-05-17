import {createSelector} from 'reselect';
import {CoinSlot, GameResult} from "../../types";
import {getGridStatusSelector} from "./grid";

export const getSelectedGameResult = createSelector(
    getGridStatusSelector,
    (gridStatus: CoinSlot): GameResult => {
        switch (gridStatus) {
            case CoinSlot.Blank: return GameResult.InProgress;
            case CoinSlot.Player1: return GameResult.Player1Won;
            case CoinSlot.Player2: return GameResult.Player2Won;
            default: return GameResult.InProgress;
        }
    }
);
