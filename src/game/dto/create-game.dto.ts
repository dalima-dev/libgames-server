import { IsDateString, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class createGameDto {
  @IsString({ message: 'Title is not a string!' })
  @Length(2, 30)
  title: string;

  @IsString({ message: 'Description is not a string!' })
  @Length(10, 200)
  description: string;

  @IsString({ message: 'Year is not a string!' })
  @IsDateString()
  year: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  imdbScore: number;
}
