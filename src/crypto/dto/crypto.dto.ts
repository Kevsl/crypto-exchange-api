import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
export class CryptoDto {
  @ApiProperty({
    type: String,
    description: 'Cryptocurrency name',
    example: 'BTC',
  })
  @MaxLength(50)
  @MinLength(1)
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'Value for the cryptocurrency in $',
    example: 1,
  })
  @Min(1)
  @Max(10000)
  @IsPositive()
  @IsNumber()
  value: number;

  @ApiProperty({
    type: Number,
    description: 'Quantity of tokens available on the platform',
    example: 100,
  })
  @Min(1)
  @Max(10000)
  @IsPositive()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    type: String,
    description: 'Image for the cryptocurrency in ',
    example: 'https://myImage/com',
  })
  @MaxLength(255)
  @IsUrl()
  @IsString()
  image: string;
}
