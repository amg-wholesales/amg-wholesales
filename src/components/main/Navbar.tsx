
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { ShoppingCart, Menu, X, User, LogIn, LogOut } from "lucide-react";
// import { useAuth } from "@/context/authContext";
// import Cart from "@/components/cart/Cart";

// const CATEGORIES = [
//   "ASHTRAY",
//   "CIGAR HOT",
//   "CIGAR BY BRAND NEW",
//   "CIGAR ACCESSORIES",
//   "ADULT NOVELTYHOT",
//   "BRANDED APPARELS & MERCHANDISE"
// ];

// export default function Navbar() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { isAuthenticated, userEmail, userType, userId, logout } = useAuth();
  
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [cartOpen, setCartOpen] = useState(false);
//   const [cartItemCount, setCartItemCount] = useState(0);
  
//   // Fetch cart item count when component mounts or auth state changes
//   useEffect(() => {
//     if (isAuthenticated && userId) {
//       fetchCartCount();
//     } else {
//       setCartItemCount(0);
//     }
//   }, [isAuthenticated, userId]);
  
//   const fetchCartCount = async () => {
//     try {
//       const response = await fetch(`/api/cart?userId=${userId}`);
      
//       if (response.ok) {
//         const data = await response.json();
//         setCartItemCount(data.itemCount || 0);
//       }
//     } catch (error) {
//       console.error("Error fetching cart count:", error);
//     }
//   };
  
//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };
  
//   const toggleCart = () => {
//     setCartOpen(!cartOpen);
    
//     // Refresh cart count when cart is closed
//     if (cartOpen && isAuthenticated && userId) {
//       fetchCartCount();
//     }
//   };
  
//   const formatCategoryUrl = (category) => {
//     return category.toLowerCase().replace(/\s+/g, '-').replace(/[\/\+]/g, '-');
//   };
  
//   const handleLogout = () => {
//     logout();
//     router.push("/");
//   };
  
//   return (
//     <nav className="bg-white shadow-md">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link href="/" className="font-bold text-xl text-blue-600">
//             LPike Shop
//           </Link>
          
//           {/* Desktop Navigation */}
//           <div className="hidden md:flex space-x-6">
//             <Link 
//               href="/" 
//               className={`hover:text-blue-600 transition ${
//                 pathname === "/" ? "text-blue-600" : "text-gray-700"
//               }`}
//             >
//               Home
//             </Link>
//             <div className="relative group">
//               <button className="hover:text-blue-600 transition text-gray-700 flex items-center">
//                 Categories
//               </button>
//               <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
//                 <div className="py-1">
//                   <Link 
//                     href="/product/category/all"
//                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                   >
//                     All Products
//                   </Link>
//                   {CATEGORIES.map((category) => (
//                     <Link 
//                       key={category}
//                       href={`/product/category/${formatCategoryUrl(category)}`}
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       {category}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <Link 
//               href="/about" 
//               className={`hover:text-blue-600 transition ${
//                 pathname === "/about" ? "text-blue-600" : "text-gray-700"
//               }`}
//             >
//               About
//             </Link>
//             <Link 
//               href="/contact" 
//               className={`hover:text-blue-600 transition ${
//                 pathname === "/contact" ? "text-blue-600" : "text-gray-700"
//               }`}
//             >
//               Contact
//             </Link>
//           </div>
          
//           {/* User Controls */}
//           <div className="flex items-center space-x-4">
//             {/* Cart Button */}
//             <button 
//               onClick={toggleCart}
//               className="relative p-2 text-gray-700 hover:text-blue-600 transition"
//               aria-label="Shopping cart"
//             >
//               <ShoppingCart className="h-6 w-6" />
//               {cartItemCount > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                   {cartItemCount}
//                 </span>
//               )}
//             </button>
            
