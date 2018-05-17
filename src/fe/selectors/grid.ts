import {createSelector} from 'reselect';
import {
    addCoinToColumnWithinGrid, canAddCoinToColumnWithinGrid, getGrid, getGridStatus,
    getTransposedGrid
} from "../../lib/grid";
import {CoinSlot, Grid, Move, PlayerCoinSlot} from "../../types";
import {State} from "../types";

export const movesSelector = (state:State): Move[] => state.game.selectedGame.data.moves;

export const getGridSelector = createSelector(
    movesSelector,
    (moves: Move[]):Grid => {
        let grid = getGrid();

        moves.forEach(({player, columnIndex}) => {
            grid = addCoinToColumnWithinGrid(grid, player, columnIndex);
        });

        return grid;
    }
);

export const getTransposedGridSelector = createSelector(
    getGridSelector,
    (grid: Grid):Grid => getTransposedGrid(grid)
);

export const getGridStatusSelector = createSelector(
    getGridSelector,
    (grid: Grid):CoinSlot => getGridStatus(grid)
);

export const isGameInProgressSelector = createSelector(
    getGridStatusSelector,
    (coinSlot: CoinSlot):boolean => coinSlot === CoinSlot.Blank
);

export const nextPlayerSelector = createSelector(
    movesSelector,
    (moves: Move[]):PlayerCoinSlot => {
        if (moves.length === 0) {
            return CoinSlot.Player1;
        } else {
            return moves[moves.length-1].player === CoinSlot.Player1 ? CoinSlot.Player2 : CoinSlot.Player1;
        }
    }
);

export const getAllowedColumns = createSelector(
    [getGridSelector, nextPlayerSelector],
    (grid: Grid, nextPlayer: PlayerCoinSlot):number[] => {
        return grid
            .map((column, columnIndex) => columnIndex)
            .filter((columnIndex) => canAddCoinToColumnWithinGrid(grid, nextPlayer, columnIndex))
    }
);
