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
// //   Sparkles
// // } from "lucide-react";

// // // Hero slider images
// // const heroImages = [
// //   "/home/CIGAR-DEAL-APRIL-2025-v02-6.jpg",
// //   "/home/MONTECRISTO-WHITE-v01-2.jpg",
// //   "/home/rocky-patel-v001-6.jpg",
// //   // You can add more hero images here
// // ];

// // // Featured categories
// // const categories = [
// //   { name: "Glass Pipes", icon: "🔍", slug: "glass-pipes" },
// //   { name: "Hookahs", icon: "💨", slug: "hookahs" },
// //   { name: "Cigar", icon: "🚬", slug: "cigar" },
// //   { name: "Grinders", icon: "⚙️", slug: "grinders" },
// //   { name: "Lighters", icon: "🔥", slug: "lighters" },
// //   { name: "Accessories", icon: "🧰", slug: "cigar-accessories" },
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
  
// //   // Product section component
// //   const ProductSection = ({ title, products, viewAllLink, icon, emptyMessage }) => {
// //     if (loading) {
// //       return (
// //         <div className="mb-16">
// //           <div className="flex justify-between items-center mb-6">
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
// //           <div className="flex justify-between items-center mb-6">
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
// //         <div className="flex justify-end items-center mb-6 pr-4">
// //           <Link 
// //             href={viewAllLink} 
// //             className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
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
// //     <div className="bg-gray-50 min-h-screen">
// //       {/* Hero Section */}
// //       <div className="relative overflow-hidden bg-white">
// //         <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
// //           {heroImages.map((image, index) => (
// //             <div 
// //               key={index}
// //               className={`absolute inset-0 transition-opacity duration-1000 ${
// //                 index === currentSlide ? "opacity-100" : "opacity-0"
// //               }`}
// //             >
// //               <img
// //                 src={image}
// //                 alt={`Hero slide ${index + 1}`}
// //                 fill
// //                 priority
// //                 sizes="100vw"
// //                 className="object-contain"
// //               />
// //             </div>
// //           ))}
          
// //           {/* Hero content overlay */}
// //           <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center justify-center">
// //             <div className="container mx-auto flex justify-center items-center">
// //               <button 
// //                 onClick={() => router.push('/product/category/all')}
// //                 className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition shadow-lg hover:shadow-xl"
// //                 style={{ marginTop: '4rem' }}
// //               >
// //                 View All Products
// //               </button>
// //             </div>
// //           </div>
// //           {/* Slider controls */}
// //           <button 
// //             onClick={prevSlide}
// //             className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition"
// //             aria-label="Previous slide"
// //           >
// //             <ArrowLeft size={24} />
// //           </button>
// //           <button 
// //             onClick={nextSlide}
// //             className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition"
// //             aria-label="Next slide"
// //           >
// //             <ArrowRight size={24} />
// //           </button>
          
// //           {/* Slide indicators */}
// //           <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
// //             {heroImages.map((_, index) => (
// //               <button
// //                 key={index}
// //                 onClick={() => setCurrentSlide(index)}
// //                 className={`w-3 h-3 rounded-full transition-colors ${
// //                   index === currentSlide ? "bg-white" : "bg-white/40 hover:bg-white/60"
// //                 }`}
// //                 aria-label={`Go to slide ${index + 1}`}
// //               />
// //             ))}
// //           </div>
// //         </div>
// //       </div>
      
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         {/* Shop by Category Section */}
// //         <div className="mb-16">
// //           <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Category</h2>
// //           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
// //             {categories.map((category) => (
// //               <Link key={category.slug} href={`/product/category/${category.slug}`}>
// //                 <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 text-center border border-gray-200 h-full flex flex-col items-center justify-center">
// //                   <div className="text-3xl mb-3">{category.icon}</div>
// //                   <h3 className="font-medium text-gray-900">{category.name}</h3>
// //                 </div>
// //               </Link>
// //             ))}
// //           </div>
// //         </div>
        
// //         {/* Featured Products Section */}
// //         <ProductSection 
// //           title="Featured Products" 
// //           products={homeData.featuredProducts}
// //           viewAllLink="/products/category/featured-products"
// //           icon={<Star className="w-6 h-6 text-amber-500" />}
// //           emptyMessage="Featured products coming soon!"
// //         />
        

