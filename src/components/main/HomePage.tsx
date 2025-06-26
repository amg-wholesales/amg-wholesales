
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/category/ProductCart"; // Update import path as needed
import { useAuth } from "@/context/authContext";
import { 
  ShoppingBag, 
  Search,
  ArrowRight, 
  ArrowLeft, 
  ChevronDown,
  Plus,
  Heart,
  Star,
  X,
  Menu,
} from "lucide-react";

// Hero slider images
// const heroImages = [
//   "/home/hero1.webp",
//   "/home/hero2.jpg",
//   "/home/hero3.jpg",
// ];
 const heroMedia = [
    { src: "/hero/hero.jpg", type: "image" },
    { src: "/hero/banner.jpg", type: "image" },
    { src: "/hero/video.mp4", type: "video" },
  ];
// Premium categories
const categories = [
  { 
    name: "Glass Pipes", 
    slug: "glass-pipes",
    image: "/home/glasspipes.jpg"
  },
  { 
    name: "Hookahs", 
    slug: "hookahs",
    image: "/home/hookah.png"
  },
  { 
    name: "Cigars", 
    slug: "cigar",
    image: "/home/cigar.jpeg"
  },
  { 
    name: "Grinders", 
    slug: "grinders",
    image: "/home/grinders.jpeg"
  },
  { 
    name: "Lighters", 
    slug: "lighters",
    image: "/home/lighters.jpg"
  },
  { 
    name: "Cigar Accessories", 
    slug: "cigar-accessories",
    image: "/home/cigaraccessories.jpg"
  },
];

// Featured collections
const collections = [
  {
    title: "Premium Handcrafted",
    description: "Discover our collection of artisan pieces",
    image: "/home/banner1.png",
    link: "/collection/premium-handcrafted"
  },
  {
    title: "Limited Editions",
    description: "Exclusive designs with limited availability",
    image: "/home/banner2.png",
    link: "/collection/all"
  }
];

