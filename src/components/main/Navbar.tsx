
// // "use client";

// // import { useState, useEffect } from "react";
// // import Link from "next/link";
// // import { usePathname, useRouter } from "next/navigation";
// // import { ShoppingCart, Menu, X, User, LogIn, LogOut, Phone, Mail, ChevronDown } from "lucide-react";
// // import { useAuth } from "@/context/authContext";
// // import Cart from "@/components/cart/Cart";

// // // Category structure
// // const CATEGORIES = {
// //   "Cigar": ["Ashtray", "Cigar", "Cigar Accessories"],
// //   "C-Store": [
// //     "Adult Novelty", 
// //     "Branded Apparels & Merchandise", 
// //     "Detox + Syntheticshot", 
// //     "General Merchandise", 
// //     "Incense + Scents + Sprays", 
// //     "Medicine + Energy", 
// //     "Phone Accessories", 
// //     "Phone Cards"
// //   ],
// //   "Flower / Wax / Oil": [
// //     "510 Thread Batteries", 
// //     "Dry + Wax Accessories", 
// //     "Dry + Wax Vaporizers"
// //   ],
// //   "Glass": [
// //     "Glass Accessories", 
// //     "Glass Cleaner + Accessories", 
// //     "Glass Pipes", 
// //     "Hand Pipes"
// //   ],
// //   "Hookah": [
// //     "Herbal Non Tobacco", 
// //     "Hookah Accessories", 
// //     "Hookah Bowls", 
// //     "Hookah Burners", 
// //     "Hookah Coals", 
// //     "Hookah Hoses", 
// //     "Hookah Tips", 
// //     "Hookahs"
// //   ],
// //   "Kratom": [],
// //   "7-Hydroxymitragynine": [],
// //   "Roll Your Own": [
// //     "Grinders", 
// //     "Jars/Sealed Bags", 
// //     "Raw Accessories", 
// //     "Rolling Paper + Filters", 
// //     "Scales", 
// //     "Smoke Accessories", 
// //     "Trays"
// //   ],
// //   "Torch It": [
// //     "Butane + Lighter Fluid", 
// //     "Big Torches", 
// //     "Lighters", 
// //     "Mini Torches", 
// //     "Zippo Lighters"
// //   ],
// //   "Whip Cream": [
// //     "Whip Cream Chargers", 
// //     "Whip Cream Dispensers"
// //   ]
// // };


// // export default function Navbar() {
// //   const router = useRouter();
// //   const pathname = usePathname();
// //   const { isAuthenticated, userEmail, userType, userId, logout, isWholesaleBuyer, isRetailBuyer } = useAuth();
  
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const [cartOpen, setCartOpen] = useState(false);
// //   const [cartItemCount, setCartItemCount] = useState(0);
// //   const [cartTotal, setCartTotal] = useState(0.00);
// //   const [activeDropdown, setActiveDropdown] = useState(null);
  
// //   // Fetch cart item count when component mounts or auth state changes
// //   useEffect(() => {
// //     if (isAuthenticated && userId) {
// //       fetchCartCount();
// //     } else {
// //       setCartItemCount(0);
// //       setCartTotal(0.00);
// //     }
// //   }, [isAuthenticated, userId]);
  
// //   const fetchCartCount = async () => {
// //     try {
// //       const response = await fetch(`/api/cart?userId=${userId}`);
      
// //       if (response.ok) {
// //         const data = await response.json();
// //         setCartItemCount(data.itemCount || 0);
// //         setCartTotal(data.total || 0.00);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching cart count:", error);
// //     }
// //   };
  
// //   const toggleMobileMenu = () => {
// //     setMobileMenuOpen(!mobileMenuOpen);
// //   };
  
// //   const toggleCart = () => {
// //     setCartOpen(!cartOpen);
    
// //     // Refresh cart count when cart is closed
// //     if (cartOpen && isAuthenticated && userId) {
// //       fetchCartCount();
// //     }
// //   };
  
// //   const formatCategoryUrl = (category) => {
// //     return category.toLowerCase().replace(/\s+/g, '-').replace(/[\/\+]/g, '-');
// //   };
  
// //   const handleLogout = () => {
// //     logout();
// //     router.push("/");
// //   };

// //   const handleDropdownHover = (category) => {
// //     setActiveDropdown(category);
// //   };

// //   const handleDropdownLeave = () => {
// //     setActiveDropdown(null);
// //   };
  
// //   // Get buyer type display text
// //   const getBuyerTypeDisplay = () => {
// //     if (isWholesaleBuyer) return "Wholesale Buyer";
// //     if (isRetailBuyer) return "Retail Buyer";
// //     return userType;
// //   };
  
// //   return (
// //     <div className="bg-black text-white relative shadow-xl">
// //       {/* Top Bar */}
// //       <div className="border-b border-gray-800">
// //         <div className="container mx-auto px-4 py-1">
// //           <div className="flex justify-between items-center">
// //             {/* Logo */}
// //             <Link href="/" className="flex items-center space-x-2">
// //               <img 
// //                 src="/logo/logo.jpg" 
// //                 alt="AMG Wholesale" 
// //                 className="h-8 w-auto"
// //               />
// //               <div className="text-lg font-bold tracking-wide text-red-500">
// //                 AMG WHOLESALE
// //               </div>
// //             </Link>
            
// //             {/* Contact Info & Cart Summary */}
// //             <div className="hidden md:flex items-center space-x-6">
// //               <div className="flex items-center space-x-2">
// //                 <a href="mailto:amgwholesales01@gmail.com" className="flex items-center text-gray-300 hover:text-white transition">
// //                   <Mail className="h-4 w-4 mr-1" />
// //                   <span className="text-sm">amgwholesales01@gmail.com</span>
// //                 </a>
// //                 <span className="text-gray-700">|</span>
// //                 <a href="tel:+15168822888" className="flex items-center text-gray-300 hover:text-white transition">
// //                   <Phone className="h-4 w-4 mr-1" />
// //                   <span className="text-sm">(+1) 516 882 2888</span>
// //                 </a>
// //               </div>
              
// //               <div className="flex items-center space-x-4">
// //                 {/* User Account Dropdown */}
// //                 {isAuthenticated ? (
// //                   <div className="relative group">
// //                     <button className="flex items-center space-x-1 text-gray-300 hover:text-white transition">
// //                       <User className="h-5 w-5" />
// //                       <span className="hidden md:inline text-sm">Account</span>
// //                     </button>
// //                     <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-900 ring-1 ring-red-500 ring-opacity-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
// //                       <div className="py-1">
// //                         <div className="px-4 py-3 text-sm text-gray-300 border-b border-gray-800">
// //                           <p className="font-medium truncate">{userEmail}</p>
// //                           <p className="text-gray-500">{getBuyerTypeDisplay()}</p>
// //                         </div>
// //                         {isWholesaleBuyer || isRetailBuyer ? (
// //                           <>
// //                             <Link 
// //                               href="/user/profile" 
// //                               className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
// //                             >
// //                               Profile
// //                             </Link>
// //                             <Link 
// //                               href="/user/purchase-requests" 
// //                               className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
// //                             >
// //                               Purchase Requests
// //                             </Link>
// //                           </>
// //                         ) : (
// //                           <>
// //                             <Link 
// //                               href="/admin/dashboard/all_products" 
// //                               className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
// //                             >
// //                               All Products
// //                             </Link>
// //                             <Link 
// //                               href="/admin/dashboard/purchase-requests" 
// //                               className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
// //                             >
// //                               Purchase Requests
// //                             </Link>
// //                           </>
// //                         )}
// //                         <button
// //                           onClick={handleLogout}
// //                           className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-800 flex items-center"
// //                         >
// //                           <LogOut className="h-4 w-4 mr-2" />
// //                           Logout
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   <Link href="/auth/user/login" className="text-gray-300 hover:text-white transition flex items-center">
// //                     <LogIn className="h-5 w-5 mr-1" />
// //                     <span className="hidden md:inline text-sm">Login</span>
// //                   </Link>
// //                 )}
                
// //                 <button 
// //                   onClick={toggleCart}
// //                   className="relative text-gray-300 hover:text-white transition flex items-center"
// //                   aria-label="Shopping cart"
// //                 >
// //                   <ShoppingCart className="h-5 w-5" />
// //                   <span className="ml-1 font-medium text-sm">${cartTotal.toFixed(2)}</span>
// //                   {cartItemCount > 0 && (
// //                     <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
// //                       {cartItemCount}
// //                     </span>
// //                   )}
// //                 </button>
// //               </div>
// //             </div>
            
// //             {/* Mobile Toggle */}
// //             <button
// //               className="md:hidden text-gray-300 hover:text-white"
// //               onClick={toggleMobileMenu}
// //               aria-label="Toggle menu"
// //             >
// //               {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
      
// //       {/* Main Navigation */}
// //       <nav className="border-b border-gray-800">
// //         <div className="container mx-auto px-0">
// //           {/* Desktop Navigation */}
// //           <div className="hidden md:flex">
// //             <div className="flex justify-between items-center w-full">
// //               <div className="flex space-x-0 whitespace-nowrap">
// //                 {/* Main Categories */}
// //                 {Object.keys(CATEGORIES).map((category) => (
// //                   <div 
// //                     key={category}
// //                     className="relative group"
// //                     onMouseEnter={() => handleDropdownHover(category)}
// //                     onMouseLeave={handleDropdownLeave}
// //                   >
// //                     {CATEGORIES[category].length > 0 ? (
// //                       // Category with subcategories (dropdown)
// //                       <button className={`px-2 py-3 text-sm font-medium flex items-center space-x-1 hover:text-red-500 transition ${
// //                         activeDropdown === category ? 'text-red-500' : 'text-gray-300'
// //                       }`}>
// //                         <span>{category}</span>
// //                         <ChevronDown className="h-4 w-4" />
// //                       </button>
// //                     ) : (
// //                       // Category without subcategories (direct link)
// //                       <Link 
// //                         href={`/product/category/${formatCategoryUrl(category)}`}
// //                         className="px-2 py-3 text-sm font-medium flex items-center text-gray-300 hover:text-red-500 transition"
// //                       >
// //                         <span>{category}</span>
// //                       </Link>
// //                     )}
                    
