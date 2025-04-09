
// // "use client";

// // import { useState, useEffect } from "react";
// // import Link from "next/link";
// // import { useRouter } from "next/navigation";
// // import { useAuth } from "@/context/authContext";
// // import { 
// //   ShoppingCart, 
// //   Heart, 
// //   Eye, 
// //   Star, 
// //   ChevronRight,
// //   Check, 
// //   AlertCircle,
// //   ShoppingBag,
// //   Loader2,
// //   X,
// //   Clock,
// //   Award,
// //   Flame,
// //   BellRing
// // } from "lucide-react";

// // export default function ProductCard({ product, isAuthenticated, viewMode = "grid" }) {
// //   const router = useRouter();
// //   const { userId, userType } = useAuth();
// //   const [isAddingToCart, setIsAddingToCart] = useState(false);
// //   const [isHovered, setIsHovered] = useState(false);
// //   const [addedToCart, setAddedToCart] = useState(false);
// //   const [showTooltip, setShowTooltip] = useState(false);
// //   const [imageLoaded, setImageLoaded] = useState(false);
// //   const [showQuickView, setShowQuickView] = useState(false);
// //   const [likedProduct, setLikedProduct] = useState(false);
  
// //   // Determine the correct price based on user type
// //   const getPrice = () => {
// //     if (!isAuthenticated) return null;
    
// //     // If user is a retail buyer, show retail price (or calculate 15% more if not set)
// //     if (userType === 'RETAIL_BUYER') {
// //       return product.retailPrice || (product.price ? Number(product.price) * 1.15 : null);
// //     }
    
// //     // For wholesale buyers and admins, show wholesale price
// //     return product.price;
// //   };
  
// //   const formattedPrice = getPrice() ? Number(getPrice()).toFixed(2) : null;
  
// //   // Reset added state after showing success message
// //   useEffect(() => {
// //     if (addedToCart) {
// //       const timer = setTimeout(() => {
// //         setAddedToCart(false);
// //       }, 3000);
      
// //       return () => clearTimeout(timer);
// //     }
// //   }, [addedToCart]);
  
// //   // Reset tooltip visibility
// //   useEffect(() => {
// //     if (showTooltip) {
// //       const timer = setTimeout(() => {
// //         setShowTooltip(false);
// //       }, 2000);
      
// //       return () => clearTimeout(timer);
// //     }
// //   }, [showTooltip]);
  
// //   const handleAddToCart = async (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
    
// //     if (!isAuthenticated) {
// //       router.push("/auth/user/login");
// //       return;
// //     }
    
// //     if (!product.availability) {
// //       setShowTooltip(true);
// //       return;
// //     }
    
// //     setIsAddingToCart(true);
    
// //     try {
// //       const response = await fetch("/api/cart/item", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           userId: userId,
// //           productId: product.id,
// //           quantity: 1
// //         }),
// //       });
      
// //       if (!response.ok) {
// //         throw new Error("Failed to add item to cart");
// //       }
      
// //       setAddedToCart(true);
// //     } catch (error) {
// //       console.error("Error adding to cart:", error);
// //     } finally {
// //       setIsAddingToCart(false);
// //     }
// //   };
  
// //   const handleQuickView = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     setShowQuickView(true);
// //   };
  
// //   const closeQuickView = (e) => {
// //     if (e) {
// //       e.preventDefault();
// //       e.stopPropagation();
// //     }
// //     setShowQuickView(false);
// //   };
  
// //   const handleWishlist = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
    
// //     if (!isAuthenticated) {
// //       router.push("/auth/user/login");
// //       return;
// //     }
    
// //     setLikedProduct(!likedProduct);
// //   };
  
// //   // Generate star ratings
// //   const renderStars = () => {
// //     const rating = product.rating || 0;
// //     const stars = [];
    
// //     for (let i = 1; i <= 5; i++) {
// //       if (i <= rating) {
// //         stars.push(
// //           <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
// //         );
// //       } else if (i - 0.5 <= rating) {
// //         stars.push(
// //           <Star key={i} size={14} className="text-amber-400" strokeWidth={1} />
// //         );
// //       } else {
// //         stars.push(
// //           <Star key={i} size={14} className="text-gray-300" />
// //         );
// //       }
// //     }
    
// //     return stars;
// //   };
  
// //   // Format date to show how new the product is
// //   const formatDate = () => {
// //     if (!product.createdAt) return null;
    
// //     const productDate = new Date(product.createdAt);
// //     const now = new Date();
// //     const diffTime = Math.abs(now - productDate);
// //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
// //     if (diffDays <= 7) {
// //       return "New";
// //     }
    
// //     return null;
// //   };
  
// //   // Calculate discount percentage
// //   const discountPercentage = () => {
// //     if (!product.originalPrice || !product.price) return null;
    
// //     const discount = ((product.originalPrice - product.price) / product.originalPrice) * 100;
// //     return Math.round(discount);
// //   };
  
// //   // Conditionally render based on view mode
// //   if (viewMode === "list") {
// //     // List view layout with mobile responsiveness
// //     return (
// //       <div 
// //         className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-indigo-200 group"
// //         onMouseEnter={() => setIsHovered(true)}
// //         onMouseLeave={() => setIsHovered(false)}
// //       >
// //         <Link href={`/product/${product.slug || product.id}`} className="flex flex-col sm:flex-row">
// //           {/* Product Image - Full width on mobile, 30% on larger screens */}
// //           <div className="w-full sm:w-1/3 relative">
// //             <div className="aspect-square relative bg-gradient-to-b from-gray-50 to-white">
// //               {!imageLoaded && (
// //                 <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
// //                   <div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
// //                 </div>
// //               )}
              
// //               {product.images?.length > 0 ? (
// //                 <img
// //                   src={product.images[0]}
// //                   alt={product.name || "Product image"}
// //                   className="object-contain p-4 absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
// //                   onLoad={() => setImageLoaded(true)}
// //                   style={{ opacity: imageLoaded ? 1 : 0 }}
// //                 />
// //               ) : (
// //                 <div className="w-full h-full bg-gray-100 flex items-center justify-center">
// //                   <span className="text-gray-400">No image</span>
// //                 </div>
// //               )}
// //             </div>
            
// //             {/* Badges */}
// //             <div className="absolute top-2 left-2 flex flex-col gap-1">
// //               {discountPercentage() && (
// //                 <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm flex items-center">
// //                   <Flame size={12} className="mr-1" /> {discountPercentage()}% OFF
// //                 </span>
// //               )}
              
// //               {formatDate() && (
// //                 <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm flex items-center">
// //                   <BellRing size={12} className="mr-1" /> {formatDate()}
// //                 </span>
// //               )}
              
// //               {product.bestSeller && (
// //                 <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 text-xs font-bold px-2 py-1 rounded-md shadow-sm flex items-center">
// //                   <Award size={12} className="mr-1" /> Best Seller
// //                 </span>
// //               )}
              
// //               {/* Show a badge for retail/wholesale buyer */}
// //               {userType === 'RETAIL_BUYER' && (
// //                 <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
// //                   Retail Price
// //                 </span>
// //               )}
// //               {userType === 'WHOLESALE_BUYER' && (
// //                 <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
// //                   Wholesale Price
// //                 </span>
// //               )}
// //             </div>
// //           </div>
          
// //           {/* Product Details - Full width on mobile, 70% on larger screens */}
// //           <div className="w-full sm:w-2/3 p-4 flex flex-col">
// //             {/* Price and rating */}
// //             <div className="flex justify-between mb-1">
// //               {isAuthenticated ? (
// //                 <div className="flex items-baseline">
// //                   <span className="text-lg font-bold text-gray-900">
// //                     ${formattedPrice}
// //                   </span>
                  
// //                   {product.originalPrice && (
// //                     <span className="ml-2 text-sm text-gray-500 line-through">
// //                       ${Number(product.originalPrice).toFixed(2)}
// //                     </span>
// //                   )}
// //                 </div>
// //               ) : (
// //                 <span className="text-sm font-medium text-gray-800">
// //                   Login to view price
// //                 </span>
// //               )}
              
// //               {product.availability ? (
// //                 <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
// //                   <Check size={12} className="mr-1" />
// //                   In Stock
// //                 </span>
// //               ) : (
// //                 <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
// //                   <AlertCircle size={12} className="mr-1" />
// //                   Out of Stock
// //                 </span>
// //               )}
// //             </div>
            
// //             {/* Product title */}
// //             <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 tracking-wide line-clamp-2 group-hover:text-indigo-800 transition-colors">
// //               {product.name || "Unnamed Product"}
// //             </h3>
            
// //             {/* Star rating */}
// //             {product.rating && (
// //               <div className="flex items-center mb-2">
// //                 <div className="flex mr-1">
// //                   {renderStars()}
// //                 </div>
// //                 <span className="text-xs text-gray-500">
// //                   ({product.reviewCount || 0} reviews)
// //                 </span>
// //               </div>
// //             )}
            
// //             {/* Description */}
// //             {product.description && (
// //               <p className="text-sm text-gray-500 mb-3 line-clamp-2">
// //                 {product.description}
// //               </p>
// //             )}
            
// //             {/* Stock info */}
// //             {isAuthenticated && product.stockQuantity !== null && (
// //               <div className="flex items-center text-xs text-gray-500 mb-3">
// //                 <Clock size={12} className="mr-1" />
// //                 {product.stockQuantity} available
// //               </div>
// //             )}
            
