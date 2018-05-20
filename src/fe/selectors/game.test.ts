import {expect} from 'chai';
import {
    default as gameReducer,
    getInitialState as getInitialGameState
} from "../../../src/fe/reducers/game";
import {
    getAllowedColumns,
    getGridSelector,
    getSelectedGameResult,
    getTransposedGridSelector,
    nextPlayerSelector
} from "../../../src/fe/selectors/game";
import {IState} from "../../../src/fe/types";
import {CoinSlot, GameResult} from "../../../src/types";
import {addMove} from "../../../src/fe/actions/game";
import {getGrid} from "../../../src/lib/grid";

describe('Game selectors', () => {
    let state: IState;

    describe('getGridSelector', () => {
        describe('when no player has made any move', () => {
            it('should return an empty grid', () => {
                const result = getGridSelector({
                    game: getInitialGameState()
                });

                expect(result).to.deep.equal(getGrid());
            });
        });

        describe('when players have made a few moves', () => {
            it('should return a grid matching those moves', () => {
                let state = {
                    game: getInitialGameState()
                };
                state.game = gameReducer(state.game, addMove(CoinSlot.Player1, 3));
                state.game = gameReducer(state.game, addMove(CoinSlot.Player2, 2));
                state.game = gameReducer(state.game, addMove(CoinSlot.Player1, 4));
                state.game = gameReducer(state.game, addMove(CoinSlot.Player2, 5));
                state.game = gameReducer(state.game, addMove(CoinSlot.Player1, 3));

                const result = getGridSelector(state);

                expect(result).to.deep.equal([
                    [0,0,0,0,0,0],
                    [0,0,0,0,0,0],
                    [0,0,0,0,0,2],
                    [0,0,0,0,1,1],
                    [0,0,0,0,0,1],
                    [0,0,0,0,0,2],
                    [0,0,0,0,0,0]
                ]);
            });
        });
    });

    describe('getTransposedGridSelector', () => {
        it('should returns the transposed grid data', () => {
            let state = {
                game: getInitialGameState()
            };
            state.game = gameReducer(state.game, addMove(CoinSlot.Player1, 3));
            state.game = gameReducer(state.game, addMove(CoinSlot.Player2, 2));
            state.game = gameReducer(state.game, addMove(CoinSlot.Player1, 4));
            state.game = gameReducer(state.game, addMove(CoinSlot.Player2, 5));
            state.game = gameReducer(state.game, addMove(CoinSlot.Player1, 3));

            const result = getTransposedGridSelector(state);

            expect(result).to.deep.equal([
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,1,0,0,0],
                [0,0,2,1,1,2,0],
            ]);
        });
    });

    describe('getSelectedGameResult', () => {
        describe('when no 4 adjacent coins are detected', () => {
            it('should return -1, "in progress"', () => {
                let state = {
                    game: getInitialGameState()
                };
                state.game = gameReducer(state.game, addMove(CoinSlot.Player1, 3));
                state.game = gameReducer(state.game, addMove(CoinSlot.Player2, 2));
                state.game = gameReducer(state.game, addMove(CoinSlot.Player1, 4));
                state.game = gameReducer(state.game, addMove(CoinSlot.Player2, 5));
                state.game = gameReducer(state.game, addMove(CoinSlot.Player1, 3));

                const result = getSelectedGameResult(state);

                expect(result).to.deep.equal(GameResult.InProgress);
            });
        });

        describe('when 4 adjacent coins by player 1 are detected', () => {
            it('should return 1, "player 1 won"', () => {
                let state = {
                    game: getInitialGameState()
                };
                state.game = gameReducer(state.game, addMove(CoinSlot.Player1, 0));
                state.game = gameReducer(state.game, addMove(CoinSlot.Player1, 1));
                state.game = gameReducer(state.game, addMove(CoinSlot.Player1, 2));
                state.game = gameReducer(state.game, addMove(CoinSlot.Player1, 3));

                const result = getSelectedGameResult(state);

                expect(result).to.equal(GameResult.Player1Won);
            });
        });

        describe('when 4 adjacent coins by player 2 are detected', () => {
            it('should return 1, "player 1 won"', () => {
                let state = {
                    game: getInitialGameState()
                };
                state.game = gameReducer(state.game, addMove(CoinSlot.Player2, 0));
                state.game = gameReducer(state.game, addMove(CoinSlot.Player2, 1));
                state.game = gameReducer(state.game, addMove(CoinSlot.Player2, 2));
                state.game = gameReducer(state.game, addMove(CoinSlot.Player2, 3));

                const result = getSelectedGameResult(state);

                expect(result).to.equal(GameResult.Player2Won);
            });
        });
    });

    describe('nextPlayerSelector', () => {
        describe('when no player has made any move', () => {
            it('should return Player1', () => {
                const result = nextPlayerSelector({
                    game: getInitialGameState()
                });

                expect(result).equal(CoinSlot.Player1);
            });
        });

        describe('when the last move was made by player 1', () => {
            it('should return Player2', () => {
                state = {
                    game: getInitialGameState()
                };
                state.game = gameReducer(state.game, addMove(CoinSlot.Player1, 0));

                const result = nextPlayerSelector(state);

                expect(result).equal(CoinSlot.Player2);
            });
        });

        describe('when the last move was made by player 1', () => {
            it('should return Player1', () => {
                state = {
                    game: getInitialGameState()
                };
                state.game = gameReducer(state.game, addMove(CoinSlot.Player2, 0));

                const result = nextPlayerSelector(state);

                expect(result).equal(CoinSlot.Player1);
            });
        });
    });

    describe('getAllowedColumns', () => {
        describe('when no 4 adjacent coins are detected', () => {
            it('should return an array of indexes of columns which are not yet "full"', () => {
                let state = {
                    game: getInitialGameState()
                };
                state.game = gameReducer(state.game, addMove(CoinSlot.Player1, 2));
                state.game = gameReducer(state.game, addMove(CoinSlot.Player1, 2));
                state.game = gameReducer(state.game, addMove(CoinSlot.Player1, 2));
                state.game = gameReducer(state.game, addMove(CoinSlot.Player1, 2));
                state.game = gameReducer(state.game, addMove(CoinSlot.Player1, 2));
                state.game = gameReducer(state.game, addMove(CoinSlot.Player1, 2));
                state.game = gameReducer(state.game, addMove(CoinSlot.Player1, 2));

                const result = getAllowedColumns(state);

                expect(result).to.deep.equal([0,1,3,4,5,6]);
            });
        });
    });
});
