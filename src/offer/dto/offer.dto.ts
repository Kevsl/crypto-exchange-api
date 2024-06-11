import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
export class OfferDto {
  @ApiProperty({
    type: String,
    description: 'Cryptocurrency UUID',
    example: '12121-DSZD-E221212-2121221',
  })
  @MaxLength(50)
  @IsString()
  @IsUUID()
  id_crypto: string;

  @ApiProperty({
    type: 'number',

    description: 'Amount traded ',
    example: 21,
  })
  @Min(1)
  @Max(1000)
  @IsNumber()
  @IsPositive()
  amount: number;
}
