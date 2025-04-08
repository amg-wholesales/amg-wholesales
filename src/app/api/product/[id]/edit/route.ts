// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';
// import slugify from 'slugify';

// export async function PUT(request, { params }) {
//   try {
//     const { id } = params;
//     const data = await request.json();
    
//     // Validate required fields
//     if (!data.name || !data.category || !data.price) {
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }
    
//     // Check if product exists
//     const existingProduct = await prisma.product.findUnique({
//       where: { id }
//     });
    
//     if (!existingProduct) {
//       return NextResponse.json(
//         { error: 'Product not found' },
//         { status: 404 }
//       );
//     }
    
//     // Generate updated slug from the product name
//     const slug = slugify(data.name, { 
//       lower: true,      // Convert to lowercase
//       strict: true,     // Remove special characters
//       trim: true        // Trim leading/trailing spaces
//     });
    
//     // Update product in database
//     const updatedProduct = await prisma.product.update({
//       where: { id },
//       data: {
//         name: data.name,
//         slug: slug,
//         category: data.category,
//         price: parseFloat(data.price),
//         stockQuantity: parseInt(data.stockQuantity || 0),
//         description: data.description || '',
//         availability: data.availability !== undefined ? data.availability : true,
//         images: data.images || [],
//         tags: data.tags || [],
//       },
//     });
    
//     return NextResponse.json({ 
//       message: 'Product updated successfully', 
//       product: updatedProduct 
//     });
    
//   } catch (error) {
//     console.error('Error updating product:', error);
//     return NextResponse.json(
//       { error: 'Failed to update product', details: error.message },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import slugify from 'slugify';

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.category || !data.price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });
    
    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Generate updated slug from the product name
    const slug = slugify(data.name, { 
      lower: true,      // Convert to lowercase
      strict: true,     // Remove special characters
      trim: true        // Trim leading/trailing spaces
    });
    
    // Parse price values
    const wholesalePrice = parseFloat(data.price);
    
    // Parse retail price if provided or calculate from wholesale price
    // If no retail price was provided but there's a wholesale price, apply the 15% markup
    let retailPrice = data.retailPrice ? parseFloat(data.retailPrice) : null;
    if (retailPrice === null && wholesalePrice) {
      retailPrice = wholesalePrice * 1.15; // 15% markup if not specified
    }
    
    // Update product in database
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        slug: slug,
        category: data.category,
        price: wholesalePrice,                     // Wholesale price
        retailPrice: retailPrice,                  // Retail price
        stockQuantity: parseInt(data.stockQuantity || 0),
        description: data.description || '',
        availability: data.availability !== undefined ? data.availability : true,
        images: data.images || [],
        tags: data.tags || [],
      },
    });
    
    return NextResponse.json({ 
      message: 'Product updated successfully', 
      product: updatedProduct 
    });
    
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product', details: error.message },
      { status: 500 }
    );
  }
}