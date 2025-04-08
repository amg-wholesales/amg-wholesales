// // // "use client";

// // // import { useState, useEffect } from "react";
// // // import { useRouter } from "next/navigation";
// // // import Image from "next/image";
// // // import Link from "next/link";
// // // import ProductCard from "@/components/category/ProductCart";
// // // import { useAuth } from "@/context/authContext";
// // // import { 
// // //   ChevronRight, 
// // //   ArrowRight, 
// // //   ArrowLeft, 
// // //   Mail, 
// // //   ShoppingBag,
// // //   Clock,
// // //   Star,
// // //   Tag,
// // //   TrendingUp,
// // //   Sparkles
// // // } from "lucide-react";

// // // // Hero slider images
// // // const heroImages = [
// // //   "/home/CIGAR-DEAL-APRIL-2025-v02-6.jpg",
// // //   "/home/MONTECRISTO-WHITE-v01-2.jpg",
// // //   "/home/rocky-patel-v001-6.jpg",
// // //   // You can add more hero images here
// // // ];

// // // // Featured categories
// // // const categories = [
// // //   { name: "Glass Pipes", icon: "🔍", slug: "glass-pipes" },
// // //   { name: "Hookahs", icon: "💨", slug: "hookahs" },
// // //   { name: "Cigar", icon: "🚬", slug: "cigar" },
// // //   { name: "Grinders", icon: "⚙️", slug: "grinders" },
// // //   { name: "Lighters", icon: "🔥", slug: "lighters" },
// // //   { name: "Accessories", icon: "🧰", slug: "cigar-accessories" },
// // // ];



// // // export default function HomePage() {
// // //   const router = useRouter();
// // //   const { isAuthenticated } = useAuth();
  
// // //   const [loading, setLoading] = useState(true);
// // //   const [homeData, setHomeData] = useState({
// // //     featuredProducts: [],
// // //     bestSellers: [],
// // //     newArrivals: [],
// // //     onSale: []
// // //   });
// // //   const [currentSlide, setCurrentSlide] = useState(0);
// // //   const [email, setEmail] = useState("");
  
// // //   // Fetch homepage data
// // //   useEffect(() => {
// // //     const fetchHomeData = async () => {
// // //       setLoading(true);
// // //       try {
// // //         const response = await fetch('/api/homepage');
// // //         if (!response.ok) {
// // //           throw new Error('Failed to fetch homepage data');
// // //         }
// // //         const data = await response.json();
// // //         setHomeData(data);
// // //       } catch (error) {
// // //         console.error("Error fetching homepage data:", error);
// // //         // Set empty arrays as fallback
// // //         setHomeData({
// // //           featuredProducts: [],
// // //           bestSellers: [],
// // //           newArrivals: [],
// // //           onSale: []
// // //         });
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
    
// // //     fetchHomeData();
// // //   }, []);
  
// // //   // Hero slider effect
// // //   useEffect(() => {
// // //     const interval = setInterval(() => {
// // //       setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
// // //     }, 5000);
    
// // //     return () => clearInterval(interval);
// // //   }, []);
  
// // //   const nextSlide = () => {
// // //     setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
// // //   };
  
// // //   const prevSlide = () => {
// // //     setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
// // //   };
  
// // //   const handleSubscribe = (e) => {
// // //     e.preventDefault();
// // //     // Handle newsletter subscription logic
// // //     alert(`Subscribed with email: ${email}`);
// // //     setEmail("");
// // //   };
  
// // //   // Product section component
// // //   const ProductSection = ({ title, products, viewAllLink, icon, emptyMessage }) => {
// // //     if (loading) {
// // //       return (
// // //         <div className="mb-16">
// // //           <div className="flex justify-between items-center mb-6">
// // //             <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
// // //               {icon}
// // //               {title}
// // //             </h2>
// // //             <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
// // //           </div>
// // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// // //             {Array(8).fill().map((_, index) => (
// // //               <div key={index} className="animate-pulse">
// // //                 <div className="bg-gray-200 aspect-square rounded-lg mb-3"></div>
// // //                 <div className="h-4 bg-gray-200 rounded-lg w-3/4 mb-2"></div>
// // //                 <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       );
// // //     }
    
// // //     if (!products || products.length === 0) {
// // //       return (
// // //         <div className="mb-16">
// // //           <div className="flex justify-between items-center mb-6">
// // //             <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
// // //               {icon}
// // //               {title}
// // //             </h2>
// // //           </div>
// // //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
// // //             <p className="text-gray-500">{emptyMessage || "No products available in this category."}</p>
// // //           </div>
// // //         </div>
// // //       );
// // //     }
    
// // //     return (
// // //       <div className="mb-16">
// // //         <div className="flex justify-end items-center mb-6 pr-4">
// // //           <Link 
// // //             href={viewAllLink} 
// // //             className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
// // //           >
// // //             View All <ChevronRight size={16} className="ml-1" />
// // //           </Link>
// // //         </div>
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// // //           {products.slice(0, 8).map((product) => (
// // //             <ProductCard 
// // //               key={product.id} 
// // //               product={product} 
// // //               isAuthenticated={isAuthenticated}
// // //               viewMode="grid"
// // //             />
// // //           ))}
// // //         </div>
// // //       </div>
// // //     );
// // //   };
  
// // //   return (
// // //     <div className="bg-gray-50 min-h-screen">
// // //       {/* Hero Section */}
// // //       <div className="relative overflow-hidden bg-white">
// // //         <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
// // //           {heroImages.map((image, index) => (
// // //             <div 
// // //               key={index}
// // //               className={`absolute inset-0 transition-opacity duration-1000 ${
// // //                 index === currentSlide ? "opacity-100" : "opacity-0"
// // //               }`}
// // //             >
// // //               <img
// // //                 src={image}
// // //                 alt={`Hero slide ${index + 1}`}
// // //                 fill
// // //                 priority
// // //                 sizes="100vw"
// // //                 className="object-contain"
// // //               />
// // //             </div>
// // //           ))}
          
// // //           {/* Hero content overlay */}
// // //           <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center justify-center">
// // //             <div className="container mx-auto flex justify-center items-center">
// // //               <button 
// // //                 onClick={() => router.push('/product/category/all')}
// // //                 className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition shadow-lg hover:shadow-xl"
// // //                 style={{ marginTop: '4rem' }}
// // //               >
// // //                 View All Products
// // //               </button>
// // //             </div>
// // //           </div>
// // //           {/* Slider controls */}
// // //           <button 
// // //             onClick={prevSlide}
// // //             className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition"
// // //             aria-label="Previous slide"
// // //           >
// // //             <ArrowLeft size={24} />
// // //           </button>
// // //           <button 
// // //             onClick={nextSlide}
// // //             className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition"
// // //             aria-label="Next slide"
// // //           >
// // //             <ArrowRight size={24} />
// // //           </button>
          
// // //           {/* Slide indicators */}
// // //           <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
// // //             {heroImages.map((_, index) => (
// // //               <button
// // //                 key={index}
// // //                 onClick={() => setCurrentSlide(index)}
// // //                 className={`w-3 h-3 rounded-full transition-colors ${
// // //                   index === currentSlide ? "bg-white" : "bg-white/40 hover:bg-white/60"
// // //                 }`}
// // //                 aria-label={`Go to slide ${index + 1}`}
// // //               />
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </div>
      
// // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // //         {/* Shop by Category Section */}
// // //         <div className="mb-16">
// // //           <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Category</h2>
// // //           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
// // //             {categories.map((category) => (
// // //               <Link key={category.slug} href={`/product/category/${category.slug}`}>
// // //                 <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 text-center border border-gray-200 h-full flex flex-col items-center justify-center">
// // //                   <div className="text-3xl mb-3">{category.icon}</div>
// // //                   <h3 className="font-medium text-gray-900">{category.name}</h3>
// // //                 </div>
// // //               </Link>
// // //             ))}
// // //           </div>
// // //         </div>
        
// // //         {/* Featured Products Section */}
// // //         <ProductSection 
// // //           title="Featured Products" 
// // //           products={homeData.featuredProducts}
// // //           viewAllLink="/products/category/featured-products"
// // //           icon={<Star className="w-6 h-6 text-amber-500" />}
// // //           emptyMessage="Featured products coming soon!"
// // //         />
        

// // //         {/* Promotional Banner 1 */}
// // //         <div className="h-64 mb-16 bg-[url('/home/Website-Banner03-4.jpg')] bg-cover bg-center rounded-xl overflow-hidden" onClick={() => router.push('/product/category/all')}></div>
        
      
        

       
// // //         <div className="w-full md:mb-16">
// // //   {/* Mobile image (hidden on md screens and larger) */}
// // //   <img 
// // //     src="/home/New-Project-2024-07-10T220546.792mobile.jpg" 
// // //     alt="Best Sellers Banner" 
// // //     className="w-full block md:hidden"
// // //   />
  
// // //   {/* Desktop image (hidden on smaller than md screens) */}
// // //   <img 
// // //     src="/home/label-banner-2-3.jpg" 
// // //     alt="Best Sellers Banner" 
// // //     className="w-full hidden md:block md:object-cover"
// // //   />
// // // </div>

// // //         <ProductSection 
// // //           title="Best Sellers" 
// // //           products={homeData.bestSellers}
// // //           viewAllLink="/products/category/best-sellers"
// // //           icon={<TrendingUp className="w-6 h-6 text-green-500" />}
// // //           emptyMessage="Best sellers will be updated soon!"
// // //         />
     

        
// // // <div className="w-full md:mb-16">
// // //   {/* Mobile image (hidden on md screens and larger) */}
// // //   <img 
// // //     src="/home/New-Project-bannerr-mobile-768x54.jpg" 
// // //     alt="Best Sellers Banner" 
// // //     className="w-full block md:hidden"
// // //   />
  
// // //   {/* Desktop image (hidden on smaller than md screens) */}
// // //   <img 
// // //     src="/home/New-Arriaval-Banner-1.png" 
// // //     alt="Best Sellers Banner" 
// // //     className="w-full hidden md:block md:object-cover"
// // //   />
// // // </div>
        
// // //         {/* New Arrivals Section */}
// // //         <ProductSection 
// // //           title="New Arrivals" 
// // //           products={homeData.newArrivals}
// // //           viewAllLink="/product/category/new-arrivals"
// // //           icon={<Sparkles className="w-6 h-6 text-blue-500" />}
// // //           emptyMessage="New products coming soon!"
// // //         />
        
     

// // // <div className="w-full md:mb-16">
// // //   {/* Mobile image (hidden on md screens and larger) */}
// // //   <img 
// // //     src="/home/New-Project-2024-07-12T154019.979mobile-768x54.jpg" 
// // //     alt="Best Sellers Banner" 
// // //     className="w-full block md:hidden"
// // //   />
  