// //             {/* Action buttons - Mobile friendly layout */}
// //             <div className="mt-auto pt-2 flex gap-2">
// //               <button
// //                 onClick={handleAddToCart}
// //                 disabled={!product.availability || isAddingToCart || !isAuthenticated}
// //                 className={`flex-1 py-2.5 px-3 rounded-lg font-medium text-sm transition flex items-center justify-center ${
// //                   !isAuthenticated
// //                     ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:shadow-md"
// //                     : !product.availability
// //                     ? "bg-gray-200 text-gray-500 cursor-not-allowed"
// //                     : isAddingToCart
// //                     ? "bg-indigo-400 text-white cursor-wait"
// //                     : addedToCart
// //                     ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
// //                     : "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:shadow-md"
// //                 }`}
// //               >
// //                 {isAddingToCart ? (
// //                   <>
// //                     <Loader2 size={16} className="mr-2 animate-spin" />
// //                     Adding...
// //                   </>
// //                 ) : addedToCart ? (
// //                   <>
// //                     <Check size={16} className="mr-1" />
// //                     Added
// //                   </>
// //                 ) : !isAuthenticated ? (
// //                   <>
// //                     <ShoppingCart size={16} className="mr-1" />
// //                     Login to Buy
// //                   </>
// //                 ) : (
// //                   <>
// //                     <ShoppingCart size={16} className="mr-1" />
// //                     Add to Cart
// //                   </>
// //                 )}
// //               </button>
              
// //               <button
// //                 onClick={handleQuickView}
// //                 aria-label="Quick view"
// //                 className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
// //               >
// //                 <Eye size={16} />
// //               </button>
              
// //               <button
// //                 onClick={handleWishlist}
// //                 aria-label="Add to wishlist"
// //                 className={`h-10 w-10 flex items-center justify-center rounded-lg ${
// //                   likedProduct 
// //                     ? "bg-red-50 text-red-500" 
// //                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
// //                 } transition`}
// //               >
// //                 <Heart size={16} className={likedProduct ? "fill-red-500" : ""} />
// //               </button>
// //             </div>
            
// //             {/* Learn more link */}
// //             <Link 
// //               href={`/product/${product.slug || product.id}`}
// //               className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center mt-3 group/link"
// //             >
// //               View Details
// //               <ChevronRight size={16} className="ml-1 transition-transform group-hover/link:translate-x-1" />
// //             </Link>
// //           </div>
// //         </Link>
        
// //         {/* Out of stock tooltip */}
// //         {showTooltip && (
// //           <div className="absolute top-0 right-0 mt-2 mr-2 bg-gray-800 text-white text-xs rounded px-2 py-1 animate-fade-in-out shadow-md z-20">
// //             Item is out of stock
// //           </div>
// //         )}
        
// //         {/* Quick View Modal */}
// //         {showQuickView && (
// //           <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeQuickView}>
// //             <div 
// //               className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-modal-appear" 
// //               onClick={(e) => e.stopPropagation()}
// //             >
// //               <div className="flex justify-between items-center border-b border-gray-200 p-4">
// //                 <h3 className="text-lg font-semibold text-gray-900">Quick View</h3>
// //                 <button onClick={closeQuickView} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
// //                   <X size={20} />
// //                 </button>
// //               </div>
// //               <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6">
// //                 <div className="md:w-1/2">
// //                   {product.images?.length > 0 ? (
// //                     <img
// //                       src={product.images[0]}
// //                       alt={product.name || "Product image"}
// //                       className="w-full h-auto object-contain rounded-lg shadow-sm"
// //                     />
// //                   ) : (
// //                     <div className="w-full aspect-square bg-gray-100 flex items-center justify-center rounded-lg">
// //                       <span className="text-gray-400">No image</span>
// //                     </div>
// //                   )}
// //                 </div>
// //                 <div className="md:w-1/2">
// //                   <h2 className="text-xl font-medium text-gray-900 mb-2">{product.name}</h2>
                  
// //                   {product.rating && (
// //                     <div className="flex items-center mb-3">
// //                       <div className="flex mr-1">
// //                         {renderStars()}
// //                       </div>
// //                       <span className="text-xs text-gray-500">
// //                         ({product.reviewCount || 0} reviews)
// //                       </span>
// //                     </div>
// //                   )}
                  
// //                   {isAuthenticated ? (
// //                     <div className="flex items-baseline mb-4">
// //                       <span className="text-2xl font-bold text-gray-900">
// //                         ${formattedPrice}
// //                       </span>
                      
// //                       {product.originalPrice && (
// //                         <span className="ml-2 text-base text-gray-500 line-through">
// //                           ${Number(product.originalPrice).toFixed(2)}
// //                         </span>
// //                       )}
                      
// //                       {/* Price type label */}
// //                       {userType === 'RETAIL_BUYER' && (
// //                         <span className="ml-2 text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
// //                           Retail
// //                         </span>
// //                       )}
// //                       {userType === 'WHOLESALE_BUYER' && (
// //                         <span className="ml-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
// //                           Wholesale
// //                         </span>
// //                       )}
// //                     </div>
// //                   ) : (
// //                     <div className="mb-4">
// //                       <span className="text-base font-medium text-gray-800">
// //                         Login to view price
// //                       </span>
// //                     </div>
// //                   )}
                  
// //                   {product.description && (
// //                     <p className="text-gray-600 mb-6">
// //                       {product.description}
// //                     </p>
// //                   )}
                  
// //                   <div className="flex items-center gap-3 mb-4">
// //                     {product.availability ? (
// //                       <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
// //                         <Check size={14} className="mr-1" />
// //                         In Stock
// //                       </span>
// //                     ) : (
// //                       <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
// //                         <AlertCircle size={14} className="mr-1" />
// //                         Out of Stock
// //                       </span>
// //                     )}
                    
// //                     {isAuthenticated && product.stockQuantity !== null && (
// //                       <span className="text-sm text-gray-500 flex items-center">
// //                         <Clock size={14} className="mr-1" />
// //                         {product.stockQuantity} available
// //                       </span>
// //                     )}
// //                   </div>
                  
// //                   <div className="space-y-4">
// //                     <button
// //                       onClick={handleAddToCart}
// //                       disabled={!product.availability || isAddingToCart || !isAuthenticated}
// //                       className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition flex items-center justify-center ${
// //                         !isAuthenticated
// //                           ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:shadow-md"
// //                           : !product.availability
// //                           ? "bg-gray-200 text-gray-500 cursor-not-allowed"
// //                           : isAddingToCart
// //                           ? "bg-indigo-400 text-white cursor-wait"
// //                           : addedToCart
// //                           ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
// //                           : "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:shadow-md"
// //                       }`}
// //                     >
// //                       {isAddingToCart ? (
// //                         <>
// //                           <Loader2 size={18} className="mr-2 animate-spin" />
// //                           Adding to Cart...
// //                         </>
// //                       ) : addedToCart ? (
// //                         <>
// //                           <Check size={18} className="mr-2" />
// //                           Added to Cart
// //                         </>
// //                       ) : !isAuthenticated ? (
// //                         <>
// //                           <ShoppingCart size={18} className="mr-2" />
// //                           Login to Buy
// //                         </>
// //                       ) : (
// //                         <>
// //                           <ShoppingCart size={18} className="mr-2" />
// //                           Add to Cart
// //                         </>
// //                       )}
// //                     </button>
                    
// //                     <div className="flex gap-2">
// //                       <Link 
// //                         href={`/product/${product.slug || product.id}`}
// //                         className="block flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium text-sm text-center transition-colors"
// //                       >
// //                         View Full Details
// //                       </Link>
                      
// //                       <button
// //                         onClick={handleWishlist}
// //                         className={`w-12 h-12 flex items-center justify-center rounded-lg ${
// //                           likedProduct 
// //                             ? "bg-red-50 text-red-500 border border-red-200" 
// //                             : "bg-gray-100 text-gray-700 hover:bg-gray-200"
// //                         } transition`}
// //                         aria-label="Add to wishlist"
// //                       >
// //                         <Heart size={20} className={likedProduct ? "fill-red-500" : ""} />
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     );
// //   }
  
// //   // Default grid view layout with premium styling and improved mobile responsiveness
// //   return (
// //     <div 
// //       className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-indigo-200 group h-full flex flex-col"
// //       onMouseEnter={() => setIsHovered(true)}
// //       onMouseLeave={() => setIsHovered(false)}
// //     >
// //       <Link href={`/product/${product.slug || product.id}`} className="flex flex-col h-full">
// //         {/* Product Image with enhanced styling and loading state */}
// //         <div className="aspect-square relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
// //           {!imageLoaded && (
// //             <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
// //               <div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
// //             </div>
// //           )}
          
// //           <div className="absolute inset-0 p-4 flex items-center justify-center">
// //             {product.images?.length > 0 ? (
// //               <img
// //                 src={product.images[0]}
// //                 alt={product.name || "Product image"}
// //                 className={`object-contain transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
// //                 onLoad={() => setImageLoaded(true)}
// //                 style={{ opacity: imageLoaded ? 1 : 0 }}
// //               />
// //             ) : (
// //               <div className="w-full h-full bg-gray-100 flex items-center justify-center">
// //                 <span className="text-gray-400">No image</span>
// //               </div>
// //             )}
// //           </div>
          
// //           {/* View product overlay on mobile */}
// //           <div 
// //             className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300 md:hidden touch-action-manipulation"
// //             style={{ opacity: isHovered ? 0.4 : 0 }}
// //           >
// //             <div className="bg-white text-gray-900 font-medium px-4 py-2 rounded-lg text-sm">
// //               View Product
// //             </div>
// //           </div>
          
// //           {/* Premium styled badges with better positioning for mobile */}
// //           <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
// //             {discountPercentage() && (
// //               <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm flex items-center">
// //                 <Flame size={12} className="mr-1" /> {discountPercentage()}% OFF
// //               </span>
// //             )}
            
// //             {formatDate() && (
// //               <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm flex items-center">
// //                 <BellRing size={12} className="mr-1" /> {formatDate()}
// //               </span>
// //             )}
            
