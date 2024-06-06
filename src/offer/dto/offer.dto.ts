import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
export class OfferDto {
  @ApiProperty({
    type: String,
    description: 'Cryptocurrency UUID',
    example: '12121-DSZD-E221212-2121221',
  })
  @IsString()
  id_crypto: string;

  @ApiProperty({
    type: 'number',

    description: 'Amount traded ',
    example: 21,
  })
  @IsNumber()
  amount: number;
}
