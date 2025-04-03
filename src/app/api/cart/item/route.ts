// app/api/cart/item/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/cart/item - Add an item to the cart
export async function POST(request) {
  try {
    // Parse request body
    const { userId, productId, quantity } = await request.json();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'UserId is required' },
        { status: 400 }
      );
    }
    
    if (!productId || !quantity || quantity < 1) {
      return NextResponse.json(
        { error: 'Invalid product ID or quantity' },
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
    
    // Check if product exists and is available
    const product = await prisma.product.findUnique({
      where: {
        id: productId
      }
    });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    if (!product.availability) {
      return NextResponse.json(
        { error: 'Product is not available' },
        { status: 400 }
      );
    }
    
    // Find or create user's cart
    let cart = await prisma.cart.findUnique({
      where: {
        userId: user.id
      }
    });
    
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: user.id
        }
      });
    }
    
    // Since we can't use the unique constraint on cartId_productId due to the 
    // lack of relation, we need to manually check for existing item
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: product.id
      }
    });
    
    let cartItem;
    
    if (existingItem) {
      // Update existing item
      cartItem = await prisma.cartItem.update({
        where: {
          id: existingItem.id
        },
        data: {
          quantity: existingItem.quantity + quantity
        }
      });
    } else {
      // Create new item
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: product.id,
          quantity: quantity
        }
      });
    }
    
    return NextResponse.json({
      message: 'Item added to cart',
      cartItem
    });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
