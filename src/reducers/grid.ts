import {
    ADD_COIN,
    GridAction, RESET_GRID
} from "../actions/grid";
import {CoinSlot, GridState} from "../types";
import {addCoinToColumnWithinGrid, getGrid} from "../lib/grid";

export const getInitialState = (): GridState => ({
    grid: getGrid(),
    lastPlayerCoinSlot: CoinSlot.Blank
});

export const gridReducer = (state = getInitialState(), action: GridAction): GridState => {
    switch (action.type) {
        case ADD_COIN: {
            const grid = addCoinToColumnWithinGrid(state.grid, action.payload.playerCoinSlot, action.payload.columnIndex);
            if (grid !== state.grid) {
                return {
                    ...state,
                    lastPlayerCoinSlot: action.payload.playerCoinSlot,
                    grid
                };
            }
            break;
        }

        case RESET_GRID:
            return getInitialState()
    }

    return state;
};

export default gridReducer;
