// 'use client'

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { useAuth } from '@/context/authContext';

// export default function UserLogin() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const { login } = useAuth();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     try {
//       // Add userType to identify this as a buyer login
//       const loginData = { ...formData, userType: 'BUYER' };
//       const result = await login(loginData);

//       if (result.success) {
//         router.push('/user/dashboard');
//       } else {
//         setError(result.error || 'Login failed');
//       }
//     } catch (err) {
//       setError('An unexpected error occurred');
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold text-gray-900">Buyer Login</h1>
//           <p className="mt-2 text-gray-600">Sign in to access your account</p>
//         </div>
        
//         {error && (
//           <div className="p-3 text-sm text-red-800 bg-red-100 rounded-md">
//             {error}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email Address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>
            
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>
//           </div>
          
//           <div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//             >
//               {isLoading ? 'Signing in...' : 'Sign in'}
//             </button>
//           </div>
//         </form>
        
//         <div className="text-center mt-4">
//           <p className="text-sm text-gray-600">
//             Don't have an account?{' '}
//             <Link href="/auth/user/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/authContext';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Add userType to identify this as a buyer login with specific buyer type
      const loginData = { ...formData, userType: formData.buyerType };
      const result = await login(loginData);

      if (result.success) {
        router.push('/user/dashboard');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Buyer Login</h1>
          <p className="mt-2 text-gray-600">Sign in to access your account</p>
        </div>
        
        {error && (
          <div className="p-3 text-sm text-red-800 bg-red-100 rounded-md">
            {error}
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/user/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}