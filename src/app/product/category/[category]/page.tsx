
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { useAuth } from "@/context/authContext";
// import Sidebar from "@/components/category/Sidebar";
// import ProductCard from "@/components/category/ProductCart";
// import SearchBar from "@/components/category/SearchBar";
// import Pagination from "@/components/category/Pagination";
// import { 
//   ChevronRight, 
//   Filter, 
//   SlidersHorizontal, 
//   X, 
//   Grid3X3, 
//   LayoutList,
//   AlertCircle,
//   RefreshCw,
//   ArrowUp,
//   ArrowDown,
//   ArrowUpDown
// } from "lucide-react";

// export default function CategoryPage() {
//   const { category } = useParams();
//   const router = useRouter();
//   const { isAuthenticated, userType } = useAuth();
  
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [priceRange, setPriceRange] = useState([0, 1000]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [viewMode, setViewMode] = useState("list"); // grid or list
//   const [sortOption, setSortOption] = useState("featured"); // featured, price-low, price-high, newest
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
//   const [activeFilters, setActiveFilters] = useState([]);
//   const [showScrollTop, setShowScrollTop] = useState(false);
  
//   // Detect scroll position for "back to top" button
//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScrollTop(window.scrollY > 500);
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };
  
//   // Fetch products based on category, page, price filter, sorting
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
      
//       try {
//         let url = `/api/products?category=${encodeURIComponent(category)}&page=${currentPage}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&sort=${sortOption}`;
        
//         if (searchTerm) {
//           url = `/api/products/search?term=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(category)}&page=${currentPage}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&sort=${sortOption}`;
//         }
        
//         const response = await fetch(url);
//         const data = await response.json();
        
//         setProducts(data.products || []); // Ensure this doesn't break if products is undefined
//         setTotalPages(data.totalPages || 1); // Ensure this doesn't break if totalPages is undefined
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         // For demo purposes, you might want to add mock data here
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchProducts();
//   }, [category, currentPage, priceRange, searchTerm, sortOption]);
  
//   // Update active filters
//   useEffect(() => {
//     const filters = [];
    
//     if (priceRange[0] > 0 || priceRange[1] < 1000) {
//       filters.push({
//         type: 'price',
//         label: `$${priceRange[0]} - $${priceRange[1]}`,
//         onRemove: () => setPriceRange([0, 1000])
//       });
//     }
    
//     if (searchTerm) {
//       filters.push({
//         type: 'search',
//         label: `"${searchTerm}"`,
//         onRemove: () => setSearchTerm('')
//       });
//     }
    
//     setActiveFilters(filters);
//   }, [priceRange, searchTerm]);
  
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };
  
//   const handlePriceChange = (newRange) => {
//     setPriceRange(newRange);
//     setCurrentPage(1);
//   };
  
//   const handleCategoryChange = (newCategory) => {
//     router.push(`/product/category/${newCategory}`);
//   };
  
//   const handleSearch = (term) => {
//     setSearchTerm(term);
//     setCurrentPage(1);
//   };
  
//   const handleSortChange = (option) => {
//     setSortOption(option);
//     setCurrentPage(1);
//   };
  
//   const clearAllFilters = () => {
//     setPriceRange([0, 1000]);
//     setSearchTerm("");
//     setCurrentPage(1);
//   };
  
//   // Calculate proper grid column count based on view mode
//   const gridColsClass = viewMode === "grid" 
//     ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
//     : "grid-cols-1 gap-6";
  
//   const formatCategoryName = (cat) => {
//     return cat.replace(/-/g, " ");
//   };

//   // Sort icon based on current sort option
//   const getSortIcon = () => {
//     if (sortOption === 'price-low') return <ArrowUp size={16} />;
//     if (sortOption === 'price-high') return <ArrowDown size={16} />;
//     return <ArrowUpDown size={16} />;
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Mobile sidebar backdrop */}
//       {mobileSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-60 z-50 md:hidden backdrop-blur-sm transition-all duration-300"
//           onClick={() => setMobileSidebarOpen(false)}
//         />
//       )}
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Breadcrumb */}
//         <nav className="flex items-center text-sm text-gray-500 mb-6">
//           <a href="/" className="hover:text-indigo-600 transition-colors">Home</a>
//           <ChevronRight size={16} className="mx-2 text-gray-400" />
//           <a href="/products" className="hover:text-indigo-600 transition-colors">Products</a>
//           <ChevronRight size={16} className="mx-2 text-gray-400" />
//           <span className="font-medium text-indigo-600 capitalize">{formatCategoryName(category)}</span>
//         </nav>
        
