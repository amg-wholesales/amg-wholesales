// // app/api/purchase-requests/user/route.js
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function GET(request) {
//   try {
//     // Get userId from the query parameters
//     const { searchParams } = new URL(request.url);
//     const userId = searchParams.get('userId');

//     if (!userId) {
//       return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
//     }

//     // Fetch purchase requests for the specified user
//     const purchaseRequests = await prisma.purchaseRequest.findMany({
//       where: {
//         userId: userId,
//       },
//       include: {
//         product: {
//           select: {
//             name: true,
//             price: true,
//             images: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: 'desc',
//       },
//     });

//     return NextResponse.json({ purchaseRequests });
//   } catch (error) {
//     console.error('Error fetching user purchase requests:', error);
//     return NextResponse.json({ error: 'Failed to fetch purchase requests' }, { status: 500 });
//   }
// }
// app/api/purchase-requests/user/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    // Get userId from the query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    
    // First get the user to determine their type
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { 
        id: true,
        userType: true 
      }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Fetch purchase requests for the specified user
    const purchaseRequests = await prisma.purchaseRequest.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,          // Wholesale price
            retailPrice: true,    // Retail price for retail buyers
            images: true,
            availability: true,
            stockQuantity: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    // Format response to include appropriate price based on user type
    const formattedRequests = purchaseRequests.map(request => {
      const product = request.product;
      if (!product) return request;
      
      // Determine which price to show based on user type
      let displayPrice = null;
      if (user.userType === 'RETAIL_BUYER') {
        // For retail buyers, use retail price or calculate from wholesale
        displayPrice = product.retailPrice || 
                       (product.price ? Number(product.price) * 1.15 : null);
      } else {
        // For wholesale buyers and legacy buyers, use wholesale price
        displayPrice = product.price;
      }
      
      return {
        ...request,
        product: {
          ...product,
          displayPrice: displayPrice,
        },
      };
    });
    
    return NextResponse.json({ purchaseRequests: formattedRequests });
  } catch (error) {
    console.error('Error fetching user purchase requests:', error);
    return NextResponse.json({ error: 'Failed to fetch purchase requests', details: error.message }, { status: 500 });
  }
}