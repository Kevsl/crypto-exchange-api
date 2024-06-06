import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AuthLoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @ApiProperty({ type: String, description: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
