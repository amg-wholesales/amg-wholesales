// app/refund-policy/page.jsx
import React from 'react';
import Link from 'next/link';

export default function RefundPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
     

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Return Policy</h1>
          
          <div className="space-y-6 text-gray-700">
            <section className="border-l-4 border-indigo-500 pl-4 py-1">
              <h2 className="text-xl font-medium text-gray-900 mb-4">Return Policy:</h2>
              <p className="mb-4">
                Empire Smoke Distributors is dedicated to our customers' 100% satisfaction. We will issue a <span className="font-medium text-indigo-700">refund/credit</span> if you are not satisfied with your purchase and notify us within <span className="font-medium text-indigo-700">14 days</span> of product receipt. It must be <span className="font-medium text-indigo-700">returned</span> in the original packaging and in salable condition.
              </p>
              <p className="text-gray-800 font-medium">
                Returned products after 14 days are subject to a 10% <span className="text-indigo-700">restocking charge</span>.
              </p>
            </section>
            
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <p className="mb-2">
                All returns or exchanges must be properly <span className="font-medium">communicated</span> to Empire Smoke Distributors before a refund/credit is processed and approved. We will only accept returns/exchanges for items <span className="font-medium">ONLY</span> sold by Empire Smoke Distributors.
              </p>
              <p>
                Restocking fees are waived for defective items only if exchanged for the exact same product.
              </p>
            </div>
            
            <div className="bg-red-50 rounded-lg p-5 border border-red-200 text-red-800">
              <p className="font-medium">Note: All E-Liquid Hardware & Cartridges are Final Sale</p>
            </div>
            
            <div className="mt-10">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Return Process</h3>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <ul className="divide-y divide-gray-200">
                  <li className="p-4 flex items-start">
                    <div className="flex-shrink-0 bg-indigo-100 rounded-full p-2 mt-0.5">
                      <span className="text-indigo-600 font-bold">1</span>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">Contact Us</p>
                      <p className="text-gray-600">Notify us of your intention to return within 14 days of receiving your product.</p>
                    </div>
                  </li>
                  <li className="p-4 flex items-start">
                    <div className="flex-shrink-0 bg-indigo-100 rounded-full p-2 mt-0.5">
                      <span className="text-indigo-600 font-bold">2</span>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">Approval</p>
                      <p className="text-gray-600">Wait for our team to process and approve your return request.</p>
                    </div>
                  </li>
                  <li className="p-4 flex items-start">
                    <div className="flex-shrink-0 bg-indigo-100 rounded-full p-2 mt-0.5">
                      <span className="text-indigo-600 font-bold">3</span>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">Ship Products</p>
                      <p className="text-gray-600">Return the products in their original packaging and in salable condition.</p>
                    </div>
                  </li>
                  <li className="p-4 flex items-start">
                    <div className="flex-shrink-0 bg-indigo-100 rounded-full p-2 mt-0.5">
                      <span className="text-indigo-600 font-bold">4</span>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">Refund Processing</p>
                      <p className="text-gray-600">Once received and verified, we'll process your refund or exchange.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-indigo-50 rounded-lg p-5 border border-indigo-200">
              <h3 className="text-lg font-medium text-indigo-800 mb-2">Need Help?</h3>
              <p className="text-gray-700 mb-4">If you have any questions about our return policy or need assistance with a return, our customer service team is here to help.</p>
              <div className="flex space-x-4">
                <a href="mailto:EmpireSmokeDist@gmail.com" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Email Us
                </a>
                <a href="tel:5166822888" className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Call Us: 516-682-2888
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
    
    </div>
  );
}