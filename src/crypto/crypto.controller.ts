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
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CryptoService } from './crypto.service';
import { CryptoDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { BuyCryptoDto } from './dto/buy.crypto.dto';

@UseGuards(JwtGuard)
@ApiTags('crypto')
@Controller('crypto')
export class CryptoController {
  constructor(private promoService: CryptoService) {}

  @Get('/all')
  getAllPromoCodes(@GetUser() user: User) {
    return this.promoService.getCryptos(user.id);
  }
  @Get('/search/:name')
  searchCrypto(@GetUser() user: User, @Param('name') cryptoName: string) {
    return this.promoService.searchCryptos(user.id, cryptoName);
  }

  @Get('/history/:id')
  CryptoHistory(@GetUser() user: User, @Param('id') cryptoId: string) {
    return this.promoService.getCryptoHistory(user.id, cryptoId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  createPromoCode(
    @Body()
    dto: CryptoDto,
    @GetUser() user: User,
  ) {
    return this.promoService.createCrypto(user.id, dto);
  }
  @Post('/buy')
  buyCrypto(
    @Body()
    dto: BuyCryptoDto,
    @GetUser() user: User,
  ) {
    return this.promoService.buyCrypto(user.id, dto);
  }
}
