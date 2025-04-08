
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';
// import slugify from 'slugify';

// export async function POST(request) {
//   try {
//     const data = await request.json();
    
//     // Validate required fields (removed images from required fields)
//     if (!data.name || !data.category || !data.price) {
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }
    
//     // Generate slug from the product name
//     const slug = slugify(data.name, { 
//       lower: true,      // Convert to lowercase
//       strict: true,     // Remove special characters
//       trim: true        // Trim leading/trailing spaces
//     });
    
//     // Create new product in database
//     const product = await prisma.product.create({
//       data: {
//         name: data.name,
//         slug: slug,
//         category: data.category,
//         price: data.price,
//         stockQuantity: data.stockQuantity || 0,
//         description: data.description || '',
//         availability: data.availability !== undefined ? data.availability : true,
//         images: data.images || [],  // Default to empty array if no images
//         tags: data.tags || [],
//       },
//     });
    
//     return NextResponse.json({ 
//       message: 'Product created successfully', 
//       product 
//     }, { status: 201 });
    
//   } catch (error) {
//     console.error('Error creating product:', error);
//     return NextResponse.json(
//       { error: 'Failed to create product', details: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import slugify from 'slugify';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.category || !data.price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Generate slug from the product name
    const slug = slugify(data.name, { 
      lower: true,      // Convert to lowercase
      strict: true,     // Remove special characters
      trim: true        // Trim leading/trailing spaces
    });
    
    // Parse price values
    const wholesalePrice = parseFloat(data.price);
    
    // Calculate retail price if not provided (15% markup by default)
    let retailPrice = data.retailPrice ? parseFloat(data.retailPrice) : null;
    if (!retailPrice && wholesalePrice) {
      retailPrice = wholesalePrice * 1.15; // 15% markup
    }
    
    // Create new product in database
    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: slug,
        category: data.category,
        price: wholesalePrice,        // Wholesale price
        retailPrice: retailPrice,     // Retail price
        stockQuantity: data.stockQuantity || 0,
        description: data.description || '',
        availability: data.availability !== undefined ? data.availability : true,
        images: data.images || [],
        tags: data.tags || [],
      },
    });
    
    return NextResponse.json({ 
      message: 'Product created successfully', 
      product 
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product', details: error.message },
      { status: 500 }
    );
  }
}