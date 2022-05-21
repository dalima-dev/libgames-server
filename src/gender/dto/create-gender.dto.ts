import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateGenderDto {
  @IsString({ message: 'Name is not a string!' })
  @Length(3, 15)
  @ApiProperty({
    description: 'Name of the gender.',
    example: 'Action',
  })
  name: string;
}