// // //   {/* Desktop image (hidden on smaller than md screens) */}
// // //   <img 
// // //     src="/home/sale-banner-5.jpg" 
// // //     alt="Best Sellers Banner" 
// // //     className="w-full hidden md:block md:object-cover"
// // //   />
// // // </div>
// // //         {/* On Sale Section */}
// // //         <ProductSection 
// // //           title="On Sale" 
// // //           products={homeData.onSale}
// // //           viewAllLink="/productscategory/on-sale"
// // //           icon={<Tag className="w-6 h-6 text-red-500" />}
// // //           emptyMessage="No sale items at the moment. Check back soon!"
// // //         />
        
      
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // "use client";

// // import { useState, useEffect } from "react";
// // import { useRouter } from "next/navigation";
// // import Image from "next/image";
// // import Link from "next/link";
// // import ProductCard from "@/components/category/ProductCart";
// // import { useAuth } from "@/context/authContext";
// // import { 
// //   ChevronRight, 
// //   ArrowRight, 
// //   ArrowLeft, 
// //   Mail, 
// //   ShoppingBag,
// //   Clock,
// //   Star,
// //   Tag,
// //   TrendingUp,
// //   Sparkles,
// //   ChevronDown,
// //   Shield
// // } from "lucide-react";

// // // Hero slider images
// // const heroImages = [
// //   "/home/CIGAR-DEAL-APRIL-2025-v02-6.jpg",
// //   "/home/MONTECRISTO-WHITE-v01-2.jpg",
// //   "/home/rocky-patel-v001-6.jpg",
// //   // You can add more hero images here
// // ];

// // // Featured categories with enhanced icons and descriptions
// // const categories = [
// //   { 
// //     name: "Glass Pipes", 
// //     icon: "🔍", 
// //     slug: "glass-pipes",
// //     description: "Premium handcrafted glass pipes"
// //   },
// //   { 
// //     name: "Hookahs", 
// //     icon: "💨", 
// //     slug: "hookahs",
// //     description: "Traditional & modern hookahs"
// //   },
// //   { 
// //     name: "Cigars", 
// //     icon: "🚬", 
// //     slug: "cigar",
// //     description: "Fine hand-rolled cigars"
// //   },
// //   { 
// //     name: "Grinders", 
// //     icon: "⚙️", 
// //     slug: "grinders",
// //     description: "Precision engineered grinders"
// //   },
// //   { 
// //     name: "Lighters", 
// //     icon: "🔥", 
// //     slug: "lighters",
// //     description: "Premium torch & soft flame lighters"
// //   },
// //   { 
// //     name: "Accessories", 
// //     icon: "🧰", 
// //     slug: "cigar-accessories",
// //     description: "Essential accessories for enthusiasts"
// //   },
// // ];

// // export default function HomePage() {
// //   const router = useRouter();
// //   const { isAuthenticated } = useAuth();
  
// //   const [loading, setLoading] = useState(true);
// //   const [homeData, setHomeData] = useState({
// //     featuredProducts: [],
// //     bestSellers: [],
// //     newArrivals: [],
// //     onSale: []
// //   });
// //   const [currentSlide, setCurrentSlide] = useState(0);
// //   const [email, setEmail] = useState("");
// //   const [isScrolled, setIsScrolled] = useState(false);
  
// //   // Fetch homepage data
// //   useEffect(() => {
// //     const fetchHomeData = async () => {
// //       setLoading(true);
// //       try {
// //         const response = await fetch('/api/homepage');
// //         if (!response.ok) {
// //           throw new Error('Failed to fetch homepage data');
// //         }
// //         const data = await response.json();
// //         setHomeData(data);
// //       } catch (error) {
// //         console.error("Error fetching homepage data:", error);
// //         // Set empty arrays as fallback
// //         setHomeData({
// //           featuredProducts: [],
// //           bestSellers: [],
// //           newArrivals: [],
// //           onSale: []
// //         });
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
    
// //     fetchHomeData();
// //   }, []);
  
// //   // Hero slider effect
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
// //     }, 5000);
    
// //     return () => clearInterval(interval);
// //   }, []);
  
// //   // Scroll effect
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       const position = window.scrollY;
// //       setIsScrolled(position > 100);
// //     };
    
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);
  
// //   const nextSlide = () => {
// //     setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
// //   };
  
// //   const prevSlide = () => {
// //     setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
// //   };
  
// //   const handleSubscribe = (e) => {
// //     e.preventDefault();
// //     // Handle newsletter subscription logic
// //     alert(`Subscribed with email: ${email}`);
// //     setEmail("");
// //   };
  
// //   // Product section component with enhanced styling
// //   const ProductSection = ({ title, products, viewAllLink, icon, emptyMessage }) => {
// //     if (loading) {
// //       return (
// //         <div className="mb-16">
// //           <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
// //             <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
// //               {icon}
// //               {title}
// //             </h2>
// //             <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
// //           </div>
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //             {Array(8).fill().map((_, index) => (
// //               <div key={index} className="animate-pulse">
// //                 <div className="bg-gray-200 aspect-square rounded-lg mb-3"></div>
// //                 <div className="h-4 bg-gray-200 rounded-lg w-3/4 mb-2"></div>
// //                 <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       );
// //     }
    
// //     if (!products || products.length === 0) {
// //       return (
// //         <div className="mb-16">
// //           <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
// //             <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
// //               {icon}
// //               {title}
// //             </h2>
// //           </div>
// //           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
// //             <p className="text-gray-500">{emptyMessage || "No products available in this category."}</p>
// //           </div>
// //         </div>
// //       );
// //     }
    
// //     return (
// //       <div className="mb-16">
// //         <div className="flex justify-between items-center mb-6 border-b-2 border-gray-200 pb-3">
// //           <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
// //             {icon}
// //             <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-indigo-800">{title}</span>
// //           </h2>
// //           <Link 
// //             href={viewAllLink} 
// //             className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center bg-indigo-50 px-4 py-2 rounded-full transition-all hover:bg-indigo-100"
// //           >
// //             View All <ChevronRight size={16} className="ml-1" />
// //           </Link>
// //         </div>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //           {products.slice(0, 8).map((product) => (
// //             <ProductCard 
// //               key={product.id} 
// //               product={product} 
// //               isAuthenticated={isAuthenticated}
// //               viewMode="grid"
// //             />
// //           ))}
// //         </div>
// //       </div>
// //     );
// //   };
  
// //   return (
// //     <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
// //       {/* Animated scroll indicator */}
// //       <div className={`fixed bottom-10 right-10 z-50 transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
// //         <div className="flex flex-col items-center animate-bounce">
// //           <ChevronDown className="text-indigo-600 w-8 h-8" />
// //           <span className="text-xs font-medium text-gray-700">Scroll</span>
// //         </div>
// //       </div>
      
// //       {/* Hero Section - Enhanced with luxury styling */}
// //       <div className="relative overflow-hidden bg-black">
// //         <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full">
// //           {heroImages.map((image, index) => (
// //             <div 
// //               key={index}
// //               className={`absolute inset-0 transition-opacity duration-1000 ${
// //                 index === currentSlide ? "opacity-100" : "opacity-0"
// //               }`}
// //             >
// //               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
// //               <div className="h-full w-full relative">
// //                 <img
// //                   src={image}
// //                   alt={`Hero slide ${index + 1}`}
// //                   className="absolute w-full h-full object-cover object-center"
// //                 />
// //               </div>
// //             </div>
// //           ))}
          
// //           {/* Hero content overlay with luxury styling */}
// //           <div className="absolute inset-0 flex items-center justify-center px-4">
// //             <div className="text-center max-w-2xl mx-auto">
// //               <div className="mb-6 inline-block">
// //                 <div className="h-px w-20 bg-gold mx-auto mb-6 animate-fade-in-down"></div>
// //                 <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg animate-fade-in-down tracking-wide">
// //                   PREMIUM COLLECTION
// //                 </h1>
// //                 <div className="h-px w-20 bg-gold mx-auto mt-6 animate-fade-in-down"></div>
// //               </div>
// //               <p className="text-white text-lg mb-8 max-w-xl mx-auto drop-shadow-md animate-fade-in-up hidden md:block font-light">
// //                 Discover our exclusive selection of high-quality products crafted for true enthusiasts.
// //               </p>
// //               <button 
// //                 onClick={() => router.push('/product/category/all')}
// //                 className="bg-gradient-to-r from-gold-dark to-gold text-gray-900 font-medium py-3 px-8 rounded-full transition shadow-lg hover:shadow-2xl transform hover:scale-105"
// //               >
// //                 Explore Collection
// //               </button>
// //             </div>
// //           </div>
          
// //           {/* Slider controls - Enhanced with luxury styling */}
// //           <button 
// //             onClick={prevSlide}
// //             className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-gold/90 text-white hover:text-gray-900 rounded-full p-3 transition hover:scale-110 backdrop-blur-sm"
// //             aria-label="Previous slide"
// //           >
// //             <ArrowLeft size={20} />
// //           </button>
// //           <button 
// //             onClick={nextSlide}
// //             className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-gold/90 text-white hover:text-gray-900 rounded-full p-3 transition hover:scale-110 backdrop-blur-sm"
// //             aria-label="Next slide"
// //           >
// //             <ArrowRight size={20} />
// //           </button>
          
// //           {/* Slide indicators - Enhanced with luxury styling */}
// //           <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
// //             {heroImages.map((_, index) => (
// //               <button
// //                 key={index}
// //                 onClick={() => setCurrentSlide(index)}
// //                 className={`w-3 h-3 rounded-full transition-all ${
// //                   index === currentSlide 
// //                     ? "bg-gold scale-125" 
// //                     : "bg-white/40 hover:bg-gold/60"
// //                 }`}
// //                 aria-label={`Go to slide ${index + 1}`}
// //               />
// //             ))}
// //           </div>
// //         </div>
// //       </div>
      
// //       {/* Premium service bar with luxury styling */}
// //       <div className="bg-gradient-to-r from-gray-900 to-indigo-900 text-white py-4 border-b border-gold/20">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
// //             <div className="flex items-center justify-center gap-2 group">
// //               <ShoppingBag size={20} className="text-gold group-hover:scale-110 transition-transform" />
// //               <span className="font-light tracking-wide">Free Shipping on Orders $100+</span>
// //             </div>
// //             <div className="flex items-center justify-center gap-2 group">
// //               <Clock size={20} className="text-gold group-hover:scale-110 transition-transform" />
// //               <span className="font-light tracking-wide">24/7 Customer Support</span>
// //             </div>
// //             <div className="flex items-center justify-center gap-2 group">
// //               <Shield size={20} className="text-gold group-hover:scale-110 transition-transform" />
// //               <span className="font-light tracking-wide">100% Satisfaction Guarantee</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
      
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
// //         {/* Shop by Category Section - Enhanced with luxury styling */}
// //         <div className="mb-16">
// //           <div className="text-center mb-10">
// //             <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-indigo-800">SHOP BY CATEGORY</h2>
// //             <div className="h-px w-20 bg-gold mx-auto"></div>
// //             <p className="text-gray-600 mt-4 font-light tracking-wide">Browse our premium selection across categories</p>
// //           </div>
// //           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
// //             {categories.map((category) => (
// //               <Link key={category.slug} href={`/product/category/${category.slug}`}>
// //                 <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all p-6 text-center border border-gray-200 h-full flex flex-col items-center justify-center group hover:border-gold/50">
// //                   <div className="text-4xl mb-3 transform transition-transform group-hover:scale-110">{category.icon}</div>
// //                   <h3 className="font-medium text-gray-900 mb-1">{category.name}</h3>
// //                   <p className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{category.description}</p>
// //                 </div>
// //               </Link>
// //             ))}
// //           </div>
// //         </div>
        
