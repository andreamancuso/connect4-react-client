import { NestFactory } from '@nestjs/core';
import {GamesModule} from "./games.module";

const corsOptions = {
    origin: 'http://localhost:1212'
};

async function bootstrap() {
    try {
        const app = await NestFactory.create(GamesModule, {cors: corsOptions});
        await app.listen(3000);
    } catch(error) {
        console.log(error.code);
        console.log(error);
    }
}

bootstrap();
