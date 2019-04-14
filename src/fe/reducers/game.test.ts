import { gameReducer, getInitialState } from '../../../src/fe/reducers/game';
import { addMove, setPlayerName, setResult } from '../../../src/fe/actions/game';
import { CoinSlot, GameResult } from '../../../src/types';

describe('Game reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = getInitialState();
  });

  it('should handle ADD_MOVE actions', () => {
    const result = gameReducer(initialState, addMove(CoinSlot.Player1, 0));

    expect(result.selectedGame.data.moves.length).toEqual(1);
    expect(result.selectedGame.data.moves[0].player).toEqual(CoinSlot.Player1);
    expect(result.selectedGame.data.moves[0].columnIndex).toEqual(0);
  });

  it('should handle SET_RESULT actions', () => {
    const result = gameReducer(initialState, setResult(GameResult.Player2Won));

    expect(result.selectedGame.data.result).toEqual(GameResult.Player2Won);
  });

  it('should handle SET_PLAYER_NAME actions', () => {
    let state = gameReducer(initialState, setPlayerName(CoinSlot.Player1, 'Andy'));
    const result = gameReducer(state, setPlayerName(CoinSlot.Player2, 'Josh'));

    expect(result.selectedGame.data.player1).toEqual('Andy');
    expect(result.selectedGame.data.player2).toEqual('Josh');
  });
});
