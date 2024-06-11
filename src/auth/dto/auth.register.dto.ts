import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
export class AuthRegisterDto {
  @ApiProperty({
    type: String,
    description: 'FirstName',
    example: 'Thomas',
  })
  @MinLength(1)
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Last Name',
    example: 'Anderson',
  })
  @MinLength(1)
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'Pseudo',
    example: 'Néo',
  })
  @MinLength(1)
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  pseudo: string;

  @ApiProperty({
    type: String,
    description: 'User city',
    example: 'Aix les bains',
  })
  @MinLength(1)
  @MaxLength(70)
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    type: String,
    description: 'email',
    example: 'neo@matrix.fr',
  })
  @MaxLength(255)
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

  @ApiProperty({
    type: Number,
    description: 'age',
    example: 20,
  })
  @IsInt()
  @Min(0)
  @Max(120)
  age: number;
}
