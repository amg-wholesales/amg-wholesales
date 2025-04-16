
// "use client";

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { 
//   Mail, 
//   Phone, 
//   MapPin, 
//   Clock, 
//   Send, 
//   ArrowRight, 
//   AlertCircle, 
//   CheckCircle, 
//   Loader2, 
//   ChevronRight, 
//   UserRound, 
//   AtSign,
//   MessageSquare,
//   Facebook,
//   Twitter,
//   Instagram,
//   Home
// } from 'lucide-react';

// export default function ContactUs() {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     message: ''
//   });
  
//   const [status, setStatus] = useState({
//     submitted: false,
//     submitting: false,
//     info: { error: false, msg: null }
//   });

//   const [isFormFocused, setIsFormFocused] = useState(false);
//   const [scrollPosition, setScrollPosition] = useState(0);
  
//   // Track scroll for animations
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollPosition(window.scrollY);
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus(prevStatus => ({ ...prevStatus, submitting: true }));
    
//     try {
//       const res = await fetch('/api/contact', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });
      
//       const text = await res.text();
      
//       if (res.status === 200) {
//         setStatus({
//           submitted: true,
//           submitting: false,
//           info: { error: false, msg: 'Message sent successfully!' }
//         });
//         setFormData({
//           firstName: '',
//           lastName: '',
//           email: '',
//           message: ''
//         });
//       } else {
//         setStatus({
//           submitted: false,
//           submitting: false,
//           info: { error: true, msg: text || 'Something went wrong. Please try again later.' }
//         });
//       }
//     } catch (error) {
//       setStatus({
//         submitted: false,
//         submitting: false,
//         info: { error: true, msg: 'Unable to submit message. Please try again later.' }
//       });
//     }
//   };

//   return (
//     <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
//       {/* Page Header */}
//       <div className="bg-indigo-900 text-white relative overflow-hidden">
//         <div className="absolute inset-0 opacity-20 bg-pattern"></div>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="py-16 md:py-24 text-center md:text-left">
//             <div className="animate-fade-in-up">
//               <div className="flex items-center justify-center md:justify-start mb-2">
//                 <Link 
//                   href="/" 
//                   className="text-indigo-200 hover:text-white transition-colors text-sm flex items-center"
//                 >
//                   <Home className="w-4 h-4 mr-1" />
//                   Home
//                 </Link>
//                 <ChevronRight className="w-3 h-3 mx-2 text-indigo-300" />
//                 <span className="text-white text-sm">Contact Us</span>
//               </div>
//               <h1 className="text-3xl md:text-5xl font-bold mb-4">Get in Touch</h1>
//               <p className="text-indigo-200 max-w-xl md:text-lg leading-relaxed">
//                 Have questions about our products or services? Our team is here to help you and provide the support you need.
//               </p>
//             </div>
//           </div>
//         </div>
        
//         {/* Decorative Element */}
//         <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
//       </div>
      
//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-12 relative z-20">
//         {/* Contact Information Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
//           <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 flex flex-col items-center text-center">
//             <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
//               <Phone className="w-5 h-5 text-indigo-600" />
//             </div>
//             <h3 className="text-lg font-semibold mb-2">Call Us</h3>
//             <p className="text-gray-500 mb-3">Mon-Fri from 9am to 6pm</p>
//             <a 
//               href="tel:5166822888" 
//               className="text-indigo-600 font-medium text-lg hover:text-indigo-700 transition-colors"
//             >
//               (+1) 516 682 2888
//             </a>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 flex flex-col items-center text-center">
//             <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
//               <Mail className="w-5 h-5 text-indigo-600" />
//             </div>
//             <h3 className="text-lg font-semibold mb-2">Email Us</h3>
//             <p className="text-gray-500 mb-3">We'll respond as soon as possible</p>
//             <a 
//               href="mailto:empiresmokedist@gmail.com" 
//               className="text-indigo-600 font-medium text-lg hover:text-indigo-700 transition-colors"
//             >
//               empiresmokedist@gmail.com
//             </a>
//           </div>
          
//           <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 flex flex-col items-center text-center">
//             <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
//               <MapPin className="w-5 h-5 text-indigo-600" />
//             </div>
//             <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
//             <p className="text-gray-500 mb-3">Our store location</p>
//             <address className="not-italic text-indigo-600 font-medium">
//               58-01 Maspeth Ave.<br />
//               Maspeth, NY 11378
//             </address>
//           </div>
//         </div>
        
//         {/* Map and Contact Form */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
//           {/* Map */}
//           <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//             <div className="h-[400px] relative">
//               <iframe 
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.750950823363!2d-73.9112968!3d40.7228339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25efdb299bff1%3A0xc90f9e0d21c08157!2s58-01%20Maspeth%20Ave%2C%20Maspeth%2C%20NY%2011378!5e0!3m2!1sen!2sus!4v1649234567890!5m2!1sen!2sus" 
//                 width="100%" 
//                 height="100%" 
//                 style={{ border: 0 }} 
//                 allowFullScreen={true} 
//                 loading="lazy" 
//                 referrerPolicy="no-referrer-when-downgrade"
//                 className="absolute inset-0"
//                 title="Empire Smoke Distributors Location"
//               ></iframe>
//             </div>
            
//             <div className="flex items-center justify-between p-5 border-t border-gray-100">
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
//                   <MapPin className="w-4 h-4 text-indigo-600" />
//                 </div>
//                 <p className="text-gray-700 font-medium">58-01 Maspeth Ave, Maspeth, NY 11378</p>
//               </div>
              
//               <a 
//                 href="https://goo.gl/maps/YourActualGoogleMapsLink" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="text-indigo-600 flex items-center hover:text-indigo-800 font-medium"
//               >
//                 Get Directions
//                 <ArrowRight className="ml-1 w-4 h-4" />
//               </a>
//             </div>
//           </div>
          
//           {/* Store Hours and Social */}
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
//               <Clock className="w-5 h-5 mr-2 text-indigo-600" />
//               Business Hours
//             </h2>
            
//             <div className="space-y-3 mb-8">
//               <div className="flex justify-between items-center pb-2 border-b border-gray-100">
//                 <span className="text-gray-600">Monday - Friday</span>
//                 <span className="font-medium text-gray-900">9:00 AM - 6:00 PM</span>
//               </div>
//               <div className="flex justify-between items-center pb-2 border-b border-gray-100">
//                 <span className="text-gray-600">Saturday</span>
//                 <span className="font-medium text-gray-900">10:00 AM - 4:00 PM</span>
//               </div>
//               <div className="flex justify-between items-center pb-2 border-b border-gray-100">
//                 <span className="text-gray-600">Sunday</span>
//                 <span className="font-medium text-gray-900">Closed</span>
//               </div>
//             </div>
            
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Connect With Us</h2>
//             <div className="flex gap-4">
//               <a href="#" className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-200 transition-colors">
//                 <Facebook className="w-5 h-5" />
//               </a>
//               <a href="#" className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-200 transition-colors">
//                 <Twitter className="w-5 h-5" />
//               </a>
//               <a href="#" className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 hover:bg-indigo-200 transition-colors">
//                 <Instagram className="w-5 h-5" />
//               </a>
//             </div>
//           </div>
//         </div>
        
//         {/* Contact Form Section */}
//         <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 relative">
//           <div className="absolute inset-0 bg-indigo-600 w-1/3 hidden lg:block"></div>
          
//           <div className="grid grid-cols-1 lg:grid-cols-3">
//             {/* Left Column - Form Title */}
//             <div className="p-8 text-white relative z-10 hidden lg:flex items-center">
//               <div>
//                 <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
//                 <p className="opacity-90 mb-8 leading-relaxed">
//                   We'd love to hear from you. Fill out the form and our team will get back to you as soon as possible.
//                 </p>
//                 <div className="border-b border-indigo-400 w-16"></div>
//               </div>
//             </div>
            
//             {/* Right Column - Contact Form */}
//             <div className="lg:col-span-2 p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6 lg:hidden">Send Us a Message</h2>
              
//               <form 
//                 onSubmit={handleSubmit} 
//                 className={`space-y-6 transition-all duration-300 ${isFormFocused ? 'transform -translate-y-2' : ''}`}
//                 onFocus={() => setIsFormFocused(true)}
//                 onBlur={() => setIsFormFocused(false)}
//               >
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <div className="relative">
//                     <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
//                       First Name <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         id="firstName"
//                         name="firstName"
//                         value={formData.firstName}
//                         onChange={handleChange}
//                         required
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
//                         placeholder="Enter your first name"
//                       />
//                       <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                     </div>
//                   </div>
                  
//                   <div className="relative">
//                     <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
//                       Last Name <span className="text-red-500">*</span>
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         id="lastName"
//                         name="lastName"
//                         value={formData.lastName}
//                         onChange={handleChange}
//                         required
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
//                         placeholder="Enter your last name"
//                       />
//                       <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="relative">
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                     Email <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
//                       placeholder="Enter your email address"
//                     />
//                     <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                   </div>
//                 </div>
                
//                 <div className="relative">
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
//                     Comment or Message <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <textarea
//                       id="message"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       required
//                       rows={5}
//                       className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
//                       placeholder="How can we help you?"
//                     ></textarea>
//                     <MessageSquare className="absolute left-3 top-6 text-gray-400 h-5 w-5" />
//                   </div>
//                 </div>
                
//                 <div>
//                   <button
//                     type="submit"
//                     disabled={status.submitting}
//                     className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white font-medium rounded-lg transition duration-150 ease-in-out flex items-center"
//                   >
//                     {status.submitting ? (
//                       <>
//                         <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                         Sending...
//                       </>
//                     ) : (
//                       <>
//                         <Send className="mr-2 h-5 w-5" />
//                         Send Message
//                       </>
//                     )}
//                   </button>
//                 </div>
                
//                 {/* Status Messages */}
//                 {status.info.error && (
//                   <div className="mt-4 bg-red-50 text-red-700 p-4 rounded-lg flex items-start">
//                     <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
//                     <p>{status.info.msg}</p>
//                   </div>
//                 )}
                
//                 {status.submitted && (
//                   <div className="mt-4 bg-green-50 text-green-700 p-4 rounded-lg flex items-start animate-fade-in">
//                     <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
//                     <p>{status.info.msg}</p>
//                   </div>
//                 )}
//               </form>
//             </div>
//           </div>
//         </div>
//       </main>
      
//       {/* CSS for Animations and Patterns */}
//       <style jsx>{`
//         .bg-pattern {
//           background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
//         }
        
//         @keyframes fade-in {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
        
//         .animate-fade-in {
//           animation: fade-in 0.5s ease-out forwards;
//         }
        
//         @keyframes fade-in-up {
//           from { 
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to { 
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-fade-in-up {
//           animation: fade-in-up 0.8s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle, 
  Loader2, 
  ChevronRight, 
  UserRound, 
  AtSign,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Home
} from 'lucide-react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });

  const [isFormFocused, setIsFormFocused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Track scroll for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(prevStatus => ({ ...prevStatus, submitting: true }));
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const text = await res.text();
      
      if (res.status === 200) {
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: 'Message sent successfully!' }
        });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        });
      } else {
        setStatus({
          submitted: false,
          submitting: false,
          info: { error: true, msg: text || 'Something went wrong. Please try again later.' }
        });
      }
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: 'Unable to submit message. Please try again later.' }
      });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-pattern"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-16 md:py-24 text-center md:text-left">
            <div className="animate-fade-in-up">
              <div className="flex items-center justify-center md:justify-start mb-2">
                <Link 
                  href="/" 
                  className="text-gray-300 hover:text-white transition-colors text-sm flex items-center"
                >
                  <Home className="w-4 h-4 mr-1" />
                  Home
                </Link>
                <ChevronRight className="w-3 h-3 mx-2 text-gray-400" />
                <span className="text-white text-sm">Contact Us</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-light mb-4 tracking-tight">Get in Touch</h1>
              <p className="text-gray-300 max-w-xl md:text-lg leading-relaxed">
                Have questions about our products or services? Our team is here to help you and provide the support you need.
              </p>
            </div>
          </div>
        </div>
        
        {/* Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-12 relative z-20">
        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 fade-in">
          <div className="bg-white shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Phone className="w-5 h-5 text-black" />
            </div>
            <h3 className="text-lg font-medium mb-2">Call Us</h3>
            <p className="text-gray-500 mb-3">Mon-Fri from 9am to 6pm</p>
            <a 
              href="tel:5166822888" 
              className="text-black font-medium text-lg hover:text-gray-700 transition-colors"
            >
              (+1) 516 682 2888
            </a>
          </div>
          
          <div className="bg-white shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-5 h-5 text-black" />
            </div>
            <h3 className="text-lg font-medium mb-2">Email Us</h3>
            <p className="text-gray-500 mb-3">We'll respond as soon as possible</p>
            <a 
              href="mailto:empiresmokedist@gmail.com" 
              className="text-black font-medium text-lg hover:text-gray-700 transition-colors"
            >
              empiresmokedist@gmail.com
            </a>
          </div>
          
          <div className="bg-white shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-black" />
            </div>
            <h3 className="text-lg font-medium mb-2">Visit Us</h3>
            <p className="text-gray-500 mb-3">Our store location</p>
            <address className="not-italic text-black font-medium">
              58-01 Maspeth Ave.<br />
              Maspeth, NY 11378
            </address>
          </div>
        </div>
        
        {/* Map and Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 fade-in">
          {/* Map */}
          <div className="lg:col-span-2 bg-white shadow-sm overflow-hidden border border-gray-200">
            <div className="h-[400px] relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.750950823363!2d-73.9112968!3d40.7228339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25efdb299bff1%3A0xc90f9e0d21c08157!2s58-01%20Maspeth%20Ave%2C%20Maspeth%2C%20NY%2011378!5e0!3m2!1sen!2sus!4v1649234567890!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Empire Smoke Distributors Location"
              ></iframe>
            </div>
            
            <div className="flex items-center justify-between p-5 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-100 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-black" />
                </div>
                <p className="text-gray-700 font-medium">58-01 Maspeth Ave, Maspeth, NY 11378</p>
              </div>
              
              <a 
                href="https://goo.gl/maps/YourActualGoogleMapsLink" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-black flex items-center hover:text-gray-700 font-medium"
              >
                Get Directions
                <ArrowRight className="ml-1 w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Store Hours and Social */}
          <div className="bg-white shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-medium text-gray-900 mb-6 flex items-center tracking-tight">
              <Clock className="w-5 h-5 mr-2 text-black" />
              Business Hours
            </h2>
            
            <div className="space-y-3 mb-8">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="text-gray-600">Monday - Friday</span>
                <span className="font-medium text-gray-900">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="text-gray-600">Saturday</span>
                <span className="font-medium text-gray-900">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="text-gray-600">Sunday</span>
                <span className="font-medium text-gray-900">Closed</span>
              </div>
            </div>
            
            <h2 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">Connect With Us</h2>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-100 flex items-center justify-center text-black hover:bg-gray-200 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 flex items-center justify-center text-black hover:bg-gray-200 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 flex items-center justify-center text-black hover:bg-gray-200 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Contact Form Section */}
        <div className="bg-white shadow-sm overflow-hidden border border-gray-200 relative fade-in">
          <div className="absolute inset-0 bg-black w-1/3 hidden lg:block"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Column - Form Title */}
            <div className="p-8 text-white relative z-10 hidden lg:flex items-center">
              <div>
                <h2 className="text-3xl font-light mb-6 tracking-tight">Send Us a Message</h2>
                <p className="opacity-90 mb-8 leading-relaxed">
                  We'd love to hear from you. Fill out the form and our team will get back to you as soon as possible.
                </p>
                <div className="border-b border-gray-600 w-16"></div>
              </div>
            </div>
            
            {/* Right Column - Contact Form */}
            <div className="lg:col-span-2 p-8">
              <h2 className="text-2xl font-light text-gray-900 mb-6 lg:hidden tracking-tight">Send Us a Message</h2>
              
              <form 
                onSubmit={handleSubmit} 
                className={`space-y-6 transition-all duration-300 ${isFormFocused ? 'transform -translate-y-2' : ''}`}
                onFocus={() => setIsFormFocused(true)}
                onBlur={() => setIsFormFocused(false)}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 shadow-sm focus:ring-1 focus:ring-black focus:border-black text-gray-900"
                        placeholder="Enter your first name"
                      />
                      <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 shadow-sm focus:ring-1 focus:ring-black focus:border-black text-gray-900"
                        placeholder="Enter your last name"
                      />
                      <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 shadow-sm focus:ring-1 focus:ring-black focus:border-black text-gray-900"
                      placeholder="Enter your email address"
                    />
                    <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </div>
                
                <div className="relative">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Comment or Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 shadow-sm focus:ring-1 focus:ring-black focus:border-black text-gray-900"
                      placeholder="How can we help you?"
                    ></textarea>
                    <MessageSquare className="absolute left-3 top-6 text-gray-400 h-5 w-5" />
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={status.submitting}
                    className="px-6 py-3 bg-black hover:bg-gray-900 text-white font-medium transition duration-150 ease-in-out flex items-center text-sm uppercase tracking-wider"
                  >
                    {status.submitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
                
                {/* Status Messages */}
                {status.info.error && (
                  <div className="mt-4 bg-red-50 text-red-700 p-4 flex items-start border border-red-200">
                    <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <p>{status.info.msg}</p>
                  </div>
                )}
                
                {status.submitted && (
                  <div className="mt-4 bg-green-50 text-green-700 p-4 flex items-start animate-fade-in border border-green-200">
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <p>{status.info.msg}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
      
      {/* CSS for Animations and Patterns */}
      <style jsx>{`
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}