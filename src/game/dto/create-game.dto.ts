import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsNumberString,
  IsPositive,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class createGameDto {
  @IsString({ message: 'Title is not a string!' })
  @Length(2, 30)
  @ApiProperty({
    description: 'Title of the game.',
    example: 'Bloodborne.',
  })
  title: string;

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
}
