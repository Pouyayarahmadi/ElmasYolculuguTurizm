import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Check if admin exists
  const existing = await prisma.admin.findFirst({
    where: { username: 'admin' }
  });

  if (existing) {
    console.log('🟡 Admin zaten mevcut.');
    return;
  }

  // Insert default admin user
  await prisma.admin.create({
    data: {
      username: 'admin',
      password: '123456'  // Not: Şifreyi ileride mutlaka hashleyin!
    }
  });

  console.log('✅ Admin oluşturuldu: admin / 123456');
}

main()
  .catch((e) => {
    console.error('❌ Admin oluşturulamadı:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  }); 