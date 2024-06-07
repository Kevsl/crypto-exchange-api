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
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { OfferService } from './offer.service';
import { OfferDto } from './dto';

@UseGuards(JwtGuard)
@ApiTags('offer')
@Controller('offer')
export class OfferController {
  constructor(private offerService: OfferService) {}

  @Get('/all')
  getAllRoles(@GetUser() user: User) {
    return this.offerService.getOffers(user.id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  createRole(
    @Body()
    dto: OfferDto,
    @GetUser() user: User,
  ) {
    return this.offerService.createOffer(user.id, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/update/:id')
  editOfferById(
    @Param('id') offerId: string,
    @Body() dto: OfferDto,
    @GetUser() user: User,
  ) {
    return this.offerService.editOfferById(user.id, offerId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/delete/:id')
  deleteOfferById(@Param('id') roleId: string, @GetUser() user: User) {
    return this.offerService.deleteOfferById(user.id, roleId);
  }
}