// //             {product.bestSeller && (
// //               <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 text-xs font-bold px-2 py-1 rounded-md shadow-sm flex items-center">
// //                 <Award size={12} className="mr-1" /> Best Seller
// //               </span>
// //             )}
            
// //             {/* Show a badge for retail/wholesale buyer */}
// //             {userType === 'RETAIL_BUYER' && (
// //               <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
// //                 Retail Price
// //               </span>
// //             )}
// //             {userType === 'WHOLESALE_BUYER' && (
// //               <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
// //                 Wholesale Price
// //               </span>
// //             )}
// //           </div>
          
// //           {/* Quick action buttons with enhanced styling and accessibility */}
// //           <div 
// //             className={`absolute right-2 top-2 flex flex-col gap-2 transform transition-all duration-300 ${
// //               isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
// //             } md:flex hidden`} // Hide on mobile, show on desktop
// //           >
// //             <button
// //               onClick={handleQuickView}
// //               className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition hover:scale-110"
// //               aria-label="Quick view"
// //             >
// //               <Eye size={14} className="text-gray-700" />
// //             </button>
            
// //             <button
// //               onClick={handleWishlist}
// //               className={`w-8 h-8 rounded-full ${
// //                 likedProduct 
// //                   ? "bg-red-50 text-red-500 shadow-md" 
// //                   : "bg-white shadow-md text-gray-700 hover:bg-gray-100"
// //               } flex items-center justify-center transition hover:scale-110`}
// //               aria-label="Add to wishlist"
// //             >
// //               <Heart size={14} className={likedProduct ? "fill-red-500" : ""} />
// //             </button>
// //           </div>
// //         </div>
        
// //         {/* Mobile action bar - only visible on small screens */}
// //         <div className="flex justify-between px-2 py-1 md:hidden bg-gray-50 border-t border-gray-100">
// //           <button
// //             onClick={handleQuickView}
// //             className="p-2 text-gray-700 flex items-center justify-center"
// //             aria-label="Quick view"
// //           >
// //             <Eye size={16} className="mr-1" />
// //             <span className="text-xs">Quick View</span>
// //           </button>
          
// //           <div className="w-px bg-gray-200"></div>
          
// //           <button
// //             onClick={handleWishlist}
// //             className={`p-2 ${likedProduct ? "text-red-500" : "text-gray-700"} flex items-center justify-center`}
// //             aria-label="Add to wishlist"
// //           >
// //             <Heart size={16} className={`mr-1 ${likedProduct ? "fill-red-500" : ""}`} />
// //             <span className="text-xs">Wishlist</span>
// //           </button>
// //         </div>
        
// //         {/* Product Details with premium styling and better mobile spacing */}
// //         <div className="p-3 sm:p-4 flex-grow flex flex-col">
// //           {/* Star rating */}
// //           {product.rating && (
// //             <div className="flex items-center mb-1">
// //               <div className="flex mr-1">
// //                 {renderStars()}
// //               </div>
// //               <span className="text-xs text-gray-500">
// //                 ({product.reviewCount || 0})
// //               </span>
// //             </div>
// //           )}
          
// //           {/* Product title with enhanced typography */}
// //           <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 tracking-wide group-hover:text-indigo-800 transition-colors text-sm sm:text-base">
// //             {product.name || "Unnamed Product"}
// //           </h3>
          
// //           {isAuthenticated ? (
// //             <>
// //               {/* Price with premium styling */}
// //               <div className="flex items-baseline mb-2">
// //                 <span className="text-base sm:text-lg font-bold text-gray-900">
// //                   ${formattedPrice}
// //                 </span>
                
// //                 {product.originalPrice && (
// //                   <span className="ml-2 text-xs sm:text-sm text-gray-500 line-through">
// //                     ${Number(product.originalPrice).toFixed(2)}
// //                   </span>
// //                 )}
                
// //                 {/* Price type label - smaller in grid view */}
// //                 {userType === 'RETAIL_BUYER' && (
// //                   <span className="ml-2 text-xxs font-medium text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded-full">
// //                     Retail
// //                   </span>
// //                 )}
// //                 {userType === 'WHOLESALE_BUYER' && (
// //                   <span className="ml-2 text-xxs font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
// //                     Wholesale
// //                   </span>
// //                 )}
// //               </div>
              
// //               {/* Stock info and availability with enhanced styling */}
// //               <div className="flex justify-between items-center mb-2 sm:mb-3 mt-auto">
// //                 {product.stockQuantity !== null && (
// //                   <div className="flex items-center text-xs text-gray-500">
// //                     <Clock size={12} className="mr-1" />
// //                     {product.stockQuantity} available
// //                   </div>
// //                 )}
                
// //                 {product.availability ? (
// //                   <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
// //                     <Check size={10} className="mr-0.5" />
// //                     In Stock
// //                   </span>
// //                 ) : (
// //                   <span className="inline-flex items-center px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
// //                     Out of Stock
// //                   </span>
// //                 )}
// //               </div>
              
// //               {/* Add to cart button with premium gradient and larger tap target */}
// //               <button
// //                 onClick={handleAddToCart}
// //                 disabled={!product.availability || isAddingToCart}
// //                 className={`w-full py-2.5 sm:py-3 px-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center ${
// //                   !product.availability
// //                     ? "bg-gray-200 text-gray-500 cursor-not-allowed"
// //                     : isAddingToCart
// //                     ? "bg-indigo-400 text-white cursor-wait"
// //                     : addedToCart
// //                     ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md"
// //                     : "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:shadow-md"
// //                 }`}
// //               >
// //                 {isAddingToCart ? (
// //                   <>
// //                   <Loader2 size={16} className="mr-2 animate-spin" />
// //                     <span className="text-xs sm:text-sm">Adding...</span>
// //                   </>
// //                 ) : addedToCart ? (
// //                   <>
// //                     <Check size={16} className="mr-1" />
// //                     <span className="text-xs sm:text-sm">Added</span>
// //                   </>
// //                 ) : (
// //                   <>
// //                     <ShoppingBag size={16} className="mr-1" />
// //                     <span className="text-xs sm:text-sm">Add to Cart</span>
// //                   </>
// //                 )}
// //               </button>
// //             </>
// //           ) : (
// //             <div className="mt-auto">
// //               <button
// //                 onClick={() => router.push("/auth/user/login")}
// //                 className="w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg font-medium hover:shadow-md transition flex items-center justify-center"
// //               >
// //                 <ShoppingBag size={16} className="mr-2" />
// //                 <span className="text-xs sm:text-sm">Login to View Price</span>
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </Link>
      
// //       {/* Premium-styled tooltip */}
// //       {showTooltip && (
// //         <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-3 py-1.5 animate-fade-in-out shadow-lg z-50">
// //           Item is out of stock
// //         </div>
// //       )}
      
// //       {/* Quick View Modal */}
// //       {showQuickView && (
// //         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeQuickView}>
// //           <div 
// //             className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-modal-appear" 
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             <div className="flex justify-between items-center border-b border-gray-200 p-4">
// //               <h3 className="text-lg font-semibold text-gray-900">Quick View</h3>
// //               <button onClick={closeQuickView} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
// //                 <X size={20} />
// //               </button>
// //             </div>
// //             <div className="p-4 md:p-6 flex flex-col md:flex-row gap-6">
// //               <div className="md:w-1/2">
// //                 {product.images?.length > 0 ? (
// //                   <img
// //                     src={product.images[0]}
// //                     alt={product.name || "Product image"}
// //                     className="w-full h-auto object-contain rounded-lg shadow-sm"
// //                   />
// //                 ) : (
// //                   <div className="w-full aspect-square bg-gray-100 flex items-center justify-center rounded-lg">
// //                     <span className="text-gray-400">No image</span>
// //                   </div>
// //                 )}
// //               </div>
// //               <div className="md:w-1/2">
// //                 <h2 className="text-xl font-medium text-gray-900 mb-2">{product.name}</h2>
                
// //                 {product.rating && (
// //                   <div className="flex items-center mb-3">
// //                     <div className="flex mr-1">
// //                       {renderStars()}
// //                     </div>
// //                     <span className="text-xs text-gray-500">
// //                       ({product.reviewCount || 0} reviews)
// //                     </span>
// //                   </div>
// //                 )}
                
// //                 {isAuthenticated ? (
// //                   <div className="flex items-baseline mb-4">
// //                     <span className="text-2xl font-bold text-gray-900">
// //                       ${formattedPrice}
// //                     </span>
                    
// //                     {product.originalPrice && (
// //                       <span className="ml-2 text-base text-gray-500 line-through">
// //                         ${Number(product.originalPrice).toFixed(2)}
// //                       </span>
// //                     )}
                    
// //                     {/* Price type label */}
// //                     {userType === 'RETAIL_BUYER' && (
// //                       <span className="ml-2 text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
// //                         Retail
// //                       </span>
// //                     )}
// //                     {userType === 'WHOLESALE_BUYER' && (
// //                       <span className="ml-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
// //                         Wholesale
// //                       </span>
// //                     )}
// //                   </div>
// //                 ) : (
// //                   <div className="mb-4">
// //                     <span className="text-base font-medium text-gray-800">
// //                       Login to view price
// //                     </span>
// //                   </div>
// //                 )}
                
// //                 {product.description && (
// //                   <p className="text-gray-600 mb-6">
// //                     {product.description}
// //                   </p>
// //                 )}
                
// //                 <div className="flex items-center gap-3 mb-4">
// //                   {product.availability ? (
// //                     <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
// //                       <Check size={14} className="mr-1" />
// //                       In Stock
// //                     </span>
// //                   ) : (
// //                     <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
// //                       <AlertCircle size={14} className="mr-1" />
// //                       Out of Stock
// //                     </span>
// //                   )}
                  
// //                   {isAuthenticated && product.stockQuantity !== null && (
// //                     <span className="text-sm text-gray-500 flex items-center">
// //                       <Clock size={14} className="mr-1" />
// //                       {product.stockQuantity} available
// //                     </span>
// //                   )}
// //                 </div>
                
