import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { checkUserHasAccount, checkuserIsAdmin } from 'src/utils/checkUser';
import { TradeDto } from './dto';
@Injectable()
export class TradeService {
  constructor(private prisma: PrismaService) {}

  async getTrades(userId: string) {
    await checkuserIsAdmin(userId);

    return this.prisma.trade.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        Giver: true,
        Receiver: true,
        Crypto: true,
      },
    });
  }
  async getLastTrades() {
    return this.prisma.trade.findMany({
      orderBy: {
        created_at: 'desc',
      },
      select: {
        amount_traded: true,
        Crypto: true,
      },
    });
  }

  async createTrade(userId: string, dto: TradeDto) {
    await checkUserHasAccount(userId);

    const offer = await this.prisma.offer.findUnique({
      where: {
        id: dto.id_offer,
      },
    });
    const crypto = await this.prisma.crypto.findFirst({
      where: {
        id: offer.id_crypto,
      },
    });

    const buyer = await this.prisma.user.findFirst({
      where: {
        id: offer.id_user,
      },
    });

    const price = crypto.value * offer.amount;
    if (buyer.dollarAvailables < price) {
      throw new ForbiddenException(
        `Acqueror ${buyer.pseudo} doesnt have enough money to make this trade`,
      );
    }

    const asset = await this.prisma.userHasCrypto.findFirst({
      where: {
        id_crypto: offer.id_crypto,
        id_user: offer.id_user,
      },
    });

    if (!asset || asset.amount < offer.amount) {
      throw new ForbiddenException(`Seller doesnt have enough ${crypto.name} `);
    }

    const trade = await this.prisma.trade.create({
      data: {
        id_giver: offer.id_user,
        id_receiver: userId,
        id_crypto: offer.id_crypto,
        amount_traded: offer.amount,
      },
    });

    const newBalanceGiver = (asset.amount -= offer.amount);
    await this.prisma.userHasCrypto.update({
      where: {
        id: asset.id,
      },
      data: {
        amount: newBalanceGiver,
      },
    });

    const receiverAssets = await this.prisma.userHasCrypto.findFirst({
      where: {
        id_user: userId,
        id_crypto: offer.id_crypto,
      },
    });
    if (!receiverAssets) {
      await this.prisma.userHasCrypto.create({
        data: {
          id_user: userId,
          id_crypto: offer.id_crypto,
          amount: offer.amount,
          createdAt: new Date(),
        },
      });
    } else {
      const newBalanceReceiver = receiverAssets.amount + offer.amount;
      await this.prisma.userHasCrypto.update({
        where: {
          id: receiverAssets.id,
        },
        data: {
          amount: newBalanceReceiver,
        },
      });
    }

    const newValue = crypto.value * 1.1;

    await this.prisma.crypto.update({
      where: {
        id: crypto.id,
      },
      data: {
        value: newValue,
      },
    });

    const prevAmount = buyer.dollarAvailables;

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        dollarAvailables: prevAmount - price,
      },
    });
    await this.prisma.offer.delete({
      where: {
        id: offer.id,
      },
    });
    return trade;
  }
}
