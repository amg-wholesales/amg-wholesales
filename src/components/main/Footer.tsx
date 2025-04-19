"use client";

import Link from "next/link";
import { Phone, Mail, Clock, Facebook, Instagram, } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Contact Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <img 
                src="/logo/logo.jpg" 
                alt="AMG Wholesale" 
                className="h-8 w-auto"
              />
              <span className="text-lg font-medium text-gray-200">AMG WHOLESALE</span>
            </Link>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <Phone className="h-3 w-3 text-gray-400 mr-2" />
                <div>
                  <p className="text-xs text-gray-400">Got Questions? Call us:</p>
                  <a href="tel:+15168822888" className="text-sm hover:text-gray-300 transition-colors">
                    (+1) 516 682 2888
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail className="h-3 w-3 text-gray-400 mr-2" />
                <div>
                  <p className="text-xs text-gray-400">Email us at:</p>
                  <a href="mailto:amgwholesales01@gmail.com" className="text-xs hover:text-gray-300 transition-colors">
                    amgwholesales01@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="pt-2 border-t border-gray-700">
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Contact Info</p>
              <p className="text-xs">56-01 Maspeth Ave, Maspeth, NY 11378</p>
              
              <div className="flex space-x-4 mt-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a 
                  href="https://wa.me/15168222888" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                  aria-label="WhatsApp"
                >
                  <Phone className="h-4 w-4" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Useful Links */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-medium mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-xs text-gray-300 hover:text-gray-200 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/auth/user/signup" className="text-xs text-gray-300 hover:text-gray-200 transition-colors">
                  Register Now
                </Link>
              </li>
              <li>
                <Link href="/product/category/all" className="text-xs text-gray-300 hover:text-gray-200 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-xs text-gray-300 hover:text-gray-200 transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/product/category/new-arrivals" className="text-xs text-gray-300 hover:text-gray-200 transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/product/category/best-sellers" className="text-xs text-gray-300 hover:text-gray-200 transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/product/category/on-sale" className="text-xs text-gray-300 hover:text-gray-200 transition-colors">
                  On Sale
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Customer Care */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-medium mb-4">Customer Care</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/user/profile" className="text-xs text-gray-300 hover:text-gray-200 transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/user/purchase-requests" className="text-xs text-gray-300 hover:text-gray-200 transition-colors">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-xs text-gray-300 hover:text-gray-200 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="text-xs text-gray-300 hover:text-gray-200 transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-xs text-gray-300 hover:text-gray-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/ask-for-help" className="text-xs text-gray-300 hover:text-gray-200 transition-colors">
                  Ask For Help
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Business Hours */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-medium mb-4">Business Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span className="text-xs text-gray-300">Monday</span>
                <span className="text-xs text-gray-400">: 09:00AM – 06:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-xs text-gray-300">Tuesday</span>
                <span className="text-xs text-gray-400">: 09:00AM – 06:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-xs text-gray-300">Wednesday</span>
                <span className="text-xs text-gray-400">: 09:00AM – 06:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-xs text-gray-300">Thursday</span>
                <span className="text-xs text-gray-400">: 09:00AM – 06:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-xs text-gray-300">Friday</span>
                <span className="text-xs text-gray-400">: 09:00AM – 06:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-xs text-gray-300">Saturday</span>
                <span className="text-xs text-gray-400">: 10:00AM – 06:00PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-xs text-gray-300">Sunday</span>
                <span className="text-xs text-gray-400">: CLOSED</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-xs">
          <p>© {new Date().getFullYear()} AMG WHOLESALE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}