// //                     {CATEGORIES[category].length > 0 && (
// //                       <div className={`absolute left-0 mt-0 w-56 rounded-b-md shadow-lg bg-gray-900 ring-1 ring-red-500 ring-opacity-20 transition-all duration-300 z-50 ${
// //                         activeDropdown === category ? 'opacity-100 visible' : 'opacity-0 invisible'
// //                       }`}>
// //                         <div className="py-1">
// //                           {CATEGORIES[category].map((subcategory) => (
// //                             <Link 
// //                               key={subcategory}
// //                               href={`/product/category/${formatCategoryUrl(subcategory)}`}
// //                               className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
// //                             >
// //                               {subcategory}
// //                             </Link>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>
// //                 ))}
// //               </div>
              
// //               {/* Special Links */}
// //               <div className="flex space-x-4">
// //                 <Link href="/product/category/best-sellers" className="px-2 py-3 text-sm font-medium text-gray-300 hover:text-red-500 transition">
// //                   Best Sellers
// //                 </Link>
// //                 <Link href="/product/category/new-arrivals" className="px-2 py-3 text-sm font-medium text-gray-300 hover:text-red-500 transition">
// //                   New Arrivals
// //                 </Link>
// //                 <Link href="/product/category/on-sale" className="px-2 py-3 text-sm font-medium text-red-500 hover:text-red-400 transition">
// //                   On Sale
// //                 </Link>
// //               </div>
// //             </div>
// //           </div>
          
// //           {/* Mobile Navigation */}
// //           {mobileMenuOpen && (
// //             <div className="md:hidden py-3 border-t border-gray-800">
// //               <div className="flex flex-col">
// //                 {/* User Controls for Mobile */}
// //                 <div className="py-3 border-b border-gray-800 flex items-center justify-between">
// //                   {isAuthenticated ? (
// //                     <div className="flex flex-col">
// //                       <div className="flex items-center">
// //                         <User className="h-5 w-5 mr-2" />
// //                         <span className="text-sm truncate max-w-[200px]">{userEmail}</span>
// //                       </div>
// //                       <span className="text-xs text-gray-500 ml-7">{getBuyerTypeDisplay()}</span>
// //                     </div>
// //                   ) : (
// //                     <Link 
// //                       href="/auth/user/login" 
// //                       className="flex items-center text-gray-300 hover:text-white"
// //                       onClick={() => setMobileMenuOpen(false)}
// //                     >
// //                       <LogIn className="h-5 w-5 mr-2" />
// //                       <span className="text-sm">Login / Register</span>
// //                     </Link>
// //                   )}
                  
// //                   <button 
// //                     onClick={toggleCart}
// //                     className="relative text-gray-300 hover:text-white flex items-center"
// //                   >
// //                     <ShoppingCart className="h-5 w-5 mr-2" />
// //                     <span className="text-sm">${cartTotal.toFixed(2)}</span>
// //                     {cartItemCount > 0 && (
// //                       <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
// //                         {cartItemCount}
// //                       </span>
// //                     )}
// //                   </button>
// //                 </div>
                
// //                 {/* User Profile Options for Mobile */}
// //                 {isAuthenticated && (
// //                   <div className="mt-4 border-b border-gray-800 pb-4">
// //                     <p className="text-sm uppercase tracking-widest mb-2 text-gray-500">Account</p>
// //                     {isWholesaleBuyer || isRetailBuyer ? (
// //                       <>
// //                         <Link 
// //                           href="/user/profile" 
// //                           className="block py-2 text-sm text-gray-300 hover:text-white"
// //                           onClick={() => setMobileMenuOpen(false)}
// //                         >
// //                           Profile
// //                         </Link>
// //                         <Link 
// //                           href="/user/purchase-requests" 
// //                           className="block py-2 text-sm text-gray-300 hover:text-white"
// //                           onClick={() => setMobileMenuOpen(false)}
// //                         >
// //                           Purchase Requests
// //                         </Link>
// //                       </>
// //                     ) : (
// //                       <>
// //                         <Link 
// //                           href="/admin/dashboard/all_products" 
// //                           className="block py-2 text-sm text-gray-300 hover:text-white"
// //                           onClick={() => setMobileMenuOpen(false)}
// //                         >
// //                           All Products
// //                         </Link>
// //                         <Link 
// //                           href="/admin/dashboard/purchase-requests" 
// //                           className="block py-2 text-sm text-gray-300 hover:text-white"
// //                           onClick={() => setMobileMenuOpen(false)}
// //                         >
// //                           Purchase Requests
// //                         </Link>
// //                       </>
// //                     )}
// //                   </div>
// //                 )}
                
// //                 {/* Categories for Mobile */}
// //                 <div className="mt-4 mb-2 border-b border-gray-800 pb-2">
// //                   <p className="text-sm uppercase tracking-widest mb-2 text-gray-500">Categories</p>
// //                   {Object.keys(CATEGORIES).map((category) => (
// //                     <div key={category} className="mb-2">
// //                       {CATEGORIES[category].length > 0 ? (
// //                         // Category with subcategories
// //                         <>
// //                           <div className="font-medium text-white py-2 text-sm">{category}</div>
// //                           <div className="pl-4 border-l border-gray-800">
// //                             {CATEGORIES[category].map((subcategory) => (
// //                               <Link 
// //                                 key={subcategory}
// //                                 href={`/product/category/${formatCategoryUrl(subcategory)}`}
// //                                 className="block py-2 text-sm text-gray-400 hover:text-white"
// //                                 onClick={() => setMobileMenuOpen(false)}
// //                               >
// //                                 {subcategory}
// //                               </Link>
// //                             ))}
// //                           </div>
// //                         </>
// //                       ) : (
// //                         // Category without subcategories (direct link)
// //                         <Link 
// //                           href={`/product/category/${formatCategoryUrl(category)}`}
// //                           className="block font-medium text-white py-2 text-sm hover:text-red-500"
// //                           onClick={() => setMobileMenuOpen(false)}
// //                         >
// //                           {category}
// //                         </Link>
// //                       )}
// //                     </div>
// //                   ))}
// //                 </div>
                
// //                 {/* Special Links for Mobile */}
// //                 <div className="mt-4">
// //                   <p className="text-sm uppercase tracking-widest mb-2 text-gray-500">Shop</p>
// //                   <Link 
// //                     href="/product/category/best-sellers" 
// //                     className="block py-2 text-sm text-white hover:text-red-500"
// //                     onClick={() => setMobileMenuOpen(false)}
// //                   >
// //                     Best Sellers
// //                   </Link>
// //                   <Link 
// //                     href="/product/category/new-arrivals" 
// //                     className="block py-2 text-sm text-white hover:text-red-500"
// //                     onClick={() => setMobileMenuOpen(false)}
// //                   >
// //                     New Arrivals
// //                   </Link>
// //                   <Link 
// //                     href="/product/category/on-sale" 
// //                     className="block py-2 text-sm text-red-500 hover:text-red-400"
// //                     onClick={() => setMobileMenuOpen(false)}
// //                   >
// //                     On Sale
// //                   </Link>
// //                 </div>
                
// //                 {/* Contact Info for Mobile */}
// //                 <div className="mt-6 pt-4 border-t border-gray-800">
// //                   <p className="text-sm uppercase tracking-widest mb-2 text-gray-500">Contact</p>
// //                   <a href="mailto:amgwholesales01@gmail.com" className="block py-2 text-sm text-gray-400 hover:text-white">
// //                     <Mail className="h-4 w-4 inline mr-2" />
// //                     amgwholesales01@gmail.com
// //                   </a>
// //                   <a href="tel:+15168822888" className="block py-2 text-sm text-gray-400 hover:text-white">
// //                     <Phone className="h-4 w-4 inline mr-2" />
// //                     (+1) 516 882 2888
// //                   </a>
// //                 </div>
                
// //                 {/* Logout for Mobile */}
// //                 {isAuthenticated && (
// //                   <div className="mt-6 pt-4 border-t border-gray-800">
// //                     <button
// //                       onClick={() => {
// //                         handleLogout();
// //                         setMobileMenuOpen(false);
// //                       }}
// //                       className="flex items-center text-red-500 hover:text-red-400"
// //                     >
// //                       <LogOut className="h-5 w-5 mr-2" />
// //                       <span className="text-sm">Logout</span>
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </nav>
      
// //       {/* Cart Drawer */}
// //       {cartOpen && (
// //         <div className="fixed inset-0 overflow-hidden z-50">
// //           <div className="absolute inset-y-0 right-0 max-w-full flex">
// //             <div className="relative w-screen max-w-md">
// //               <div className="h-full flex flex-col bg-gray-200 shadow-xl text-gray-800">
// //                 {/* Cart Header */}
// //                 <div className="flex items-center justify-between px-6 py-6 border-b border-gray-300">
// //                   <h2 className="text-xl font-bold">Your Cart</h2>
// //                   <button
// //                     onClick={toggleCart}
// //                     className="text-gray-600 hover:text-gray-700 transition"
// //                   >
// //                     <X className="h-6 w-6" />
// //                   </button>
// //                 </div>
                
// //                 {/* Cart Content */}
// //                 <Cart onClose={toggleCart} />
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// "use client";

// import { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { ShoppingBag, Menu, X, User, Search, Heart, ChevronDown, Phone, Mail } from "lucide-react";
// import { useAuth } from "@/context/authContext";
// import Cart from "@/components/cart/Cart";

// // Category structure - keeping the same structure as your original
// const CATEGORIES = {
//   "Cigar": ["Ashtray", "Cigar", "Cigar Accessories"],
//   "C-Store": [
//     "Adult Novelty", 
//     "Branded Apparels & Merchandise", 
//     "Detox + Syntheticshot", 
//     "General Merchandise", 
//     "Incense + Scents + Sprays", 
//     "Medicine + Energy", 
//     "Phone Accessories", 
//     "Phone Cards"
//   ],
//   "Flower / Wax / Oil": [
//     "510 Thread Batteries", 
//     "Dry + Wax Accessories", 
//     "Dry + Wax Vaporizers"
//   ],
//   "Glass": [
//     "Glass Accessories", 
//     "Glass Cleaner + Accessories", 
//     "Glass Pipes", 
//     "Hand Pipes"
//   ],
//   "Hookah": [
//     "Herbal Non Tobacco", 
//     "Hookah Accessories", 
//     "Hookah Bowls", 
//     "Hookah Burners", 
//     "Hookah Coals", 
//     "Hookah Hoses", 
//     "Hookah Tips", 
//     "Hookahs"
//   ],
//   "Kratom": [],
//   "7-Hydroxymitragynine": [],
//   "Roll Your Own": [
//     "Grinders", 
//     "Jars/Sealed Bags", 
//     "Raw Accessories", 
//     "Rolling Paper + Filters", 
//     "Scales", 
//     "Smoke Accessories", 
//     "Trays"
//   ],
//   "Torch It": [
//     "Butane + Lighter Fluid", 
//     "Big Torches", 
//     "Lighters", 
//     "Mini Torches", 
//     "Zippo Lighters"
//   ],
//   "Whip Cream": [
//     "Whip Cream Chargers", 
//     "Whip Cream Dispensers"
//   ]
// };

