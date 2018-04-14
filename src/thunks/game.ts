import {CoinSlot, GenericThunkAction, PlayerCoinSlot, State} from "../types";
import {getGridStatusSelector} from "../selectors/grid";
import {recordPlayerWin, resetScore} from "../actions/game";
import {resetGrid} from "../actions/grid";

export const beginNewGameThunk = (): GenericThunkAction =>
    (dispatch, getState): void => {
        const coinSlot: CoinSlot = getGridStatusSelector(getState());

        if (coinSlot !== CoinSlot.Blank) {
            dispatch(recordPlayerWin(coinSlot));
            dispatch(resetGrid());
        }
    };

export const resetScoreThunk = (): GenericThunkAction =>
    (dispatch, getState): void => {
        dispatch(resetGrid());
        dispatch(resetScore());
    };



