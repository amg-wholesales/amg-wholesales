
// app/api/products/search/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract and parse query parameters
    const term = searchParams.get('term') || '';
    const category = searchParams.get('category') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const minPrice = parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '10000');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Build where clause for filtering and search
    const where = {
      price: {
        gte: minPrice,
        lte: maxPrice
      },
      OR: [
        { name: { contains: term, mode: 'insensitive' } },
        { description: { contains: term, mode: 'insensitive' } },
        { tags: { has: term } }
      ]
    };
    
    // Add category filter if provided and not "all"
    if (category && category !== 'all') {
      // Convert from URL format (hyphenated lowercase) to database format (uppercase with spaces)
      const formattedCategory = category.toUpperCase().replace(/-/g, ' ');
      
      where.category = {
        equals: formattedCategory
      };
    }
    
    // Query for products with filtering, search, and pagination
    const products = await prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Count total products for pagination
    const totalProducts = await prisma.product.count({
      where
    });
    
    // Calculate total pages
    const totalPages = Math.ceil(totalProducts / limit);
    
    return NextResponse.json({
      products,
      totalProducts,
      totalPages,
      currentPage: page
    });
  } catch (error) {
    console.error('Error searching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}