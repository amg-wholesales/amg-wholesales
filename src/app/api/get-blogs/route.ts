import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Handle GET requests - simple version that supports pagination
export async function GET(request: NextRequest) {
  try {
    // Get URL search params for basic pagination
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');
    const skip = (page - 1) * limit;
    
    // Get total count for pagination
    const totalBlogs = await prisma.blog.count({
      where: {
        published: true
      }
    });
    
    // Get blogs with pagination
    const blogs = await prisma.blog.findMany({
      where: {
        published: true
      },
      orderBy: {
        publishedAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        bannerImage: true,
        category: true,
        publishedAt: true,
        metaDescription: true,
        slug: true
      },
      skip,
      take: limit
    });
    
    return NextResponse.json({ 
      blogs, 
      pagination: {
        total: totalBlogs,
        page,
        limit,
        totalPages: Math.ceil(totalBlogs / limit)
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}