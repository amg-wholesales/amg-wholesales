// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import bcrypt from 'bcryptjs';
// import prisma from '@/lib/prisma';

// export async function POST(request) {
//   try {
//     // Parse request body
//     const body = await request.json();
//     const { email, password } = body;
    
//     // Validate inputs
//     if (!email || !password) {
//       return NextResponse.json(
//         { success: false, error: 'Email and password are required' },
//         { status: 400 }
//       );
//     }
    
//     // Normalize email
//     const normalizedEmail = email.toLowerCase().trim();
    
//     // Find user
//     const user = await prisma.user.findUnique({
//       where: { email: normalizedEmail },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         password: true,
//         userType: true
//       }
//     });
    
//     // Check if user exists and has type 'BUYER'
//     if (!user || user.userType !== 'BUYER') {
//       return NextResponse.json(
//         { success: false, error: 'Invalid credentials' },
//         { status: 401 }
//       );
//     }
    
//     // Verify password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
    
//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { success: false, error: 'Invalid credentials' },
//         { status: 401 }
//       );
//     }
    
//     // Set authentication cookie
//     const expirationTime = Date.now() + 30 * 24 * 60 * 60 * 1000;
//     const cookieStore = await cookies(); // Updated to use await
//     cookieStore.delete('auth');
    
//     cookieStore.set('auth', JSON.stringify({
//       id: user.id,
//       email: user.email,
//       type: user.userType,
//       exp: expirationTime
//     }), {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'lax',
//       maxAge: 30 * 24 * 60 * 60,
//       path: '/'
//     });
    
//     // Return success response
//     return NextResponse.json({
//       success: true,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         userType: user.userType
//       }
//     });
    
//   } catch (error) {
//     console.error('User login error:', error);
//     return NextResponse.json(
//       { success: false, error: 'An unexpected error occurred' },
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
    const { email, password, buyerType } = body;
    
    console.log('Login attempt:', { email, buyerType });
    
    // Validate inputs
    if (!email || !password) {
      console.log('Missing email or password');
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        wholesaleBuyer: true,
        retailBuyer: true
      }
    });
    
    console.log('Found user:', { 
      id: user?.id, 
      userType: user?.userType,
      hasWholesale: !!user?.wholesaleBuyer,
      hasRetail: !!user?.retailBuyer
    });
    
    // Check if user exists
    if (!user) {
      console.log('User not found');
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      console.log('Invalid password');
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Check buyer type match
    if (buyerType && user.userType !== buyerType) {
      console.log('User type mismatch', { requested: buyerType, actual: user.userType });
      return NextResponse.json(
        { success: false, error: 'Invalid account type' },
        { status: 401 }
      );
    }
    
    // Check verification status for wholesale buyers
    if (user.userType === 'WHOLESALE_BUYER' && user.wholesaleBuyer && user.wholesaleBuyer.verified === false) {
      console.log('Wholesale buyer not verified');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Your wholesale account is pending verification. Please wait for admin approval.',
          pendingVerification: true
        },
        { status: 403 }
      );
    }
    
    console.log('Login successful, setting cookie');
    
    // Set authentication cookie
    const expirationTime = Date.now() + 30 * 24 * 60 * 60 * 1000;
    const cookieStore = await cookies();
    cookieStore.delete('auth');
    
    cookieStore.set('auth', JSON.stringify({
      id: user.id,
      email: user.email,
      type: user.userType,
      exp: expirationTime
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/'
    });
    
    // Return success response
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType
      }
    });
    
  } catch (error) {
    console.error('User login error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred', details: error.message },
      { status: 500 }
    );
  }
}