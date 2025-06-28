import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Try a simple query
    await prisma.category.findFirst();
    return NextResponse.json({ success: true, message: 'Database connection OK' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 