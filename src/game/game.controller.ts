import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { createGameDto } from './dto/create-game.dto';
import { GameService } from './game.service';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  @ApiOperation({ summary: 'List all games.' })
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Show game by ID.' })
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new game.' })
  create(@Body() dto: createGameDto) {
    return this.gameService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update new game by ID.' })
  update(@Param('id') id: string, @Body() dto) {
    return this.gameService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a game by ID.' })
  delete(@Param('id') id: string) {
    return this.gameService.delete(id);
  }
}
