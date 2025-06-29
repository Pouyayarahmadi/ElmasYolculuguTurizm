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

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Test API received:', body);
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: "Test başarılı!",
      receivedData: body
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Test API Error:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      message: "Test hatası",
      error: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 