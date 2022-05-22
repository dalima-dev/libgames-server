import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateGameDto {
  @IsString({ message: 'Title is not a string!' })
  @Length(2, 30)
  @ApiProperty({
    description: 'Title of the game.',
    example: 'Bloodborne',
  })
  title: string;

  @IsString({ message: 'Cover Image URL is not a string!' })
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

  @IsString({ message: 'Trailer URL is not a string!' })
  @ApiProperty({
    description: 'Trailer URL of the game.',
    example: 'https://youtube.com',
  })
  trailerYoutubeUrl: string;

  @IsString({ message: 'Gameplay URL is not a string!' })
  @ApiProperty({
    description: 'Gameplay URL of the game.',
    example: 'https://youtube.com',
  })
  gameplayYoutubeUrl: string;
}
