// import React from 'react'
// import CategoryPage from '@/components/CategoryPage'
// const page = () => {
//   return (
//     <CategoryPage/>
//   )
// }

// export default page
// app/product/category/[categoryName]/page.jsx
import React from 'react'
import CategoryPage from '@/components/CategoryPage'
import { Metadata } from 'next/types'

// Generate dynamic metadata based on the category name
export async function generateMetadata({ params }) {
  const categoryName = params.category
  
  // Capitalize first letter for better title display
  const formattedCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
  
  return {
    title: `${formattedCategory} - AMG Wholesales`,
    description: `Browse our collection of ${categoryName} products. Find high-quality ${categoryName} options at competitive prices.`,
    keywords: `${categoryName}, buy ${categoryName}, ${categoryName} products`,
    
    // Add Open Graph metadata
    openGraph: {
      title: `${formattedCategory} - AMG Wholesales`,
      description: `Discover our premium ${categoryName} collection`,
      images: [`/images/categories/${categoryName}.jpg`], // If you have category images
    },
    
    // Add Twitter metadata
    twitter: {
      card: 'summary_large_image',
      title: `${formattedCategory} - AMG Wholesales`,
      description: `Discover our premium ${categoryName} collection`,
    },
    
    // You can also override other metadata properties as needed
  }
}

const Page = () => {
  return (
    <CategoryPage  />
  )
}

export default Page