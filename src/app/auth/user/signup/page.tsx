// 'use client'

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// export default function UserSignup() {
//   const [step, setStep] = useState(1); // 1 for account details, 2 for buyer details
//   const [formData, setFormData] = useState({
//     // Account details
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     // Buyer details
//     storeName: '',
//     companyName: '',
//     contactPerson: '',
//     officePhone: '',
//     cellPhone: '',
//     addressLine1: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     notes: ''
//   });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const validateAccountDetails = () => {
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return false;
//     }
//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return false;
//     }
//     return true;
//   };

//   const handleNextStep = (e) => {
//     e.preventDefault();
//     setError('');
    
//     if (validateAccountDetails()) {
//       setStep(2);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     // Validate if either company name or store name is provided
//     if (!formData.companyName && !formData.storeName) {
//       setError('Either Company Name or Store Name is required');
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch('/api/auth/user/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (data.success) {
//         router.push('/user/dashboard');
//       } else {
//         setError(data.error || 'Signup failed');
//       }
//     } catch (err) {
//       setError('An unexpected error occurred');
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12">
//       <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-lg shadow">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-gray-900">Create Buyer Account</h1>
//           <p className="mt-2 text-gray-600">
//             {step === 1 ? 'Account Details' : 'Business Information'}
//           </p>
//         </div>
        
//         {error && (
//           <div className="p-3 text-sm text-red-800 bg-red-100 rounded-md">
//             {error}
//           </div>
//         )}
        
//         {step === 1 ? (
//           <form onSubmit={handleNextStep} className="mt-8 space-y-6">
//             <div className="space-y-4">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                   Full Name
//                 </label>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                   Email Address
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="new-password"
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                   Confirm Password
//                 </label>
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   autoComplete="new-password"
//                   required
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
//             </div>
            
//             <div>
//               <button
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Next
//               </button>
//             </div>
//           </form>
//         ) : (
//           <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
//                   Company Name
//                 </label>
//                 <input
//                   id="companyName"
//                   name="companyName"
//                   type="text"
//                   value={formData.companyName}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//                 <p className="mt-1 text-xs text-gray-500">Either Company Name or Store Name is required</p>
//               </div>
              
//               <div>
//                 <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
//                   Store Name
//                 </label>
//                 <input
//                   id="storeName"
//                   name="storeName"
//                   type="text"
//                   value={formData.storeName}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">
//                   Contact Person
//                 </label>
//                 <input
//                   id="contactPerson"
//                   name="contactPerson"
//                   type="text"
//                   value={formData.contactPerson}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="officePhone" className="block text-sm font-medium text-gray-700">
//                   Office Phone
//                 </label>
//                 <input
//                   id="officePhone"
//                   name="officePhone"
//                   type="tel"
//                   value={formData.officePhone}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="cellPhone" className="block text-sm font-medium text-gray-700">
//                   Cell Phone
//                 </label>
//                 <input
//                   id="cellPhone"
//                   name="cellPhone"
//                   type="tel"
//                   value={formData.cellPhone}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">
//                   Address
//                 </label>
//                 <input
//                   id="addressLine1"
//                   name="addressLine1"
//                   type="text"
//                   value={formData.addressLine1}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="city" className="block text-sm font-medium text-gray-700">
//                   City
//                 </label>
//                 <input
//                   id="city"
//                   name="city"
//                   type="text"
//                   value={formData.city}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="state" className="block text-sm font-medium text-gray-700">
//                   State
//                 </label>
//                 <input
//                   id="state"
//                   name="state"
//                   type="text"
//                   value={formData.state}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
              
//               <div>
//                 <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
//                   Zip Code
//                 </label>
//                 <input
//                   id="zipCode"
//                   name="zipCode"
//                   type="text"
//                   value={formData.zipCode}
//                   onChange={handleChange}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 />
//               </div>
//             </div>
            
//             <div>
//               <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
//                 Notes
//               </label>
//               <textarea
//                 id="notes"
//                 name="notes"
//                 rows="3"
//                 value={formData.notes}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Additional information..."
//               />
//             </div>
            
//             <div className="flex space-x-4">
//               <button
//                 type="button"
//                 onClick={() => setStep(1)}
//                 className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Back
//               </button>
              
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//               >
//                 {isLoading ? 'Creating Account...' : 'Create Account'}
//               </button>
//             </div>
//           </form>
//         )}
        
//         <div className="text-center mt-4">
//           <p className="text-sm text-gray-600">
//             Already have an account?{' '}
//             <Link href="/auth/user/login" className="font-medium text-indigo-600 hover:text-indigo-500">
//               Sign in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
        router.push('/user/dashboard');
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

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Create a Buyer Account</h1>
        
        {error && (
          <div className="mb-6 p-3 bg-red-100 text-red-800 rounded-md">
            {error}
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
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-2">Wholesale Buyer</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="RETAIL_BUYER"
                  checked={buyerType === 'RETAIL_BUYER'}
                  onChange={handleBuyerTypeChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-2">Retail Buyer</span>
              </label>
            </div>
          </div>
          
          {/* Basic Information */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-medium text-gray-800 mb-4">Basic Information</h2>
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
          
          {/* Business Information */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-medium text-gray-800 mb-4">
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
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
          
          {/* Address Information */}
          <div>
            <h2 className="text-xl font-medium text-gray-800 mb-4">Address Information</h2>
            
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-6">
            <Link
              href="/auth/user/login"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Already have an account? Sign in
            </Link>
            
            <button
              type="submit"
              disabled={isLoading}
              className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}