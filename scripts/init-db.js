import { mkdir } from 'fs/promises';  // برای ایجاد پوشه
import { join } from 'path';           // برای تنظیم مسیر فایل دیتابیس
import { openDb, closeDb } from '../src/lib/db.js';  // برای دسترسی به db

async function init() {
  try {
    // ایجاد پوشه دیتابیس در صورتی که وجود نداشته باشد
    await mkdir(join(process.cwd(), 'database'), { recursive: true });

    const db = openDb();  // باز کردن دیتابیس (بدون await چون سینک است)

    // ایجاد جدول در صورت عدم وجود آن
    db.exec(`
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price REAL
      )
    `);

    // Clear existing data
    db.exec('DELETE FROM items');

    // داده‌های اولیه را به جدول وارد می‌کنیم
    const items = [
      ['USD', 28.5],
      ['EUR', 30.1],
      ['TRY', 1.0]
    ];

    const insert = db.prepare('INSERT INTO items (name, price) VALUES (?, ?)');  // آماده‌سازی دستور insert
    
    // Use a transaction for better performance
    db.transaction(() => {
      for (const [name, price] of items) {
        insert.run(name, price);  // درج داده‌ها
      }
    })();

    console.log('✅ Database initialized successfully!');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  } finally {
    closeDb(); // Make sure to close the database connection
  }
}

init();