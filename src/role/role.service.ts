import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoleDto } from './dto';
import { checkuserIsAdmin } from 'src/utils/checkUser';
// import { checkRoleLevel, checkUserIsStaff } from 'src/utils/checkUser';
@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async getRolesAdmin(userId: string) {
    await checkuserIsAdmin(userId);
    return this.prisma.role.findMany({
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async createRole(userId: string, dto: RoleDto) {
    await checkuserIsAdmin(userId);
    const role = await this.prisma.role.create({
      data: {
        name: dto.name,
      },
    });

    return role;
  }
  async editRoleById(userId: string, roleId: string, dto: RoleDto) {
    await checkuserIsAdmin(userId);

    const role = await this.prisma.role.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role || role.id !== roleId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.role.update({
      where: {
        id: roleId,
      },
      data: {
        ...dto,
      },
    });
  }
  async deleteRoleById(userId: string, id: string) {
    await checkuserIsAdmin(userId);

    const role = await this.prisma.role.findUnique({
      where: {
        id: id,
      },
    });

    if (!role || role.id !== id)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.role.delete({
      where: {
        id: id,
      },
    });
  }
}
