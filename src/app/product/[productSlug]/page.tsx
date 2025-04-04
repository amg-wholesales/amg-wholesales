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
// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { useAuth } from "@/context/authContext";
// // Fix the typo in the import
// import ProductCard from "@/components/category/ProductCart";
// import { Minus, Plus, ArrowLeft, ShoppingBag, Heart, Share2, Star } from "lucide-react";

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
//   const [isFavorite, setIsFavorite] = useState(false);
  
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

//   const toggleFavorite = () => {
//     setIsFavorite(!isFavorite);
//   };
  
//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-12 flex flex-col justify-center items-center min-h-screen bg-white text-gray-800">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
//         <p className="text-indigo-600 font-medium">Loading product: {productSlug}</p>
//       </div>
//     );
//   }
  
//   if (error) {
//     return (
//       <div className="container mx-auto px-4 py-12 text-center bg-white text-gray-800">
//         <h1 className="text-2xl font-bold mb-4 text-gray-900">Error Loading Product</h1>
//         <p className="mb-6 text-red-600">{error}</p>
//         <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 mx-auto max-w-lg">
//           <h3 className="font-bold text-gray-900">Debug Info:</h3>
//           <p className="text-gray-800">Product Slug: {productSlug || 'Not available'}</p>
//         </div>
//         <Link 
//           href="/product/category/all" 
//           className="inline-flex items-center text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Browse All Products
//         </Link>
//       </div>
//     );
//   }
  
//   if (!product) {
//     return (
//       <div className="container mx-auto px-4 py-12 text-center bg-white text-gray-800">
//         <h1 className="text-2xl font-bold mb-4 text-gray-900">Product Not Found</h1>
//         <p className="mb-6 text-gray-600">The product you are looking for does not exist or has been removed.</p>
//         <Link 
//           href="/product/category/all" 
//           className="inline-flex items-center text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" />
//           Browse All Products
//         </Link>
//       </div>
//     );
//   }
  
//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-800">
//       <div className="container mx-auto px-4 py-8">
//         {/* Back Button */}
//         <div className="mb-6">
//           <Link 
//             href={product.category ? `/product/category/${formatCategory(product.category)}` : "/product/category/all"} 
//             className="inline-flex items-center text-gray-600 hover:text-indigo-600 transition-colors"
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Back to {product.category ? product.category : "Products"}
//           </Link>
//         </div>
        
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//           <div className="flex flex-col lg:flex-row">
//             {/* Product Images */}
//             <div className="lg:w-1/2 bg-gray-50 p-6 lg:p-8">
//               <div className="aspect-square relative rounded-lg overflow-hidden mb-6 bg-white shadow-sm border border-gray-100">
//                 {product.images?.length > 0 ? (
//                   <img
//                     src={product.images[selectedImage]}
//                     alt={product.name || "Product image"}
//                     sizes="(max-width: 768px) 100vw, 50vw"
//                     className="object-contain p-4"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center">
//                     <span className="text-gray-400">No image available</span>
//                   </div>
//                 )}
//               </div>
              
//               {/* Thumbnail Gallery */}
//               {product.images?.length > 1 && (
//                 <div className="grid grid-cols-5 gap-3">
//                   {product.images.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setSelectedImage(index)}
//                       className={`aspect-square relative border-2 rounded-md overflow-hidden hover:opacity-90 transition ${
//                         selectedImage === index ? "border-indigo-500 ring-2 ring-indigo-200" : "border-gray-200"
//                       }`}
//                     >
//                       <img
//                         src={image}
//                         alt={`${product.name} thumbnail ${index + 1}`}
//                         // fill
//                         sizes="(max-width: 768px) 20vw, 10vw"
//                         className="object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
            
