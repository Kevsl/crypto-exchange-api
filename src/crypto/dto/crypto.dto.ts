import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl } from 'class-validator';
export class CryptoDto {
  @ApiProperty({
    type: String,
    description: 'Cryptocurrency name',
    example: 'BTC',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'Value for the cryptocurrency in $',
    example: 1,
  })
  @IsNumber()
  value: number;

  @ApiProperty({
    type: Number,
    description: 'Quantity of tokens available on the platform',
    example: 100,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    type: String,
    description: 'Image for the cryptocurrency in ',
    example: 'https://myImage/com',
  })
  @IsUrl()
  @IsString()
  image: string;
}