// //         {/* Promotional Banner 1 */}
// //         <div className="h-64 mb-16 bg-[url('/home/Website-Banner03-4.jpg')] bg-cover bg-center rounded-xl overflow-hidden" onClick={() => router.push('/product/category/all')}></div>
        
      
        

       
// //         <div className="w-full md:mb-16">
// //   {/* Mobile image (hidden on md screens and larger) */}
// //   <img 
// //     src="/home/New-Project-2024-07-10T220546.792mobile.jpg" 
// //     alt="Best Sellers Banner" 
// //     className="w-full block md:hidden"
// //   />
  
// //   {/* Desktop image (hidden on smaller than md screens) */}
// //   <img 
// //     src="/home/label-banner-2-3.jpg" 
// //     alt="Best Sellers Banner" 
// //     className="w-full hidden md:block md:object-cover"
// //   />
// // </div>

// //         <ProductSection 
// //           title="Best Sellers" 
// //           products={homeData.bestSellers}
// //           viewAllLink="/products/category/best-sellers"
// //           icon={<TrendingUp className="w-6 h-6 text-green-500" />}
// //           emptyMessage="Best sellers will be updated soon!"
// //         />
     

        
// // <div className="w-full md:mb-16">
// //   {/* Mobile image (hidden on md screens and larger) */}
// //   <img 
// //     src="/home/New-Project-bannerr-mobile-768x54.jpg" 
// //     alt="Best Sellers Banner" 
// //     className="w-full block md:hidden"
// //   />
  
// //   {/* Desktop image (hidden on smaller than md screens) */}
// //   <img 
// //     src="/home/New-Arriaval-Banner-1.png" 
// //     alt="Best Sellers Banner" 
// //     className="w-full hidden md:block md:object-cover"
// //   />
// // </div>
        
// //         {/* New Arrivals Section */}
// //         <ProductSection 
// //           title="New Arrivals" 
// //           products={homeData.newArrivals}
// //           viewAllLink="/product/category/new-arrivals"
// //           icon={<Sparkles className="w-6 h-6 text-blue-500" />}
// //           emptyMessage="New products coming soon!"
// //         />
        
     

// // <div className="w-full md:mb-16">
// //   {/* Mobile image (hidden on md screens and larger) */}
// //   <img 
// //     src="/home/New-Project-2024-07-12T154019.979mobile-768x54.jpg" 
// //     alt="Best Sellers Banner" 
// //     className="w-full block md:hidden"
// //   />
  
// //   {/* Desktop image (hidden on smaller than md screens) */}
// //   <img 
// //     src="/home/sale-banner-5.jpg" 
// //     alt="Best Sellers Banner" 
// //     className="w-full hidden md:block md:object-cover"
// //   />
// // </div>
// //         {/* On Sale Section */}
// //         <ProductSection 
// //           title="On Sale" 
// //           products={homeData.onSale}
// //           viewAllLink="/productscategory/on-sale"
// //           icon={<Tag className="w-6 h-6 text-red-500" />}
// //           emptyMessage="No sale items at the moment. Check back soon!"
// //         />
        
      
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useState, useEffect } from "react";
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
//   Shield
// } from "lucide-react";

// // Hero slider images
// const heroImages = [
//   "/home/CIGAR-DEAL-APRIL-2025-v02-6.jpg",
//   "/home/MONTECRISTO-WHITE-v01-2.jpg",
//   "/home/rocky-patel-v001-6.jpg",
//   // You can add more hero images here
// ];

// // Featured categories with enhanced icons and descriptions
// const categories = [
//   { 
//     name: "Glass Pipes", 
//     icon: "🔍", 
//     slug: "glass-pipes",
//     description: "Premium handcrafted glass pipes"
//   },
//   { 
//     name: "Hookahs", 
//     icon: "💨", 
//     slug: "hookahs",
//     description: "Traditional & modern hookahs"
//   },
//   { 
//     name: "Cigars", 
//     icon: "🚬", 
//     slug: "cigar",
//     description: "Fine hand-rolled cigars"
//   },
//   { 
//     name: "Grinders", 
//     icon: "⚙️", 
//     slug: "grinders",
//     description: "Precision engineered grinders"
//   },
//   { 
//     name: "Lighters", 
//     icon: "🔥", 
//     slug: "lighters",
//     description: "Premium torch & soft flame lighters"
//   },
//   { 
//     name: "Accessories", 
//     icon: "🧰", 
//     slug: "cigar-accessories",
//     description: "Essential accessories for enthusiasts"
//   },
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
  