//         {/* Page Header */}
//         <div className="mb-8 border-b border-gray-200 pb-6">
//           <h1 className="text-3xl font-bold mb-3 capitalize text-gray-900 flex items-center">
//             <span className="bg-indigo-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
//               <span className="text-indigo-600 text-lg font-bold">{formatCategoryName(category).charAt(0).toUpperCase()}</span>
//             </span>
//             {formatCategoryName(category)}
//           </h1>
//           <p className="text-gray-600 max-w-3xl">Browse our collection of premium {formatCategoryName(category)} products. All items are carefully selected for quality and performance.</p>
//         </div>
        
//         {/* Main Content Area */}
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar container - Fixed height with internal scrolling */}
//           <aside className="lg:w-1/4 w-full lg:sticky lg:top-4 lg:self-start">
//             {/* Mobile Sidebar - Outside viewport when closed */}
//             <div 
//               className={`
//                 fixed top-0 left-0 h-full z-50 w-4/5 max-w-xs
//                 transform transition-transform duration-300 ease-in-out 
//                 ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
//                 lg:hidden
//               `}
//             >
//               <Sidebar 
//                 currentCategory={category}
//                 onCategoryChange={handleCategoryChange}
//                 priceRange={priceRange}
//                 onPriceChange={handlePriceChange}
//                 onClose={() => setMobileSidebarOpen(false)}
//                 isMobile={true}
//               />
//             </div>
            
//             {/* Desktop Sidebar - Always visible */}
//             <div className="hidden lg:block h-auto sticky top-4">
//               <Sidebar 
//                 currentCategory={category}
//                 onCategoryChange={handleCategoryChange}
//                 priceRange={priceRange}
//                 onPriceChange={handlePriceChange}
//                 onClose={() => {}}
//                 isMobile={false}
//               />
//             </div>
//           </aside>
          
//           {/* Product Grid Area */}
//           <main className="lg:w-3/4 w-full">
//             {/* Search and Filters Section */}
//             <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 mb-6">
//               <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-gray-50">
//                 <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
//               </div>
              
//               {/* Mobile filter button and active filters */}
//               <div className="p-5">
//                 <div className="lg:hidden mb-4">
//                   <button 
//                     onClick={() => setMobileSidebarOpen(true)}
//                     className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 py-3 px-4 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors shadow-sm"
//                   >
//                     <Filter size={18} />
//                     <span className="font-medium">Filter Products</span>
//                   </button>
//                 </div>
            
//                 {/* Active Filters */}
//                 {activeFilters.length > 0 && (
//                   <div>
//                     <div className="flex flex-wrap items-center gap-2">
//                       <span className="text-sm font-medium text-gray-700">Active Filters:</span>
//                       {activeFilters.map((filter, index) => (
//                         <div 
//                           key={index}
//                           className="flex items-center bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-sm shadow-sm"
//                         >
//                           {filter.label}
//                           <button 
//                             onClick={filter.onRemove}
//                             className="ml-2 text-indigo-600 hover:text-indigo-800 bg-indigo-100 rounded-full w-4 h-4 flex items-center justify-center"
//                           >
//                             <X size={12} />
//                           </button>
//                         </div>
//                       ))}
                      
//                       <button 
//                         onClick={clearAllFilters}
//                         className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline ml-2 flex items-center gap-1"
//                       >
//                         <RefreshCw size={14} />
//                         Clear All
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
              
//               {/* Sorting and View Options */}
//               <div className="bg-gray-50 p-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                 <div className="text-sm text-gray-600 font-medium">
//                   {loading 
//                     ? 'Loading products...' 
//                     : products.length === 0 
//                       ? 'No products found' 
//                       : `Showing ${products.length} ${products.length === 1 ? 'product' : 'products'}`
//                   }
//                 </div>
                
