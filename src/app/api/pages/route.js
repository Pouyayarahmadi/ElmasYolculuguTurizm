import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// GET: Tüm sayfalar veya tek sayfa (slug ile)
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  try {
    if (slug) {
      const page = await prisma.page.findUnique({ where: { slug } });
      if (!page) {
        return new Response(JSON.stringify({ success: false, message: 'Sayfa bulunamadı.' }), { status: 404 });
      }
      return new Response(JSON.stringify({ success: true, data: page }), { status: 200 });
    } else {
      const pages = await prisma.page.findMany({ orderBy: { id: 'asc' } });
      return new Response(JSON.stringify({ success: true, data: pages }), { status: 200 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}

// POST: Yeni sayfa ekle
export async function POST(req) {
  try {
    const { slug, title, content } = await req.json();
    if (!slug || !title || !content) {
      return new Response(JSON.stringify({ success: false, message: 'Tüm alanlar zorunlu.' }), { status: 400 });
    }
    const page = await prisma.page.create({ data: { slug, title, content } });

    // --- YENİ: Dosya oluştur (sadece development ortamında) ---
    if (process.env.NODE_ENV !== 'production') {
      const dirPath = path.join(process.cwd(), 'src', 'app', slug);
      const filePath = path.join(dirPath, 'page.jsx');
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
      const fileContent = `"use client";\nimport Header from '@/components/Header';\nimport Footer from '@/components/Footer';\n\nexport default function Page() {\n  return (\n    <>\n      <Header />\n      <main className=\"max-w-3xl mx-auto p-6\">\n        <h1 className=\"text-2xl font-bold mb-4\">${title.replace(/`/g, '\`')}</h1>\n        <div className=\"prose\">${content.replace(/`/g, '\`')}</div>\n      </main>\n      <Footer />\n    </>\n  );\n}`;
      fs.writeFileSync(filePath, fileContent, 'utf8');
    }
    // --- SON ---

    return new Response(JSON.stringify({ success: true, data: page }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}

// PUT: Sayfa güncelle
export async function PUT(req) {
  try {
    const { id, slug, title, content } = await req.json();
    if (!id || !slug || !title || !content) {
      return new Response(JSON.stringify({ success: false, message: 'Tüm alanlar zorunlu.' }), { status: 400 });
    }
    const page = await prisma.page.update({ where: { id }, data: { slug, title, content } });
    return new Response(JSON.stringify({ success: true, data: page }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}

// DELETE: Sayfa sil
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) {
      return new Response(JSON.stringify({ success: false, message: 'id zorunlu.' }), { status: 400 });
    }
    await prisma.page.delete({ where: { id } });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
} 