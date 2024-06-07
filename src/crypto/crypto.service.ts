import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { checkUserHasAccount, checkuserIsAdmin } from 'src/utils/checkUser';
import { CryptoDto } from './dto';
import { BuyCryptoDto } from './dto/buy.crypto.dto';
@Injectable()
export class CryptoService {
  constructor(private prisma: PrismaService) {}

  async getCryptos(userId: string) {
    await checkUserHasAccount(userId);

    return this.prisma.crypto.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }
  async searchCryptos(userId: string, cryptoName: string) {
    await checkUserHasAccount(userId);

    return this.prisma.crypto.findMany({
      where: {
        name: {
          contains: cryptoName,
          mode: 'insensitive',
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async createCrypto(userId: string, dto: CryptoDto) {
    await checkuserIsAdmin(userId);

    const crypto = await this.prisma.crypto.create({
      data: {
        name: dto.name,
        image: dto.image,
        value: dto.value,
      },
    });

    return crypto;
  }

  async buyCrypto(userId: string, dto: BuyCryptoDto) {
    const crypto = await this.prisma.crypto.findFirst({
      where: {
        id: dto.id_crypto,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    const necessaryAmount = crypto.value * dto.amount;
    console.log(necessaryAmount, user.dollarAvailables);

    if (necessaryAmount > user.dollarAvailables) {
      throw new ForbiddenException('Make money first :) ');
    } else {
      const userAsset = await this.prisma.userHasCrypto.findFirst({
        where: {
          id_crypto: dto.id_crypto,
          id_user: userId,
        },
      });
      const newBalance = user.dollarAvailables - necessaryAmount;
      console.log(newBalance);

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          dollarAvailables: newBalance,
        },
      });
      if (userAsset) {
        const newBalance = userAsset.amount + dto.amount;
        await this.prisma.userHasCrypto.update({
          where: {
            id: userAsset.id,
          },
          data: {
            amount: newBalance,
          },
        });
      } else {
        await this.prisma.userHasCrypto.create({
          data: {
            id_crypto: dto.id_crypto,
            id_user: userId,
            amount: dto.amount,
          },
        });
      }
    }
    const newCryptoValue = crypto.value * 1.1;
    await this.prisma.crypto.update({
      where: {
        id: dto.id_crypto,
      },
      data: {
        value: newCryptoValue,
      },
    });

    return crypto;
  }
  async editCryptoById(userId: string, cryptoId: string, dto: CryptoDto) {
    await checkuserIsAdmin(userId);

    const crypto = await this.prisma.crypto.findUnique({
      where: {
        id: cryptoId,
      },
    });

    if (!crypto || crypto.id !== cryptoId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.crypto.update({
      where: {
        id: crypto.id,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteCryptoById(userId: string, id: string) {
    await checkuserIsAdmin(userId);

    const crypto = await this.prisma.crypto.findUnique({
      where: {
        id: id,
      },
    });

    if (!crypto || crypto.id !== id)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.crypto.delete({
      where: {
        id: crypto.id,
      },
    });
  }
}
