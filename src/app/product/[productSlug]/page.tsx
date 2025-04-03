// // app/product/[productSlug]/page.jsx
// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { useAuth } from "@/context/authContext";
// // Fix the typo in the import
// import ProductCard from "@/components/category/ProductCart";
// import { Minus, Plus, ArrowLeft, ShoppingBag } from "lucide-react";

// export default function ProductDetailPage() {
//   const { productSlug } = useParams();
//   const router = useRouter();
//   const { isAuthenticated, userType, userId } = useAuth();
  
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [purchaseRequested, setPurchaseRequested] = useState(false);
//   const [requestStatus, setRequestStatus] = useState({ success: false, message: "" });
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const [error, setError] = useState(null);
  
//   useEffect(() => {
//     const fetchProduct = async () => {
//       setLoading(true);
//       setError(null);
      
//       console.log(`Fetching product with slug: ${productSlug}`);
      
//       if (!productSlug) {
//         console.error("No product slug available");
//         setError("Product slug is missing");
//         setLoading(false);
//         return;
//       }
      
//       try {
//         // Make sure this URL is correct
//         const apiUrl = `/api/products/slug/${productSlug}`;
//         console.log(`Making API request to: ${apiUrl}`);
        
//         const response = await fetch(apiUrl);
        
//         console.log(`API response status: ${response.status}`);
        
//         if (!response.ok) {
//           const errorData = await response.json().catch(() => ({}));
//           throw new Error(`API error: ${response.status} - ${errorData.error || response.statusText}`);
//         }
        
//         const data = await response.json();
//         console.log('Received data:', data ? 'Data available' : 'No data');
        
//         if (!data.product) {
//           throw new Error('Product data missing from API response');
//         }
        
