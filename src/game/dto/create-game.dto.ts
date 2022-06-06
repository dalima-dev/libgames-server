import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsUrl,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateGameGenderDto } from './create-game-gender.dto';

export class CreateGameDto {
  @IsString({ message: 'Title is not a string!' })
  @Length(2, 30)
  @ApiProperty({
    description: 'Title of the game.',
    example: 'Bloodborne',
  })
  title: string;

  @IsUrl({ message: 'Cover Image Url is not a url or string!' })
  @ApiProperty({
    description: 'URL of game image.',
    example: 'https://m.media-amazon.com/images/I/91u+hPR8NTL._AC_SX425_.jpg',
  })
  coverImageUrl: string;

  @IsString({ message: 'Description is not a string!' })
  @Length(10, 200)
  @ApiProperty({
    description: 'Description of the game.',
    example: 'An adventure game with great story and gameplay.',
  })
  description: string;

  @IsNumber({}, { message: 'Year is not a number!' })
  @Min(1970)
  @ApiProperty({
    description: 'Release year.',
    example: '2015',
  })
  year: number;

  @IsNumber({}, { message: 'ImdbScore is not a number!' })
  @Min(0)
  @Max(5)
  @ApiProperty({
    description: 'Imdb Score',
    example: '3',
  })
  imdbScore: number;

  @IsUrl({ message: 'Trailer URL is not a url or string!' })
  @ApiProperty({
    description: 'Trailer URL of the game.',
    example: 'https://youtube.com',
  })
  trailerYoutubeUrl: string;

  @IsUrl({ message: 'Gameplay URL is not a url or string!' })
  @ApiProperty({
    description: 'Gameplay URL of the game.',
    example: 'https://youtube.com',
  })
  gameplayYoutubeUrl: string;

  @ValidateNested({
    each: true,
  })
  @Type(() => CreateGameGenderDto)
  @ApiProperty({
    description: 'List all genders of this game.',
    type: [CreateGameGenderDto],
  })
  genders: CreateGameGenderDto[];
}
