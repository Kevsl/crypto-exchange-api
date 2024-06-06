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
import { PromoCodeDto } from './dto';
import { PromoCodeService } from './promoCode.service';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@ApiTags('promoCode')
@Controller('promoCode')
export class PromoCodeController {
  constructor(private promoService: PromoCodeService) {}

  @Get('/all')
  getAllPromoCodes(@GetUser() user: User) {
    return this.promoService.getPromoCodes(user.id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  createPromoCode(
    // @GetUser() user: User,
    @Body()
    dto: PromoCodeDto,
    @GetUser() user: User,
  ) {
    return this.promoService.createPromoCode(user.id, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/update/:id')
  editPromoCodeById(
    @Param('id') promoCodeId: string,
    @Body() dto: PromoCodeDto,
    @GetUser() user: User,
  ) {
    return this.promoService.editPromoCodeById(user.id, promoCodeId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/delete/:id')
  deletePromoCodeById(@Param('id') promoCodeId: string, @GetUser() user: User) {
    return this.promoService.deletePromoCodeById(user.id, promoCodeId);
  }
}
