

// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';
// import slugify from 'slugify';

// export async function POST(request) {
//   try {
//     const data = await request.json();
    
//     // Validate required fields
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
    
//     // Parse price values
//     const wholesalePrice = parseFloat(data.price);
    
//     // Calculate retail price if not provided (15% markup by default)
//     let retailPrice = data.retailPrice ? parseFloat(data.retailPrice) : null;
//     if (!retailPrice && wholesalePrice) {
//       retailPrice = wholesalePrice * 1.15; // 15% markup
//     }
    
//     // Create new product in database
//     const product = await prisma.product.create({
//       data: {
//         name: data.name,
//         slug: slug,
//         category: data.category,
//         price: wholesalePrice,        // Wholesale price
//         retailPrice: retailPrice,     // Retail price
//         stockQuantity: data.stockQuantity || 0,
//         description: data.description || '',
//         availability: data.availability !== undefined ? data.availability : true,
//         images: data.images || [],
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

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract and parse query parameters
    const category = searchParams.get('category') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    const minPrice = parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '10000');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    // Calculate pagination
    const skip = (page - 1) * limit;
    
    // Build where clause for filtering
    let where = {
      price: {
        gte: minPrice,
        lte: maxPrice
      }
    };
    
    // Check if category is one of the special categories from SiteConfig
    if (['best-sellers', 'new-arrivals', 'on-sale', 'featured-products'].includes(category)) {
      // Get the latest SiteConfig
      const siteConfig = await prisma.siteConfig.findFirst({
        orderBy: {
          updatedAt: 'desc'
        }
      });
      
      if (siteConfig) {
        // Map the category slug to the appropriate field in siteConfig to get product IDs
        let productIds = [];
        
        switch (category) {
          case 'best-sellers':
            productIds = siteConfig.bestSellers || [];
            break;
          case 'new-arrivals':
            productIds = siteConfig.newArrivals || [];
            break;
          case 'on-sale':
            productIds = siteConfig.onSale || [];
            break;
          case 'featured-products':
            productIds = siteConfig.featuredProducts || [];
            break;
        }
        
        // If we have product IDs, filter by them
        if (productIds.length > 0) {
          where = {
            ...where,
            id: {
              in: productIds
            }
          };
        }
      }
    } 
    // Add regular category filter if provided and it's not "all" or a special category
    else if (category !== 'all') {
      // Enhanced category format conversion
      let formattedCategory = category;
      
      // Step 1: Replace hyphens with spaces
      formattedCategory = formattedCategory.replace(/-/g, ' ');
      
      // Step 2: Handle special cases for '+' and '/'
      // Convert "dry+wax accessories" back to "DRY + WAX ACCESSORIES"
      formattedCategory = formattedCategory.replace(/(\w+)\+(\w+)/g, '$1 + $2');
      
      // Convert "jars-sealed bags" back to "JARS/SEALED BAGS" - handle specific known categories
      if (formattedCategory.toLowerCase() === "jars sealed bags") {
        formattedCategory = "JARS/SEALED BAGS";
      }
      
      // Step 3: Convert to uppercase for database matching
      formattedCategory = formattedCategory.toUpperCase();
      
      console.log(`Original category param: ${category}`);
      console.log(`Formatted for database: ${formattedCategory}`);
      
      where.category = {
        equals: formattedCategory
      };
    }
    
    // Query for products with filtering and pagination
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
      totalPages,
      totalProducts,
      currentPage: page,
      category
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}