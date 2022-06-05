import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleError } from 'src/utils/handle-error.util';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  profileSelect = {
    favoriteGames: {
      select: {
        game: {
          select: {
            title: true,
          },
        },
      },
    },
    title: true,
    imageUrl: true,
    user: {
      select: {
        nickname: true,
      },
    },
  };

  create(userId: string, createProfileDto: CreateProfileDto) {
    const data: Prisma.ProfileCreateInput = {
      ...createProfileDto,
      user: { connect: { id: userId } },
      favoriteGames: {
        createMany: {
          data: createProfileDto.favoriteGames.map((game) => ({
            gameId: game.gameId,
          })),
        },
      },
    };

    return this.prisma.profile
      .create({
        data,
        select: this.profileSelect,
      })
      .catch(handleError);
  }

  findAll(): Promise<Profile[]> {
    return this.prisma.profile.findMany();
  }

  async findById(id: number): Promise<Profile> {
    const record: Profile = await this.prisma.profile.findUnique({
      where: { id },
    });
    if (!record) throw new NotFoundException('Profile not found!');
    return record;
  }

  findOne(id: number): Promise<Profile> {
    return this.findById(id);
  }

  update(
    id: number,
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ) {
    this.findById(id);
    // const data: Partial<Profile> = { ...updateProfileDto };

    const data: Prisma.ProfileUpdateInput = {
      ...updateProfileDto,
      user: { connect: { id: userId } },
      favoriteGames: {
        createMany: {
          data: updateProfileDto.favoriteGames.map((game) => ({
            gameId: game.gameId,
          })),
        },
      },
    };

    return this.prisma.profile
      .update({ data, where: { id }, select: this.profileSelect })
      .catch(handleError);
  }

  delete(id: number): Promise<Profile> {
    this.findById(id);
    return this.prisma.profile.delete({ where: { id } });
  }
}