// //                 <div className="space-y-4">
// //                   <button
// //                     onClick={handleAddToCart}
// //                     disabled={!product.availability || isAddingToCart || !isAuthenticated}
// //                     className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition flex items-center justify-center ${
// //                       !isAuthenticated
// //                         ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:shadow-md"
// //                         : !product.availability
// //                         ? "bg-gray-200 text-gray-500 cursor-not-allowed"
// //                         : isAddingToCart
// //                         ? "bg-indigo-400 text-white cursor-wait"
// //                         : addedToCart
// //                         ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
// //                         : "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:shadow-md"
// //                     }`}
// //                   >
// //                     {isAddingToCart ? (
// //                       <>
// //                         <Loader2 size={18} className="mr-2 animate-spin" />
// //                         Adding to Cart...
// //                       </>
// //                     ) : addedToCart ? (
// //                       <>
// //                         <Check size={18} className="mr-2" />
// //                         Added to Cart
// //                       </>
// //                     ) : !isAuthenticated ? (
// //                       <>
// //                         <ShoppingCart size={18} className="mr-2" />
// //                         Login to Buy
// //                       </>
// //                     ) : (
// //                       <>
// //                         <ShoppingCart size={18} className="mr-2" />
// //                         Add to Cart
// //                       </>
// //                     )}
// //                   </button>
                  
// //                   <div className="flex gap-2">
// //                     <Link 
// //                       href={`/product/${product.slug || product.id}`}
// //                       className="block flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium text-sm text-center transition-colors"
// //                     >
// //                       View Full Details
// //                     </Link>
                    
// //                     <button
// //                       onClick={handleWishlist}
// //                       className={`w-12 h-12 flex items-center justify-center rounded-lg ${
// //                         likedProduct 
// //                           ? "bg-red-50 text-red-500 border border-red-200" 
// //                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
// //                       } transition`}
// //                       aria-label="Add to wishlist"
// //                     >
// //                       <Heart size={20} className={likedProduct ? "fill-red-500" : ""} />
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
      
// //       {/* Add CSS for animations and premium styling */}
// //       <style jsx>{`
// //         @keyframes fade-in-out {
// //           0% { opacity: 0; transform: translateY(-5px); }
// //           10% { opacity: 1; transform: translateY(0); }
// //           90% { opacity: 1; transform: translateY(0); }
// //           100% { opacity: 0; transform: translateY(-5px); }
// //         }
        
// //         .animate-fade-in-out {
// //           animation: fade-in-out 2s ease-in-out;
// //         }
        
// //         @keyframes modal-appear {
// //           from { opacity: 0; transform: scale(0.95); }
// //           to { opacity: 1; transform: scale(1); }
// //         }
        
// //         .animate-modal-appear {
// //           animation: modal-appear 0.2s ease-out;
// //         }
        
// //         .text-xxs {
// //           font-size: 0.65rem;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/authContext";
// import { 
//   ShoppingCart, 
//   Heart, 
//   Eye, 
//   Star, 
//   ChevronRight,
//   Check, 
//   AlertCircle,
//   ShoppingBag,
//   Loader2,
//   X,
//   Clock,
//   Award,
//   Flame,
//   BellRing,
//   MoreHorizontal
// } from "lucide-react";

// export default function ProductCard({ product, isAuthenticated, viewMode = "grid" }) {
//   const router = useRouter();
//   const { userId, userType } = useAuth();
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [addedToCart, setAddedToCart] = useState(false);
//   const [showTooltip, setShowTooltip] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [showQuickView, setShowQuickView] = useState(false);
//   const [likedProduct, setLikedProduct] = useState(false);
//   const [showMobileActions, setShowMobileActions] = useState(false);
  
//   // Determine the correct price based on user type
//   const getPrice = () => {
//     if (!isAuthenticated) return null;
    
//     // If user is a retail buyer, show retail price (or calculate 15% more if not set)
//     if (userType === 'RETAIL_BUYER') {
//       return product.retailPrice || (product.price ? Number(product.price) * 1.15 : null);
//     }
    
//     // For wholesale buyers and admins, show wholesale price
//     return product.price;
//   };
  
//   const formattedPrice = getPrice() ? Number(getPrice()).toFixed(2) : null;
  
//   // Reset added state after showing success message
//   useEffect(() => {
//     if (addedToCart) {
//       const timer = setTimeout(() => {
//         setAddedToCart(false);
//       }, 3000);
      
//       return () => clearTimeout(timer);
//     }
//   }, [addedToCart]);
  
//   // Reset tooltip visibility
//   useEffect(() => {
//     if (showTooltip) {
//       const timer = setTimeout(() => {
//         setShowTooltip(false);
//       }, 2000);
      
//       return () => clearTimeout(timer);
//     }
//   }, [showTooltip]);
  
//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     if (!isAuthenticated) {
//       router.push("/auth/user/login");
//       return;
//     }
    
//     if (!product.availability) {
//       setShowTooltip(true);
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
//           quantity: 1
//         }),
//       });
      
//       if (!response.ok) {
//         throw new Error("Failed to add item to cart");
//       }
      
//       setAddedToCart(true);
//       setShowMobileActions(false);
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };
  
//   const handleQuickView = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setShowQuickView(true);
//     setShowMobileActions(false);
//   };
  
//   const closeQuickView = (e) => {
//     if (e) {
//       e.preventDefault();
//       e.stopPropagation();
//     }
//     setShowQuickView(false);
//   };
  
//   const handleWishlist = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     if (!isAuthenticated) {
//       router.push("/auth/user/login");
//       return;
//     }
    
//     setLikedProduct(!likedProduct);
//     setShowMobileActions(false);
//   };
  
//   const toggleMobileActions = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setShowMobileActions(!showMobileActions);
//   };
  
//   // Generate star ratings
//   const renderStars = () => {
//     const rating = product.rating || 0;
//     const stars = [];
    
//     for (let i = 1; i <= 5; i++) {
//       if (i <= rating) {
//         stars.push(
//           <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
//         );
//       } else if (i - 0.5 <= rating) {
//         stars.push(
//           <Star key={i} size={14} className="text-amber-400" strokeWidth={1} />
//         );
//       } else {
//         stars.push(
//           <Star key={i} size={14} className="text-gray-300" />
//         );
//       }
//     }
    
//     return stars;
//   };
  
//   // Format date to show how new the product is
//   const formatDate = () => {
//     if (!product.createdAt) return null;
    
//     const productDate = new Date(product.createdAt);
//     const now = new Date();
//     const diffTime = Math.abs(now - productDate);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
//     if (diffDays <= 7) {
//       return "New";
//     }
    
//     return null;
//   };
  
//   // Calculate discount percentage
//   const discountPercentage = () => {
//     if (!product.originalPrice || !product.price) return null;
    
//     const discount = ((product.originalPrice - product.price) / product.originalPrice) * 100;
//     return Math.round(discount);
//   };
  
//   if (viewMode === "list") {
//     // List view layout with improved mobile responsiveness
//     return (
//       <div 
//         className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-indigo-200 group"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <Link href={`/product/${product.slug || product.id}`} className="flex flex-col sm:flex-row">
//           {/* Product Image - Full width on mobile, 30% on larger screens */}
//           <div className="w-full sm:w-1/3 relative">
//             <div className="aspect-square relative bg-gradient-to-b from-gray-50 to-white">
//               {!imageLoaded && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
//                   <div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
//                 </div>
//               )}
              
//               {product.images?.length > 0 ? (
//                 <img
//                   src={product.images[0]}
//                   alt={product.name || "Product image"}
//                   className="object-contain p-4 absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
//                   onLoad={() => setImageLoaded(true)}
//                   style={{ opacity: imageLoaded ? 1 : 0 }}
//                 />
//               ) : (
//                 <div className="w-full h-full bg-gray-100 flex items-center justify-center">
//                   <span className="text-gray-400">No image</span>
//                 </div>
//               )}
//             </div>
            
//             {/* Badges - Limited on mobile */}
//             <div className="absolute top-2 left-2 flex flex-col gap-1">
//               {discountPercentage() && (
//                 <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm flex items-center">
//                   {discountPercentage()}% OFF
//                 </span>
//               )}
              
//               {formatDate() && (
//                 <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm hidden sm:flex items-center">
//                   <BellRing size={12} className="mr-1" /> {formatDate()}
//                 </span>
//               )}
              
//               {product.bestSeller && (
//                 <span className="bg-amber-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-md shadow-sm hidden sm:flex items-center">
//                   <Award size={12} className="mr-1" /> Best Seller
//                 </span>
//               )}
//             </div>
//           </div>
          
//           {/* Product Details - Full width on mobile, 70% on larger screens */}
//           <div className="w-full sm:w-2/3 p-4 flex flex-col">
//             {/* Price and status */}
//             <div className="flex justify-between mb-1 items-center">
//               {isAuthenticated ? (
//                 <div className="flex items-baseline">
//                   <span className="text-lg font-bold text-gray-900">
//                     ${formattedPrice}
//                   </span>
                  
//                   {product.originalPrice && (
//                     <span className="ml-2 text-sm text-gray-500 line-through">
//                       ${Number(product.originalPrice).toFixed(2)}
//                     </span>
//                   )}
//                 </div>
//               ) : (
//                 <span className="text-sm font-medium text-gray-800">
//                   Login to view price
//                 </span>
//               )}
              
//               {product.availability ? (
//                 <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
//                   <Check size={12} className="mr-1" />
//                   In Stock
//                 </span>
//               ) : (
//                 <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
//                   Out of Stock
//                 </span>
//               )}
//             </div>
            
