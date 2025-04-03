// app/api/purchase-requests/user/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    // Get userId from the query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Fetch purchase requests for the specified user
    const purchaseRequests = await prisma.purchaseRequest.findMany({
      where: {
        userId: userId,
      },
      include: {
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
    console.error('Error fetching user purchase requests:', error);
    return NextResponse.json({ error: 'Failed to fetch purchase requests' }, { status: 500 });
  }
}