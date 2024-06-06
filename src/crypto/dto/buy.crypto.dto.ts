import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
export class BuyCryptoDto {
  @ApiProperty({
    type: String,
    description: 'Cryptocurrency UUID',
    example: '12121-DSZD-E221212-2121221',
  })
  @IsString()
  id_crypto: string;

  @ApiProperty({
    type: Number,
    description: 'Amount of token traded',
    example: 2,
  })
  @IsNumber()
  amount: number;
}
