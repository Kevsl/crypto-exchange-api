import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PromoCodeDto } from './dto';
import { checkuserIsAdmin } from 'src/utils/checkUser';
@Injectable()
export class PromoCodeService {
  constructor(private prisma: PrismaService) {}

  async getPromoCodes(userId: string) {
    await checkuserIsAdmin(userId);

    return this.prisma.promoCode.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
        value: true,
      },
    });
  }

  async createPromoCode(userId: string, dto: PromoCodeDto) {
    await checkuserIsAdmin(userId);

    const promoCode = await this.prisma.promoCode.create({
      data: {
        name: dto.name,
        value: dto.value,
      },
    });

    return promoCode;
  }
  async editPromoCodeById(
    userId: string,
    promoCodeId: string,
    dto: PromoCodeDto,
  ) {
    await checkuserIsAdmin(userId);

    const promoCode = await this.prisma.promoCode.findUnique({
      where: {
        id: promoCodeId,
      },
    });

    if (!promoCode || promoCode.id !== promoCodeId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.promoCode.update({
      where: {
        id: promoCode.id,
      },
      data: {
        ...dto,
      },
    });
  }
  async deletePromoCodeById(userId: string, id: string) {
    await checkuserIsAdmin(userId);

    const promoCode = await this.prisma.promoCode.findUnique({
      where: {
        id: id,
      },
    });

    if (!promoCode || promoCode.id !== id)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.promoCode.delete({
      where: {
        id: promoCode.id,
      },
    });
  }
}
