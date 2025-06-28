import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const services = await prisma.service.findMany({
      where: {
        isActive: true
      },
      include: {
        category: true
      }
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
