
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
  AlertCircle 
} from "lucide-react";

export default function ProductCard({ product, isAuthenticated, viewMode = "grid" }) {
  const router = useRouter();
  const { userId } = useAuth();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
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
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };
  
  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Implementation for quick view modal
  };
  
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      router.push("/auth/user/login");
      return;
    }
    // Implementation for wishlist
  };
  
  // Generate star ratings
  const renderStars = () => {
    const rating = product.rating || 0;
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
        );
      } else if (i - 0.5 <= rating) {
        stars.push(
          <Star key={i} size={16} className="text-yellow-400" strokeWidth={1} />
        );
      } else {
        stars.push(
          <Star key={i} size={16} className="text-gray-300" />
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
  
  // Conditionally render based on view mode
  if (viewMode === "list") {
    // List view layout
    return (
      <div 
        className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/product/${product.slug || product.id}`} className="flex">
          {/* Product Image - 30% width */}
          <div className="w-1/3 relative">
            <div className="aspect-square relative">
              {product.images?.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name || "Product image"}
                  // fill
                  sizes="(max-width: 768px) 33vw, 25vw"
                  className="object-contain p-4"
                  // priority={false}
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {discountPercentage() && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {discountPercentage()}% OFF
                </span>
              )}
              
              {formatDate() && (
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {formatDate()}
                </span>
              )}
              
              {product.bestSeller && (
                <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
                  Best Seller
                </span>
              )}
            </div>
          </div>
          
          {/* Product Details - 70% width */}
          <div className="w-2/3 p-4 flex flex-col">
            {/* Price and rating */}
            <div className="flex justify-between mb-1">
              {isAuthenticated ? (
                <div className="flex items-baseline">
                  <span className="text-lg font-bold text-gray-900">
                    ${Number(product.price).toFixed(2)}
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
                  <AlertCircle size={12} className="mr-1" />
                  Out of Stock
                </span>
              )}
            </div>
            
            {/* Product title */}
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {product.name || "Unnamed Product"}
            </h3>
            
            {/* Star rating */}
            {product.rating && (
              <div className="flex items-center mb-2">
                <div className="flex mr-1">
                  {renderStars()}
                </div>
                <span className="text-xs text-gray-500">
                  ({product.reviewCount || 0} reviews)
                </span>
              </div>
            )}
            
            {/* Description */}
            {product.description && (
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                {product.description}
              </p>
            )}
            
            {/* Stock info */}
            {isAuthenticated && product.stockQuantity !== null && (
              <p className="text-sm text-gray-500 mb-3">
                {product.stockQuantity} available
              </p>
            )}
            
            {/* Action buttons */}
            <div className="mt-auto pt-2 flex gap-2">
              <button
                onClick={handleAddToCart}
                disabled={!product.availability || isAddingToCart || !isAuthenticated}
                className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition flex items-center justify-center ${
                  !isAuthenticated
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : !product.availability
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : isAddingToCart
                    ? "bg-blue-400 text-white cursor-wait"
                    : addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isAddingToCart ? (
                  <>
                    <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : addedToCart ? (
                  <>
                    <Check size={16} className="mr-1" />
                    Added
                  </>
                ) : !isAuthenticated ? (
                  <>
                    <ShoppingCart size={16} className="mr-1" />
                    Login to Buy
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} className="mr-1" />
                    Add to Cart
                  </>
                )}
              </button>
              
              <button
                onClick={handleQuickView}
                className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                <Eye size={16} />
              </button>
              
              <button
                onClick={handleWishlist}
                className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                <Heart size={16} />
              </button>
            </div>
            
            {/* Learn more link */}
            <Link 
              href={`/product/${product.slug || product.id}`}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center mt-3"
            >
              View Details
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </Link>
        
        {/* Out of stock tooltip */}
        {showTooltip && (
          <div className="absolute top-0 right-0 mt-2 mr-2 bg-gray-800 text-white text-xs rounded px-2 py-1 animate-fade-in-out">
            Item is out of stock
          </div>
        )}
      </div>
    );
  }
  
  // Default grid view layout
  return (
    <div 
      className="relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug || product.id}`} className="block">
        {/* Product Image */}
        <div className="aspect-square relative bg-white">
          <div className="absolute inset-0 p-4 flex items-center justify-center">
            {product.images?.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.name || "Product image"}
                // fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={`object-contain transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
                // priority={false}
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </div>
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discountPercentage() && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                {discountPercentage()}% OFF
              </span>
            )}
            
            {formatDate() && (
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                {formatDate()}
              </span>
            )}
            
            {product.bestSeller && (
              <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
                Best Seller
              </span>
            )}
          </div>
          
          {/* Quick action buttons that appear on hover */}
          <div 
            className={`absolute right-2 top-2 flex flex-col gap-2 transform transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              onClick={handleQuickView}
              className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition"
              aria-label="Quick view"
            >
              <Eye size={16} className="text-gray-700" />
            </button>
            
            <button
              onClick={handleWishlist}
              className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition"
              aria-label="Add to wishlist"
            >
              <Heart size={16} className="text-gray-700" />
            </button>
          </div>
        </div>
        
        {/* Product Details */}
        <div className="p-4">
          {/* Star rating */}
          {product.rating && (
            <div className="flex items-center mb-1">
              <div className="flex mr-1">
                {renderStars()}
              </div>
              <span className="text-xs text-gray-500">
                ({product.reviewCount || 0})
              </span>
            </div>
          )}
          
          {/* Product title */}
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
            {product.name || "Unnamed Product"}
          </h3>
          
          {isAuthenticated ? (
            <>
              {/* Price */}
              <div className="flex items-baseline mb-2">
                <span className="text-lg font-bold text-gray-900">
                  ${Number(product.price).toFixed(2)}
                </span>
                
                {product.originalPrice && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ${Number(product.originalPrice).toFixed(2)}
                  </span>
                )}
              </div>
              
              {/* Stock info and availability */}
              <div className="flex justify-between items-center mb-3">
                {product.stockQuantity !== null && (
                  <p className="text-xs text-gray-500">
                    {product.stockQuantity} available
                  </p>
                )}
                
                {product.availability ? (
                  <span className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                    <Check size={10} className="mr-0.5" />
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>
              
              {/* Add to cart button */}
              <button
                onClick={handleAddToCart}
                disabled={!product.availability || isAddingToCart}
                className={`w-full py-2 px-3 rounded-lg font-medium text-sm transition flex items-center justify-center ${
                  !product.availability
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : isAddingToCart
                    ? "bg-blue-400 text-white cursor-wait"
                    : addedToCart
                    ? "bg-green-600 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isAddingToCart ? (
                  <>
                    <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : addedToCart ? (
                  <>
                    <Check size={16} className="mr-1" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} className="mr-1" />
                    Add to Cart
                  </>
                )}
              </button>
            </>
          ) : (
            <div className="mt-3">
              <button
                onClick={() => router.push("/auth/user/login")}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center"
              >
                <ShoppingCart size={16} className="mr-2" />
                Login to View Price
              </button>
            </div>
          )}
        </div>
      </Link>
      
      {/* Out of stock tooltip */}
      {showTooltip && (
        <div className="absolute top-0 right-0 mt-2 mr-2 bg-gray-800 text-white text-xs rounded px-2 py-1 animate-fade-in-out">
          Item is out of stock
        </div>
      )}
      
      {/* Add some CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-out {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        .animate-fade-in-out {
          animation: fade-in-out 2s ease-in-out;
        }
      `}</style>
    </div>
  );
}