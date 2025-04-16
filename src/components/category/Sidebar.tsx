
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { 
//   ChevronDown, 
//   ChevronUp, 
//   X, 
//   Star, 
//   ChevronLeft,
//   Tag,
//   Flame,
//   ShoppingBag,
//   Sparkles,
//   Zap,
//   PanelLeft,
//   Filter,
//   BadgePercent
// } from "lucide-react";

// const CATEGORIES = [
//   "ASHTRAY",
//   "CIGAR HOT",
//   "CIGAR BY BRAND NEW",
//   "CIGAR ACCESSORIES",
//   "ADULT NOVELTYHOT",
//   "BRANDED APPARELS & MERCHANDISE",
//   "DETOX + SYNTHETICSHOT",
//   "GENERAL MERCHANDISE",
//   "INCENSE + SCENTS + SPRAYS",
//   "MEDICINE + ENERGY",
//   "PHONE ACCESSORIES",
//   "PHONE CARDS",
//   "510 THREAD BATTERIES",
//   "DRY + WAX ACCESSORIES",
//   "DRY + WAX VAPORIZERS",
//   "GLASS ACCESSORIES",
//   "GLASS CLEANER + ACCESSORIES",
//   "GLASS PIPES",
//   "HAND PIPES",
//   "HERBAL NON TOBACCO",
//   "HOOKAH ACCESSORIES",
//   "HOOKAH BOWLS",
//   "HOOKAH BURNERS",
//   "HOOKAH COALS",
//   "HOOKAH HOSES",
//   "HOOKAH TIPS",
//   "HOOKAHS",
//   "KRATOM",
//   "GRINDERS",
//   "JARS/SEALED BAGS",
//   "RAW ACCESSORIES",
//   "ROLLING PAPER + FILTERSH",
//   "SCALES",
//   "SMOKE ACCESSORIES",
//   "TRAYS",
//   "BUTANE + LIGHTER FLUID",
//   "BIG TORCHES",
//   "LIGHTERS",
//   "MINI TORCHES",
//   "ZIPPO LIGHTERS",
//   "WHIP CREAM CHARGERS",
//   "WHIP CREAM DISPENSERS"
// ];

// // Group categories into sections for better organization
// const CATEGORY_GROUPS = [
//   {
//     title: "Popular Categories",
//     icon: <Flame size={18} className="text-amber-500" />,
//     items: ["CIGAR HOT", "GLASS PIPES", "HOOKAHS", "KRATOM", "LIGHTERS"]
//   },
//   {
//     title: "Smoking Accessories",
//     icon: <ShoppingBag size={18} className="text-indigo-500" />,
//     items: [
//       "ASHTRAY", 
//       "CIGAR ACCESSORIES", 
//       "GLASS ACCESSORIES", 
//       "GLASS CLEANER + ACCESSORIES",
//       "GLASS PIPES",
//       "HAND PIPES",
//       "HOOKAHS",
//       "HOOKAH ACCESSORIES",
//       "HOOKAH BOWLS",
//       "HOOKAH BURNERS",
//       "HOOKAH COALS",
//       "HOOKAH HOSES",
//       "HOOKAH TIPS",
//       "GRINDERS",
//       "RAW ACCESSORIES",
//       "ROLLING PAPER + FILTERSH",
//       "SMOKE ACCESSORIES",
//       "TRAYS"
//     ]
//   },
//   {
//     title: "Electronic & Vaporizers",
//     icon: <Zap size={18} className="text-blue-500" />,
//     items: [
//       "510 THREAD BATTERIES",
//       "DRY + WAX ACCESSORIES",
//       "DRY + WAX VAPORIZERS",
//       "PHONE ACCESSORIES"
//     ]
//   },
//   {
//     title: "Lighters & Torch",
//     icon: <Sparkles size={18} className="text-orange-500" />,
//     items: [
//       "BUTANE + LIGHTER FLUID",
//       "BIG TORCHES",
//       "LIGHTERS",
//       "MINI TORCHES",
//       "ZIPPO LIGHTERS"
//     ]
//   },
//   {
//     title: "Other Products",
//     icon: <Tag size={18} className="text-green-500" />,
//     items: [
//       "ADULT NOVELTYHOT",
//       "BRANDED APPARELS & MERCHANDISE",
//       "DETOX + SYNTHETICSHOT",
//       "GENERAL MERCHANDISE",
//       "INCENSE + SCENTS + SPRAYS",
//       "MEDICINE + ENERGY",
//       "PHONE CARDS",
//       "HERBAL NON TOBACCO",
//       "JARS/SEALED BAGS",
//       "SCALES",
//       "WHIP CREAM CHARGERS",
//       "WHIP CREAM DISPENSERS"
//     ]
//   }
// ];

// export default function Sidebar({ 
//   currentCategory, 
//   onCategoryChange, 
//   priceRange, 
//   onPriceChange,
//   onClose,
//   isMobile = false
// }) {
//   const [localPriceRange, setLocalPriceRange] = useState(priceRange);
//   const [expandedSections, setExpandedSections] = useState({
//     price: true,
//     popular: true,
//     smoking: false,
//     electronic: false,
//     lighters: false,
//     other: false
//   });
  
//   // Sync local price range with props
//   useEffect(() => {
//     setLocalPriceRange(priceRange);
//   }, [priceRange]);
  
//   const handlePriceChange = (e, index) => {
//     const newRange = [...localPriceRange];
//     newRange[index] = parseInt(e.target.value);
//     setLocalPriceRange(newRange);
//   };
  
//   const applyPriceFilter = () => {
//     onPriceChange(localPriceRange);
//   };
  
//   const formatCategoryUrl = (category) => {
//     return category.toLowerCase().replace(/\s+/g, '-').replace(/[\/\+]/g, '-');
//   };
  
//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };
  
//   // Find which group the current category belongs to
//   const findCategoryGroup = () => {
//     for (const group of CATEGORY_GROUPS) {
//       if (group.items.some(item => formatCategoryUrl(item) === currentCategory.toLowerCase())) {
//         return group.title.toLowerCase().replace(/\s+/g, '-');
//       }
//     }
//     return 'other';
//   };
  
//   // Initialize expanded state based on current category
//   useEffect(() => {
//     const groupKey = findCategoryGroup();
//     let sectionKey = '';
    
//     if (groupKey.includes('popular')) sectionKey = 'popular';
//     else if (groupKey.includes('smoking')) sectionKey = 'smoking';
//     else if (groupKey.includes('electronic')) sectionKey = 'electronic';
//     else if (groupKey.includes('lighter')) sectionKey = 'lighters';
//     else sectionKey = 'other';
    
//     if (sectionKey) {
//       setExpandedSections(prev => ({
//         ...prev,
//         [sectionKey]: true
//       }));
//     }
//   }, [currentCategory]);
  
//   return (
//     <div className={`
//       bg-white rounded-xl shadow-sm border border-gray-200 
//       ${isMobile ? 'h-full' : 'h-full max-h-[calc(100vh-2rem)]'}
//       overflow-y-auto relative
//     `}>
//       <div className="p-5 h-full flex flex-col">
//         {/* Mobile close button */}
//         {isMobile && (
//           <div className="md:hidden flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
//             <h2 className="text-lg font-bold text-gray-900 flex items-center">
//               <Filter size={20} className="mr-2 text-indigo-600" />
//               Filters
//             </h2>
//             <button 
//               onClick={onClose}
//               className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
//             >
//               <X size={20} className="text-gray-500" />
//             </button>
//           </div>
//         )}
        
//         {/* Price Range Filter */}
//         <div className="mb-6 bg-gradient-to-r from-indigo-50 to-white rounded-xl p-5 border border-indigo-100 shadow-sm">
//           <div 
//             className="flex items-center justify-between cursor-pointer mb-4"
//             onClick={() => toggleSection('price')}
//           >
//             <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//               <BadgePercent size={20} className="text-indigo-600 mr-2" />
//               Price Range
//             </h3>
//             {expandedSections.price ? (
//               <ChevronUp size={18} className="text-indigo-500" />
//             ) : (
//               <ChevronDown size={18} className="text-indigo-500" />
//             )}
//           </div>
          
//           {expandedSections.price && (
//             <div className="space-y-4 animate-fadeIn">
//               <div className="flex justify-between text-sm font-medium">
//                 <span className="text-indigo-700">${localPriceRange[0]}</span>
//                 <span className="text-indigo-700">${localPriceRange[1]}</span>
//               </div>
              
//               <div className="relative h-1.5 bg-gray-200 rounded-full mt-2">
//                 <div 
//                   className="absolute h-full bg-indigo-600 rounded-full"
//                   style={{
//                     left: `${(localPriceRange[0] / 1000) * 100}%`,
//                     right: `${100 - (localPriceRange[1] / 1000) * 100}%`
//                   }}
//                 />
//               </div>
              
//               <div className="relative mt-4">
//                 <input
//                   type="range"
//                   min="0"
//                   max="1000"
//                   value={localPriceRange[0]}
//                   onChange={(e) => handlePriceChange(e, 0)}
//                   className="absolute w-full h-1 opacity-0 cursor-pointer z-10"
//                 />
//                 <input
//                   type="range"
//                   min="0"
//                   max="1000"
//                   value={localPriceRange[1]}
//                   onChange={(e) => handlePriceChange(e, 1)}
//                   className="absolute w-full h-1 opacity-0 cursor-pointer z-10"
//                 />
                
//                 <div 
//                   className="absolute w-5 h-5 bg-white border-2 border-indigo-600 rounded-full transform -translate-y-1.5 shadow-md"
//                   style={{ left: `${(localPriceRange[0] / 1000) * 100}%` }}
//                 />
//                 <div 
//                   className="absolute w-5 h-5 bg-white border-2 border-indigo-600 rounded-full transform -translate-y-1.5 shadow-md"
//                   style={{ left: `${(localPriceRange[1] / 1000) * 100}%` }}
//                 />
//               </div>
              
//               <div className="flex space-x-4 mt-4">
//                 <div className="flex-1">
//                   <div className="relative">
//                     <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">$</span>
//                     <input
//                       type="number"
//                       min="0"
//                       max={localPriceRange[1]}
//                       value={localPriceRange[0]}
//                       onChange={(e) => handlePriceChange(e, 0)}
//                       className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex-1">
//                   <div className="relative">
//                     <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">$</span>
//                     <input
//                       type="number"
//                       min={localPriceRange[0]}
//                       max="1000"
//                       value={localPriceRange[1]}
//                       onChange={(e) => handlePriceChange(e, 1)}
//                       className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
//                     />
//                   </div>
//                 </div>
//               </div>
              
//               <button
//                 onClick={applyPriceFilter}
//                 className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors mt-4 flex items-center justify-center shadow-sm"
//               >
//                 Apply Filter
//               </button>
//             </div>
//           )}
//         </div>
        
//         {/* Categories - Grouped and organized */}
//         <div className="flex-1 overflow-y-auto pr-1">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//             <PanelLeft size={20} className="mr-2 text-indigo-600" />
//             Categories
//           </h3>
          
//           {/* Popular Categories */}
//           <div className="mb-4">
//             <div 
//               className="flex items-center justify-between cursor-pointer py-2 px-3 rounded-lg hover:bg-indigo-50 transition-colors"
//               onClick={() => toggleSection('popular')}
//             >
//               <h4 className="font-medium text-gray-800 flex items-center">
//                 {CATEGORY_GROUPS[0].icon}
//                 <span className="ml-2">Popular Categories</span>
//               </h4>
//               {expandedSections.popular ? (
//                 <ChevronUp size={16} className="text-indigo-500" />
//               ) : (
//                 <ChevronDown size={16} className="text-indigo-500" />
//               )}
//             </div>
            
//             {expandedSections.popular && (
//               <div className="ml-2 space-y-1 mt-2 animate-fadeIn">
//                 {CATEGORY_GROUPS[0].items.map((cat) => {
//                   const formattedCategory = formatCategoryUrl(cat);
//                   const isActive = formattedCategory === currentCategory.toLowerCase();
                  
//                   return (
//                     <div key={cat} className="group">
//                       <Link 
//                         href={`/product/category/${formattedCategory}`}
//                         className={`flex items-center py-2 px-3 rounded-lg transition-all duration-200 ${
//                           isActive 
//                             ? "bg-indigo-100 text-indigo-700 font-medium shadow-sm" 
//                             : "text-gray-700 hover:bg-gray-50"
//                         }`}
//                         onClick={() => {
//                           if (isMobile && onClose) onClose();
//                         }}
//                       >
//                         {isActive ? (
//                           <div className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></div>
//                         ) : (
//                           <div className="w-2 h-2 rounded-full bg-gray-300 mr-2 group-hover:bg-indigo-400"></div>
//                         )}
//                         {cat}
//                         {cat.includes('HOT') && (
//                           <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-600 text-xs rounded-md font-medium">
//                             HOT
//                           </span>
//                         )}
//                       </Link>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
          
//           {/* Smoking Accessories */}
//           <div className="mb-4">
//             <div 
//               className="flex items-center justify-between cursor-pointer py-2 px-3 rounded-lg hover:bg-indigo-50 transition-colors"
//               onClick={() => toggleSection('smoking')}
//             >
//               <h4 className="font-medium text-gray-800 flex items-center">
//                 {CATEGORY_GROUPS[1].icon}
//                 <span className="ml-2">Smoking Accessories</span>
//               </h4>
//               {expandedSections.smoking ? (
//                 <ChevronUp size={16} className="text-indigo-500" />
//               ) : (
//                 <ChevronDown size={16} className="text-indigo-500" />
//               )}
//             </div>
            
//             {expandedSections.smoking && (
//               <div className="ml-2 space-y-1 mt-2 max-h-48 overflow-y-auto pr-2 animate-fadeIn">
//                 {CATEGORY_GROUPS[1].items.map((cat) => {
//                   const formattedCategory = formatCategoryUrl(cat);
//                   const isActive = formattedCategory === currentCategory.toLowerCase();
                  
//                   return (
//                     <div key={cat} className="group">
//                       <Link 
//                         href={`/product/category/${formattedCategory}`}
//                         className={`flex items-center py-2 px-3 rounded-lg transition-all duration-200 ${
//                           isActive 
//                             ? "bg-indigo-100 text-indigo-700 font-medium shadow-sm" 
//                             : "text-gray-700 hover:bg-gray-50"
//                         }`}
//                         onClick={() => {
//                           if (isMobile && onClose) onClose();
//                         }}
//                       >
//                         {isActive ? (
//                           <div className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></div>
//                         ) : (
//                           <div className="w-2 h-2 rounded-full bg-gray-300 mr-2 group-hover:bg-indigo-400"></div>
//                         )}
//                         {cat}
//                       </Link>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
          
//           {/* Electronic & Vaporizers */}
//           <div className="mb-4">
//             <div 
//               className="flex items-center justify-between cursor-pointer py-2 px-3 rounded-lg hover:bg-indigo-50 transition-colors"
//               onClick={() => toggleSection('electronic')}
//             >
//               <h4 className="font-medium text-gray-800 flex items-center">
//                 {CATEGORY_GROUPS[2].icon}
//                 <span className="ml-2">Electronic & Vaporizers</span>
//               </h4>
//               {expandedSections.electronic ? (
//                 <ChevronUp size={16} className="text-indigo-500" />
//               ) : (
//                 <ChevronDown size={16} className="text-indigo-500" />
//               )}
//             </div>
            
//             {expandedSections.electronic && (
//               <div className="ml-2 space-y-1 mt-2 animate-fadeIn">
//                 {CATEGORY_GROUPS[2].items.map((cat) => {
//                   const formattedCategory = formatCategoryUrl(cat);
//                   const isActive = formattedCategory === currentCategory.toLowerCase();
                  
//                   return (
//                     <div key={cat} className="group">
//                       <Link 
//                         href={`/product/category/${formattedCategory}`}
//                         className={`flex items-center py-2 px-3 rounded-lg transition-all duration-200 ${
//                           isActive 
//                             ? "bg-indigo-100 text-indigo-700 font-medium shadow-sm" 
//                             : "text-gray-700 hover:bg-gray-50"
//                         }`}
//                         onClick={() => {
//                           if (isMobile && onClose) onClose();
//                         }}
//                       >
//                         {isActive ? (
//                           <div className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></div>
//                         ) : (
//                           <div className="w-2 h-2 rounded-full bg-gray-300 mr-2 group-hover:bg-indigo-400"></div>
//                         )}
//                         {cat}
//                       </Link>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
          
//           {/* Lighters & Torch */}
//           <div className="mb-4">
//             <div 
//               className="flex items-center justify-between cursor-pointer py-2 px-3 rounded-lg hover:bg-indigo-50 transition-colors"
//               onClick={() => toggleSection('lighters')}
//             >
//               <h4 className="font-medium text-gray-800 flex items-center">
//                 {CATEGORY_GROUPS[3].icon}
//                 <span className="ml-2">Lighters & Torch</span>
//               </h4>
//               {expandedSections.lighters ? (
//                 <ChevronUp size={16} className="text-indigo-500" />
//               ) : (
//                 <ChevronDown size={16} className="text-indigo-500" />
//               )}
//             </div>
            
//             {expandedSections.lighters && (
//               <div className="ml-2 space-y-1 mt-2 animate-fadeIn">
//                 {CATEGORY_GROUPS[3].items.map((cat) => {
//                   const formattedCategory = formatCategoryUrl(cat);
//                   const isActive = formattedCategory === currentCategory.toLowerCase();
                  
//                   return (
//                     <div key={cat} className="group">
//                       <Link 
//                         href={`/product/category/${formattedCategory}`}
//                         className={`flex items-center py-2 px-3 rounded-lg transition-all duration-200 ${
//                           isActive 
//                             ? "bg-indigo-100 text-indigo-700 font-medium shadow-sm" 
//                             : "text-gray-700 hover:bg-gray-50"
//                         }`}
//                         onClick={() => {
//                           if (isMobile && onClose) onClose();
//                         }}
//                       >
//                         {isActive ? (
//                           <div className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></div>
//                         ) : (
//                           <div className="w-2 h-2 rounded-full bg-gray-300 mr-2 group-hover:bg-indigo-400"></div>
//                         )}
//                         {cat}
//                       </Link>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
          
//           {/* Other Products */}
//           <div className="mb-4">
//             <div 
//               className="flex items-center justify-between cursor-pointer py-2 px-3 rounded-lg hover:bg-indigo-50 transition-colors"
//               onClick={() => toggleSection('other')}
//             >
//               <h4 className="font-medium text-gray-800 flex items-center">
//                 {CATEGORY_GROUPS[4].icon}
//                 <span className="ml-2">Other Products</span>
//               </h4>
//               {expandedSections.other ? (
//                 <ChevronUp size={16} className="text-indigo-500" />
//               ) : (
//                 <ChevronDown size={16} className="text-indigo-500" />
//               )}
//             </div>
            
//             {expandedSections.other && (
//               <div className="ml-2 space-y-1 mt-2 animate-fadeIn">
//                 {CATEGORY_GROUPS[4].items.map((cat) => {
//                   const formattedCategory = formatCategoryUrl(cat);
//                   const isActive = formattedCategory === currentCategory.toLowerCase();
                  
//                   return (
//                     <div key={cat} className="group">
//                       <Link 
//                         href={`/product/category/${formattedCategory}`}
//                         className={`flex items-center py-2 px-3 rounded-lg transition-all duration-200 ${
//                           isActive 
//                             ? "bg-indigo-100 text-indigo-700 font-medium shadow-sm" 
//                             : "text-gray-700 hover:bg-gray-50"
//                         }`}
//                         onClick={() => {
//                           if (isMobile && onClose) onClose();
//                         }}
//                       >
//                         {isActive ? (
//                           <div className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></div>
//                         ) : (
//                           <div className="w-2 h-2 rounded-full bg-gray-300 mr-2 group-hover:bg-indigo-400"></div>
//                         )}
//                         {cat}
//                         {cat.includes('HOT') && (
//                           <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-600 text-xs rounded-md font-medium">
//                             HOT
//                           </span>
//                         )}
//                       </Link>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
        
//         {/* Reset Filters Button - Only visible on mobile */}
//         {isMobile && (
//           <div className="sticky bottom-0 pt-4 pb-2 bg-white border-t border-gray-200 mt-4">
//             <button
//               onClick={() => {
//                 onPriceChange([0, 1000]);
//                 if (onClose) onClose();
//               }}
//               className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors shadow-md"
//             >
//               Apply Filters
//             </button>
//           </div>
//         )}
//       </div>
      
//       {/* Add some CSS for animations */}
//       <style jsx>{`
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-in-out;
//         }
        
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronDown, 
  ChevronUp, 
  X, 
  Star, 
  ChevronLeft,
  Tag,
  Flame,
  ShoppingBag,
  Sparkles,
  Zap,
  PanelLeft,
  Filter,
  BadgePercent
} from "lucide-react";

