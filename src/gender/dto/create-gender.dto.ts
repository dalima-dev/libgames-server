import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateGenderDto {
  @IsString({ message: 'Name is not a string!' })
  @Length(10, 200)
  @ApiProperty({
    description: 'Name of the gender.',
    example: 'Action',
  })
  name: string;
}
