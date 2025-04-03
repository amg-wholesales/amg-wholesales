import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Get the site configuration
    const siteConfig = await prisma.siteConfig.findFirst();
    
    if (!siteConfig) {
      return NextResponse.json({ message: "Site configuration not found" }, { status: 404 });
    }
    
    // Fetch products for each section
    const featuredProducts = await prisma.product.findMany({
      where: {
        id: { in: siteConfig.featuredProducts }
      },
      take: 12
    });
    
    const bestSellers = await prisma.product.findMany({
      where: {
        id: { in: siteConfig.bestSellers }
      },
      take: 12
    });
    
    const newArrivals = await prisma.product.findMany({
      where: {
        id: { in: siteConfig.newArrivals }
      },
      take: 12
    });
    
    const onSale = await prisma.product.findMany({
      where: {
        id: { in: siteConfig.onSale }
      },
      take: 12
    });
    
    return NextResponse.json({
      featuredProducts,
      bestSellers,
      newArrivals,
      onSale
    }, { status: 200 });
    
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return NextResponse.json({ message: "Failed to fetch homepage data" }, { status: 500 });
  }
}