// // // app/api/purchase-requests/admin/route.js
// // import { NextResponse } from 'next/server';
// // import prisma from '@/lib/prisma';

// // export async function GET(request) {
// //   try {
// //     // Get optional filters from query parameters
// //     const { searchParams } = new URL(request.url);
// //     const status = searchParams.get('status');
    
// //     // Build filter conditions
// //     const whereClause = {};
// //     if (status) {
// //       whereClause.status = status;
// //     }

// //     // Fetch all purchase requests with optional filtering
// //     const purchaseRequests = await prisma.purchaseRequest.findMany({
// //       where: whereClause,
// //       include: {
// //         user: {
// //           select: {
// //             name: true,
// //             email: true,
// //             buyer: {
// //               select: {
// //                 companyName: true,
// //                 storeName: true,
// //               },
// //             },
// //           },
// //         },
// //         product: {
// //           select: {
// //             name: true,
// //             price: true,
// //             images: true,
// //           },
// //         },
// //       },
// //       orderBy: {
// //         createdAt: 'desc',
// //       },
// //     });

// //     return NextResponse.json({ purchaseRequests });
// //   } catch (error) {
// //     console.error('Error fetching all purchase requests:', error);
// //     return NextResponse.json({ error: 'Failed to fetch purchase requests' }, { status: 500 });
// //   }
// // }
// // app/api/purchase-requests/admin/route.js
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function GET(request) {
//   try {
//     // Get optional filters from query parameters
//     const { searchParams } = new URL(request.url);
//     const status = searchParams.get('status');
//     const buyerType = searchParams.get('buyerType');
    
//     // Build filter conditions
//     const whereClause = {};
//     if (status) {
//       whereClause.status = status;
//     }
    
//     // Filter by buyer type if specified
//     const userWhere = {};
//     if (buyerType) {
//       userWhere.userType = buyerType;
//     }
    
//     // Fetch all purchase requests with optional filtering
//     const purchaseRequests = await prisma.purchaseRequest.findMany({
//       where: whereClause,
//       include: {
//         user: {
//           where: userWhere,
//           select: {
//             id: true,
//             name: true,
//             email: true,
//             userType: true,
//             // Include both buyer models to handle old data and new structure
//             buyer: {
//               select: {
//                 companyName: true,
//                 storeName: true,
//               },
//             },
//             wholesaleBuyer: {
//               select: {
//                 companyName: true,
//                 storeName: true,
//               },
//             },
//             retailBuyer: {
//               select: {
//                 contactPerson: true,
//               },
//             },
//           },
//         },
//         product: {
//           select: {
//             name: true,
//             price: true,          // Wholesale price
//             retailPrice: true,    // Retail price
//             images: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: 'desc',
//       },
//     });
    
//     // Filter out any requests where user didn't match the buyer type filter
//     // (since we can't do a nested where condition directly in Prisma)
//     const filteredRequests = buyerType 
//       ? purchaseRequests.filter(request => request.user !== null)
//       : purchaseRequests;
    
//     return NextResponse.json({ purchaseRequests: filteredRequests });
//   } catch (error) {
//     console.error('Error fetching all purchase requests:', error);
//     return NextResponse.json({ error: 'Failed to fetch purchase requests', details: error.message }, { status: 500 });
//   }
// }
// app/api/purchase-requests/admin/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    // Get optional filters from query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const buyerType = searchParams.get('buyerType');
    
    // Build filter conditions
    const whereClause = {};
    if (status) {
      whereClause.status = status;
    }
    
    // Filter by buyer type if specified
    const userWhere = {};
    if (buyerType) {
      userWhere.userType = buyerType;
    }
    
    // Fetch all purchase requests with optional filtering
    const purchaseRequests = await prisma.purchaseRequest.findMany({
      where: whereClause,
      include: {
        user: {
          where: userWhere,
          select: {
            id: true,
            name: true,
            email: true,
            userType: true,
            // Only include the new buyer relations
            wholesaleBuyer: {
              select: {
                companyName: true,
                storeName: true,
              },
            },
            retailBuyer: {
              select: {
                contactPerson: true,
              },
            },
          },
        },
        product: {
          select: {
            name: true,
            price: true,          // Wholesale price
            retailPrice: true,    // Retail price
            images: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    // Filter out any requests where user didn't match the buyer type filter
    // (since we can't do a nested where condition directly in Prisma)
    const filteredRequests = buyerType 
      ? purchaseRequests.filter(request => request.user !== null)
      : purchaseRequests;
    
    return NextResponse.json({ purchaseRequests: filteredRequests });
  } catch (error) {
    console.error('Error fetching all purchase requests:', error);
    return NextResponse.json({ error: 'Failed to fetch purchase requests', details: error.message }, { status: 500 });
  }
}