//                 <div className="flex flex-wrap gap-3 items-center">
//                   {/* Sort dropdown */}
//                   <div className="relative">
//                     <div className="flex items-center">
//                       <label htmlFor="sort-select" className="text-sm text-gray-600 mr-2 hidden sm:inline-block">Sort by:</label>
//                       <div className="relative">
//                         <select
//                           id="sort-select"
//                           value={sortOption}
//                           onChange={(e) => handleSortChange(e.target.value)}
//                           className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
//                         >
//                           <option value="featured">Featured</option>
//                           <option value="price-low">Price: Low to High</option>
//                           <option value="price-high">Price: High to Low</option>
//                           <option value="newest">Newest First</option>
//                         </select>
//                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
//                           {getSortIcon()}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   {/* View mode toggle */}
//                   <div className="flex border border-gray-300 rounded-lg overflow-hidden shadow-sm">
//                     <button
//                       onClick={() => setViewMode("grid")}
//                       className={`flex items-center justify-center p-2 ${
//                         viewMode === "grid" 
//                           ? "bg-indigo-500 text-white border-r border-indigo-600" 
//                           : "bg-white text-gray-600 hover:bg-gray-50 border-r border-gray-300"
//                       } transition-colors duration-200`}
//                       aria-label="Grid view"
//                     >
//                       <Grid3X3 size={16} />
//                     </button>
//                     <button
//                       onClick={() => setViewMode("list")}
//                       className={`flex items-center justify-center p-2 ${
//                         viewMode === "list" 
//                           ? "bg-indigo-500 text-white" 
//                           : "bg-white text-gray-600 hover:bg-gray-50"
//                       } transition-colors duration-200`}
//                       aria-label="List view"
//                     >
//                       <LayoutList size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Products Display */}
//             {loading ? (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                   {Array(8).fill().map((_, index) => (
//                     <div key={index} className="animate-pulse">
//                       <div className="bg-gray-200 aspect-square rounded-lg mb-3"></div>
//                       <div className="h-4 bg-gray-200 rounded-lg w-3/4 mb-2"></div>
//                       <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ) : products.length > 0 ? (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//                 <div className={`grid ${gridColsClass}`}>
//                   {products.map((product) => (
//                     <ProductCard 
//                       key={product.id} 
//                       product={product} 
//                       isAuthenticated={isAuthenticated}
//                       viewMode={viewMode}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
//                 <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                   <AlertCircle className="h-8 w-8 text-gray-400" />
//                 </div>
//                 <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
//                 <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
//                 <button
//                   onClick={clearAllFilters}
//                   className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm hover:shadow"
//                 >
//                   <RefreshCw size={16} className="mr-2" />
//                   Clear All Filters
//                 </button>
//               </div>
//             )}
            
//             {/* Pagination */}
//             {products.length > 0 && !loading && (
//               <div className="mt-8">
//                 <Pagination 
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                   onPageChange={handlePageChange}
//                 />
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
      
//       {/* Scroll to top button */}
//       {showScrollTop && (
//         <button
//           onClick={scrollToTop}
//           className="fixed bottom-6 right-6 bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all duration-300 z-20"
//           aria-label="Scroll to top"
//         >
//           <ArrowUp size={20} />
//         </button>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/context/authContext";
import Sidebar from "@/components/category/Sidebar";
import ProductCard from "@/components/category/ProductCart";
import SearchBar from "@/components/category/SearchBar";
import Pagination from "@/components/category/Pagination";
import { 
  ChevronRight, 
  Filter, 
  SlidersHorizontal, 
  X, 
  Grid3X3, 
  LayoutList,
  AlertCircle,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  ArrowUpDown
} from "lucide-react";

