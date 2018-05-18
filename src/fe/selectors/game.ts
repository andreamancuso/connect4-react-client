import {createSelector} from 'reselect';
import {CoinSlot, GameResult, Grid, Move, PlayerCoinSlot} from "../../types";
import {
    addCoinToColumnWithinGrid, canAddCoinToColumnWithinGrid, getGrid, getGridStatus,
    getTransposedGrid
} from "../../lib/grid";
import {State} from "../types";

export const movesSelector = (state:State): Move[] => state.game.selectedGame.data.moves;
export const player1Selector = (state:State): string => state.game.selectedGame.data.player1;
export const player2Selector = (state:State): string => state.game.selectedGame.data.player2;

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

export const nextPlayerNameSelector = createSelector(
    [nextPlayerSelector, player1Selector, player2Selector],
    (player1or2: PlayerCoinSlot, player1: string, player2: string): string => {
        return player1or2 === CoinSlot.Player1 ? player1 : player2;
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