//             {/* User Menu */}
//             {isAuthenticated ? (
//               <div className="relative group">
//                 <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition">
//                   <User className="h-5 w-5" />
//                   <span className="hidden md:inline">Account</span>
//                 </button>
//                 <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
//                   <div className="py-1">
//                     <div className="px-4 py-2 text-sm text-gray-700 border-b">
//                       <p className="font-medium truncate">{userEmail}</p>
//                       <p className="text-gray-500">{userType}</p>
//                     </div>
//                     {userType === 'BUYER' ? (
//                       <>
//                         <Link 
//                           href="/user/profile" 
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         >
//                           Profile
//                         </Link>
//                         <Link 
//                           href="/user/purchase-requests" 
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         >
//                           Purchase Requests
//                         </Link>
//                       </>
//                     ) : (
//                       <>
//                         <Link 
//                           href="/admin/dashboard/all_products" 
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         >
//                           All Products
//                         </Link>
//                         <Link 
//                           href="/admin/dashboard/purchase-requests" 
//                           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         >
//                           Purchase Requests
//                         </Link>
//                       </>
//                     )}
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
//                     >
//                       <LogOut className="h-4 w-4 mr-2" />
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <Link 
//                 href="/auth/user/login" 
//                 className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition"
//               >
//                 <LogIn className="h-5 w-5" />
//                 <span className="hidden md:inline">Login</span>
//               </Link>
//             )}
            
//             {/* Mobile Menu Button */}
//             <button
//               className="md:hidden p-2 text-gray-700"
//               onClick={toggleMobileMenu}
//               aria-label="Toggle menu"
//             >
//               {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
        
//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden py-4 border-t">
//             <div className="flex flex-col space-y-3">
//               <Link 
//                 href="/" 
//                 className={`px-2 py-1 rounded ${
//                   pathname === "/" ? "bg-blue-50 text-blue-600" : "text-gray-700"
//                 }`}
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Home
//               </Link>
//               <div className="px-2 py-1">
//                 <button 
//                   className="flex justify-between items-center w-full text-left text-gray-700"
//                   onClick={() => router.push("/product/category/all")}
//                 >
//                   Categories
//                 </button>
//               </div>
//               <Link 
//                 href="/about" 
//                 className={`px-2 py-1 rounded ${
//                   pathname === "/about" ? "bg-blue-50 text-blue-600" : "text-gray-700"
//                 }`}
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 About
//               </Link>
//               <Link 
//                 href="/contact" 
//                 className={`px-2 py-1 rounded ${
//                   pathname === "/contact" ? "bg-blue-50 text-blue-600" : "text-gray-700"
//                 }`}
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Contact
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
      
//       {/* Cart Drawer */}
//       {cartOpen && (
//         <div className="fixed inset-0 overflow-hidden z-50">
//           {/* Backdrop */}
//           <div 
//             className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
//             onClick={toggleCart}
//           ></div>
          
//           {/* Cart Panel */}
//           <div className="absolute inset-y-0 right-0 max-w-full flex">
//             <div className="relative w-screen max-w-md">
//               <div className="h-full flex flex-col bg-white shadow-xl">
//                 {/* Cart Header */}
//                 <div className="flex items-center justify-between px-4 py-6 border-b">
//                   <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
//                   <button
//                     onClick={toggleCart}
//                     className="text-gray-400 hover:text-gray-500"
//                   >
//                     <X className="h-6 w-6" />
//                   </button>
//                 </div>
                
//                 {/* Cart Content */}
//                 <Cart onClose={toggleCart} />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, Menu, X, User, LogIn, LogOut, Phone, Mail, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/authContext";
import Cart from "@/components/cart/Cart";

