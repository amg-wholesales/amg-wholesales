// app/api/cart/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/cart - Get a user's cart
export async function GET(request) {
  try {
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
    
    // Find or create the user's cart
    let cart = await prisma.cart.findUnique({
      where: {
        userId: user.id
      },
      include: {
        items: true
      }
    });
    
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: user.id
        },
        include: {
          items: true
        }
      });
    }
    
    // Fetch products separately since the relation has been removed
    const productIds = cart.items.map(item => item.productId);
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds
        }
      }
    });
    
    // Create a map for easy lookup
    const productMap = {};
    products.forEach(product => {
      productMap[product.id] = product;
    });
    
    // Format the cart data for the frontend
    const formattedCart = {
      id: cart.id,
      items: cart.items.map(item => {
        const product = productMap[item.productId];
        return {
          id: item.id,
          productId: item.productId,
          quantity: item.quantity,
          product: product ? {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images && product.images.length > 0 ? product.images[0] : null,
            availability: product.availability,
            stockQuantity: product.stockQuantity
          } : null
        };
      }).filter(item => item.product !== null), // Filter out any items with missing products
      total: cart.items.reduce((total, item) => {
        const product = productMap[item.productId];
        return product ? total + (Number(product.price) * item.quantity) : total;
      }, 0),
      itemCount: cart.items.reduce((count, item) => count + item.quantity, 0)
    };
    
    return NextResponse.json(formattedCart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/cart - Clear the cart
export async function DELETE(request) {
  try {
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
    
    // Find the user's cart
    const cart = await prisma.cart.findUnique({
      where: {
        userId: user.id
      }
    });
    
    if (!cart) {
      return NextResponse.json({ message: 'Cart already empty' });
    }
    
    // Delete all cart items
    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id
      }
    });
    
    return NextResponse.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}