import {expect} from 'chai';
import {gameReducer, getInitialState} from "../../src/reducers/game";
import {
    recordPlayerWin
} from "../../src/actions/game";
import {CoinSlot} from "../../src/types";

describe('Game reducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = getInitialState();
    });

    it('should handle RECORD_PLAYER_WIN actions', () => {
        let state = gameReducer(initialState, recordPlayerWin(CoinSlot.Player1));
        state = gameReducer(state, recordPlayerWin(CoinSlot.Player1));
        const result = gameReducer(state, recordPlayerWin(CoinSlot.Player2));

        expect(result.games.length).equal(3);
        expect(result.games[0]).equal(CoinSlot.Player1);
        expect(result.games[1]).equal(CoinSlot.Player1);
        expect(result.games[2]).equal(CoinSlot.Player2);
    });
});
