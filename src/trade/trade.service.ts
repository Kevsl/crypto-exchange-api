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

    const crypto = await this.prisma.crypto.findFirst({
      where: {
        id: dto.id_crypto,
      },
    });
    const buyer = await this.prisma.user.findFirst({
      where: {
        id: dto.id_receiver,
      },
    });
    const price = crypto.value * dto.amount_traded;
    if (buyer.dollarAvailables < price) {
      throw new ForbiddenException(
        // eslint-disable-next-line prettier/prettier
        `Acqueror ${buyer.pseudo} doesnt have enough money to make this trade`
      );
    }

    const asset = await this.prisma.userHasCrypto.findFirst({
      where: {
        id_crypto: dto.id_crypto,
        id_user: dto.id_giver,
      },
    });

    if (!asset || asset.amount < dto.amount_traded) {
      throw new ForbiddenException(`Seller doesnt have enough ${crypto.name} `);
    }

    const trade = await this.prisma.trade.create({
      data: {
        id_giver: dto.id_giver,
        id_receiver: dto.id_receiver,
        id_crypto: dto.id_crypto,
        amount_traded: dto.amount_traded,
        id_offer: dto.id_offer,
      },
    });

    const newBalanceGiver = (asset.amount -= dto.amount_traded);
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
        id_user: dto.id_receiver,
        id_crypto: dto.id_crypto,
      },
    });
    if (!receiverAssets) {
      await this.prisma.userHasCrypto.create({
        data: {
          id_user: dto.id_receiver,
          id_crypto: dto.id_crypto,
          amount: dto.amount_traded,
          createdAt: new Date(),
        },
      });
    } else {
      const newBalanceReceiver = receiverAssets.amount + dto.amount_traded;
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
        id: dto.id_receiver,
      },
      data: {
        dollarAvailables: prevAmount - price,
      },
    });
    return trade;
  }

  async editTradeById(userId: string, tradeId: string, dto: TradeDto) {
    await checkuserIsAdmin(userId);

    const trade = await this.prisma.trade.findUnique({
      where: {
        id: tradeId,
      },
    });

    if (!trade || trade.id !== tradeId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.trade.update({
      where: {
        id: trade.id,
      },
      data: {
        ...dto,
      },
    });
  }
  async deleteTradeById(userId: string, id: string) {
    await checkuserIsAdmin(userId);

    const trade = await this.prisma.trade.findUnique({
      where: {
        id: id,
      },
    });

    if (!trade || trade.id !== id)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.trade.delete({
      where: {
        id: trade.id,
      },
    });
  }
}
