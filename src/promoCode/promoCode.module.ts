import { Module } from '@nestjs/common';
import { PromoCodeController } from './promoCode.controller';
import { PromoCodeService } from './promoCode.service';

@Module({
  providers: [PromoCodeService],
  controllers: [PromoCodeController],
})
export class PromoCodeModule {}
