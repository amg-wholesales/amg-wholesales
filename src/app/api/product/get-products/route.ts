import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/products - Get all products with optional category filter
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    // Query conditions
    const whereCondition = category ? { category } : {};
    
    // Fetch products with the filter
    const products = await prisma.product.findMany({
      where: whereCondition,
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
