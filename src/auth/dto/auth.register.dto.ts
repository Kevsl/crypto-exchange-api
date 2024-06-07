import { ApiProperty } from '@nestjs/swagger';
import {
  IsCreditCard,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
export class AuthRegisterDto {
  @ApiProperty({
    type: String,
    description: 'FirstName',
    example: 'Thomas',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Last Name',
    example: 'Anderson',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'Pseudo',
    example: 'Néo',
  })
  @IsNotEmpty()
  @IsString()
  pseudo: string;

  @ApiProperty({
    type: String,
    description: 'User city',
    example: 'Aix les bains',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    type: String,
    description: 'email',
    example: 'neo@matrix.fr',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'password',
    example: 'AAaa11&&&&',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    description: 'promoCode',
    example: 'FILOU20',
  })
  @IsOptional()
  promoCode: string;
}
