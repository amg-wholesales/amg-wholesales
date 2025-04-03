// app/api/purchase-requests/admin/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    // Get optional filters from query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    // Build filter conditions
    const whereClause = {};
    if (status) {
      whereClause.status = status;
    }

    // Fetch all purchase requests with optional filtering
    const purchaseRequests = await prisma.purchaseRequest.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            buyer: {
              select: {
                companyName: true,
                storeName: true,
              },
            },
          },
        },
        product: {
          select: {
            name: true,
            price: true,
            images: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ purchaseRequests });
  } catch (error) {
    console.error('Error fetching all purchase requests:', error);
    return NextResponse.json({ error: 'Failed to fetch purchase requests' }, { status: 500 });
  }
}