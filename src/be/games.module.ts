import { Module } from '@nestjs/common';
import {GamesController} from "./games.controller";
import {ConfigModule} from "./config.module";
import {firestoreFactory} from "./firestore.provider";
import {GamesService} from "./games.service";

@Module({
    imports: [ConfigModule],
    providers: [firestoreFactory, GamesService],
    controllers: [GamesController],
})
export class GamesModule {}
