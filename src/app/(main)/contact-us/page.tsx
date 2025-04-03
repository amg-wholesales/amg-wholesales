// app/contact-us/page.jsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
  
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">Contact Us</h1>
        
        {/* Map and Contact Info Grid */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-12">
          <div className="h-96 relative">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Leave us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
                    placeholder="First Name"
                  />
                </div>
                <div className="col-span-1">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Comment or Message <span className="text-red-500">*</span></label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full md:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white font-medium rounded-md transition duration-150 ease-in-out"
                >
                  {status.submitting ? 'Sending...' : 'Send Message'}
                </button>
                
                {status.info.error && (
                  <div className="mt-4 text-red-500 text-sm">
                    <p>{status.info.msg}</p>
                  </div>
                )}
                
                {status.submitted && (
                  <div className="mt-4 text-green-500 text-sm">
                    <p>{status.info.msg}</p>
                  </div>
                )}
              </div>
            </form>
          </div>
          
          {/* Store Information */}
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Store</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
                <p className="text-gray-700">
                  58-01 Maspeth Ave.<br />
                  Maspeth, NY 11378
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-700">
                  <a href="mailto:empiresmokedist@gmail.com" className="text-indigo-600 hover:text-indigo-800">
                    empiresmokedist@gmail.com
                  </a>
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Got Questions? Call us!</h3>
                <p className="text-gray-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:5166822888" className="text-indigo-600 hover:text-indigo-800 text-xl font-medium">
                    (+1) 516 682 2888
                  </a>
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
                <table className="min-w-full">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-2 text-gray-700 font-medium">Monday - Friday</td>
                      <td className="py-2 text-gray-700">9:00 AM - 6:00 PM</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-700 font-medium">Saturday</td>
                      <td className="py-2 text-gray-700">10:00 AM - 4:00 PM</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-700 font-medium">Sunday</td>
                      <td className="py-2 text-gray-700">Closed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
   
    </div>
  );
}