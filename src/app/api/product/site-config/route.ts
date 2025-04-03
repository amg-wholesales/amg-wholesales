import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { featureType, productIds, action } = await request.json();
    
    // Validate input
    if (!featureType || !productIds || !action) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Validate feature type
    const validFeatureTypes = ['featuredProducts', 'bestSellers', 'newArrivals', 'onSale'];
    if (!validFeatureTypes.includes(featureType)) {
      return NextResponse.json(
        { error: 'Invalid feature type' },
        { status: 400 }
      );
    }
    
    // Get current site config or create if it doesn't exist
    let siteConfig = await prisma.siteConfig.findFirst();
    
    if (!siteConfig) {
      siteConfig = await prisma.siteConfig.create({
        data: {
          featuredProducts: [],
          onSaleItems: [],
          bestSellers: [],
          newArrivals: [],
          onSale: [],
        },
      });
    }
    
    // Update the specified feature array based on action
    let updatedFeatureIds;
    
    if (action === 'add') {
      // Add new product IDs without duplicates
      const currentIds = siteConfig[featureType] || [];
      updatedFeatureIds = Array.from(new Set([...currentIds, ...productIds]));
    } else if (action === 'replace') {
      // Replace with new product IDs
      updatedFeatureIds = productIds;
    } else {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }
    
    // Update the site config
    const updatedConfig = await prisma.siteConfig.update({
      where: { id: siteConfig.id },
      data: {
        [featureType]: updatedFeatureIds,
      },
    });
    
    return NextResponse.json({ 
      message: 'Site configuration updated successfully',
      config: updatedConfig
    });
    
  } catch (error) {
    console.error('Error updating site config:', error);
    return NextResponse.json(
      { error: 'Failed to update site configuration', details: error.message },
      { status: 500 }
    );
  }
}