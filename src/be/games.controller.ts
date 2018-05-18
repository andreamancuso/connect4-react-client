import {
    Get, Post, Put, Param, Body,
    Controller, Inject, HttpCode,
    Res, HttpStatus, ValidationPipe,
    Delete, HttpException
} from '@nestjs/common';
import {GamesService} from "./games.service";
import {IGameEntity} from "../types";
import {CreateGameDto, UpdateGameDto} from "./types";

@Controller('games')
export class GamesController {
    constructor(@Inject(GamesService) private readonly gamesService: GamesService) {}

    @Get()
    findAll(): Promise<IGameEntity[]> {
        return this.gamesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IGameEntity> {
        const result = await this.gamesService.findOne(id);

        if (!result) {
            throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
        }

        return result;
    }

    @Post()
    async create(@Body(new ValidationPipe({transform: true})) createGameDto: CreateGameDto, @Res() res) {
        if (!createGameDto.player1 || !createGameDto.player1) {
            // todo: once metatype gets fixed, remove this as ValidationPipe should just work
            throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
        }

        const game: IGameEntity = await this.gamesService.create(createGameDto);

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

    @HttpCode(204)
    @Delete(':id')
    async delete(@Param('id') id) {
        return this.gamesService.delete(id);
    }
}
