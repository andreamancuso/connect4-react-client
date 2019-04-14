import * as sinon from 'sinon';
import { createGameThunk, fetchGamesThunk, updateGameThunk } from '../../../src/fe/thunks/game';
import {
  CREATE_GAME,
  CREATE_GAME_SUCCESS,
  FETCH_GAMES,
  FETCH_GAMES_SUCCESS,
  UPDATE_GAME,
  UPDATE_GAME_SUCCESS
} from '../../../src/fe/actions/game';
import { GameResult } from '../../../src/types';

describe('Game thunks', () => {
  let apiClient, dispatchSpy, getStateSpy, getStateStub;

  beforeEach(() => {
    dispatchSpy = sinon.spy();
  });

  describe('fetchGamesThunk', () => {
    describe('positive scenario', () => {
      beforeEach(() => {
        apiClient = { get: sinon.stub() };
        apiClient.get.returns(Promise.resolve('test'));
      });

      it('should dispatch 2 actions, one of which a success action', (done) => {
        const thunkFn = fetchGamesThunk();

        thunkFn(dispatchSpy, getStateSpy, { apiClient }).then(() => {
          expect(dispatchSpy.callCount).toEqual(2);
          expect(dispatchSpy.firstCall.args[0].type).toEqual(FETCH_GAMES);
          expect(dispatchSpy.secondCall.args[0].type).toEqual(FETCH_GAMES_SUCCESS);

          expect(apiClient.get.callCount).toEqual(1);

          done();
        });
      });
    });
  });

  describe('createGameThunk', () => {
    describe('positive scenario', () => {
      beforeEach(() => {
        apiClient = { post: sinon.stub() };
        apiClient.post.returns(Promise.resolve({ id: 'game-id' }));

        getStateStub = sinon.stub();
        getStateStub.returns({
          game: {
            selectedGame: {
              data: {
                player1: 'Andy',
                player2: 'Josh'
              }
            }
          }
        });
      });

      it('should dispatch 2 actions, one of which a success action', (done) => {
        const thunkFn = createGameThunk();

        thunkFn(dispatchSpy, getStateStub, { apiClient }).then(() => {
          expect(dispatchSpy.callCount).toEqual(2);
          expect(dispatchSpy.firstCall.args[0].type).toEqual(CREATE_GAME);
          expect(dispatchSpy.secondCall.args[0].type).toEqual(CREATE_GAME_SUCCESS);

          expect(apiClient.post.callCount).toEqual(1);
          expect(apiClient.post.firstCall.args[0]).toEqual('games');
          expect(apiClient.post.firstCall.args[1]).toEqual({
            player1: 'Andy',
            player2: 'Josh'
          });

          expect(getStateStub.callCount).toEqual(1);

          done();
        });
      });
    });
  });

  describe('updateGameThunk', () => {
    describe('positive scenario', () => {
      beforeEach(() => {
        apiClient = { put: sinon.stub() };
        apiClient.put.returns(Promise.resolve());

        getStateStub = sinon.stub();
        getStateStub.returns({
          game: {
            selectedGame: {
              data: {
                id: 'game-id',
                moves: [],
                result: GameResult.Player1Won
              }
            }
          }
        });
      });

      it('should dispatch 2 actions, one of which a success action', (done) => {
        const thunkFn = updateGameThunk();

        thunkFn(dispatchSpy, getStateStub, { apiClient }).then(() => {
          expect(dispatchSpy.callCount).toEqual(2);
          expect(dispatchSpy.firstCall.args[0].type).toEqual(UPDATE_GAME);
          expect(dispatchSpy.secondCall.args[0].type).toEqual(UPDATE_GAME_SUCCESS);

          expect(apiClient.put.callCount).toEqual(1);
          expect(apiClient.put.firstCall.args[0]).toEqual('games/game-id');
          expect(apiClient.put.firstCall.args[1]).toEqual({
            moves: [],
            result: GameResult.Player1Won
          });

          expect(getStateStub.callCount).toEqual(1);

          done();
        });
      });
    });
  });
});
