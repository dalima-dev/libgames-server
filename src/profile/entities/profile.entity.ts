import { Game } from 'src/game/entities/game.entity';

export class Profile {
  id?: number;
  title: string;
  imageUrl: string;
  favoriteGames?: Game[];
}
