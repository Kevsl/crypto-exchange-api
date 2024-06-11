import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
export class RoleDto {
  @ApiProperty({
    type: String,
    description: 'Role Name',
    example: 'user',
  })
  @MinLength(1)
  @MaxLength(50)
  @IsString()
  name: string;
}