// //         {/* Featured Products Section */}
// //         <ProductSection 
// //           title="FEATURED PRODUCTS" 
// //           products={homeData.featuredProducts}
// //           viewAllLink="/products/category/featured-products"
// //           icon={<Star className="w-6 h-6 text-gold" />}
// //           emptyMessage="Featured products coming soon!"
// //         />
        
// //         {/* Promotional Banner 1 - Enhanced with luxury styling */}
// //         <div className="relative mb-16 rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.01] transition-all group cursor-pointer" onClick={() => router.push('/product/category/all')}>
// //           <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
// //           <div className="absolute inset-0 z-20 flex items-center justify-start p-10">
// //             <div className="max-w-lg">
// //               <div className="mb-4">
// //                 <div className="h-px w-16 bg-gold mb-4"></div>
// //                 <h3 className="text-3xl font-bold text-white tracking-wide">PREMIUM SELECTION</h3>
// //               </div>
// //               <p className="text-white/90 mb-6 hidden md:block font-light">Discover our handpicked collection of the finest products for enthusiasts.</p>
// //               <button className="bg-gold text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-white transition transform group-hover:translate-x-2 shadow-lg">
// //                 Explore Now
// //               </button>
// //             </div>
// //           </div>
// //           <div className="h-64 lg:h-96 w-full">
// //             <img src="/home/Website-Banner03-4.jpg" alt="Premium Selection" className="w-full h-full object-cover" />
// //           </div>
// //         </div>
        
// //         {/* Best Sellers Banner - Responsive with enhanced styling */}
// //         <div className="w-full mb-16 rounded-xl overflow-hidden shadow-xl">
// //           {/* Mobile image */}
// //           <img 
// //             src="/home/New-Project-2024-07-10T220546.792mobile.jpg" 
// //             alt="Best Sellers Banner" 
// //             className="w-full block md:hidden object-cover"
// //           />
          
// //           {/* Desktop image */}
// //           <img 
// //             src="/home/label-banner-2-3.jpg" 
// //             alt="Best Sellers Banner" 
// //             className="w-full hidden md:block object-cover"
// //           />
// //         </div>
        
// //         {/* Best Sellers Section */}
// //         <ProductSection 
// //           title="BEST SELLERS" 
// //           products={homeData.bestSellers}
// //           viewAllLink="/products/category/best-sellers"
// //           icon={<TrendingUp className="w-6 h-6 text-gold" />}
// //           emptyMessage="Best sellers will be updated soon!"
// //         />
        
// //         {/* New Arrivals Banner - Responsive with enhanced styling */}
// //         <div className="w-full mb-16 rounded-xl overflow-hidden shadow-xl">
// //           {/* Mobile image */}
// //           <img 
// //             src="/home/New-Project-bannerr-mobile-768x54.jpg" 
// //             alt="New Arrivals Banner" 
// //             className="w-full block md:hidden object-cover"
// //           />
          
// //           {/* Desktop image */}
// //           <img 
// //             src="/home/New-Arriaval-Banner-1.png" 
// //             alt="New Arrivals Banner" 
// //             className="w-full hidden md:block object-cover"
// //           />
// //         </div>
        
// //         {/* New Arrivals Section */}
// //         <ProductSection 
// //           title="NEW ARRIVALS" 
// //           products={homeData.newArrivals}
// //           viewAllLink="/product/category/new-arrivals"
// //           icon={<Sparkles className="w-6 h-6 text-gold" />}
// //           emptyMessage="New products coming soon!"
// //         />
        
// //         {/* Sale Banner - Responsive with enhanced styling */}
// //         <div className="w-full mb-16 rounded-xl overflow-hidden shadow-xl">
// //           {/* Mobile image */}
// //           <img 
// //             src="/home/New-Project-2024-07-12T154019.979mobile-768x54.jpg" 
// //             alt="Sale Banner" 
// //             className="w-full block md:hidden object-cover"
// //           />
          
// //           {/* Desktop image */}
// //           <img 
// //             src="/home/sale-banner-5.jpg" 
// //             alt="Sale Banner" 
// //             className="w-full hidden md:block object-cover"
// //           />
// //         </div>
        
// //         {/* On Sale Section */}
// //         <ProductSection 
// //           title="ON SALE" 
// //           products={homeData.onSale}
// //           viewAllLink="/productscategory/on-sale"
// //           icon={<Tag className="w-6 h-6 text-gold" />}
// //           emptyMessage="No sale items at the moment. Check back soon!"
// //         />
        
// //         {/* Newsletter Section with luxury styling */}
// //         <div className="bg-gradient-to-r from-gray-900 to-indigo-900 rounded-2xl shadow-xl overflow-hidden mb-16 border border-gold/10">
// //           <div className="p-10 md:p-16 flex flex-col md:flex-row items-center justify-between">
// //             <div className="mb-8 md:mb-0 md:w-1/2 text-center md:text-left">
// //               <div className="mb-4">
// //                 <div className="h-px w-16 bg-gold mb-4 md:mx-0 mx-auto"></div>
// //                 <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">STAY UPDATED</h3>
// //               </div>
// //               <p className="text-indigo-100 mb-4 font-light">Subscribe to our newsletter for exclusive deals and updates</p>
// //             </div>
// //             <div className="w-full md:w-1/2">
// //               <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
// //                 <input
// //                   type="email"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   placeholder="Your email address"
// //                   required
// //                   className="flex-grow px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-gold/50"
// //                 />
// //                 <button
// //                   type="submit"
// //                   className="bg-gold hover:bg-gold-dark text-gray-900 font-medium py-3 px-6 rounded-full transition shadow-lg"
// //                 >
// //                   Subscribe
// //                 </button>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
      
// //       {/* Footer trust badges with luxury styling */}
// //       <div className="bg-gradient-to-r from-gray-50 to-white py-8 border-t border-gray-200">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center mb-6">
// //             <h3 className="text-lg font-medium text-gray-900 mb-4 tracking-wide">TRUSTED BY ENTHUSIASTS WORLDWIDE</h3>
// //             <div className="h-px w-20 bg-gold mx-auto"></div>
// //           </div>
// //           <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
// //             <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
// //             <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
// //             <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
// //             <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
// //             <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
// //           </div>
// //         </div>
// //       </div>
      
// //       {/* Custom CSS for premium styling */}
// //       <style jsx global>{`
// //         @keyframes fade-in-down {
// //           0% { opacity: 0; transform: translateY(-20px); }
// //           100% { opacity: 1; transform: translateY(0); }
// //         }
        
// //         @keyframes fade-in-up {
// //           0% { opacity: 0; transform: translateY(20px); }
// //           100% { opacity: 1; transform: translateY(0); }
// //         }
        
// //         .animate-fade-in-down {
// //           animation: fade-in-down 0.8s ease-out forwards;
// //         }
        
// //         .animate-fade-in-up {
// //           animation: fade-in-up 0.8s ease-out forwards;
// //           animation-delay: 0.3s;
// //           opacity: 0;
// //         }
        
// //         .bg-gold {
// //           background-color: #D4AF37;
// //         }
        
// //         .bg-gold-dark {
// //           background-color: #B8860B;
// //         }
        
// //         .text-gold {
// //           color: #D4AF37;
// //         }
        
// //         .border-gold {
// //           border-color: #D4AF37;
// //         }
        
// //         .hover\:bg-gold:hover {
// //           background-color: #D4AF37;
// //         }
        
// //         .hover\:bg-gold-dark:hover {
// //           background-color: #B8860B;
// //         }
        
// //         .hover\:text-gold:hover {
// //           color: #D4AF37;
// //         }
        
// //         .hover\:border-gold:hover {
// //           border-color: #D4AF37;
// //         }
        
// //         .focus\:ring-gold:focus {
// //           --tw-ring-color: #D4AF37;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import ProductCard from "@/components/category/ProductCart";
// import { useAuth } from "@/context/authContext";
// import { 
//   ChevronRight, 
//   ArrowRight, 
//   ArrowLeft, 
//   Mail, 
//   ShoppingBag,
//   Clock,
//   Star,
//   Tag,
//   TrendingUp,
//   Sparkles,
//   ChevronDown,
//   Shield,
//   PenTool,
//   Wind,
//   Feather,
//   Settings,
//   Flame,
//   Package,
//   Check,
//   Heart,
//   Trophy,
//   ThumbsUp,
//   Gift,
//   RefreshCw,
//   Instagram,
//   Facebook,
//   Twitter
// } from "lucide-react";

// // Hero slider images
// const heroImages = [
//   "/home/CIGAR-DEAL-APRIL-2025-v02-6.jpg",
//   "/home/MONTECRISTO-WHITE-v01-2.jpg",
//   "/home/rocky-patel-v001-6.jpg",
// ];

// // Featured categories with enhanced icons
// const categories = [
//   { 
//     name: "Glass Pipes", 
//     icon: <PenTool className="w-8 h-8 text-amber-700" />,
//     slug: "glass-pipes",
//     description: "Premium handcrafted glass pipes",
//     color: "bg-amber-50",
//     borderColor: "border-amber-200",
//     hoverColor: "hover:bg-amber-100",
//     iconBackground: "bg-amber-100"
//   },
//   { 
//     name: "Hookahs", 
//     icon: <Wind className="w-8 h-8 text-indigo-700" />,
//     slug: "hookahs",
//     description: "Traditional & modern hookahs",
//     color: "bg-indigo-50",
//     borderColor: "border-indigo-200",
//     hoverColor: "hover:bg-indigo-100",
//     iconBackground: "bg-indigo-100"
//   },
//   { 
//     name: "Cigars", 
//     icon: <Feather className="w-8 h-8 text-rose-700" />,
//     slug: "cigar",
//     description: "Fine hand-rolled cigars",
//     color: "bg-rose-50",
//     borderColor: "border-rose-200",
//     hoverColor: "hover:bg-rose-100",
//     iconBackground: "bg-rose-100"
//   },
//   { 
//     name: "Grinders", 
//     icon: <Settings className="w-8 h-8 text-emerald-700" />,
//     slug: "grinders",
//     description: "Precision engineered grinders",
//     color: "bg-emerald-50",
//     borderColor: "border-emerald-200",
//     hoverColor: "hover:bg-emerald-100",
//     iconBackground: "bg-emerald-100"
//   },
//   { 
//     name: "Lighters", 
//     icon: <Flame className="w-8 h-8 text-orange-700" />,
//     slug: "lighters",
//     description: "Premium torch & soft flame lighters",
//     color: "bg-orange-50",
//     borderColor: "border-orange-200",
//     hoverColor: "hover:bg-orange-100",
//     iconBackground: "bg-orange-100"
//   },
//   { 
//     name: "Accessories", 
//     icon: <Package className="w-8 h-8 text-blue-700" />,
//     slug: "cigar-accessories",
//     description: "Essential accessories for enthusiasts",
//     color: "bg-blue-50",
//     borderColor: "border-blue-200",
//     hoverColor: "hover:bg-blue-100",
//     iconBackground: "bg-blue-100"
//   },
// ];

