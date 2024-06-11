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
        UserHasCrypto: {
          select: {
            Crypto: true,
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
      take: 20,
    });
    return user;
  }

  async GetMyTrades(userId: string) {
    await checkUserHasAccount(userId);
    const user = await this.prisma.trade.findMany({
      where: {
        OR: [{ id_giver: userId }, { id_receiver: userId }],
      },
      include: {
        Crypto: true,
      },
    });
    return user;
  }
}
