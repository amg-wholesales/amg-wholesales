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
  Plus,
  Check, 
  AlertCircle,
  Loader2,
  X
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
  const [wishlistActive, setWishlistActive] = useState(false);
  
  // Determine the correct price based on user type
  const getPrice = () => {
    if (!isAuthenticated) return null;
    
    if (userType === 'RETAIL_BUYER') {
      return product.retailPrice || (product.price ? Number(product.price) * 1.15 : null);
    }
    
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
    
    setWishlistActive(!wishlistActive);
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
    // List view layout with improved premium design
    return (
      <div 
        className="relative bg-white border border-gray-100 group hover:border-black transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Product Image */}
          <Link href={`/product/${product.slug || product.id}`} className="w-full sm:w-1/3 relative">
            <div className="aspect-square relative bg-gray-50">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
                </div>
              )}
              
              {product.images?.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name || "Product image"}
                  className="object-contain p-4 absolute inset-0 h-full w-full"
                  onLoad={() => setImageLoaded(true)}
                  style={{ opacity: imageLoaded ? 1 : 0 }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {discountPercentage() && (
                <span className="bg-black text-white text-xs px-2 py-1">
                  {discountPercentage()}% OFF
                </span>
              )}
              
              {formatDate() && (
                <span className="bg-gray-900 text-white text-xs px-2 py-1 hidden sm:block">
                  {formatDate()}
                </span>
              )}
              
              {product.bestSeller && (
                <span className="bg-amber-400 text-black text-xs px-2 py-1 hidden sm:block">
                  Best Seller
                </span>
              )}
            </div>
          </Link>
          
          {/* Product Details */}
          <div className="w-full sm:w-2/3 p-6 flex flex-col">
            {/* Product title */}
            <Link href={`/product/${product.slug || product.id}`}>
              <h3 className="text-lg sm:text-xl font-medium mb-1 tracking-tight line-clamp-2 hover:underline">
                {product.name || "Unnamed Product"}
              </h3>
            </Link>
            
            {/* Star rating */}
            {product.rating && (
              <div className="flex items-center mb-2">
                <div className="flex mr-1">
                  {renderStars()}
                </div>
                <span className="text-xs text-gray-500">
                  ({product.reviewCount || 0})
                </span>
              </div>
            )}
            
            {/* Price and status */}
            <div className="flex justify-between items-center mb-4">
              {isAuthenticated ? (
                <div className="flex items-baseline">
                  <span className="text-xl font-medium tracking-tight">
                    ${formattedPrice}
                  </span>
                  
                  {product.originalPrice && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ${Number(product.originalPrice).toFixed(2)}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-base font-medium">
                  Login to view price
                </span>
              )}
              
              {product.availability ? (
                <span className="text-xs uppercase tracking-wider font-medium text-emerald-700">
                  In Stock
                </span>
              ) : (
                <span className="text-xs uppercase tracking-wider font-medium text-red-600">
                  Out of Stock
                </span>
              )}
            </div>
            
            {/* Description */}
            {product.description && (
              <p className="text-sm text-gray-600 mb-6 line-clamp-2 hidden sm:block">
                {product.description}
              </p>
            )}
            
            {/* Action buttons */}
            <div className="mt-auto flex gap-3">
              <button
                onClick={!isAuthenticated ? handleLoginRedirect : handleAddToCart}
                disabled={isAuthenticated && (!product.availability || isAddingToCart)}
                className={`flex-1 h-12 font-medium text-sm flex items-center justify-center transition-colors ${
                  !isAuthenticated
                    ? "bg-black text-white hover:bg-gray-900"
                    : !product.availability
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : isAddingToCart
                    ? "bg-gray-500 text-white cursor-wait"
                    : addedToCart
                    ? "bg-emerald-600 text-white"
                    : "bg-black text-white hover:bg-gray-900"
                }`}
              >
                {isAddingToCart ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Adding...
                  </>
                ) : addedToCart ? (
                  <>
                    <Check size={16} className="mr-2" />
                    Added to Cart
                  </>
                ) : !isAuthenticated ? (
                  <>
                    <ShoppingCart size={16} className="mr-2" />
                    Login to Buy
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} className="mr-2" />
                    Add to Cart
                  </>
                )}
              </button>
              
              <button
                onClick={handleQuickView}
                aria-label="Quick view"
                className="h-12 w-12 flex items-center justify-center border border-gray-200 hover:border-black transition-colors"
              >
                <Eye size={16} />
              </button>
              
              <button
                onClick={handleWishlist}
                aria-label="Add to wishlist"
                className={`h-12 w-12 flex items-center justify-center border transition-colors ${
                  wishlistActive 
                    ? "border-red-500 bg-red-50 text-red-500" 
                    : "border-gray-200 hover:border-black"
                }`}
              >
                <Heart size={16} className={wishlistActive ? "fill-red-500" : ""} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Quick View Modal */}
        {showQuickView && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={closeQuickView}>
            <div 
              className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto relative" 
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={closeQuickView} className="absolute right-4 top-4 p-2 z-10">
                <X size={24} />
              </button>
              
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 bg-gray-50">
                  {product.images?.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name || "Product image"}
                      className="w-full h-auto object-contain"
                    />
                  ) : (
                    <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="md:w-1/2 p-8">
                  <h2 className="text-2xl font-medium mb-2">{product.name}</h2>
                  
                  {product.rating && (
                    <div className="flex items-center mb-4">
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
                      <span className="text-2xl font-medium">
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
                      <span className="text-xl font-medium">
                        Login to view price
                      </span>
                    </div>
                  )}
                  
                  {product.description && (
                    <p className="text-gray-600 mb-6">
                      {product.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-3 mb-8">
                    {product.availability ? (
                      <span className="text-xs uppercase tracking-wider font-medium text-emerald-700">
                        In Stock
                      </span>
                    ) : (
                      <span className="text-xs uppercase tracking-wider font-medium text-red-600">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <button
                      onClick={!isAuthenticated ? handleLoginRedirect : handleAddToCart}
                      disabled={isAuthenticated && (!product.availability || isAddingToCart)}
                      className={`w-full h-12 font-medium text-sm flex items-center justify-center transition-colors ${
                        !isAuthenticated
                          ? "bg-black text-white hover:bg-gray-900"
                          : !product.availability
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : isAddingToCart
                          ? "bg-gray-500 text-white cursor-wait"
                          : addedToCart
                          ? "bg-emerald-600 text-white"
                          : "bg-black text-white hover:bg-gray-900"
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
                    
                    <div className="flex gap-3">
                      <Link 
                        href={`/product/${product.slug || product.id}`}
                        className="flex-1 h-12 border border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center font-medium text-sm"
                      >
                        View Full Details
                      </Link>
                      
                      <button
                        onClick={handleWishlist}
                        className={`h-12 w-12 flex items-center justify-center border transition-colors ${
                          wishlistActive 
                            ? "border-red-500 bg-red-50 text-red-500" 
                            : "border-gray-200 hover:border-black"
                        }`}
                        aria-label="Add to wishlist"
                      >
                        <Heart size={18} className={wishlistActive ? "fill-red-500" : ""} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Default grid view layout with premium design
  return (
    <div 
      className="relative bg-white group h-full flex flex-col border border-gray-100 hover:border-black transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <Link href={`/product/${product.slug || product.id}`} className="aspect-square relative bg-gray-50 overflow-hidden block">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
          </div>
        )}
        
        <div className="absolute inset-0 flex items-center justify-center p-6">
          {product.images?.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name || "Product image"}
              className="object-contain h-full w-full transition-transform duration-700 group-hover:scale-105"
              onLoad={() => setImageLoaded(true)}
              style={{ opacity: imageLoaded ? 1 : 0 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
        </div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {discountPercentage() && (
            <span className="bg-black text-white text-xs px-2 py-1">
              {discountPercentage()}% OFF
            </span>
          )}
          
          {formatDate() && (
            <span className="bg-gray-900 text-white text-xs px-2 py-1">
              {formatDate()}
            </span>
          )}
          
          {product.bestSeller && (
            <span className="bg-amber-400 text-black text-xs px-2 py-1">
              Best Seller
            </span>
          )}
        </div>
      </Link>
        
      {/* Quick action buttons */}
      <div 
        className={`absolute right-0 top-4 flex flex-col gap-2 transform transition-all duration-300 px-4 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}
      >
        <button
          onClick={handleQuickView}
          className="w-10 h-10 bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors border border-gray-200"
          aria-label="Quick view"
        >
          <Eye size={16} />
        </button>
        
        <button
          onClick={handleWishlist}
          className={`w-10 h-10 flex items-center justify-center transition-colors ${
            wishlistActive 
              ? "bg-red-50 text-red-500 border border-red-500" 
              : "bg-white border border-gray-200 hover:bg-black hover:text-white"
          }`}
          aria-label="Add to wishlist"
        >
          <Heart size={16} className={wishlistActive ? "fill-red-500" : ""} />
        </button>
      </div>
      
      {/* Product Details */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Star rating */}
        {product.rating && (
          <div className="flex items-center mb-1">
            <div className="flex">
              {renderStars()}
            </div>
          </div>
        )}
        
        {/* Product title */}
        <Link href={`/product/${product.slug || product.id}`}>
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 group-hover:underline text-sm sm:text-base">
            {product.name || "Unnamed Product"}
          </h3>
        </Link>
        
        {/* Price */}
        {isAuthenticated ? (
          <div className="flex items-baseline mb-3">
            <span className="text-base font-medium">
              ${formattedPrice}
            </span>
            
            {product.originalPrice && (
              <span className="ml-2 text-xs text-gray-500 line-through">
                ${Number(product.originalPrice).toFixed(2)}
              </span>
            )}
          </div>
        ) : (
          <span className="text-sm font-medium mb-3">
            Login for price
          </span>
        )}
        
        {/* Status badge */}
        <div className="mb-4">
          {product.availability ? (
            <span className="text-xs uppercase tracking-wider font-medium text-emerald-700">
              In Stock
            </span>
          ) : (
            <span className="text-xs uppercase tracking-wider font-medium text-red-600">
              Out of Stock
            </span>
          )}
        </div>
        
        {/* Add to cart button */}
        <div className="mt-auto">
          <button
            onClick={!isAuthenticated ? handleLoginRedirect : handleAddToCart}
            disabled={isAuthenticated && (!product.availability || isAddingToCart)}
            className={`w-full h-12 font-medium text-sm flex items-center justify-center transition-colors ${
              !isAuthenticated
                ? "bg-black text-white hover:bg-gray-900"
                : !product.availability
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : isAddingToCart
                ? "bg-gray-500 text-white cursor-wait"
                : addedToCart
                ? "bg-emerald-600 text-white"
                : "bg-black text-white hover:bg-gray-900"
            }`}
          >
            {isAddingToCart ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                <span className="sm:block">Adding...</span>
              </>
            ) : addedToCart ? (
              <>
                <Check size={16} className="mr-2" />
                <span>Added</span>
              </>
            ) : !isAuthenticated ? (
              <>
                <Plus size={16} className="mr-2" />
                <span>Login to Buy</span>
              </>
            ) : (
              <>
                <Plus size={16} className="mr-2" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={closeQuickView}>
          <div 
            className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto relative" 
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={closeQuickView} className="absolute right-4 top-4 p-2 z-10">
              <X size={24} />
            </button>
            
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 bg-gray-50">
                {product.images?.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name || "Product image"}
                    className="w-full h-auto object-contain"
                  />
                ) : (
                  <div className="w-full aspect-square flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-medium mb-2">{product.name}</h2>
                
                {product.rating && (
                  <div className="flex items-center mb-4">
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
                    <span className="text-2xl font-medium">
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
                    <span className="text-xl font-medium">
                      Login to view price
                    </span>
                  </div>
                )}
                
                {product.description && (
                  <p className="text-gray-600 mb-6">
                    {product.description}
                  </p>
                )}
                
                <div className="flex items-center gap-3 mb-8">
                  {product.availability ? (
                    <span className="text-xs uppercase tracking-wider font-medium text-emerald-700">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-xs uppercase tracking-wider font-medium text-red-600">
                      Out of Stock
                    </span>
                  )}
                </div>
                
                <div className="space-y-4">
                  <button
                    onClick={!isAuthenticated ? handleLoginRedirect : handleAddToCart}
                    disabled={isAuthenticated && (!product.availability || isAddingToCart)}
                    className={`w-full h-12 font-medium text-sm flex items-center justify-center transition-colors ${
                      !isAuthenticated
                        ? "bg-black text-white hover:bg-gray-900"
                        : !product.availability
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : isAddingToCart
                        ? "bg-gray-500 text-white cursor-wait"
                        : addedToCart
                        ? "bg-emerald-600 text-white"
                        : "bg-black text-white hover:bg-gray-900"
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
                  
                  <div className="flex gap-3">
                    <Link 
                      href={`/product/${product.slug || product.id}`}
                      className="flex-1 h-12 border border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center font-medium text-sm"
                    >
                      View Full Details
                    </Link>
                    
                    <button
                      onClick={handleWishlist}
                      className={`h-12 w-12 flex items-center justify-center border transition-colors ${
                        wishlistActive 
                          ? "border-red-500 bg-red-50 text-red-500" 
                          : "border-gray-200 hover:border-black"
                      }`}
                      aria-label="Add to wishlist"
                    >
                      <Heart size={18} className={wishlistActive ? "fill-red-500" : ""} />
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
        <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-4 py-2 z-50">
          Item is out of stock
        </div>
      )}
    </div>
  );
}