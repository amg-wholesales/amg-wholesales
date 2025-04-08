// // app/api/purchase-request/route.ts
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function POST(request: Request) {
//   try {
//     // Parse request body
//     const { userId, productId, quantity, notes } = await request.json();
    
//     // Validate required fields
//     if (!userId || !productId || !quantity || quantity < 1) {
//       return NextResponse.json(
//         { error: 'Invalid request. userId, productId, and quantity are required' },
//         { status: 400 }
//       );
//     }
    
//     // Check if user exists
//     const user = await prisma.user.findUnique({
//       where: {
//         id: userId
//       }
//     });
    
//     if (!user) {
//       return NextResponse.json(
//         { error: 'User not found' },
//         { status: 404 }
//       );
//     }
    
//     // Check if user is a buyer
//     if (user.userType !== 'BUYER') {
//       return NextResponse.json(
//         { error: 'Only buyers can submit purchase requests' },
//         { status: 403 }
//       );
//     }
    
//     // Check if product exists
//     const product = await prisma.product.findUnique({
//       where: {
//         id: productId
//       }
//     });
    
//     if (!product) {
//       return NextResponse.json(
//         { error: 'Product not found' },
//         { status: 404 }
//       );
//     }
    
//     // Check if product is available and has sufficient stock
//     if (!product.availability || (product.stockQuantity !== null && product.stockQuantity < quantity)) {
//       return NextResponse.json(
//         { error: 'Product is unavailable or has insufficient stock' },
//         { status: 400 }
//       );
//     }
    
//     // Create the purchase request
//     const purchaseRequest = await prisma.purchaseRequest.create({
//       data: {
//         userId: user.id,
//         productId: product.id,
//         quantity,
//         notes: notes || '',
//         status: 'PENDING'
//       }
//     });
    
//     return NextResponse.json({
//       message: 'Purchase request submitted successfully',
//       purchaseRequest
//     });
    
//   } catch (error) {
//     console.error('Error creating purchase request:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// // // GET /api/purchase-request - Get all purchase requests for a user
// // export async function GET(request: Request) {
// //   try {
// //     const { searchParams } = new URL(request.url);
// //     const userId = searchParams.get('userId');
    
// //     if (!userId) {
// //       return NextResponse.json(
// //         { error: 'UserId is required' },
// //         { status: 400 }
// //       );
// //     }
    
// //     // Check if user exists
// //     const user = await prisma.user.findUnique({
// //       where: {
// //         id: userId
// //       }
// //     });
    
// //     if (!user) {
// //       return NextResponse.json(
// //         { error: 'User not found' },
// //         { status: 404 }
// //       );
// //     }
    
// //     // Get purchase requests
// //     // For admin, can get all requests
// //     // For buyer, can only get their own requests
// //     const where = user.userType === 'ADMIN' 
// //       ? {} 
// //       : { userId: user.id };
    
// //     const purchaseRequests = await prisma.purchaseRequest.findMany({
// //       where,
// //       include: {
// //         product: true
// //       },
// //       orderBy: {
// //         createdAt: 'desc'
// //       }
// //     });
    
// //     return NextResponse.json({ purchaseRequests });
    
// //   } catch (error) {
// //     console.error('Error fetching purchase requests:', error);
// //     return NextResponse.json(
// //       { error: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }
// app/api/purchase-request/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // Parse request body
    const { userId, productId, quantity, notes } = await request.json();
    
    // Validate required fields
    if (!userId || !productId || !quantity || quantity < 1) {
      return NextResponse.json(
        { error: 'Invalid request. userId, productId, and quantity are required' },
        { status: 400 }
      );
    }
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Check if user is a buyer (either wholesale or retail)
    if (user.userType !== 'WHOLESALE_BUYER' && user.userType !== 'RETAIL_BUYER' && user.userType !== 'BUYER') {
      return NextResponse.json(
        { error: 'Only buyers can submit purchase requests' },
        { status: 403 }
      );
    }
    
    // Check if product exists
    const product = await prisma.product.findUnique({
      where: {
        id: productId
      }
    });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Check if product is available and has sufficient stock
    if (!product.availability || (product.stockQuantity !== null && product.stockQuantity < quantity)) {
      return NextResponse.json(
        { error: 'Product is unavailable or has insufficient stock' },
        { status: 400 }
      );
    }
    
    // Create the purchase request
    const purchaseRequest = await prisma.purchaseRequest.create({
      data: {
        userId: user.id,
        productId: product.id,
        quantity,
        notes: notes || '',
        status: 'PENDING'
      }
    });
    
    return NextResponse.json({
      message: 'Purchase request submitted successfully',
      purchaseRequest
    });
    
  } catch (error) {
    console.error('Error creating purchase request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/purchase-request - Get all purchase requests for a user
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'UserId is required' },
        { status: 400 }
      );
    }
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Get purchase requests
    // For admin, can get all requests
    // For buyers (wholesale or retail), can only get their own requests
    const where = user.userType === 'ADMIN' 
      ? {} 
      : { userId: user.id };
    
    const purchaseRequests = await prisma.purchaseRequest.findMany({
      where,
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            retailPrice: true,
            availability: true,
            stockQuantity: true,
            images: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            userType: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Format the response to include appropriate price based on user type
    const formattedRequests = purchaseRequests.map(request => {
      const product = request.product;
      
      // Determine which price to use based on user type
      let price = product.price;
      if (request.user.userType === 'RETAIL_BUYER') {
        price = product.retailPrice || (product.price ? Number(product.price) * 1.15 : null);
      }
      
      return {
        ...request,
        product: {
          ...product,
          displayPrice: price,
        }
      };
    });
    
    return NextResponse.json({ purchaseRequests: formattedRequests });
    
  } catch (error) {
    console.error('Error fetching purchase requests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}