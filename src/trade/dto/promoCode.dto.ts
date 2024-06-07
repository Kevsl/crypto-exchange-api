import { IsInt, IsString } from 'class-validator';

export class PromoCodeDto {
  @IsString()
  name: string;

  @IsInt()
  value: number;
}