//             {/* Product Details */}
//             <div className="lg:w-1/2 p-6 lg:p-8 lg:border-l border-gray-100">
//               {/* Only show if authenticated */}
//               {isAuthenticated ? (
//                 <>
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       {product.category && (
//                         <Link 
//                           href={`/product/category/${formatCategory(product.category)}`}
//                           className="inline-block mb-2 text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-100 transition-colors"
//                         >
//                           {product.category}
//                         </Link>
//                       )}
//                       <h1 className="text-3xl font-bold mb-2 text-gray-900">{product.name}</h1>
                      
//                       {/* Product Rating */}
//                       <div className="flex items-center mb-4">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <Star 
//                             key={star} 
//                             className={`w-4 h-4 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
//                           />
//                         ))}
//                         <span className="ml-2 text-sm text-gray-600">4.0 (24 reviews)</span>
//                       </div>
//                     </div>
                    
//                     <div className="flex space-x-2">
//                       <button 
//                         onClick={toggleFavorite}
//                         className={`p-2 rounded-full ${isFavorite ? "text-red-500 bg-red-50" : "text-gray-400 bg-gray-50 hover:text-red-500 hover:bg-red-50"} transition-colors`}
//                       >
//                         <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500" : ""}`} />
//                       </button>
//                       <button className="p-2 rounded-full text-gray-400 bg-gray-50 hover:text-indigo-500 hover:bg-indigo-50 transition-colors">
//                         <Share2 className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>
                  
//                   <div className="flex items-center mb-6">
//                     <div className="text-3xl font-bold text-indigo-600">
//                       ${Number(product.price).toFixed(2)}
//                     </div>
//                     {product.oldPrice && (
//                       <div className="ml-3 text-lg text-gray-400 line-through">
//                         ${Number(product.oldPrice).toFixed(2)}
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="mb-6 pb-6 border-b border-gray-100">
//                     <div className="flex items-center gap-2 mb-3">
//                       <span className={`w-3 h-3 rounded-full ${product.availability ? "bg-green-500" : "bg-red-500"}`}></span>
//                       <span className={product.availability ? "text-green-700" : "text-red-700"}>
//                         {product.availability 
//                           ? `In Stock ${product.stockQuantity ? `(${product.stockQuantity} available)` : ""}` 
//                           : "Out of Stock"}
//                       </span>
//                     </div>
                    
//                     {product.tags?.length > 0 && (
//                       <div className="flex flex-wrap gap-2 mt-4">
//                         {product.tags.map((tag, index) => (
//                           <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     )}
//                   </div>
                  
//                   {product.description && (
//                     <div className="mb-6 pb-6 border-b border-gray-100">
//                       <h3 className="text-lg font-semibold mb-3 text-gray-900">Description</h3>
//                       <p className="text-gray-700 leading-relaxed">{product.description}</p>
//                     </div>
//                   )}
                  
//                   {/* Purchase Controls */}
//                   {product.availability && (
//                     <div className="space-y-4">
//                       <div className="flex items-center">
//                         <div className="mr-6">
//                           <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
//                             Quantity
//                           </label>
//                           <div className="flex border border-gray-300 rounded-lg overflow-hidden">
//                             <button 
//                               onClick={decrementQuantity}
//                               className="px-4 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors border-r border-gray-300"
//                             >
//                               <Minus className="w-4 h-4" />
//                             </button>
//                             <input
//                               type="number"
//                               id="quantity"
//                               value={quantity}
//                               onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
//                               min="1"
//                               max={product.stockQuantity || 999}
//                               className="w-16 text-center focus:outline-none text-gray-800"
//                             />
//                             <button 
//                               onClick={incrementQuantity}
//                               className="px-4 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors border-l border-gray-300"
//                             >
//                               <Plus className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>
                        
//                         <div className="text-sm font-medium text-gray-700">
//                           Total: <span className="text-indigo-600 text-lg">${(Number(product.price) * quantity).toFixed(2)}</span>
//                         </div>
//                       </div>
                      
//                       <div className="flex flex-col sm:flex-row gap-3 mt-6">
//                         <button
//                           onClick={handleAddToCart}
//                           disabled={isAddingToCart}
//                           className={`flex-1 py-3 px-6 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
//                             isAddingToCart
//                               ? "bg-indigo-400 text-white cursor-wait"
//                               : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg"
//                           }`}
//                         >
//                           {isAddingToCart ? (
//                             <>
//                               <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
//                               <span className="text-white">Adding...</span>
//                             </>
//                           ) : (
//                             <>
//                               <ShoppingBag className="w-5 h-5" />
//                               <span className="text-white">Add to Cart</span>
//                             </>
//                           )}
//                         </button>
                        
//                         <button
//                           onClick={handlePurchaseRequest}
//                           disabled={purchaseRequested}
//                           className={`flex-1 py-3 px-6 rounded-lg font-medium transition ${
//                             purchaseRequested
//                               ? "bg-green-100 text-green-800 cursor-not-allowed"
//                               : "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200"
//                           }`}
//                         >
//                           {purchaseRequested ? "Request Submitted" : "Request Purchase"}
//                         </button>
//                       </div>
                      
//                       {/* Status message */}
//                       {requestStatus.message && (
//                         <div className={`mt-4 p-4 rounded-lg ${
//                           requestStatus.success ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
//                         }`}>
//                           {requestStatus.message}
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <>
//                   {/* Limited content for non-authenticated users */}
//                   <h1 className="text-3xl font-bold mb-2 text-gray-900">{product.name}</h1>
                  
//                   {product.category && (
//                     <div className="mb-4 text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full inline-block">
//                       {product.category}
//                     </div>
//                   )}
                  
//                   <div className="bg-gray-50 rounded-xl p-8 mb-6 text-center border border-gray-100 shadow-sm mt-6">
//                     <h3 className="text-xl font-medium mb-3 text-gray-900">Login to View Price and Details</h3>
//                     <p className="text-gray-600 mb-6">Please login to see product details, pricing, and to make purchases.</p>
//                     <button
//                       onClick={() => router.push("/auth/user/login")}
//                       className="bg-indigo-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
//                     >
//                       Login to Continue
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
        
//         {/* Related Products */}
//         {relatedProducts.length > 0 && (
//           <div className="mt-12">
//             <h2 className="text-2xl font-bold mb-6 text-gray-900">Related Products</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {relatedProducts.map((relatedProduct) => (
//                 <ProductCard 
//                   key={relatedProduct.id} 
//                   product={relatedProduct} 
//                   isAuthenticated={isAuthenticated}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import ProductCard from "@/components/category/ProductCart";
import { 
  Minus, 
  Plus, 
  ArrowLeft, 
  ShoppingBag, 
  Heart, 
  Share2, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  ShieldCheck, 
  Truck, 
  Clock,
  ArrowUpRight,
  Loader
} from "lucide-react";

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
  const [activeTab, setActiveTab] = useState('description');
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      
      if (!productSlug) {
        setError("Product slug is missing");
        setLoading(false);
        return;
      }
      
      try {
        const apiUrl = `/api/products/slug/${productSlug}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`API error: ${response.status} - ${errorData.error || response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!data.product) {
          throw new Error('Product data missing from API response');
        }
        
        setProduct(data.product);
        setRelatedProducts(data.relatedProducts || []);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error.message || "Failed to load product");
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
  
  const shareProduct = (platform) => {
    const url = window.location.href;
    const text = `Check out this product: ${product.name}`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${text}&body=${url}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setRequestStatus({
          success: true,
          message: "Link copied to clipboard!"
        });
        setTimeout(() => {
          setRequestStatus({ success: false, message: "" });
        }, 2000);
        break;
    }
    
    setShowShareMenu(false);
  };
  
  // Render star ratings
  const renderStars = (rating = 4) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <Star 
            key={i} 
            className="w-4 h-4 text-amber-400 fill-amber-400" 
          />
        );
      } else if (i - 0.5 <= rating) {
        stars.push(
          <Star 
            key={i} 
            className="w-4 h-4 text-amber-400" 
            strokeWidth={1} 
          />
        );
      } else {
        stars.push(
          <Star 
            key={i} 
            className="w-4 h-4 text-gray-300" 
          />
        );
      }
    }
    
    return stars;
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col justify-center items-center min-h-screen bg-white text-gray-800">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 animate-ping rounded-full bg-indigo-400 opacity-25"></div>
          <div className="relative rounded-full w-20 h-20 flex items-center justify-center bg-white border-2 border-indigo-500">
            <Loader className="h-8 w-8 animate-spin text-indigo-600" />
          </div>
        </div>
        <p className="mt-6 text-indigo-600 font-medium">Loading product details...</p>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center bg-white text-gray-800">
        <div className="max-w-lg mx-auto">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Error Loading Product</h1>
          <p className="mb-6 text-red-600">{error}</p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 mx-auto max-w-lg">
            <h3 className="font-bold text-gray-900">Debug Info:</h3>
            <p className="text-gray-800">Product Slug: {productSlug || 'Not available'}</p>
          </div>
          <Link 
            href="/product/category/all" 
            className="inline-flex items-center text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }
  
  // Product not found state
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center bg-white text-gray-800">
        <div className="max-w-lg mx-auto">
          <Info className="h-16 w-16 text-indigo-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Product Not Found</h1>
          <p className="mb-6 text-gray-600">The product you are looking for does not exist or has been removed.</p>
          <Link 
            href="/product/category/all" 
            className="inline-flex items-center text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <ArrowRight size={12} className="mx-2" />
            <Link href="/product/category/all" className="hover:text-indigo-600 transition-colors">Products</Link>
            {product.category && (
              <>
                <ArrowRight size={12} className="mx-2" />
                <Link 
                  href={`/product/category/${formatCategory(product.category)}`}
                  className="hover:text-indigo-600 transition-colors"
                >
                  {product.category}
                </Link>
              </>
            )}
            <ArrowRight size={12} className="mx-2" />
            <span className="text-indigo-600 font-medium">{product.name}</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="flex flex-col lg:flex-row">
            {/* Product Images */}
            <div className="lg:w-2/5 bg-gray-50 p-6 lg:p-8">
              <div className="aspect-square relative rounded-xl overflow-hidden mb-6 bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                {product.images?.length > 0 ? (
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name || "Product image"}
                    className="object-contain max-h-full max-w-full p-4 transition-all duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
                
                {/* Favorite and Share buttons overlay */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button 
                    onClick={toggleFavorite}
                    className={`p-3 rounded-full backdrop-blur-sm ${
                      isFavorite ? "bg-red-500/90 text-white" : "bg-white/90 text-gray-700 hover:text-red-500"
                    } shadow-md transition-colors`}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-white" : ""}`} />
                  </button>
                  
                  <div className="relative">
                    <button 
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="p-3 rounded-full bg-white/90 text-gray-700 hover:text-indigo-500 shadow-md backdrop-blur-sm transition-colors"
                      aria-label="Share product"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    
                    {/* Share menu dropdown */}
                    {showShareMenu && (
                      <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg overflow-hidden z-10 border border-gray-200 animate-fadeIn">
                        <button 
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 transition-colors flex items-center"
                          onClick={() => shareProduct('facebook')}
                        >
                          <span className="w-6 h-6 mr-2 flex items-center justify-center text-blue-600">
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                            </svg>
                          </span>
                          Facebook
                        </button>
                        <button 
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 transition-colors flex items-center"
                          onClick={() => shareProduct('twitter')}
                        >
                          <span className="w-6 h-6 mr-2 flex items-center justify-center text-blue-400">
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                          </span>
                          Twitter
                        </button>
                        <button 
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 transition-colors flex items-center"
                          onClick={() => shareProduct('email')}
                        >
                          <span className="w-6 h-6 mr-2 flex items-center justify-center text-gray-600">
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                          </span>
                          Email
                        </button>
                        <button 
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 transition-colors flex items-center"
                          onClick={() => shareProduct('copy')}
                        >
                          <span className="w-6 h-6 mr-2 flex items-center justify-center text-gray-600">
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                            </svg>
                          </span>
                          Copy Link
                        </button>
                      </div>
                    )}
                  </div>
                </div>
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
                      <img
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div className="lg:w-3/5 p-6 lg:p-8 lg:border-l border-gray-200">
              {/* Only show if authenticated */}
              {isAuthenticated ? (
                <>
                  <div className="flex flex-col mb-6">
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
                      <div className="flex mr-2">
                        {renderStars(product.rating || 4)}
                      </div>
                      <span className="text-sm text-gray-600">4.0 ({product.reviewCount || 24} reviews)</span>
                    </div>
                    
                    {/* Tags */}
                    {product.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.tags.map((tag, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
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
                    
                    {/* Discount percentage */}
                    {product.oldPrice && (
                      <div className="ml-4 px-2 py-1 bg-red-100 text-red-700 rounded-md text-sm font-medium">
                        {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>
                  
                  {/* Product Status */}
                  <div className="mb-8 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-3 h-3 rounded-full ${product.availability ? "bg-green-500" : "bg-red-500"}`}></span>
                      <span className={product.availability ? "text-green-700 font-medium" : "text-red-700 font-medium"}>
                        {product.availability 
                          ? `In Stock ${product.stockQuantity ? `(${product.stockQuantity} available)` : ""}` 
                          : "Out of Stock"}
                      </span>
                    </div>
                    
                    {/* Additional product benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <ShieldCheck className="h-4 w-4 mr-2 text-green-600" />
                        Quality Guaranteed
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Truck className="h-4 w-4 mr-2 text-indigo-600" />
                        Fast Shipping Available
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-amber-600" />
                        24/7 Customer Support
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <ArrowUpRight className="h-4 w-4 mr-2 text-blue-600" />
                        Secure Checkout
                      </div>
                    </div>
                  </div>
                  
                  {/* Tabs for Description and Details */}
                  <div className="mb-8">
                    <div className="flex border-b border-gray-200 mb-6">
                      <button
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                          activeTab === 'description' 
                            ? 'border-indigo-600 text-indigo-600' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                        onClick={() => setActiveTab('description')}
                      >
                        Description
                      </button>
                      <button
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                          activeTab === 'details' 
                            ? 'border-indigo-600 text-indigo-600' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                        onClick={() => setActiveTab('details')}
                      >
                        Details
                      </button>
                      <button
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                          activeTab === 'shipping' 
                            ? 'border-indigo-600 text-indigo-600' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                        onClick={() => setActiveTab('shipping')}
                      >
                        Shipping
                      </button>
                    </div>
                    
                    {activeTab === 'description' && (
                      <div className="animate-fadeIn">
                        <p className="text-gray-700 leading-relaxed">
                          {product.description || "No description available for this product."}
                        </p>
                      </div>
                    )}
                    
                    {activeTab === 'details' && (
                      <div className="animate-fadeIn">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Product ID</h4>
                              <p className="text-gray-900">{product.id || "N/A"}</p>
                            </div> */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Category</h4>
                              <p className="text-gray-900">{product.category || "N/A"}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Stock</h4>
                              <p className="text-gray-900">{product.stockQuantity || "N/A"}</p>
                            </div>
                            {/* <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Date Added</h4>
                              <p className="text-gray-900">{product.createdAt 
                                ? new Date(product.createdAt).toLocaleDateString() 
                                : "N/A"}</p>
                            </div> */}
                          </div>
                          
                          {/* More product details can be added here */}
                        </div>
                      </div>
                    )}
                    
                    {activeTab === 'shipping' && (
                      <div className="animate-fadeIn">
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <Truck className="w-5 h-5 text-indigo-600 mr-3 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-gray-900">Standard Shipping</h4>
                              <p className="text-gray-600 text-sm">2-5 business days</p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <AlertTriangle className="w-5 h-5 text-amber-500 mr-3 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-gray-900">Returns</h4>
                              <p className="text-gray-600 text-sm">30 days return policy</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Purchase Controls */}
                  {product.availability ? (
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:space-x-4">
                        <div>
                          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                            Quantity
                          </label>
                          <div className="flex border border-gray-300 rounded-lg overflow-hidden shadow-sm w-32">
                          <button 
                              onClick={decrementQuantity}
                              className="px-3 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors border-r border-gray-300"
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
                              className="w-full text-center focus:outline-none focus:ring-0 border-0 text-gray-800"
                            />
                            <button 
                              onClick={incrementQuantity}
                              className="px-3 py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors border-l border-gray-300"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-4 sm:mt-0 text-right">
                          <div className="text-sm font-medium text-gray-500 mb-1">Total Price</div>
                          <div className="text-2xl font-bold text-indigo-600">${(Number(product.price) * quantity).toFixed(2)}</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={handleAddToCart}
                          disabled={isAddingToCart}
                          className={`flex-1 py-3 px-6 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                            isAddingToCart
                              ? "bg-indigo-400 text-white cursor-wait"
                              : "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:shadow-lg"
                          }`}
                        >
                          {isAddingToCart ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                              <span>Adding...</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-5 h-5" />
                              <span>Add to Cart</span>
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
                        <div className={`p-4 rounded-lg animate-fadeIn ${
                          requestStatus.success ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
                        }`}>
                          <div className="flex items-center">
                            {requestStatus.success ? (
                              <CheckCircle className="h-5 w-5 mr-2" />
                            ) : (
                              <AlertTriangle className="h-5 w-5 mr-2" />
                            )}
                            {requestStatus.message}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-red-800">Out of Stock</h3>
                          <p className="text-red-700 text-sm">This product is currently unavailable.</p>
                          <button 
                            className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                            onClick={() => {
                              // Notify when back in stock functionality
                              alert("You'll be notified when this product is back in stock.");
                            }}
                          >
                            Notify me when available
                          </button>
                        </div>
                      </div>
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
                  
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8 mb-6 text-center border border-indigo-100 shadow-sm mt-6">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <ShoppingBag className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-medium mb-3 text-gray-900">Login to View Price and Details</h3>
                    <p className="text-gray-600 mb-6">Please login to see product details, pricing, and to make purchases.</p>
                    <button
                      onClick={() => router.push("/auth/user/login")}
                      className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 px-8 rounded-lg font-medium hover:shadow-lg transition"
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
              <Link 
                href={product.category ? `/product/category/${formatCategory(product.category)}` : "/product/category/all"}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
              >
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
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
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}