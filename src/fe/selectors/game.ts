import {createSelector} from 'reselect';
import {CoinSlot, GameResult, Grid, IMove, PlayerCoinSlot} from "../../types";
import {
    addCoinToColumnWithinGrid, canAddCoinToColumnWithinGrid, getGrid, getGridStatus,
    getTransposedGrid
} from "../../lib/grid";
import {IState} from "../types";

export const movesSelector = (state:IState): IMove[] => state.game.selectedGame.data.moves;
export const player1Selector = (state:IState): string => state.game.selectedGame.data.player1;
export const player2Selector = (state:IState): string => state.game.selectedGame.data.player2;

/**
 * Returns the grid based on the current array of game moves.
 */
export const getGridSelector = createSelector(
    movesSelector,
    (moves: IMove[]):Grid => {
        let grid = getGrid();

        moves.forEach(({player, columnIndex}) => {
            grid = addCoinToColumnWithinGrid(grid, player, columnIndex);
        });

        return grid;
    }
);

/**
 * Returns the transposed grid so that it can be more easily rendered.
 */
export const getTransposedGridSelector = createSelector(
    getGridSelector,
    (grid: Grid):Grid => getTransposedGrid(grid)
);

/**
 * Indicates which is the next player to make a move.
 */
export const nextPlayerSelector = createSelector(
    movesSelector,
    (moves: IMove[]):PlayerCoinSlot => {
        if (moves.length === 0) {
            return CoinSlot.Player1;
        } else {
            return moves[moves.length-1].player === CoinSlot.Player1 ? CoinSlot.Player2 : CoinSlot.Player1;
        }
    }
);

/**
 * Returns the name of the next player to make a move.
 */
export const nextPlayerNameSelector = createSelector(
    [nextPlayerSelector, player1Selector, player2Selector],
    (player1or2: PlayerCoinSlot, player1: string, player2: string): string => {
        return player1or2 === CoinSlot.Player1 ? player1 : player2;
    }
);

/**
 * Returns the index of the columns into which a token can be inserted into, based
 * on the current moves and grid.
 */
export const getAllowedColumns = createSelector(
    [getGridSelector, nextPlayerSelector],
    (grid: Grid, nextPlayer: PlayerCoinSlot):number[] => {
        return grid
            .map((column, columnIndex) => columnIndex)
            .filter((columnIndex) => canAddCoinToColumnWithinGrid(grid, nextPlayer, columnIndex))
    }
);

/**
 * Returns the status of the current game. At the moment, there is no logic to determine
 * the draw status.
 */
export const getSelectedGameResult = createSelector(
    getGridSelector,
    (grid: Grid): GameResult => {
        return getGridStatus(grid);
    }
);

/**
 * If the game has been won by either player, returns the name of the winner.
 */
export const winnerNameSelector = createSelector(
    [getSelectedGameResult, player1Selector, player2Selector],
    (result: GameResult, player1: string, player2: string): string => {
        if (result === GameResult.Player1Won) {
            return player1;
        } else if (result === GameResult.Player2Won) {
            return player2;
        } else {
            return '';
        }
    }
);
