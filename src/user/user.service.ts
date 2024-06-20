import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { checkUserHasAccount, checkuserIsAdmin } from 'src/utils/checkUser';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async GetMyAssets(userId: string) {
    await checkUserHasAccount(userId);

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        firstName: true,
        lastName: true,
        dollarAvailables: true,
        pseudo: true,
        age: true,
        UserHasCrypto: {
          select: {
            Crypto: true,
            amount: true,
            id: true,
          },
        },
      },
    });
    return user;
  }

  async GetUsersAssets(userId: string) {
    await checkuserIsAdmin(userId);

    const user = await this.prisma.user.findMany({
      select: {
        firstName: true,
        lastName: true,
        pseudo: true,
        dollarAvailables: true,
        UserHasCrypto: {
          select: {
            Crypto: true,
            amount: true,
          },
        },
      },
      take: 50,
      orderBy: {
        dollarAvailables: 'desc',
      },
    });
    return user;
  }

  async GetMyTrades(userId: string) {
    await checkUserHasAccount(userId);
    const user = await this.prisma.trade.findMany({
      where: {
        OR: [{ id_giver: userId }, { id_receiver: userId }],
      },

      select: {
        Giver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            pseudo: true,
            dollarAvailables: true,
            city: true,
            email: true,
            age: true,
            created_at: true,
            updated_at: true,
            UserHasCrypto: true,
            Offer: true,
          },
        },
        Receiver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            pseudo: true,
            dollarAvailables: true,
            city: true,
            email: true,
            age: true,
            created_at: true,
            updated_at: true,
            UserHasCrypto: true,
            Offer: true,
          },
        },
        Crypto: true,
        id: true,
        id_giver: true,
        id_receiver: true,
        id_crypto: true,
        amount_traded: true,
        created_at: true,
        updated_at: true,
      },
    });
    return user;
  }
}
