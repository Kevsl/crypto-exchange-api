import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
export class TradeDto {
  @ApiProperty({
    type: String,
    description: 'Offer UUID ',
    example: '121212-DSDZ1-21212DJDZ-31313',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  id_offer: string;
}
