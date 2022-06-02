import {
  HttpCode,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Game[]> {
    return this.prisma.game.findMany();
  }

  async findById(id: string): Promise<Game> {
    const record: Game = await this.prisma.game.findUnique({ where: { id } });
    if (!record)
      throw new NotFoundException(`Register with id ${id} not found!`);
    return record;
  }

  findOne(id: string): Promise<Game> {
    return this.findById(id);
  }

  create(createGameDto: CreateGameDto): Promise<Game> {
    const data: Game = { ...createGameDto };
    return this.prisma.game.create({ data }).catch(handleError);
  }

  update(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    this.findById(id);
    const data: Partial<Game> = { ...updateGameDto };
    return this.prisma.game.update({ where: { id }, data });
  }

  delete(id: string): Promise<Game> {
    this.findById(id);
    return this.prisma.game.delete({ where: { id } });
  }
}
