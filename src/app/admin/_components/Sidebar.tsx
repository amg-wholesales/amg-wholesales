
// "use client";

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { usePathname } from 'next/navigation';
// import { Menu, Home, Package, Book, Edit, ShoppingCart, LogOut, ChevronRight, ChevronLeft, X } from 'lucide-react';
// import { useAuth } from "@/context/authContext";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isMobileView, setIsMobileView] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();
//   const { logout } = useAuth();
  
//   // Check if mobile view on mount and when window resizes
//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobileView(window.innerWidth < 768);
//       // Auto close sidebar on mobile
//       if (window.innerWidth < 768) {
//         setIsOpen(false);
//       } else {
//         setIsOpen(true);
//       }
//     };
    
//     // Initial check
//     checkIfMobile();
    
//     // Add event listener
//     window.addEventListener('resize', checkIfMobile);
    
//     // Cleanup
//     return () => window.removeEventListener('resize', checkIfMobile);
//   }, []);
  
//   const handleLogout = () => {
//     logout();
//     router.push("/");
//   };
  
//   const menuItems = [
//     { name: 'Home', icon: Home, path: '/' },
//     { name: 'All Products', icon: Package, path: '/admin/dashboard/all_products' },
//     { name: 'Manage Blogs', icon: Book, path: '/admin/dashboard/blogs' },
//     { name: 'Purchase Requests', icon: ShoppingCart, path: '/admin/dashboard/purchase_requests' },
//     { name: 'Logout', icon: LogOut, path: '#', onClick: handleLogout },
//   ];

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   // Helper function to check if a menu item should be active
//   const isActive = (itemPath) => {
//     // Exact match for dashboard home
//     if (itemPath === '/admin/dashboard' && pathname === '/admin/dashboard') {
//       return true;
//     }
//     // For other routes, check if the pathname includes the item path
//     // This handles both exact matches and potential sub-routes
//     return itemPath !== '/admin/dashboard' && pathname === itemPath;
//   };

//   return (
//     <>
//       {/* Mobile overlay */}
//       {isOpen && isMobileView && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-30"
//           onClick={toggleSidebar}
//           aria-hidden="true"
//         />
//       )}
      
//       {/* Sidebar */}
//       <aside 
//         className={`fixed top-0 left-0 z-40 h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out ${
//           isOpen ? 'translate-x-0' : isMobileView ? '-translate-x-full' : 'w-20'
//         } ${isOpen && !isMobileView ? 'w-64' : 'w-64 md:w-20'}`}
//       >
//         <div className="flex items-center justify-between p-4 border-b border-gray-700">
//           {(isOpen || !isMobileView) && (
//             <>
//               {isOpen && <h2 className="text-xl font-bold">Dashboard</h2>}
//               <button 
//                 onClick={toggleSidebar} 
//                 className="p-2 rounded-lg hover:bg-gray-700"
//                 aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
//               >
//                 {isMobileView ? 
//                   <X size={20} /> : 
//                   isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />
//                 }
//               </button>
//             </>
//           )}
//         </div>

//         <nav className="flex-1 py-4 overflow-y-auto">
//           <ul className="space-y-2">
//             {menuItems.map((item) => (
//               <li key={item.name}>
//                 {item.onClick ? (
//                   <button
//                     onClick={item.onClick}
//                     className={`flex items-center w-full text-left p-3 mx-2 rounded-lg transition-colors hover:bg-gray-700`}
//                   >
//                     <item.icon size={20} />
//                     {isOpen && <span className="ml-4">{item.name}</span>}
//                   </button>
//                 ) : (
//                   <Link
//                     href={item.path}
//                     className={`flex items-center p-3 mx-2 rounded-lg transition-colors hover:bg-gray-700 ${
//                       isActive(item.path) ? 'bg-blue-600' : ''
//                     }`}
//                     onClick={isMobileView ? toggleSidebar : undefined}
//                   >
//                     <item.icon size={20} />
//                     {isOpen && <span className="ml-4">{item.name}</span>}
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </aside>

//       {/* Mobile menu button */}
//       <div className="fixed top-4 left-4 z-20 md:hidden">
//         <button 
//           className="p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
//           onClick={toggleSidebar}
//           aria-label="Toggle menu"
//         >
//           <Menu size={24} />
//         </button>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Menu, Home, Package, Book, Edit, ShoppingCart, LogOut, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { useAuth } from "@/context/authContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  
  // Check if mobile view on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileView(window.innerWidth < 768);
      // Auto close sidebar on mobile
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  const handleLogout = () => {
    logout();
    router.push("/");
  };
  
  const menuItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'All Products', icon: Package, path: '/admin/dashboard/all_products' },
    { name: 'Manage Blogs', icon: Book, path: '/admin/dashboard/blogs' },
    { name: 'Orders', icon: ShoppingCart, path: '/admin/dashboard/purchase_requests' },
    { name: 'Logout', icon: LogOut, path: '#', onClick: handleLogout },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Helper function to check if a menu item should be active
  const isActive = (itemPath) => {
    // Exact match for dashboard home
    if (itemPath === '/admin/dashboard' && pathname === '/admin/dashboard') {
      return true;
    }
    // For other routes, check if the pathname includes the item path
    // This handles both exact matches and potential sub-routes
    return itemPath !== '/admin/dashboard' && pathname === itemPath;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && isMobileView && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-40 h-screen bg-gray-900 text-white transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : isMobileView ? '-translate-x-full' : 'w-20'
        } ${isOpen && !isMobileView ? 'w-64' : 'w-64 md:w-20'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {(isOpen || !isMobileView) && (
            <>
              {isOpen && <h2 className="text-xl font-light tracking-tight">Dashboard</h2>}
              <button 
                onClick={toggleSidebar} 
                className="p-2 hover:bg-gray-800 transition-colors"
                aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
              >
                {isMobileView ? 
                  <X size={20} /> : 
                  isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />
                }
              </button>
            </>
          )}
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className={`flex items-center w-full text-left p-3 mx-2 transition-colors hover:bg-gray-800 group`}
                  >
                    <span className="inline-flex items-center justify-center w-8 h-8">
                      <item.icon size={20} className="group-hover:scale-110 transition-transform" />
                    </span>
                    {isOpen && <span className="ml-3 font-light tracking-wide">{item.name}</span>}
                  </button>
                ) : (
                  <Link
                    href={item.path}
                    className={`flex items-center p-3 mx-2 transition-colors hover:bg-gray-800 group ${
                      isActive(item.path) ? 'bg-black border-l-2 border-white' : ''
                    }`}
                    onClick={isMobileView ? toggleSidebar : undefined}
                  >
                    <span className="inline-flex items-center justify-center w-8 h-8">
                      <item.icon size={20} className="group-hover:scale-110 transition-transform" />
                    </span>
                    {isOpen && <span className="ml-3 font-light tracking-wide">{item.name}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-20 md:hidden">
        <button 
          className="p-2 bg-gray-900 text-white hover:bg-black transition-colors shadow-md"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </div>
    </>
  );
};

export default Sidebar;