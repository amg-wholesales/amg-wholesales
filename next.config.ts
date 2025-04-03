// // import type { NextConfig } from "next";

// // const nextConfig: NextConfig = {
// //   /* config options here */
// // };

// // export default nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // This ignores TypeScript errors during build
//   typescript: {
//     // !! WARN !!
//     // Dangerously allow production builds to successfully complete even if
//     // your project has type errors.
//     ignoreBuildErrors: true,
//   },
  
//   // Add any other Next.js config options you need
//   reactStrictMode: true,
//   swcMinify: true,
  
//   // Experimental features that might help
//   experimental: {
//     // Allow for more flexible types in the App Router
//     serverComponentsExternalPackages: ['next'],
//   },
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  // This ignores TypeScript errors during build
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  
  // Add any other Next.js config options you need
  reactStrictMode: true,
  
  // Updated experimental features
  experimental: {
    // Use serverExternalPackages instead of the deprecated option
    serverExternalPackages: ['next'],
  },
};

module.exports = nextConfig;