import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
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