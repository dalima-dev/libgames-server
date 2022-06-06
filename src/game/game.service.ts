import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  gameSelect = {
    id: true,
    title: true,
    coverImageUrl: true,
    description: true,
    year: true,
    imdbScore: true,
    trailerYoutubeUrl: true,
    gameplayYoutubeUrl: true,
    genders: {
      select: {
        gender: {
          select: {
            name: true,
          },
        },
      },
    },
  };

  findAll(): Promise<Game[]> {
    return this.prisma.game.findMany({ select: this.gameSelect });
  }

  async findById(id: string): Promise<Game> {
    const record: Game = await this.prisma.game.findUnique({
      where: { id },
      select: this.gameSelect,
    });
    if (!record)
      throw new NotFoundException(`Register with id ${id} not found!`);
    return record;
  }

  findOne(id: string): Promise<Game> {
    return this.findById(id);
  }

  create(createGameDto: CreateGameDto): Promise<Game> {
    const data: Prisma.GameCreateInput = {
      ...createGameDto,
      genders: {
        createMany: {
          data: createGameDto.genders.map((gender) => ({
            genderId: gender.genderId,
          })),
        },
      },
    };
    return this.prisma.game
      .create({
        data,
        select: this.gameSelect,
      })
      .catch(handleError);
  }

  update(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    this.findById(id);
    const data: Prisma.GameUpdateInput = {
      ...updateGameDto,
      genders: {
        createMany: {
          data: updateGameDto.genders.map((gender) => ({
            genderId: gender.genderId,
          })),
        },
      },
    };
    return this.prisma.game.update({
      where: { id },
      data,
      select: this.gameSelect,
    });
  }

  delete(id: string): Promise<Game> {
    this.findById(id);
    return this.prisma.game.delete({ where: { id } });
  }
}
