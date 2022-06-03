import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsUrl, ValidateNested } from 'class-validator';
import { CreateProfileGameDto } from './create-profile-game.dto';

export class CreateProfileDto {
  @IsString()
  @ApiProperty({
    description: "Profile's title",
    example: 'dani',
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    description: 'Url image of profile.',
    example:
      'https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg',
  })
  imageUrl: string;

  @ValidateNested({
    each: true,
  })
  @Type(() => CreateProfileGameDto)
  @ApiProperty({
    description: 'List all favorite games of a profile.',
    type: [CreateProfileGameDto],
  })
  favoriteGames: CreateProfileGameDto[];
}