//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       const position = window.scrollY;
//       setIsScrolled(position > 100);
//     };
    
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
  
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
//   const ProductSection = ({ title, products, viewAllLink, icon, emptyMessage }) => {
//     if (loading) {
//       return (
//         <div className="mb-16">
//           <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
//             <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//               {icon}
//               {title}
//             </h2>
//             <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {Array(8).fill().map((_, index) => (
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
//         <div className="mb-16">
//           <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
//             <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//               {icon}
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
//       <div className="mb-16">
//         <div className="flex justify-between items-center mb-6 border-b-2 border-gray-200 pb-3">
//           <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//             {icon}
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-indigo-800">{title}</span>
//           </h2>
//           <Link 
//             href={viewAllLink} 
//             className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center bg-indigo-50 px-4 py-2 rounded-full transition-all hover:bg-indigo-100"
//           >
//             View All <ChevronRight size={16} className="ml-1" />
//           </Link>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {products.slice(0, 8).map((product) => (
//             <ProductCard 
//               key={product.id} 
//               product={product} 
//               isAuthenticated={isAuthenticated}
//               viewMode="grid"
//             />
//           ))}
//         </div>
//       </div>
//     );
//   };
  
//   return (
//     <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
//       {/* Animated scroll indicator */}
//       <div className={`fixed bottom-10 right-10 z-50 transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
//         <div className="flex flex-col items-center animate-bounce">
//           <ChevronDown className="text-indigo-600 w-8 h-8" />
//           <span className="text-xs font-medium text-gray-700">Scroll</span>
//         </div>
//       </div>
      
//       {/* Hero Section - Enhanced with luxury styling */}
//       <div className="relative overflow-hidden bg-black">
//         <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full">
//           {heroImages.map((image, index) => (
//             <div 
//               key={index}
//               className={`absolute inset-0 transition-opacity duration-1000 ${
//                 index === currentSlide ? "opacity-100" : "opacity-0"
//               }`}
//             >
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
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
//                 <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg animate-fade-in-down tracking-wide">
//                   PREMIUM COLLECTION
//                 </h1>
//                 <div className="h-px w-20 bg-gold mx-auto mt-6 animate-fade-in-down"></div>
//               </div>
//               <p className="text-white text-lg mb-8 max-w-xl mx-auto drop-shadow-md animate-fade-in-up hidden md:block font-light">
//                 Discover our exclusive selection of high-quality products crafted for true enthusiasts.
//               </p>
//               <button 
//                 onClick={() => router.push('/product/category/all')}
//                 className="bg-gradient-to-r from-gold-dark to-gold text-gray-900 font-medium py-3 px-8 rounded-full transition shadow-lg hover:shadow-2xl transform hover:scale-105"
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
//       <div className="bg-gradient-to-r from-gray-900 to-indigo-900 text-white py-4 border-b border-gold/20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
//             <div className="flex items-center justify-center gap-2 group">
//               <ShoppingBag size={20} className="text-gold group-hover:scale-110 transition-transform" />
//               <span className="font-light tracking-wide">Free Shipping on Orders $100+</span>
//             </div>
//             <div className="flex items-center justify-center gap-2 group">
//               <Clock size={20} className="text-gold group-hover:scale-110 transition-transform" />
//               <span className="font-light tracking-wide">24/7 Customer Support</span>
//             </div>
//             <div className="flex items-center justify-center gap-2 group">
//               <Shield size={20} className="text-gold group-hover:scale-110 transition-transform" />
//               <span className="font-light tracking-wide">100% Satisfaction Guarantee</span>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Shop by Category Section - Enhanced with luxury styling */}
//         <div className="mb-16">
//           <div className="text-center mb-10">
//             <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-indigo-800">SHOP BY CATEGORY</h2>
//             <div className="h-px w-20 bg-gold mx-auto"></div>
//             <p className="text-gray-600 mt-4 font-light tracking-wide">Browse our premium selection across categories</p>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//             {categories.map((category) => (
//               <Link key={category.slug} href={`/product/category/${category.slug}`}>
//                 <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all p-6 text-center border border-gray-200 h-full flex flex-col items-center justify-center group hover:border-gold/50">
//                   <div className="text-4xl mb-3 transform transition-transform group-hover:scale-110">{category.icon}</div>
//                   <h3 className="font-medium text-gray-900 mb-1">{category.name}</h3>
//                   <p className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{category.description}</p>
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
//           icon={<Star className="w-6 h-6 text-gold" />}
//           emptyMessage="Featured products coming soon!"
//         />
        
