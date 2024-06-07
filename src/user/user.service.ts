import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { checkUserHasAccount } from 'src/utils/checkUser';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async GetMyAssets(userId: string) {
    await checkUserHasAccount(userId);

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        UserHasCrypto: true,
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
      include: {
        Crypto: true,
      },
    });
    return user;
  }
}
