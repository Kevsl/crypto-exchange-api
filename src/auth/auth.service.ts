import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthLoginDto, AuthRegisterDto } from './dto';
import * as argon from 'argon2';
import { Prisma, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthRegisterDto) {
    const hash = await argon.hash(dto.password);
    const promoCode = await this.prisma.promoCode.findFirst({
      where: {
        name: dto.promoCode,
      },
    });

    const userRole = await this.prisma.role.findFirst({
      where: {
        name: 'user',
      },
    });

    let balance = 1000;
    if (promoCode && promoCode.value) {
      balance += promoCode.value;
    }
    try {
      const user = await this.prisma.user.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          pseudo: dto.pseudo,
          city: dto.city,
          email: dto.email,
          hash,
          roleId: userRole.id,
          isActive: true,
          dollarAvailables: balance,
        },
      });

      return this.signToken(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthLoginDto) {
    const userDatas = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      include: {
        UserHasCrypto: {
          include: { Crypto: true },
        },
        Role: true,
      },
    });
    if (!userDatas) throw new ForbiddenException('Credentials incorrect');

    const pwMatches = await argon.verify(userDatas.hash, dto.password);
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    return this.signToken(userDatas);
  }

  async signToken(user: any): Promise<{ access_token: string; user: User }> {
    const payload = {
      sub: user.id,
      email: user.email,
    };
    user.hash = null;

    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30d',
      secret: secret,
    });

    return {
      access_token: token,
      user,
    };
  }
}
