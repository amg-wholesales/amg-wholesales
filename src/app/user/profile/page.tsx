"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { Edit, Save, X } from "lucide-react";

export default function BuyerProfile() {
  const router = useRouter();
  const { isAuthenticated, userId, userType } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [profile, setProfile] = useState({
    user: {
      name: "",
      email: ""
    },
    buyer: {
      storeName: "",
      companyName: "",
      contactPerson: "",
      officePhone: "",
      cellPhone: "",
      addressLine1: "",
      city: "",
      state: "",
      zipCode: "",
      notes: ""
    }
  });
  
  // Fetch profile data
  useEffect(() => {
    // if (!isAuthenticated) {
    //   router.push("/auth/user/login");
    //   return;
    // }
    
    // if (userType !== "BUYER") {
    //   router.push("/auth/user/login");
    //   return;
    // }
    
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/profile?userId=${userId}`);
        
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Failed to load profile");
        }
      } catch (err) {
        setError("An error occurred while fetching your profile");
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [isAuthenticated, userId, userType, router]);
  
  // Handle field changes
  const handleChange = (section, field, value) => {
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await fetch("/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          name: profile.user.name,
          buyer: {
            storeName: profile.buyer.storeName,
            companyName: profile.buyer.companyName,
            contactPerson: profile.buyer.contactPerson,
            officePhone: profile.buyer.officePhone,
            cellPhone: profile.buyer.cellPhone,
            addressLine1: profile.buyer.addressLine1,
            city: profile.buyer.city,
            state: profile.buyer.state,
            zipCode: profile.buyer.zipCode,
            notes: profile.buyer.notes
          }
        })
      });
      
      if (response.ok) {
        setSuccess(true);
        setEditing(false);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to update profile");
      }
    } catch (err) {
      setError("An error occurred while updating your profile");
      console.error("Error updating profile:", err);
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Buyer Profile</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Your personal and company information</p>
            </div>
            
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditing(false)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {submitting ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-t-2 border-white"></div>
                  ) : (
                    <Save className="h-4 w-4 mr-1" />
                  )}
                  Save
                </button>
              </div>
            )}
          </div>
          
          {error && (
            <div className="px-4 py-3 bg-red-50 text-red-700 border-t border-red-200">
              {error}
            </div>
          )}
          
          {success && (
            <div className="px-4 py-3 bg-green-50 text-green-700 border-t border-green-200">
              Profile updated successfully!
            </div>
          )}
          
          <form>
            {/* User Information */}
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Full name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {editing ? (
                      <input
                        type="text"
                        value={profile.user.name || ""}
                        onChange={(e) => handleChange("user", "name", e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    ) : (
                      profile.user.name || "Not provided"
                    )}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Email address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {profile.user.email || "Not provided"}
                  </dd>
                </div>
              </dl>
            </div>
            
            {/* Company Information */}
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Company Information</h3>
              </div>
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Company Name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {editing ? (
                      <input
                        type="text"
                        value={profile.buyer.companyName || ""}
                        onChange={(e) => handleChange("buyer", "companyName", e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    ) : (
                      profile.buyer.companyName || "Not provided"
                    )}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Store Name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {editing ? (
                      <input
                        type="text"
                        value={profile.buyer.storeName || ""}
                        onChange={(e) => handleChange("buyer", "storeName", e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    ) : (
                      profile.buyer.storeName || "Not provided"
                    )}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Contact Person</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {editing ? (
                      <input
                        type="text"
                        value={profile.buyer.contactPerson || ""}
                        onChange={(e) => handleChange("buyer", "contactPerson", e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    ) : (
                      profile.buyer.contactPerson || "Not provided"
                    )}
                  </dd>
                </div>
              </dl>
            </div>
            
            {/* Contact Information */}
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Information</h3>
              </div>
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Office Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {editing ? (
                      <input
                        type="text"
                        value={profile.buyer.officePhone || ""}
                        onChange={(e) => handleChange("buyer", "officePhone", e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    ) : (
                      profile.buyer.officePhone || "Not provided"
                    )}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Cell Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {editing ? (
                      <input
                        type="text"
                        value={profile.buyer.cellPhone || ""}
                        onChange={(e) => handleChange("buyer", "cellPhone", e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    ) : (
                      profile.buyer.cellPhone || "Not provided"
                    )}
                  </dd>
                </div>
              </dl>
            </div>
            
            {/* Address Information */}
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Address</h3>
              </div>
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {editing ? (
                      <input
                        type="text"
                        value={profile.buyer.addressLine1 || ""}
                        onChange={(e) => handleChange("buyer", "addressLine1", e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    ) : (
                      profile.buyer.addressLine1 || "Not provided"
                    )}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">City</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {editing ? (
                      <input
                        type="text"
                        value={profile.buyer.city || ""}
                        onChange={(e) => handleChange("buyer", "city", e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    ) : (
                      profile.buyer.city || "Not provided"
                    )}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">State</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {editing ? (
                      <input
                        type="text"
                        value={profile.buyer.state || ""}
                        onChange={(e) => handleChange("buyer", "state", e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    ) : (
                      profile.buyer.state || "Not provided"
                    )}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">ZIP Code</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {editing ? (
                      <input
                        type="text"
                        value={profile.buyer.zipCode || ""}
                        onChange={(e) => handleChange("buyer", "zipCode", e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    ) : (
                      profile.buyer.zipCode || "Not provided"
                    )}
                  </dd>
                </div>
              </dl>
            </div>
            
            {/* Additional Information */}
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Additional Information</h3>
              </div>
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Notes</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {editing ? (
                      <textarea
                        rows={3}
                        value={profile.buyer.notes || ""}
                        onChange={(e) => handleChange("buyer", "notes", e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    ) : (
                      profile.buyer.notes || "Not provided"
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}