// app/ask-for-help/page.jsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function AskForHelp() {
  const [formData, setFormData] = useState({
    issues: {
      productNotFound: false,
      deliveryIssue: false,
      loginRegisterProblem: false,
      askForHelp: false,
    },
    message: '',
    email: ''
  });
  
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      issues: {
        ...formData.issues,
        [name]: checked
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Make sure at least one issue is checked
    const hasIssueSelected = Object.values(formData.issues).some(value => value);
    if (!hasIssueSelected) {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: 'Please select at least one issue you are facing.' }
      });
      return;
    }

    setStatus(prevStatus => ({ ...prevStatus, submitting: true }));
    
    try {
      const res = await fetch('/api/ask-for-help', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const text = await res.text();
      
      if (res.status === 200) {
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: 'Your support request has been submitted successfully!' }
        });
        setFormData({
          issues: {
            productNotFound: false,
            deliveryIssue: false,
            loginRegisterProblem: false,
            askForHelp: false,
          },
          message: '',
          email: ''
        });
      } else {
        setStatus({
          submitted: false,
          submitting: false,
          info: { error: true, msg: text || 'Something went wrong. Please try again later.' }
        });
      }
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: 'Unable to submit request. Please try again later.' }
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
     

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-indigo-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Ask For Help</h1>
          </div>
          
          <div className="p-6 sm:p-8">
            {status.submitted ? (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      {status.info.msg}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <button 
                    onClick={() => setStatus({ submitted: false, submitting: false, info: { error: false, msg: null } })}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status.info.error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">
                          {status.info.msg}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div>
                  <div className="text-lg font-medium text-gray-900 mb-4">Problems Faced <span className="text-red-500">*</span></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="productNotFound"
                          name="productNotFound"
                          type="checkbox"
                          checked={formData.issues.productNotFound}
                          onChange={handleCheckboxChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="productNotFound" className="font-medium text-gray-700">Product Not Found</label>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="deliveryIssue"
                          name="deliveryIssue"
                          type="checkbox"
                          checked={formData.issues.deliveryIssue}
                          onChange={handleCheckboxChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="deliveryIssue" className="font-medium text-gray-700">Delivery Issue</label>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="loginRegisterProblem"
                          name="loginRegisterProblem"
                          type="checkbox"
                          checked={formData.issues.loginRegisterProblem}
                          onChange={handleCheckboxChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="loginRegisterProblem" className="font-medium text-gray-700">Login/Register Problem</label>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="askForHelp"
                          name="askForHelp"
                          type="checkbox"
                          checked={formData.issues.askForHelp}
                          onChange={handleCheckboxChange}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="askForHelp" className="font-medium text-gray-700">Ask for help</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Describe your issue <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-black"
                      placeholder="Write about the issue that you are facing. Get help for many common issues from Customer Service."
                    ></textarea>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-black"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <button
                    type="submit"
                    disabled={status.submitting}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {status.submitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
    
      </main>
      
      {/* Footer */}
    
    </div>
  );
}