import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';
import { Game } from 'src/game/entities/game.entity';

export class CreateProfileDto {
  @IsString()
  @ApiProperty({
    description: "Profile's title",
    example: 'dani',
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    description: "Url image of profile.",
    example:
      'https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg',
  })
  imageUrl: string;

  // @ApiProperty({
  //   description: 'List all favorite games of a profile',
  //   type: [Game],
  // })
  // favoriteGames: Game[];
}