// export default function Navbar() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { isAuthenticated, userEmail, userType, userId, logout, isWholesaleBuyer, isRetailBuyer } = useAuth();
  
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [cartOpen, setCartOpen] = useState(false);
//   const [cartItemCount, setCartItemCount] = useState(0);
//   const [cartTotal, setCartTotal] = useState(0.00);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isScrolled, setIsScrolled] = useState(false);
  
//   const searchInputRef = useRef(null);
//   const categoryRef = useRef({});
  
//   // Handle scroll effects
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 80);
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
//   // Fetch cart item count when component mounts or auth state changes
//   useEffect(() => {
//     if (isAuthenticated && userId) {
//       fetchCartCount();
//     } else {
//       setCartItemCount(0);
//       setCartTotal(0.00);
//     }
//   }, [isAuthenticated, userId]);
  
//   // Focus search input when search is opened
//   useEffect(() => {
//     if (searchOpen && searchInputRef.current) {
//       searchInputRef.current.focus();
//     }
//   }, [searchOpen]);
  
//   const fetchCartCount = async () => {
//     try {
//       const response = await fetch(`/api/cart?userId=${userId}`);
      
//       if (response.ok) {
//         const data = await response.json();
//         setCartItemCount(data.itemCount || 0);
//         setCartTotal(data.total || 0.00);
//       }
//     } catch (error) {
//       console.error("Error fetching cart count:", error);
//     }
//   };
  
//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//     if (searchOpen) setSearchOpen(false);
//   };
  
//   const toggleCart = () => {
//     setCartOpen(!cartOpen);
    
//     // Refresh cart count when cart is closed
//     if (cartOpen && isAuthenticated && userId) {
//       fetchCartCount();
//     }
//   };
  
//   const toggleSearch = () => {
//     setSearchOpen(!searchOpen);
//     if (mobileMenuOpen) setMobileMenuOpen(false);
//   };
  
//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       router.push(`/product/search?q=${encodeURIComponent(searchTerm.trim())}`);
//       setSearchOpen(false);
//     }
//   };
  
//   const formatCategoryUrl = (category) => {
//     return category.toLowerCase().replace(/\s+/g, '-').replace(/[\/\+]/g, '-');
//   };
  
//   const handleLogout = () => {
//     logout();
//     router.push("/");
//   };

//   const handleDropdownHover = (category) => {
//     setActiveDropdown(category);
//   };

//   const handleDropdownLeave = () => {
//     setActiveDropdown(null);
//   };
  
//   // Get buyer type display text
//   const getBuyerTypeDisplay = () => {
//     if (isWholesaleBuyer) return "Wholesale Buyer";
//     if (isRetailBuyer) return "Retail Buyer";
//     return userType;
//   };
  
//   return (
//     <>
//       {/* Top announcement bar - can be used for promotions */}
//       <div className={`bg-black text-white text-center text-xs py-2 transition-all duration-300 ${isScrolled ? 'h-0 py-0 overflow-hidden' : ''}`}>
//         Free shipping on all orders over $100 | Use code WELCOME15 for 15% off your first order
//       </div>
    
//       <header className={`w-full z-40 transition-all duration-300 ${isScrolled ? 'fixed top-0 shadow-sm' : 'relative'} bg-white`}>
//         {/* Top utility bar */}
//         <div className="border-b border-gray-100">
//           <div className="container mx-auto px-4">
//             <div className="flex justify-between items-center h-10">
//               {/* Contact info */}
//               <div className="hidden md:flex items-center space-x-4 text-xs text-gray-500">
//                 <a href="tel:+15168822888" className="hover:text-black transition-colors flex items-center">
//                   <Phone className="h-3 w-3 mr-1" />
//                   (+1) 516 882 2888
//                 </a>
//                 <a href="mailto:amgwholesales01@gmail.com" className="hover:text-black transition-colors flex items-center">
//                   <Mail className="h-3 w-3 mr-1" />
//                   amgwholesales01@gmail.com
//                 </a>
//               </div>
              
//               {/* Auth links */}
//               <div className="ml-auto flex items-center space-x-4 text-xs">
//                 {isAuthenticated ? (
//                   <div className="relative group">
//                     <button className="flex items-center hover:text-black transition-colors">
//                       <span className="hidden md:inline">{userEmail}</span>
//                       <span className="md:hidden">Account</span>
//                       <ChevronDown className="h-3 w-3 ml-1" />
//                     </button>
                    
//                     <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                       <div className="py-2 px-3 border-b border-gray-100 text-xs text-gray-500">
//                         <p className="font-medium">{getBuyerTypeDisplay()}</p>
//                       </div>
                      
//                       <div className="py-1">
//                         {isWholesaleBuyer || isRetailBuyer ? (
//                           <>
//                             <Link 
//                               href="/user/profile" 
//                               className="block px-4 py-2 text-sm hover:bg-gray-50"
//                             >
//                               Profile
//                             </Link>
//                             <Link 
//                               href="/user/purchase-requests" 
//                               className="block px-4 py-2 text-sm hover:bg-gray-50"
//                             >
//                               Purchase Requests
//                             </Link>
//                           </>
//                         ) : (
//                           <>
//                             <Link 
//                               href="/admin/dashboard/all_products" 
//                               className="block px-4 py-2 text-sm hover:bg-gray-50"
//                             >
//                               All Products
//                             </Link>
//                             <Link 
//                               href="/admin/dashboard/purchase-requests" 
//                               className="block px-4 py-2 text-sm hover:bg-gray-50"
//                             >
//                               Purchase Requests
//                             </Link>
//                           </>
//                         )}
                        
//                         <button
//                           onClick={handleLogout}
//                           className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
//                         >
//                           Logout
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <Link href="/auth/user/login" className="hover:text-black transition-colors">
//                     Login / Register
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Main header */}
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between h-20">
//             {/* Logo */}
//             <Link href="/" className="flex items-center space-x-2">
//               <img 
//                 src="/logo/logo.jpg" 
//                 alt="AMG Wholesale" 
//                 className="h-10 w-auto"
//               />
//               <span className="text-xl font-medium">AMG WHOLESALE</span>
//             </Link>
            
//             {/* Search */}
//             <div className="hidden md:block flex-1 max-w-lg mx-10">
//               <form onSubmit={handleSearch} className="relative">
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search products..."
//                   className="w-full bg-gray-50 border border-gray-200 py-2 pl-4 pr-12 text-sm focus:outline-none focus:border-black"
//                 />
//                 <button 
//                   type="submit" 
//                   className="absolute right-0 top-0 h-full px-4 text-gray-400 hover:text-black transition-colors"
//                 >
//                   <Search size={18} />
//                 </button>
//               </form>
//             </div>
            
//             {/* Header actions */}
//             <div className="flex items-center space-x-6">
//               <button 
//                 onClick={toggleSearch}
//                 className="md:hidden text-gray-700 hover:text-black transition-colors"
//               >
//                 <Search size={20} />
//               </button>
              
//               <Link 
//                 href={isAuthenticated ? "/account/wishlist" : "/auth/user/login"} 
//                 className="hidden md:block text-gray-700 hover:text-black transition-colors"
//               >
//                 <Heart size={20} />
//               </Link>
              
//               <button 
//                 onClick={toggleCart}
//                 className="text-gray-700 hover:text-black transition-colors relative"
//               >
//                 <ShoppingBag size={20} />
//                 {cartItemCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                     {cartItemCount}
//                   </span>
//                 )}
//               </button>
              
//               <button
//                 className="md:hidden text-gray-700 hover:text-black transition-colors"
//                 onClick={toggleMobileMenu}
//               >
//                 {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>
//         </div>
        
//         {/* Navigation */}
//         <nav className="hidden md:block border-t border-gray-100">
//           <div className="container mx-auto px-4">
//             <div className="flex justify-between">
//               <ul className="flex">
//                 {Object.keys(CATEGORIES).map((category) => (
//                   <li 
//                     key={category}
//                     className="relative group"
//                     onMouseEnter={() => handleDropdownHover(category)}
//                     onMouseLeave={handleDropdownLeave}
//                     ref={el => categoryRef.current[category] = el}
//                   >
//                     {CATEGORIES[category].length > 0 ? (
//                       // Category with subcategories
//                       <button 
//                         className={`py-4 px-4 text-sm font-medium flex items-center ${
//                           activeDropdown === category ? 'text-black' : 'text-gray-700 hover:text-black'
//                         } transition-colors`}
//                       >
//                         {category}
//                         <ChevronDown size={14} className="ml-1" />
//                       </button>
//                     ) : (
//                       // Category without subcategories
//                       <Link 
//                         href={`/product/category/${formatCategoryUrl(category)}`}
//                         className="py-4 px-4 text-sm font-medium text-gray-700 hover:text-black transition-colors block"
//                       >
//                         {category}
//                       </Link>
//                     )}
                    
//                     {/* Dropdown menu for categories with subcategories */}
//                     {CATEGORIES[category].length > 0 && (
//                       <div 
//                         className={`absolute left-0 mt-0 bg-white border border-gray-100 shadow-lg transition-all duration-200 z-40 min-w-[200px] ${
//                           activeDropdown === category ? 'opacity-100 visible' : 'opacity-0 invisible'
//                         }`}
//                       >
//                         <ul className="py-2">
//                           {CATEGORIES[category].map((subcategory) => (
//                             <li key={subcategory}>
//                               <Link 
//                                 href={`/product/category/${formatCategoryUrl(subcategory)}`}
//                                 className="block px-5 py-2 text-sm text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
//                               >
//                                 {subcategory}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </li>
//                 ))}
//               </ul>
              
//               {/* Special links */}
//               <ul className="flex">
//                 <li>
//                   <Link 
//                     href="/product/category/best-sellers" 
//                     className="py-4 px-4 text-sm font-medium text-gray-700 hover:text-black transition-colors block"
//                   >
//                     Best Sellers
//                   </Link>
//                 </li>
//                 <li>
//                   <Link 
//                     href="/product/category/new-arrivals" 
//                     className="py-4 px-4 text-sm font-medium text-gray-700 hover:text-black transition-colors block"
//                   >
//                     New Arrivals
//                   </Link>
//                 </li>
//                 <li>
//                   <Link 
//                     href="/product/category/on-sale" 
//                     className="py-4 px-4 text-sm font-medium text-red-600 hover:text-red-700 transition-colors block"
//                   >
//                     On Sale
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </nav>
        
