import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: "User's nickname.",
    example: 'dalima',
  })
  nickname: string;

  @IsEmail()
  @ApiProperty({
    description: "User's email",
    example: 'dalima.dev@gmail.com',
  })
  email: string;

  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak.',
  })
  @ApiProperty({
    description: `User's password.`,
    example: 'Abcd@1234',
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'Password confirmation.',
    example: 'Abcd@1234',
  })
  confirmPassword: string;

  @IsString()
  @ApiProperty({
    description: `User's CPF.`,
    example: '10999265482',
  })
  cpf: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Is user an administrator?',
    example: true,
  })
  isAdmin: boolean;
}
