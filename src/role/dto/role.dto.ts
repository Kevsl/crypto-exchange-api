import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class RoleDto {
  @ApiProperty({
    type: String,
    description: 'Role Name',
    example: 'user',
  })
  @IsString()
  name: string;
}
