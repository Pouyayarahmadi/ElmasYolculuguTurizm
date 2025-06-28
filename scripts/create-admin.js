import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.admin.create({
    data: {
      username: 'admin',
      password: '123456' // Not: Gerçek projede şifreyi hash'le
    },
  });
}

main()
  .then(() => console.log('✅ Admin created'))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect()); 