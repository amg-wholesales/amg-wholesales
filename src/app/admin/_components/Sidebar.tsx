// // components/Sidebar.jsx
// "use client";

// import { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { Menu, Home, Package,Book, Edit, ShoppingCart, LogOut, ChevronRight, ChevronLeft } from 'lucide-react';

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const pathname = usePathname();
  
//   const menuItems = [
//     { name: 'Home', icon: Home, path: '/' },
//     { name: 'All Products', icon: Package, path: '/admin/dashboard/all_products' },
 
//     { name: 'Manage Blogs', icon: Book, path: '/admin/dashboard/blogs' },
//     { name: 'Purchase Requests', icon: ShoppingCart, path: '/admin/dashboard/purchase_requests' },
//     { name: 'Logout', icon: LogOut, path: '/logout' },
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
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" 
//           onClick={toggleSidebar}
//         />
//       )}
      
//       {/* Sidebar */}
//       <aside 
//         className={`fixed top-0 left-0 z-30 h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out ${
//           isOpen ? 'w-64' : 'w-20'
//         } flex flex-col`}
//       >
//         <div className="flex items-center justify-between p-4 border-b border-gray-700">
//           {isOpen && <h2 className="text-xl font-bold">Dashboard</h2>}
//           <button 
//             onClick={toggleSidebar} 
//             className="p-2 rounded-lg hover:bg-gray-700"
//             aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
//           >
//             {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
//           </button>
//         </div>

//         <nav className="flex-1 py-4 overflow-y-auto">
//           <ul className="space-y-2">
//             {menuItems.map((item) => (
//               <li key={item.name}>
//                 <Link
//                   href={item.path}
//                   className={`flex items-center p-3 mx-2 rounded-lg transition-colors hover:bg-gray-700 ${
//                     isActive(item.path) ? 'bg-blue-600' : ''
//                   }`}
//                 >
//                   <item.icon size={20} />
//                   {isOpen && <span className="ml-4">{item.name}</span>}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </aside>

//       {/* Mobile menu button */}
//       <div className="fixed top-4 left-4 z-10 md:hidden">
//         <button 
//           className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
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

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Menu, Home, Package, Book, Edit, ShoppingCart, LogOut, ChevronRight, ChevronLeft } from 'lucide-react';
import { useAuth } from "@/context/authContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    router.push("/");
  };
  
  const menuItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'All Products', icon: Package, path: '/admin/dashboard/all_products' },
    { name: 'Manage Blogs', icon: Book, path: '/admin/dashboard/blogs' },
    { name: 'Purchase Requests', icon: ShoppingCart, path: '/admin/dashboard/purchase_requests' },
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
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" 
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-30 h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out ${
          isOpen ? 'w-64' : 'w-20'
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {isOpen && <h2 className="text-xl font-bold">Dashboard</h2>}
          <button 
            onClick={toggleSidebar} 
            className="p-2 rounded-lg hover:bg-gray-700"
            aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className={`flex items-center w-full text-left p-3 mx-2 rounded-lg transition-colors hover:bg-gray-700`}
                  >
                    <item.icon size={20} />
                    {isOpen && <span className="ml-4">{item.name}</span>}
                  </button>
                ) : (
                  <Link
                    href={item.path}
                    className={`flex items-center p-3 mx-2 rounded-lg transition-colors hover:bg-gray-700 ${
                      isActive(item.path) ? 'bg-blue-600' : ''
                    }`}
                  >
                    <item.icon size={20} />
                    {isOpen && <span className="ml-4">{item.name}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-10 md:hidden">
        <button 
          className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300"
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