const CATEGORIES = [
  "ASHTRAY",
  "CIGAR HOT",
  "CIGAR BY BRAND NEW",
  "CIGAR ACCESSORIES",
  "ADULT NOVELTYHOT",
  "BRANDED APPARELS & MERCHANDISE",
  "DETOX + SYNTHETICSHOT",
  "GENERAL MERCHANDISE",
  "INCENSE + SCENTS + SPRAYS",
  "MEDICINE + ENERGY",
  "PHONE ACCESSORIES",
  "PHONE CARDS",
  "510 THREAD BATTERIES",
  "DRY + WAX ACCESSORIES",
  "DRY + WAX VAPORIZERS",
  "GLASS ACCESSORIES",
  "GLASS CLEANER + ACCESSORIES",
  "GLASS PIPES",
  "HAND PIPES",
  "HERBAL NON TOBACCO",
  "HOOKAH ACCESSORIES",
  "HOOKAH BOWLS",
  "HOOKAH BURNERS",
  "HOOKAH COALS",
  "HOOKAH HOSES",
  "HOOKAH TIPS",
  "HOOKAHS",
  "KRATOM",
  "GRINDERS",
  "JARS/SEALED BAGS",
  "RAW ACCESSORIES",
  "ROLLING PAPER + FILTERSH",
  "SCALES",
  "SMOKE ACCESSORIES",
  "TRAYS",
  "BUTANE + LIGHTER FLUID",
  "BIG TORCHES",
  "LIGHTERS",
  "MINI TORCHES",
  "ZIPPO LIGHTERS",
  "WHIP CREAM CHARGERS",
  "WHIP CREAM DISPENSERS"
];

