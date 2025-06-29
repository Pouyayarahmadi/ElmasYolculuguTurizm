const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addTestMessages() {
  try {
    // Test mesajları ekle
    const messages = [
      {
        name: 'Test Kullanıcı 1',
        email: 'test1@example.com',
        phone: '+90 555 123 4567',
        message: 'Bu bir test mesajıdır. Hizmetleriniz hakkında bilgi almak istiyorum.'
      },
      {
        name: 'Test Kullanıcı 2',
        email: 'test2@example.com',
        phone: '+90 555 987 6543',
        message: 'Döviz alım satımı hakkında detaylı bilgi alabilir miyim?'
      },
      {
        name: 'Test Kullanıcı 3',
        email: 'test3@example.com',
        phone: '+90 555 456 7890',
        message: 'Otel rezervasyonu yapmak istiyorum. Fiyat bilgisi alabilir miyim?'
      }
    ];

    for (const message of messages) {
      await prisma.contactMessage.create({
        data: message
      });
      console.log(`Mesaj eklendi: ${message.name}`);
    }

    console.log('Tüm test mesajları başarıyla eklendi!');
  } catch (error) {
    console.error('Hata:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addTestMessages(); 