import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateGameGenderDto {
  @IsUUID()
  @ApiProperty({
    description: 'Gender ID.',
    example: 'Place a gender ID here.',
  })
  genderId: number;
}
