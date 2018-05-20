import {expect} from 'chai';
import {gameReducer, getInitialState} from "../../../src/fe/reducers/game";
import {addMove, SET_PLAYER_NAME, SET_RESULT, setPlayerName, setResult} from "../../../src/fe/actions/game";
import {CoinSlot, GameResult} from "../../../src/types";

describe('Game reducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = getInitialState();
    });

    it('should handle ADD_MOVE actions', () => {
        const result = gameReducer(initialState, addMove(CoinSlot.Player1, 0));

        expect(result.selectedGame.data.moves.length).to.equal(1);
        expect(result.selectedGame.data.moves[0].player).to.equal(CoinSlot.Player1);
        expect(result.selectedGame.data.moves[0].columnIndex).to.equal(0);
    });

    it('should handle SET_RESULT actions', () => {
        const result = gameReducer(initialState, setResult(GameResult.Player2Won));

        expect(result.selectedGame.data.result).to.equal(GameResult.Player2Won);
    });

    it('should handle SET_PLAYER_NAME actions', () => {
        let state = gameReducer(initialState, setPlayerName(CoinSlot.Player1, 'Andy'));
        const result = gameReducer(state, setPlayerName(CoinSlot.Player2, 'Josh'));

        expect(result.selectedGame.data.player1).to.equal('Andy');
        expect(result.selectedGame.data.player2).to.equal('Josh');
    });
});
