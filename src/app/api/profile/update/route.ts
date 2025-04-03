
// app/api/profile/update/route.js - Update profile data
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(request) {
  try {
    // Parse request body
    const body = await request.json();
    const { 
      userId,
      name,
      buyer
    } = body;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Validate buyer data
    if (!buyer.companyName && !buyer.storeName) {
      return NextResponse.json(
        { error: 'Either Company Name or Store Name is required' },
        { status: 400 }
      );
    }
    
    // Get the user to check if it exists and is a buyer
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { userType: true }
    });
    
    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    if (existingUser.userType !== 'BUYER') {
      return NextResponse.json(
        { error: 'Only buyer profiles can be updated' },
        { status: 403 }
      );
    }
    
    // Update the user and buyer profile in a transaction
    const result = await prisma.$transaction(async (prisma) => {
      // Update user name
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { name }
      });
      
      // Update buyer profile
      const updatedBuyer = await prisma.buyer.update({
        where: { userId },
        data: {
          storeName: buyer.storeName,
          companyName: buyer.companyName,
          contactPerson: buyer.contactPerson,
          officePhone: buyer.officePhone,
          cellPhone: buyer.cellPhone,
          addressLine1: buyer.addressLine1,
          city: buyer.city,
          state: buyer.state,
          zipCode: buyer.zipCode,
          notes: buyer.notes
        }
      });
      
      return { user: updatedUser, buyer: updatedBuyer };
    });
    
    // Return success response
    return NextResponse.json({
      success: true,
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email
      },
      buyer: {
        storeName: result.buyer.storeName,
        companyName: result.buyer.companyName
      }
    });
    
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}