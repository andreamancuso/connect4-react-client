import {expect} from 'chai';
import * as sinon from 'sinon';
import { GamesController } from '../../src/be/games.controller';
import { GamesService } from '../../src/be/games.service';
import {CreateGameDto} from "../../src/be/types";

describe('GamesController', () => {
    let gamesController: GamesController;
    let gamesService: GamesService;
    let firestoreMock: any;

    beforeEach(() => {
        firestoreMock = {collection: sinon.spy()};
        gamesService = new GamesService(firestoreMock);
        gamesController = new GamesController(gamesService);
    });

    describe('findAll', () => {
        it('should return an array of games', () => {
            const result = ['test'];
            const findAllStub = sinon.stub(gamesService, 'findAll');
            findAllStub.returns(result);

            expect(firestoreMock.collection.callCount).to.equal(1);
            expect(gamesController.findAll()).to.equal(result);
        });
    });

    describe('findOne', () => {
        it('should return a game', async () => {
            const result = 'test';
            const findOneStub = sinon.stub(gamesService, 'findOne');
            findOneStub.returns(result);

            expect(firestoreMock.collection.callCount).to.equal(1);
            expect(await gamesController.findOne('id')).to.equal(result);
        });
    });

    describe('create', () => {
        it('should create a game', async () => {
            const createGameDto: CreateGameDto = {
                player1: 'player-1',
                player2: 'player-2',
            };

            const createStub = sinon.stub(gamesService, 'create');
            createStub.returns(Promise.resolve({id: 'game-id'}));

            const resMock: any = {
                append: function() { return this},
                status: function() { return this},
                json: function() { return this},
            };

            sinon.spy(resMock, 'append');
            sinon.spy(resMock, 'status');
            sinon.spy(resMock, 'json');

            await gamesController.create(createGameDto, resMock);

            expect(resMock.append.callCount).equal(1);
            expect(resMock.append.firstCall.args[1]).to.equal('/games/game-id');

            expect(resMock.status.callCount).equal(1);
            expect(resMock.status.firstCall.args[0]).to.equal(201);

            expect(resMock.json.callCount).equal(1);
            expect(resMock.json.firstCall.args[0]).to.deep.equal({id: 'game-id'});
        });
    });
});
