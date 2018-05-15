import {
    Get, Post, Put, Param, Body,
    Controller, Inject, HttpCode,
    Res, HttpStatus, ValidationPipe,
    HttpException
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
            throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
        }

        return result;
    }

    @Post()
    async create(@Body(new ValidationPipe({transform: true})) createGameDto: CreateGameDto, @Res() res) {
        if (!createGameDto.player1 || !createGameDto.player1) {
            throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
        }

        const game: GameEntity = await this.gamesService.create(createGameDto);

        res
        .append('Location', `/games/${game.id}`)
        .status(HttpStatus.CREATED)
        .json(game);
    }

    @HttpCode(204)
    @Put(':id')
    async update(@Param('id') id, @Body() updateGameDto: UpdateGameDto) {
        return this.gamesService.update(id, updateGameDto);
    }
}
