import {createSelector} from 'reselect';
import {getGridStatus, getTransposedGrid} from "../lib/grid";
import {CoinSlot, Grid, PlayerCoinSlot, State} from "../types";

const gridSelector = (state:State): Grid => state.grid.grid;
const lastPlayerCoinSlotSelector = (state:State): CoinSlot => state.grid.lastPlayerCoinSlot;

export const getTransposedGridSelector = createSelector(
    gridSelector,
    (grid: Grid):Grid => getTransposedGrid(grid)
);

export const getGridStatusSelector = createSelector(
    gridSelector,
    (grid: Grid):CoinSlot => getGridStatus(grid)
);

export const isGameInProgressSelector = createSelector(
    getGridStatusSelector,
    (coinSlot: CoinSlot):boolean => coinSlot === CoinSlot.Blank
);

export const nextPlayerSelector = createSelector(
    lastPlayerCoinSlotSelector,
    (coinSlot: CoinSlot):PlayerCoinSlot => {
        if (coinSlot === CoinSlot.Blank) {
            return CoinSlot.Player1;
        } else {
            return coinSlot === CoinSlot.Player1 ? CoinSlot.Player2 : CoinSlot.Player1;
        }
    }
);
