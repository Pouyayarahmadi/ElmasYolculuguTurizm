"use strict";
console.log("Test başlıyor...");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testDb() {
  try {
    const messages = await prisma.contactMessage.findMany();
    console.log('Veritabanı bağlantısı başarılı!');
    console.log('Mesajlar:', messages);
  } catch (error) {
    console.error('Veritabanı bağlantı hatası:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testDb(); 