// // Featured testimonials to add social proof
// const testimonials = [
//   {
//     text: "The premium cigar selection is exceptional. I've been a customer for years and the quality never disappoints.",
//     author: "James K.",
//     rating: 5,
//     image: "/api/placeholder/60/60" // Replace with actual customer image
//   },
//   {
//     text: "Fast shipping and impeccable packaging. Their attention to detail is what keeps me coming back.",
//     author: "Michael R.",
//     rating: 5,
//     image: "/api/placeholder/60/60" // Replace with actual customer image
//   },
//   {
//     text: "The glass collection is truly artisanal. Each piece is a work of art that I'm proud to display.",
//     author: "Sarah T.",
//     rating: 5,
//     image: "/api/placeholder/60/60" // Replace with actual customer image
//   }
// ];

// // Featured brands for social proof and filling space
// const brands = [
//   "Cohiba",
//   "Montecristo",
//   "Arturo Fuente",
//   "Padron",
//   "Rocky Patel",
//   "Davidoff"
// ];

// // Section background colors for a premium look
// const sectionStyles = {
//   featured: {
//     bg: "bg-gradient-to-b from-amber-50 to-white",
//     border: "border-amber-200",
//     icon: "text-amber-600",
//     button: "bg-amber-100 text-amber-800 hover:bg-amber-200"
//   },
//   bestSellers: {
//     bg: "bg-gradient-to-b from-indigo-50 to-white",
//     border: "border-indigo-200",
//     icon: "text-indigo-600",
//     button: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
//   },
//   newArrivals: {
//     bg: "bg-gradient-to-b from-emerald-50 to-white",
//     border: "border-emerald-200",
//     icon: "text-emerald-600",
//     button: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
//   },
//   onSale: {
//     bg: "bg-gradient-to-b from-rose-50 to-white",
//     border: "border-rose-200",
//     icon: "text-rose-600",
//     button: "bg-rose-100 text-rose-800 hover:bg-rose-200"
//   }
// };

// // Premium features to highlight in between sections
// const features = [
//   {
//     icon: <Shield className="w-10 h-10 text-gold" />,
//     title: "Authenticity Guaranteed",
//     description: "Every product in our collection is 100% authentic and verified by our experts."
//   },
//   {
//     icon: <Gift className="w-10 h-10 text-gold" />,
//     title: "Exclusive Packaging",
//     description: "Premium packaging for a luxurious unboxing experience with every order."
//   },
//   {
//     icon: <ThumbsUp className="w-10 h-10 text-gold" />,
//     title: "Expert Selection",
//     description: "Products hand-selected by our team of passionate connoisseurs."
//   }
// ];

// export default function HomePage() {
//   const router = useRouter();
//   const { isAuthenticated } = useAuth();
  
//   const [loading, setLoading] = useState(true);
//   const [homeData, setHomeData] = useState({
//     featuredProducts: [],
//     bestSellers: [],
//     newArrivals: [],
//     onSale: []
//   });
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [email, setEmail] = useState("");
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeTestimonial, setActiveTestimonial] = useState(0);
//   const [showAnimation, setShowAnimation] = useState(true);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
  
//   // Refs for scroll animations
//   const featureSectionRef = useRef(null);
//   const categorySectionRef = useRef(null);
//   const testimonialRef = useRef(null);
  
//   // Fetch homepage data
//   useEffect(() => {
//     const fetchHomeData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch('/api/homepage');
//         if (!response.ok) {
//           throw new Error('Failed to fetch homepage data');
//         }
//         const data = await response.json();
//         setHomeData(data);
//       } catch (error) {
//         console.error("Error fetching homepage data:", error);
//         // Set empty arrays as fallback
//         setHomeData({
//           featuredProducts: [],
//           bestSellers: [],
//           newArrivals: [],
//           onSale: []
//         });
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchHomeData();
//   }, []);
  
//   // Hero slider effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
//     }, 5000);
    
//     return () => clearInterval(interval);
//   }, []);
  
//   // Testimonial slider effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
//     }, 4000);
    
//     return () => clearInterval(interval);
//   }, []);
  
//   // Scroll effects for animations
//   useEffect(() => {
//     const handleScroll = () => {
//       const position = window.scrollY;
//       setIsScrolled(position > 100);
      
//       // Hide initial animation after scroll
//       if (position > 300 && showAnimation) {
//         setShowAnimation(false);
//       }
      
//       // Animate sections on scroll
//       const animateSections = () => {
//         if (featureSectionRef.current) {
//           const featureRect = featureSectionRef.current.getBoundingClientRect();
//           if (featureRect.top < window.innerHeight * 0.75) {
//             featureSectionRef.current.classList.add('animate-fade-in');
//           }
//         }
        
//         if (categorySectionRef.current) {
//           const categoryRect = categorySectionRef.current.getBoundingClientRect();
//           if (categoryRect.top < window.innerHeight * 0.75) {
//             categorySectionRef.current.classList.add('animate-slide-up');
//           }
//         }
        
//         if (testimonialRef.current) {
//           const testimonialRect = testimonialRef.current.getBoundingClientRect();
//           if (testimonialRect.top < window.innerHeight * 0.75) {
//             testimonialRef.current.classList.add('animate-fade-in');
//           }
//         }
//       };
      
//       animateSections();
//     };
    
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [showAnimation]);
  
//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
//   };
  
//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
//   };
  
//   const handleSubscribe = (e) => {
//     e.preventDefault();
//     // Handle newsletter subscription logic
//     alert(`Subscribed with email: ${email}`);
//     setEmail("");
//   };
  
//   // Product section component with enhanced styling
//   const ProductSection = ({ title, products, viewAllLink, icon, emptyMessage, style }) => {
//     if (loading) {
//       return (
//         <div className={`mb-12 md:mb-20 rounded-xl p-6 md:p-8 ${style.bg} shadow-sm`}>
//           <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
//             <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
//               <span className={style.icon}>{icon}</span>
//               {title}
//             </h2>
//             <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
//             {Array(4).fill().map((_, index) => (
//               <div key={index} className="animate-pulse">
//                 <div className="bg-gray-200 aspect-square rounded-lg mb-3"></div>
//                 <div className="h-4 bg-gray-200 rounded-lg w-3/4 mb-2"></div>
//                 <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     }
    
//     if (!products || products.length === 0) {
//       return (
//         <div className={`mb-12 md:mb-20 rounded-xl p-6 md:p-8 ${style.bg} shadow-sm`}>
//           <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
//             <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
//               <span className={style.icon}>{icon}</span>
//               {title}
//             </h2>
//           </div>
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
//             <p className="text-gray-500">{emptyMessage || "No products available in this category."}</p>
//           </div>
//         </div>
//       );
//     }
    
//     return (
//       <div className={`mb-12 md:mb-20 rounded-xl p-6 md:p-8 ${style.bg} shadow-sm border border-gray-100`}>
//         <div className={`flex justify-between items-center mb-6 border-b-2 ${style.border} pb-3`}>
//           <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
//             <span className={style.icon}>{icon}</span>
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">{title}</span>
//           </h2>
//           <Link 
//             href={viewAllLink} 
//             className={`font-medium flex items-center ${style.button} px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-all text-sm md:text-base`}
//           >
//             View All <ChevronRight size={16} className="ml-1" />
//           </Link>
//         </div>
        
//         {/* Product Grid - Responsive with 2 columns on mobile, 4 on desktop */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
//           {products.slice(0, 8).map((product) => (
//             <ProductCard 
//               key={product.id} 
//               product={product} 
//               isAuthenticated={isAuthenticated}
//               viewMode="grid"
//             />
//           ))}
//         </div>
        
//         {/* Mobile View All button at bottom */}
//         <div className="mt-6 text-center md:hidden">
//           <Link 
//             href={viewAllLink} 
//             className={`font-medium inline-flex items-center ${style.button} px-6 py-2 rounded-full transition-all`}
//           >
//             View All Products <ChevronRight size={16} className="ml-1" />
//           </Link>
//         </div>
//       </div>
//     );
//   };
  
//   // Animated features section to add content between product sections
//   const FeaturesSection = () => (
//     <div ref={featureSectionRef} className="mb-12 md:mb-20 opacity-0">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {features.map((feature, index) => (
//           <div 
//             key={index}
//             className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all hover:border-gold/30 flex flex-col items-center text-center"
//             style={{ animationDelay: `${index * 200}ms` }}
//           >
//             <div className="mb-4 bg-gray-50 p-4 rounded-full border border-gray-100">
//               {feature.icon}
//             </div>
//             <h3 className="text-lg font-bold mb-2 text-gray-900">{feature.title}</h3>
//             <p className="text-gray-600 leading-relaxed">{feature.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
  
//   // Testimonials section to add social proof
//   const TestimonialsSection = () => (
//     <div ref={testimonialRef} className="mb-12 md:mb-20 opacity-0">
//       <div className="text-center mb-8">
//         <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">CUSTOMER EXPERIENCES</h2>
//         <div className="h-px w-20 bg-gold mx-auto"></div>
//         <p className="text-gray-600 mt-4 font-light">What our valued customers are saying</p>
//       </div>
      
//       <div className="relative overflow-hidden">
//         <div className="relative h-64 md:h-56 overflow-hidden">
//           {testimonials.map((testimonial, index) => (
//             <div 
//               key={index}
//               className={`absolute inset-0 transition-opacity duration-700 flex items-center justify-center ${
//                 index === activeTestimonial ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               <div className="max-w-2xl bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-200">
//                 <div className="flex items-center mb-4">
//                   <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-gold">
//                     <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover" />
//                   </div>
//                   <div>
//                     <p className="font-bold text-gray-900">{testimonial.author}</p>
//                     <div className="flex">
//                       {[...Array(testimonial.rating)].map((_, i) => (
//                         <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <p className="text-gray-700 italic">&ldquo;{testimonial.text}&rdquo;</p>
//               </div>
//             </div>
//           ))}
//         </div>
        
