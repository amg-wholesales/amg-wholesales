"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/category/ProductCart";
import { useAuth } from "@/context/authContext";
import { 
  ChevronRight, 
  ArrowRight, 
  ArrowLeft, 
  Mail, 
  ShoppingBag,
  Clock,
  Star,
  Tag,
  TrendingUp,
  Sparkles
} from "lucide-react";

// Hero slider images
const heroImages = [
  "/home/CIGAR-DEAL-APRIL-2025-v02-6.jpg",
  "/home/MONTECRISTO-WHITE-v01-2.jpg",
  "/home/rocky-patel-v001-6.jpg",
  // You can add more hero images here
];

// Featured categories
const categories = [
  { name: "Glass Pipes", icon: "🔍", slug: "glass-pipes" },
  { name: "Hookahs", icon: "💨", slug: "hookahs" },
  { name: "Cigar", icon: "🚬", slug: "cigar" },
  { name: "Grinders", icon: "⚙️", slug: "grinders" },
  { name: "Lighters", icon: "🔥", slug: "lighters" },
  { name: "Accessories", icon: "🧰", slug: "cigar-accessories" },
];



export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState({
    featuredProducts: [],
    bestSellers: [],
    newArrivals: [],
    onSale: []
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState("");
  
  // Fetch homepage data
  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/homepage');
        if (!response.ok) {
          throw new Error('Failed to fetch homepage data');
        }
        const data = await response.json();
        setHomeData(data);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
        // Set empty arrays as fallback
        setHomeData({
          featuredProducts: [],
          bestSellers: [],
          newArrivals: [],
          onSale: []
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchHomeData();
  }, []);
  
  // Hero slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription logic
    alert(`Subscribed with email: ${email}`);
    setEmail("");
  };
  
  // Product section component
  const ProductSection = ({ title, products, viewAllLink, icon, emptyMessage }) => {
    if (loading) {
      return (
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {icon}
              {title}
            </h2>
            <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
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
      );
    }
    
    if (!products || products.length === 0) {
      return (
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {icon}
              {title}
            </h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-500">{emptyMessage || "No products available in this category."}</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="mb-16">
        <div className="flex justify-end items-center mb-6 pr-4">
          <Link 
            href={viewAllLink} 
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
          >
            View All <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isAuthenticated={isAuthenticated}
              viewMode="grid"
            />
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
          {heroImages.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image}
                alt={`Hero slide ${index + 1}`}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>
          ))}
          
          {/* Hero content overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center justify-center">
            <div className="container mx-auto flex justify-center items-center">
              <button 
                onClick={() => router.push('/product/category/all')}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition shadow-lg hover:shadow-xl"
                style={{ marginTop: '4rem' }}
              >
                View All Products
              </button>
            </div>
          </div>
          {/* Slider controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition"
            aria-label="Previous slide"
          >
            <ArrowLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition"
            aria-label="Next slide"
          >
            <ArrowRight size={24} />
          </button>
          
          {/* Slide indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Shop by Category Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.slug} href={`/product/category/${category.slug}`}>
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 text-center border border-gray-200 h-full flex flex-col items-center justify-center">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Featured Products Section */}
        <ProductSection 
          title="Featured Products" 
          products={homeData.featuredProducts}
          viewAllLink="/products/category/featured-products"
          icon={<Star className="w-6 h-6 text-amber-500" />}
          emptyMessage="Featured products coming soon!"
        />
        

        {/* Promotional Banner 1 */}
        <div className="h-64 mb-16 bg-[url('/home/Website-Banner03-4.jpg')] bg-cover bg-center rounded-xl overflow-hidden" onClick={() => router.push('/product/category/all')}></div>
        
      
        

       
        <div className="w-full md:mb-16">
  {/* Mobile image (hidden on md screens and larger) */}
  <img 
    src="/home/New-Project-2024-07-10T220546.792mobile.jpg" 
    alt="Best Sellers Banner" 
    className="w-full block md:hidden"
  />
  
  {/* Desktop image (hidden on smaller than md screens) */}
  <img 
    src="/home/label-banner-2-3.jpg" 
    alt="Best Sellers Banner" 
    className="w-full hidden md:block md:object-cover"
  />
</div>

        <ProductSection 
          title="Best Sellers" 
          products={homeData.bestSellers}
          viewAllLink="/products/category/best-sellers"
          icon={<TrendingUp className="w-6 h-6 text-green-500" />}
          emptyMessage="Best sellers will be updated soon!"
        />
     

        
<div className="w-full md:mb-16">
  {/* Mobile image (hidden on md screens and larger) */}
  <img 
    src="/home/New-Project-bannerr-mobile-768x54.jpg" 
    alt="Best Sellers Banner" 
    className="w-full block md:hidden"
  />
  
  {/* Desktop image (hidden on smaller than md screens) */}
  <img 
    src="/home/New-Arriaval-Banner-1.png" 
    alt="Best Sellers Banner" 
    className="w-full hidden md:block md:object-cover"
  />
</div>
        
        {/* New Arrivals Section */}
        <ProductSection 
          title="New Arrivals" 
          products={homeData.newArrivals}
          viewAllLink="/product/category/new-arrivals"
          icon={<Sparkles className="w-6 h-6 text-blue-500" />}
          emptyMessage="New products coming soon!"
        />
        
        {/* Promotional Banner 2 */}
        {/* <div className="mb-16 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Free Shipping on Orders Over $50</h2>
              <p className="text-gray-600 mb-6">Enjoy free standard shipping on all orders over $50. Shop now and save!</p>
              <div>
                <button 
                  onClick={() => router.push('/products')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition shadow-sm"
                >
                  Browse Products
                </button>
              </div>
            </div>
            <div className="bg-indigo-50 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="text-7xl mb-4">🚚</div>
                <p className="text-indigo-700 font-bold">Fast & Reliable Delivery</p>
              </div>
            </div>
          </div>
        </div> */}
        
        {/* <div className="w-full md:mb-16">
          <img src="/home/sale-banner-5.jpg" alt="Best Sellers Banner" className="w-full md:object-cover"/>
        </div> */}

<div className="w-full md:mb-16">
  {/* Mobile image (hidden on md screens and larger) */}
  <img 
    src="/home/New-Project-2024-07-12T154019.979mobile-768x54.jpg" 
    alt="Best Sellers Banner" 
    className="w-full block md:hidden"
  />
  
  {/* Desktop image (hidden on smaller than md screens) */}
  <img 
    src="/home/sale-banner-5.jpg" 
    alt="Best Sellers Banner" 
    className="w-full hidden md:block md:object-cover"
  />
</div>
        {/* On Sale Section */}
        <ProductSection 
          title="On Sale" 
          products={homeData.onSale}
          viewAllLink="/productscategory/on-sale"
          icon={<Tag className="w-6 h-6 text-red-500" />}
          emptyMessage="No sale items at the moment. Check back soon!"
        />
        
        {/* Newsletter Section */}
        {/* <div className="mb-16 bg-gray-900 rounded-xl overflow-hidden">
          <div className="px-6 py-12 md:px-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Subscribe to Our Newsletter</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Stay updated with our latest products, exclusive offers, and promotions.</p>
            
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-600 rounded-l-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-r-lg transition whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-gray-400 text-sm mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}