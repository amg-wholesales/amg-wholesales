// // app/dashboard/layout.js
// import Sidebar from './Sidebar';

// export default function DashboardLayout({ children }) {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 transition-all p-8 sm:ml-64">
//         {children}
//       </main>
//     </div>
//   );
// }

// app/dashboard/layout.js
"use client";

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);

  // Listen for sidebar state changes from the Sidebar component
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      setIsSidebarOpen(!isMobile);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className={`flex-1 p-4 md:p-8 transition-all duration-300 ${
        isSidebarOpen && !isMobileView ? 'md:ml-64' : 'md:ml-20'
      } pt-16 md:pt-8`}>
        {children}
      </main>
    </div>
  );
}