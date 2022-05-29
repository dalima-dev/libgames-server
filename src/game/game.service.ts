import {
  HttpCode,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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
    const data: Game = await this.prisma.game.findUnique({ where: { id } });
    if (!data) throw new NotFoundException(`Register with id ${id} not found!`);
    return data;
  }

  findOne(id: string): Promise<Game> {
    return this.findById(id);
  }

  create(dto: CreateGameDto): Promise<void | Game> {
    const data: Game = { ...dto };
    return this.prisma.game.create({ data }).catch(this.handleError);
  }

  handleError(error: Error) {
    console.log(error);
  }

  update(id: string, dto: UpdateGameDto): Promise<Game> {
    this.findById(id);
    const data: Partial<Game> = { ...dto };
    return this.prisma.game.update({ where: { id }, data });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  remove(id: string) {
    this.findById(id);
    return this.prisma.game.delete({ where: { id } });
  }
}
