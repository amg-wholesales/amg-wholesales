// api/admin/verify-wholesale-buyer.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { userId, verified } = await request.json();
    
    // Update the wholesale buyer's verification status
    const updatedBuyer = await prisma.wholesaleBuyer.update({
      where: { userId },
      data: { verified }
    });
    
    return NextResponse.json({
      success: true,
      message: `Wholesale buyer ${verified ? 'approved' : 'rejected'}`,
      buyer: updatedBuyer
    });
  } catch (error) {
    console.error('Error verifying wholesale buyer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update verification status' },
      { status: 500 }
    );
  }
}