import { Controller, Get, UseGuards } from '@nestjs/common';
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
    @GetUser()
    user: User,
  ) {
    return this.userService.GetMyAssets(user.id);
  }

  @Get('/users-assets')
  GetAlLAssets(
    @GetUser()
    user: User,
  ) {
    return this.userService.GetUsersAssets(user.id);
  }
  @Get('/my-trades')
  GetMyTrades(
    @GetUser()
    user: User,
  ) {
    return this.userService.GetMyTrades(user.id);
  }
}
