import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
export class PromoCodeDto {
  @ApiProperty({
    type: String,
    description: 'Name of the PromoCOde',
    example: 'FILOU10',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'Dollars given for account creation when promoCode applied',
    example: 100,
  })
  @IsNumber()
  value: number;
}
