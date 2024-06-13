import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { checkUserHasAccount, checkuserIsAdmin } from 'src/utils/checkUser';
import { OfferDto } from './dto';
@Injectable()
export class OfferService {
  constructor(private prisma: PrismaService) {}

  async getOffers(userId: string) {
    await checkUserHasAccount(userId);
    return this.prisma.offer.findMany({
      orderBy: {
        created_at: 'desc',
      },
      select: {
        id: true,
        User: {
          select: {
            pseudo: true,
          },
        },
        amount: true,
        created_at: true,
        id_user: true,
        Crypto: true,
      },
    });
  }

  async createOffer(userId: string, dto: OfferDto) {
    await checkUserHasAccount(userId);

    const userAssets = await this.prisma.userHasCrypto.findFirst({
      where: {
        id: userId,
        Crypto: {
          id: dto.id_crypto,
        },
      },
    });
    if (userAssets.amount < dto.amount) {
      throw new ForbiddenException('Insuficient tokens avaiblable');
    }

    const offer = await this.prisma.offer.create({
      data: {
        id_crypto: dto.id_crypto,
        id_user: userId,
        amount: dto.amount,
      },
    });

    return offer;
  }
  async editOfferById(userId: string, offerId: string, dto: OfferDto) {
    await checkUserHasAccount(userId);

    const offer = await this.prisma.offer.findUnique({
      where: {
        id: offerId,
      },
    });

    const crypto = await this.prisma.crypto.findUnique({
      where: {
        id: dto.id_crypto,
      },
    });
    if (!crypto || !crypto.id) {
      throw new ForbiddenException('Crypto doesnt exist');
    }

    if (!offer || offer.id !== offerId)
      throw new ForbiddenException('Offer id mandatory');

    return this.prisma.offer.update({
      where: {
        id: offerId,
      },
      data: {
        ...dto,
      },
    });
  }
  async deleteOfferById(userId: string, id: string) {
    await checkuserIsAdmin(userId);

    const offer = await this.prisma.offer.findUnique({
      where: {
        id: id,
      },
    });

    if (!offer || offer.id !== id)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.offer.delete({
      where: {
        id: id,
      },
    });
  }
}
