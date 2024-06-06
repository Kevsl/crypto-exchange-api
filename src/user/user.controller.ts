/* eslint-disable prettier/prettier */
import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@ApiTags('user')
@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/my-assets')
  GetMyAssets(
    @Body()
    @GetUser()
    user: User
  ) {
    return this.userService.GetMyAssets(user.id);
  }
  @Get('/my-trades')
  GetMyTrades(
    @Body()
    @GetUser()
    user: User
  ) {
    return this.userService.GetMyTrades(user.id);
  }
}
