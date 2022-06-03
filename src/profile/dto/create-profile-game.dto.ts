import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateProfileGameDto {
  @IsUUID()
  @ApiProperty({
    description: 'Game ID.',
    example: 'Place a favorite game ID here.',
  })
  gameId: string;

  @IsString()
  @ApiProperty({
    description: 'Title of game.',
    example: 'Bloodborne',
  })
  gameTitle: string;
}