//         {/* Promotional Banner 1 - Enhanced with luxury styling */}
//         <div className="relative mb-16 rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.01] transition-all group cursor-pointer" onClick={() => router.push('/product/category/all')}>
//           <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
//           <div className="absolute inset-0 z-20 flex items-center justify-start p-10">
//             <div className="max-w-lg">
//               <div className="mb-4">
//                 <div className="h-px w-16 bg-gold mb-4"></div>
//                 <h3 className="text-3xl font-bold text-white tracking-wide">PREMIUM SELECTION</h3>
//               </div>
//               <p className="text-white/90 mb-6 hidden md:block font-light">Discover our handpicked collection of the finest products for enthusiasts.</p>
//               <button className="bg-gold text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-white transition transform group-hover:translate-x-2 shadow-lg">
//                 Explore Now
//               </button>
//             </div>
//           </div>
//           <div className="h-64 lg:h-96 w-full">
//             <img src="/home/Website-Banner03-4.jpg" alt="Premium Selection" className="w-full h-full object-cover" />
//           </div>
//         </div>
        
//         {/* Best Sellers Banner - Responsive with enhanced styling */}
//         <div className="w-full mb-16 rounded-xl overflow-hidden shadow-xl">
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
//           icon={<TrendingUp className="w-6 h-6 text-gold" />}
//           emptyMessage="Best sellers will be updated soon!"
//         />
        
//         {/* New Arrivals Banner - Responsive with enhanced styling */}
//         <div className="w-full mb-16 rounded-xl overflow-hidden shadow-xl">
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
//           icon={<Sparkles className="w-6 h-6 text-gold" />}
//           emptyMessage="New products coming soon!"
//         />
        
//         {/* Sale Banner - Responsive with enhanced styling */}
//         <div className="w-full mb-16 rounded-xl overflow-hidden shadow-xl">
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
//           icon={<Tag className="w-6 h-6 text-gold" />}
//           emptyMessage="No sale items at the moment. Check back soon!"
//         />
        
//         {/* Newsletter Section with luxury styling */}
//         <div className="bg-gradient-to-r from-gray-900 to-indigo-900 rounded-2xl shadow-xl overflow-hidden mb-16 border border-gold/10">
//           <div className="p-10 md:p-16 flex flex-col md:flex-row items-center justify-between">
//             <div className="mb-8 md:mb-0 md:w-1/2 text-center md:text-left">
//               <div className="mb-4">
//                 <div className="h-px w-16 bg-gold mb-4 md:mx-0 mx-auto"></div>
//                 <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">STAY UPDATED</h3>
//               </div>
//               <p className="text-indigo-100 mb-4 font-light">Subscribe to our newsletter for exclusive deals and updates</p>
//             </div>
//             <div className="w-full md:w-1/2">
//               <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Your email address"
//                   required
//                   className="flex-grow px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-gold/50"
//                 />
//                 <button
//                   type="submit"
//                   className="bg-gold hover:bg-gold-dark text-gray-900 font-medium py-3 px-6 rounded-full transition shadow-lg"
//                 >
//                   Subscribe
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Footer trust badges with luxury styling */}
//       <div className="bg-gradient-to-r from-gray-50 to-white py-8 border-t border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-6">
//             <h3 className="text-lg font-medium text-gray-900 mb-4 tracking-wide">TRUSTED BY ENTHUSIASTS WORLDWIDE</h3>
//             <div className="h-px w-20 bg-gold mx-auto"></div>
//           </div>
//           <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
//             <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
//             <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
//             <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
//             <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
//             <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
//           </div>
//         </div>
//       </div>
      
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
        
//         .animate-fade-in-down {
//           animation: fade-in-down 0.8s ease-out forwards;
//         }
        
//         .animate-fade-in-up {
//           animation: fade-in-up 0.8s ease-out forwards;
//           animation-delay: 0.3s;
//           opacity: 0;
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
        
//         .hover\:bg-gold:hover {
//           background-color: #D4AF37;
//         }
        
