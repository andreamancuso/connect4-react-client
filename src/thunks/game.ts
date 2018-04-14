import {CoinSlot, GenericThunkAction, PlayerCoinSlot, State} from "../types";
import {getGridStatusSelector} from "../selectors/grid";
import {recordPlayerWin} from "../actions/game";
import {resetGrid} from "../actions/grid";

export const beginNewGameThunk = (): GenericThunkAction =>
    (dispatch, getState): void => {
        const coinSlot: CoinSlot = getGridStatusSelector(getState());

        if (coinSlot !== CoinSlot.Blank) {
            dispatch(recordPlayerWin(coinSlot));
            dispatch(resetGrid());
        }
    };