// Group categories into sections for better organization
const CATEGORY_GROUPS = [
  {
    title: "Popular Categories",
    icon: <Flame size={18} className="text-red-500" />,
    items: ["CIGAR HOT", "GLASS PIPES", "HOOKAHS", "KRATOM", "LIGHTERS"]
  },
  {
    title: "Smoking Accessories",
    icon: <ShoppingBag size={18} className="text-gray-500" />,
    items: [
      "ASHTRAY", 
      "CIGAR ACCESSORIES", 
      "GLASS ACCESSORIES", 
      "GLASS CLEANER + ACCESSORIES",
      "GLASS PIPES",
      "HAND PIPES",
      "HOOKAHS",
      "HOOKAH ACCESSORIES",
      "HOOKAH BOWLS",
      "HOOKAH BURNERS",
      "HOOKAH COALS",
      "HOOKAH HOSES",
      "HOOKAH TIPS",
      "GRINDERS",
      "RAW ACCESSORIES",
      "ROLLING PAPER + FILTERSH",
      "SMOKE ACCESSORIES",
      "TRAYS"
    ]
  },
  {
    title: "Electronic & Vaporizers",
    icon: <Zap size={18} className="text-gray-500" />,
    items: [
      "510 THREAD BATTERIES",
      "DRY + WAX ACCESSORIES",
      "DRY + WAX VAPORIZERS",
      "PHONE ACCESSORIES"
    ]
  },
  {
    title: "Lighters & Torch",
    icon: <Sparkles size={18} className="text-gray-500" />,
    items: [
      "BUTANE + LIGHTER FLUID",
      "BIG TORCHES",
      "LIGHTERS",
      "MINI TORCHES",
      "ZIPPO LIGHTERS"
    ]
  },
  {
    title: "Other Products",
    icon: <Tag size={18} className="text-gray-500" />,
    items: [
      "ADULT NOVELTYHOT",
      "BRANDED APPARELS & MERCHANDISE",
      "DETOX + SYNTHETICSHOT",
      "GENERAL MERCHANDISE",
      "INCENSE + SCENTS + SPRAYS",
      "MEDICINE + ENERGY",
      "PHONE CARDS",
      "HERBAL NON TOBACCO",
      "JARS/SEALED BAGS",
      "SCALES",
      "WHIP CREAM CHARGERS",
      "WHIP CREAM DISPENSERS"
    ]
  }
];

