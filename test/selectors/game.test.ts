import {expect} from 'chai';
import {getInitialState as getInitialGridState} from "../../src/reducers/grid";
import {default as gameReducer, getInitialState as getInitialGameState} from "../../src/reducers/game";
import {getNumGamesWonByPlayer1GridSelector, getNumGamesWonByPlayer2GridSelector} from "../../src/selectors/game";
import {CoinSlot, State} from "../../src/types";
import {recordPlayerWin} from "../../src/actions/game";

describe('Game selectors', () => {
    let state: State;

    beforeEach(() => {
        state = {
            game: getInitialGameState(),
            grid: getInitialGridState()
        };

        state.game = gameReducer(state.game, recordPlayerWin(CoinSlot.Player1));
        state.game = gameReducer(state.game, recordPlayerWin(CoinSlot.Player2));
        state.game = gameReducer(state.game, recordPlayerWin(CoinSlot.Player2));
    });

    describe('getNumGamesWonByPlayer1GridSelector', () => {
        it('should return the number of games won by player 1', () => {
            const result = getNumGamesWonByPlayer1GridSelector(state);

            expect(result).equal(1);
        });
    });

    describe('getNumGamesWonByPlayer2GridSelector', () => {
        it('should return the number of games won by player 2', () => {
            const result = getNumGamesWonByPlayer2GridSelector(state);

            expect(result).equal(2);
        });
    });
});
