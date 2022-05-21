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

  async findAll(): Promise<Game[]> {
    return await this.prisma.game.findMany();
  }

  async findById(id: string): Promise<Game> {
    const data = await this.prisma.game.findUnique({ where: { id } });
    if (!data) throw new NotFoundException(`Register with id ${id} not found!`);
    return data;
  }

  findOne(id: string): Promise<Game> {
    return this.findById(id);
  }

  async create(dto: CreateGameDto) {
    const data: Game = { ...dto };
    return await this.prisma.game.create({ data }).catch(this.handleError);
  }

  handleError(error: Error) {
    console.log(error);
  }

  async update(id: string, dto: UpdateGameDto) {
    await this.findById(id);
    const data: Partial<Game> = { ...dto };
    return await this.prisma.game.update({ where: { id }, data });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(id: string) {
    await this.findById(id);
    await this.prisma.game.delete({ where: { id } });
  }
}
