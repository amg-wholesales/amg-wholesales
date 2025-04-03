// // // components/category/Sidebar.jsx
// // "use client";

// // import { useState } from "react";
// // import Link from "next/link";

// // const CATEGORIES = [
// //   "ASHTRAY",
// //   "CIGAR HOT",
// //   "CIGAR BY BRAND NEW",
// //   "CIGAR ACCESSORIES",
// //   "ADULT NOVELTYHOT",
// //   "BRANDED APPARELS & MERCHANDISE",
// //   "DETOX + SYNTHETICSHOT",
// //   "GENERAL MERCHANDISE",
// //   "INCENSE + SCENTS + SPRAYS",
// //   "MEDICINE + ENERGY",
// //   "PHONE ACCESSORIES",
// //   "PHONE CARDS",
// //   "510 THREAD BATTERIES",
// //   "DRY + WAX ACCESSORIES",
// //   "DRY + WAX VAPORIZERS",
// //   "GLASS ACCESSORIES",
// //   "GLASS CLEANER + ACCESSORIES",
// //   "GLASS PIPES",
// //   "HAND PIPES",
// //   "HERBAL NON TOBACCO",
// //   "HOOKAH ACCESSORIES",
// //   "HOOKAH BOWLS",
// //   "HOOKAH BURNERS",
// //   "HOOKAH COALS",
// //   "HOOKAH HOSES",
// //   "HOOKAH TIPS",
// //   "HOOKAHS",
// //   "KRATOM",
// //   "GRINDERS",
// //   "JARS/SEALED BAGS",
// //   "RAW ACCESSORIES",
// //   "ROLLING PAPER + FILTERSH",
// //   "SCALES",
// //   "SMOKE ACCESSORIES",
// //   "TRAYS",
// //   "BUTANE + LIGHTER FLUID",
// //   "BIG TORCHES",
// //   "LIGHTERS",
// //   "MINI TORCHES",
// //   "ZIPPO LIGHTERS",
// //   "WHIP CREAM CHARGERS",
// //   "WHIP CREAM DISPENSERS"
// // ];

// // export default function Sidebar({ currentCategory, onCategoryChange, priceRange, onPriceChange }) {
// //   const [localPriceRange, setLocalPriceRange] = useState(priceRange);
// //   const [expanded, setExpanded] = useState(false);
  
// //   const handlePriceChange = (e, index) => {
// //     const newRange = [...localPriceRange];
// //     newRange[index] = parseInt(e.target.value);
// //     setLocalPriceRange(newRange);
// //   };
  
// //   const applyPriceFilter = () => {
// //     onPriceChange(localPriceRange);
// //   };
  
// //   const formatCategoryUrl = (category) => {
// //     return category.toLowerCase().replace(/\s+/g, '-').replace(/[\/\+]/g, '-');
// //   };
  
// //   // Display only first 10 categories, or all if expanded
// //   const displayCategories = expanded ? CATEGORIES : CATEGORIES.slice(0, 10);
  
// //   return (
// //     <div className="bg-white p-4 rounded-lg shadow-md space-y-6">
// //       <div>
// //         <h3 className="text-lg font-semibold mb-3">Price Range</h3>
// //         <div className="space-y-4">
// //           <div className="flex justify-between">
// //             <span>${localPriceRange[0]}</span>
// //             <span>${localPriceRange[1]}</span>
// //           </div>
// //           <input
// //             type="range"
// //             min="0"
// //             max="1000"
// //             value={localPriceRange[0]}
// //             onChange={(e) => handlePriceChange(e, 0)}
// //             className="w-full"
// //           />
// //           <input
// //             type="range"
// //             min="0"
// //             max="1000"
// //             value={localPriceRange[1]}
// //             onChange={(e) => handlePriceChange(e, 1)}
// //             className="w-full"
// //           />
// //           <div className="flex space-x-4">
// //             <div className="flex-1">
// //               <input
// //                 type="number"
// //                 min="0"
// //                 max={localPriceRange[1]}
// //                 value={localPriceRange[0]}
// //                 onChange={(e) => handlePriceChange(e, 0)}
// //                 className="w-full p-2 border rounded"
// //               />
// //             </div>
// //             <div className="flex-1">
// //               <input
// //                 type="number"
// //                 min={localPriceRange[0]}
// //                 max="1000"
// //                 value={localPriceRange[1]}
// //                 onChange={(e) => handlePriceChange(e, 1)}
// //                 className="w-full p-2 border rounded"
// //               />
// //             </div>
// //           </div>
// //           <button
// //             onClick={applyPriceFilter}
// //             className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
// //           >
// //             Apply Filter
// //           </button>
// //         </div>
// //       </div>
      
