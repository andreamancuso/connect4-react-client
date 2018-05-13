import { NestFactory } from '@nestjs/core';
import {GamesModule} from "./games.module";

async function bootstrap() {
    try {
        const app = await NestFactory.create(GamesModule);
        await app.listen(3000);
    } catch(error) {
        console.log(error.code);
        console.log(error);
    }
}

bootstrap();
