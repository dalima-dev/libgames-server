import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateGameGenderDto {
  @IsInt()
  @ApiProperty({
    description: 'Gender ID.',
    example: 'Place a gender ID here.',
  })
  genderId: number;
}
