import {
    Get, Post, Put, Param, Body,
    Controller, Inject, HttpCode, Res, HttpStatus, Req
} from '@nestjs/common';
import {GamesService} from "./games.service";
import {Game, GameEntity} from "../types";
import {CreateGameDto, UpdateGameDto} from "./types";

@Controller('games')
export class GamesController {
    constructor(@Inject(GamesService) private readonly gamesService: GamesService) {}

    @Get()
    findAll(): Promise<Game[]> {
        return this.gamesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const result = await this.gamesService.findOne(id);
        if (!result) {
            // todo: return 404
        }

        return result;
    }

    @Post()
    async create(@Body() createGameDto: CreateGameDto, @Res() res) {
        try {
            const game: GameEntity = await this.gamesService.create(createGameDto);

            res
            .append('Location', `/games/${game.id}`)
            .status(HttpStatus.CREATED)
            .json(game);
        } catch(error) {
            res
            .status(500)
            .json({message: error.message});
        }
    }

    @HttpCode(204)
    @Put(':id')
    async update(@Param('id') id, @Body() updateGameDto: UpdateGameDto) {
        return this.gamesService.update(id, updateGameDto);
    }
}
