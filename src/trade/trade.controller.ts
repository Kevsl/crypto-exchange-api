import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { TradeService } from './trade.service';
import { TradeDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@ApiTags('trade')
@Controller('trade')
export class TradeController {
  constructor(private tradeService: TradeService) {}

  @Get('/all')
  getAllPromoCodes(@GetUser() user: User) {
    return this.tradeService.getTrades(user.id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  createPromoCode(
    // @GetUser() user: User,
    @Body()
    dto: TradeDto,
    @GetUser() user: User,
  ) {
    return this.tradeService.createTrade(user.id, dto);
  }
}
