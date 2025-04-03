// File: app/api/add-products/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import slugify from 'slugify';

export async function POST(request) {
  try {
    const { productNames, category, price = 10, stockQuantity = 10 } = await request.json();
    
    // Validate input
    if (!productNames || !Array.isArray(productNames) || !category) {
      return NextResponse.json(
        { error: 'Missing required fields. Please provide productNames array and category.' },
        { status: 400 }
      );
    }
    
    // Array to store created products
    const createdProducts = [];

    // Create each product
    for (const name of productNames) {
      // Generate slug from the product name
      const slug = slugify(name, { 
        lower: true,
        strict: true,
        trim: true
      });
      
      // Create product in database
      const product = await prisma.product.create({
        data: {
          name,
          slug,
          category,
          price,
          stockQuantity,
          description: '',
          availability: true,
          images: [],
          tags: [],
        },
      });
      
      createdProducts.push(product);
    }
    
    return NextResponse.json({ 
      message: `Successfully created ${createdProducts.length} products`,
      products: createdProducts
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating products:', error);
    return NextResponse.json(
      { error: 'Failed to create products', details: error.message },
      { status: 500 }
    );
  }
}