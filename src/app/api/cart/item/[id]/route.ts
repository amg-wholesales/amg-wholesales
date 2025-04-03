
// app/api/cart/item/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PUT /api/cart/item/[id] - Update cart item quantity
export async function PUT(request, { params }) {
  try {
    // Get the cart item ID from the URL
    const cartItemId = params.id;
    
    // Parse request body
    const { userId, quantity } = await request.json();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'UserId is required' },
        { status: 400 }
      );
    }
    
    if (typeof quantity !== 'number' || quantity < 1) {
      return NextResponse.json(
        { error: 'Invalid quantity' },
        { status: 400 }
      );
    }
    
    // Get user from the database
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Find the cart item
    const cartItem = await prisma.cartItem.findUnique({
      where: {
        id: cartItemId
      },
      include: {
        cart: true
      }
    });
    
    if (!cartItem) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      );
    }
    
    // Verify that the cart belongs to the user
    if (cartItem.cart.userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    // Update the cart item
    const updatedItem = await prisma.cartItem.update({
      where: {
        id: cartItemId
      },
      data: {
        quantity: quantity
      }
    });
    
    return NextResponse.json({
      message: 'Cart item updated',
      cartItem: updatedItem
    });
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


// DELETE /api/cart/item/[id] - Remove item from cart
export async function DELETE(request, { params }) {
    try {
      // Get the cart item ID from the URL
      const cartItemId = params.id;
      
      // Get userId from query params
      const { searchParams } = new URL(request.url);
      const userId = searchParams.get('userId');
      
      if (!userId) {
        return NextResponse.json(
          { error: 'UserId is required' },
          { status: 400 }
        );
      }
      
      // Get user from the database
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        }
      });
      
      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
      
      // Find the cart item
      const cartItem = await prisma.cartItem.findUnique({
        where: {
          id: cartItemId
        },
        include: {
          cart: true
        }
      });
      
      if (!cartItem) {
        return NextResponse.json(
          { error: 'Cart item not found' },
          { status: 404 }
        );
      }
      
      // Verify that the cart belongs to the user
      if (cartItem.cart.userId !== user.id) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 403 }
        );
      }
      
      // Delete the cart item
      await prisma.cartItem.delete({
        where: {
          id: cartItemId
        }
      });
      
      return NextResponse.json({
        message: 'Item removed from cart'
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }