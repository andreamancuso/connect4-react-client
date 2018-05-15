import {expect} from 'chai';
import {isGameInProgressSelector, nextPlayerSelector} from "../../src/selectors/grid";
import {getInitialState as getInitialGridState, default as gridReducer} from "../../src/reducers/grid";
import {getInitialState as getInitialGameState} from "../../src/reducers/game";
import {CoinSlot, State} from "../../src/types";
import {addCoin} from "../../src/actions/grid";

describe('Grid selectors', () => {
    describe('isGameInProgressSelector', () => {
        describe('when no player has yet won', () => {
            it('should return true', () => {
                const result = isGameInProgressSelector({
                    game: getInitialGameState(),
                    grid: getInitialGridState()
                });

                expect(result).equal(true);
            });
        });

        describe('when any player has  won', () => {
            it('should return false', () => {
                let state: State = {
                    game: getInitialGameState(),
                    grid: getInitialGridState()
                };
                state.grid = gridReducer(state.grid, addCoin(CoinSlot.Player2, 0));
                state.grid = gridReducer(state.grid, addCoin(CoinSlot.Player2, 0));
                state.grid = gridReducer(state.grid, addCoin(CoinSlot.Player2, 0));
                state.grid = gridReducer(state.grid, addCoin(CoinSlot.Player2, 0));

                const result = isGameInProgressSelector(state);

                expect(result).equal(false);
            });
        });
    });

    describe('nextPlayerSelector', () => {
        describe('when lastPlayerCoinSlot is not set', () => {
            it('should return Player1', () => {
                const result = nextPlayerSelector({
                    game: getInitialGameState(),
                    grid: {
                        ...getInitialGridState(),
                        lastPlayerCoinSlot: null
                    }
                });

                expect(result).equal(CoinSlot.Player1);
            });
        });

        describe('when lastPlayerCoinSlot is Player1', () => {
            it('should return Player1', () => {
                const result = nextPlayerSelector({
                    game: getInitialGameState(),
                    grid: {
                        ...getInitialGridState(),
                        lastPlayerCoinSlot: CoinSlot.Player1
                    }
                });

                expect(result).equal(CoinSlot.Player2);
            });
        });

        describe('when lastPlayerCoinSlot is Player1', () => {
            it('should return Player1', () => {
                const result = nextPlayerSelector({
                    game: getInitialGameState(),
                    grid: {
                        ...getInitialGridState(),
                        lastPlayerCoinSlot: CoinSlot.Player2
                    }
                });

                expect(result).equal(CoinSlot.Player1);
            });
        });
    });
});
