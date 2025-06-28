import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET all items
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const isActive = searchParams.get('isActive');

    const where = {};
    if (categoryId) where.categoryId = parseInt(categoryId);
    if (isActive !== null) where.isActive = isActive === 'true';

    const items = await prisma.item.findMany({
      where,
      include: {
        category: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      data: items
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch items',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// POST new item
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, price, categoryId, isActive = true } = body;

    if (!name || !price) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields: name, price' 
        },
        { status: 400 }
      );
    }

    const item = await prisma.item.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        categoryId: categoryId ? parseInt(categoryId) : null,
        isActive
      },
      include: {
        category: true
      }
    });

    return NextResponse.json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create item',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// PUT update item
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, name, description, price, categoryId, isActive } = body;

    if (!id) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required field: id' 
        },
        { status: 400 }
      );
    }

    const item = await prisma.item.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price: price ? parseFloat(price) : undefined,
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        isActive
      },
      include: {
        category: true
      }
    });

    return NextResponse.json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to update item',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// DELETE item
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required parameter: id' 
        },
        { status: 400 }
      );
    }

    await prisma.item.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete item',
        details: error.message 
      },
      { status: 500 }
    );
  }
} 