import {expect} from 'chai';
import {gridReducer, getInitialState} from "../../src/reducers/grid";
import {
    addCoin, resetGrid
} from "../../src/actions/grid";
import {CoinSlot} from "../../src/types";

describe('Grid reducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = getInitialState();
    });

    it('should handle ADD_COIN actions', () => {
        const result = gridReducer(initialState, addCoin(CoinSlot.Player1, 0));

        expect(result.grid[0][5]).equal(CoinSlot.Player1);
    });

    it('should handle RESET_GRID actions', () => {
        let state = gridReducer(initialState, addCoin(CoinSlot.Player1, 0));
        const result = gridReducer(state, resetGrid());

        expect(result.grid[0][0]).equal(CoinSlot.Blank);
    });
});
