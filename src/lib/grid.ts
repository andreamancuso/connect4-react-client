import {CoinSlot, Column, Grid, PlayerCoinSlot} from "../types";

export const getColunmSlotAvailableIndex = (column) => {
    for (let i = column.length-1; i >= 0; i--) {
        if (column[i] === CoinSlot.Blank) {
            return i;
        }
    }
    return -1;
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

export const getTransposedGrid = (grid:Grid):Grid =>
    grid[0].map((col, i) => grid.map(row => row[i]));

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
 * Quite possibly not the most efficient algorithm for this purpose
 *
 * @param {Grid} grid
 * @returns {CoinSlot}
 */
export const getGridStatus = (grid: Grid): CoinSlot => {
    let currentSlot;
    for (let i = 0, numCols = grid.length; i < numCols; i++) {
        for (let j = 0, numSlots = grid[i].length; j < numSlots; j++) {
            currentSlot = grid[i][j];

            if (currentSlot === CoinSlot.Blank) {
                continue;
            }

            if (isVerticalConnect(grid[i], j, currentSlot)) {
                return currentSlot;
            } else if(isHorizontalConnect(grid, i, j, currentSlot)) {
                return currentSlot;
            } else if(isDownRightDiagonalConnect(grid, i, j, currentSlot)) {
                return currentSlot;
            } else if(isUpRightDiagonalConnect(grid, i, j, currentSlot)) {
                return currentSlot;
            }
        }
    }

    return CoinSlot.Blank;
};