//         {/* Mobile Search */}
//         {searchOpen && (
//           <div className="md:hidden border-t border-gray-100">
//             <div className="container mx-auto px-4 py-3">
//               <form onSubmit={handleSearch} className="relative">
//                 <input
//                   ref={searchInputRef}
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search products..."
//                   className="w-full bg-gray-50 border border-gray-200 py-3 pl-4 pr-12 focus:outline-none focus:border-black"
//                 />
//                 <button 
//                   type="submit" 
//                   className="absolute right-0 top-0 h-full px-4 text-gray-400 hover:text-black transition-colors"
//                 >
//                   <Search size={20} />
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
        
//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-100 bg-white">
//             <div className="container mx-auto px-4 py-4 space-y-6">
//               {/* Main categories */}
//               <div>
//                 <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3">Categories</h3>
                
//                 <ul className="space-y-4">
//                   {Object.keys(CATEGORIES).map((category) => (
//                     <li key={category}>
//                       {CATEGORIES[category].length > 0 ? (
//                         // Category with subcategories
//                         <div className="mb-2">
//                           <div className="font-medium mb-2">{category}</div>
//                           <ul className="pl-4 space-y-2 border-l border-gray-100">
//                             {CATEGORIES[category].map((subcategory) => (
//                               <li key={subcategory}>
//                                 <Link 
//                                   href={`/product/category/${formatCategoryUrl(subcategory)}`}
//                                   className="block text-sm text-gray-600 hover:text-black"
//                                   onClick={() => setMobileMenuOpen(false)}
//                                 >
//                                   {subcategory}
//                                 </Link>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       ) : (
//                         // Category without subcategories
//                         <Link 
//                           href={`/product/category/${formatCategoryUrl(category)}`}
//                           className="block font-medium hover:text-black"
//                           onClick={() => setMobileMenuOpen(false)}
//                         >
//                           {category}
//                         </Link>
//                       )}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
              
//               {/* Special links */}
//               <div>
//                 <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3">Shop</h3>
                
//                 <ul className="space-y-2">
//                   <li>
//                     <Link 
//                       href="/product/category/best-sellers" 
//                       className="block font-medium hover:text-black"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       Best Sellers
//                     </Link>
//                   </li>
//                   <li>
//                     <Link 
//                       href="/product/category/new-arrivals" 
//                       className="block font-medium hover:text-black"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       New Arrivals
//                     </Link>
//                   </li>
//                   <li>
//                     <Link 
//                       href="/product/category/on-sale" 
//                       className="block font-medium text-red-600 hover:text-red-700"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       On Sale
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
              
//               {/* Account links - only show if authenticated */}
//               {isAuthenticated && (
//                 <div>
//                   <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3">Account</h3>
                  
//                   <ul className="space-y-2">
//                     {isWholesaleBuyer || isRetailBuyer ? (
//                       <>
//                         <li>
//                           <Link 
//                             href="/user/profile" 
//                             className="block font-medium hover:text-black"
//                             onClick={() => setMobileMenuOpen(false)}
//                           >
//                             Profile
//                           </Link>
//                         </li>
//                         <li>
//                           <Link 
//                             href="/user/purchase-requests" 
//                             className="block font-medium hover:text-black"
//                             onClick={() => setMobileMenuOpen(false)}
//                           >
//                             Purchase Requests
//                           </Link>
//                         </li>
//                       </>
//                     ) : (
//                       <>
//                         <li>
//                           <Link 
//                             href="/admin/dashboard/all_products" 
//                             className="block font-medium hover:text-black"
//                             onClick={() => setMobileMenuOpen(false)}
//                           >
//                             All Products
//                           </Link>
//                         </li>
//                         <li>
//                           <Link 
//                             href="/admin/dashboard/purchase-requests" 
//                             className="block font-medium hover:text-black"
//                             onClick={() => setMobileMenuOpen(false)}
//                           >
//                             Purchase Requests
//                           </Link>
//                         </li>
//                       </>
//                     )}
//                     <li>
//                       <button
//                         onClick={() => {
//                           handleLogout();
//                           setMobileMenuOpen(false);
//                         }}
//                         className="block font-medium text-red-600 hover:text-red-700"
//                       >
//                         Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               )}
              
//               {/* Contact info */}
//               <div>
//                 <h3 className="text-xs uppercase tracking-wider text-gray-400 mb-3">Contact</h3>
                
//                 <ul className="space-y-2">
//                   <li>
//                     <a 
//                       href="tel:+15168822888" 
//                       className="block text-sm text-gray-600 hover:text-black flex items-center"
//                     >
//                       <Phone className="h-4 w-4 mr-2" />
//                       (+1) 516 882 2888
//                     </a>
//                   </li>
//                   <li>
//                     <a 
//                       href="mailto:amgwholesales01@gmail.com" 
//                       className="block text-sm text-gray-600 hover:text-black flex items-center"
//                     >
//                       <Mail className="h-4 w-4 mr-2" />
//                       amgwholesales01@gmail.com
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         )}
//       </header>
      
//       {/* Cart Drawer */}
//       {cartOpen && (
//         <div className="fixed inset-0 overflow-hidden z-50">
//           <div className="absolute inset-0 bg-black bg-opacity-20" onClick={toggleCart} />
          
//           <div className="absolute inset-y-0 right-0 max-w-full flex">
//             <div className="relative w-screen max-w-md">
//               <div className="h-full flex flex-col bg-white shadow-xl">
//                 {/* Cart Header */}
//                 <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
//                   <h2 className="text-lg font-medium">Shopping Cart</h2>
//                   <button
//                     onClick={toggleCart}
//                     className="text-gray-400 hover:text-gray-700 transition-colors"
//                   >
//                     <X size={24} />
//                   </button>
//                 </div>
                
//                 {/* Cart Content */}
//                 <Cart onClose={toggleCart} />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { ShoppingBag, Menu, X, User, Heart, ChevronDown, Phone, Mail } from "lucide-react";
// import { useAuth } from "@/context/authContext";
// import Cart from "@/components/cart/Cart";

// // Category structure - keeping the same structure as your original
// const CATEGORIES = {
//   "Cigar": ["Ashtray", "Cigar", "Cigar Accessories"],
//   "C-Store": [
//     "Adult Novelty", 
//     "Branded Apparels & Merchandise", 
//     "Detox + Syntheticshot", 
//     "General Merchandise", 
//     "Incense + Scents + Sprays", 
//     "Medicine + Energy", 
//     "Phone Accessories", 
//     "Phone Cards"
//   ],
//   "Flower / Wax / Oil": [
//     "510 Thread Batteries", 
//     "Dry + Wax Accessories", 
//     "Dry + Wax Vaporizers"
//   ],
//   "Glass": [
//     "Glass Accessories", 
//     "Glass Cleaner + Accessories", 
//     "Glass Pipes", 
//     "Hand Pipes"
//   ],
//   "Hookah": [
//     "Herbal Non Tobacco", 
//     "Hookah Accessories", 
//     "Hookah Bowls", 
//     "Hookah Burners", 
//     "Hookah Coals", 
//     "Hookah Hoses", 
//     "Hookah Tips", 
//     "Hookahs"
//   ],
//   "Kratom": [],
//   "7-Hydroxymitragynine": [],
//   "Roll Your Own": [
//     "Grinders", 
//     "Jars/Sealed Bags", 
//     "Raw Accessories", 
//     "Rolling Paper + Filters", 
//     "Scales", 
//     "Smoke Accessories", 
//     "Trays"
//   ],
//   "Torch It": [
//     "Butane + Lighter Fluid", 
//     "Big Torches", 
//     "Lighters", 
//     "Mini Torches", 
//     "Zippo Lighters"
//   ],
//   "Whip Cream": [
//     "Whip Cream Chargers", 
//     "Whip Cream Dispensers"
//   ]
// };

// export default function Navbar() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { isAuthenticated, userEmail, userType, userId, logout, isWholesaleBuyer, isRetailBuyer } = useAuth();
  
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [cartOpen, setCartOpen] = useState(false);
//   const [cartItemCount, setCartItemCount] = useState(0);
//   const [cartTotal, setCartTotal] = useState(0.00);
//   const [megaMenuOpen, setMegaMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
  
//   // Handle scroll effects
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
//   // Fetch cart item count when component mounts or auth state changes
//   useEffect(() => {
//     if (isAuthenticated && userId) {
//       fetchCartCount();
//     } else {
//       setCartItemCount(0);
//       setCartTotal(0.00);
//     }
//   }, [isAuthenticated, userId]);
  
//   const fetchCartCount = async () => {
//     try {
//       const response = await fetch(`/api/cart?userId=${userId}`);
      
//       if (response.ok) {
//         const data = await response.json();
//         setCartItemCount(data.itemCount || 0);
//         setCartTotal(data.total || 0.00);
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
  
//   const toggleMegaMenu = () => {
//     setMegaMenuOpen(!megaMenuOpen);
//   };
  
//   const formatCategoryUrl = (category) => {
//     return category.toLowerCase().replace(/\s+/g, '-').replace(/[\/\+]/g, '-');
//   };
  
//   const handleLogout = () => {
//     logout();
//     router.push("/");
//   };
  
//   // Get buyer type display text
//   const getBuyerTypeDisplay = () => {
//     if (isWholesaleBuyer) return "Wholesale Buyer";
//     if (isRetailBuyer) return "Retail Buyer";
//     return userType;
//   };
  
//   // Split categories into two rows for a more structured layout
//   const categoryKeys = Object.keys(CATEGORIES);
//   const firstRowCategories = categoryKeys.slice(0, Math.ceil(categoryKeys.length / 2));
//   const secondRowCategories = categoryKeys.slice(Math.ceil(categoryKeys.length / 2));
  
//   return (
//     <header className={`w-full z-40 transition-all duration-300 ${isScrolled ? 'fixed top-0 shadow-sm' : 'relative'} bg-white`}>
//       {/* Top utility bar with contact and account info */}
//       <div className="border-b border-gray-100">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center h-8">
//             {/* Contact info */}
//             <div className="flex items-center space-x-4 text-xs text-gray-500">
//               <a href="tel:+15168822888" className="hover:text-black transition-colors">
//                 <Phone className="h-3 w-3 inline mr-1" />
//                 (+1) 516 882 2888
//               </a>
//               <a href="mailto:amgwholesales01@gmail.com" className="hover:text-black transition-colors hidden md:inline-flex items-center">
//                 <Mail className="h-3 w-3 mr-1" />
//                 amgwholesales01@gmail.com
//               </a>
//             </div>
            