//             {/* Product title */}
//             <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 tracking-wide line-clamp-2 group-hover:text-indigo-800 transition-colors">
//               {product.name || "Unnamed Product"}
//             </h3>
            
//             {/* Star rating - hide on smallest screens */}
//             {product.rating && (
//               <div className="flex items-center mb-2 hidden xs:flex">
//                 <div className="flex mr-1">
//                   {renderStars()}
//                 </div>
//                 <span className="text-xs text-gray-500">
//                   ({product.reviewCount || 0})
//                 </span>
//               </div>
//             )}
            
//             {/* Description - hide on mobile */}
//             {product.description && (
//               <p className="text-sm text-gray-500 mb-3 line-clamp-2 hidden sm:block">
//                 {product.description}
//               </p>
//             )}
            
//             {/* Stock info - hide on small mobile */}
//             {isAuthenticated && product.stockQuantity !== null && (
//               <div className="flex items-center text-xs text-gray-500 mb-3 hidden sm:flex">
//                 <Clock size={12} className="mr-1" />
//                 {product.stockQuantity} available
//               </div>
//             )}
            
//             {/* Action buttons - Mobile friendly layout */}
//             <div className="mt-auto pt-2 flex gap-2">
//               <button
//                 onClick={handleAddToCart}
//                 disabled={!product.availability || isAddingToCart || !isAuthenticated}
//                 className={`flex-1 py-2.5 px-3 rounded-lg font-medium text-sm transition flex items-center justify-center ${
//                   !isAuthenticated
//                     ? "bg-indigo-600 text-white hover:bg-indigo-700"
//                     : !product.availability
//                     ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                     : isAddingToCart
//                     ? "bg-indigo-400 text-white cursor-wait"
//                     : addedToCart
//                     ? "bg-green-500 text-white"
//                     : "bg-indigo-600 text-white hover:bg-indigo-700"
//                 }`}
//               >
//                 {isAddingToCart ? (
//                   <>
//                     <Loader2 size={16} className="mr-2 animate-spin" />
//                     <span className="sm:block hidden">Adding...</span>
//                     <span className="sm:hidden">...</span>
//                   </>
//                 ) : addedToCart ? (
//                   <>
//                     <Check size={16} className="mr-1 sm:mr-2" />
//                     <span className="sm:block hidden">Added</span>
//                   </>
//                 ) : !isAuthenticated ? (
//                   <>
//                     <ShoppingCart size={16} className="mr-1 sm:mr-2" />
//                     <span className="sm:block hidden">Login to Buy</span>
//                     <span className="sm:hidden">Login</span>
//                   </>
//                 ) : (
//                   <>
//                     <ShoppingCart size={16} className="mr-1 sm:mr-2" />
//                     <span className="sm:block hidden">Add to Cart</span>
//                     <span className="sm:hidden">Add</span>
//                   </>
//                 )}
//               </button>
              
//               {/* More actions button on mobile, regular buttons on desktop */}
//               <div className="flex sm:hidden">
//                 <button
//                   onClick={toggleMobileActions}
//                   aria-label="More actions"
//                   className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 relative"
//                 >
//                   <MoreHorizontal size={16} />
//                 </button>
                
//                 {/* Mobile dropdown */}
//                 {showMobileActions && (
//                   <div className="absolute right-4 mt-12 bg-white shadow-lg rounded-lg z-20 border border-gray-100">
//                     <button
//                       onClick={handleQuickView}
//                       className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-50"
//                     >
//                       <Eye size={16} className="mr-2" />
//                       Quick View
//                     </button>
//                     <button
//                       onClick={handleWishlist}
//                       className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${
//                         likedProduct ? "text-red-500" : "text-gray-700"
//                       }`}
//                     >
//                       <Heart size={16} className={`mr-2 ${likedProduct ? "fill-red-500" : ""}`} />
//                       {likedProduct ? "Saved" : "Save"}
//                     </button>
//                   </div>
//                 )}
//               </div>
              
//               {/* Desktop buttons */}
//               <div className="hidden sm:flex gap-2">
//                 <button
//                   onClick={handleQuickView}
//                   aria-label="Quick view"
//                   className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
//                 >
//                   <Eye size={16} />
//                 </button>
                
//                 <button
//                   onClick={handleWishlist}
//                   aria-label="Add to wishlist"
//                   className={`h-10 w-10 flex items-center justify-center rounded-lg ${
//                     likedProduct 
//                       ? "bg-red-50 text-red-500" 
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                   } transition`}
//                 >
//                   <Heart size={16} className={likedProduct ? "fill-red-500" : ""} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </Link>
        
//         {/* Quick View Modal */}
//         {showQuickView && (
//           <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeQuickView}>
//             <div 
//               className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" 
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-center border-b border-gray-200 p-4">
//                 <h3 className="text-lg font-semibold text-gray-900">Quick View</h3>
//                 <button onClick={closeQuickView} className="p-2 rounded-full hover:bg-gray-100">
//                   <X size={20} />
//                 </button>
//               </div>
//               <div className="p-4 flex flex-col md:flex-row gap-6">
//                 <div className="md:w-1/2">
//                   {product.images?.length > 0 ? (
//                     <img
//                       src={product.images[0]}
//                       alt={product.name || "Product image"}
//                       className="w-full h-auto object-contain rounded-lg"
//                     />
//                   ) : (
//                     <div className="w-full aspect-square bg-gray-100 flex items-center justify-center rounded-lg">
//                       <span className="text-gray-400">No image</span>
//                     </div>
//                   )}
//                 </div>
//                 <div className="md:w-1/2">
//                   <h2 className="text-xl font-medium text-gray-900 mb-2">{product.name}</h2>
                  
//                   {product.rating && (
//                     <div className="flex items-center mb-3">
//                       <div className="flex mr-1">
//                         {renderStars()}
//                       </div>
//                       <span className="text-xs text-gray-500">
//                         ({product.reviewCount || 0})
//                       </span>
//                     </div>
//                   )}
                  
//                   {isAuthenticated ? (
//                     <div className="flex items-baseline mb-4">
//                       <span className="text-2xl font-bold text-gray-900">
//                         ${formattedPrice}
//                       </span>
                      
//                       {product.originalPrice && (
//                         <span className="ml-2 text-base text-gray-500 line-through">
//                           ${Number(product.originalPrice).toFixed(2)}
//                         </span>
//                       )}
//                     </div>
//                   ) : (
//                     <div className="mb-4">
//                       <span className="text-base font-medium text-gray-800">
//                         Login to view price
//                       </span>
//                     </div>
//                   )}
                  
//                   {product.description && (
//                     <p className="text-gray-600 mb-6">
//                       {product.description}
//                     </p>
//                   )}
                  
//                   <div className="flex items-center gap-3 mb-4">
//                     {product.availability ? (
//                       <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
//                         <Check size={14} className="mr-1" />
//                         In Stock
//                       </span>
//                     ) : (
//                       <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
//                         <AlertCircle size={14} className="mr-1" />
//                         Out of Stock
//                       </span>
//                     )}
                    
//                     {isAuthenticated && product.stockQuantity !== null && (
//                       <span className="text-sm text-gray-500 flex items-center">
//                         <Clock size={14} className="mr-1" />
//                         {product.stockQuantity} available
//                       </span>
//                     )}
//                   </div>
                  
//                   <div className="space-y-4">
//                     <button
//                       onClick={handleAddToCart}
//                       disabled={!product.availability || isAddingToCart || !isAuthenticated}
//                       className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition flex items-center justify-center ${
//                         !isAuthenticated
//                           ? "bg-indigo-600 text-white hover:bg-indigo-700"
//                           : !product.availability
//                           ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                           : isAddingToCart
//                           ? "bg-indigo-400 text-white cursor-wait"
//                           : addedToCart
//                           ? "bg-green-500 text-white"
//                           : "bg-indigo-600 text-white hover:bg-indigo-700"
//                       }`}
//                     >
//                       {isAddingToCart ? (
//                         <>
//                           <Loader2 size={18} className="mr-2 animate-spin" />
//                           Adding to Cart...
//                         </>
//                       ) : addedToCart ? (
//                         <>
//                           <Check size={18} className="mr-2" />
//                           Added to Cart
//                         </>
//                       ) : !isAuthenticated ? (
//                         <>
//                           <ShoppingCart size={18} className="mr-2" />
//                           Login to Buy
//                         </>
//                       ) : (
//                         <>
//                           <ShoppingCart size={18} className="mr-2" />
//                           Add to Cart
//                         </>
//                       )}
//                     </button>
                    
//                     <Link 
//                       href={`/product/${product.slug || product.id}`}
//                       className="block w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium text-sm text-center"
//                     >
//                       View Full Details
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }
  
//   // Default grid view layout with mobile optimization
//   return (
//     <div 
//       className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-200 h-full flex flex-col"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <Link href={`/product/${product.slug || product.id}`} className="flex flex-col h-full">
//         {/* Product Image */}
//         <div className="aspect-square relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
//           {!imageLoaded && (
//             <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
//               <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//           )}
          
//           <div className="absolute inset-0 p-4 flex items-center justify-center">
//             {product.images?.length > 0 ? (
//               <img
//                 src={product.images[0]}
//                 alt={product.name || "Product image"}
//                 className="object-contain h-full w-full"
//                 onLoad={() => setImageLoaded(true)}
//                 style={{ opacity: imageLoaded ? 1 : 0 }}
//               />
//             ) : (
//               <div className="w-full h-full bg-gray-100 flex items-center justify-center">
//                 <span className="text-gray-400">No image</span>
//               </div>
//             )}
//           </div>
          
//           {/* Show only most important badge on mobile */}
//           <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
//             {discountPercentage() && (
//               <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
//                 {discountPercentage()}% OFF
//               </span>
//             )}
            
//             {!discountPercentage() && formatDate() && (
//               <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded">
//                 NEW
//               </span>
//             )}
            
