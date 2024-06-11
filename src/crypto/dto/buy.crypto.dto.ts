import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
export class BuyCryptoDto {
  @ApiProperty({
    type: String,
    description: 'Cryptocurrency UUID',
    example: '12121-DSZD-E221212-2121221',
  })
  @MinLength(1)
  @MaxLength(50)
  @IsString()
  @IsUUID()
  id_crypto: string;

  @ApiProperty({
    type: Number,
    description: 'Amount of token traded',
    example: 2,
  })
  @Min(1)
  @Max(1000)
  @IsNumber()
  amount: number;
}
