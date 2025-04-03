// // // app/api/products/slug/[slug]/route.ts
// // import { NextResponse } from 'next/server';
// // import prisma from '@/lib/prisma';

// // interface RouteParams {
// //   params: {
// //     slug: string;
// //   };
// // }

// // export async function GET(request: Request, { params }: RouteParams) {
// //   try {
// //     const { slug } = params;
    
// //     // Find the product by slug
// //     const product = await prisma.product.findFirst({
// //       where: {
// //         slug: slug
// //       }
// //     });
    
// //     if (!product) {
// //       return NextResponse.json(
// //         { error: 'Product not found' },
// //         { status: 404 }
// //       );
// //     }
    
// //     // Find related products in the same category
// //     const relatedProducts = await prisma.product.findMany({
// //       where: {
// //         category: product.category,
// //         id: {
// //           not: product.id
// //         }
// //       },
// //       take: 4,
// //     });
    
// //     return NextResponse.json({
// //       product,
// //       relatedProducts
// //     });
// //   } catch (error) {
// //     console.error('Error fetching product by slug:', error);
// //     return NextResponse.json(
// //       { error: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';
// import { type NextRequest } from 'next/server';

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { slug: string } }
// ) {
//   try {
//     const { slug } = params;
    
//     // Find the product by slug
//     const product = await prisma.product.findFirst({
//       where: {
//         slug: slug
//       }
//     });
    
//     if (!product) {
//       return NextResponse.json(
//         { error: 'Product not found' },
//         { status: 404 }
//       );
//     }
    
//     // Find related products in the same category
//     const relatedProducts = await prisma.product.findMany({
//       where: {
//         category: product.category,
//         id: {
//           not: product.id
//         }
//       },
//       take: 4,
//     });
    
//     return NextResponse.json({
//       product,
//       relatedProducts
//     });
//   } catch (error) {
//     console.error('Error fetching product by slug:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Add segment config
export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  context: { params: { slug: string } }
) {
  try {
    const slug = context.params.slug;
    
    // Find the product by slug
    const product = await prisma.product.findFirst({
      where: {
        slug
      }
    });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Find related products in the same category
    const relatedProducts = await prisma.product.findMany({
      where: {
        category: product.category,
        id: {
          not: product.id
        }
      },
      take: 4,
    });
    
    return NextResponse.json({
      product,
      relatedProducts
    });
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}