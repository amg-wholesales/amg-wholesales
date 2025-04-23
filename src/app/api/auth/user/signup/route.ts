
// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import bcrypt from 'bcryptjs';
// import prisma from '@/lib/prisma';

// export async function POST(request) {
//   try {
//     // Parse request body
//     const body = await request.json();
//     const { 
//       name, 
//       email, 
//       password,
//       buyerType, // New field to determine wholesale or retail
//       // Common buyer fields
//       contactPerson,
//       cellPhone,
//       addressLine1,
//       city,
//       state,
//       zipCode,
//       notes,
//       // Wholesale-specific fields
//       taxId,
//       taxIdFile,
//       storeName,
//       companyName,
//       officePhone,
//     } = body;
    
//     // Validate required inputs
//     if (!name || !email || !password) {
//       return NextResponse.json(
//         { success: false, error: 'Name, email, and password are required' },
//         { status: 400 }
//       );
//     }
    
//     // Validate buyer type
//     if (!buyerType || (buyerType !== 'WHOLESALE_BUYER' && buyerType !== 'RETAIL_BUYER')) {
//       return NextResponse.json(
//         { success: false, error: 'Valid buyer type is required' },
//         { status: 400 }
//       );
//     }

//     // Wholesale buyer validation
//     if (buyerType === 'WHOLESALE_BUYER' && !companyName && !storeName) {
//       return NextResponse.json(
//         { success: false, error: 'Either Company Name or Store Name is required for wholesale buyers' },
//         { status: 400 }
//       );
//     }
    
//     // Normalize email
//     const normalizedEmail = email.toLowerCase().trim();
    
//     // Check if user already exists
//     const existingUser = await prisma.user.findUnique({
//       where: { email: normalizedEmail }
//     });
    
//     if (existingUser) {
//       return NextResponse.json(
//         { success: false, error: 'Email already registered' },
//         { status: 409 }
//       );
//     }
    
//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);
    
//     // Create user and buyer profile in a transaction based on buyer type
//     const result = await prisma.$transaction(async (prisma) => {
//       // Create user
//       const user = await prisma.user.create({
//         data: {
//           name,
//           email: normalizedEmail,
//           password: hashedPassword,
//           userType: buyerType
//         }
//       });
      
//       // Create appropriate buyer profile based on type
//       if (buyerType === 'WHOLESALE_BUYER') {
//         // Create wholesale buyer profile
//         const buyer = await prisma.wholesaleBuyer.create({
//           data: {
//             userId: user.id,
//             taxId,
//             taxIdFile,
//             storeName,
//             companyName,
//             contactPerson,
//             officePhone,
//             cellPhone,
//             addressLine1,
//             city,
//             state,
//             zipCode,
//             notes
//           }
//         });
//         return { user, buyer };
//       } else {
//         // Create retail buyer profile
//         const buyer = await prisma.retailBuyer.create({
//           data: {
//             userId: user.id,
//             contactPerson,
//             cellPhone,
//             addressLine1,
//             city,
//             state,
//             zipCode,
//             notes
//           }
//         });
//         return { user, buyer };
//       }
//     });
    
//     // Set authentication cookie
//     const expirationTime = Date.now() + 30 * 24 * 60 * 60 * 1000;
//     const cookieStore = await cookies(); // Updated to use await
    
//     cookieStore.set('auth', JSON.stringify({
//       id: result.user.id,
//       email: result.user.email,
//       type: buyerType,
//       exp: expirationTime
//     }), {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//       maxAge: 30 * 24 * 60 * 60,
//       path: '/'
//     });
    
//     // Return success response without password
//     return NextResponse.json({
//       success: true,
//       user: {
//         id: result.user.id,
//         name: result.user.name,
//         email: result.user.email,
//         userType: buyerType
//       },
//       buyer: {
//         userId: result.buyer.userId,
//         // Include appropriate fields based on buyer type
//         ...(buyerType === 'WHOLESALE_BUYER' ? {
//           companyName: result.buyer.companyName,
//           storeName: result.buyer.storeName
//         } : {})
//       }
//     });
    
//   } catch (error) {
//     console.error('User signup error:', error);
//     return NextResponse.json(
//       { success: false, error: 'An unexpected error occurred', details: error.message },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();
    const { 
      name, 
      email, 
      password,
      buyerType,
      // Common buyer fields
      contactPerson,
      cellPhone,
      addressLine1,
      city,
      state,
      zipCode,
      notes,
      // Wholesale-specific fields
      taxId,
      taxIdFile,
      storeName,
      companyName,
      officePhone,
    } = body;
    
    // Validate required inputs
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }
    
    // Validate buyer type
    if (!buyerType || (buyerType !== 'WHOLESALE_BUYER' && buyerType !== 'RETAIL_BUYER')) {
      return NextResponse.json(
        { success: false, error: 'Valid buyer type is required' },
        { status: 400 }
      );
    }

    // Wholesale buyer validation
    if (buyerType === 'WHOLESALE_BUYER' && !companyName && !storeName) {
      return NextResponse.json(
        { success: false, error: 'Either Company Name or Store Name is required for wholesale buyers' },
        { status: 400 }
      );
    }
    
    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });
    
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 409 }
      );
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user and buyer profile in a transaction based on buyer type
    const result = await prisma.$transaction(async (prisma) => {
      // Create user
      const user = await prisma.user.create({
        data: {
          name,
          email: normalizedEmail,
          password: hashedPassword,
          userType: buyerType
        }
      });
      
      // Create appropriate buyer profile based on type
      if (buyerType === 'WHOLESALE_BUYER') {
        // Create wholesale buyer profile (verified = false by default)
        const buyer = await prisma.wholesaleBuyer.create({
          data: {
            userId: user.id,
            taxId,
            taxIdFile,
            storeName,
            companyName,
            contactPerson,
            officePhone,
            cellPhone,
            addressLine1,
            city,
            state,
            zipCode,
            notes,
            verified: false
          }
        });
        return { user, buyer };
      } else {
        // Create retail buyer profile
        const buyer = await prisma.retailBuyer.create({
          data: {
            userId: user.id,
            contactPerson,
            cellPhone,
            addressLine1,
            city,
            state,
            zipCode,
            notes
          }
        });
        return { user, buyer };
      }
    });
    
    // For retail buyers, set authentication cookie
    // For wholesale buyers, don't set cookie since they need verification
    if (buyerType === 'RETAIL_BUYER') {
      const expirationTime = Date.now() + 30 * 24 * 60 * 60 * 1000;
      const cookieStore = await cookies();
      
      cookieStore.set('auth', JSON.stringify({
        id: result.user.id,
        email: result.user.email,
        type: buyerType,
        exp: expirationTime
      }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      });
    }
    
    // Return success response with appropriate message
    if (buyerType === 'WHOLESALE_BUYER') {
      return NextResponse.json({
        success: true,
        requiresVerification: true,
        message: 'Your wholesale account has been created and is pending admin approval. You will be notified once your account is verified.',
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          userType: buyerType
        }
      });
    } else {
      return NextResponse.json({
        success: true,
        user: {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          userType: buyerType
        }
      });
    }
    
  } catch (error) {
    console.error('User signup error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred', details: error.message },
      { status: 500 }
    );
  }
}