//         {/* Testimonial indicators */}
//         <div className="flex justify-center mt-4 space-x-2">
//           {testimonials.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setActiveTestimonial(index)}
//               className={`w-2 h-2 rounded-full transition-all ${
//                 index === activeTestimonial 
//                   ? "bg-gold w-6" 
//                   : "bg-gray-300 hover:bg-gray-400"
//               }`}
//               aria-label={`Go to testimonial ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
  
//   // Featured brands section
//   const BrandsSection = () => (
//     <div className="mb-12 md:mb-20">
//       <div className="text-center mb-8">
//         <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">FEATURED BRANDS</h2>
//         <div className="h-px w-20 bg-gold mx-auto"></div>
//         <p className="text-gray-600 mt-4 font-light">Explore our curated selection of premium brands</p>
//       </div>
      
//       <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
//         {brands.map((brand, index) => (
//           <div 
//             key={index} 
//             className="bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-gold/30"
//           >
//             <span className="font-serif tracking-wide text-gray-800">{brand}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
  
//   return (
//     <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
//       {/* Initial page loader animation */}
//       {showAnimation && (
//         <div className="fixed inset-0 bg-black z-50 flex items-center justify-center animate-fade-out pointer-events-none">
//           <div className="text-gold text-4xl font-serif tracking-widest animate-pulse">PREMIUM</div>
//         </div>
//       )}
      
//       {/* Mobile floating menu button */}
//       <button 
//         onClick={() => setShowMobileMenu(!showMobileMenu)}
//         className="fixed bottom-4 right-4 z-40 bg-black text-white p-3 rounded-full shadow-lg md:hidden"
//       >
//         {showMobileMenu ? <ChevronDown className="w-6 h-6" /> : <ShoppingBag className="w-6 h-6" />}
//       </button>
      
//       {/* Mobile floating menu */}
//       <div className={`fixed bottom-20 right-4 z-40 bg-white rounded-xl shadow-xl p-4 transition-all duration-300 md:hidden ${
//         showMobileMenu ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10 pointer-events-none"
//       }`}>
//         <div className="flex flex-col space-y-3">
//           <Link href="/product/category/all" className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
//             <ShoppingBag className="w-4 h-4" />
//             <span>Shop All</span>
//           </Link>
//           <Link href="/product/category/best-sellers" className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
//             <TrendingUp className="w-4 h-4" />
//             <span>Best Sellers</span>
//           </Link>
//           <Link href="/product/category/on-sale" className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
//             <Tag className="w-4 h-4" />
//             <span>On Sale</span>
//           </Link>
//         </div>
//       </div>
      
//       {/* Animated scroll indicator */}
//       <div className={`fixed bottom-24 right-4 z-40 transition-opacity duration-300 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
//         <div className="flex flex-col items-center animate-bounce bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md">
//           <ChevronDown className="text-gold w-6 h-6" />
//           <span className="text-xs font-medium text-gray-700">Scroll</span>
//         </div>
//       </div>
      
//       {/* Hero Section - Enhanced with luxury styling */}
//       <div className="relative overflow-hidden bg-black">
//         <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full">
//           {heroImages.map((image, index) => (
//             <div 
//               key={index}
//               className={`absolute inset-0 transition-opacity duration-1000 ${
//                 index === currentSlide ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/50"></div>
//               <div className="h-full w-full relative">
//                 <img
//                   src={image}
//                   alt={`Hero slide ${index + 1}`}
//                   className="absolute w-full h-full object-cover object-center"
//                 />
//               </div>
//             </div>
//           ))}
          
//           {/* Hero content overlay with luxury styling */}
//           <div className="absolute inset-0 flex items-center justify-center px-4">
//             <div className="text-center max-w-2xl mx-auto">
//               <div className="mb-6 inline-block">
//                 <div className="h-px w-20 bg-gold mx-auto mb-6 animate-fade-in-down"></div>
//                 <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 drop-shadow-lg animate-fade-in-down tracking-wide font-serif">
//                   PREMIUM COLLECTION
//                 </h1>
//                 <div className="h-px w-20 bg-gold mx-auto mt-6 animate-fade-in-down"></div>
//               </div>
//               <p className="text-white/90 text-base md:text-lg mb-8 max-w-xl mx-auto drop-shadow-md animate-fade-in-up font-light">
//                 Discover our exclusive selection of high-quality products crafted for true enthusiasts.
//               </p>
//               <button 
//                 onClick={() => router.push('/product/category/all')}
//                 className="bg-gradient-to-r from-gold-dark to-gold text-gray-900 font-medium py-3 px-8 rounded-full transition shadow-lg hover:shadow-2xl transform hover:scale-105 animate-fade-in-up"
//               >
//                 Explore Collection
//               </button>
//             </div>
//           </div>
          
//           {/* Slider controls - Enhanced with luxury styling */}
//           <button 
//             onClick={prevSlide}
//             className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-gold/90 text-white hover:text-gray-900 rounded-full p-3 transition hover:scale-110 backdrop-blur-sm"
//             aria-label="Previous slide"
//           >
//             <ArrowLeft size={20} />
//           </button>
//           <button 
//             onClick={nextSlide}
//             className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-gold/90 text-white hover:text-gray-900 rounded-full p-3 transition hover:scale-110 backdrop-blur-sm"
//             aria-label="Next slide"
//           >
//             <ArrowRight size={20} />
//           </button>
          
//           {/* Slide indicators - Enhanced with luxury styling */}
//           <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
//             {heroImages.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`w-3 h-3 rounded-full transition-all ${
//                   index === currentSlide 
//                     ? "bg-gold scale-125" 
//                     : "bg-white/40 hover:bg-gold/60"
//                 }`}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
      
//       {/* Premium service bar with luxury styling */}
//       <div className="bg-gradient-to-r from-gray-900 to-indigo-900 text-white py-5 border-b border-gold/20 relative overflow-hidden">
//         <div className="absolute inset-0 bg-pattern opacity-5"></div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
//             <div className="flex flex-col items-center justify-center gap-3 group bg-black/20 p-4 rounded-lg backdrop-blur-sm hover:bg-black/30 transition-all transform hover:scale-105">
//               <ShoppingBag size={28} className="text-gold group-hover:scale-110 transition-transform" />
//               <span className="font-light tracking-wide">Free Shipping on Orders $100+</span>
//             </div>
//             <div className="flex flex-col items-center justify-center gap-3 group bg-black/20 p-4 rounded-lg backdrop-blur-sm hover:bg-black/30 transition-all transform hover:scale-105">
//               <Clock size={28} className="text-gold group-hover:scale-110 transition-transform" />
//               <span className="font-light tracking-wide">24/7 Customer Support</span>
//             </div>
//             <div className="flex flex-col items-center justify-center gap-3 group bg-black/20 p-4 rounded-lg backdrop-blur-sm hover:bg-black/30 transition-all transform hover:scale-105">
//               <Shield size={28} className="text-gold group-hover:scale-110 transition-transform" />
//               <span className="font-light tracking-wide">100% Satisfaction Guarantee</span>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
//         {/* Shop by Category Section - Enhanced with color coding */}
//         <div className="mb-12 md:mb-20" ref={categorySectionRef}>
//           <div className="text-center mb-8 md:mb-10">
//             <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">SHOP BY CATEGORY</h2>
//             <div className="h-px w-20 bg-gold mx-auto"></div>
//             <p className="text-gray-600 mt-4 font-light tracking-wide">Browse our premium selection across categories</p>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
//             {categories.map((category, index) => (
//               <Link key={category.slug} href={`/product/category/${category.slug}`}>
//                 <div 
//                   className={`${category.color} rounded-xl shadow-sm hover:shadow-xl transition-all p-4 md:p-6 text-center ${category.borderColor} border h-full flex flex-col items-center justify-center group ${category.hoverColor} transform hover:scale-105`}
//                   style={{ animationDelay: `${index * 100}ms` }}
//                 >
//                   <div className={`${category.iconBackground} p-3 rounded-full mb-3 shadow-sm group-hover:scale-110 transition-all duration-300`}>
//                     {category.icon}
//                   </div>
//                   <h3 className="font-medium text-gray-900 mb-1">{category.name}</h3>
//                   <p className="text-xs text-gray-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{category.description}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
        
//         {/* Featured Products Section */}
//         <ProductSection 
//           title="FEATURED PRODUCTS" 
//           products={homeData.featuredProducts}
//           viewAllLink="/products/category/featured-products"
//           icon={<Star className="w-6 h-6" />}
//           emptyMessage="Featured products coming soon!"
//           style={sectionStyles.featured}
//         />
        
//         {/* Testimonials Section */}
//         <TestimonialsSection />
        
//         {/* Promotional Banner 1 - Enhanced with luxury styling */}
//         <div className="relative mb-12 md:mb-20 rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.01] transition-all group cursor-pointer" onClick={() => router.push('/product/category/all')}>
//           <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
//           <div className="absolute inset-0 z-20 flex items-center justify-start p-6 md:p-10">
//             <div className="max-w-lg">
//               <div className="mb-4">
//                 <div className="h-px w-16 bg-gold mb-4"></div>
//                 <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide">PREMIUM SELECTION</h3>
//               </div>
//               <p className="text-white/90 mb-6 text-sm md:text-base font-light">Discover our handpicked collection of the finest products for enthusiasts.</p>
//               <button className="bg-gold text-gray-900 px-5 md:px-6 py-2 md:py-3 rounded-full font-medium hover:bg-white transition transform group-hover:translate-x-2 shadow-lg">
//                 Explore Now
//               </button>
//             </div>
//           </div>
//           <div className="h-64 lg:h-80 w-full">
//             <img src="/home/Website-Banner03-4.jpg" alt="Premium Selection" className="w-full h-full object-cover" />
//           </div>
//         </div>
        
//         {/* Features Highlight */}
//         <FeaturesSection />
        
//         {/* Best Sellers Banner - Responsive with enhanced styling */}
//         <div className="w-full mb-8 rounded-xl overflow-hidden shadow-xl">
//           {/* Mobile image */}
//           <img 
//             src="/home/New-Project-2024-07-10T220546.792mobile.jpg" 
//             alt="Best Sellers Banner" 
//             className="w-full block md:hidden object-cover"
//           />
          
//           {/* Desktop image */}
//           <img 
//             src="/home/label-banner-2-3.jpg" 
//             alt="Best Sellers Banner" 
//             className="w-full hidden md:block object-cover"
//           />
//         </div>
        
//         {/* Best Sellers Section */}
//         <ProductSection 
//           title="BEST SELLERS" 
//           products={homeData.bestSellers}
//           viewAllLink="/products/category/best-sellers"
//           icon={<TrendingUp className="w-6 h-6" />}
//           emptyMessage="Best sellers will be updated soon!"
//           style={sectionStyles.bestSellers}
//         />
        
//         {/* Featured Brands Section */}
//         <BrandsSection />
        