// Category structure
const CATEGORIES = {
  "Cigar": ["Ashtray", "Cigar", "Cigar Accessories"],
  "C-Store": [
    "Adult Novelty", 
    "Branded Apparels & Merchandise", 
    "Detox + Syntheticshot", 
    "General Merchandise", 
    "Incense + Scents + Sprays", 
    "Medicine + Energy", 
    "Phone Accessories", 
    "Phone Cards"
  ],
  "Flower / Wax / Oil": [
    "510 Thread Batteries", 
    "Dry + Wax Accessories", 
    "Dry + Wax Vaporizers"
  ],
  "Glass": [
    "Glass Accessories", 
    "Glass Cleaner + Accessories", 
    "Glass Pipes", 
    "Hand Pipes"
  ],
  "Hookah": [
    "Herbal Non Tobacco", 
    "Hookah Accessories", 
    "Hookah Bowls", 
    "Hookah Burners", 
    "Hookah Coals", 
    "Hookah Hoses", 
    "Hookah Tips", 
    "Hookahs"
  ],
  "Kratom": [],
  "7-Hydroxymitragynine": [],
  "Roll Your Own": [
    "Grinders", 
    "Jars/Sealed Bags", 
    "Raw Accessories", 
    "Rolling Paper + Filters", 
    "Scales", 
    "Smoke Accessories", 
    "Trays"
  ],
  "Torch It": [
    "Butane + Lighter Fluid", 
    "Big Torches", 
    "Lighters", 
    "Mini Torches", 
    "Zippo Lighters"
  ],
  "Whip Cream": [
    "Whip Cream Chargers", 
    "Whip Cream Dispensers"
  ]
};