//             {/* Auth links */}
//             <div className="flex items-center space-x-4 text-xs">
//               {isAuthenticated ? (
//                 <div className="relative group">
//                   <button className="hover:text-black transition-colors">
//                     <span className="hidden md:inline">{userEmail}</span>
//                     <span className="md:hidden">Account</span>
//                     <ChevronDown className="h-3 w-3 inline-block ml-1" />
//                   </button>
                  
//                   <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                     <div className="py-2 px-3 border-b border-gray-100 text-xs text-gray-500">
//                       <p className="font-medium">{getBuyerTypeDisplay()}</p>
//                     </div>
                    
//                     <div className="py-1">
//                       {isWholesaleBuyer || isRetailBuyer ? (
//                         <>
//                           <Link 
//                             href="/user/profile" 
//                             className="block px-4 py-2 text-sm hover:bg-gray-50"
//                           >
//                             Profile
//                           </Link>
//                           <Link 
//                             href="/user/purchase-requests" 
//                             className="block px-4 py-2 text-sm hover:bg-gray-50"
//                           >
//                             Purchase Requests
//                           </Link>
//                         </>
//                       ) : (
//                         <>
//                           <Link 
//                             href="/admin/dashboard/all_products" 
//                             className="block px-4 py-2 text-sm hover:bg-gray-50"
//                           >
//                             All Products
//                           </Link>
//                           <Link 
//                             href="/admin/dashboard/purchase-requests" 
//                             className="block px-4 py-2 text-sm hover:bg-gray-50"
//                           >
//                             Purchase Requests
//                           </Link>
//                         </>
//                       )}
                      
//                       <button
//                         onClick={handleLogout}
//                         className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <Link href="/auth/user/login" className="hover:text-black transition-colors">
//                   Login / Register
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Main header with logo and actions */}
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-14">
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-2">
//             <img 
//               src="/logo/logo.jpg" 
//               alt="AMG Wholesale" 
//               className="h-8 w-auto"
//             />
//             <span className="text-lg font-medium">AMG WHOLESALE</span>
//           </Link>
          
//           {/* Header actions */}
//           <div className="flex items-center space-x-6">
//             <Link 
//               href={isAuthenticated ? "/account/wishlist" : "/auth/user/login"} 
//               className="hidden md:block text-gray-700 hover:text-black transition-colors"
//             >
//               <Heart size={18} />
//             </Link>
            
//             <button 
//               onClick={toggleCart}
//               className="text-gray-700 hover:text-black transition-colors relative"
//             >
//               <ShoppingBag size={18} />
//               {cartItemCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
//                   {cartItemCount}
//                 </span>
//               )}
//             </button>
            
//             {/* Mobile menu toggle */}
//             <button
//               className="md:hidden text-gray-700 hover:text-black transition-colors"
//               onClick={toggleMobileMenu}
//             >
//               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
            
//             {/* Categories toggle for mobile */}
//             <button
//               className="hidden md:block lg:hidden text-xs uppercase tracking-wider border border-gray-200 px-3 py-1.5 hover:border-black transition-colors"
//               onClick={toggleMegaMenu}
//             >
//               Categories <ChevronDown className="h-3 w-3 inline-block ml-1" />
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {/* Desktop Navigation - Two rows for better structure */}
//       <nav className="hidden lg:block border-t border-b border-gray-100">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col">
//             {/* First row of categories */}
//             <div className="flex justify-between">
//               <div className="flex">
//                 {firstRowCategories.map((category) => (
//                   <div key={category} className="relative group">
//                     {CATEGORIES[category].length > 0 ? (
//                       // Category with subcategories
//                       <button className="py-2.5 px-3 text-xs uppercase tracking-wider font-medium flex items-center text-gray-700 hover:text-black transition-colors">
//                         {category}
//                         <ChevronDown className="h-3 w-3 ml-1" />
//                       </button>
//                     ) : (
//                       // Category without subcategories
//                       <Link 
//                         href={`/product/category/${formatCategoryUrl(category)}`}
//                         className="py-2.5 px-3 text-xs uppercase tracking-wider font-medium text-gray-700 hover:text-black transition-colors block"
//                       >
//                         {category}
//                       </Link>
//                     )}
                    
//                     {/* Dropdown menu for categories with subcategories */}
//                     {CATEGORIES[category].length > 0 && (
//                       <div className="absolute left-0 mt-0 bg-white border border-gray-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40 min-w-[180px]">
//                         <ul className="py-2">
//                           {CATEGORIES[category].map((subcategory) => (
//                             <li key={subcategory}>
//                               <Link 
//                                 href={`/product/category/${formatCategoryUrl(subcategory)}`}
//                                 className="block px-4 py-1.5 text-xs uppercase tracking-wider text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
//                               >
//                                 {subcategory}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             {/* Second row of categories */}
//             <div className="flex justify-between border-t border-gray-100">
//               <div className="flex">
//                 {secondRowCategories.map((category) => (
//                   <div key={category} className="relative group">
//                     {CATEGORIES[category].length > 0 ? (
//                       // Category with subcategories
//                       <button className="py-2.5 px-3 text-xs uppercase tracking-wider font-medium flex items-center text-gray-700 hover:text-black transition-colors">
//                         {category}
//                         <ChevronDown className="h-3 w-3 ml-1" />
//                       </button>
//                     ) : (
//                       // Category without subcategories
//                       <Link 
//                         href={`/product/category/${formatCategoryUrl(category)}`}
//                         className="py-2.5 px-3 text-xs uppercase tracking-wider font-medium text-gray-700 hover:text-black transition-colors block"
//                       >
//                         {category}
//                       </Link>
//                     )}
                    
//                     {/* Dropdown menu for categories with subcategories */}
//                     {CATEGORIES[category].length > 0 && (
//                       <div className="absolute left-0 mt-0 bg-white border border-gray-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40 min-w-[180px]">
//                         <ul className="py-2">
//                           {CATEGORIES[category].map((subcategory) => (
//                             <li key={subcategory}>
//                               <Link 
//                                 href={`/product/category/${formatCategoryUrl(subcategory)}`}
//                                 className="block px-4 py-1.5 text-xs uppercase tracking-wider text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
//                               >
//                                 {subcategory}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
              
//               {/* Special links - aligned right on the second row */}
//               <div className="flex">
//                 <Link 
//                   href="/product/category/best-sellers" 
//                   className="py-2.5 px-3 text-xs uppercase tracking-wider font-medium text-gray-700 hover:text-black transition-colors block"
//                 >
//                   Best Sellers
//                 </Link>
//                 <Link 
//                   href="/product/category/new-arrivals" 
//                   className="py-2.5 px-3 text-xs uppercase tracking-wider font-medium text-gray-700 hover:text-black transition-colors block"
//                 >
//                   New Arrivals
//                 </Link>
//                 <Link 
//                   href="/product/category/on-sale" 
//                   className="py-2.5 px-3 text-xs uppercase tracking-wider font-medium text-red-600 hover:text-red-700 transition-colors block"
//                 >
//                   On Sale
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>
      
//       {/* Mega Menu for tablet view (hidden on mobile and desktop) */}
//       {megaMenuOpen && (
//         <div className="hidden md:block lg:hidden border-t border-gray-100">
//           <div className="container mx-auto px-4 py-4">
//             <div className="grid grid-cols-3 gap-4">
//               {categoryKeys.map((category) => (
//                 <div key={category} className="mb-4">
//                   {CATEGORIES[category].length > 0 ? (
//                     <>
//                       <div className="font-medium text-xs uppercase tracking-wider mb-2">{category}</div>
//                       <ul className="space-y-1">
//                         {CATEGORIES[category].map((subcategory) => (
//                           <li key={subcategory}>
//                             <Link 
//                               href={`/product/category/${formatCategoryUrl(subcategory)}`}
//                               className="block text-xs text-gray-600 hover:text-black"
//                               onClick={() => setMegaMenuOpen(false)}
//                             >
//                               {subcategory}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     </>
//                   ) : (
//                     <Link 
//                       href={`/product/category/${formatCategoryUrl(category)}`}
//                       className="block font-medium text-xs uppercase tracking-wider hover:text-black"
//                       onClick={() => setMegaMenuOpen(false)}
//                     >
//                       {category}
//                     </Link>
//                   )}
//                 </div>
//               ))}
//             </div>
            
//             <div className="flex justify-center space-x-6 pt-4 mt-4 border-t border-gray-100">
//               <Link 
//                 href="/product/category/best-sellers" 
//                 className="text-xs uppercase tracking-wider font-medium text-gray-700 hover:text-black transition-colors"
//                 onClick={() => setMegaMenuOpen(false)}
//               >
//                 Best Sellers
//               </Link>
//               <Link 
//                 href="/product/category/new-arrivals" 
//                 className="text-xs uppercase tracking-wider font-medium text-gray-700 hover:text-black transition-colors"
//                 onClick={() => setMegaMenuOpen(false)}
//               >
//                 New Arrivals
//               </Link>
//               <Link 
//                 href="/product/category/on-sale" 
//                 className="text-xs uppercase tracking-wider font-medium text-red-600 hover:text-red-700 transition-colors"
//                 onClick={() => setMegaMenuOpen(false)}
//               >
//                 On Sale
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden border-t border-gray-100 bg-white">
//           <div className="divide-y divide-gray-100">
//             {/* Main categories */}
//             <div className="px-4 py-2">
//               {Object.keys(CATEGORIES).map((category) => (
//                 <div key={category} className="py-2">
//                   {CATEGORIES[category].length > 0 ? (
//                     // Category with subcategories
//                     <details className="group">
//                       <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
//                         <span className="text-sm uppercase tracking-wider">{category}</span>
//                         <span className="transition group-open:rotate-180">
//                           <ChevronDown className="h-4 w-4" />
//                         </span>
//                       </summary>
//                       <ul className="pl-4 mt-2 space-y-1 border-l border-gray-100">
//                         {CATEGORIES[category].map((subcategory) => (
//                           <li key={subcategory}>
//                             <Link 
//                               href={`/product/category/${formatCategoryUrl(subcategory)}`}
//                               className="block py-1 text-xs text-gray-600 hover:text-black"
//                               onClick={() => setMobileMenuOpen(false)}
//                             >
//                               {subcategory}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     </details>
//                   ) : (
//                     // Category without subcategories
//                     <Link 
//                       href={`/product/category/${formatCategoryUrl(category)}`}
//                       className="block text-sm uppercase tracking-wider font-medium hover:text-black"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       {category}
//                     </Link>
//                   )}
//                 </div>
//               ))}
//             </div>
            