export default function Sidebar({ 
  currentCategory, 
  onCategoryChange, 
  priceRange, 
  onPriceChange,
  onClose,
  isMobile = false
}) {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    popular: true,
    smoking: false,
    electronic: false,
    lighters: false,
    other: false
  });
  
  // Sync local price range with props
  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);
  
  const handlePriceChange = (e, index) => {
    const newRange = [...localPriceRange];
    newRange[index] = parseInt(e.target.value);
    setLocalPriceRange(newRange);
  };
  
  const applyPriceFilter = () => {
    onPriceChange(localPriceRange);
  };
  
  const formatCategoryUrl = (category) => {
    return category.toLowerCase().replace(/\s+/g, '-').replace(/[\/\+]/g, '-');
  };
  
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Find which group the current category belongs to
  const findCategoryGroup = () => {
    for (const group of CATEGORY_GROUPS) {
      if (group.items.some(item => formatCategoryUrl(item) === currentCategory.toLowerCase())) {
        return group.title.toLowerCase().replace(/\s+/g, '-');
      }
    }
    return 'other';
  };
  
  // Initialize expanded state based on current category
  useEffect(() => {
    const groupKey = findCategoryGroup();
    let sectionKey = '';
    
    if (groupKey.includes('popular')) sectionKey = 'popular';
    else if (groupKey.includes('smoking')) sectionKey = 'smoking';
    else if (groupKey.includes('electronic')) sectionKey = 'electronic';
    else if (groupKey.includes('lighter')) sectionKey = 'lighters';
    else sectionKey = 'other';
    
    if (sectionKey) {
      setExpandedSections(prev => ({
        ...prev,
        [sectionKey]: true
      }));
    }
  }, [currentCategory]);
  
  return (
    <div className={`
      bg-white border border-gray-200 
      ${isMobile ? 'h-full' : 'h-full max-h-[calc(100vh-2rem)]'}
      overflow-y-auto relative
    `}>
      <div className="p-5 h-full flex flex-col">
        {/* Mobile close button */}
        {isMobile && (
          <div className="md:hidden flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <Filter size={20} className="mr-2 text-black" />
              Filters
            </h2>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        )}
        
        {/* Price Range Filter */}
        <div className="mb-6 bg-white p-5 border border-gray-100">
          <div 
            className="flex items-center justify-between cursor-pointer mb-4"
            onClick={() => toggleSection('price')}
          >
            <h3 className="text-sm font-medium text-gray-900 flex items-center uppercase tracking-wider">
              <BadgePercent size={16} className="text-gray-500 mr-2" />
              Price Range
            </h3>
            {expandedSections.price ? (
              <ChevronUp size={16} className="text-gray-500" />
            ) : (
              <ChevronDown size={16} className="text-gray-500" />
            )}
          </div>
          
          {expandedSections.price && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-gray-700">${localPriceRange[0]}</span>
                <span className="text-gray-700">${localPriceRange[1]}</span>
              </div>
              
              <div className="relative h-1 bg-gray-200 rounded-full mt-2">
                <div 
                  className="absolute h-full bg-gray-600 rounded-full"
                  style={{
                    left: `${(localPriceRange[0] / 1000) * 100}%`,
                    right: `${100 - (localPriceRange[1] / 1000) * 100}%`
                  }}
                />
              </div>
              
              <div className="relative mt-4">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={localPriceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="absolute w-full h-1 opacity-0 cursor-pointer z-10"
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={localPriceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="absolute w-full h-1 opacity-0 cursor-pointer z-10"
                />
                
                <div 
                  className="absolute w-3 h-3 bg-white border-2 border-gray-600 rounded-full transform -translate-y-1"
                  style={{ left: `${(localPriceRange[0] / 1000) * 100}%` }}
                />
                <div 
                  className="absolute w-3 h-3 bg-white border-2 border-gray-600 rounded-full transform -translate-y-1"
                  style={{ left: `${(localPriceRange[1] / 1000) * 100}%` }}
                />
              </div>
              
              <div className="flex space-x-4 mt-4">
                <div className="flex-1">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">$</span>
                    <input
                      type="number"
                      min="0"
                      max={localPriceRange[1]}
                      value={localPriceRange[0]}
                      onChange={(e) => handlePriceChange(e, 0)}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-xs"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">$</span>
                    <input
                      type="number"
                      min={localPriceRange[0]}
                      max="1000"
                      value={localPriceRange[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-xs"
                    />
                  </div>
                </div>
              </div>
              
              <button
                onClick={applyPriceFilter}
                className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg text-xs font-medium transition-colors"
              >
                Apply Filter
              </button>
            </div>
          )}
        </div>
        
        {/* Categories - Grouped and organized */}
        <div className="flex-1 overflow-y-auto pr-1">
          <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center uppercase tracking-wider">
            <PanelLeft size={16} className="mr-2 text-gray-500" />
            Categories
          </h3>
          
          {/* Popular Categories */}
          <div className="mb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2 px-3 hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection('popular')}
            >
              <h4 className="text-xs font-medium text-gray-800 flex items-center">
                {CATEGORY_GROUPS[0].icon}
                <span className="ml-2">Popular Categories</span>
              </h4>
              {expandedSections.popular ? (
                <ChevronUp size={14} className="text-gray-500" />
              ) : (
                <ChevronDown size={14} className="text-gray-500" />
              )}
            </div>
            
            {expandedSections.popular && (
              <div className="ml-2 space-y-1 mt-2 animate-fadeIn">
                {CATEGORY_GROUPS[0].items.map((cat) => {
                  const formattedCategory = formatCategoryUrl(cat);
                  const isActive = formattedCategory === currentCategory.toLowerCase();
                  
                  return (
                    <div key={cat} className="group">
                      <Link 
                        href={`/product/category/${formattedCategory}`}
                        className={`flex items-center py-2 px-3 transition-all duration-200 text-xs ${
                          isActive 
                            ? "text-red-500 font-medium" 
                            : "text-gray-600 hover:text-red-500"
                        }`}
                        onClick={() => {
                          if (isMobile && onClose) onClose();
                        }}
                      >
                        {cat}
                        {cat.includes('HOT') && (
                          <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-600 text-xs rounded-sm font-medium">
                            HOT
                          </span>
                        )}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Smoking Accessories */}
          <div className="mb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2 px-3 hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection('smoking')}
            >
              <h4 className="text-xs font-medium text-gray-800 flex items-center">
                {CATEGORY_GROUPS[1].icon}
                <span className="ml-2">Smoking Accessories</span>
              </h4>
              {expandedSections.smoking ? (
                <ChevronUp size={14} className="text-gray-500" />
              ) : (
                <ChevronDown size={14} className="text-gray-500" />
              )}
            </div>
            
            {expandedSections.smoking && (
              <div className="ml-2 space-y-1 mt-2 max-h-48 overflow-y-auto pr-2 animate-fadeIn">
                {CATEGORY_GROUPS[1].items.map((cat) => {
                  const formattedCategory = formatCategoryUrl(cat);
                  const isActive = formattedCategory === currentCategory.toLowerCase();
                  
                  return (
                    <div key={cat} className="group">
                      <Link 
                        href={`/product/category/${formattedCategory}`}
                        className={`flex items-center py-2 px-3 transition-all duration-200 text-xs ${
                          isActive 
                            ? "text-red-500 font-medium" 
                            : "text-gray-600 hover:text-red-500"
                        }`}
                        onClick={() => {
                          if (isMobile && onClose) onClose();
                        }}
                      >
                        {cat}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Electronic & Vaporizers */}
          <div className="mb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2 px-3 hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection('electronic')}
            >
              <h4 className="text-xs font-medium text-gray-800 flex items-center">
                {CATEGORY_GROUPS[2].icon}
                <span className="ml-2">Electronic & Vaporizers</span>
              </h4>
              {expandedSections.electronic ? (
                <ChevronUp size={14} className="text-gray-500" />
              ) : (
                <ChevronDown size={14} className="text-gray-500" />
              )}
            </div>
            
            {expandedSections.electronic && (
              <div className="ml-2 space-y-1 mt-2 animate-fadeIn">
                {CATEGORY_GROUPS[2].items.map((cat) => {
                  const formattedCategory = formatCategoryUrl(cat);
                  const isActive = formattedCategory === currentCategory.toLowerCase();
                  
                  return (
                    <div key={cat} className="group">
                      <Link 
                        href={`/product/category/${formattedCategory}`}
                        className={`flex items-center py-2 px-3 transition-all duration-200 text-xs ${
                          isActive 
                            ? "text-red-500 font-medium" 
                            : "text-gray-600 hover:text-red-500"
                        }`}
                        onClick={() => {
                          if (isMobile && onClose) onClose();
                        }}
                      >
                        {cat}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Lighters & Torch */}
          <div className="mb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2 px-3 hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection('lighters')}
            >
              <h4 className="text-xs font-medium text-gray-800 flex items-center">
                {CATEGORY_GROUPS[3].icon}
                <span className="ml-2">Lighters & Torch</span>
              </h4>
              {expandedSections.lighters ? (
                <ChevronUp size={14} className="text-gray-500" />
              ) : (
                <ChevronDown size={14} className="text-gray-500" />
              )}
            </div>
            
            {expandedSections.lighters && (
              <div className="ml-2 space-y-1 mt-2 animate-fadeIn">
                {CATEGORY_GROUPS[3].items.map((cat) => {
                  const formattedCategory = formatCategoryUrl(cat);
                  const isActive = formattedCategory === currentCategory.toLowerCase();
                  
                  return (
                    <div key={cat} className="group">
                      <Link 
                        href={`/product/category/${formattedCategory}`}
                        className={`flex items-center py-2 px-3 transition-all duration-200 text-xs ${
                          isActive 
                            ? "text-red-500 font-medium" 
                            : "text-gray-600 hover:text-red-500"
                        }`}
                        onClick={() => {
                          if (isMobile && onClose) onClose();
                        }}
                      >
                        {cat}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Other Products */}
          <div className="mb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2 px-3 hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection('other')}
            >
              <h4 className="text-xs font-medium text-gray-800 flex items-center">
                {CATEGORY_GROUPS[4].icon}
                <span className="ml-2">Other Products</span>
              </h4>
              {expandedSections.other ? (
                <ChevronUp size={14} className="text-gray-500" />
              ) : (
                <ChevronDown size={14} className="text-gray-500" />
              )}
            </div>
            
            {expandedSections.other && (
              <div className="ml-2 space-y-1 mt-2 animate-fadeIn">
                {CATEGORY_GROUPS[4].items.map((cat) => {
                  const formattedCategory = formatCategoryUrl(cat);
                  const isActive = formattedCategory === currentCategory.toLowerCase();
                  
                  return (
                    <div key={cat} className="group">
                      <Link 
                        href={`/product/category/${formattedCategory}`}
                        className={`flex items-center py-2 px-3 transition-all duration-200 text-xs ${
                          isActive 
                            ? "text-red-500 font-medium" 
                            : "text-gray-600 hover:text-red-500"
                        }`}
                        onClick={() => {
                          if (isMobile && onClose) onClose();
                        }}
                      >
                        {cat}
                        {cat.includes('HOT') && (
                          <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-600 text-xs rounded-sm font-medium">
                            HOT
                          </span>
                        )}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        
        {/* Reset Filters Button - Only visible on mobile */}
        {isMobile && (
          <div className="sticky bottom-0 pt-4 pb-2 bg-white border-t border-gray-100 mt-4">
            <button
              onClick={() => {
                onPriceChange([0, 1000]);
                if (onClose) onClose();
              }}
              className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg text-xs font-medium transition-colors"
            >
              Apply Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Add some CSS for animations */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}