import {CoinSlot} from "../../types";
import {GenericThunkAction} from "../types";
import {getGridStatusSelector} from "../selectors/grid";
import {recordPlayerWin, resetMoves, resetScore} from "../actions/game";

export const beginNewGameThunk = (): GenericThunkAction =>
    (dispatch, getState): void => {
        const coinSlot: CoinSlot = getGridStatusSelector(getState());

        if (coinSlot !== CoinSlot.Blank) {
            dispatch(recordPlayerWin(coinSlot));
            dispatch(resetMoves());
        }
    };

export const resetScoreThunk = (): GenericThunkAction =>
    (dispatch, getState): void => {
        dispatch(resetMoves());
        dispatch(resetScore());
    };



