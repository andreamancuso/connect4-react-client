import {CoinSlot, Column, GameResult, Grid, PlayerCoinSlot} from "../types";

/**
 * Given a column, returns the next available index which identifies
 * the slot in which a token can be added.
 *
 * @param column
 * @returns {number}
 */
export const getColunmSlotAvailableIndex = (column) => {
    for (let i = column.length-1; i >= 0; i--) {
        if (column[i] === CoinSlot.Blank) {
            return i;
        }
    }
    return -1;
};


/**
 * Creates an empty grid, filled with zeroes, which indicate an empty slot
 *
 * @returns {Grid}
 */
export const getGrid = ():Grid => {
    return [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ];
};

/**
 * Returns the grid, transposed, so that it can be (more) easily rendered.
 *
 * @param {Grid} grid
 * @returns {Grid}
 */
export const getTransposedGrid = (grid:Grid):Grid =>
    grid[0].map((col, i) => grid.map(row => row[i]));

/**
 * Determines whether a token can be inserted into a column, first by verifying that a
 * column is defined, then by checking whether or not is full.
 *
 * @param {Grid} grid
 * @param {PlayerCoinSlot} playerCoinSlot
 * @param {number} columnIndex
 * @returns {boolean}
 */
export const canAddCoinToColumnWithinGrid = (grid: Grid, playerCoinSlot: PlayerCoinSlot, columnIndex: number): boolean => {
    if (grid[columnIndex] === undefined) {
        // Invalid column index
        return false;
    }

    if (grid[columnIndex].filter((slot: CoinSlot) => slot !== CoinSlot.Blank).length >= grid[columnIndex].length) {
        // Column is full
        return false;
    }

    return true;
};

/**
 * Assuming a token can be inserted into the specified column, it generates a new instance
 * of the grid, setting the new token accordingly.
 *
 * @param {Grid} grid
 * @param {PlayerCoinSlot} playerCoinSlot
 * @param {number} columnIndex
 * @returns {Grid}
 */
export const addCoinToColumnWithinGrid = (grid: Grid, playerCoinSlot: PlayerCoinSlot, columnIndex: number): Grid => {
    if (!canAddCoinToColumnWithinGrid(grid, playerCoinSlot, columnIndex)) {
        return grid;
    }

    const slotIndex = getColunmSlotAvailableIndex(grid[columnIndex]);

    const newGrid = [...grid];
    newGrid[columnIndex] = [...newGrid[columnIndex]];
    newGrid[columnIndex].splice(slotIndex, 1, playerCoinSlot);

    return newGrid;
};

/**
 * Iterates through the multi-dimensional grid array and determines
 * whether 4 adjacent tokens have been matched horizontally, vertically
 * or diagonally (up-right and down-right).
 *
 * Quite possibly not the most efficient algorithm for this purpose.
 *
 * @param {Grid} grid
 * @returns {GameResult}
 */
export const getGridStatus = (grid: Grid): GameResult => {
    let currentSlot: CoinSlot;
    for (let i = 0, numCols = grid.length; i < numCols; i++) {
        for (let j = 0, numSlots = grid[i].length; j < numSlots; j++) {
            currentSlot = grid[i][j];

            if (currentSlot === CoinSlot.Blank) {
                continue;
            }

            let matched = false;

            if (isVerticalConnect(grid[i], j, currentSlot)) {
                matched = true;
            } else if(isHorizontalConnect(grid, i, j, currentSlot)) {
                matched = true;
            } else if(isDownRightDiagonalConnect(grid, i, j, currentSlot)) {
                matched = true;
            } else if(isUpRightDiagonalConnect(grid, i, j, currentSlot)) {
                matched = true;
            }

            if (matched) {
                return currentSlot === CoinSlot.Player1 ? GameResult.Player1Won : GameResult.Player2Won;
            }
        }
    }

    return GameResult.InProgress; // todo: have to add support for draw
};

const isVerticalConnect = (column: Column, startingColumnOffset: number, playerCoinSlot: CoinSlot): boolean => {
    if (column[startingColumnOffset+3] === undefined) {
        return false;
    }

    return playerCoinSlot === column[startingColumnOffset+1]
        && playerCoinSlot === column[startingColumnOffset+2]
        && playerCoinSlot === column[startingColumnOffset+3]
};

const isHorizontalConnect = (grid: Grid, startingRowOffset: number, columnOffset: number, playerCoinSlot: CoinSlot): boolean => {
    if (grid[startingRowOffset+3] === undefined) {
        return false;
    }

    return playerCoinSlot === grid[startingRowOffset+1][columnOffset]
        && playerCoinSlot === grid[startingRowOffset+2][columnOffset]
        && playerCoinSlot === grid[startingRowOffset+3][columnOffset]
};

const isDownRightDiagonalConnect = (grid: Grid, startingRowOffset: number, startingColumnOffset: number, playerCoinSlot: CoinSlot): boolean => {
    if (grid[startingRowOffset+3] === undefined || grid[startingRowOffset+3][startingColumnOffset+3] === undefined) {
        return false;
    }

    return playerCoinSlot === grid[startingRowOffset+1][startingColumnOffset+1]
        && playerCoinSlot === grid[startingRowOffset+2][startingColumnOffset+2]
        && playerCoinSlot === grid[startingRowOffset+3][startingColumnOffset+3]
};

const isUpRightDiagonalConnect = (grid: Grid, startingRowOffset: number, startingColumnOffset: number, playerCoinSlot: CoinSlot): boolean => {
    if (grid[startingRowOffset+3] === undefined || grid[startingRowOffset+3][startingColumnOffset-3] === undefined) {
        return false;
    }

    return playerCoinSlot === grid[startingRowOffset+1][startingColumnOffset-1]
        && playerCoinSlot === grid[startingRowOffset+2][startingColumnOffset-2]
        && playerCoinSlot === grid[startingRowOffset+3][startingColumnOffset-3]
};