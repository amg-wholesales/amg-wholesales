import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

// This API is for programmatic admin creation only
// It should be properly secured in a production environment

export async function POST(request) {
  try {
    // Use API key or some secure method to verify access to this endpoint
    // For example, check a special header with an API key
    // const authHeader = request.headers.get('x-admin-api-key');
    
    // if (!authHeader || authHeader !== process.env.ADMIN_API_KEY) {
    //   return NextResponse.json(
    //     { success: false, error: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }
    
    // Parse request body
    const body = await request.json();
    const { name, email, password } = body;
    
    // Validate inputs
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }
    
    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });
    
    if (existingAdmin) {
      return NextResponse.json(
        { success: false, error: 'Email already registered' },
        { status: 409 }
      );
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create admin user
    const admin = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword,
        userType: 'ADMIN'
      }
    });
    
    // Return success response without password
    return NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        userType: admin.userType
      }
    });
    
  } catch (error) {
    console.error('Create admin error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}