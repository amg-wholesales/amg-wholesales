'use client';

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Search,
  AlertTriangle,
  Building,
  Phone,
  Mail,
  User,
  Hash
} from 'lucide-react';

export default function AdminWholesaleBuyerVerification() {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedBuyer, setExpandedBuyer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('pending'); // 'pending', 'approved', 'rejected', 'all'
  const [actionLoading, setActionLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');

  useEffect(() => {
    fetchWholesaleBuyers();
  }, [filter]);

  const fetchWholesaleBuyers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/wholesale-buyers?filter=' + filter);
      const data = await response.json();
      
      if (data.success) {
        setBuyers(data.buyers);
      } else {
        setError(data.error || 'Failed to fetch wholesale buyers');
      }
    } catch (err) {
      console.error('Error fetching wholesale buyers:', err);
      setError('Failed to load wholesale buyers');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (userId, verified) => {
    setActionLoading(true);
    setActionSuccess('');
    
    try {
      const response = await fetch('/api/verify-wholesale-buyer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, verified })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update the buyer's status in the local state
        setBuyers(buyers.map(buyer => 
          buyer.userId === userId ? { ...buyer, verified } : buyer
        ));
        setActionSuccess(`Buyer ${verified ? 'approved' : 'rejected'} successfully`);
        
        // Refresh the list after a short delay
        setTimeout(() => {
          fetchWholesaleBuyers();
          setActionSuccess('');
        }, 2000);
      } else {
        setError(data.error || 'Failed to update verification status');
      }
    } catch (err) {
      console.error('Error verifying buyer:', err);
      setError('An error occurred while processing your request');
    } finally {
      setActionLoading(false);
    }
  };

  const toggleExpandBuyer = (userId) => {
    if (expandedBuyer === userId) {
      setExpandedBuyer(null);
    } else {
      setExpandedBuyer(userId);
    }
  };

  const filteredBuyers = buyers.filter(buyer => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (buyer.user?.name?.toLowerCase().includes(searchLower) ||
       buyer.user?.email?.toLowerCase().includes(searchLower) ||
       buyer.companyName?.toLowerCase().includes(searchLower) ||
       buyer.storeName?.toLowerCase().includes(searchLower) ||
       buyer.taxId?.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-light tracking-tight text-gray-900 mb-6">Wholesale Buyer Verification</h1>
        
        {actionSuccess && (
          <div className="mb-6 p-4 bg-green-50 text-green-800 border border-green-200 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            <span>{actionSuccess}</span>
          </div>
        )}
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-800 border border-red-200 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
            <span>{error}</span>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="p-4 border-b">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center w-full md:w-auto">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search buyers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
              </div>
              
              <div className="flex space-x-2">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black bg-white"
                >
                  <option value="pending">Pending Verification</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="all">All Buyers</option>
                </select>
                
                <button
                  onClick={() => fetchWholesaleBuyers()}
                  className="px-4 py-2 bg-gray-800 text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                  disabled={loading}
                >
                  Refresh
                </button>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin h-8 w-8 border-4 border-gray-200 border-t-gray-800 rounded-full"></div>
              <p className="mt-2 text-gray-600">Loading wholesale buyers...</p>
            </div>
          ) : filteredBuyers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Building className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No wholesale buyers found{filter !== 'all' ? ` with status: ${filter}` : ''}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business Details
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBuyers.map((buyer) => (
                    <React.Fragment key={buyer.userId}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {buyer.companyName || buyer.storeName || "N/A"}
                              </div>
                              <div className="text-sm text-gray-500">
                                Tax ID: {buyer.taxId || "Not provided"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{buyer.user?.name}</div>
                          <div className="text-sm text-gray-500">{buyer.user?.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${buyer.verified === true 
                              ? 'bg-green-100 text-green-800' 
                              : buyer.verified === false 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-red-100 text-red-800'}`}
                          >
                            {buyer.verified === true 
                              ? 'Approved' 
                              : buyer.verified === false 
                                ? 'Pending' 
                                : 'Rejected'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => toggleExpandBuyer(buyer.userId)}
                              className="text-blue-600 hover:text-blue-900 flex items-center"
                            >
                              Details
                              {expandedBuyer === buyer.userId ? (
                                <ChevronUp className="ml-1 w-4 h-4" />
                              ) : (
                                <ChevronDown className="ml-1 w-4 h-4" />
                              )}
                            </button>
                            
                            {buyer.verified === false && (
                              <>
                                <button
                                  onClick={() => handleVerify(buyer.userId, true)}
                                  disabled={actionLoading}
                                  className="text-green-600 hover:text-green-900 flex items-center"
                                >
                                  <CheckCircle className="mr-1 w-4 h-4" />
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleVerify(buyer.userId, null)}
                                  disabled={actionLoading}
                                  className="text-red-600 hover:text-red-900 flex items-center"
                                >
                                  <XCircle className="mr-1 w-4 h-4" />
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                      
                      {expandedBuyer === buyer.userId && (
                        <tr>
                          <td colSpan="4" className="px-6 py-4 bg-gray-50">
                            <div className="border border-gray-200 rounded-lg bg-white p-4">
                              <h3 className="text-lg font-medium mb-4">Detailed Information</h3>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                                    <Building className="w-4 h-4 mr-1" />
                                    Business Information
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="text-gray-600 font-medium">Company Name:</span>{" "}
                                      {buyer.companyName || "Not provided"}
                                    </div>
                                    <div>
                                      <span className="text-gray-600 font-medium">Store Name:</span>{" "}
                                      {buyer.storeName || "Not provided"}
                                    </div>
                                    <div>
                                      <span className="text-gray-600 font-medium">Tax ID:</span>{" "}
                                      {buyer.taxId || "Not provided"}
                                    </div>
                                    {buyer.taxIdFile && (
                                      <div>
                                        <span className="text-gray-600 font-medium">Tax ID File:</span>{" "}
                                        <a 
                                          href={buyer.taxIdFile} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-blue-600 hover:underline flex items-center"
                                        >
                                          View document <ExternalLink className="w-3 h-3 ml-1" />
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                                    <User className="w-4 h-4 mr-1" />
                                    Contact Information
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div>
                                      <span className="text-gray-600 font-medium">Contact Person:</span>{" "}
                                      {buyer.contactPerson || buyer.user?.name || "Not provided"}
                                    </div>
                                    <div>
                                      <span className="text-gray-600 font-medium">Email:</span>{" "}
                                      {buyer.user?.email || "Not provided"}
                                    </div>
                                    <div>
                                      <span className="text-gray-600 font-medium">Office Phone:</span>{" "}
                                      {buyer.officePhone || "Not provided"}
                                    </div>
                                    <div>
                                      <span className="text-gray-600 font-medium">Cell Phone:</span>{" "}
                                      {buyer.cellPhone || "Not provided"}
                                    </div>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                                    <Mail className="w-4 h-4 mr-1" />
                                    Address
                                  </h4>
                                  <div className="space-y-2 text-sm">
                                    <div>{buyer.addressLine1 || "No address provided"}</div>
                                    {(buyer.city || buyer.state || buyer.zipCode) && (
                                      <div>
                                        {buyer.city}{buyer.city && buyer.state ? ", " : ""}{buyer.state} {buyer.zipCode}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 flex items-center">
                                    <Hash className="w-4 h-4 mr-1" />
                                    Additional Notes
                                  </h4>
                                  <div className="text-sm bg-gray-50 p-3 rounded border border-gray-200 h-32 overflow-auto">
                                    {buyer.notes || "No additional notes provided"}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-6 flex justify-end">
                                {buyer.verified === false ? (
                                  <div className="space-x-3">
                                    <button
                                      onClick={() => handleVerify(buyer.userId, true)}
                                      disabled={actionLoading}
                                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                                    >
                                      {actionLoading ? 'Processing...' : 'Approve Buyer'}
                                    </button>
                                    <button
                                      onClick={() => handleVerify(buyer.userId, null)}
                                      disabled={actionLoading}
                                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                                    >
                                      {actionLoading ? 'Processing...' : 'Reject Application'}
                                    </button>
                                  </div>
                                ) : (
                                  <div>
                                    <span className={`px-4 py-2 rounded-md ${
                                      buyer.verified === true 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                      {buyer.verified === true ? 'Approved' : 'Rejected'}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}