//         {/* New Arrivals Banner - Responsive with enhanced styling */}
//         <div className="w-full mb-8 rounded-xl overflow-hidden shadow-xl">
//           {/* Mobile image */}
//           <img 
//             src="/home/New-Project-bannerr-mobile-768x54.jpg" 
//             alt="New Arrivals Banner" 
//             className="w-full block md:hidden object-cover"
//           />
          
//           {/* Desktop image */}
//           <img 
//             src="/home/New-Arriaval-Banner-1.png" 
//             alt="New Arrivals Banner" 
//             className="w-full hidden md:block object-cover"
//           />
//         </div>
        
//         {/* New Arrivals Section */}
//         <ProductSection 
//           title="NEW ARRIVALS" 
//           products={homeData.newArrivals}
//           viewAllLink="/product/category/new-arrivals"
//           icon={<Sparkles className="w-6 h-6" />}
//           emptyMessage="New products coming soon!"
//           style={sectionStyles.newArrivals}
//         />
        
//         {/* Sale Banner - Responsive with enhanced styling */}
//         <div className="w-full mb-8 rounded-xl overflow-hidden shadow-xl">
//           {/* Mobile image */}
//           <img 
//             src="/home/New-Project-2024-07-12T154019.979mobile-768x54.jpg" 
//             alt="Sale Banner" 
//             className="w-full block md:hidden object-cover"
//           />
          
//           {/* Desktop image */}
//           <img 
//             src="/home/sale-banner-5.jpg" 
//             alt="Sale Banner" 
//             className="w-full hidden md:block object-cover"
//           />
//         </div>
        
//         {/* On Sale Section */}
//         <ProductSection 
//           title="ON SALE" 
//           products={homeData.onSale}
//           viewAllLink="/productscategory/on-sale"
//           icon={<Tag className="w-6 h-6" />}
//           emptyMessage="No sale items at the moment. Check back soon!"
//           style={sectionStyles.onSale}
//         />
        
//         {/* Newsletter Section with luxury styling */}
//         <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-xl overflow-hidden mb-12 md:mb-20 backdrop-blur-sm">
//           <div className="relative">
//             <div className="absolute inset-0 bg-pattern opacity-10"></div>
//             <div className="p-6 md:p-10 lg:p-16 flex flex-col md:flex-row items-center justify-between relative z-10">
//               <div className="mb-8 md:mb-0 md:w-1/2 text-center md:text-left">
//                 <div className="mb-4">
//                   <div className="h-px w-16 bg-gold mb-4 md:mx-0 mx-auto"></div>
//                   <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 tracking-wide">STAY UPDATED</h3>
//                 </div>
//                 <p className="text-gray-300 mb-4 font-light max-w-md">Subscribe to our newsletter for exclusive deals, new product announcements, and special offers delivered directly to your inbox</p>
//               </div>
//               <div className="w-full md:w-1/2">
//                 <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Your email address"
//                     required
//                     className="flex-grow px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white/10 text-white backdrop-blur-sm border border-white/20"
//                   />
//                   <button
//                     type="submit"
//                     className="bg-gold hover:bg-gold-dark text-gray-900 font-medium py-3 px-6 rounded-full transition shadow-lg whitespace-nowrap"
//                   >
//                     Subscribe
//                   </button>
//                 </form>
//                 <p className="text-white/70 text-xs mt-3 text-center sm:text-left">Join over 10,000 enthusiasts who receive our weekly newsletter</p>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Social Proof Counter */}
//         <div className="mb-12 md:mb-20 bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-200">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             <div className="text-center">
//               <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">10k+</div>
//               <p className="text-sm text-gray-600">Happy Customers</p>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">5k+</div>
//               <p className="text-sm text-gray-600">Products</p>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">50+</div>
//               <p className="text-sm text-gray-600">Premium Brands</p>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">15+</div>
//               <p className="text-sm text-gray-600">Years Experience</p>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Social Media Section */}
//       <div className="bg-gray-100 py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">FOLLOW US</h2>
//             <div className="h-px w-20 bg-gold mx-auto"></div>
//             <p className="text-gray-600 mt-4 font-light">Stay connected with us on social media</p>
//           </div>
          
//           <div className="flex justify-center space-x-6">
//             <a href="#" className="bg-white p-4 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-110">
//               <Instagram className="w-6 h-6 text-gray-800" />
//             </a>
//             <a href="#" className="bg-white p-4 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-110">
//               <Facebook className="w-6 h-6 text-gray-800" />
//             </a>
//             <a href="#" className="bg-white p-4 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-110">
//               <Twitter className="w-6 h-6 text-gray-800" />
//             </a>
//           </div>
          
//           {/* Instagram Feed Mockup */}
//           {/* <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="aspect-square bg-gray-300 rounded-md overflow-hidden hover:opacity-90 transition-opacity">
//                 <img src={`/api/placeholder/300/300`} alt="Instagram post" className="w-full h-full object-cover" />
//               </div>
//             ))}
//           </div> */}
//         </div>
//       </div>
      
//       {/* Footer trust badges with luxury styling */}
//       {/* <div className="bg-gradient-to-r from-gray-100 to-white py-12 border-t border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-8">
//             <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-4 tracking-wide">TRUSTED BY ENTHUSIASTS WORLDWIDE</h3>
//             <div className="h-px w-20 bg-gold mx-auto"></div>
//           </div>
//           <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 opacity-80">
//             <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-300 rounded-full"></div>
//             <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-300 rounded-full"></div>
//             <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-300 rounded-full"></div>
//             <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-300 rounded-full"></div>
//             <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-300 rounded-full"></div>
//           </div>
          
//           <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
//             <div>
//               <h4 className="font-medium text-gray-900 mb-3">Payment Methods</h4>
//               <div className="flex justify-center space-x-2">
//                 <div className="w-10 h-6 bg-gray-400 rounded"></div>
//                 <div className="w-10 h-6 bg-gray-400 rounded"></div>
//                 <div className="w-10 h-6 bg-gray-400 rounded"></div>
//               </div>
//             </div>
//             <div>
//               <h4 className="font-medium text-gray-900 mb-3">Shipping Partners</h4>
//               <div className="flex justify-center space-x-2">
//                 <div className="w-10 h-6 bg-gray-400 rounded"></div>
//                 <div className="w-10 h-6 bg-gray-400 rounded"></div>
//               </div>
//             </div>
//             <div>
//               <h4 className="font-medium text-gray-900 mb-3">Security</h4>
//               <div className="flex justify-center space-x-2">
//                 <div className="w-10 h-6 bg-gray-400 rounded"></div>
//                 <div className="w-10 h-6 bg-gray-400 rounded"></div>
//               </div>
//             </div>
//             <div>
//               <h4 className="font-medium text-gray-900 mb-3">Certifications</h4>
//               <div className="flex justify-center space-x-2">
//                 <div className="w-10 h-6 bg-gray-400 rounded"></div>
//                 <div className="w-10 h-6 bg-gray-400 rounded"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div> */}
      
//       {/* "Back to Top" button */}
//       <button 
//         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         className={`fixed bottom-24 right-4 z-40 bg-gold text-gray-900 p-3 rounded-full shadow-lg transition-opacity duration-300 md:right-10 md:bottom-10 ${
//           isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
//         }`}
//       >
//         <ChevronDown className="w-6 h-6 transform rotate-180" />
//       </button>
      
//       {/* Custom CSS for premium styling */}
//       <style jsx global>{`
//         @keyframes fade-in-down {
//           0% { opacity: 0; transform: translateY(-20px); }
//           100% { opacity: 1; transform: translateY(0); }
//         }
        
//         @keyframes fade-in-up {
//           0% { opacity: 0; transform: translateY(20px); }
//           100% { opacity: 1; transform: translateY(0); }
//         }
        
//         @keyframes fade-out {
//           0% { opacity: 1; }
//           100% { opacity: 0; }
//         }
        
//         .animate-fade-out {
//           animation: fade-out 1s ease-out forwards;
//           animation-delay: 1s;
//         }
        
//         .animate-fade-in-down {
//           animation: fade-in-down 0.8s ease-out forwards;
//         }
        
//         .animate-fade-in-up {
//           animation: fade-in-up 0.8s ease-out forwards;
//           animation-delay: 0.3s;
//           opacity: 0;
//         }
        
//         .animate-fade-in {
//           animation: fade-in 0.8s ease-out forwards;
//         }
        
//         .animate-slide-up {
//           animation: slide-up 0.8s ease-out forwards;
//         }
        
//         @keyframes fade-in {
//           0% { opacity: 0; }
//           100% { opacity: 1; }
//         }
        
//         @keyframes slide-up {
//           0% { opacity: 0; transform: translateY(30px); }
//           100% { opacity: 1; transform: translateY(0); }
//         }
        
//         .bg-gold {
//           background-color: #D4AF37;
//         }
        
//         .bg-gold-dark {
//           background-color: #B8860B;
//         }
        
//         .text-gold {
//           color: #D4AF37;
//         }
        
//         .border-gold {
//           border-color: #D4AF37;
//         }
        
//         .hover\\:bg-gold:hover {
//           background-color: #D4AF37;
//         }
        
//         .hover\\:bg-gold-dark:hover {
//           background-color: #B8860B;
//         }
        
//         .hover\\:text-gold:hover {
//           color: #D4AF37;
//         }
        
//         .hover\\:border-gold:hover {
//           border-color: #D4AF37;
//         }
        
//         .focus\\:ring-gold:focus {
//           --tw-ring-color: #D4AF37;
//         }
        
//         .bg-pattern {
//           background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
//         }
        
//         /* Improved typography */
//         h1, h2, h3, h4 {
//           letter-spacing: 0.02em;
//         }
        
//         /* Enhanced mobile responsiveness */
//         @media (max-width: 768px) {
//           .max-w-7xl {
//             padding-left: 1rem;
//             padding-right: 1rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import { useState, useEffect, useRef } from "react";
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
  Sparkles,
  ChevronDown,
  Shield,
  PenTool,
  Wind,
  Feather,
  Settings,
  Flame,
  Package,
  Check,
  Heart,
  Trophy,
  ThumbsUp,
  Gift,
  RefreshCw,
  Instagram,
  Facebook,
  Twitter,
  ArrowUp,
  Zap,
  Search,
  X

} from "lucide-react";

// Hero slider images
const heroImages = [
  "/home/CIGAR-DEAL-APRIL-2025-v02-6.jpg",
  "/home/MONTECRISTO-WHITE-v01-2.jpg",
  "/home/rocky-patel-v001-6.jpg",
];