// Featured testimonials
const testimonials = [
  {
    text: "The premium cigar selection is exceptional. I've been a customer for years and the quality never disappoints.",
    author: "James K.",
    location: "New York, NY",
    image: "/api/placeholder/60/60" // Replace with actual customer image
  },
  {
    text: "Fast shipping and impeccable packaging. Their attention to detail is what keeps me coming back.",
    author: "Michael R.",
    location: "Los Angeles, CA",
    image: "/api/placeholder/60/60" // Replace with actual customer image
  },
  {
    text: "The glass collection is truly artisanal. Each piece is a work of art that I'm proud to display.",
    author: "Sarah T.",
    location: "Chicago, IL",
    image: "/api/placeholder/60/60" // Replace with actual customer image
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
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Section refs for scroll effects
  const featuredRef = useRef(null);
  const newArrivalsRef = useRef(null);
  const collectionsRef = useRef(null);
  
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
  
  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
      
      // Element visibility check for fade-in effects
      const isVisible = (element) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight * 0.85;
      };
      
      // Apply fade-in animation to sections
      if (isVisible(featuredRef.current)) {
        featuredRef.current.classList.add('fade-in');
      }
      
      if (isVisible(newArrivalsRef.current)) {
        newArrivalsRef.current.classList.add('fade-in');
      }
      
      if (isVisible(collectionsRef.current)) {
        collectionsRef.current.classList.add('fade-in');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Hero slider auto change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Testimonial auto change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/product/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchOpen(false);
    }
  };
  
  // ProductGrid component for different product sections
  const ProductGrid = ({ title, products, viewAllLink, emptyMessage, loading }) => {
    if (loading) {
      return (
        <div className="mt-16 mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight">{title}</h2>
            <div className="w-24 h-8 bg-gray-100 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {Array(4).fill().map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-100 aspect-square mb-3"></div>
                <div className="h-4 bg-gray-100 w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-100 w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (!products || products.length === 0) {
      return (
        <div className="mt-16 mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight">{title}</h2>
          </div>
          <div className="border border-gray-200 p-8 text-center">
            <p className="text-gray-500">{emptyMessage || "No products available in this category."}</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="mt-16 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight">{title}</h2>
          <Link 
            href={viewAllLink} 
            className="text-sm uppercase tracking-wider hover:underline flex items-center"
          >
            View All <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isAuthenticated={isAuthenticated}
              viewMode="grid"
            />
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link 
            href={viewAllLink} 
            className="text-sm uppercase tracking-wider border border-black px-8 py-3 inline-flex items-center hover:bg-black hover:text-white transition-colors"
          >
            View All Products <ArrowRight size={14} className="ml-2" />
          </Link>
        </div>
      </div>
    );
  };
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Reset state
      setStatus('loading');
      setMessage('');
      
      // API call to the newsletter endpoint
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      // Handle response
      if (response.ok) {
        setStatus('success');
        setMessage('Thank you for subscribing!');
        setEmail(''); // Reset form
      } else {
        const errorData = await response.text();
        throw new Error(errorData || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Failed to subscribe. Please try again later.');
    }
  };

  return (
//     <div className="bg-white">
//       {/* Header - Fixed on scroll */}
      
      
     
      
//       {/* Hero Section */}
//     {/* Hero Section */}
// <section className="relative h-screen">
//   {heroImages.map((image, index) => (
//     <div 
//       key={index}
//       className={`absolute inset-0 transition-opacity duration-1000 ${
//         index === currentSlide ? "opacity-100" : "opacity-0"
//       }`}
//     >
//       <img
//         src={image}
//         alt={`Featured collection ${index + 1}`}
//         className="h-full w-full object-cover object-center"
//       />
//     </div>
//   ))}
  
//   {/* Dark overlay - separate from the image container */}
//   <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
  
//   {/* Hero content - with higher z-index */}
//   <div className="absolute inset-0 flex items-center justify-center px-4 text-center z-20">
//     <div className="max-w-3xl">
//       <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-wide">
//         Discover Premium Collections
//       </h1>
//       <button 
//         onClick={() => router.push('/product/category/all')}
//         className="bg-white text-black px-8 py-3 text-sm uppercase tracking-wider border border-white hover:bg-transparent hover:text-white transition-colors"
//       >
//         Shop Now
//       </button>
//     </div>
//   </div>
  
//   {/* Hero slider navigation - with higher z-index */}
//   <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6 z-20">
//     <button 
//       onClick={prevSlide}
//       className="text-white p-2 hover:text-gray-300 transition-colors"
//       aria-label="Previous slide"
//     >
//       <ArrowLeft size={24} />
//     </button>
    
//     <div className="flex space-x-3">
//       {heroImages.map((_, index) => (
//         <button
//           key={index}
//           onClick={() => setCurrentSlide(index)}
//           className={`w-2.5 h-2.5 rounded-full transition-all ${
//             index === currentSlide ? "bg-white scale-100" : "bg-white/50 scale-75 hover:bg-white/70"
//           }`}
//           aria-label={`Go to slide ${index + 1}`}
//         />
//       ))}
//     </div>
    
//     <button 
//       onClick={nextSlide}
//       className="text-white p-2 hover:text-gray-300 transition-colors"
//       aria-label="Next slide"
//     >
//       <ArrowRight size={24} />
//     </button>
//   </div>
// </section>
      
//       {/* Main content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
//         {/* Categories section */}
//         <section className="mb-24">
//           <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-8">Shop by Category</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//             {categories.map((category) => (
//               <Link key={category.slug} href={`/product/category/${category.slug}`}>
//                 <div className="group relative h-64 overflow-hidden">
//                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10"></div>
//                   <img 
//                     src={category.image} 
//                     alt={category.name} 
//                     className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 flex items-center justify-center z-20">
//                     <h3 className="text-white text-lg font-medium tracking-wide">{category.name}</h3>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>
        
//         {/* Featured Products Section */}
//         <section ref={featuredRef} className="opacity-0 transition-opacity duration-700">
//           <ProductGrid 
//             title="Featured Products" 
//             products={homeData.featuredProducts}
//             viewAllLink="/product/category/featured-products"
//             emptyMessage="Featured products coming soon!"
//             loading={loading}
//           />
//         </section>
        
//         {/* Collections Section */}
//         <section ref={collectionsRef} className="my-24 opacity-0 transition-opacity duration-700">
//           <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-8">Curated Collections</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
//             {collections.map((collection, index) => (
//               <Link key={index} href={collection.link}>
//                 <div className="relative h-96 group overflow-hidden">
//                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10"></div>
//                   <img 
//                     src={collection.image} 
//                     alt={collection.title} 
//                     className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
//                   />
//                   <div className="absolute inset-0 flex items-center justify-center z-20">
//                     <div className="text-center px-4">
//                       <h3 className="text-white text-2xl font-medium mb-2">{collection.title}</h3>
//                       <p className="text-white/90 mb-4">{collection.description}</p>
//                       <span className="inline-block border-b border-white text-white text-sm uppercase tracking-wider pb-1">
//                         Explore Collection
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>
        
//         {/* New Arrivals Section */}
//         <section ref={newArrivalsRef} className="opacity-0 transition-opacity duration-700">
//           <ProductGrid 
//             title="New Arrivals" 
//             products={homeData.newArrivals}
//             viewAllLink="/product/category/new-arrivals"
//             emptyMessage="New products coming soon!"
//             loading={loading}
//           />
//         </section>
        
//         {/* Full width promo banner */}
//         <section className="my-24">
//           <div className="relative h-96 overflow-hidden group">
//             <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10"></div>
//             <img 
//               src="/home/selection.png" 
//               alt="Premium Collection" 
//               className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
//             />
//             <div className="absolute inset-0 flex items-center z-20">
//               <div className="max-w-xl ml-16 md:ml-24">
//                 <h2 className="text-3xl md:text-4xl text-white font-light mb-4">Premium Selection</h2>
//                 <p className="text-white/90 mb-6">Discover our handpicked collection of the finest products for enthusiasts.</p>
//                 <Link 
//                   href="/product/category/all"
//                   className="inline-block bg-white text-black px-8 py-3 text-sm uppercase tracking-wider hover:bg-transparent hover:text-white border border-white transition-colors"
//                 >
//                   Explore Now
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </section>
        
//         {/* Best Sellers Section */}
//         <section>
//           <ProductGrid 
//             title="Best Sellers" 
//             products={homeData.bestSellers}
//             viewAllLink="/product/category/best-sellers"
//             emptyMessage="Best sellers will be updated soon!"
//             loading={loading}
//           />
//         </section>
        
//         {/* Testimonials Section */}
//         <section className="my-24">
//           <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-12 text-center">Customer Experiences</h2>
          
//           <div className="relative overflow-hidden h-64">
//             {testimonials.map((testimonial, index) => (
//               <div 
//                 key={index}
//                 className={`absolute inset-0 transition-opacity duration-700 flex items-center justify-center ${
//                   index === currentTestimonial ? "opacity-100" : "opacity-0"
//                 }`}
//               >
//                 <div className="max-w-2xl text-center">
//                   <p className="text-lg md:text-xl italic mb-6">"{testimonial.text}"</p>
//                   <div className="flex items-center justify-center">
//                     {/* <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
//                       <img src={testimonial.image} alt={testimonial.author} className="h-full w-full object-cover" />
//                     </div> */}
//                     <div className="text-left">
//                       <p className="font-medium">{testimonial.author}</p>
//                       <p className="text-sm text-gray-500">{testimonial.location}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           {/* Testimonial indicators */}
//           <div className="flex justify-center mt-8 space-x-2">
//             {testimonials.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentTestimonial(index)}
//                 className={`w-2.5 h-2.5 rounded-full transition-all ${
//                   index === currentTestimonial ? "bg-black scale-100" : "bg-gray-300 scale-75 hover:bg-gray-400"
//                 }`}
//                 aria-label={`Go to testimonial ${index + 1}`}
//               />
//             ))}
//           </div>
//         </section>
        
//         {/* On Sale Section */}
//         <section>
//           <ProductGrid 
//             title="On Sale" 
//             products={homeData.onSale}
//             viewAllLink="/product/category/on-sale"
//             emptyMessage="No sale items at the moment. Check back soon!"
//             loading={loading}
//           />
//         </section>
        
       
//         <section className="mt-24 border-t border-gray-200 pt-16">
//       <div className="max-w-xl mx-auto text-center">
//         <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-4">Stay Connected</h2>
//         <p className="text-gray-600 mb-8">Subscribe to receive updates on new arrivals, special offers and other discount information.</p>
        
//         <form 
//           className="flex flex-col md:flex-row gap-4"
//           onSubmit={handleSubmit}
//         >
//           <input 
//             type="email" 
//             placeholder="Your email address" 
//             className="flex-1 border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             disabled={status === 'loading'}
//           />
//           <button 
//             type="submit"
//             className={`${
//               status === 'loading' 
//                 ? 'bg-gray-400' 
//                 : 'bg-black hover:bg-gray-900'
//             } text-white px-6 py-3 text-sm uppercase tracking-wider transition-colors`}
//             disabled={status === 'loading'}
//           >
//             {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
//           </button>
//         </form>

//         {/* Status message */}
//         {status === 'success' && (
//           <div className="mt-4 p-3 bg-green-50 text-green-800 rounded">
//             {message}
//           </div>
//         )}
        
//         {status === 'error' && (
//           <div className="mt-4 p-3 bg-red-50 text-red-800 rounded">
//             {message}
//           </div>
//         )}
//       </div>
//         </section>

//       </main>
      
    

//       {/* Custom CSS */}
//       <style jsx global>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
        
//         .fade-in {
//           animation: fadeIn 0.8s ease-out forwards;
//         }
//       `}</style>
//     </div>
<div className="bg-white">
  {/* Hero Section */}
  <section className="relative h-screen">
{/*     {heroImages.map((image, index) => (
      <div 
        key={index}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          index === currentSlide ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src={image}
          alt={`Featured collection ${index + 1}`}
          className="h-full w-full object-cover object-center"
        />
      </div>
    ))} */}
     {heroMedia.map((media, index) => (
  <div 
    key={index}
    className={`absolute inset-0 transition-opacity duration-1000 ${
      index === currentSlide ? "opacity-100" : "opacity-0"
    }`}
  >
    {media.type === "image" ? (
      <img
        src={media.src}
        alt={`Featured collection ${index + 1}`}
        className="h-full w-full object-cover object-center"
      />
    ) : (
      <video
        src={media.src}
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover object-center"
      >
        Your browser does not support the video tag.
      </video>
    )}
  </div>
))}
    
    {/* Dark overlay - separate from the image container */}
    <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
    
    {/* Hero content - with higher z-index */}
    <div className="absolute inset-0 flex items-center justify-center px-4 text-center z-20">
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-wide">
          Discover Premium Collections
        </h1>
        <button 
          onClick={() => router.push('/product/category/all')}
          className="bg-white text-black px-8 py-3 text-sm uppercase tracking-wider border border-white hover:bg-transparent hover:text-white transition-colors"
        >
          Shop Now
        </button>
      </div>
    </div>
    
    {/* Hero slider navigation - with higher z-index */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6 z-20">
      <button 
        onClick={prevSlide}
        className="text-white p-2 hover:text-gray-300 transition-colors"
        aria-label="Previous slide"
      >
        <ArrowLeft size={24} />
      </button>
      
      <div className="flex space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentSlide ? "bg-white scale-100" : "bg-white/50 scale-75 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <button 
        onClick={nextSlide}
        className="text-white p-2 hover:text-gray-300 transition-colors"
        aria-label="Next slide"
      >
        <ArrowRight size={24} />
      </button>
    </div>
  </section>
  
  {/* Main content */}
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
    {/* Categories section */}
    <section className="mb-24">
      <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-8">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link key={category.slug} href={`/product/category/${category.slug}`}>
            <div className="group relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10"></div>
              <img 
                src={category.image} 
                alt={category.name} 
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <h3 className="text-white text-lg font-medium tracking-wide">{category.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
    
    {/* About AMG Wholesales Section - NEW */}
    <section className="mb-24">
      <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-8">About AMG Wholesales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 md:p-8 flex items-center">
          <div>
            <p className="mb-4 text-gray-700 leading-relaxed">
              AMG Wholesales is your trusted destination for premium products across a diverse range of categories. Whether you're looking for cutting-edge electronics, stylish fashion, or high-quality home essentials, AMG Wholesales delivers unmatched value and reliability. With a commitment to excellence, we source only the finest products to ensure customer satisfaction. Our extensive collection caters to every need, providing affordability without compromising on quality.
            </p>
            <p className="text-gray-700 leading-relaxed">
              At AMG Wholesales, customer satisfaction is at the heart of everything we do. We pride ourselves on offering a seamless shopping experience, from easy navigation to prompt delivery and exceptional service. Whether you're upgrading your lifestyle or searching for the best deals, AMG Wholesales is your go-to partner for quality and convenience. Explore our premium selection today and discover why AMG Wholesales is the preferred choice for discerning shoppers!
            </p>
          </div>
        </div>
        <div className="relative h-full min-h-[300px] overflow-hidden group">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10"></div>
          <img 
            src="/home/selection.png" 
            alt="About AMG Wholesales" 
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </div>
    </section>
    
    {/* Featured Products Section */}
    <section ref={featuredRef} className="opacity-0 transition-opacity duration-700">
      <ProductGrid 
        title="Featured Products" 
        products={homeData.featuredProducts}
        viewAllLink="/product/category/featured-products"
        emptyMessage="Featured products coming soon!"
        loading={loading}
      />
    </section>
    
    {/* Collections Section */}
    <section ref={collectionsRef} className="my-24 opacity-0 transition-opacity duration-700">
      <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-8">Curated Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        {collections.map((collection, index) => (
          <Link key={index} href={collection.link}>
            <div className="relative h-96 group overflow-hidden">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10"></div>
              <img 
                src={collection.image} 
                alt={collection.title} 
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center px-4">
                  <h3 className="text-white text-2xl font-medium mb-2">{collection.title}</h3>
                  <p className="text-white/90 mb-4">{collection.description}</p>
                  <span className="inline-block border-b border-white text-white text-sm uppercase tracking-wider pb-1">
                    Explore Collection
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
    
    {/* New Arrivals Section */}
    <section ref={newArrivalsRef} className="opacity-0 transition-opacity duration-700">
      <ProductGrid 
        title="New Arrivals" 
        products={homeData.newArrivals}
        viewAllLink="/product/category/new-arrivals"
        emptyMessage="New products coming soon!"
        loading={loading}
      />
    </section>
    
    {/* Full width promo banner */}
    <section className="my-24">
      <div className="relative h-96 overflow-hidden group">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10"></div>
        <img 
          src="/home/selection.png" 
          alt="Premium Collection" 
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center z-20">
          <div className="max-w-xl ml-16 md:ml-24">
            <h2 className="text-3xl md:text-4xl text-white font-light mb-4">Premium Selection</h2>
            <p className="text-white/90 mb-6">Discover our handpicked collection of the finest products for enthusiasts.</p>
            <Link 
              href="/product/category/all"
              className="inline-block bg-white text-black px-8 py-3 text-sm uppercase tracking-wider hover:bg-transparent hover:text-white border border-white transition-colors"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </div>
    </section>
    
    {/* Best Sellers Section */}
    <section>
      <ProductGrid 
        title="Best Sellers" 
        products={homeData.bestSellers}
        viewAllLink="/product/category/best-sellers"
        emptyMessage="Best sellers will be updated soon!"
        loading={loading}
      />
    </section>
    
    {/* Testimonials Section */}
    <section className="my-24">
      <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-12 text-center">Customer Experiences</h2>
      
      <div className="relative overflow-hidden h-64">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 flex items-center justify-center ${
              index === currentTestimonial ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="max-w-2xl text-center">
              <p className="text-lg md:text-xl italic mb-6">"{testimonial.text}"</p>
              <div className="flex items-center justify-center">
                {/* <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img src={testimonial.image} alt={testimonial.author} className="h-full w-full object-cover" />
                </div> */}
                <div className="text-left">
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Testimonial indicators */}
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentTestimonial ? "bg-black scale-100" : "bg-gray-300 scale-75 hover:bg-gray-400"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
    
    {/* On Sale Section */}
    <section>
      <ProductGrid 
        title="On Sale" 
        products={homeData.onSale}
        viewAllLink="/product/category/on-sale"
        emptyMessage="No sale items at the moment. Check back soon!"
        loading={loading}
      />
    </section>
    
    {/* FAQ Section - NEW */}
    <section className="mt-24 border-t border-gray-200 pt-16">
      <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-12 text-center">Frequently Asked Questions</h2>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h3 className="text-xl font-medium mb-6">General Questions</h3>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium mb-2">1. What is AMG Wholesales?</h4>
              <p className="text-gray-600">AMG Wholesales is a trusted destination for premium products across various categories, offering quality, affordability, and reliability.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium mb-2">2. What types of products does AMG Wholesales offer?</h4>
              <p className="text-gray-600">We provide a diverse selection, including cigar, Flowe/ wax & oil, Glass, Hookah, Kratom, and more.</p>
            </div>
          </div>
        </div>
        
        <div className="mb-10">
          <h3 className="text-xl font-medium mb-6">Ordering & Shipping</h3>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium mb-2">3. How can I place an order?</h4>
              <p className="text-gray-600">You can easily browse our website, add items to your cart, and proceed with secure checkout.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium mb-2">4. Do you offer international shipping?</h4>
              <p className="text-gray-600">Yes, we provide international shipping options. Shipping rates and delivery times vary by location.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium mb-2">5. How long does delivery take?</h4>
              <p className="text-gray-600">Delivery times depend on your location and the shipping method chosen. You'll receive tracking details once your order is shipped.</p>
            </div>
          </div>
        </div>
        
        <div className="mb-10">
          <h3 className="text-xl font-medium mb-6">Returns & Refunds</h3>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium mb-2">6. What is your return policy?</h4>
              <p className="text-gray-600">We offer hassle-free returns within a specific timeframe. Please check our return policy for details.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium mb-2">7. How do I request a refund?</h4>
              <p className="text-gray-600">If eligible, refunds will be processed based on our return policy. Contact customer support for assistance.</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-6">Customer Support & Assistance</h3>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium mb-2">8. How can I contact AMG Wholesales?</h4>
              <p className="text-gray-600">You can reach our customer support via email, phone, or live chat on our website.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h4 className="font-medium mb-2">9. Do you offer bulk purchasing or wholesale discounts?</h4>
              <p className="text-gray-600">Yes, we provide bulk purchasing options and special pricing for wholesale buyers. Contact us for details.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    {/* Stay Connected Newsletter Section */}
    <section className="mt-24 border-t border-gray-200 pt-16">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-4">Stay Connected</h2>
        <p className="text-gray-600 mb-8">Subscribe to receive updates on new arrivals, special offers and other discount information.</p>
        
        <form 
          className="flex flex-col md:flex-row gap-4"
          onSubmit={handleSubmit}
        >
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-1 border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'loading'}
          />
          <button 
            type="submit"
            className={`${
              status === 'loading' 
                ? 'bg-gray-400' 
                : 'bg-black hover:bg-gray-900'
            } text-white px-6 py-3 text-sm uppercase tracking-wider transition-colors`}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {/* Status message */}
        {status === 'success' && (
          <div className="mt-4 p-3 bg-green-50 text-green-800 rounded">
            {message}
          </div>
        )}
        
        {status === 'error' && (
          <div className="mt-4 p-3 bg-red-50 text-red-800 rounded">
            {message}
          </div>
        )}
      </div>
    </section>
  </main>
  
  {/* Custom CSS */}
  <style jsx global>{`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }
  `}</style>
</div>
  );
}
