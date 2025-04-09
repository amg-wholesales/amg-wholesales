// // import React from 'react'
// // import { useAuth } from '@/context/authContext';

// // const Footer = () => {
// //   return (
// //     <div>Footer</div>
// //   )
// // }

// // export default Footer
// 'use client'

// import React from 'react'
// import { useAuth } from '@/context/authContext';

// const Footer = () => {
//   const { userEmail, userType, isAuthenticated, logout } = useAuth();

//   return (
//     <div className="p-4 bg-gray-800 text-white flex justify-between items-center">
//       <div>
//         {isAuthenticated ? (
//           <>
//             <p>Email: {userEmail}</p>
//             <p>Role: {userType}</p>
//           </>
//         ) : (
//           <p>Not logged in</p>
//         )}
//       </div>
//       {isAuthenticated && (
//         <button
//           onClick={logout}
//           className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//         >
//           Logout
//         </button>
//       )}
//     </div>
//   );
// };

// export default Footer;
"use client";

import Link from "next/link";
import { Phone, Mail, Clock } from "lucide-react";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Contact Info */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <img 
                src="/logo/logo.jpg" 
                alt="AMG Wholesale" 
                className="h-16 w-auto mb-4"
              />
              <div className="text-lg font-bold tracking-wide text-red-500">
                AMG WHOLESALE
              </div>
            </Link>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="bg-gray-800 rounded-full p-3 mr-4">
                  <Phone className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Got Questions? Call us:</p>
                  <a href="tel:+15168822888" className="text-lg font-medium hover:text-red-500 transition">
                    (+1) 516 682 2888
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-gray-800 rounded-full p-3 mr-4">
                  <Mail className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email us at:</p>
                  <a href="mailto:amgwholesales01@gmail.com" className="text-base font-medium hover:text-red-500 transition">
                    amgwholesales01@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-800">
              <p className="text-sm text-gray-400 mb-2">Contact Info</p>
              <p className="text-sm">56-01 Maspeth Ave, Maspeth, NY 11378</p>
              
              <div className="flex space-x-4 mt-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-2 rounded-full hover:bg-red-500 transition"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="https://wa.me/15168222888" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-2 rounded-full hover:bg-red-500 transition"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-2 rounded-full hover:bg-red-500 transition"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Useful Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-red-500 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/auth/user/signup" className="text-gray-300 hover:text-red-500 transition">
                  Register Now
                </Link>
              </li>
              <li>
                <Link href="/products/category/all" className="text-gray-300 hover:text-red-500 transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-gray-300 hover:text-red-500 transition">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/products/category/new-arrivals" className="text-gray-300 hover:text-red-500 transition">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/products/category/best-sellers" className="text-gray-300 hover:text-red-500 transition">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/products/category/on-sale" className="text-gray-300 hover:text-red-500 transition">
                  On Sale
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Care */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Customer Care</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/user/profile" className="text-gray-300 hover:text-red-500 transition">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/user/purchase-requests" className="text-gray-300 hover:text-red-500 transition">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-gray-300 hover:text-red-500 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="text-gray-300 hover:text-red-500 transition">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-red-500 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/ask-for-help" className="text-gray-300 hover:text-red-500 transition">
                  Ask For Help
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Business Hours */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Business Hours</h3>
            <ul className="space-y-3">
              <li className="flex justify-between items-center">
                <span className="text-gray-300">Monday</span>
                <span className="text-gray-400">: 09:00AM – 06:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-300">Tuesday</span>
                <span className="text-gray-400">: 09:00AM – 06:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-300">Wednesday</span>
                <span className="text-gray-400">: 09:00AM – 06:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-300">Thursday</span>
                <span className="text-gray-400">: 09:00AM – 06:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-300">Friday</span>
                <span className="text-gray-400">: 09:00AM – 06:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-300">Saturday</span>
                <span className="text-gray-400">: 10:00AM – 06:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-300">Sunday</span>
                <span className="text-gray-400">: CLOSED</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} AMG WHOLESALE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}