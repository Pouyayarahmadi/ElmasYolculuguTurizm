import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
  const { pathname } = new URL(req.url);
  if (pathname.endsWith('/user-logins')) {
    try {
      const { email } = await req.json();
      if (!email) {
        return new Response(JSON.stringify({ success: false, message: 'Email zorunlu.' }), { status: 400 });
      }
      const login = await prisma.userLogin.create({ data: { email } });
      return new Response(JSON.stringify({ success: true, data: login }), { status: 201 });
    } catch (error) {
      return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
    }
  }
  const body = await req.json();
  const { username, password } = body;

  const admin = await prisma.admin.findFirst({
    where: { username, password },
  });

  if (admin) {
    return new Response(JSON.stringify({ success: true }));
  } else {
    return new Response(JSON.stringify({ success: false }), { status: 401 });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  if (searchParams.get('userLogins') === '1') {
    const logins = await prisma.userLogin.findMany({ orderBy: { loginAt: 'desc' } });
    return new Response(JSON.stringify({ success: true, data: logins }), { status: 200 });
  }
  // ... mevcut GET işlemleri ...
} 