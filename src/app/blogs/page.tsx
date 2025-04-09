"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.2, ...options });

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting];
};

// Format date in a readable format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Blog Card Component
const BlogCard = ({ blog, index, isInView }) => {
  return (
    <div
      className={`relative group transition-all duration-700 transform bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-blue-400/10
                ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Banner Image */}
      <div className="relative h-48 overflow-hidden">
        {blog.bannerImage ? (
          <img 
            src={blog.bannerImage} 
            alt={blog.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-lg font-medium">No Image</span>
          </div>
        )}
        
        {/* Category Badge - if blog has categories */}
        {blog.category && blog.category.length > 0 && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
              {blog.category[0]}
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Date */}
        <div className="flex items-center text-xs text-gray-600">
          <Calendar className="w-3 h-3 mr-1" />
          <span>{blog.publishedAt ? formatDate(blog.publishedAt) : 'Unpublished'}</span>
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-blue-900 line-clamp-2 group-hover:text-blue-500 transition-colors">
          {blog.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-gray-700 line-clamp-3">
          {blog.metaDescription || "No description available for this blog post."}
        </p>
        
        {/* Read More Link */}
        <div className="pt-2">
          <Link 
            href={`/blog/${blog.slug || blog.id}`}
            className="inline-flex items-center text-blue-500 text-sm font-medium group/link"
          >
            Read more 
            <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      
      {/* Bottom highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500
                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  );
};

// Main Blogs Page Component
const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [blogsRef, isBlogsInView] = useIntersectionObserver();

  // Fetch blogs from the API
  const fetchBlogs = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/get-blogs?page=${page}&limit=9`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      
      const data = await response.json();
      setBlogs(data.blogs);
      setTotalPages(data.pagination.totalPages);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  // Pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="w-full bg-blue-900 py-12 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white text-center">Our Blog</h1>
        </div>
      </div>

      {/* Blog List Section */}
      <section 
        ref={blogsRef}
        className="w-full py-12 relative"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => fetchBlogs(1)}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* No Results */}
          {!isLoading && !error && blogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-700 text-lg mb-4">No blogs found.</p>
            </div>
          )}

          {/* Blog Grid */}
          {!isLoading && !error && blogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {blogs.map((blog, index) => (
                <BlogCard 
                  key={blog.id} 
                  blog={blog} 
                  index={index}
                  isInView={isBlogsInView}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && !error && blogs.length > 0 && (
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg border flex items-center gap-1
                            ${currentPage === 1 
                              ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                              : 'border-blue-900/20 text-blue-900 hover:bg-blue-900 hover:text-white transition-colors'}`}
                >
                  <ArrowRight className="w-4 h-4 rotate-180" /> 
                  Previous
                </button>
                
                <div className="px-4 py-2 bg-gray-50 border border-blue-900/10 rounded-lg">
                  <span className="text-blue-900 font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
                
                <button 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg border flex items-center gap-1
                            ${currentPage === totalPages 
                              ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                              : 'border-blue-900/20 text-blue-900 hover:bg-blue-900 hover:text-white transition-colors'}`}
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;