export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, userEmail, userType, userId, logout } = useAuth();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0.00);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // Fetch cart item count when component mounts or auth state changes
  useEffect(() => {
    if (isAuthenticated && userId) {
      fetchCartCount();
    } else {
      setCartItemCount(0);
      setCartTotal(0.00);
    }
  }, [isAuthenticated, userId]);
  
  const fetchCartCount = async () => {
    try {
      const response = await fetch(`/api/cart?userId=${userId}`);
      
      if (response.ok) {
        const data = await response.json();
        setCartItemCount(data.itemCount || 0);
        setCartTotal(data.total || 0.00);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleCart = () => {
    setCartOpen(!cartOpen);
    
    // Refresh cart count when cart is closed
    if (cartOpen && isAuthenticated && userId) {
      fetchCartCount();
    }
  };
  
  const formatCategoryUrl = (category) => {
    return category.toLowerCase().replace(/\s+/g, '-').replace(/[\/\+]/g, '-');
  };
  
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleDropdownHover = (category) => {
    setActiveDropdown(category);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };
  
  return (
    <div className="bg-black text-white relative shadow-xl">
      {/* Top Bar */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-1">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <img 
                src="/logo/logo.jpg" 
                alt="AMG Wholesale" 
                className="h-8 w-auto"
              />
              <div className="text-lg font-bold tracking-wide text-red-500">
                AMG WHOLESALE
              </div>
            </Link>
            
            {/* Contact Info & Cart Summary */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <a href="mailto:empiresmokedist@gmail.com" className="flex items-center text-gray-300 hover:text-white transition">
                  <Mail className="h-4 w-4 mr-1" />
                  <span className="text-sm">amgwholesales01@gmail.com</span>
                </a>
                <span className="text-gray-700">|</span>
                <a href="tel:+15168822888" className="flex items-center text-gray-300 hover:text-white transition">
                  <Phone className="h-4 w-4 mr-1" />
                  <span className="text-sm">(+1) 516 882 2888</span>
                </a>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* User Account Dropdown */}
                {isAuthenticated ? (
                  <div className="relative group">
                    <button className="flex items-center space-x-1 text-gray-300 hover:text-white transition">
                      <User className="h-5 w-5" />
                      <span className="hidden md:inline text-sm">Account</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-900 ring-1 ring-red-500 ring-opacity-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="py-1">
                        <div className="px-4 py-3 text-sm text-gray-300 border-b border-gray-800">
                          <p className="font-medium truncate">{userEmail}</p>
                          <p className="text-gray-500">{userType}</p>
                        </div>
                        {userType === 'BUYER' ? (
                          <>
                            <Link 
                              href="/user/profile" 
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                            >
                              Profile
                            </Link>
                            <Link 
                              href="/user/purchase-requests" 
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                            >
                              Purchase Requests
                            </Link>
                          </>
                        ) : (
                          <>
                            <Link 
                              href="/admin/dashboard/all_products" 
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                            >
                              All Products
                            </Link>
                            <Link 
                              href="/admin/dashboard/purchase-requests" 
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                            >
                              Purchase Requests
                            </Link>
                          </>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-800 flex items-center"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link href="/auth/user/login" className="text-gray-300 hover:text-white transition flex items-center">
                    <LogIn className="h-5 w-5 mr-1" />
                    <span className="hidden md:inline text-sm">Login</span>
                  </Link>
                )}
                
                <button 
                  onClick={toggleCart}
                  className="relative text-gray-300 hover:text-white transition flex items-center"
                  aria-label="Shopping cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="ml-1 font-medium text-sm">${cartTotal.toFixed(2)}</span>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
            
            {/* Mobile Toggle */}
            <button
              className="md:hidden text-gray-300 hover:text-white"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <nav className="border-b border-gray-800">
        <div className="container mx-auto px-0">
          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <div className="flex justify-between items-center w-full">
              <div className="flex space-x-0 whitespace-nowrap">
                {/* Main Categories */}
                {Object.keys(CATEGORIES).map((category) => (
                  <div 
                    key={category}
                    className="relative group"
                    onMouseEnter={() => handleDropdownHover(category)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button className={`px-2 py-3 text-sm font-medium flex items-center space-x-1 hover:text-red-500 transition ${
                      activeDropdown === category ? 'text-red-500' : 'text-gray-300'
                    }`}>
                      <span>{category}</span>
                      {CATEGORIES[category].length > 0 && <ChevronDown className="h-4 w-4" />}
                    </button>
                    
                    {CATEGORIES[category].length > 0 && (
                      <div className={`absolute left-0 mt-0 w-56 rounded-b-md shadow-lg bg-gray-900 ring-1 ring-red-500 ring-opacity-20 transition-all duration-300 z-50 ${
                        activeDropdown === category ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}>
                        <div className="py-1">
                          {CATEGORIES[category].map((subcategory) => (
                            <Link 
                              key={subcategory}
                              href={`/product/category/${formatCategoryUrl(subcategory)}`}
                              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                            >
                              {subcategory}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Special Links */}
              <div className="flex space-x-4">
                <Link href="/best-sellers" className="px-2 py-3 text-sm font-medium text-gray-300 hover:text-red-500 transition">
                  Best Sellers
                </Link>
                <Link href="/new-arrivals" className="px-2 py-3 text-sm font-medium text-gray-300 hover:text-red-500 transition">
                  New Arrivals
                </Link>
                <Link href="/on-sale" className="px-2 py-3 text-sm font-medium text-red-500 hover:text-red-400 transition">
                  On Sale
                </Link>
                {/* <Link href="/join-us" className="px-2 py-3 text-sm font-medium text-gray-300 hover:text-red-500 transition">
                  Join Us Now
                </Link> */}
              </div>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-3 border-t border-gray-800">
              <div className="flex flex-col">
                {/* User Controls for Mobile */}
                <div className="py-3 border-b border-gray-800 flex items-center justify-between">
                  {isAuthenticated ? (
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      <span className="text-sm truncate max-w-[200px]">{userEmail}</span>
                    </div>
                  ) : (
                    <Link 
                      href="/auth/user/login" 
                      className="flex items-center text-gray-300 hover:text-white"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LogIn className="h-5 w-5 mr-2" />
                      <span className="text-sm">Login / Register</span>
                    </Link>
                  )}
                  
                  <button 
                    onClick={toggleCart}
                    className="relative text-gray-300 hover:text-white flex items-center"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    <span className="text-sm">${cartTotal.toFixed(2)}</span>
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </button>
                </div>
                
                {/* User Profile Options for Mobile */}
                {isAuthenticated && (
                  <div className="mt-4 border-b border-gray-800 pb-4">
                    <p className="text-sm uppercase tracking-widest mb-2 text-gray-500">Account</p>
                    {userType === 'BUYER' ? (
                      <>
                        <Link 
                          href="/user/profile" 
                          className="block py-2 text-sm text-gray-300 hover:text-white"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Profile
                        </Link>
                        <Link 
                          href="/user/purchase-requests" 
                          className="block py-2 text-sm text-gray-300 hover:text-white"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Purchase Requests
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link 
                          href="/admin/dashboard/all_products" 
                          className="block py-2 text-sm text-gray-300 hover:text-white"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          All Products
                        </Link>
                        <Link 
                          href="/admin/dashboard/purchase-requests" 
                          className="block py-2 text-sm text-gray-300 hover:text-white"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Purchase Requests
                        </Link>
                      </>
                    )}
                  </div>
                )}
                
                {/* Categories for Mobile */}
                <div className="mt-4 mb-2 border-b border-gray-800 pb-2">
                  <p className="text-sm uppercase tracking-widest mb-2 text-gray-500">Categories</p>
                  {Object.keys(CATEGORIES).map((category) => (
                    <div key={category} className="mb-2">
                      <div className="font-medium text-white py-2 text-sm">{category}</div>
                      {CATEGORIES[category].length > 0 && (
                        <div className="pl-4 border-l border-gray-800">
                          {CATEGORIES[category].map((subcategory) => (
                            <Link 
                              key={subcategory}
                              href={`/product/category/${formatCategoryUrl(subcategory)}`}
                              className="block py-2 text-sm text-gray-400 hover:text-white"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subcategory}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Special Links for Mobile */}
                <div className="mt-4">
                  <p className="text-sm uppercase tracking-widest mb-2 text-gray-500">Shop</p>
                  <Link 
                    href="/best-sellers" 
                    className="block py-2 text-sm text-white hover:text-red-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Best Sellers
                  </Link>
                  <Link 
                    href="/new-arrivals" 
                    className="block py-2 text-sm text-white hover:text-red-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    New Arrivals
                  </Link>
                  <Link 
                    href="/on-sale" 
                    className="block py-2 text-sm text-red-500 hover:text-red-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    On Sale
                  </Link>
                  <Link 
                    href="/join-us" 
                    className="block py-2 text-sm text-white hover:text-red-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Join Us Now
                  </Link>
                </div>
                
                {/* Contact Info for Mobile */}
                <div className="mt-6 pt-4 border-t border-gray-800">
                  <p className="text-sm uppercase tracking-widest mb-2 text-gray-500">Contact</p>
                  <a href="mailto:empiresmokedist@gmail.com" className="block py-2 text-sm text-gray-400 hover:text-white">
                    <Mail className="h-4 w-4 inline mr-2" />
                    empiresmokedist@gmail.com
                  </a>
                  <a href="tel:+15168822888" className="block py-2 text-sm text-gray-400 hover:text-white">
                    <Phone className="h-4 w-4 inline mr-2" />
                    (+1) 516 882 2888
                  </a>
                </div>
                
                {/* Logout for Mobile */}
                {isAuthenticated && (
                  <div className="mt-6 pt-4 border-t border-gray-800">
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center text-red-500 hover:text-red-400"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
      
      {/* Banner for Special Promotions/Announcements */}
      {/* <div className="bg-gradient-to-r from-red-700 to-red-500 py-2 text-center">
        <p className="text-sm font-medium text-white">CIGAR DEALS - Limited Time Offers!</p>
      </div> */}
      
      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 overflow-hidden z-50">
          {/* Backdrop */}
          
          
          {/* Cart Panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-gray-200 shadow-xl text-gray-800">
                {/* Cart Header */}
                <div className="flex items-center justify-between px-6 py-6 border-b border-gray-300">
                  <h2 className="text-xl font-bold">Your Cart</h2>
                  <button
                    onClick={toggleCart}
                    className="text-gray-600 hover:text-gray-700 transition"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                {/* Cart Content */}
                <Cart onClose={toggleCart} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}