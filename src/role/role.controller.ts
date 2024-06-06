import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  //   UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
// import { JwtGuard } from '../auth/guard';
import { RoleDto } from './dto';
import { RoleService } from './role.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get('/all')
  getAllRoles(@GetUser() user: User) {
    return this.roleService.getRolesAdmin(user.id);
  }
  // @Get('/cm/all')
  // getRolesCm(@GetUser() user: User) {
  //     return this.roleService.getRolesCm(user)
  // }

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  createRole(
    // @GetUser() user: User,
    @Body()
    dto: RoleDto,
    @GetUser() user: User,
  ) {
    return this.roleService.createRole(user.id, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/update/:id')
  editRoleById(
    @Param('id') roleId: string,
    @Body() dto: RoleDto,
    @GetUser() user: User,
  ) {
    return this.roleService.editRoleById(user.id, roleId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/delete/:id')
  deleteRoleById(@Param('id') roleId: string, @GetUser() user: User) {
    return this.roleService.deleteRoleById(user.id, roleId);
  }
}
