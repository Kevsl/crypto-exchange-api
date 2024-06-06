import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
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
    type: String,
    description: 'Image for the cryptocurrency in ',
    example: 'https://myImage/com',
  })
  @IsString()
  image: string;
}
