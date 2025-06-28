import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Try to create a test category
    const testCategory = await prisma.category.create({
      data: {
        name: 'Test Category',
        description: 'Test Description'
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful',
      data: testCategory 
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Database connection failed',
      error: error.message 
    }, { status: 500 })
  }
} 