export default function CategoryPage() {
  const { category } = useParams();
  const router = useRouter();
  const { isAuthenticated, userType } = useAuth();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("list"); // grid or list
  const [sortOption, setSortOption] = useState("featured"); // featured, price-low, price-high, newest
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Detect scroll position for "back to top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Fetch products based on category, page, price filter, sorting
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      try {
        let url = `/api/products?category=${encodeURIComponent(category)}&page=${currentPage}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&sort=${sortOption}`;
        
        if (searchTerm) {
          url = `/api/products/search?term=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(category)}&page=${currentPage}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&sort=${sortOption}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        setProducts(data.products || []); // Ensure this doesn't break if products is undefined
        setTotalPages(data.totalPages || 1); // Ensure this doesn't break if totalPages is undefined
      } catch (error) {
        console.error("Error fetching products:", error);
        // For demo purposes, you might want to add mock data here
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [category, currentPage, priceRange, searchTerm, sortOption]);
  
  // Update active filters
  useEffect(() => {
    const filters = [];
    
    if (priceRange[0] > 0 || priceRange[1] < 1000) {
      filters.push({
        type: 'price',
        label: `$${priceRange[0]} - $${priceRange[1]}`,
        onRemove: () => setPriceRange([0, 1000])
      });
    }
    
    if (searchTerm) {
      filters.push({
        type: 'search',
        label: `"${searchTerm}"`,
        onRemove: () => setSearchTerm('')
      });
    }
    
    setActiveFilters(filters);
  }, [priceRange, searchTerm]);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
    setCurrentPage(1);
  };
  
  const handleCategoryChange = (newCategory) => {
    router.push(`/product/category/${newCategory}`);
  };
  
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  
  const handleSortChange = (option) => {
    setSortOption(option);
    setCurrentPage(1);
  };
  
  const clearAllFilters = () => {
    setPriceRange([0, 1000]);
    setSearchTerm("");
    setCurrentPage(1);
  };
  
  // Calculate proper grid column count based on view mode
  const gridColsClass = viewMode === "grid" 
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
    : "grid-cols-1 gap-6";
  
  const formatCategoryName = (cat) => {
    return cat.replace(/-/g, " ");
  };

  // Sort icon based on current sort option
  const getSortIcon = () => {
    if (sortOption === 'price-low') return <ArrowUp size={16} />;
    if (sortOption === 'price-high') return <ArrowDown size={16} />;
    return <ArrowUpDown size={16} />;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Mobile sidebar backdrop */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-50 md:hidden transition-all duration-300"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-500 mb-6">
          <a href="/" className="hover:text-red-500 transition-colors">Home</a>
          <ChevronRight size={14} className="mx-2 text-gray-400" />
          <a href="/products/all" className="hover:text-red-500 transition-colors">Products</a>
          <ChevronRight size={14} className="mx-2 text-gray-400" />
          <span className="font-medium text-gray-900 capitalize">{formatCategoryName(category)}</span>
        </nav>
        
        {/* Page Header */}
        <div className="mb-8 border-b border-gray-100 pb-6">
          <h1 className="text-2xl font-medium mb-3 capitalize text-gray-900 flex items-center">
            <span className="bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
              <span className="text-gray-700 text-lg font-medium">{formatCategoryName(category).charAt(0).toUpperCase()}</span>
            </span>
            {formatCategoryName(category)}
          </h1>
          <p className="text-sm text-gray-600 max-w-3xl">Browse our collection of premium {formatCategoryName(category)} products. All items are carefully selected for quality and performance.</p>
        </div>
        
        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar container - Fixed height with internal scrolling */}
          <aside className="lg:w-1/4 w-full lg:sticky lg:top-4 lg:self-start">
            {/* Mobile Sidebar - Outside viewport when closed */}
            <div 
              className={`
                fixed top-0 left-0 h-full z-50 w-4/5 max-w-xs
                transform transition-transform duration-300 ease-in-out 
                ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                lg:hidden
              `}
            >
              <Sidebar 
                currentCategory={category}
                onCategoryChange={handleCategoryChange}
                priceRange={priceRange}
                onPriceChange={handlePriceChange}
                onClose={() => setMobileSidebarOpen(false)}
                isMobile={true}
              />
            </div>
            
            {/* Desktop Sidebar - Always visible */}
            <div className="hidden lg:block h-auto sticky top-4">
              <Sidebar 
                currentCategory={category}
                onCategoryChange={handleCategoryChange}
                priceRange={priceRange}
                onPriceChange={handlePriceChange}
                onClose={() => {}}
                isMobile={false}
              />
            </div>
          </aside>
          
          {/* Product Grid Area */}
          <main className="lg:w-3/4 w-full">
            {/* Search and Filters Section */}
            <div className="bg-white border border-gray-100 mb-6">
              <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
              </div>
              
              {/* Mobile filter button and active filters */}
              <div className="p-5">
                <div className="lg:hidden mb-4">
                  <button 
                    onClick={() => setMobileSidebarOpen(true)}
                    className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 px-4 hover:bg-gray-900 transition-colors text-xs"
                  >
                    <Filter size={16} />
                    <span className="font-medium">Filter Products</span>
                  </button>
                </div>
            
                {/* Active Filters */}
                {activeFilters.length > 0 && (
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium text-gray-700">Active Filters:</span>
                      {activeFilters.map((filter, index) => (
                        <div 
                          key={index}
                          className="flex items-center bg-gray-100 text-gray-700 px-3 py-1.5 rounded-sm text-xs"
                        >
                          {filter.label}
                          <button 
                            onClick={filter.onRemove}
                            className="ml-2 text-gray-600 hover:text-gray-900 bg-gray-200 rounded-full w-4 h-4 flex items-center justify-center"
                          >
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                      
                      <button 
                        onClick={clearAllFilters}
                        className="text-xs text-red-500 hover:text-red-700 hover:underline ml-2 flex items-center gap-1"
                      >
                        <RefreshCw size={12} />
                        Clear All
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Sorting and View Options */}
              <div className="bg-gray-50 p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-xs text-gray-600 font-medium">
                  {loading 
                    ? 'Loading products...' 
                    : products.length === 0 
                      ? 'No products found' 
                      : `Showing ${products.length} ${products.length === 1 ? 'product' : 'products'}`
                  }
                </div>
                
                <div className="flex flex-wrap gap-3 items-center">
                  {/* Sort dropdown */}
                  <div className="relative">
                    <div className="flex items-center">
                      <label htmlFor="sort-select" className="text-xs text-gray-600 mr-2 hidden sm:inline-block">Sort by:</label>
                      <div className="relative">
                        <select
                          id="sort-select"
                          value={sortOption}
                          onChange={(e) => handleSortChange(e.target.value)}
                          className="appearance-none bg-white border border-gray-300 rounded text-xs px-3 py-2 pr-8 focus:outline-none"
                        >
                          <option value="featured">Featured</option>
                          <option value="price-low">Price: Low to High</option>
                          <option value="price-high">Price: High to Low</option>
                          <option value="newest">Newest First</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                          {getSortIcon()}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* View mode toggle */}
                  <div className="flex border border-gray-300 overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`flex items-center justify-center p-2 ${
                        viewMode === "grid" 
                          ? "bg-black text-white" 
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      } transition-colors duration-200`}
                      aria-label="Grid view"
                    >
                      <Grid3X3 size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`flex items-center justify-center p-2 ${
                        viewMode === "list" 
                          ? "bg-black text-white" 
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      } transition-colors duration-200`}
                      aria-label="List view"
                    >
                      <LayoutList size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products Display */}
            {loading ? (
              <div className="bg-white border border-gray-100 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array(8).fill().map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-100 aspect-square mb-3"></div>
                      <div className="h-4 bg-gray-100 w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-100 w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : products.length > 0 ? (
              <div className="bg-white border border-gray-100 p-6">
                <div className={`grid ${gridColsClass}`}>
                  {products.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      isAuthenticated={isAuthenticated}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-100 p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6 text-sm">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center px-5 py-2.5 bg-black text-white hover:bg-gray-900 transition-colors text-xs font-medium"
                >
                  <RefreshCw size={14} className="mr-2" />
                  Clear All Filters
                </button>
              </div>
            )}
            
            {/* Pagination */}
            {products.length > 0 && !loading && (
              <div className="mt-8">
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </main>
        </div>
      </div>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-black text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-900 transition-all duration-300 z-20"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}