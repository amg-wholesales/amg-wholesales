// app/admin/purchase-requests/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import Image from 'next/image';

export default function AdminPurchaseRequests() {
  const { isAuthenticated, userType } = useAuth();
  const [purchaseRequests, setPurchaseRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    // Redirect if not authenticated or not an admin
    // if (!isAuthenticated || userType !== 'ADMIN') {
    //   setError('You must be logged in as an admin to view this page');
    //   setLoading(false);
    //   return;
    // }

    const fetchPurchaseRequests = async () => {
      try {
        const url = statusFilter 
          ? `/api/purchase-requests/admin?status=${statusFilter}` 
          : '/api/purchase-requests/admin';
        
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
  }, [isAuthenticated, userType, statusFilter]);

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Purchase Requests Management</h1>
          
          <div className="flex items-center space-x-2">
            <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">Filter by status:</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">All Requests</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>
        
        {purchaseRequests.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500">No purchase requests found with the selected filter.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
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
                        <div className="text-xs text-gray-500">
                          {request.user?.buyer?.companyName || request.user?.buyer?.storeName || 'No company info'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {request.product?.images?.[0] && (
                            <div className="flex-shrink-0 h-10 w-10 mr-4">
                              <Image 
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
        )}
      </div>
    </div>
  );
}