// //       <div>
// //         <h3 className="text-lg font-semibold mb-3">Categories</h3>
// //         <div className="space-y-2">
// //           {displayCategories.map((category) => {
// //             const formattedCategory = formatCategoryUrl(category);
// //             const isActive = formattedCategory === currentCategory.toLowerCase();
            
// //             return (
// //               <div key={category} className="flex items-center">
// //                 <Link 
// //                   href={`/product/category/${formattedCategory}`}
// //                   className={`block py-1.5 hover:text-blue-600 transition ${
// //                     isActive ? "font-semibold text-blue-600" : "text-gray-700"
// //                   }`}
// //                 >
// //                   {category}
// //                 </Link>
// //               </div>
// //             );
// //           })}
          
// //           {CATEGORIES.length > 10 && (
// //             <button
// //               onClick={() => setExpanded(!expanded)}
// //               className="text-blue-600 font-medium py-1 hover:underline"
// //             >
// //               {expanded ? "Show Less" : "Show More"}
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// // components/category/Sidebar.jsx
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { 
//   ChevronDown, 
//   ChevronUp, 
//   ChevronRight, 
//   X, 
//   Star, 
//   Check, 
//   ChevronLeft 
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
//     items: ["CIGAR HOT", "GLASS PIPES", "HOOKAHS", "KRATOM", "LIGHTERS"]
//   },
//   {
//     title: "Smoking Accessories",
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
//     items: [
//       "510 THREAD BATTERIES",
//       "DRY + WAX ACCESSORIES",
//       "DRY + WAX VAPORIZERS",
//       "PHONE ACCESSORIES"
//     ]
//   },
//   {
//     title: "Lighters & Torch",
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
//     <div className="h-full overflow-y-auto bg-white p-5 rounded-xl shadow-sm border border-gray-200 relative">
//       {/* Mobile close button */}
//       {isMobile && (
//         <div className="md:hidden flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
//           <h2 className="text-lg font-bold text-gray-900">Filters</h2>
//           <button 
//             onClick={onClose}
//             className="p-1 rounded-full hover:bg-gray-100"
//           >
//             <X size={20} />
//           </button>
//         </div>
//       )}
      
//       {/* Price Range Filter */}
//       <div className="mb-8">
//         <div 
//           className="flex items-center justify-between cursor-pointer mb-4"
//           onClick={() => toggleSection('price')}
//         >
//           <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//             <ChevronLeft size={18} className="text-blue-600 mr-2" />
//             Price Range
//           </h3>
//           {expandedSections.price ? (
//             <ChevronUp size={18} className="text-gray-500" />
//           ) : (
//             <ChevronDown size={18} className="text-gray-500" />
//           )}
//         </div>
        
//         {expandedSections.price && (
//           <div className="space-y-4 animate-fadeIn">
//             <div className="flex justify-between text-sm text-gray-600">
//               <span>${localPriceRange[0]}</span>
//               <span>${localPriceRange[1]}</span>
//             </div>
            
//             <div className="relative h-1 bg-gray-200 rounded-full mt-2">
//               <div 
//                 className="absolute h-full bg-blue-600 rounded-full"
//                 style={{
//                   left: `${(localPriceRange[0] / 1000) * 100}%`,
//                   right: `${100 - (localPriceRange[1] / 1000) * 100}%`
//                 }}
//               />
//             </div>
            
//             <div className="relative mt-4">
//               <input
//                 type="range"
//                 min="0"
//                 max="1000"
//                 value={localPriceRange[0]}
//                 onChange={(e) => handlePriceChange(e, 0)}
//                 className="absolute w-full h-1 opacity-0 cursor-pointer z-10"
//               />
//               <input
//                 type="range"
//                 min="0"
//                 max="1000"
//                 value={localPriceRange[1]}
//                 onChange={(e) => handlePriceChange(e, 1)}
//                 className="absolute w-full h-1 opacity-0 cursor-pointer z-10"
//               />
              
//               <div 
//                 className="absolute w-4 h-4 bg-white border-2 border-blue-600 rounded-full transform -translate-y-1.5"
//                 style={{ left: `${(localPriceRange[0] / 1000) * 100}%` }}
//               />
//               <div 
//                 className="absolute w-4 h-4 bg-white border-2 border-blue-600 rounded-full transform -translate-y-1.5"
//                 style={{ left: `${(localPriceRange[1] / 1000) * 100}%` }}
//               />
//             </div>
            
//             <div className="flex space-x-4 mt-4">
//               <div className="flex-1">
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">$</span>
//                   <input
//                     type="number"
//                     min="0"
//                     max={localPriceRange[1]}
//                     value={localPriceRange[0]}
//                     onChange={(e) => handlePriceChange(e, 0)}
//                     className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <div className="relative">
//                   <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">$</span>
//                   <input
//                     type="number"
//                     min={localPriceRange[0]}
//                     max="1000"
//                     value={localPriceRange[1]}
//                     onChange={(e) => handlePriceChange(e, 1)}
//                     className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               </div>
//             </div>
            
//             <button
//               onClick={applyPriceFilter}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors mt-4 flex items-center justify-center"
//             >
//               Apply Filter
//             </button>
//           </div>
//         )}
//       </div>
      
//       {/* Categories - Grouped and organized */}
//       <div className="mb-4">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
        
//         {/* Popular Categories */}
//         <div className="mb-4">
//           <div 
//             className="flex items-center justify-between cursor-pointer py-2"
//             onClick={() => toggleSection('popular')}
//           >
//             <h4 className="font-medium text-gray-800">Popular Categories</h4>
//             {expandedSections.popular ? (
//               <ChevronUp size={16} className="text-gray-500" />
//             ) : (
//               <ChevronDown size={16} className="text-gray-500" />
//             )}
//           </div>
          
//           {expandedSections.popular && (
//             <div className="ml-2 space-y-1 mt-2 animate-fadeIn">
//               {CATEGORY_GROUPS[0].items.map((cat) => {
//                 const formattedCategory = formatCategoryUrl(cat);
//                 const isActive = formattedCategory === currentCategory.toLowerCase();
                
//                 return (
//                   <div key={cat} className="group">
//                     <Link 
//                       href={`/product/category/${formattedCategory}`}
//                       className={`flex items-center py-1.5 px-2 rounded-lg transition-colors ${
//                         isActive 
//                           ? "bg-blue-50 text-blue-700 font-medium" 
//                           : "text-gray-700 hover:bg-gray-50"
//                       }`}
//                       onClick={() => {
//                         if (isMobile && onClose) onClose();
//                       }}
//                     >
//                       {isActive ? (
//                         <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
//                       ) : (
//                         <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 group-hover:bg-gray-400"></div>
//                       )}
//                       {cat}
//                     </Link>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
        
//         {/* Smoking Accessories */}
//         <div className="mb-4">
//           <div 
//             className="flex items-center justify-between cursor-pointer py-2"
//             onClick={() => toggleSection('smoking')}
//           >
//             <h4 className="font-medium text-gray-800">Smoking Accessories</h4>
//             {expandedSections.smoking ? (
//               <ChevronUp size={16} className="text-gray-500" />
//             ) : (
//               <ChevronDown size={16} className="text-gray-500" />
//             )}
//           </div>
          
//           {expandedSections.smoking && (
//             <div className="ml-2 space-y-1 mt-2 max-h-48 overflow-y-auto pr-2 animate-fadeIn">
//               {CATEGORY_GROUPS[1].items.map((cat) => {
//                 const formattedCategory = formatCategoryUrl(cat);
//                 const isActive = formattedCategory === currentCategory.toLowerCase();
                
//                 return (
//                   <div key={cat} className="group">
//                     <Link 
//                       href={`/product/category/${formattedCategory}`}
//                       className={`flex items-center py-1.5 px-2 rounded-lg transition-colors ${
//                         isActive 
//                           ? "bg-blue-50 text-blue-700 font-medium" 
//                           : "text-gray-700 hover:bg-gray-50"
//                       }`}
//                       onClick={() => {
//                         if (isMobile && onClose) onClose();
//                       }}
//                     >
//                       {isActive ? (
//                         <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
//                       ) : (
//                         <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 group-hover:bg-gray-400"></div>
//                       )}
//                       {cat}
//                     </Link>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
        
//         {/* Electronic & Vaporizers */}
//         <div className="mb-4">
//           <div 
//             className="flex items-center justify-between cursor-pointer py-2"
//             onClick={() => toggleSection('electronic')}
//           >
//             <h4 className="font-medium text-gray-800">Electronic & Vaporizers</h4>
//             {expandedSections.electronic ? (
//               <ChevronUp size={16} className="text-gray-500" />
//             ) : (
//               <ChevronDown size={16} className="text-gray-500" />
//             )}
//           </div>
          
//           {expandedSections.electronic && (
//             <div className="ml-2 space-y-1 mt-2 animate-fadeIn">
//               {CATEGORY_GROUPS[2].items.map((cat) => {
//                 const formattedCategory = formatCategoryUrl(cat);
//                 const isActive = formattedCategory === currentCategory.toLowerCase();
                
//                 return (
//                   <div key={cat} className="group">
//                     <Link 
//                       href={`/product/category/${formattedCategory}`}
//                       className={`flex items-center py-1.5 px-2 rounded-lg transition-colors ${
//                         isActive 
//                           ? "bg-blue-50 text-blue-700 font-medium" 
//                           : "text-gray-700 hover:bg-gray-50"
//                       }`}
//                       onClick={() => {
//                         if (isMobile && onClose) onClose();
//                       }}
//                     >
//                       {isActive ? (
//                         <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
//                       ) : (
//                         <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 group-hover:bg-gray-400"></div>
//                       )}
//                       {cat}
//                     </Link>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
        
//         {/* Lighters & Torch */}
//         <div className="mb-4">
//           <div 
//             className="flex items-center justify-between cursor-pointer py-2"
//             onClick={() => toggleSection('lighters')}
//           >
//             <h4 className="font-medium text-gray-800">Lighters & Torch</h4>
//             {expandedSections.lighters ? (
//               <ChevronUp size={16} className="text-gray-500" />
//             ) : (
//               <ChevronDown size={16} className="text-gray-500" />
//             )}
//           </div>
          
//           {expandedSections.lighters && (
//             <div className="ml-2 space-y-1 mt-2 animate-fadeIn">
//               {CATEGORY_GROUPS[3].items.map((cat) => {
//                 const formattedCategory = formatCategoryUrl(cat);
//                 const isActive = formattedCategory === currentCategory.toLowerCase();
                
//                 return (
//                   <div key={cat} className="group">
//                     <Link 
//                       href={`/product/category/${formattedCategory}`}
//                       className={`flex items-center py-1.5 px-2 rounded-lg transition-colors ${
//                         isActive 
//                           ? "bg-blue-50 text-blue-700 font-medium" 
//                           : "text-gray-700 hover:bg-gray-50"
//                       }`}
//                       onClick={() => {
//                         if (isMobile && onClose) onClose();
//                       }}
//                     >
//                       {isActive ? (
//                         <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
//                       ) : (
//                         <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 group-hover:bg-gray-400"></div>
//                       )}
//                       {cat}
//                     </Link>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
        
//         {/* Other Products */}
//         <div className="mb-4">
//           <div 
//             className="flex items-center justify-between cursor-pointer py-2"
//             onClick={() => toggleSection('other')}
//           >
//             <h4 className="font-medium text-gray-800">Other Products</h4>
//             {expandedSections.other ? (
//               <ChevronUp size={16} className="text-gray-500" />
//             ) : (
//               <ChevronDown size={16} className="text-gray-500" />
//             )}
//           </div>
          
//           {expandedSections.other && (
//             <div className="ml-2 space-y-1 mt-2 max-h-48 overflow-y-auto pr-2 animate-fadeIn">
//               {CATEGORY_GROUPS[4].items.map((cat) => {
//                 const formattedCategory = formatCategoryUrl(cat);
//                 const isActive = formattedCategory === currentCategory.toLowerCase();
                
//                 return (
//                   <div key={cat} className="group">
//                     <Link 
//                       href={`/product/category/${formattedCategory}`}
//                       className={`flex items-center py-1.5 px-2 rounded-lg transition-colors ${
//                         isActive 
//                           ? "bg-blue-50 text-blue-700 font-medium" 
//                           : "text-gray-700 hover:bg-gray-50"
//                       }`}
//                       onClick={() => {
//                         if (isMobile && onClose) onClose();
//                       }}
//                     >
//                       {isActive ? (
//                         <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
//                       ) : (
//                         <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 group-hover:bg-gray-400"></div>
//                       )}
//                       {cat}
//                     </Link>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
      
//       {/* Customer Ratings Filter */}
//       <div className="mb-6 pt-4 border-t border-gray-200">
//         <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Ratings</h3>
//         <div className="space-y-3">
//           {[5, 4, 3, 2, 1].map((rating) => (
//             <div key={rating} className="flex items-center">
//               <input
//                 type="checkbox"
//                 id={`rating-${rating}`}
//                 className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
//               />
//               <label htmlFor={`rating-${rating}`} className="ml-2 flex items-center text-gray-700">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     size={16}
//                     className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} mr-0.5`}
//                   />
//                 ))}
//                 <span className="ml-1">& Up</span>
//               </label>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       {/* Reset Filters Button - Only visible on mobile */}
//       {isMobile && (
//         <div className="sticky bottom-0 pt-4 pb-2 bg-white border-t border-gray-200 mt-4">
//           <button
//             onClick={() => {
//               onPriceChange([0, 1000]);
//               if (onClose) onClose();
//             }}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
//           >
//             Apply Filters
//           </button>
//         </div>
//       )}
      
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

// components/category/Sidebar.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronDown, 
  ChevronUp, 
  X, 
  Star, 
  // SliderIcon, 
  ChevronLeft
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
    items: ["CIGAR HOT", "GLASS PIPES", "HOOKAHS", "KRATOM", "LIGHTERS"]
  },
  {
    title: "Smoking Accessories",
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
    items: [
      "510 THREAD BATTERIES",
      "DRY + WAX ACCESSORIES",
      "DRY + WAX VAPORIZERS",
      "PHONE ACCESSORIES"
    ]
  },
  {
    title: "Lighters & Torch",
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
      bg-white rounded-xl shadow-sm border border-gray-200 
      ${isMobile ? 'h-full' : 'h-full max-h-[calc(100vh-2rem)]'}
      overflow-y-auto
    `}>
      <div className="p-5 h-full flex flex-col">
        {/* Mobile close button */}
        {isMobile && (
          <div className="md:hidden flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
        )}
        
        {/* Price Range Filter */}
        <div className="mb-6">
          <div 
            className="flex items-center justify-between cursor-pointer mb-4"
            onClick={() => toggleSection('price')}
          >
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <ChevronLeft size={18} className="text-blue-600 mr-2" />
              Price Range
            </h3>
            {expandedSections.price ? (
              <ChevronUp size={18} className="text-gray-500" />
            ) : (
              <ChevronDown size={18} className="text-gray-500" />
            )}
          </div>
          
          {expandedSections.price && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex justify-between text-sm text-gray-600">
                <span>${localPriceRange[0]}</span>
                <span>${localPriceRange[1]}</span>
              </div>
              
              <div className="relative h-1 bg-gray-200 rounded-full mt-2">
                <div 
                  className="absolute h-full bg-blue-600 rounded-full"
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
                  className="absolute w-4 h-4 bg-white border-2 border-blue-600 rounded-full transform -translate-y-1.5"
                  style={{ left: `${(localPriceRange[0] / 1000) * 100}%` }}
                />
                <div 
                  className="absolute w-4 h-4 bg-white border-2 border-blue-600 rounded-full transform -translate-y-1.5"
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
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <button
                onClick={applyPriceFilter}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors mt-4 flex items-center justify-center"
              >
                Apply Filter
              </button>
            </div>
          )}
        </div>
        
        {/* Categories - Grouped and organized */}
        <div className="flex-1 overflow-y-auto pr-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
          
          {/* Popular Categories */}
          <div className="mb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection('popular')}
            >
              <h4 className="font-medium text-gray-800">Popular Categories</h4>
              {expandedSections.popular ? (
                <ChevronUp size={16} className="text-gray-500" />
              ) : (
                <ChevronDown size={16} className="text-gray-500" />
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
                        className={`flex items-center py-1.5 px-2 rounded-lg transition-colors ${
                          isActive 
                            ? "bg-blue-50 text-blue-700 font-medium" 
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          if (isMobile && onClose) onClose();
                        }}
                      >
                        {isActive ? (
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 group-hover:bg-gray-400"></div>
                        )}
                        {cat}
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
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection('smoking')}
            >
              <h4 className="font-medium text-gray-800">Smoking Accessories</h4>
              {expandedSections.smoking ? (
                <ChevronUp size={16} className="text-gray-500" />
              ) : (
                <ChevronDown size={16} className="text-gray-500" />
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
                        className={`flex items-center py-1.5 px-2 rounded-lg transition-colors ${
                          isActive 
                            ? "bg-blue-50 text-blue-700 font-medium" 
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          if (isMobile && onClose) onClose();
                        }}
                      >
                        {isActive ? (
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 group-hover:bg-gray-400"></div>
                        )}
                        {cat}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Other category groups... */}
          {/* Electronic & Vaporizers */}
          <div className="mb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection('electronic')}
            >
              <h4 className="font-medium text-gray-800">Electronic & Vaporizers</h4>
              {expandedSections.electronic ? (
                <ChevronUp size={16} className="text-gray-500" />
              ) : (
                <ChevronDown size={16} className="text-gray-500" />
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
                        className={`flex items-center py-1.5 px-2 rounded-lg transition-colors ${
                          isActive 
                            ? "bg-blue-50 text-blue-700 font-medium" 
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          if (isMobile && onClose) onClose();
                        }}
                      >
                        {isActive ? (
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 group-hover:bg-gray-400"></div>
                        )}
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
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection('lighters')}
            >
              <h4 className="font-medium text-gray-800">Lighters & Torch</h4>
              {expandedSections.lighters ? (
                <ChevronUp size={16} className="text-gray-500" />
              ) : (
                <ChevronDown size={16} className="text-gray-500" />
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
                        className={`flex items-center py-1.5 px-2 rounded-lg transition-colors ${
                          isActive 
                            ? "bg-blue-50 text-blue-700 font-medium" 
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          if (isMobile && onClose) onClose();
                        }}
                      >
                        {isActive ? (
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 group-hover:bg-gray-400"></div>
                        )}
                        {cat}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="mb-4">
            <div 
              className="flex items-center justify-between cursor-pointer py-2"
              onClick={() => toggleSection('other')}
            >
              <h4 className="font-medium text-gray-800">other</h4>
              {expandedSections.other ? (
                <ChevronUp size={16} className="text-gray-500" />
              ) : (
                <ChevronDown size={16} className="text-gray-500" />
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
                        className={`flex items-center py-1.5 px-2 rounded-lg transition-colors ${
                          isActive 
                            ? "bg-blue-50 text-blue-700 font-medium" 
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          if (isMobile && onClose) onClose();
                        }}
                      >
                        {isActive ? (
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2"></div>
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2 group-hover:bg-gray-400"></div>
                        )}
                        {cat}
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
          <div className="sticky bottom-0 pt-4 pb-2 bg-white border-t border-gray-200 mt-4">
            <button
              onClick={() => {
                onPriceChange([0, 1000]);
                if (onClose) onClose();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
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