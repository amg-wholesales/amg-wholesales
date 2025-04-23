
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/authContext';

export default function AdminPurchaseRequests() {
  const { isAuthenticated, userType } = useAuth();
  const [purchaseRequests, setPurchaseRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [buyerTypeFilter, setBuyerTypeFilter] = useState('');
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
  

    const fetchPurchaseRequests = async () => {
      try {
        // Build query params
        const params = new URLSearchParams();
        if (statusFilter) params.append('status', statusFilter);
        if (buyerTypeFilter) params.append('buyerType', buyerTypeFilter);
        
        const url = `/api/purchase-requests/admin?${params.toString()}`;
        
        const response = await fetch(url);
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

    if (isAuthenticated && userType === 'ADMIN') {
      fetchPurchaseRequests();
    }
  }, [isAuthenticated, userType, statusFilter, buyerTypeFilter]);

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleBuyerTypeFilterChange = (e) => {
    setBuyerTypeFilter(e.target.value);
  };

  const handleUpdateRequest = async (requestId, newStatus) => {
    try {
      setUpdateLoading(true);
      const response = await fetch(`/api/purchase-requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          notes: adminNotes || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update purchase request');
      }

      // Update the status in the local state
      setPurchaseRequests(prevRequests =>
        prevRequests.map(req =>
          req.id === requestId
            ? { ...req, status: newStatus, notes: adminNotes || req.notes }
            : req
        )
      );

      // Reset form
      setCurrentRequestId(null);
      setAdminNotes('');
      
    } catch (err) {
      console.error('Error updating purchase request:', err);
      alert('Failed to update request. Please try again.');
    } finally {
      setUpdateLoading(false);
    }
  };

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

  const getBuyerTypeBadgeClass = (userType) => {
    switch (userType) {
      case 'WHOLESALE_BUYER':
        return 'bg-green-50 text-green-700';
      case 'RETAIL_BUYER':
        return 'bg-purple-50 text-purple-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  // Function to get display price based on user type
  const getDisplayPrice = (request) => {
    if (!request.product) return 'N/A';
    
    // For retail buyers, show retail price or calculate if not set
    if (request.user?.userType === 'RETAIL_BUYER') {
      const retailPrice = request.product.retailPrice || 
                         (request.product.price ? Number(request.product.price) * 1.15 : null);
      return retailPrice ? `$${parseFloat(retailPrice).toFixed(2)}` : 'N/A';
    }
    
    // For wholesale buyers and others, show wholesale price
    return request.product.price ? `$${parseFloat(request.product.price).toFixed(2)}` : 'N/A';
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
      <div className="min-h-screen bg-gray-50 py-8">
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
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Purchase Requests</h1>
          
          {/* Responsive filters */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
              <label htmlFor="status-filter" className="text-sm font-medium text-gray-700 mb-1 sm:mb-0">Status:</label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
              <label htmlFor="buyer-type-filter" className="text-sm font-medium text-gray-700 mb-1 sm:mb-0">Buyer Type:</label>
              <select
                id="buyer-type-filter"
                value={buyerTypeFilter}
                onChange={handleBuyerTypeFilterChange}
                className="w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">All Buyers</option>
                <option value="WHOLESALE_BUYER">Wholesale</option>
                <option value="RETAIL_BUYER">Retail</option>
              </select>
            </div>
          </div>
        </div>
        
        {purchaseRequests.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500">No purchase requests found with the selected filters.</p>
          </div>
        ) : (
          <div>
            {/* Desktop View - Table */}
            <div className="hidden sm:block bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Buyer
                      </th>
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
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {purchaseRequests.map((request) => (
                      <tr key={request.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {request.user?.name || 'Unknown User'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {request.user?.email || 'No email'}
                          </div>
                          <div className="flex items-center mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getBuyerTypeBadgeClass(request.user?.userType)}`}>
                              {request.user?.userType === 'WHOLESALE_BUYER' 
                                ? 'Wholesale' 
                                : request.user?.userType === 'RETAIL_BUYER' 
                                  ? 'Retail' 
                                  : request.user?.userType || 'Unknown'}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {request.user?.userType === 'WHOLESALE_BUYER' && (
                              <>
                                {request.user?.wholesaleBuyer?.companyName || 
                                 request.user?.wholesaleBuyer?.storeName || 
                                 request.user?.buyer?.companyName || 
                                 request.user?.buyer?.storeName || 
                                 'No company info'}
                              </>
                            )}
                          </div>
                        </td>
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
                              <div className="flex items-center space-x-1 text-sm">
                                <span className={`${
                                  request.user?.userType === 'RETAIL_BUYER' 
                                    ? 'text-purple-600 font-medium' 
                                    : 'text-green-600 font-medium'
                                }`}>
                                  {getDisplayPrice(request)}
                                </span>
                                <span className="text-xs text-gray-500">
                                  ({request.user?.userType === 'RETAIL_BUYER' ? 'retail' : 'wholesale'})
                                </span>
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
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {request.status === 'PENDING' ? (
                            currentRequestId === request.id ? (
                              <div className="space-y-3">
                                <textarea
                                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  placeholder="Add notes for the buyer (optional)"
                                  value={adminNotes}
                                  onChange={(e) => setAdminNotes(e.target.value)}
                                  rows="2"
                                />
                                <div className="flex space-x-2">
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateRequest(request.id, 'APPROVED')}
                                    disabled={updateLoading}
                                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateRequest(request.id, 'REJECTED')}
                                    disabled={updateLoading}
                                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                  >
                                    Reject
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setCurrentRequestId(null);
                                      setAdminNotes('');
                                    }}
                                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setCurrentRequestId(request.id)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Review
                              </button>
                            )
                          ) : (
                            <span className="text-gray-500">Processed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Mobile View - Cards */}
            <div className="sm:hidden space-y-4">
              {purchaseRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {request.user?.name || 'Unknown User'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {request.user?.email || 'No email'}
                        </div>
                        <div className="flex items-center mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getBuyerTypeBadgeClass(request.user?.userType)}`}>
                            {request.user?.userType === 'WHOLESALE_BUYER' 
                              ? 'Wholesale' 
                              : request.user?.userType === 'RETAIL_BUYER' 
                                ? 'Retail' 
                                : request.user?.userType || 'Unknown'}
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(request.status)}`}>
                        {request.status || 'PENDING'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center">
                      {request.product?.images?.[0] && (
                        <div className="flex-shrink-0 h-16 w-16 mr-4">
                          <img 
                            src={request.product.images[0]} 
                            alt={request.product?.name || 'Product image'} 
                            className="h-full w-full rounded-md object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {request.product?.name || 'Unknown Product'}
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          <span className={`${
                            request.user?.userType === 'RETAIL_BUYER' 
                              ? 'text-purple-600 font-medium' 
                              : 'text-green-600 font-medium'
                          }`}>
                            {getDisplayPrice(request)}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({request.user?.userType === 'RETAIL_BUYER' ? 'retail' : 'wholesale'})
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          Quantity: {request.quantity || 1}
                        </div>
                        <div className="text-sm text-gray-500">
                          Date: {request.createdAt 
                            ? new Date(request.createdAt).toLocaleDateString() 
                            : 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {request.notes && (
                    <div className="p-4 border-b border-gray-200">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Notes</div>
                      <div className="text-sm text-gray-700">{request.notes}</div>
                    </div>
                  )}
                  
                  {request.status === 'PENDING' && (
                    <div className="p-4">
                      {currentRequestId === request.id ? (
                        <div className="space-y-3">
                          <textarea
                            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Add notes for the buyer (optional)"
                            value={adminNotes}
                            onChange={(e) => setAdminNotes(e.target.value)}
                            rows="3"
                          />
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => handleUpdateRequest(request.id, 'APPROVED')}
                              disabled={updateLoading}
                              className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              onClick={() => handleUpdateRequest(request.id, 'REJECTED')}
                              disabled={updateLoading}
                              className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Reject
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setCurrentRequestId(null);
                                setAdminNotes('');
                              }}
                              className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setCurrentRequestId(request.id)}
                          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Review Request
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}