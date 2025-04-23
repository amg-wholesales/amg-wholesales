
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, AlertTriangle, CheckCircle, User, Building, Mail, Phone } from 'lucide-react';

export default function UserSignup() {
  const router = useRouter();
  const [buyerType, setBuyerType] = useState('WHOLESALE_BUYER');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Wholesale buyer fields
    taxId: '',
    storeName: '',
    companyName: '',
    // Common fields
    contactPerson: '',
    officePhone: '',
    cellPhone: '',
    addressLine1: '',
    city: '',
    state: '',
    zipCode: '',
    notes: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyerTypeChange = (e) => {
    setBuyerType(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    if (buyerType === 'WHOLESALE_BUYER' && !formData.companyName && !formData.storeName) {
      setError('Either Company Name or Store Name is required for wholesale buyers');
      return false;
    }

    return true;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');

  //   if (!validateForm()) return;

  //   setIsLoading(true);

  //   try {
  //     // Create the payload based on buyer type
  //     const payload = {
  //       name: formData.name,
  //       email: formData.email,
  //       password: formData.password,
  //       buyerType: buyerType,
        
  //       // Common fields
  //       contactPerson: formData.contactPerson,
  //       cellPhone: formData.cellPhone,
  //       addressLine1: formData.addressLine1,
  //       city: formData.city,
  //       state: formData.state,
  //       zipCode: formData.zipCode,
  //       notes: formData.notes
  //     };

  //     // Add wholesale-specific fields if needed
  //     if (buyerType === 'WHOLESALE_BUYER') {
  //       payload.taxId = formData.taxId;
  //       payload.storeName = formData.storeName;
  //       payload.companyName = formData.companyName;
  //       payload.officePhone = formData.officePhone;
  //     }

  //     const response = await fetch('/api/auth/user/signup', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(payload)
  //     });

  //     const data = await response.json();

  //     if (data.success) {
  //       router.push('/user/dashboard');
  //     } else {
  //       setError(data.error || 'Registration failed');
  //     }
  //   } catch (err) {
  //     console.error('Signup error:', err);
  //     setError('An unexpected error occurred');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
// In UserSignup.js, update the handleSubmit function:

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!validateForm()) return;

  setIsLoading(true);

  try {
    // Create the payload based on buyer type
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      buyerType: buyerType,
      
      // Common fields
      contactPerson: formData.contactPerson,
      cellPhone: formData.cellPhone,
      addressLine1: formData.addressLine1,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      notes: formData.notes
    };

    // Add wholesale-specific fields if needed
    if (buyerType === 'WHOLESALE_BUYER') {
      payload.taxId = formData.taxId;
      payload.storeName = formData.storeName;
      payload.companyName = formData.companyName;
      payload.officePhone = formData.officePhone;
    }

    const response = await fetch('/api/auth/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.success) {
      if (data.requiresVerification) {
        // For wholesale buyers, show verification pending message and redirect to login
        setSuccessMessage(data.message);
        setTimeout(() => {
          router.push('/auth/user/login');
        }, 5000);
      } else {
        // For retail buyers, redirect to dashboard
        router.push('/user/dashboard');
      }
    } else {
      setError(data.error || 'Registration failed');
    }
  } catch (err) {
    console.error('Signup error:', err);
    setError('An unexpected error occurred');
  } finally {
    setIsLoading(false);
  }
};

// Add a state for success message
const [successMessage, setSuccessMessage] = useState('');
  return (
    <div className="min-h-screen bg-white py-10 fade-in">
      {/* Breadcrumbs */}
      {successMessage && (
  <div className="mb-6 p-4 bg-green-50 text-green-800 border border-green-200 flex items-start">
    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-green-500" />
    <div>
      <p>{successMessage}</p>
      <p className="text-sm mt-1">Redirecting to login page...</p>
    </div>
  </div>
)}
      <div className="max-w-3xl mx-auto px-4 mb-6">
        <div className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <ArrowRight size={12} className="mx-2" />
          <Link href="/auth/user/login" className="hover:text-black transition-colors">Login</Link>
          <ArrowRight size={12} className="mx-2" />
          <span className="text-black font-medium">Create Account</span>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto bg-white shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-light text-gray-900 mb-6 tracking-tight text-center">Create a Buyer Account</h1>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-800 border border-red-200 flex items-start">
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-red-500" />
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Buyer Type Selection */}
          <div className="mb-6 border-b pb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="WHOLESALE_BUYER"
                  checked={buyerType === 'WHOLESALE_BUYER'}
                  onChange={handleBuyerTypeChange}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300"
                />
                <span className="ml-2">Wholesale Buyer</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="RETAIL_BUYER"
                  checked={buyerType === 'RETAIL_BUYER'}
                  onChange={handleBuyerTypeChange}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300"
                />
                <span className="ml-2">Retail Buyer</span>
              </label>
            </div>
          </div>
          
          {/* Basic Information */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-light text-gray-900 mb-4 tracking-tight flex items-center">
              <User className="w-5 h-5 mr-2 text-gray-400" />
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
              </div>
            </div>
          </div>
          
          {/* Business Information */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-light text-gray-900 mb-4 tracking-tight flex items-center">
              <Building className="w-5 h-5 mr-2 text-gray-400" />
              {buyerType === 'WHOLESALE_BUYER' ? 'Business Information' : 'Contact Information'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {buyerType === 'WHOLESALE_BUYER' && (
                <>
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
                      Store Name
                    </label>
                    <input
                      type="text"
                      id="storeName"
                      name="storeName"
                      value={formData.storeName}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="taxId" className="block text-sm font-medium text-gray-700">
                      Tax ID
                    </label>
                    <input
                      type="text"
                      id="taxId"
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="officePhone" className="block text-sm font-medium text-gray-700">
                      Office Phone
                    </label>
                    <input
                      type="tel"
                      id="officePhone"
                      name="officePhone"
                      value={formData.officePhone}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                  </div>
                </>
              )}
              
              {/* Common Fields */}
              <div>
                <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">
                  Contact Person
                </label>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
              </div>
              
              <div>
                <label htmlFor="cellPhone" className="block text-sm font-medium text-gray-700">
                  Cell Phone
                </label>
                <input
                  type="tel"
                  id="cellPhone"
                  name="cellPhone"
                  value={formData.cellPhone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
              </div>
            </div>
          </div>
          
          {/* Address Information */}
          <div>
            <h2 className="text-xl font-light text-gray-900 mb-4 tracking-tight flex items-center">
              <Mail className="w-5 h-5 mr-2 text-gray-400" />
              Address Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="addressLine1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
              </div>
              
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <Link
              href="/auth/user/login"
              className="text-sm text-black hover:underline flex items-center"
            >
              <ArrowRight size={14} className="mr-1 rotate-180" />
              Back to login
            </Link>
            
            <button
              type="submit"
              disabled={isLoading}
              className="py-2 px-6 text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 uppercase tracking-wider"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
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