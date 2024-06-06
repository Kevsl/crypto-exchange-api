import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';
export class TradeDto {
  @ApiProperty({
    type: String,
    description: 'UUID of the user that hold tokens before trade',
    example: '121212-DSDZ1-21212DJDZ-31313',
  })
  @IsNotEmpty()
  @IsString()
  id_giver: string;

  @ApiProperty({
    type: String,
    description: 'UUID of the user that will receive tokens after trade',
    example: '121212-DSDZ1-21212DJDZ-31313',
  })
  @IsNotEmpty()
  @IsString()
  id_receiver: string;

  @ApiProperty({
    type: String,
    description: 'UUID of the crypto traded',
    example: '121212-DSDZ1-21212DJDZ-31313',
  })
  @IsNotEmpty()
  @IsString()
  id_crypto: string;

  @ApiProperty({
    type: Number,
    description: 'Amount of tokens traded ',
    example: 2,
  })
  @IsNotEmpty()
  @IsDecimal()
  amount_traded: number;

  @ApiProperty({
    type: String,
    description: 'Offer UUID ',
    example: '121212-DSDZ1-21212DJDZ-31313',
  })
  @IsNotEmpty()
  @IsDecimal()
  id_offer: string;
}
