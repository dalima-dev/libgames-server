import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomeService {
  constructor(private readonly prisma: PrismaService) {}

  findAllGamesByGender() {
    return this.prisma.gender.findMany({
      include: {
        games: {
          select: {
            game: {
              select: {
                id: false,
                title: true,
                coverImageUrl: true,
                description: false,
                gameplayYoutubeUrl: false,
                trailerYoutubeUrl: false,
                imdbScore: false,
                year: false,
              },
            },
          },
        },
      },
    });
  }

  findAllProfilesByLoggedUser(userId: string) {
    return this.prisma.profile.findMany({
      where: { userId },
      select: {
        id: false,
        title: true,
        imageUrl: true,
        userId: false,
        favoriteGames: {
          select: {
            gameId: true,
            profileId: false,
          },
        },
      },
    });
  }
}
