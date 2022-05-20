import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Game } from './dto/create-game.dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  findAll() {
    return this.gameService.findAll();
  }

  @Get()
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(id);
  }

  @Post()
  create(@Body() dto: Game) {
    return this.gameService.create(dto);
  }

  @Patch()
  update(@Param('id') id: string, @Body() dto) {
    return this.gameService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.gameService.delete(id);
  }
}
