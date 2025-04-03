
"use client";

import { useEffect, useState } from "react";
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
  RefreshCw
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
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortOption, setSortOption] = useState("featured"); // featured, price-low, price-high, newest
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  
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

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Mobile sidebar backdrop */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-indigo-600 transition-colors">Home</a>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <a href="/products" className="hover:text-indigo-600 transition-colors">Products</a>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <span className="font-medium text-gray-800 capitalize">{formatCategoryName(category)}</span>
        </nav>
        
        {/* Page Header */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold mb-3 capitalize text-gray-900">{formatCategoryName(category)}</h1>
          <p className="text-gray-600 max-w-3xl">Browse our collection of premium {formatCategoryName(category)} products. All items are carefully selected for quality and performance.</p>
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
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 mb-6">
              <div className="p-5 border-b border-gray-200">
                <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
              </div>
              
              {/* Mobile filter button and active filters */}
              <div className="p-5">
                <div className="lg:hidden mb-4">
                  <button 
                    onClick={() => setMobileSidebarOpen(true)}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 py-3 px-4 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors"
                  >
                    <Filter size={18} />
                    <span className="font-medium">Filter Products</span>
                  </button>
                </div>
            
                {/* Active Filters */}
                {activeFilters.length > 0 && (
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">Active Filters:</span>
                      {activeFilters.map((filter, index) => (
                        <div 
                          key={index}
                          className="flex items-center bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-sm"
                        >
                          {filter.label}
                          <button 
                            onClick={filter.onRemove}
                            className="ml-2 text-indigo-600 hover:text-indigo-800"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                      
                      <button 
                        onClick={clearAllFilters}
                        className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline ml-2 flex items-center gap-1"
                      >
                        <RefreshCw size={14} />
                        Clear All
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Sorting and View Options */}
              <div className="bg-gray-50 p-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-sm text-gray-600">
                  {loading 
                    ? 'Loading products...' 
                    : products.length === 0 
                      ? 'No products found' 
                      : `Showing ${products.length} products`
                  }
                </div>
                
                <div className="flex flex-wrap gap-3 items-center">
                  {/* Sort dropdown */}
                  <div className="relative">
                    <select
                      value={sortOption}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest First</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <SlidersHorizontal size={16} />
                    </div>
                  </div>
                  
                  {/* View mode toggle */}
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`flex items-center justify-center p-2 ${
                        viewMode === "grid" 
                          ? "bg-indigo-50 text-indigo-600 border-r border-gray-300" 
                          : "bg-white text-gray-600 hover:bg-gray-50 border-r border-gray-300"
                      }`}
                      aria-label="Grid view"
                    >
                      <Grid3X3 size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`flex items-center justify-center p-2 ${
                        viewMode === "list" 
                          ? "bg-indigo-50 text-indigo-600" 
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
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
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array(8).fill().map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-200 aspect-square rounded-lg mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded-lg w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : products.length > 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm hover:shadow"
                >
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
    </div>
  );
}