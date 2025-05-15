// import React from 'react'
// import ProductDetailPage from "@/components/ProductDetailPage"
// const page = () => {
//   return (
//     <ProductDetailPage/>
//   )
// }

// export default page
// app/product/[productSlug]/page.jsx
import React from 'react'
import ProductDetailPage from "@/components/ProductDetailPage"

// Generate dynamic metadata based on the product slug
export async function generateMetadata({ params }) {
  const productSlug = params.productSlug
  
  // Convert slug to a more readable format (replace hyphens with spaces and capitalize)
  const formattedProductName = productSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  
  return {
    title: `${formattedProductName} - AMG Wholesales`,
    description: `Buy ${formattedProductName}. Premium quality ${formattedProductName} available in our store.`,
    keywords: `${productSlug}, buy ${productSlug}, ${productSlug} product`,
    
    // Open Graph metadata
    openGraph: {
      title: `${formattedProductName} - AMG Wholesales`,
      description: `Premium quality ${formattedProductName} available for purchase.`,
      
    },
    
    // Twitter metadata
    twitter: {
      card: 'summary_large_image',
      title: `${formattedProductName} - AMG Wholesales`,
      description: `Premium quality ${formattedProductName} available for purchase.`,
    },
  }
}

const Page = ({ params }) => {
  // Pass the product slug to your ProductDetailPage component
  return (
    <ProductDetailPage/>
  )
}

export default Page