//             {/* Special links */}
//             <div className="px-4 py-3">
//               <Link 
//                 href="/product/category/best-sellers" 
//                 className="block py-1.5 text-sm uppercase tracking-wider font-medium hover:text-black"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Best Sellers
//               </Link>
//               <Link 
//                 href="/product/category/new-arrivals" 
//                 className="block py-1.5 text-sm uppercase tracking-wider font-medium hover:text-black"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 New Arrivals
//               </Link>
//               <Link 
//                 href="/product/category/on-sale" 
//                 className="block py-1.5 text-sm uppercase tracking-wider font-medium text-red-600 hover:text-red-700"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 On Sale
//               </Link>
//             </div>
            
//             {/* Account links - only show if authenticated */}
//             {isAuthenticated && (
//               <div className="px-4 py-3">
//                 <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Account</p>
                
//                 {isWholesaleBuyer || isRetailBuyer ? (
//                   <>
//                     <Link 
//                       href="/user/profile" 
//                       className="block py-1.5 text-sm hover:text-black"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       Profile
//                     </Link>
//                     <Link 
//                       href="/user/purchase-requests" 
//                       className="block py-1.5 text-sm hover:text-black"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       Purchase Requests
//                     </Link>
//                   </>
//                 ) : (
//                   <>
//                     <Link 
//                       href="/admin/dashboard/all_products" 
//                       className="block py-1.5 text-sm hover:text-black"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       All Products
//                     </Link>
//                     <Link 
//                       href="/admin/dashboard/purchase-requests" 
//                       className="block py-1.5 text-sm hover:text-black"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       Purchase Requests
//                     </Link>
//                   </>
//                 )}
                
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setMobileMenuOpen(false);
//                   }}
//                   className="block py-1.5 text-sm text-red-600 hover:text-red-700"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
            
//             {/* Contact info */}
//             <div className="px-4 py-3">
//               <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Contact</p>
              
//               <a 
//                 href="tel:+15168822888" 
//                 className="block py-1.5 text-sm text-gray-600 hover:text-black"
//               >
//                 <Phone className="h-3 w-3 inline mr-2" />
//                 (+1) 516 882 2888
//               </a>
//               <a 
//                 href="mailto:amgwholesales01@gmail.com" 
//                 className="block py-1.5 text-sm text-gray-600 hover:text-black"
//               >
//                 <Mail className="h-3 w-3 inline mr-2" />
//                 amgwholesales01@gmail.com
//               </a>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Cart Drawer */}
//       {cartOpen && (
//         <div className="fixed inset-0 overflow-hidden z-50">
//           <div className="absolute inset-0 bg-black bg-opacity-20" onClick={toggleCart} />
          
//           <div className="absolute inset-y-0 right-0 max-w-full flex">
//             <div className="relative w-screen max-w-md">
//               <div className="h-full flex flex-col bg-white shadow-xl">
//                 {/* Cart Header */}
//                 <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
//                   <h2 className="text-sm uppercase tracking-wider font-medium">Shopping Cart</h2>
//                   <button
//                     onClick={toggleCart}
//                     className="text-gray-400 hover:text-gray-500 transition-colors"
//                   >
//                     <X size={20} />
//                   </button>
//                 </div>
                
//                 {/* Cart Content */}
//                 <Cart onClose={toggleCart} />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { ShoppingBag, Menu, X, User, Heart, ChevronDown, Phone, Mail } from "lucide-react";
// import { useAuth } from "@/context/authContext";
// import Cart from "@/components/cart/Cart";

// // Category structure - keeping the same structure as your original
// const CATEGORIES = {
//   "Cigar": ["Ashtray", "Cigar", "Cigar Accessories"],
//   "C-Store": [
//     "Adult Novelty", 
//     "Branded Apparels & Merchandise", 
//     "Detox + Syntheticshot", 
//     "General Merchandise", 
//     "Incense + Scents + Sprays", 
//     "Medicine + Energy", 
//     "Phone Accessories", 
//     "Phone Cards"
//   ],
//   "Flower / Wax / Oil": [
//     "510 Thread Batteries", 
//     "Dry + Wax Accessories", 
//     "Dry + Wax Vaporizers"
//   ],
//   "Glass": [
//     "Glass Accessories", 
//     "Glass Cleaner + Accessories", 
//     "Glass Pipes", 
//     "Hand Pipes"
//   ],
//   "Hookah": [
//     "Herbal Non Tobacco", 
//     "Hookah Accessories", 
//     "Hookah Bowls", 
//     "Hookah Burners", 
//     "Hookah Coals", 
//     "Hookah Hoses", 
//     "Hookah Tips", 
//     "Hookahs"
//   ],
//   "Kratom": [],
//   "7-Hydroxymitragynine": [],
//   "Roll Your Own": [
//     "Grinders", 
//     "Jars/Sealed Bags", 
//     "Raw Accessories", 
//     "Rolling Paper + Filters", 
//     "Scales", 
//     "Smoke Accessories", 
//     "Trays"
//   ],
//   "Torch It": [
//     "Butane + Lighter Fluid", 
//     "Big Torches", 
//     "Lighters", 
//     "Mini Torches", 
//     "Zippo Lighters"
//   ],
//   "Whip Cream": [
//     "Whip Cream Chargers", 
//     "Whip Cream Dispensers"
//   ]
// };

// export default function Navbar() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { isAuthenticated, userEmail, userType, userId, logout, isWholesaleBuyer, isRetailBuyer } = useAuth();
  
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [cartOpen, setCartOpen] = useState(false);
//   const [cartItemCount, setCartItemCount] = useState(0);
//   const [cartTotal, setCartTotal] = useState(0.00);
//   const [megaMenuOpen, setMegaMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);
  
//   // Handle scroll effects
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
//   // Fetch cart item count when component mounts or auth state changes
//   useEffect(() => {
//     if (isAuthenticated && userId) {
//       fetchCartCount();
//     } else {
//       setCartItemCount(0);
//       setCartTotal(0.00);
//     }
//   }, [isAuthenticated, userId]);
  
//   const fetchCartCount = async () => {
//     try {
//       const response = await fetch(`/api/cart?userId=${userId}`);
      
//       if (response.ok) {
//         const data = await response.json();
//         setCartItemCount(data.itemCount || 0);
//         setCartTotal(data.total || 0.00);
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
  
//   const toggleMegaMenu = () => {
//     setMegaMenuOpen(!megaMenuOpen);
//   };
  
//   const formatCategoryUrl = (category) => {
//     return category.toLowerCase().replace(/\s+/g, '-').replace(/[\/\+]/g, '-');
//   };
  
//   const handleLogout = () => {
//     logout();
//     router.push("/");
//   };

//   const handleDropdownHover = (category) => {
//     setActiveDropdown(category);
//   };

//   const handleDropdownLeave = () => {
//     setActiveDropdown(null);
//   };
  
//   // Get buyer type display text
//   const getBuyerTypeDisplay = () => {
//     if (isWholesaleBuyer) return "Wholesale Buyer";
//     if (isRetailBuyer) return "Retail Buyer";
//     return userType;
//   };
  
//   return (
//     <header className={`w-full z-40 transition-all duration-300 ${isScrolled ? 'fixed top-0 shadow-sm' : 'relative'} bg-white`}>
//       {/* Top utility bar with contact and account info */}
//       <div className="border-b border-gray-100">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center h-8">
//             {/* Contact info */}
//             <div className="flex items-center space-x-4 text-xs text-gray-500">
//               <a href="tel:+15168822888" className="hover:text-black transition-colors">
//                 <Phone className="h-3 w-3 inline mr-1" />
//                 (+1) 516 882 2888
//               </a>
//               <a href="mailto:amgwholesales01@gmail.com" className="hover:text-black transition-colors hidden md:inline-flex items-center">
//                 <Mail className="h-3 w-3 mr-1" />
//                 amgwholesales01@gmail.com
//               </a>
//             </div>
            
//             {/* Auth links */}
//             <div className="flex items-center space-x-4 text-xs">
//               {isAuthenticated ? (
//                 <div className="relative group">
//                   <button className="hover:text-black transition-colors">
//                     <span className="hidden md:inline">{userEmail}</span>
//                     <span className="md:hidden">Account</span>
//                     <ChevronDown className="h-3 w-3 inline-block ml-1" />
//                   </button>
                  
//                   <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                     <div className="py-2 px-3 border-b border-gray-100 text-xs text-gray-500">
//                       <p className="font-medium">{getBuyerTypeDisplay()}</p>
//                     </div>
                    
//                     <div className="py-1">
//                       {isWholesaleBuyer || isRetailBuyer ? (
//                         <>
//                           <Link 
//                             href="/user/profile" 
//                             className="block px-4 py-2 text-sm hover:bg-gray-50"
//                           >
//                             Profile
//                           </Link>
//                           <Link 
//                             href="/user/purchase-requests" 
//                             className="block px-4 py-2 text-sm hover:bg-gray-50"
//                           >
//                             Purchase Requests
//                           </Link>
//                         </>
//                       ) : (
//                         <>
//                           <Link 
//                             href="/admin/dashboard/all_products" 
//                             className="block px-4 py-2 text-sm hover:bg-gray-50"
//                           >
//                             All Products
//                           </Link>
//                           <Link 
//                             href="/admin/dashboard/purchase-requests" 
//                             className="block px-4 py-2 text-sm hover:bg-gray-50"
//                           >
//                             Purchase Requests
//                           </Link>
//                         </>
//                       )}
                      
//                       <button
//                         onClick={handleLogout}
//                         className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <Link href="/auth/user/login" className="hover:text-black transition-colors">
//                   Login / Register
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Main header with logo and actions */}
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-14">
//           {/* Logo */}
//           <Link href="/" className="flex items-center space-x-2">
//             <img 
//               src="/logo/logo.jpg" 
//               alt="AMG Wholesale" 
//               className="h-8 w-auto"
//             />
//             <span className="text-lg font-medium">AMG WHOLESALE</span>
//           </Link>
          
