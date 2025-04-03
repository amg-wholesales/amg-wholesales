// app/api/purchase-requests/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, notes } = body;

    // Validate ID
    if (!id) {
      return NextResponse.json({ error: 'Request ID is required' }, { status: 400 });
    }

    // Update purchase request
    const updatedRequest = await prisma.purchaseRequest.update({
      where: {
        id: id,
      },
      data: {
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
      },
    });

    return NextResponse.json({ 
      message: 'Purchase request updated successfully',
      purchaseRequest: updatedRequest 
    });
  } catch (error) {
    console.error('Error updating purchase request:', error);
    return NextResponse.json({ error: 'Failed to update purchase request' }, { status: 500 });
  }
}