// Featured categories with enhanced icons
const categories = [
  { 
    name: "Glass Pipes", 
    icon: <PenTool className="w-8 h-8 text-amber-700" />,
    slug: "glass-pipes",
    description: "Premium handcrafted glass pipes",
    color: "bg-amber-50",
    borderColor: "border-amber-200",
    hoverColor: "hover:bg-amber-100",
    iconBackground: "bg-amber-100"
  },
  { 
    name: "Hookahs", 
    icon: <Wind className="w-8 h-8 text-indigo-700" />,
    slug: "hookahs",
    description: "Traditional & modern hookahs",
    color: "bg-indigo-50",
    borderColor: "border-indigo-200",
    hoverColor: "hover:bg-indigo-100",
    iconBackground: "bg-indigo-100"
  },
  { 
    name: "Cigars", 
    icon: <Feather className="w-8 h-8 text-rose-700" />,
    slug: "cigar",
    description: "Fine hand-rolled cigars",
    color: "bg-rose-50",
    borderColor: "border-rose-200",
    hoverColor: "hover:bg-rose-100",
    iconBackground: "bg-rose-100"
  },
  { 
    name: "Grinders", 
    icon: <Settings className="w-8 h-8 text-emerald-700" />,
    slug: "grinders",
    description: "Precision engineered grinders",
    color: "bg-emerald-50",
    borderColor: "border-emerald-200",
    hoverColor: "hover:bg-emerald-100",
    iconBackground: "bg-emerald-100"
  },
  { 
    name: "Lighters", 
    icon: <Flame className="w-8 h-8 text-orange-700" />,
    slug: "lighters",
    description: "Premium torch & soft flame lighters",
    color: "bg-orange-50",
    borderColor: "border-orange-200",
    hoverColor: "hover:bg-orange-100",
    iconBackground: "bg-orange-100"
  },
  { 
    name: "Accessories", 
    icon: <Package className="w-8 h-8 text-blue-700" />,
    slug: "cigar-accessories",
    description: "Essential accessories for enthusiasts",
    color: "bg-blue-50",
    borderColor: "border-blue-200",
    hoverColor: "hover:bg-blue-100",
    iconBackground: "bg-blue-100"
  },
];

// Featured testimonials to add social proof
const testimonials = [
  {
    text: "The premium cigar selection is exceptional. I've been a customer for years and the quality never disappoints.",
    author: "James K.",
    rating: 5,
    image: "/api/placeholder/60/60" // Replace with actual customer image
  },
  {
    text: "Fast shipping and impeccable packaging. Their attention to detail is what keeps me coming back.",
    author: "Michael R.",
    rating: 5,
    image: "/api/placeholder/60/60" // Replace with actual customer image
  },
  {
    text: "The glass collection is truly artisanal. Each piece is a work of art that I'm proud to display.",
    author: "Sarah T.",
    rating: 5,
    image: "/api/placeholder/60/60" // Replace with actual customer image
  }
];

// Featured brands for social proof and filling space
const brands = [
  "Cohiba",
  "Montecristo",
  "Arturo Fuente",
  "Padron",
  "Rocky Patel",
  "Davidoff"
];

// Section background colors for a premium look
const sectionStyles = {
  featured: {
    bg: "bg-gradient-to-b from-amber-50 to-white",
    border: "border-amber-200",
    icon: "text-amber-600",
    button: "bg-amber-100 text-amber-800 hover:bg-amber-200"
  },
  bestSellers: {
    bg: "bg-gradient-to-b from-indigo-50 to-white",
    border: "border-indigo-200",
    icon: "text-indigo-600",
    button: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
  },
  newArrivals: {
    bg: "bg-gradient-to-b from-emerald-50 to-white",
    border: "border-emerald-200",
    icon: "text-emerald-600",
    button: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
  },
  onSale: {
    bg: "bg-gradient-to-b from-rose-50 to-white",
    border: "border-rose-200",
    icon: "text-rose-600",
    button: "bg-rose-100 text-rose-800 hover:bg-rose-200"
  }
};

