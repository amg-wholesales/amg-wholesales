// // app/dashboard/purchase-requests/page.jsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useAuth } from '@/context/authContext';
// import Link from 'next/link';
// import Image from 'next/image';

// export default function UserPurchaseRequests() {
//   const { isAuthenticated, userId, userType } = useAuth();
//   const [purchaseRequests, setPurchaseRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
   

//     const fetchPurchaseRequests = async () => {
//       try {
//         const response = await fetch(`/api/purchase-requests/user?userId=${userId}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch purchase requests');
//         }
//         const data = await response.json();
//         setPurchaseRequests(data.purchaseRequests);
//       } catch (err) {
//         setError(err.message);
//         console.error('Error fetching purchase requests:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) {
//       fetchPurchaseRequests();
//     }
//   }, [isAuthenticated, userId, userType]);

//   const getStatusBadgeClass = (status) => {
//     switch (status) {
//       case 'APPROVED':
//         return 'bg-green-100 text-green-800';
//       case 'REJECTED':
//         return 'bg-red-100 text-red-800';
//       case 'PENDING':
//       default:
//         return 'bg-yellow-100 text-yellow-800';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="max-w-4xl mx-auto px-4">
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
//             <p>{error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-6xl mx-auto px-4">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">My Purchase Requests</h1>
        
//         {purchaseRequests.length === 0 ? (
//           <div className="bg-white rounded-lg shadow p-6 text-center">
//             <p className="text-gray-500 mb-4">You haven't made any purchase requests yet.</p>
//             <Link href="/products">
//               <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
//                 Browse Products
//               </button>
//             </Link>
//           </div>
//         ) : (
//           <div className="bg-white rounded-lg shadow overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Product
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Quantity
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Notes
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {purchaseRequests.map((request) => (
//                     <tr key={request.id}>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="flex items-center">
//                           {request.product?.images?.[0] && (
//                             <div className="flex-shrink-0 h-10 w-10 mr-4">
//                               <img 
//                                 src={request.product.images[0]} 
//                                 alt={request.product?.name || 'Product image'} 
//                                 width={40} 
//                                 height={40} 
//                                 className="rounded-md object-cover"
//                               />
//                             </div>
//                           )}
//                           <div>
//                             <div className="text-sm font-medium text-gray-900">
//                               {request.product?.name || 'Unknown Product'}
//                             </div>
//                             <div className="text-sm text-gray-500">
//                               {request.product?.price ? `$${parseFloat(request.product.price).toFixed(2)}` : 'N/A'}
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {request.quantity || 1}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {request.createdAt 
//                           ? new Date(request.createdAt).toLocaleDateString() 
//                           : 'N/A'}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(request.status)}`}>
//                           {request.status || 'PENDING'}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
//                         {request.notes || 'No notes'}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// app/dashboard/purchase-requests/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import Link from 'next/link';
import Image from 'next/image';

export default function UserPurchaseRequests() {
  const { isAuthenticated, userId, userType } = useAuth();
  const [purchaseRequests, setPurchaseRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchaseRequests = async () => {
      try {
        const response = await fetch(`/api/purchase-requests/user?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch purchase requests');
        }
        const data = await response.json();
        setPurchaseRequests(data.purchaseRequests);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching purchase requests:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPurchaseRequests();
    }
  }, [isAuthenticated, userId, userType]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      case 'PENDING':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">My Purchase Requests</h1>
        
        {purchaseRequests.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 text-center">
            <p className="text-gray-500 mb-4">You haven't made any purchase requests yet.</p>
            <Link href="/products">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Browse Products
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop view - Table */}
            <div className="hidden sm:block bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {purchaseRequests.map((request) => (
                      <tr key={request.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {request.product?.images?.[0] && (
                              <div className="flex-shrink-0 h-10 w-10 mr-4">
                                <img 
                                  src={request.product.images[0]} 
                                  alt={request.product?.name || 'Product image'} 
                                  width={40} 
                                  height={40} 
                                  className="rounded-md object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {request.product?.name || 'Unknown Product'}
                              </div>
                              <div className="text-sm text-gray-500">
                                {request.product?.price ? `$${parseFloat(request.product.price).toFixed(2)}` : 'N/A'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.quantity || 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.createdAt 
                            ? new Date(request.createdAt).toLocaleDateString() 
                            : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(request.status)}`}>
                            {request.status || 'PENDING'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                          {request.notes || 'No notes'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Mobile view - Cards */}
            <div className="sm:hidden space-y-4">
              {purchaseRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      {request.product?.images?.[0] && (
                        <div className="flex-shrink-0 h-12 w-12">
                          <img 
                            src={request.product.images[0]} 
                            alt={request.product?.name || 'Product image'} 
                            className="h-full w-full rounded-md object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">
                          {request.product?.name || 'Unknown Product'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {request.product?.price ? `$${parseFloat(request.product.price).toFixed(2)}` : 'N/A'}
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${getStatusBadgeClass(request.status)}`}>
                      {request.status || 'PENDING'}
                    </span>
                  </div>
                  
                  <div className="p-4 bg-gray-50">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500">Quantity:</div>
                      <div className="font-medium text-gray-900">{request.quantity || 1}</div>
                      
                      <div className="text-gray-500">Date:</div>
                      <div className="font-medium text-gray-900">
                        {request.createdAt 
                          ? new Date(request.createdAt).toLocaleDateString() 
                          : 'N/A'}
                      </div>
                      
                      {request.notes && (
                        <>
                          <div className="text-gray-500">Notes:</div>
                          <div className="font-medium text-gray-900">{request.notes}</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}