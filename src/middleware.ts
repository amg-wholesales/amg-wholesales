
// import { NextResponse } from 'next/server';

// // Define protected paths and their allowed types
// const protectedPaths = {
//   '/admin/dashboard': ['ADMIN'],
//   '/user/dashboard': ['BUYER']
// };

// export async function middleware(request) {
//   try {
//     // Get the path from the request
//     const path = request.nextUrl.pathname;

//     // Check if the user is visiting `/admin/dashboard`
//     if (path === '/admin/dashboard') {
//       // Redirect to `/admin/dashboard/all_products`
//       return NextResponse.redirect(new URL('/admin/dashboard/all_products', request.url));
//     }
//     if (path === '/user/dashboard') {
//       // Redirect to `/user/dashboard/tech_directory`
//       return NextResponse.redirect(new URL('/', request.url));
//     }

//     // Check if this path needs protection
//     const needsProtection = Object.keys(protectedPaths).some(protectedPath =>
//       path.startsWith(protectedPath)
//     );

//     if (!needsProtection) {
//       return NextResponse.next();
//     }

//     // Get the auth cookie
//     const authCookie = request.cookies.get('auth');

//     if (!authCookie) {
//       // Redirect to login if no auth cookie
//       return NextResponse.redirect(new URL('/', request.url));
//     }

//     // Parse the auth cookie
//     const authData = JSON.parse(authCookie.value);

//     // Check if cookie is expired
//     if (authData.exp && authData.exp < Date.now()) {
//       // Redirect to login if cookie is expired
//       return NextResponse.redirect(new URL('/', request.url));
//     }

//     // Check user type and path permissions
//     const userType = authData.type;
//     let isAllowed = false;

//     // Check each protected path
//     for (const [protectedPath, allowedTypes] of Object.entries(protectedPaths)) {
//       if (path.startsWith(protectedPath)) {
//         isAllowed = allowedTypes.includes(userType);
//         break;
//       }
//     }

//     if (!isAllowed) {
//       // If admin tries to access user dashboard
//       if (userType === 'ADMIN') {
//         return NextResponse.redirect(new URL('/admin/dashboard', request.url));
//       }
//       // If user tries to access admin dashboard
//       if (userType === 'BUYER') {
//         return NextResponse.redirect(new URL('/user/dashboard', request.url));
//       }
//       // For any other unauthorized access
//       return NextResponse.redirect(new URL('/unauthorized', request.url));
//     }

//     // Allow the request to proceed
//     return NextResponse.next();

//   } catch (error) {
//     console.error('Middleware error:', error);
//     // On any error, redirect to login
//     return NextResponse.redirect(new URL('/', request.url));
//   }
// }

// // Configure which paths the middleware should run on
// export const config = {
//   matcher: [
//     '/user/dashboard/:path*',
//     '/admin/dashboard/:path*'
//   ]
// };

import { NextResponse } from 'next/server';

// Define protected paths and their allowed types
const protectedPaths = {
  '/admin/dashboard': ['ADMIN'],
  '/user/dashboard': ['WHOLESALE_BUYER', 'RETAIL_BUYER']
};

export async function middleware(request) {
  try {
    // Get the path from the request
    const path = request.nextUrl.pathname;

    // Check if the user is visiting `/admin/dashboard`
    if (path === '/admin/dashboard') {
      // Redirect to `/admin/dashboard/all_products`
      return NextResponse.redirect(new URL('/admin/dashboard/all_products', request.url));
    }
    if (path === '/user/dashboard') {
      // Redirect to `/user/dashboard/tech_directory`
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Check if this path needs protection
    const needsProtection = Object.keys(protectedPaths).some(protectedPath =>
      path.startsWith(protectedPath)
    );

    if (!needsProtection) {
      return NextResponse.next();
    }

    // Get the auth cookie
    const authCookie = request.cookies.get('auth');

    if (!authCookie) {
      // Redirect to login if no auth cookie
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Parse the auth cookie
    const authData = JSON.parse(authCookie.value);

    // Check if cookie is expired
    if (authData.exp && authData.exp < Date.now()) {
      // Redirect to login if cookie is expired
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Check user type and path permissions
    const userType = authData.type;
    let isAllowed = false;

    // Check each protected path
    for (const [protectedPath, allowedTypes] of Object.entries(protectedPaths)) {
      if (path.startsWith(protectedPath)) {
        isAllowed = allowedTypes.includes(userType);
        break;
      }
    }

    if (!isAllowed) {
      // If admin tries to access user dashboard
      if (userType === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      // If user tries to access admin dashboard
      if (userType === 'WHOLESALE_BUYER' || userType === 'RETAIL_BUYER') {
        return NextResponse.redirect(new URL('/user/dashboard', request.url));
      }
      // For any other unauthorized access
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Allow the request to proceed
    return NextResponse.next();

  } catch (error) {
    console.error('Middleware error:', error);
    // On any error, redirect to login
    return NextResponse.redirect(new URL('/', request.url));
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/user/dashboard/:path*',
    '/admin/dashboard/:path*'
  ]
};