import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RoleModule } from './role/role.module';
import { PromoCodeModule } from './promoCode/promoCode.module';
import { CryptoModule } from './crypto/crypto.module';
import { TradeModule } from './trade/trade.module';
import { OfferModule } from './offer/offer.module';
import { UserModule } from './user/user.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    RoleModule,
    PromoCodeModule,
    CryptoModule,
    TradeModule,
    OfferModule,
    UserModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 40,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
