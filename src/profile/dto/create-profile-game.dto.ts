import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateProfileGameDto {
  @IsUUID()
  @ApiProperty({
    description: 'Game ID.',
    example: 'Place a favorite game ID here.',
  })
  gameId: string;
}
