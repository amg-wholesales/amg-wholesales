// app/api/admin/delete-all-users/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * API endpoint to delete all users
 * WARNING: This is a destructive operation with no authentication
 */
export async function DELETE(request) {
  try {
    // Use a transaction to ensure all related data is deleted
    const result = await prisma.$transaction(async (tx) => {
      // Get count of users before deletion
      const userCount = await tx.user.count();
      
      // Delete all related data first to avoid foreign key constraint errors
      
      // Delete all cart items
      await tx.cartItem.deleteMany({});
      
      // Delete all carts
      await tx.cart.deleteMany({});
      
      // Delete all purchase requests
      await tx.purchaseRequest.deleteMany({});
      
      // Delete all wholesale buyers
      await tx.wholesaleBuyer.deleteMany({});
      
      // Delete all retail buyers
      await tx.retailBuyer.deleteMany({});
      
      // Delete all buyers (for backward compatibility if needed)
      if (tx.buyer) {
        await tx.buyer.deleteMany({});
      }
      
      // Finally, delete all users
      const deletedUsers = await tx.user.deleteMany({});
      
      return {
        totalUsers: userCount,
        deletedUsers: deletedUsers.count
      };
    });
    
    return NextResponse.json({
      success: true,
      message: `Successfully deleted all ${result.deletedUsers} users`,
      details: result
    });
    
  } catch (error) {
    console.error('Error deleting users:', error);
    return NextResponse.json(
      { error: 'Failed to delete users', details: error.message },
      { status: 500 }
    );
  }
}