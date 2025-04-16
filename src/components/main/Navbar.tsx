
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { ShoppingBag, Menu, X, User, Heart, ChevronDown, Phone, Mail,ArrowLeft } from "lucide-react";
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
//   const [openCategory, setOpenCategory] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);
  
//   // Handle scroll effects
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (openCategory && !event.target.closest('.category-dropdown')) {
//         setOpenCategory(null);
//       }
//     };
    
//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, [openCategory]);
  
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
  
//   const toggleCategoryDropdown = (category) => {
//     if (openCategory === category) {
//       setOpenCategory(null);
//     } else {
//       setOpenCategory(category);
//     }
//   };
  
//   // const formatCategoryUrl = (category) => {
//   //   return category.toLowerCase().replace(/\s+/g, '-').replace(/[\/\+]/g, '-');
//   // };
  
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
//   // Add this updated function to your Navbar.js file
// const formatCategoryUrl = (category) => {
//   // First convert to lowercase and replace spaces with hyphens
//   let formattedUrl = category.toLowerCase().replace(/\s+/g, '-');
  
//   // Replace + with the encoded version 'plus' so we can convert back later
//   formattedUrl = formattedUrl.replace(/\+/g, '-plus-');
  
//   // Replace other special characters with hyphens
//   formattedUrl = formattedUrl.replace(/\//g, '-slash-');
  
//   return formattedUrl;
// };
  
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
//           </div>
//         </div>
//       </div>
      
//       {/* Desktop Navigation - Categories in a single row */}
//       <nav className="hidden md:block border-t border-gray-100">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center">
//             <div className="flex justify-between w-full">
//               {Object.keys(CATEGORIES).map((category) => (
//                 <div key={category} className="category-dropdown relative">
//                   {CATEGORIES[category].length > 0 ? (
//                     // Category with subcategories
//                     <button 
//                       onClick={() => toggleCategoryDropdown(category)}
//                       className={`py-2.5 px-2 text-xs uppercase tracking-wider font-medium flex items-center text-gray-700 hover:text-black transition-colors ${
//                         openCategory === category ? 'text-black' : ''
//                       }`}
//                     >
//                       {category}
//                       <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${
//                         openCategory === category ? 'rotate-180' : ''
//                       }`} />
//                     </button>
//                   ) : (
//                     // Category without subcategories
//                     <Link 
//                       href={`/product/category/${formatCategoryUrl(category)}`}
//                       className="py-2.5 px-2 text-xs uppercase tracking-wider font-medium text-gray-700 hover:text-black transition-colors block"
//                     >
//                       {category}
//                     </Link>
//                   )}
                  
//                   {/* Dropdown menu for categories with subcategories */}
//                   {CATEGORIES[category].length > 0 && (
//                     <div 
//                       className={`absolute left-0 mt-0 bg-white border border-gray-100 shadow-lg transition-all duration-200 z-40 min-w-[180px] ${
//                         openCategory === category ? 'block' : 'hidden'
//                       }`}
//                     >
//                       <ul className="py-2">
//                         {CATEGORIES[category].map((subcategory) => (
//                           <li key={subcategory}>
//                             <Link 
//                               href={`/product/category/${formatCategoryUrl(subcategory)}`}
//                               className="block px-4 py-1.5 text-xs uppercase tracking-wider text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
//                               onClick={() => setOpenCategory(null)}
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
//       <div className="hidden md:block border-t border-b border-gray-100">
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
//      {/* Cart Drawer */}
//      {cartOpen && (
//   <div className="fixed inset-0 overflow-hidden z-50">
   
//     {/* Cart panel */}
//     <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl flex flex-col">
//       {/* Cart Header */}
//       <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//         <div>
//           <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
//           <p className="text-sm text-gray-500">
//             {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} in your cart
//           </p>
//         </div>
//         <button 
//           onClick={toggleCart} 
//           className="text-gray-500 hover:text-gray-700"
//         >
//           ×
//         </button>
//       </div>
      
//       {/* Cart Content */}
//       <Cart onClose={toggleCart} />
//     </div>
//   </div>
// )}
   
//     </header>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, Menu, X, User, Heart, ChevronDown, Phone, Mail, ArrowLeft } from "lucide-react";
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
  
  // UPDATED: Simple URL formatting function that replaces all special characters with hyphens
  const formatCategoryUrl = (category) => {
    // Simply replace all spaces and special characters with hyphens
    return category.toLowerCase().replace(/[\s+\/&]+/g, '-');
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