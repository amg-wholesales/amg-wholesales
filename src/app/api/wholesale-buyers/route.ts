import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
// import { verifyAdminSession } from '@/lib/auth'; // You'll need to implement this

export async function GET(request) {
  try {
    // Verify admin status
    // const isAdmin = await verifyAdminSession(request);
    // if (!isAdmin) {
    //   return NextResponse.json(
    //     { success: false, error: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }

    // Get filter parameter from URL
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || 'all';
    
    // Build the where clause based on the filter
    let whereClause = {};
    
    if (filter === 'pending') {
      whereClause = { verified: false };
    } else if (filter === 'approved') {
      whereClause = { verified: true };
    } else if (filter === 'rejected') {
      whereClause = { verified: null };
    }
    
    // Get all wholesale buyers with their associated user data
    const buyers = await prisma.wholesaleBuyer.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true
          }
        }
      },
      orderBy: {
        user: {
          createdAt: 'desc'
        }
      }
    });

    return NextResponse.json({
      success: true,
      buyers
    });
  } catch (error) {
    console.error('Error fetching wholesale buyers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch wholesale buyers' },
      { status: 500 }
    );
  }
}