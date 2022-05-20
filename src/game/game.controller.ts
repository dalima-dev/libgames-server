import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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
  create() {
    return this.gameService.create();
  }

  @Patch()
  update(@Param('id') id: string, data) {
    return this.gameService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.gameService.delete(id);
  }
}