//         console.log(`Product found: ${data.product.name}`);
//         setProduct(data.product);
//         setRelatedProducts(data.relatedProducts || []);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//         setError(error.message || "Failed to load product");
//         // Uncomment the below line when you're done debugging
//         // router.push("/product/category/all");
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (productSlug) {
//       fetchProduct();
//     }
//   }, [productSlug, router]);
  
//   const incrementQuantity = () => {
//     if (product?.stockQuantity && quantity >= product.stockQuantity) {
//       return;
//     }
//     setQuantity(quantity + 1);
//   };
  
//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };
  
//   const handleAddToCart = async () => {
//     if (!isAuthenticated) {
//       router.push("/auth/user/login");
//       return;
//     }
    
//     setIsAddingToCart(true);
    
//     try {
//       const response = await fetch("/api/cart/item", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: userId,
//           productId: product.id,
//           quantity: quantity
//         }),
//       });
      
//       if (!response.ok) {
//         throw new Error("Failed to add item to cart");
//       }
      
//       setRequestStatus({
//         success: true,
//         message: "Item added to cart successfully!"
//       });
      
//       // Reset message after 3 seconds
//       setTimeout(() => {
//         setRequestStatus({ success: false, message: "" });
//       }, 3000);
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       setRequestStatus({
//         success: false,
//         message: "Failed to add item to cart"
//       });
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };
  
//   const formatCategory = (category) => {
//     if (!category) return null;
//     return category.toLowerCase().replace(/\s+/g, '-').replace(/[\/\+]/g, '-');
//   };
  
//   const handlePurchaseRequest = async () => {
//     if (!isAuthenticated) {
//       router.push("/auth/user/login");
//       return;
//     }
    
//     try {
//       const response = await fetch("/api/purchase-request", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: userId,
//           productId: product.id,
//           quantity: quantity,
//           notes: `Purchase request for ${product.name}`
//         }),
//       });
      
//       const data = await response.json();
      
//       if (response.ok) {
//         setPurchaseRequested(true);
//         setRequestStatus({
//           success: true,
//           message: "Purchase request submitted successfully!"
//         });
//       } else {
//         setRequestStatus({
//           success: false,
//           message: data.error || "Failed to submit purchase request"
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting purchase request:", error);
//       setRequestStatus({
//         success: false,
//         message: "An error occurred while submitting your request"
//       });
//     }
//   };
  
//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-12 flex flex-col justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
//         <p>Loading product: {productSlug}</p>
//       </div>
//     );
//   }
  
//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-12 text-center">
//         <h1 className="text-2xl font-bold mb-4">Error Loading Product</h1>
//         <p className="mb-6 text-red-600">{error}</p>
//         <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 mx-auto max-w-lg">
//           <h3 className="font-bold">Debug Info:</h3>
//           <p>Product Slug: {productSlug || 'Not available'}</p>
//         </div>
//         <Link 
//           href="/product/category/all" 
//           className="inline-flex items-center text-blue-600 hover:underline"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Browse All Products
//         </Link>
//       </div>
//     );
//   }
  
//   if (!product) {
//     return (
//       <div className="container mx-auto px-4 py-12 text-center">
//         <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
//         <p className="mb-6">The product you are looking for does not exist or has been removed.</p>
//         <Link 
//           href="/product/category/all" 
//           className="inline-flex items-center text-blue-600 hover:underline"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Browse All Products
//         </Link>
//       </div>
//     );
//   }
  
//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Back Button */}
//       <div className="mb-6">
//         <Link 
//           href={product.category ? `/product/category/${formatCategory(product.category)}` : "/product/category/all"} 
//           className="inline-flex items-center text-gray-600 hover:text-blue-600"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Back to {product.category ? product.category : "Products"}
//         </Link>
//       </div>
      
//       <div className="flex flex-col lg:flex-row gap-8 mb-12">
//         {/* Product Images */}
//         <div className="lg:w-1/2">
//           <div className="aspect-square relative rounded-lg overflow-hidden mb-4 bg-gray-100">
//             {product.images?.length > 0 ? (
//               <Image
//                 src={product.images[selectedImage]}
//                 alt={product.name || "Product image"}
//                 fill
//                 sizes="(max-width: 768px) 100vw, 50vw"
//                 className="object-contain"
//                 priority
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center">
//                 <span className="text-gray-400">No image available</span>
//               </div>
//             )}
//           </div>
          
//           {/* Thumbnail Gallery */}
//           {product.images?.length > 1 && (
//             <div className="grid grid-cols-5 gap-2">
//               {product.images.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImage(index)}
//                   className={`aspect-square relative border-2 rounded-md overflow-hidden ${
//                     selectedImage === index ? "border-blue-500" : "border-transparent"
//                   }`}
//                 >
//                   <Image
//                     src={image}
//                     alt={`${product.name} thumbnail ${index + 1}`}
//                     fill
//                     sizes="(max-width: 768px) 20vw, 10vw"
//                     className="object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
        
//         {/* Product Details */}
//         <div className="lg:w-1/2">
//           {/* Only show if authenticated */}
//           {isAuthenticated ? (
//             <>
//               <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
//               {product.category && (
//                 <Link 
//                   href={`/product/category/${formatCategory(product.category)}`}
//                   className="inline-block mb-4 text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full hover:bg-gray-200"
//                 >
//                   {product.category}
//                 </Link>
//               )}
              
//               <div className="text-2xl font-bold text-blue-600 mb-4">
//                 ${Number(product.price).toFixed(2)}
//               </div>
              
//               <div className="mb-6">
//                 <div className="flex items-center gap-1 mb-2">
//                   <span className={`w-3 h-3 rounded-full ${product.availability ? "bg-green-500" : "bg-red-500"}`}></span>
//                   <span>
//                     {product.availability 
//                       ? `In Stock ${product.stockQuantity ? `(${product.stockQuantity} available)` : ""}` 
//                       : "Out of Stock"}
//                   </span>
//                 </div>
                
//                 {product.tags?.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mt-3">
//                     {product.tags.map((tag, index) => (
//                       <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </div>
              
//               {product.description && (
//                 <div className="mb-6">
//                   <h3 className="text-lg font-semibold mb-2">Description</h3>
//                   <p className="text-gray-700">{product.description}</p>
//                 </div>
//               )}
              
//               {/* Purchase Controls */}
//               {product.availability && (
//                 <div className="space-y-4">
//                   <div className="flex items-center">
//                     <div className="mr-4">
//                       <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
//                         Quantity
//                       </label>
//                       <div className="flex border border-gray-300 rounded">
//                         <button 
//                           onClick={decrementQuantity}
//                           className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200"
//                         >
//                           <Minus className="w-4 h-4" />
//                         </button>
//                         <input
//                           type="number"
//                           id="quantity"
//                           value={quantity}
//                           onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
//                           min="1"
//                           max={product.stockQuantity || 999}
//                           className="w-16 text-center border-x border-gray-300"
//                         />
//                         <button 
//                           onClick={incrementQuantity}
//                           className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200"
//                         >
//                           <Plus className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
                    
//                     <div className="text-sm text-gray-500">
//                       Total: <span className="font-semibold">${(Number(product.price) * quantity).toFixed(2)}</span>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-col sm:flex-row gap-3">
//                     <button
//                       onClick={handleAddToCart}
//                       disabled={isAddingToCart}
//                       className={`flex-1 py-3 px-6 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
//                         isAddingToCart
//                           ? "bg-blue-400 text-white cursor-wait"
//                           : "bg-blue-600 text-white hover:bg-blue-700"
//                       }`}
//                     >
//                       {isAddingToCart ? (
//                         <>
//                           <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
//                           Adding...
//                         </>
//                       ) : (
//                         <>
//                           <ShoppingBag className="w-5 h-5" />
//                           Add to Cart
//                         </>
//                       )}
//                     </button>
                    
//                     <button
//                       onClick={handlePurchaseRequest}
//                       disabled={purchaseRequested}
//                       className={`flex-1 py-3 px-6 rounded-lg font-medium transition ${
//                         purchaseRequested
//                           ? "bg-green-100 text-green-800 cursor-not-allowed"
//                           : "bg-gray-200 text-gray-800 hover:bg-gray-300"
//                       }`}
//                     >
//                       {purchaseRequested ? "Request Submitted" : "Request Purchase"}
//                     </button>
//                   </div>
                  
//                   {/* Status message */}
//                   {requestStatus.message && (
//                     <div className={`mt-3 p-3 rounded-lg ${
//                       requestStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                     }`}>
//                       {requestStatus.message}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </>
//           ) : (
//             <>
//               {/* Limited content for non-authenticated users */}
//               <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
//               {product.category && (
//                 <div className="mb-4 text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full inline-block">
//                   {product.category}
//                 </div>
//               )}
              
//               <div className="bg-gray-100 rounded-lg p-6 mb-6 text-center">
//                 <h3 className="text-lg font-medium mb-3">Login to View Price and Details</h3>
//                 <p className="text-gray-600 mb-4">Please login to see product details, pricing, and to make purchases.</p>
//                 <button
//                   onClick={() => router.push("/auth/user/login")}
//                   className="bg-blue-600 text-white py-2 px-6 rounded font-medium hover:bg-blue-700 transition"
//                 >
//                   Login
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
      
//       {/* Related Products */}
//       {relatedProducts.length > 0 && (
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold mb-6">Related Products</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {relatedProducts.map((relatedProduct) => (
//               <ProductCard 
//                 key={relatedProduct.id} 
//                 product={relatedProduct} 
//                 isAuthenticated={isAuthenticated}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// app/product/[productSlug]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
// Fix the typo in the import
import ProductCard from "@/components/category/ProductCart";
import { Minus, Plus, ArrowLeft, ShoppingBag, Heart, Share2, Star } from "lucide-react";

export default function ProductDetailPage() {
  const { productSlug } = useParams();
  const router = useRouter();
  const { isAuthenticated, userType, userId } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [purchaseRequested, setPurchaseRequested] = useState(false);
  const [requestStatus, setRequestStatus] = useState({ success: false, message: "" });
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      
      console.log(`Fetching product with slug: ${productSlug}`);
      
      if (!productSlug) {
        console.error("No product slug available");
        setError("Product slug is missing");
        setLoading(false);
        return;
      }
      
      try {
        // Make sure this URL is correct
        const apiUrl = `/api/products/slug/${productSlug}`;
        console.log(`Making API request to: ${apiUrl}`);
        
        const response = await fetch(apiUrl);
        
        console.log(`API response status: ${response.status}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`API error: ${response.status} - ${errorData.error || response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Received data:', data ? 'Data available' : 'No data');
        
        if (!data.product) {
          throw new Error('Product data missing from API response');
        }
        
        console.log(`Product found: ${data.product.name}`);
        setProduct(data.product);
        setRelatedProducts(data.relatedProducts || []);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error.message || "Failed to load product");
        // Uncomment the below line when you're done debugging
        // router.push("/product/category/all");
      } finally {
        setLoading(false);
      }
    };
    
    if (productSlug) {
      fetchProduct();
    }
  }, [productSlug, router]);
  
  const incrementQuantity = () => {
    if (product?.stockQuantity && quantity >= product.stockQuantity) {
      return;
    }
    setQuantity(quantity + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push("/auth/user/login");
      return;
    }
    
    setIsAddingToCart(true);
    
    try {
      const response = await fetch("/api/cart/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: product.id,
          quantity: quantity
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
      
      setRequestStatus({
        success: true,
        message: "Item added to cart successfully!"
      });
      
      // Reset message after 3 seconds
      setTimeout(() => {
        setRequestStatus({ success: false, message: "" });
      }, 3000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setRequestStatus({
        success: false,
        message: "Failed to add item to cart"
      });
    } finally {
      setIsAddingToCart(false);
    }
  };
  
  const formatCategory = (category) => {
    if (!category) return null;
    return category.toLowerCase().replace(/\s+/g, '-').replace(/[\/\+]/g, '-');
  };
  
  const handlePurchaseRequest = async () => {
    if (!isAuthenticated) {
      router.push("/auth/user/login");
      return;
    }
    
    try {
      const response = await fetch("/api/purchase-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: product.id,
          quantity: quantity,
          notes: `Purchase request for ${product.name}`
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setPurchaseRequested(true);
        setRequestStatus({
          success: true,
          message: "Purchase request submitted successfully!"
        });
      } else {
        setRequestStatus({
          success: false,
          message: data.error || "Failed to submit purchase request"
        });
      }
    } catch (error) {
      console.error("Error submitting purchase request:", error);
      setRequestStatus({
        success: false,
        message: "An error occurred while submitting your request"
      });
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col justify-center items-center min-h-screen bg-white text-gray-800">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-indigo-600 font-medium">Loading product: {productSlug}</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center bg-white text-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Error Loading Product</h1>
        <p className="mb-6 text-red-600">{error}</p>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 mx-auto max-w-lg">
          <h3 className="font-bold text-gray-900">Debug Info:</h3>
          <p className="text-gray-800">Product Slug: {productSlug || 'Not available'}</p>
        </div>
        <Link 
          href="/product/category/all" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Browse All Products
        </Link>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center bg-white text-gray-800">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Product Not Found</h1>
        <p className="mb-6 text-gray-600">The product you are looking for does not exist or has been removed.</p>
        <Link 
          href="/product/category/all" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Browse All Products
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href={product.category ? `/product/category/${formatCategory(product.category)}` : "/product/category/all"} 
            className="inline-flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {product.category ? product.category : "Products"}
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Product Images */}
            <div className="lg:w-1/2 bg-gray-50 p-6 lg:p-8">
              <div className="aspect-square relative rounded-lg overflow-hidden mb-6 bg-white shadow-sm border border-gray-100">
                {product.images?.length > 0 ? (
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name || "Product image"}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-4"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {product.images?.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square relative border-2 rounded-md overflow-hidden hover:opacity-90 transition ${
                        selectedImage === index ? "border-indigo-500 ring-2 ring-indigo-200" : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 20vw, 10vw"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div className="lg:w-1/2 p-6 lg:p-8 lg:border-l border-gray-100">
              {/* Only show if authenticated */}
              {isAuthenticated ? (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      {product.category && (
                        <Link 
                          href={`/product/category/${formatCategory(product.category)}`}
                          className="inline-block mb-2 text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-100 transition-colors"
                        >
                          {product.category}
                        </Link>
                      )}
                      <h1 className="text-3xl font-bold mb-2 text-gray-900">{product.name}</h1>
                      
                      {/* Product Rating */}
                      <div className="flex items-center mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`w-4 h-4 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">4.0 (24 reviews)</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={toggleFavorite}
                        className={`p-2 rounded-full ${isFavorite ? "text-red-500 bg-red-50" : "text-gray-400 bg-gray-50 hover:text-red-500 hover:bg-red-50"} transition-colors`}
                      >
                        <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500" : ""}`} />
                      </button>
                      <button className="p-2 rounded-full text-gray-400 bg-gray-50 hover:text-indigo-500 hover:bg-indigo-50 transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <div className="text-3xl font-bold text-indigo-600">
                      ${Number(product.price).toFixed(2)}
                    </div>
                    {product.oldPrice && (
                      <div className="ml-3 text-lg text-gray-400 line-through">
                        ${Number(product.oldPrice).toFixed(2)}
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-3 h-3 rounded-full ${product.availability ? "bg-green-500" : "bg-red-500"}`}></span>
                      <span className={product.availability ? "text-green-700" : "text-red-700"}>
                        {product.availability 
                          ? `In Stock ${product.stockQuantity ? `(${product.stockQuantity} available)` : ""}` 
                          : "Out of Stock"}
                      </span>
                    </div>
                    
                    {product.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {product.tags.map((tag, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {product.description && (
                    <div className="mb-6 pb-6 border-b border-gray-100">
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">Description</h3>
                      <p className="text-gray-700 leading-relaxed">{product.description}</p>
                    </div>
                  )}
                  
                  {/* Purchase Controls */}
                  {product.availability && (
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="mr-6">
                          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                            Quantity
                          </label>
                          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                            <button 
                              onClick={decrementQuantity}
                              className="px-4 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors border-r border-gray-300"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <input
                              type="number"
                              id="quantity"
                              value={quantity}
                              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                              min="1"
                              max={product.stockQuantity || 999}
                              className="w-16 text-center focus:outline-none text-gray-800"
                            />
                            <button 
                              onClick={incrementQuantity}
                              className="px-4 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors border-l border-gray-300"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="text-sm font-medium text-gray-700">
                          Total: <span className="text-indigo-600 text-lg">${(Number(product.price) * quantity).toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3 mt-6">
                        <button
                          onClick={handleAddToCart}
                          disabled={isAddingToCart}
                          className={`flex-1 py-3 px-6 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                            isAddingToCart
                              ? "bg-indigo-400 text-white cursor-wait"
                              : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
                          }`}
                        >
                          {isAddingToCart ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                              <span className="text-white">Adding...</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-5 h-5" />
                              <span className="text-white">Add to Cart</span>
                            </>
                          )}
                        </button>
                        
                        <button
                          onClick={handlePurchaseRequest}
                          disabled={purchaseRequested}
                          className={`flex-1 py-3 px-6 rounded-lg font-medium transition ${
                            purchaseRequested
                              ? "bg-green-100 text-green-800 cursor-not-allowed"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200"
                          }`}
                        >
                          {purchaseRequested ? "Request Submitted" : "Request Purchase"}
                        </button>
                      </div>
                      
                      {/* Status message */}
                      {requestStatus.message && (
                        <div className={`mt-4 p-4 rounded-lg ${
                          requestStatus.success ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
                        }`}>
                          {requestStatus.message}
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Limited content for non-authenticated users */}
                  <h1 className="text-3xl font-bold mb-2 text-gray-900">{product.name}</h1>
                  
                  {product.category && (
                    <div className="mb-4 text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full inline-block">
                      {product.category}
                    </div>
                  )}
                  
                  <div className="bg-gray-50 rounded-xl p-8 mb-6 text-center border border-gray-100 shadow-sm mt-6">
                    <h3 className="text-xl font-medium mb-3 text-gray-900">Login to View Price and Details</h3>
                    <p className="text-gray-600 mb-6">Please login to see product details, pricing, and to make purchases.</p>
                    <button
                      onClick={() => router.push("/auth/user/login")}
                      className="bg-indigo-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
                    >
                      Login to Continue
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct} 
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}