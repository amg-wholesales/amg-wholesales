
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max to show
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Complex logic for showing pages with ellipsis
      if (currentPage <= 3) {
        // If near start, show first 4 pages + ellipsis + last page
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // If near end, show first page + ellipsis + last 4 pages
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // If in middle, show first page + ellipsis + current-1, current, current+1 + ellipsis + last page
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };
  
  const pageNumbers = getPageNumbers();
  
  if (totalPages <= 1) return null;
  
  return (
    <div className="mt-8">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center flex-wrap gap-2">
          {/* Previous page button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
              currentPage === 1
                ? "text-gray-300 cursor-not-allowed bg-gray-50"
                : "text-gray-700 hover:bg-gray-100 border border-gray-300"
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>
          
          {/* Page numbers */}
          {pageNumbers.map((pageNumber, index) => (
            <button
              key={index}
              onClick={() => typeof pageNumber === "number" && onPageChange(pageNumber)}
              disabled={pageNumber === "..."}
              className={`flex items-center justify-center w-10 h-10 text-sm font-medium rounded-lg transition-colors ${
                pageNumber === currentPage
                  ? "bg-blue-600 text-white border border-blue-600"
                  : pageNumber === "..."
                  ? "text-gray-400 cursor-default"
                  : "text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              {pageNumber}
            </button>
          ))}
          
          {/* Next page button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
              currentPage === totalPages
                ? "text-gray-300 cursor-not-allowed bg-gray-50"
                : "text-gray-700 hover:bg-gray-100 border border-gray-300"
            }`}
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        
        {/* Page information */}
        <div className="text-sm text-gray-500 mt-4">
          Showing page {currentPage} of {totalPages}
        </div>
      </div>
    </div>
  );
}