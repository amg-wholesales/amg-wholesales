// // app/api/profile/route.js - GET profile data
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function GET(request) {
//   try {
//     // Get userId from query parameter
//     const { searchParams } = new URL(request.url);
//     const userId = searchParams.get('userId');
    
//     if (!userId) {
//       return NextResponse.json(
//         { error: 'User ID is required' },
//         { status: 400 }
//       );
//     }
    
//     // Fetch user and buyer data
//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         userType: true,
//         buyer: {
//           select: {
//             storeName: true,
//             companyName: true,
//             contactPerson: true,
//             officePhone: true,
//             cellPhone: true,
//             addressLine1: true,
//             city: true,
//             state: true,
//             zipCode: true,
//             notes: true
//           }
//         }
//       }
//     });
    
//     if (!user) {
//       return NextResponse.json(
//         { error: 'User not found' },
//         { status: 404 }
//       );
//     }
    
//     // Check if this is a buyer
//     if (user.userType !== 'BUYER') {
//       return NextResponse.json(
//         { error: 'Only buyer profiles can be accessed' },
//         { status: 403 }
//       );
//     }
    
//     // Return formatted profile data
//     return NextResponse.json({
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email
//       },
//       buyer: user.buyer || {}
//     });
    
//   } catch (error) {
//     console.error('Error fetching profile:', error);
//     return NextResponse.json(
//       { error: 'An unexpected error occurred' },
//       { status: 500 }
//     );
//   }
// }

// app/api/profile/route.js - GET profile data
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    // Get userId from query parameter
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Fetch user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        userType: true,
      }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Determine which buyer type to fetch based on userType
    let buyerData = null;
    
    if (user.userType === 'WHOLESALE_BUYER') {
      // Fetch wholesale buyer data
      const wholesaleBuyer = await prisma.wholesaleBuyer.findUnique({
        where: { userId: userId },
        select: {
          storeName: true,
          companyName: true,
          taxId: true,
          taxIdFile: true,
          contactPerson: true,
          officePhone: true,
          cellPhone: true,
          addressLine1: true,
          city: true,
          state: true,
          zipCode: true,
          notes: true
        }
      });
      
      buyerData = wholesaleBuyer;
    } else if (user.userType === 'RETAIL_BUYER') {
      // Fetch retail buyer data
      const retailBuyer = await prisma.retailBuyer.findUnique({
        where: { userId: userId },
        select: {
          contactPerson: true,
          cellPhone: true,
          addressLine1: true,
          city: true,
          state: true,
          zipCode: true,
          notes: true
        }
      });
      
      buyerData = retailBuyer;
    } else if (user.userType === 'ADMIN') {
      // No buyer data for admin
      buyerData = null;
    } else {
      return NextResponse.json(
        { error: 'Invalid user type' },
        { status: 400 }
      );
    }
    
    // Return formatted profile data
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType
      },
      buyer: buyerData || {}
    });
    
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: error.message },
      { status: 500 }
    );
  }
}