//             {!discountPercentage() && !formatDate() && product.bestSeller && (
//               <span className="bg-amber-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded">
//                 BEST
//               </span>
//             )}
//           </div>
          
//           {/* Action button on mobile */}
//           <button
//             onClick={toggleMobileActions}
//             className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm md:hidden"
//             aria-label="More options"
//           >
//             <MoreHorizontal size={16} className="text-gray-700" />
//           </button>
          
//           {/* Mobile actions dropdown */}
//           {showMobileActions && (
//             <div className="absolute right-2 top-12 bg-white shadow-lg rounded-lg z-20 border border-gray-100 md:hidden">
//               <button
//                 onClick={handleQuickView}
//                 className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-50"
//               >
//                 <Eye size={16} className="mr-2" />
//                 Quick View
//               </button>
//               <button
//                 onClick={handleWishlist}
//                 className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${
//                   likedProduct ? "text-red-500" : "text-gray-700"
//                 }`}
//               >
//                 <Heart size={16} className={`mr-2 ${likedProduct ? "fill-red-500" : ""}`} />
//                 {likedProduct ? "Saved" : "Save"}
//               </button>
//             </div>
//           )}
          
//           {/* Desktop quick action buttons */}
//           <div 
//             className={`absolute right-2 top-2 flex flex-col gap-2 transform transition-all duration-300 ${
//               isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
//             } md:flex hidden`}
//           >
//             <button
//               onClick={handleQuickView}
//               className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100"
//               aria-label="Quick view"
//             >
//               <Eye size={14} className="text-gray-700" />
//             </button>
            
//             <button
//               onClick={handleWishlist}
//               className={`w-8 h-8 rounded-full ${
//                 likedProduct 
//                   ? "bg-red-50 text-red-500 shadow-md" 
//                   : "bg-white shadow-md text-gray-700 hover:bg-gray-100"
//               } flex items-center justify-center`}
//               aria-label="Add to wishlist"
//             >
//               <Heart size={14} className={likedProduct ? "fill-red-500" : ""} />
//             </button>
//           </div>
//         </div>
        
//         {/* Product Details - Simplified for mobile */}
//         <div className="p-3 flex-grow flex flex-col">
//           {/* Star rating - Hide on smallest screens */}
//           {product.rating && (
//             <div className="flex items-center mb-1 hidden xs:flex">
//               <div className="flex">
//                 {renderStars()}
//               </div>
//             </div>
//           )}
          
//           {/* Product title - Smaller on mobile */}
//           <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 text-sm">
//             {product.name || "Unnamed Product"}
//           </h3>
          
//           {/* Price */}
//           {isAuthenticated ? (
//             <div className="flex items-baseline mb-1">
//               <span className="text-base font-bold text-gray-900">
//                 ${formattedPrice}
//               </span>
              
//               {product.originalPrice && (
//                 <span className="ml-2 text-xs text-gray-500 line-through">
//                   ${Number(product.originalPrice).toFixed(2)}
//                 </span>
//               )}
//             </div>
//           ) : (
//             <span className="text-sm font-medium text-gray-700 mb-1">
//               Login for price
//             </span>
//           )}
          
//           {/* Status badge - Simplified */}
//           <div className="mb-2">
//             {product.availability ? (
//               <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">
//                 <Check size={10} className="mr-0.5" />
//                 In Stock
//               </span>
//             ) : (
//               <span className="inline-flex items-center px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded">
//                 Out of Stock
//               </span>
//             )}
//           </div>
          
//           {/* Add to cart button - Simplified for mobile */}
//           <div className="mt-auto">
//             <button
//               onClick={handleAddToCart}
//               disabled={!product.availability || isAddingToCart || !isAuthenticated}
//               className={`w-full py-2 px-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center ${
//                 !isAuthenticated
//                   ? "bg-indigo-600 text-white"
//                   : !product.availability
//                   ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   : isAddingToCart
//                   ? "bg-indigo-400 text-white cursor-wait"
//                   : addedToCart
//                   ? "bg-green-500 text-white"
//                   : "bg-indigo-600 text-white"
//               }`}
//             >
//               {isAddingToCart ? (
//                 <>
//                   <Loader2 size={16} className="mr-1 sm:mr-2 animate-spin" />
//                   <span className="sm:block hidden">Adding...</span>
//                   <span className="sm:hidden">...</span>
//                 </>
//               ) : addedToCart ? (
//                 <>
//                   <Check size={16} className="mr-1" />
//                   <span className="sm:block">Added</span>
//                 </>
//               ) : !isAuthenticated ? (
//                 <>
//                   <ShoppingBag size={16} className="mr-1 sm:mr-2" />
//                   <span>Login to Buy</span>
//                 </>
//               ) : (
//                 <>
//                   <ShoppingBag size={16} className="mr-1 sm:mr-2" />
//                   <span>Add to Cart</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </Link>
      
//       {/* Quick View Modal */}
//       {showQuickView && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeQuickView}>
//           <div 
//             className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" 
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex justify-between items-center border-b border-gray-200 p-4">
//               <h3 className="text-lg font-semibold text-gray-900">Quick View</h3>
//               <button onClick={closeQuickView} className="p-2 rounded-full hover:bg-gray-100">
//                 <X size={20} />
//               </button>
//             </div>
//             <div className="p-4 flex flex-col md:flex-row gap-6">
//               <div className="md:w-1/2">
//                 {product.images?.length > 0 ? (
//                   <img
//                     src={product.images[0]}
//                     alt={product.name || "Product image"}
//                     className="w-full h-auto object-contain rounded-lg"
//                   />
//                 ) : (
//                   <div className="w-full aspect-square bg-gray-100 flex items-center justify-center rounded-lg">
//                     <span className="text-gray-400">No image</span>
//                   </div>
//                 )}
//               </div>
//               <div className="md:w-1/2">
//                 <h2 className="text-xl font-medium text-gray-900 mb-2">{product.name}</h2>
                
//                 {product.rating && (
//                   <div className="flex items-center mb-3">
//                     <div className="flex mr-1">
//                       {renderStars()}
//                     </div>
//                     <span className="text-xs text-gray-500">
//                       ({product.reviewCount || 0})
//                     </span>
//                   </div>
//                 )}
                
//                 {isAuthenticated ? (
//                   <div className="flex items-baseline mb-4">
//                     <span className="text-2xl font-bold text-gray-900">
//                       ${formattedPrice}
//                     </span>
                    
//                     {product.originalPrice && (
//                       <span className="ml-2 text-base text-gray-500 line-through">
//                         ${Number(product.originalPrice).toFixed(2)}
//                       </span>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="mb-4">
//                     <span className="text-base font-medium text-gray-800">
//                       Login to view price
//                     </span>
//                   </div>
//                 )}
                
//                 {product.description && (
//                   <p className="text-gray-600 mb-6">
//                     {product.description}
//                   </p>
//                 )}
                
//                 <div className="flex items-center gap-3 mb-4">
//                   {product.availability ? (
//                     <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
//                       <Check size={14} className="mr-1" />
//                       In Stock
//                     </span>
//                   ) : (
//                     <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
//                       <AlertCircle size={14} className="mr-1" />
//                       Out of Stock
//                     </span>
//                   )}
                  
//                   {isAuthenticated && product.stockQuantity !== null && (
//                     <span className="text-sm text-gray-500 flex items-center">
//                       <Clock size={14} className="mr-1" />
//                       {product.stockQuantity} available
//                     </span>
//                   )}
//                 </div>
                
//                 <div className="space-y-4">
//                   <button
//                     onClick={handleAddToCart}
//                     disabled={!product.availability || isAddingToCart || !isAuthenticated}
//                     className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition flex items-center justify-center ${
//                       !isAuthenticated
//                         ? "bg-indigo-600 text-white hover:bg-indigo-700"
//                         : !product.availability
//                         ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                         : isAddingToCart
//                         ? "bg-indigo-400 text-white cursor-wait"
//                         : addedToCart
//                         ? "bg-green-500 text-white"
//                         : "bg-indigo-600 text-white hover:bg-indigo-700"
//                     }`}
//                   >
//                     {isAddingToCart ? (
//                       <>
//                         <Loader2 size={18} className="mr-2 animate-spin" />
//                         Adding to Cart...
//                       </>
//                     ) : addedToCart ? (
//                       <>
//                         <Check size={18} className="mr-2" />
//                         Added to Cart
//                       </>
//                     ) : !isAuthenticated ? (
//                       <>
//                         <ShoppingCart size={18} className="mr-2" />
//                         Login to Buy
//                       </>
//                     ) : (
//                       <>
//                         <ShoppingCart size={18} className="mr-2" />
//                         Add to Cart
//                       </>
//                     )}
//                   </button>
                  
//                   <div className="flex gap-2">
//                     <Link 
//                       href={`/product/${product.slug || product.id}`}
//                       className="block flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium text-sm text-center"
//                     >
//                       View Full Details
//                     </Link>
                    
//                     <button
//                       onClick={handleWishlist}
//                       className={`w-12 h-12 flex items-center justify-center rounded-lg ${
//                         likedProduct 
//                           ? "bg-red-50 text-red-500 border border-red-200" 
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                       }`}
//                       aria-label="Add to wishlist"
//                     >
//                       <Heart size={20} className={likedProduct ? "fill-red-500" : ""} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Out of stock tooltip */}
//       {showTooltip && (
//         <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-3 py-1.5 shadow-lg z-50">
//           Item is out of stock
//         </div>
//       )}
      
//       {/* Add CSS for animations */}
//       <style jsx>{`
//         @keyframes fade-in-out {
//           0% { opacity: 0; transform: translateY(-5px); }
//           10% { opacity: 1; transform: translateY(0); }
//           90% { opacity: 1; transform: translateY(0); }
//           100% { opacity: 0; transform: translateY(-5px); }
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { 
  ShoppingCart, 
  Heart, 
  Eye, 
  Star, 
  ChevronRight,
  Check, 
  AlertCircle,
  ShoppingBag,
  Loader2,
  X,
  Clock,
  Award,
  Flame,
  BellRing,
  MoreHorizontal
} from "lucide-react";