//           {/* Header actions */}
//           <div className="flex items-center space-x-6">
//             <Link 
//               href={isAuthenticated ? "/account/wishlist" : "/auth/user/login"} 
//               className="hidden md:block text-gray-700 hover:text-black transition-colors"
//             >
//               <Heart size={18} />
//             </Link>
            
//             <button 
//               onClick={toggleCart}
//               className="text-gray-700 hover:text-black transition-colors relative"
//             >
//               <ShoppingBag size={18} />
//               {cartItemCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
//                   {cartItemCount}
//                 </span>
//               )}
//             </button>
            
//             {/* Mobile menu toggle */}
//             <button
//               className="md:hidden text-gray-700 hover:text-black transition-colors"
//               onClick={toggleMobileMenu}
//             >
//               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
            
//             {/* Categories toggle for tablet */}
//             <button
//               className="hidden md:block lg:hidden text-xs uppercase tracking-wider border border-gray-200 px-3 py-1.5 hover:border-black transition-colors"
//               onClick={toggleMegaMenu}
//             >
//               Categories <ChevronDown className="h-3 w-3 inline-block ml-1" />
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {/* Desktop Navigation - All categories in a single row */}
//       <nav className="hidden lg:block border-t border-gray-100">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center">
//             {/* All categories in a single row */}
//             <div className="flex flex-nowrap overflow-x-auto hide-scrollbar">
//               {Object.keys(CATEGORIES).map((category) => (
//                 <div 
//                   key={category} 
//                   className="relative group"
//                   onMouseEnter={() => handleDropdownHover(category)}
//                   onMouseLeave={handleDropdownLeave}
//                 >
//                   {CATEGORIES[category].length > 0 ? (
//                     // Category with subcategories
//                     <button className="py-2.5 px-3 text-xs uppercase tracking-wider font-medium flex items-center text-gray-700 hover:text-black transition-colors whitespace-nowrap">
//                       {category}
//                       <ChevronDown className="h-3 w-3 ml-1" />
//                     </button>
//                   ) : (
//                     // Category without subcategories
//                     <Link 
//                       href={`/product/category/${formatCategoryUrl(category)}`}
//                       className="py-2.5 px-3 text-xs uppercase tracking-wider font-medium text-gray-700 hover:text-black transition-colors block whitespace-nowrap"
//                     >
//                       {category}
//                     </Link>
//                   )}
                  
//                   {/* Dropdown menu for categories with subcategories */}
//                   {CATEGORIES[category].length > 0 && (
//                     <div 
//                       className={`absolute left-0 mt-0 bg-white border border-gray-100 shadow-lg transition-all duration-200 z-40 min-w-[180px] ${
//                         activeDropdown === category ? 'opacity-100 visible' : 'opacity-0 invisible'
//                       }`}
//                     >
//                       <ul className="py-2">
//                         {CATEGORIES[category].map((subcategory) => (
//                           <li key={subcategory}>
//                             <Link 
//                               href={`/product/category/${formatCategoryUrl(subcategory)}`}
//                               className="block px-4 py-1.5 text-xs uppercase tracking-wider text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
//                             >
//                               {subcategory}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </nav>
      
//       {/* Secondary navigation - Special links in a separate row */}
//       <div className="hidden lg:block border-t border-b border-gray-100">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-center">
//             <Link 
//               href="/product/category/best-sellers" 
//               className="py-2 px-6 text-xs uppercase tracking-wider font-medium text-gray-700 hover:text-black transition-colors"
//             >
//               Best Sellers
//             </Link>
//             <Link 
//               href="/product/category/new-arrivals" 
//               className="py-2 px-6 text-xs uppercase tracking-wider font-medium text-gray-700 hover:text-black transition-colors"
//             >
//               New Arrivals
//             </Link>
//             <Link 
//               href="/product/category/on-sale" 
//               className="py-2 px-6 text-xs uppercase tracking-wider font-medium text-red-600 hover:text-red-700 transition-colors"
//             >
//               On Sale
//             </Link>
//           </div>
//         </div>
//       </div>
      
//       {/* Mega Menu for tablet view */}
//       {megaMenuOpen && (
//         <div className="hidden md:block lg:hidden border-t border-gray-100">
//           <div className="container mx-auto px-4 py-4">
//             <div className="grid grid-cols-3 gap-4">
//               {Object.keys(CATEGORIES).map((category) => (
//                 <div key={category} className="mb-4">
//                   {CATEGORIES[category].length > 0 ? (
//                     <>
//                       <div className="font-medium text-xs uppercase tracking-wider mb-2">{category}</div>
//                       <ul className="space-y-1">
//                         {CATEGORIES[category].map((subcategory) => (
//                           <li key={subcategory}>
//                             <Link 
//                               href={`/product/category/${formatCategoryUrl(subcategory)}`}
//                               className="block text-xs text-gray-600 hover:text-black"
//                               onClick={() => setMegaMenuOpen(false)}
//                             >
//                               {subcategory}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     </>
//                   ) : (
//                     <Link 
//                       href={`/product/category/${formatCategoryUrl(category)}`}
//                       className="block font-medium text-xs uppercase tracking-wider hover:text-black"
//                       onClick={() => setMegaMenuOpen(false)}
//                     >
//                       {category}
//                     </Link>
//                   )}
//                 </div>
//               ))}
//             </div>
            
//             <div className="flex justify-center space-x-6 pt-4 mt-4 border-t border-gray-100">
//               <Link 
//                 href="/product/category/best-sellers" 
//                 className="text-xs uppercase tracking-wider font-medium text-gray-700 hover:text-black transition-colors"
//                 onClick={() => setMegaMenuOpen(false)}
//               >
//                 Best Sellers
//               </Link>
//               <Link 
//                 href="/product/category/new-arrivals" 
//                 className="text-xs uppercase tracking-wider font-medium text-gray-700 hover:text-black transition-colors"
//                 onClick={() => setMegaMenuOpen(false)}
//               >
//                 New Arrivals
//               </Link>
//               <Link 
//                 href="/product/category/on-sale" 
//                 className="text-xs uppercase tracking-wider font-medium text-red-600 hover:text-red-700 transition-colors"
//                 onClick={() => setMegaMenuOpen(false)}
//               >
//                 On Sale
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden border-t border-gray-100 bg-white">
//           <div className="divide-y divide-gray-100">
//             {/* Main categories */}
//             <div className="px-4 py-2">
//               {Object.keys(CATEGORIES).map((category) => (
//                 <div key={category} className="py-2">
//                   {CATEGORIES[category].length > 0 ? (
//                     // Category with subcategories
//                     <details className="group">
//                       <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
//                         <span className="text-sm uppercase tracking-wider">{category}</span>
//                         <span className="transition group-open:rotate-180">
//                           <ChevronDown className="h-4 w-4" />
//                         </span>
//                       </summary>
//                       <ul className="pl-4 mt-2 space-y-1 border-l border-gray-100">
//                         {CATEGORIES[category].map((subcategory) => (
//                           <li key={subcategory}>
//                             <Link 
//                               href={`/product/category/${formatCategoryUrl(subcategory)}`}
//                               className="block py-1 text-xs text-gray-600 hover:text-black"
//                               onClick={() => setMobileMenuOpen(false)}
//                             >
//                               {subcategory}
//                             </Link>
//                           </li>
//                         ))}
//                       </ul>
//                     </details>
//                   ) : (
//                     // Category without subcategories
//                     <Link 
//                       href={`/product/category/${formatCategoryUrl(category)}`}
//                       className="block text-sm uppercase tracking-wider font-medium hover:text-black"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       {category}
//                     </Link>
//                   )}
//                 </div>
//               ))}
//             </div>
            
//             {/* Special links */}
//             <div className="px-4 py-3">
//               <Link 
//                 href="/product/category/best-sellers" 
//                 className="block py-1.5 text-sm uppercase tracking-wider font-medium hover:text-black"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Best Sellers
//               </Link>
//               <Link 
//                 href="/product/category/new-arrivals" 
//                 className="block py-1.5 text-sm uppercase tracking-wider font-medium hover:text-black"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 New Arrivals
//               </Link>
//               <Link 
//                 href="/product/category/on-sale" 
//                 className="block py-1.5 text-sm uppercase tracking-wider font-medium text-red-600 hover:text-red-700"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 On Sale
//               </Link>
//             </div>
            
//             {/* Account links - only show if authenticated */}
//             {isAuthenticated && (
//               <div className="px-4 py-3">
//                 <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Account</p>
                
//                 {isWholesaleBuyer || isRetailBuyer ? (
//                   <>
//                     <Link 
//                       href="/user/profile" 
//                       className="block py-1.5 text-sm hover:text-black"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       Profile
//                     </Link>
//                     <Link 
//                       href="/user/purchase-requests" 
//                       className="block py-1.5 text-sm hover:text-black"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       Purchase Requests
//                     </Link>
//                   </>
//                 ) : (
//                   <>
//                     <Link 
//                       href="/admin/dashboard/all_products" 
//                       className="block py-1.5 text-sm hover:text-black"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       All Products
//                     </Link>
//                     <Link 
//                       href="/admin/dashboard/purchase-requests" 
//                       className="block py-1.5 text-sm hover:text-black"
//                       onClick={() => setMobileMenuOpen(false)}
//                     >
//                       Purchase Requests
//                     </Link>
//                   </>
//                 )}
                
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setMobileMenuOpen(false);
//                   }}
//                   className="block py-1.5 text-sm text-red-600 hover:text-red-700"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
            
//             {/* Contact info */}
//             <div className="px-4 py-3">
//               <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Contact</p>
              
//               <a 
//                 href="tel:+15168822888" 
//                 className="block py-1.5 text-sm text-gray-600 hover:text-black"
//               >
//                 <Phone className="h-3 w-3 inline mr-2" />
//                 (+1) 516 882 2888
//               </a>
//               <a 
//                 href="mailto:amgwholesales01@gmail.com" 
//                 className="block py-1.5 text-sm text-gray-600 hover:text-black"
//               >
//                 <Mail className="h-3 w-3 inline mr-2" />
//                 amgwholesales01@gmail.com
//               </a>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Cart Drawer */}
//       {cartOpen && (
//         <div className="fixed inset-0 overflow-hidden z-50">
//           <div className="absolute inset-0 bg-black bg-opacity-20" onClick={toggleCart} />
          
