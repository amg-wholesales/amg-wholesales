// // // // app/api/products/slug/[slug]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const slug = params.slug;
    
    // Find the product by slug
    const product = await prisma.product.findFirst({
      where: {
        slug
      }
    });
    
    if (!product) {
      return Response.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Find related products in the same category
    const relatedProducts = await prisma.product.findMany({
      where: {
        category: product.category,
        id: {
          not: product.id
        }
      },
      take: 4,
    });
    
    return Response.json({
      product,
      relatedProducts
    });
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}