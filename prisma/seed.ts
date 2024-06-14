import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();

  await this.prisma.role.create({
    name: 'user',
  });
  await this.prisma.role.create({
    name: 'admin',
  });

  await this.prisma.promoCode.create({
    name: 'PROMO1000',
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