//           <div className="absolute inset-y-0 right-0 max-w-full flex">
//             <div className="relative w-screen max-w-md">
//               <div className="h-full flex flex-col bg-white shadow-xl">
//                 {/* Cart Header */}
//                 <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
//                   <h2 className="text-sm uppercase tracking-wider font-medium">Shopping Cart</h2>
//                   <button
//                     onClick={toggleCart}
//                     className="text-gray-400 hover:text-gray-500 transition-colors"
//                   >
//                     <X size={20} />
//                   </button>
//                 </div>
                
//                 {/* Cart Content */}
//                 <Cart onClose={toggleCart} />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* Custom CSS for hiding scrollbar but allowing scroll */}
//       <style jsx global>{`
//         .hide-scrollbar {
//           -ms-overflow-style: none;  /* IE and Edge */
//           scrollbar-width: none;  /* Firefox */
//         }
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;  /* Chrome, Safari and Opera */
//         }
//       `}</style>
//     </header>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, Menu, X, User, Heart, ChevronDown, Phone, Mail,ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/authContext";
import Cart from "@/components/cart/Cart";

// Category structure - keeping the same structure as your original
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
  const { isAuthenticated, userEmail, userType, userId, logout, isWholesaleBuyer, isRetailBuyer } = useAuth();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0.00);
  const [openCategory, setOpenCategory] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openCategory && !event.target.closest('.category-dropdown')) {
        setOpenCategory(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openCategory]);
  
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
  
  const toggleCategoryDropdown = (category) => {
    if (openCategory === category) {
      setOpenCategory(null);
    } else {
      setOpenCategory(category);
    }
  };
  
  const formatCategoryUrl = (category) => {
    return category.toLowerCase().replace(/\s+/g, '-').replace(/[\/\+]/g, '-');
  };
  
  const handleLogout = () => {
    logout();
    router.push("/");
  };
  
  // Get buyer type display text
  const getBuyerTypeDisplay = () => {
    if (isWholesaleBuyer) return "Wholesale Buyer";
    if (isRetailBuyer) return "Retail Buyer";
    return userType;
  };
  
  return (
    <header className={`w-full z-40 transition-all duration-300 ${isScrolled ? 'fixed top-0 shadow-sm' : 'relative'} bg-white`}>
      {/* Top utility bar with contact and account info */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-8">
            {/* Contact info */}
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <a href="tel:+15168822888" className="hover:text-black transition-colors">
                <Phone className="h-3 w-3 inline mr-1" />
                (+1) 516 882 2888
              </a>
              <a href="mailto:amgwholesales01@gmail.com" className="hover:text-black transition-colors hidden md:inline-flex items-center">
                <Mail className="h-3 w-3 mr-1" />
                amgwholesales01@gmail.com
              </a>
            </div>
            
            {/* Auth links */}
            <div className="flex items-center space-x-4 text-xs">
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="hover:text-black transition-colors">
                    <span className="hidden md:inline">{userEmail}</span>
                    <span className="md:hidden">Account</span>
                    <ChevronDown className="h-3 w-3 inline-block ml-1" />
                  </button>
                  
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2 px-3 border-b border-gray-100 text-xs text-gray-500">
                      <p className="font-medium">{getBuyerTypeDisplay()}</p>
                    </div>
                    
                    <div className="py-1">
                      {isWholesaleBuyer || isRetailBuyer ? (
                        <>
                          <Link 
                            href="/user/profile" 
                            className="block px-4 py-2 text-sm hover:bg-gray-50"
                          >
                            Profile
                          </Link>
                          <Link 
                            href="/user/purchase-requests" 
                            className="block px-4 py-2 text-sm hover:bg-gray-50"
                          >
                            Purchase Requests
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link 
                            href="/admin/dashboard/all_products" 
                            className="block px-4 py-2 text-sm hover:bg-gray-50"
                          >
                            All Products
                          </Link>
                          <Link 
                            href="/admin/dashboard/purchase-requests" 
                            className="block px-4 py-2 text-sm hover:bg-gray-50"
                          >
                            Purchase Requests
                          </Link>
                        </>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/auth/user/login" className="hover:text-black transition-colors">
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main header with logo and actions */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img 
              src="/logo/logo.jpg" 
              alt="AMG Wholesale" 
              className="h-8 w-auto"
            />
            <span className="text-lg font-medium">AMG WHOLESALE</span>
          </Link>
          
          {/* Header actions */}
          <div className="flex items-center space-x-6">
            <Link 
              href={isAuthenticated ? "/account/wishlist" : "/auth/user/login"} 
              className="hidden md:block text-gray-700 hover:text-black transition-colors"
            >
              <Heart size={18} />
            </Link>
            
            <button 
              onClick={toggleCart}
              className="text-gray-700 hover:text-black transition-colors relative"
            >
              <ShoppingBag size={18} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-gray-700 hover:text-black transition-colors"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Desktop Navigation - Categories in a single row */}
      <nav className="hidden md:block border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex justify-between w-full">
              {Object.keys(CATEGORIES).map((category) => (
                <div key={category} className="category-dropdown relative">
                  {CATEGORIES[category].length > 0 ? (
                    // Category with subcategories
                    <button 
                      onClick={() => toggleCategoryDropdown(category)}
                      className={`py-2.5 px-2 text-xs uppercase tracking-wider font-medium flex items-center text-gray-700 hover:text-black transition-colors ${
                        openCategory === category ? 'text-black' : ''
                      }`}
                    >
                      {category}
                      <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${
                        openCategory === category ? 'rotate-180' : ''
                      }`} />
                    </button>
                  ) : (
                    // Category without subcategories
                    <Link 
                      href={`/product/category/${formatCategoryUrl(category)}`}
                      className="py-2.5 px-2 text-xs uppercase tracking-wider font-medium text-gray-700 hover:text-black transition-colors block"
                    >
                      {category}
                    </Link>
                  )}
                  
                  {/* Dropdown menu for categories with subcategories */}
                  {CATEGORIES[category].length > 0 && (
                    <div 
                      className={`absolute left-0 mt-0 bg-white border border-gray-100 shadow-lg transition-all duration-200 z-40 min-w-[180px] ${
                        openCategory === category ? 'block' : 'hidden'
                      }`}
                    >
                      <ul className="py-2">
                        {CATEGORIES[category].map((subcategory) => (
                          <li key={subcategory}>
                            <Link 
                              href={`/product/category/${formatCategoryUrl(subcategory)}`}
                              className="block px-4 py-1.5 text-xs uppercase tracking-wider text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
                              onClick={() => setOpenCategory(null)}
                            >
                              {subcategory}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Secondary navigation - Special links in a separate row */}
      <div className="hidden md:block border-t border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <Link 
              href="/product/category/best-sellers" 
              className="py-2 px-6 text-xs uppercase tracking-wider font-medium text-gray-700 hover:text-black transition-colors"
            >
              Best Sellers
            </Link>
            <Link 
              href="/product/category/new-arrivals" 
              className="py-2 px-6 text-xs uppercase tracking-wider font-medium text-gray-700 hover:text-black transition-colors"
            >
              New Arrivals
            </Link>
            <Link 
              href="/product/category/on-sale" 
              className="py-2 px-6 text-xs uppercase tracking-wider font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              On Sale
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="divide-y divide-gray-100">
            {/* Main categories */}
            <div className="px-4 py-2">
              {Object.keys(CATEGORIES).map((category) => (
                <div key={category} className="py-2">
                  {CATEGORIES[category].length > 0 ? (
                    // Category with subcategories
                    <details className="group">
                      <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span className="text-sm uppercase tracking-wider">{category}</span>
                        <span className="transition group-open:rotate-180">
                          <ChevronDown className="h-4 w-4" />
                        </span>
                      </summary>
                      <ul className="pl-4 mt-2 space-y-1 border-l border-gray-100">
                        {CATEGORIES[category].map((subcategory) => (
                          <li key={subcategory}>
                            <Link 
                              href={`/product/category/${formatCategoryUrl(subcategory)}`}
                              className="block py-1 text-xs text-gray-600 hover:text-black"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subcategory}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    // Category without subcategories
                    <Link 
                      href={`/product/category/${formatCategoryUrl(category)}`}
                      className="block text-sm uppercase tracking-wider font-medium hover:text-black"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            
            {/* Special links */}
            <div className="px-4 py-3">
              <Link 
                href="/product/category/best-sellers" 
                className="block py-1.5 text-sm uppercase tracking-wider font-medium hover:text-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                Best Sellers
              </Link>
              <Link 
                href="/product/category/new-arrivals" 
                className="block py-1.5 text-sm uppercase tracking-wider font-medium hover:text-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                New Arrivals
              </Link>
              <Link 
                href="/product/category/on-sale" 
                className="block py-1.5 text-sm uppercase tracking-wider font-medium text-red-600 hover:text-red-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                On Sale
              </Link>
            </div>
            
            {/* Account links - only show if authenticated */}
            {isAuthenticated && (
              <div className="px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Account</p>
                
                {isWholesaleBuyer || isRetailBuyer ? (
                  <>
                    <Link 
                      href="/user/profile" 
                      className="block py-1.5 text-sm hover:text-black"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link 
                      href="/user/purchase-requests" 
                      className="block py-1.5 text-sm hover:text-black"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Purchase Requests
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/admin/dashboard/all_products" 
                      className="block py-1.5 text-sm hover:text-black"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      All Products
                    </Link>
                    <Link 
                      href="/admin/dashboard/purchase-requests" 
                      className="block py-1.5 text-sm hover:text-black"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Purchase Requests
                    </Link>
                  </>
                )}
                
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block py-1.5 text-sm text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </div>
            )}
            
            {/* Contact info */}
            <div className="px-4 py-3">
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Contact</p>
              
              <a 
                href="tel:+15168822888" 
                className="block py-1.5 text-sm text-gray-600 hover:text-black"
              >
                <Phone className="h-3 w-3 inline mr-2" />
                (+1) 516 882 2888
              </a>
              <a 
                href="mailto:amgwholesales01@gmail.com" 
                className="block py-1.5 text-sm text-gray-600 hover:text-black"
              >
                <Mail className="h-3 w-3 inline mr-2" />
                amgwholesales01@gmail.com
              </a>
            </div>
          </div>
        </div>
      )}
      
      {/* Cart Drawer */}
     {/* Cart Drawer */}
     {cartOpen && (
  <div className="fixed inset-0 overflow-hidden z-50">
   
    {/* Cart panel */}
    <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl flex flex-col">
      {/* Cart Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
          <p className="text-sm text-gray-500">
            {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <button 
          onClick={toggleCart} 
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
      
      {/* Cart Content */}
      <Cart onClose={toggleCart} />
    </div>
  </div>
)}
   
    </header>
  );
}