import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// DELETE /api/products/[id] - Delete a specific product
export async function DELETE(request, { params }) {
    try {
      const { id } = params;
      
      // Check if product exists
      const product = await prisma.product.findUnique({
        where: { id },
      });
      
      if (!product) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }
      
      // Delete the product
      await prisma.product.delete({
        where: { id },
      });
      
      return NextResponse.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      return NextResponse.json(
        { error: 'Failed to delete product' },
        { status: 500 }
      );
    }
  }