//         .hover\:bg-gold-dark:hover {
//           background-color: #B8860B;
//         }
        
//         .hover\:text-gold:hover {
//           color: #D4AF37;
//         }
        
//         .hover\:border-gold:hover {
//           border-color: #D4AF37;
//         }
        
//         .focus\:ring-gold:focus {
//           --tw-ring-color: #D4AF37;
//         }
//       `}</style>
//     </div>
//   );
// }
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
  Sparkles,
  ChevronDown,
  Shield,
  PenTool,
  Wind,
  Feather,
  Settings,
  Flame,
  Package
} from "lucide-react";

// Hero slider images
const heroImages = [
  "/home/CIGAR-DEAL-APRIL-2025-v02-6.jpg",
  "/home/MONTECRISTO-WHITE-v01-2.jpg",
  "/home/rocky-patel-v001-6.jpg",
  // You can add more hero images here
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
  
  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setIsScrolled(position > 100);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
  
  // Product section component with enhanced styling
  const ProductSection = ({ title, products, viewAllLink, icon, emptyMessage, style }) => {
    if (loading) {
      return (
        <div className={`mb-16 rounded-xl p-8 ${style.bg}`}>
          <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className={style.icon}>{icon}</span>
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
        <div className={`mb-16 rounded-xl p-8 ${style.bg}`}>
          <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
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
      <div className={`mb-16 rounded-xl p-8 ${style.bg}`}>
        <div className={`flex justify-between items-center mb-6 border-b-2 ${style.border} pb-3`}>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className={style.icon}>{icon}</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">{title}</span>
          </h2>
          <Link 
            href={viewAllLink} 
            className={`font-medium flex items-center ${style.button} px-4 py-2 rounded-full transition-all`}
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
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Animated scroll indicator */}
      <div className={`fixed bottom-10 right-10 z-50 transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex flex-col items-center animate-bounce">
          <ChevronDown className="text-gold w-8 h-8" />
          <span className="text-xs font-medium text-gray-700">Scroll</span>
        </div>
      </div>
      
      {/* Hero Section - Enhanced with luxury styling */}
      <div className="relative overflow-hidden bg-black">
        <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] w-full">
          {heroImages.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
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
              <div className="mb-6 inline-block">
                <div className="h-px w-20 bg-gold mx-auto mb-6 animate-fade-in-down"></div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg animate-fade-in-down tracking-wide">
                  PREMIUM COLLECTION
                </h1>
                <div className="h-px w-20 bg-gold mx-auto mt-6 animate-fade-in-down"></div>
              </div>
              <p className="text-white text-lg mb-8 max-w-xl mx-auto drop-shadow-md animate-fade-in-up hidden md:block font-light">
                Discover our exclusive selection of high-quality products crafted for true enthusiasts.
              </p>
              <button 
                onClick={() => router.push('/product/category/all')}
                className="bg-gradient-to-r from-gold-dark to-gold text-gray-900 font-medium py-3 px-8 rounded-full transition shadow-lg hover:shadow-2xl transform hover:scale-105"
              >
                Explore Collection
              </button>
            </div>
          </div>
          
          {/* Slider controls - Enhanced with luxury styling */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-gold/90 text-white hover:text-gray-900 rounded-full p-3 transition hover:scale-110 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-gold/90 text-white hover:text-gray-900 rounded-full p-3 transition hover:scale-110 backdrop-blur-sm"
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
                    ? "bg-gold scale-125" 
                    : "bg-white/40 hover:bg-gold/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Premium service bar with luxury styling */}
      <div className="bg-gradient-to-r from-gray-900 to-indigo-900 text-white py-5 border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center justify-center gap-3 group bg-black/20 p-4 rounded-lg backdrop-blur-sm">
              <ShoppingBag size={24} className="text-gold group-hover:scale-110 transition-transform" />
              <span className="font-light tracking-wide">Free Shipping on Orders $100+</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 group bg-black/20 p-4 rounded-lg backdrop-blur-sm">
              <Clock size={24} className="text-gold group-hover:scale-110 transition-transform" />
              <span className="font-light tracking-wide">24/7 Customer Support</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 group bg-black/20 p-4 rounded-lg backdrop-blur-sm">
              <Shield size={24} className="text-gold group-hover:scale-110 transition-transform" />
              <span className="font-light tracking-wide">100% Satisfaction Guarantee</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Shop by Category Section - Enhanced with color coding */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">SHOP BY CATEGORY</h2>
            <div className="h-px w-20 bg-gold mx-auto"></div>
            <p className="text-gray-600 mt-4 font-light tracking-wide">Browse our premium selection across categories</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link key={category.slug} href={`/product/category/${category.slug}`}>
                <div className={`${category.color} rounded-xl shadow-sm hover:shadow-xl transition-all p-6 text-center ${category.borderColor} border h-full flex flex-col items-center justify-center group ${category.hoverColor}`}>
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
          viewAllLink="/products/category/featured-products"
          icon={<Star className="w-6 h-6" />}
          emptyMessage="Featured products coming soon!"
          style={sectionStyles.featured}
        />
        
        {/* Promotional Banner 1 - Enhanced with luxury styling */}
        <div className="relative mb-16 rounded-xl overflow-hidden shadow-xl transform hover:scale-[1.01] transition-all group cursor-pointer" onClick={() => router.push('/product/category/all')}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
          <div className="absolute inset-0 z-20 flex items-center justify-start p-10">
            <div className="max-w-lg">
              <div className="mb-4">
                <div className="h-px w-16 bg-gold mb-4"></div>
                <h3 className="text-3xl font-bold text-white tracking-wide">PREMIUM SELECTION</h3>
              </div>
              <p className="text-white/90 mb-6 hidden md:block font-light">Discover our handpicked collection of the finest products for enthusiasts.</p>
              <button className="bg-gold text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-white transition transform group-hover:translate-x-2 shadow-lg">
                Explore Now
              </button>
            </div>
          </div>
          <div className="h-64 lg:h-96 w-full">
            <img src="/home/Website-Banner03-4.jpg" alt="Premium Selection" className="w-full h-full object-cover" />
          </div>
        </div>
        
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
          viewAllLink="/products/category/best-sellers"
          icon={<TrendingUp className="w-6 h-6" />}
          emptyMessage="Best sellers will be updated soon!"
          style={sectionStyles.bestSellers}
        />
        
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
          viewAllLink="/productscategory/on-sale"
          icon={<Tag className="w-6 h-6" />}
          emptyMessage="No sale items at the moment. Check back soon!"
          style={sectionStyles.onSale}
        />
        
        {/* Newsletter Section with luxury styling */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-xl overflow-hidden mb-16 backdrop-blur-sm">
          <div className="relative">
            <div className="absolute inset-0 bg-pattern opacity-10"></div>
            <div className="p-10 md:p-16 flex flex-col md:flex-row items-center justify-between relative z-10">
              <div className="mb-8 md:mb-0 md:w-1/2 text-center md:text-left">
                <div className="mb-4">
                  <div className="h-px w-16 bg-gold mb-4 md:mx-0 mx-auto"></div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">STAY UPDATED</h3>
                </div>
                <p className="text-gray-300 mb-4 font-light">Subscribe to our newsletter for exclusive deals and updates</p>
              </div>
              <div className="w-full md:w-1/2">
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-grow px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white/10 text-white backdrop-blur-sm border border-white/20"
                  />
                  <button
                    type="submit"
                    className="bg-gold hover:bg-gold-dark text-gray-900 font-medium py-3 px-6 rounded-full transition shadow-lg"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer trust badges with luxury styling */}
      <div className="bg-gradient-to-r from-gray-100 to-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-wide">TRUSTED BY ENTHUSIASTS WORLDWIDE</h3>
            <div className="h-px w-20 bg-gold mx-auto"></div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
      
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
        
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }
        
        .bg-gold {
          background-color: #D4AF37;
        }
        
        .bg-gold-dark {
          background-color: #B8860B;
        }
        
        .text-gold {
          color: #D4AF37;
        }
        
        .border-gold {
          border-color: #D4AF37;
        }
        
        .hover\\:bg-gold:hover {
          background-color: #D4AF37;
        }
        
        .hover\\:bg-gold-dark:hover {
          background-color: #B8860B;
        }
        
        .hover\\:text-gold:hover {
          color: #D4AF37;
        }
        
        .hover\\:border-gold:hover {
          border-color: #D4AF37;
        }
        
        .focus\\:ring-gold:focus {
          --tw-ring-color: #D4AF37;
        }
        
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}