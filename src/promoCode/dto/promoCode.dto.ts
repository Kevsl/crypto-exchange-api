import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
export class PromoCodeDto {
  @ApiProperty({
    type: String,
    description: 'Name of the PromoCOde',
    example: 'FILOU10',
  })
  @MinLength(1)
  @MaxLength(50)
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'Dollars given for account creation when promoCode applied',
    example: 100,
  })
  @IsPositive()
  @Min(1)
  @Max(3000)
  @IsNumber()
  value: number;
}