export default function ProductCard({ product, isAuthenticated, viewMode = "grid" }) {
  const router = useRouter();
  const { userId, userType } = useAuth();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [likedProduct, setLikedProduct] = useState(false);
  const [showMobileActions, setShowMobileActions] = useState(false);
  
  // Determine the correct price based on user type
  const getPrice = () => {
    if (!isAuthenticated) return null;
    
    // If user is a retail buyer, show retail price (or calculate 15% more if not set)
    if (userType === 'RETAIL_BUYER') {
      return product.retailPrice || (product.price ? Number(product.price) * 1.15 : null);
    }
    
    // For wholesale buyers and admins, show wholesale price
    return product.price;
  };
  
  const formattedPrice = getPrice() ? Number(getPrice()).toFixed(2) : null;
  
  // Reset added state after showing success message
  useEffect(() => {
    if (addedToCart) {
      const timer = setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [addedToCart]);
  
  // Reset tooltip visibility
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);
  
  const handleLoginRedirect = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push("/auth/user/login");
  };
  
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      router.push("/auth/user/login");
      return;
    }
    
    if (!product.availability) {
      setShowTooltip(true);
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
          quantity: 1
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
      
      setAddedToCart(true);
      setShowMobileActions(false);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };
  
  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
    setShowMobileActions(false);
  };
  
  const closeQuickView = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowQuickView(false);
  };
  
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      router.push("/auth/user/login");
      return;
    }
    
    setLikedProduct(!likedProduct);
    setShowMobileActions(false);
  };
  
  const toggleMobileActions = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMobileActions(!showMobileActions);
  };
  
  // Generate star ratings
  const renderStars = () => {
    const rating = product.rating || 0;
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
        );
      } else if (i - 0.5 <= rating) {
        stars.push(
          <Star key={i} size={14} className="text-amber-400" strokeWidth={1} />
        );
      } else {
        stars.push(
          <Star key={i} size={14} className="text-gray-300" />
        );
      }
    }
    
    return stars;
  };
  
  // Format date to show how new the product is
  const formatDate = () => {
    if (!product.createdAt) return null;
    
    const productDate = new Date(product.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - productDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) {
      return "New";
    }
    
    return null;
  };
  
  // Calculate discount percentage
  const discountPercentage = () => {
    if (!product.originalPrice || !product.price) return null;
    
    const discount = ((product.originalPrice - product.price) / product.originalPrice) * 100;
    return Math.round(discount);
  };
  
  if (viewMode === "list") {
    // List view layout with improved mobile responsiveness
    return (
      <div 
        className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-indigo-200 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Product Image - Full width on mobile, 30% on larger screens */}
          <Link href={`/product/${product.slug || product.id}`} className="w-full sm:w-1/3 relative">
            <div className="aspect-square relative bg-gradient-to-b from-gray-50 to-white">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              {product.images?.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name || "Product image"}
                  className="object-contain p-4 absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
                  onLoad={() => setImageLoaded(true)}
                  style={{ opacity: imageLoaded ? 1 : 0 }}
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
            
            {/* Badges - Limited on mobile */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {discountPercentage() && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm flex items-center">
                  {discountPercentage()}% OFF
                </span>
              )}
              
              {formatDate() && (
                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm hidden sm:flex items-center">
                  <BellRing size={12} className="mr-1" /> {formatDate()}
                </span>
              )}
              
              {product.bestSeller && (
                <span className="bg-amber-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-md shadow-sm hidden sm:flex items-center">
                  <Award size={12} className="mr-1" /> Best Seller
                </span>
              )}
            </div>
          </Link>
          
          {/* Product Details - Full width on mobile, 70% on larger screens */}
          <div className="w-full sm:w-2/3 p-4 flex flex-col">
            {/* Price and status */}
            <div className="flex justify-between mb-1 items-center">
              {isAuthenticated ? (
                <div className="flex items-baseline">
                  <span className="text-lg font-bold text-gray-900">
                    ${formattedPrice}
                  </span>
                  
                  {product.originalPrice && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ${Number(product.originalPrice).toFixed(2)}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-sm font-medium text-gray-800">
                  Login to view price
                </span>
              )}
              
              {product.availability ? (
                <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  <Check size={12} className="mr-1" />
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                  Out of Stock
                </span>
              )}
            </div>
            
            {/* Product title */}
            <Link href={`/product/${product.slug || product.id}`}>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 tracking-wide line-clamp-2 group-hover:text-indigo-800 transition-colors">
                {product.name || "Unnamed Product"}
              </h3>
            </Link>
            
            {/* Star rating - hide on smallest screens */}
            {product.rating && (
              <div className="flex items-center mb-2 hidden xs:flex">
                <div className="flex mr-1">
                  {renderStars()}
                </div>
                <span className="text-xs text-gray-500">
                  ({product.reviewCount || 0})
                </span>
              </div>
            )}
            
            {/* Description - hide on mobile */}
            {product.description && (
              <p className="text-sm text-gray-500 mb-3 line-clamp-2 hidden sm:block">
                {product.description}
              </p>
            )}
            
            {/* Stock info - hide on small mobile */}
            {isAuthenticated && product.stockQuantity !== null && (
              <div className="flex items-center text-xs text-gray-500 mb-3 hidden sm:flex">
                <Clock size={12} className="mr-1" />
                {product.stockQuantity} available
              </div>
            )}
            
            {/* Action buttons - Mobile friendly layout */}
            <div className="mt-auto pt-2 flex gap-2">
              <button
                onClick={!isAuthenticated ? handleLoginRedirect : handleAddToCart}
                disabled={isAuthenticated && (!product.availability || isAddingToCart)}
                className={`flex-1 py-2.5 px-3 rounded-lg font-medium text-sm transition flex items-center justify-center ${
                  !isAuthenticated
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : !product.availability
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : isAddingToCart
                    ? "bg-indigo-400 text-white cursor-wait"
                    : addedToCart
                    ? "bg-green-500 text-white"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {isAddingToCart ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    <span className="sm:block hidden">Adding...</span>
                    <span className="sm:hidden">...</span>
                  </>
                ) : addedToCart ? (
                  <>
                    <Check size={16} className="mr-1 sm:mr-2" />
                    <span className="sm:block hidden">Added</span>
                  </>
                ) : !isAuthenticated ? (
                  <>
                    <ShoppingCart size={16} className="mr-1 sm:mr-2" />
                    <span className="sm:block hidden">Login to Buy</span>
                    <span className="sm:hidden">Login</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} className="mr-1 sm:mr-2" />
                    <span className="sm:block hidden">Add to Cart</span>
                    <span className="sm:hidden">Add</span>
                  </>
                )}
              </button>
              
              {/* More actions button on mobile, regular buttons on desktop */}
              <div className="flex sm:hidden">
                <button
                  onClick={toggleMobileActions}
                  aria-label="More actions"
                  className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 relative"
                >
                  <MoreHorizontal size={16} />
                </button>
                
                {/* Mobile dropdown */}
                {showMobileActions && (
                  <div className="absolute right-4 mt-12 bg-white shadow-lg rounded-lg z-20 border border-gray-100">
                    <button
                      onClick={handleQuickView}
                      className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-50"
                    >
                      <Eye size={16} className="mr-2" />
                      Quick View
                    </button>
                    <button
                      onClick={handleWishlist}
                      className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${
                        likedProduct ? "text-red-500" : "text-gray-700"
                      }`}
                    >
                      <Heart size={16} className={`mr-2 ${likedProduct ? "fill-red-500" : ""}`} />
                      {likedProduct ? "Saved" : "Save"}
                    </button>
                  </div>
                )}
              </div>
              
              {/* Desktop buttons */}
              <div className="hidden sm:flex gap-2">
                <button
                  onClick={handleQuickView}
                  aria-label="Quick view"
                  className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                  <Eye size={16} />
                </button>
                
                <button
                  onClick={handleWishlist}
                  aria-label="Add to wishlist"
                  className={`h-10 w-10 flex items-center justify-center rounded-lg ${
                    likedProduct 
                      ? "bg-red-50 text-red-500" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } transition`}
                >
                  <Heart size={16} className={likedProduct ? "fill-red-500" : ""} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick View Modal */}
        {showQuickView && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeQuickView}>
            <div 
              className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center border-b border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-900">Quick View</h3>
                <button onClick={closeQuickView} className="p-2 rounded-full hover:bg-gray-100">
                  <X size={20} />
                </button>
              </div>
              <div className="p-4 flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  {product.images?.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name || "Product image"}
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-full aspect-square bg-gray-100 flex items-center justify-center rounded-lg">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-xl font-medium text-gray-900 mb-2">{product.name}</h2>
                  
                  {product.rating && (
                    <div className="flex items-center mb-3">
                      <div className="flex mr-1">
                        {renderStars()}
                      </div>
                      <span className="text-xs text-gray-500">
                        ({product.reviewCount || 0})
                      </span>
                    </div>
                  )}
                  
                  {isAuthenticated ? (
                    <div className="flex items-baseline mb-4">
                      <span className="text-2xl font-bold text-gray-900">
                        ${formattedPrice}
                      </span>
                      
                      {product.originalPrice && (
                        <span className="ml-2 text-base text-gray-500 line-through">
                          ${Number(product.originalPrice).toFixed(2)}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="mb-4">
                      <span className="text-base font-medium text-gray-800">
                        Login to view price
                      </span>
                    </div>
                  )}
                  
                  {product.description && (
                    <p className="text-gray-600 mb-6">
                      {product.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-3 mb-4">
                    {product.availability ? (
                      <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        <Check size={14} className="mr-1" />
                        In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                        <AlertCircle size={14} className="mr-1" />
                        Out of Stock
                      </span>
                    )}
                    
                    {isAuthenticated && product.stockQuantity !== null && (
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock size={14} className="mr-1" />
                        {product.stockQuantity} available
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <button
                      onClick={!isAuthenticated ? handleLoginRedirect : handleAddToCart}
                      disabled={isAuthenticated && (!product.availability || isAddingToCart)}
                      className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition flex items-center justify-center ${
                        !isAuthenticated
                          ? "bg-indigo-600 text-white hover:bg-indigo-700"
                          : !product.availability
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : isAddingToCart
                          ? "bg-indigo-400 text-white cursor-wait"
                          : addedToCart
                          ? "bg-green-500 text-white"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      {isAddingToCart ? (
                        <>
                          <Loader2 size={18} className="mr-2 animate-spin" />
                          Adding to Cart...
                        </>
                      ) : addedToCart ? (
                        <>
                          <Check size={18} className="mr-2" />
                          Added to Cart
                        </>
                      ) : !isAuthenticated ? (
                        <>
                          <ShoppingCart size={18} className="mr-2" />
                          Login to Buy
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={18} className="mr-2" />
                          Add to Cart
                        </>
                      )}
                    </button>
                    
                    <Link 
                      href={`/product/${product.slug || product.id}`}
                      className="block w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium text-sm text-center"
                    >
                      View Full Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Default grid view layout with mobile optimization
  return (
    <div 
      className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-200 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Product Image */}
        <Link href={`/product/${product.slug || product.id}`} className="aspect-square relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          <div className="absolute inset-0 p-4 flex items-center justify-center">
            {product.images?.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.name || "Product image"}
                className="object-contain h-full w-full"
                onLoad={() => setImageLoaded(true)}
                style={{ opacity: imageLoaded ? 1 : 0 }}
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </div>
          
          {/* Show only most important badge on mobile */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {discountPercentage() && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                {discountPercentage()}% OFF
              </span>
            )}
            
            {!discountPercentage() && formatDate() && (
              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                NEW
              </span>
            )}
            
            {!discountPercentage() && !formatDate() && product.bestSeller && (
              <span className="bg-amber-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded">
                BEST
              </span>
            )}
          </div>
        </Link>
          
        {/* Action button on mobile */}
        <button
          onClick={toggleMobileActions}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm md:hidden"
          aria-label="More options"
        >
          <MoreHorizontal size={16} className="text-gray-700" />
        </button>
        
        {/* Mobile actions dropdown */}
        {showMobileActions && (
          <div className="absolute right-2 top-12 bg-white shadow-lg rounded-lg z-20 border border-gray-100 md:hidden">
            <button
              onClick={handleQuickView}
              className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-50"
            >
              <Eye size={16} className="mr-2" />
              Quick View
            </button>
            <button
              onClick={handleWishlist}
              className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${
                likedProduct ? "text-red-500" : "text-gray-700"
              }`}
            >
              <Heart size={16} className={`mr-2 ${likedProduct ? "fill-red-500" : ""}`} />
              {likedProduct ? "Saved" : "Save"}
            </button>
          </div>
        )}
        
        {/* Desktop quick action buttons */}
        <div 
          className={`absolute right-2 top-2 flex flex-col gap-2 transform transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          } md:flex hidden`}
        >
          <button
            onClick={handleQuickView}
            className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100"
            aria-label="Quick view"
          >
            <Eye size={14} className="text-gray-700" />
          </button>
          
          <button
            onClick={handleWishlist}
            className={`w-8 h-8 rounded-full ${
              likedProduct 
                ? "bg-red-50 text-red-500 shadow-md" 
                : "bg-white shadow-md text-gray-700 hover:bg-gray-100"
            } flex items-center justify-center`}
            aria-label="Add to wishlist"
          >
            <Heart size={14} className={likedProduct ? "fill-red-500" : ""} />
          </button>
        </div>
        
        {/* Product Details - Simplified for mobile */}
        <div className="p-3 flex-grow flex flex-col">
          {/* Star rating - Hide on smallest screens */}
          {product.rating && (
            <div className="flex items-center mb-1 hidden xs:flex">
              <div className="flex">
                {renderStars()}
              </div>
            </div>
          )}
          
          {/* Product title - Smaller on mobile */}
          <Link href={`/product/${product.slug || product.id}`}>
            <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 text-sm">
              {product.name || "Unnamed Product"}
            </h3>
          </Link>
          
          {/* Price */}
          {isAuthenticated ? (
            <div className="flex items-baseline mb-1">
              <span className="text-base font-bold text-gray-900">
                ${formattedPrice}
              </span>
              
              {product.originalPrice && (
                <span className="ml-2 text-xs text-gray-500 line-through">
                  ${Number(product.originalPrice).toFixed(2)}
                </span>
              )}
            </div>
          ) : (
            <span className="text-sm font-medium text-gray-700 mb-1">
              Login for price
            </span>
          )}
          
          {/* Status badge - Simplified */}
          <div className="mb-2">
            {product.availability ? (
              <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded">
                <Check size={10} className="mr-0.5" />
                In Stock
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded">
                Out of Stock
              </span>
            )}
          </div>
          
          {/* Add to cart button - Simplified for mobile */}
          <div className="mt-auto">
            <button
              onClick={!isAuthenticated ? handleLoginRedirect : handleAddToCart}
              disabled={isAuthenticated && (!product.availability || isAddingToCart)}
              className={`w-full py-2 px-3 rounded-lg font-medium text-sm transition-all flex items-center justify-center ${
                !isAuthenticated
                  ? "bg-indigo-600 text-white"
                  : !product.availability
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : isAddingToCart
                  ? "bg-indigo-400 text-white cursor-wait"
                  : addedToCart
                  ? "bg-green-500 text-white"
                  : "bg-indigo-600 text-white"
              }`}
            >
              {isAddingToCart ? (
                <>
                  <Loader2 size={16} className="mr-1 sm:mr-2 animate-spin" />
                  <span className="sm:block hidden">Adding...</span>
                  <span className="sm:hidden">...</span>
                </>
              ) : addedToCart ? (
                <>
                  <Check size={16} className="mr-1" />
                  <span className="sm:block">Added</span>
                </>
              ) : !isAuthenticated ? (
                <>
                  <ShoppingBag size={16} className="mr-1 sm:mr-2" />
                  <span>Login to Buy</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={16} className="mr-1 sm:mr-2" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeQuickView}>
          <div 
            className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900">Quick View</h3>
              <button onClick={closeQuickView} className="p-2 rounded-full hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                {product.images?.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name || "Product image"}
                    className="w-full h-auto object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-full aspect-square bg-gray-100 flex items-center justify-center rounded-lg">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
              <div className="md:w-1/2">
                <h2 className="text-xl font-medium text-gray-900 mb-2">{product.name}</h2>
                
                {product.rating && (
                  <div className="flex items-center mb-3">
                    <div className="flex mr-1">
                      {renderStars()}
                    </div>
                    <span className="text-xs text-gray-500">
                      ({product.reviewCount || 0})
                    </span>
                  </div>
                )}
                
                {isAuthenticated ? (
                  <div className="flex items-baseline mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ${formattedPrice}
                    </span>
                    
                    {product.originalPrice && (
                      <span className="ml-2 text-base text-gray-500 line-through">
                        ${Number(product.originalPrice).toFixed(2)}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="mb-4">
                    <span className="text-base font-medium text-gray-800">
                      Login to view price
                    </span>
                  </div>
                )}
                
                {product.description && (
                  <p className="text-gray-600 mb-6">
                    {product.description}
                  </p>
                )}
                
                <div className="flex items-center gap-3 mb-4">
                  {product.availability ? (
                    <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      <Check size={14} className="mr-1" />
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                      <AlertCircle size={14} className="mr-1" />
                      Out of Stock
                    </span>
                  )}
                  
                  {isAuthenticated && product.stockQuantity !== null && (
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock size={14} className="mr-1" />
                      {product.stockQuantity} available
                    </span>
                  )}
                </div>
                
                <div className="space-y-4">
                  <button
                    onClick={!isAuthenticated ? handleLoginRedirect : handleAddToCart}
                    disabled={isAuthenticated && (!product.availability || isAddingToCart)}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition flex items-center justify-center ${
                      !isAuthenticated
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : !product.availability
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : isAddingToCart
                        ? "bg-indigo-400 text-white cursor-wait"
                        : addedToCart
                        ? "bg-green-500 text-white"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    {isAddingToCart ? (
                      <>
                        <Loader2 size={18} className="mr-2 animate-spin" />
                        Adding to Cart...
                      </>
                    ) : addedToCart ? (
                      <>
                        <Check size={18} className="mr-2" />
                        Added to Cart
                      </>
                    ) : !isAuthenticated ? (
                      <>
                        <ShoppingCart size={18} className="mr-2" />
                        Login to Buy
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} className="mr-2" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  
                  <div className="flex gap-2">
                    <Link 
                      href={`/product/${product.slug || product.id}`}
                      className="block flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium text-sm text-center"
                    >
                      View Full Details
                    </Link>
                    
                    <button
                      onClick={handleWishlist}
                      className={`w-12 h-12 flex items-center justify-center rounded-lg ${
                        likedProduct 
                          ? "bg-red-50 text-red-500 border border-red-200" 
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      aria-label="Add to wishlist"
                    >
                      <Heart size={20} className={likedProduct ? "fill-red-500" : ""} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Out of stock tooltip */}
      {showTooltip && (
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-3 py-1.5 shadow-lg z-50">
          Item is out of stock
        </div>
      )}
      
      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translateY(-5px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}