import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.create({
    data: {
      name: 'user',
    },
  });
  await prisma.role.create({
    data: {
      name: 'admin',
    },
  });

  await prisma.promoCode.create({
    data: {
      name: 'PROMO1000',
      value: 1000,
    },
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
