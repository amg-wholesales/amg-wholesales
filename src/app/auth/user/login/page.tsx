
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';
import { ArrowRight, LogIn, AlertTriangle } from 'lucide-react';

export default function UserLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    buyerType: 'WHOLESALE_BUYER'  // Default to wholesale buyer
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setIsLoading(true);

  //   try {
  //     // Add userType to identify this as a buyer login with specific buyer type
  //     const loginData = { ...formData, userType: formData.buyerType };
  //     const result = await login(loginData);

  //     if (result.success) {
  //       router.push('/user/dashboard');
  //     } else {
  //       setError(result.error || 'Login failed');
  //     }
  //   } catch (err) {
  //     setError('An unexpected error occurred');
  //     console.error(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
// In UserLogin.js, update the handleSubmit function:

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  try {
    const loginData = { 
      email: formData.email, 
      password: formData.password, 
      buyerType: formData.buyerType 
    };
    
    const response = await fetch('/api/auth/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    const data = await response.json();

    if (data.success) {
      router.push('/user/dashboard');
    } else {
      if (data.pendingVerification) {
        setVerificationPending(true);
      }
      setError(data.error || 'Login failed');
    }
  } catch (err) {
    setError('An unexpected error occurred');
    console.error(err);
  } finally {
    setIsLoading(false);
  }
};

// Add a state for verification pending
const [verificationPending, setVerificationPending] = useState(false);
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      {/* Breadcrumbs - Optional, add if needed */}
      {/* {error && (
  <div className={`p-4 text-sm ${verificationPending ? 'text-yellow-800 bg-yellow-50 border-yellow-200' : 'text-red-800 bg-red-50 border-red-200'} border flex items-center`}>
    {verificationPending ? 
      <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" /> : 
      <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
    }
    <span>{error}</span>
  </div>
)} */}
      <div className="absolute top-8 left-8">
        <div className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <ArrowRight size={12} className="mx-2" />
          <span className="text-black font-medium">Login</span>
        </div>
      </div>
      
      <div className="w-full max-w-md p-8 space-y-8 bg-white border border-gray-200 shadow-sm fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-light text-gray-900 tracking-tight">Buyer Login</h1>
          <p className="mt-2 text-gray-600">Sign in to access your account</p>
        </div>
        
        {error && (
          <div className="p-4 text-sm text-red-800 bg-red-50 border border-red-200 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900"
              />
            </div>

            <div>
              <label htmlFor="buyerType" className="block text-sm font-medium text-gray-700">
                Account Type
              </label>
              <select
                id="buyerType"
                name="buyerType"
                value={formData.buyerType}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900"
              >
                <option value="WHOLESALE_BUYER">Wholesale Buyer</option>
                <option value="RETAIL_BUYER">Retail Buyer</option>
              </select>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 uppercase tracking-wider"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign in
                </span>
              )}
            </button>
          </div>
        </form>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          {/* <Link href="/auth/password-reset" className="text-sm text-gray-600 hover:text-black">
            Forgot password?
          </Link> */}
          
          <Link href="/auth/user/signup" className="text-sm font-medium text-black hover:underline">
            Create account <ArrowRight size={14} className="inline ml-1" />
          </Link>
        </div>
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