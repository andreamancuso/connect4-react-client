import {expect} from 'chai';
import * as request from 'supertest';
import * as sinon from 'sinon';
import { Test } from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';

import { GamesController } from '../../src/be/games.controller';
import { GamesModule } from '../../src/be/games.module';
import { GamesService } from '../../src/be/games.service';
import { ConfigService } from "../../src/be/config.service";
import {PROVIDER_FIRESTORE} from "../../src/be/constants";

describe('GamesController', () => {
    let app: INestApplication;

    let gamesService: any = {
        findAll: sinon.stub(),
        findOne: sinon.stub(),
        create: sinon.stub(),
        update: sinon.stub()
    };
    let configService = {};
    let firestoreProvider = {};

    before(async () => {

        const gamesModule = await Test.createTestingModule({
            imports: [GamesModule],
        })
            .overrideProvider(PROVIDER_FIRESTORE)
            .useValue(firestoreProvider)
            .overrideProvider(ConfigService)
            .useValue(configService)
            .overrideProvider(GamesService)
            .useValue(gamesService)
            .compile();

        app = gamesModule.createNestApplication();
        await app.init();
    });

    it(`/GET games`, () => {
        gamesService.findAll.returns(['test']);

        return request(app.getHttpServer())
            .get('/games')
            .expect(200)
            .expect(['test'])
            .expect(function(res) {
                expect(gamesService.findAll.callCount).to.equal(1);
            });
    });

    it(`/GET games/game-id`, () => {
        gamesService.findOne.returns(Promise.resolve({test: 'test'}));

        return request(app.getHttpServer())
            .get('/games/game-id')
            .expect(200)
            .expect({test: 'test'})
            .expect(function(res) {
                expect(gamesService.findOne.callCount).to.equal(1);
                expect(gamesService.findOne.firstCall.args[0]).to.equal('game-id');
            });
    });

    it(`/GET games/unknown-id triggers 404`, () => {
        gamesService.findOne.returns(Promise.resolve(null));

        return request(app.getHttpServer())
            .get('/games/unknown-id')
            .expect(404)
            .expect({statusCode: 404, message: 'Game not found'});
    });

    it(`/POST games`, () => {
        gamesService.create.returns(Promise.resolve({id: 'new-game-id'}));

        return request(app.getHttpServer())
            .post('/games')
            .send({player1: 'player 1', player2: 'player 2'})
            .expect(201)
            .expect({id: 'new-game-id'})
            .expect(function(res) {
                expect(res.header.location).to.equal('/games/new-game-id');
                expect(gamesService.create.callCount).to.equal(1);
                expect(gamesService.create.firstCall.args[0]).to.deep.equal({player1: 'player 1', player2: 'player 2'});
            });
    });

    // Currently failing due to ValidationPipe not performing validation as expected
    it(`/POST games triggers 400`, () => {
        gamesService.create.returns(Promise.resolve({id: 'new-game-id'}));

        return request(app.getHttpServer())
            .post('/games')
            .send({createGameDto: 'player 1', player2: ''})
            .expect({statusCode: 400, message: 'Invalid data'})
            .expect(400);
    });

    it(`/PUT games/game-id`, () => {
        gamesService.update.returns(Promise.resolve());

        return request(app.getHttpServer())
            .put('/games/game-id')
            .send({moves: [{columnIndex: 0, player: 1}]})
            .expect(204)
            .expect(function(res) {
                expect(gamesService.update.callCount).to.equal(1);
                expect(gamesService.update.firstCall.args[0]).to.equal('game-id');
                expect(gamesService.update.firstCall.args[1]).to.deep.equal({moves: [{columnIndex: 0, player: 1}]});
            });
    });

    after(async () => {
        await app.close();
    });
});
