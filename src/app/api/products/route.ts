

// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
    
//     // Extract and parse query parameters
//     const category = searchParams.get('category') || 'all';
//     const page = parseInt(searchParams.get('page') || '1');
//     const minPrice = parseFloat(searchParams.get('minPrice') || '0');
//     const maxPrice = parseFloat(searchParams.get('maxPrice') || '10000');
//     const limit = parseInt(searchParams.get('limit') || '20');
    
//     // Calculate pagination
//     const skip = (page - 1) * limit;
    
//     // Build where clause for filtering
//     let where = {
//       price: {
//         gte: minPrice,
//         lte: maxPrice
//       }
//     };
    
//     // Check if category is one of the special categories from SiteConfig
//     if (['best-sellers', 'new-arrivals', 'on-sale', 'featured-products'].includes(category)) {
//       // Get the latest SiteConfig
//       const siteConfig = await prisma.siteConfig.findFirst({
//         orderBy: {
//           updatedAt: 'desc'
//         }
//       });
      
//       if (siteConfig) {
//         // Map the category slug to the appropriate field in siteConfig to get product IDs
//         let productIds = [];
        
//         switch (category) {
//           case 'best-sellers':
//             productIds = siteConfig.bestSellers || [];
//             break;
//           case 'new-arrivals':
//             productIds = siteConfig.newArrivals || [];
//             break;
//           case 'on-sale':
//             productIds = siteConfig.onSale || [];
//             break;
//           case 'featured-products':
//             productIds = siteConfig.featuredProducts || [];
//             break;
//         }
        
//         // If we have product IDs, filter by them
//         if (productIds.length > 0) {
//           where = {
//             ...where,
//             id: {
//               in: productIds
//             }
//           };
//         }
//       }
//     } 
//     // Add regular category filter if provided and it's not "all" or a special category
//     else if (category !== 'all') {
//       // Convert from URL format (hyphenated lowercase) to database format (uppercase with spaces)
//       const formattedCategory = category.toUpperCase().replace(/-/g, ' ');
      
//       where.category = {
//         equals: formattedCategory
//       };
//     }
    
//     // Query for products with filtering and pagination
//     const products = await prisma.product.findMany({
//       where,
//       skip,
//       take: limit,
//       orderBy: {
//         createdAt: 'desc'
//       }
//     });
    
//     // Count total products for pagination
//     const totalProducts = await prisma.product.count({
//       where
//     });
    
//     // Calculate total pages
//     const totalPages = Math.ceil(totalProducts / limit);
    
//     return NextResponse.json({
//       products,
//       totalPages,
//       totalProducts,
//       currentPage: page,
//       category
//     });
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Simple function to normalize categories for comparison
function normalizeForComparison(categoryStr) {
  // Remove all special characters and spaces, convert to lowercase
  return categoryStr.toLowerCase().replace(/[\s+\/&-]+/g, '');
}

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
      // Normalize the requested category for comparison
      const normalizedRequestCategory = normalizeForComparison(category);
      
      // Get all unique categories from products
      const uniqueCategories = await prisma.product.findMany({
        select: {
          category: true
        },
        distinct: ['category']
      });
      
      // Find matching category
      let matchedCategory = null;
      for (const cat of uniqueCategories) {
        if (normalizeForComparison(cat.category) === normalizedRequestCategory) {
          matchedCategory = cat.category;
          break;
        }
      }
      
      // If found a match, use the original format
      if (matchedCategory) {
        where.category = {
          equals: matchedCategory
        };
      } else {
        // No match found - return empty results
        return NextResponse.json({
          products: [],
          totalPages: 0,
          totalProducts: 0,
          currentPage: page,
          category
        });
      }
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