// Premium features to highlight in between sections
const features = [
  {
    icon: <Shield className="w-10 h-10 text-indigo-600" />,
    title: "Authenticity Guaranteed",
    description: "Every product in our collection is 100% authentic and verified by our experts."
  },
  {
    icon: <Gift className="w-10 h-10 text-indigo-600" />,
    title: "Exclusive Packaging",
    description: "Premium packaging for a luxurious unboxing experience with every order."
  },
  {
    icon: <ThumbsUp className="w-10 h-10 text-indigo-600" />,
    title: "Expert Selection",
    description: "Products hand-selected by our team of passionate connoisseurs."
  }
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  
  // Refs for scroll animations
  const featureSectionRef = useRef(null);
  const categorySectionRef = useRef(null);
  const testimonialRef = useRef(null);
  const searchInputRef = useRef(null);
  
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
  
  // Testimonial slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Scroll effects for animations
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setIsScrolled(position > 100);
      
      // Hide initial animation after scroll
      if (position > 300 && showAnimation) {
        setShowAnimation(false);
      }
      
      // Animate sections on scroll
      const animateSections = () => {
        if (featureSectionRef.current) {
          const featureRect = featureSectionRef.current.getBoundingClientRect();
          if (featureRect.top < window.innerHeight * 0.75) {
            featureSectionRef.current.classList.add('animate-fade-in');
          }
        }
        
        if (categorySectionRef.current) {
          const categoryRect = categorySectionRef.current.getBoundingClientRect();
          if (categoryRect.top < window.innerHeight * 0.75) {
            categorySectionRef.current.classList.add('animate-slide-up');
          }
        }
        
        if (testimonialRef.current) {
          const testimonialRect = testimonialRef.current.getBoundingClientRect();
          if (testimonialRect.top < window.innerHeight * 0.75) {
            testimonialRef.current.classList.add('animate-fade-in');
          }
        }
      };
      
      animateSections();
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAnimation]);
  
  // Handle search focus and outside click
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch]);
  
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
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/product/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowSearch(false);
    }
  };
  
  // Product section component with enhanced styling
  const ProductSection = ({ title, products, viewAllLink, icon, emptyMessage, style }) => {
    if (loading) {
      return (
        <div className={`mb-12 md:mb-20 rounded-xl p-6 md:p-8 ${style.bg} shadow-sm`}>
          <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className={style.icon}>{icon}</span>
              {title}
            </h2>
            <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {Array(4).fill().map((_, index) => (
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
        <div className={`mb-12 md:mb-20 rounded-xl p-6 md:p-8 ${style.bg} shadow-sm`}>
          <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className={style.icon}>{icon}</span>
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
      <div className={`mb-12 md:mb-20 rounded-xl p-6 md:p-8 ${style.bg} shadow-sm border border-gray-100`}>
        <div className={`flex justify-between items-center mb-6 border-b-2 ${style.border} pb-3`}>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className={style.icon}>{icon}</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">{title}</span>
          </h2>
          <Link 
            href={viewAllLink} 
            className={`font-medium flex items-center ${style.button} px-3 md:px-4 py-1.5 md:py-2 rounded-full transition-all text-sm md:text-base`}
          >
            View All <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        
        {/* Product Grid - Responsive with 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isAuthenticated={isAuthenticated}
              viewMode="grid"
            />
          ))}
        </div>
        
        {/* Mobile View All button at bottom */}
        <div className="mt-6 text-center md:hidden">
          <Link 
            href={viewAllLink} 
            className={`font-medium inline-flex items-center ${style.button} px-6 py-2 rounded-full transition-all`}
          >
            View All Products <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    );
  };
  
  // Animated features section to add content between product sections
  const FeaturesSection = () => (
    <div ref={featureSectionRef} className="mb-12 md:mb-20 opacity-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-all hover:border-indigo-200 flex flex-col items-center text-center"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="mb-4 bg-indigo-50 p-4 rounded-full border border-indigo-100">
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-900">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
  // Testimonials section to add social proof
  const TestimonialsSection = () => (
    <div ref={testimonialRef} className="mb-12 md:mb-20 opacity-0">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">CUSTOMER EXPERIENCES</h2>
        <div className="h-px w-20 bg-indigo-600 mx-auto"></div>
        <p className="text-gray-600 mt-4 font-light">What our valued customers are saying</p>
      </div>
      
      <div className="relative overflow-hidden">
        <div className="relative h-64 md:h-56 overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 flex items-center justify-center ${
                index === activeTestimonial ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="max-w-2xl bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-indigo-500">
                    <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">&ldquo;{testimonial.text}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Testimonial indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeTestimonial 
                  ? "bg-indigo-600 w-6" 
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
  
  // Featured brands section
  const BrandsSection = () => (
    <div className="mb-12 md:mb-20">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">FEATURED BRANDS</h2>
        <div className="h-px w-20 bg-indigo-600 mx-auto"></div>
        <p className="text-gray-600 mt-4 font-light">Explore our curated selection of premium brands</p>
      </div>
      
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
        {brands.map((brand, index) => (
          <div 
            key={index} 
            className="bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-indigo-200"
          >
            <span className="font-serif tracking-wide text-gray-800">{brand}</span>
          </div>
        ))}
      </div>
    </div>
  );
  
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Initial page loader animation */}
      {showAnimation && (
        <div className="fixed inset-0 bg-indigo-900 z-50 flex items-center justify-center animate-fade-out pointer-events-none">
          <div className="text-white text-4xl font-serif tracking-widest animate-pulse flex items-center gap-3">
            <Zap className="h-8 w-8" />
            AMG WHOLESALE
          </div>
        </div>
      )}
      
      {/* Mobile floating menu button */}
      <button 
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="fixed bottom-4 right-4 z-40 bg-indigo-600 text-white p-3 rounded-full shadow-lg md:hidden"
      >
        {showMobileMenu ? <ChevronDown className="w-6 h-6" /> : <ShoppingBag className="w-6 h-6" />}
      </button>
      
      {/* Search button (mobile) */}
      <button 
        onClick={() => setShowSearch(true)}
        className="fixed bottom-4 left-4 z-40 bg-indigo-600 text-white p-3 rounded-full shadow-lg md:hidden"
      >
        <Search className="w-6 h-6" />
      </button>
      
      {/* Full-screen search overlay */}
      {showSearch && (
        <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-2xl">
            <form onSubmit={handleSearch} className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl py-4 px-5 pl-12 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
              <button 
                type="button" 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70"
                onClick={() => setShowSearch(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      )}
      
      {/* Mobile floating menu */}
      <div className={`fixed bottom-20 right-4 z-40 bg-white rounded-xl shadow-xl p-4 transition-all duration-300 md:hidden ${
        showMobileMenu ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10 pointer-events-none"
      }`}>
        <div className="flex flex-col space-y-3">
          <Link href="/product/category/all" className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            <ShoppingBag className="w-4 h-4" />
            <span>Shop All</span>
          </Link>
          <Link href="/product/category/best-sellers" className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            <TrendingUp className="w-4 h-4" />
            <span>Best Sellers</span>
          </Link>
          <Link href="/product/category/on-sale" className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            <Tag className="w-4 h-4" />
            <span>On Sale</span>
          </Link>
        </div>
      </div>
      
      {/* Animated scroll indicator */}
      <div className={`fixed bottom-24 right-4 z-40 transition-opacity duration-300 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex flex-col items-center animate-bounce bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md">
          <ChevronDown className="text-indigo-600 w-6 h-6" />
          <span className="text-xs font-medium text-gray-700">Scroll</span>
        </div>
      </div>
      
      {/* Hero Section - Enhanced with luxury styling */}
      <div className="relative overflow-hidden bg-gray-900">
        <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full">
          {heroImages.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-indigo-900/40 to-indigo-900/50"></div>
              <div className="h-full w-full relative">
                <img
                  src={image}
                  alt={`Hero slide ${index + 1}`}
                  className="absolute w-full h-full object-cover object-center"
                />
              </div>
            </div>
          ))}
          
          {/* Hero content overlay with luxury styling */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="text-center max-w-2xl mx-auto">
              {/* <div className="mb-6 inline-block">
                <div className="h-px w-20 bg-indigo-400 mx-auto mb-6 animate-fade-in-down"></div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 drop-shadow-lg animate-fade-in-down tracking-wide">
                  PREMIUM COLLECTION
                </h1>
                <div className="h-px w-20 bg-indigo-400 mx-auto mt-6 animate-fade-in-down"></div>
              </div>
              <p className="text-white/90 text-base md:text-lg mb-8 max-w-xl mx-auto drop-shadow-md animate-fade-in-up font-light">
                Discover our exclusive selection of high-quality products crafted for true enthusiasts.
              </p> */}
              <button 
                onClick={() => router.push('/product/category/all')}
                className="bg-white text-indigo-900 font-medium py-3 px-8 rounded-full transition shadow-lg hover:shadow-2xl transform hover:scale-105 animate-fade-in-up"
              >
                Explore Collection
              </button>
            </div>
          </div>
          
          {/* Slider controls - Enhanced with luxury styling */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/90 text-white hover:text-indigo-900 rounded-full p-3 transition hover:scale-110 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/90 text-white hover:text-indigo-900 rounded-full p-3 transition hover:scale-110 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ArrowRight size={20} />
          </button>
          
          {/* Slide indicators - Enhanced with luxury styling */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide 
                  ? "bg-indigo-500 scale-125" 
                    : "bg-white/40 hover:bg-indigo-400/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Premium service bar with luxury styling */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white py-5 border-b border-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center justify-center gap-3 group bg-white/10 p-4 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all transform hover:scale-105">
              <ShoppingBag size={28} className="text-indigo-300 group-hover:scale-110 transition-transform" />
              <span className="font-light tracking-wide">Free Shipping on Orders $100+</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 group bg-white/10 p-4 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all transform hover:scale-105">
              <Clock size={28} className="text-indigo-300 group-hover:scale-110 transition-transform" />
              <span className="font-light tracking-wide">24/7 Customer Support</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 group bg-white/10 p-4 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all transform hover:scale-105">
              <Shield size={28} className="text-indigo-300 group-hover:scale-110 transition-transform" />
              <span className="font-light tracking-wide">100% Satisfaction Guarantee</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Shop by Category Section - Enhanced with color coding */}
        <div className="mb-12 md:mb-20" ref={categorySectionRef}>
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">SHOP BY CATEGORY</h2>
            <div className="h-px w-20 bg-indigo-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 font-light tracking-wide">Browse our premium selection across categories</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Link key={category.slug} href={`/product/category/${category.slug}`}>
                <div 
                  className={`${category.color} rounded-xl shadow-sm hover:shadow-xl transition-all p-4 md:p-6 text-center ${category.borderColor} border h-full flex flex-col items-center justify-center group ${category.hoverColor} transform hover:scale-105`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`${category.iconBackground} p-3 rounded-full mb-3 shadow-sm group-hover:scale-110 transition-all duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Featured Products Section */}
        <ProductSection 
          title="FEATURED PRODUCTS" 
          products={homeData.featuredProducts}
          viewAllLink="/product/category/featured-products"
          icon={<Star className="w-6 h-6" />}
          emptyMessage="Featured products coming soon!"
          style={sectionStyles.featured}
        />
        
        {/* Testimonials Section */}
        {/* <TestimonialsSection /> */}
        
        {/* Promotional Banner 1 - Enhanced with luxury styling */}
        <div className="relative mb-12 md:mb-20 rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.01] transition-all group cursor-pointer" onClick={() => router.push('/product/category/all')}>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-transparent z-10"></div>
          <div className="absolute inset-0 z-20 flex items-center justify-start p-6 md:p-10">
            <div className="max-w-lg">
              <div className="mb-4">
                <div className="h-px w-16 bg-indigo-400 mb-4"></div>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide">PREMIUM SELECTION</h3>
              </div>
              <p className="text-white/90 mb-6 text-sm md:text-base font-light">Discover our handpicked collection of the finest products for enthusiasts.</p>
              <button className="bg-white text-indigo-900 px-5 md:px-6 py-2 md:py-3 rounded-full font-medium hover:bg-gray-100 transition transform group-hover:translate-x-2 shadow-lg">
                Explore Now
              </button>
            </div>
          </div>
          <div className="h-64 lg:h-80 w-full">
            <img src="/home/Website-Banner03-4.jpg" alt="Premium Selection" className="w-full h-full object-cover" />
          </div>
        </div>
        
        {/* Features Highlight */}
        <FeaturesSection />
        
        {/* Best Sellers Banner - Responsive with enhanced styling */}
        <div className="w-full mb-8 rounded-xl overflow-hidden shadow-xl">
          {/* Mobile image */}
          <img 
            src="/home/New-Project-2024-07-10T220546.792mobile.jpg" 
            alt="Best Sellers Banner" 
            className="w-full block md:hidden object-cover"
          />
          
          {/* Desktop image */}
          <img 
            src="/home/label-banner-2-3.jpg" 
            alt="Best Sellers Banner" 
            className="w-full hidden md:block object-cover"
          />
        </div>
        
        {/* Best Sellers Section */}
        <ProductSection 
          title="BEST SELLERS" 
          products={homeData.bestSellers}
          viewAllLink="/product/category/best-sellers"
          icon={<TrendingUp className="w-6 h-6" />}
          emptyMessage="Best sellers will be updated soon!"
          style={sectionStyles.bestSellers}
        />
        
        {/* Featured Brands Section */}
        {/* <BrandsSection /> */}
        
        {/* New Arrivals Banner - Responsive with enhanced styling */}
        <div className="w-full mb-8 rounded-xl overflow-hidden shadow-xl">
          {/* Mobile image */}
          <img 
            src="/home/New-Project-bannerr-mobile-768x54.jpg" 
            alt="New Arrivals Banner" 
            className="w-full block md:hidden object-cover"
          />
          
          {/* Desktop image */}
          <img 
            src="/home/New-Arriaval-Banner-1.png" 
            alt="New Arrivals Banner" 
            className="w-full hidden md:block object-cover"
          />
        </div>
        
        {/* New Arrivals Section */}
        <ProductSection 
          title="NEW ARRIVALS" 
          products={homeData.newArrivals}
          viewAllLink="/product/category/new-arrivals"
          icon={<Sparkles className="w-6 h-6" />}
          emptyMessage="New products coming soon!"
          style={sectionStyles.newArrivals}
        />
        
        {/* Sale Banner - Responsive with enhanced styling */}
        <div className="w-full mb-8 rounded-xl overflow-hidden shadow-xl">
          {/* Mobile image */}
          <img 
            src="/home/New-Project-2024-07-12T154019.979mobile-768x54.jpg" 
            alt="Sale Banner" 
            className="w-full block md:hidden object-cover"
          />
          
          {/* Desktop image */}
          <img 
            src="/home/sale-banner-5.jpg" 
            alt="Sale Banner" 
            className="w-full hidden md:block object-cover"
          />
        </div>
        
        {/* On Sale Section */}
        <ProductSection 
          title="ON SALE" 
          products={homeData.onSale}
          viewAllLink="/product/category/on-sale"
          icon={<Tag className="w-6 h-6" />}
          emptyMessage="No sale items at the moment. Check back soon!"
          style={sectionStyles.onSale}
        />
        
        {/* Newsletter Section with luxury styling */}
        {/* <div className="bg-gradient-to-r from-indigo-800 to-indigo-900 rounded-2xl shadow-xl overflow-hidden mb-12 md:mb-20 backdrop-blur-sm">
          <div className="relative">
            <div className="absolute inset-0 bg-pattern opacity-10"></div>
            <div className="p-6 md:p-10 lg:p-16 flex flex-col md:flex-row items-center justify-between relative z-10">
              <div className="mb-8 md:mb-0 md:w-1/2 text-center md:text-left">
                <div className="mb-4">
                  <div className="h-px w-16 bg-indigo-400 mb-4 md:mx-0 mx-auto"></div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 tracking-wide">STAY UPDATED</h3>
                </div>
                <p className="text-gray-300 mb-4 font-light max-w-md">Subscribe to our newsletter for exclusive deals, new product announcements, and special offers delivered directly to your inbox</p>
              </div>
              <div className="w-full md:w-1/2">
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-grow px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white/10 text-white backdrop-blur-sm border border-white/20"
                  />
                  <button
                    type="submit"
                    className="bg-white hover:bg-gray-100 text-indigo-900 font-medium py-3 px-6 rounded-full transition shadow-lg whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="text-white/70 text-xs mt-3 text-center sm:text-left">Join over 10,000 enthusiasts who receive our weekly newsletter</p>
              </div>
            </div>
          </div>
        </div> */}
        
        {/* Social Proof Counter */}
        <div className="mb-12 md:mb-20 bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-900 mb-2">10k+</div>
              <p className="text-sm text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-900 mb-2">5k+</div>
              <p className="text-sm text-gray-600">Products</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-900 mb-2">50+</div>
              <p className="text-sm text-gray-600">Premium Brands</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-900 mb-2">15+</div>
              <p className="text-sm text-gray-600">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Social Media Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">FOLLOW US</h2>
            <div className="h-px w-20 bg-indigo-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 font-light">Stay connected with us on social media</p>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a href="#" className="bg-white p-4 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-110">
              <Instagram className="w-6 h-6 text-gray-800" />
            </a>
            <a href="#" className="bg-white p-4 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-110">
              <Facebook className="w-6 h-6 text-gray-800" />
            </a>
            <a href="#" className="bg-white p-4 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-110">
              <Twitter className="w-6 h-6 text-gray-800" />
            </a>
          </div>
        </div>
      </div>
      
      {/* "Back to Top" button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-24 right-4 z-40 bg-indigo-600 text-white p-3 rounded-full shadow-lg transition-opacity duration-300 md:right-10 md:bottom-10 ${
          isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>
      
      {/* Custom CSS for premium styling */}
      <style jsx global>{`
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-out {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .animate-fade-out {
          animation: fade-out 1s ease-out forwards;
          animation-delay: 1s;
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        /* Improved typography */
        h1, h2, h3, h4 {
          letter-spacing: 0.02em;
        }
        
        /* Enhanced mobile responsiveness */
        @media (max-width: 768px) {
          .max-w-7xl {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
        
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}
