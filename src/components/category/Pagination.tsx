
// "use client";

// import { ChevronLeft, ChevronRight } from "lucide-react";

// export default function Pagination({ currentPage, totalPages, onPageChange }) {
//   // Generate array of page numbers to display
//   const getPageNumbers = () => {
//     const pageNumbers = [];
//     const maxPagesToShow = 5;
    
//     if (totalPages <= maxPagesToShow) {
//       // Show all pages if total is less than max to show
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       // Complex logic for showing pages with ellipsis
//       if (currentPage <= 3) {
//         // If near start, show first 4 pages + ellipsis + last page
//         for (let i = 1; i <= 4; i++) {
//           pageNumbers.push(i);
//         }
//         pageNumbers.push("...");
//         pageNumbers.push(totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         // If near end, show first page + ellipsis + last 4 pages
//         pageNumbers.push(1);
//         pageNumbers.push("...");
//         for (let i = totalPages - 3; i <= totalPages; i++) {
//           pageNumbers.push(i);
//         }
//       } else {
//         // If in middle, show first page + ellipsis + current-1, current, current+1 + ellipsis + last page
//         pageNumbers.push(1);
//         pageNumbers.push("...");
//         for (let i = currentPage - 1; i <= currentPage + 1; i++) {
//           pageNumbers.push(i);
//         }
//         pageNumbers.push("...");
//         pageNumbers.push(totalPages);
//       }
//     }
    
//     return pageNumbers;
//   };
  
//   const pageNumbers = getPageNumbers();
  
//   if (totalPages <= 1) return null;
  
//   return (
//     <div className="mt-10">
//       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
//         {/* Page information - Left aligned on desktop */}
//         <div className="text-sm font-medium text-gray-500 order-2 md:order-1">
//           Showing page <span className="text-indigo-600 font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
//         </div>
        
//         {/* Pagination controls - Centered, right aligned on desktop */}
//         <div className="flex items-center justify-center md:justify-end order-1 md:order-2">
//           {/* Previous page button */}
//           <button
//             onClick={() => onPageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className={`flex items-center justify-center h-10 px-3 rounded-l-lg transition-all duration-200 ${
//               currentPage === 1
//                 ? "text-gray-300 cursor-not-allowed bg-gray-50"
//                 : "text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 border border-gray-200"
//             }`}
//             aria-label="Previous page"
//           >
//             <ChevronLeft size={20} className="mr-1" />
//             <span className="hidden sm:inline text-sm font-medium">Previous</span>
//           </button>
          
//           {/* Page numbers */}
//           <div className="hidden md:flex">
//             {pageNumbers.map((pageNumber, index) => (
//               <button
//                 key={index}
//                 onClick={() => typeof pageNumber === "number" && onPageChange(pageNumber)}
//                 disabled={pageNumber === "..."}
//                 className={`flex items-center justify-center w-10 h-10 text-sm font-medium transition-all duration-200 border-t border-b border-gray-200 ${
//                   index === 0 ? "border-l" : ""
//                 } ${
//                   index === pageNumbers.length - 1 ? "border-r" : ""
//                 } ${
//                   pageNumber === currentPage
//                     ? "bg-indigo-600 text-white border-indigo-600 z-10 relative shadow-sm"
//                     : pageNumber === "..."
//                     ? "text-gray-400 cursor-default"
//                     : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
//                 }`}
//               >
//                 {pageNumber}
//               </button>
//             ))}
//           </div>
          
//           {/* Simplified mobile page indicator */}
//           <div className="flex md:hidden items-center">
//             <div className="px-4 h-10 flex items-center justify-center bg-gray-50 border-t border-b border-gray-200">
//               <span className="text-sm font-semibold text-gray-700">{currentPage} / {totalPages}</span>
//             </div>
//           </div>
          
//           {/* Next page button */}
//           <button
//             onClick={() => onPageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className={`flex items-center justify-center h-10 px-3 rounded-r-lg transition-all duration-200 ${
//               currentPage === totalPages
//                 ? "text-gray-300 cursor-not-allowed bg-gray-50"
//                 : "text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 border border-gray-200"
//             }`}
//             aria-label="Next page"
//           >
//             <span className="hidden sm:inline text-sm font-medium">Next</span>
//             <ChevronRight size={20} className="ml-1" />
//           </button>
//         </div>
//       </div>
      
//       {/* Quick jump to pages (desktop only) */}
//       <div className="hidden lg:flex justify-center mt-4">
//         <div className="flex items-center gap-2 text-sm text-gray-500">
//           <span>Jump to:</span>
//           <div className="flex gap-2">
//             {[1, Math.floor(totalPages / 4), Math.floor(totalPages / 2), Math.floor(3 * totalPages / 4), totalPages]
//               .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
//               .sort((a, b) => a - b) // Ensure correct order
//               .map((page, index) => (
//                 <button
//                   key={index}
//                   onClick={() => onPageChange(page)}
//                   disabled={page === currentPage}
//                   className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
//                     page === currentPage
//                       ? "bg-indigo-100 text-indigo-700 font-semibold"
//                       : "hover:bg-gray-100"
//                   }`}
//                 >
//                   {page}
//                 </button>
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
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
    <div className="mt-10">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        {/* Page information - Left aligned on desktop */}
        <div className="text-sm font-medium text-gray-500 order-2 md:order-1">
          Showing page <span className="text-black font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
        </div>
        
        {/* Pagination controls - Centered, right aligned on desktop */}
        <div className="flex items-center justify-center md:justify-end order-1 md:order-2">
          {/* Previous page button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center h-10 px-3 rounded-l-lg transition-all duration-200 ${
              currentPage === 1
                ? "text-gray-300 cursor-not-allowed bg-gray-50"
                : "text-gray-600 hover:text-black hover:bg-gray-50 border border-gray-200"
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft size={20} className="mr-1" />
            <span className="hidden sm:inline text-sm font-medium">Previous</span>
          </button>
          
          {/* Page numbers */}
          <div className="hidden md:flex">
            {pageNumbers.map((pageNumber, index) => (
              <button
                key={index}
                onClick={() => typeof pageNumber === "number" && onPageChange(pageNumber)}
                disabled={pageNumber === "..."}
                className={`flex items-center justify-center w-10 h-10 text-sm font-medium transition-all duration-200 border-t border-b border-gray-200 ${
                  index === 0 ? "border-l" : ""
                } ${
                  index === pageNumbers.length - 1 ? "border-r" : ""
                } ${
                  pageNumber === currentPage
                    ? "bg-black text-white border-black z-10 relative"
                    : pageNumber === "..."
                    ? "text-gray-400 cursor-default"
                    : "text-gray-700 hover:bg-gray-50 hover:text-black"
                }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
          
          {/* Simplified mobile page indicator */}
          <div className="flex md:hidden items-center">
            <div className="px-4 h-10 flex items-center justify-center bg-gray-50 border-t border-b border-gray-200">
              <span className="text-sm font-semibold text-gray-700">{currentPage} / {totalPages}</span>
            </div>
          </div>
          
          {/* Next page button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center h-10 px-3 rounded-r-lg transition-all duration-200 ${
              currentPage === totalPages
                ? "text-gray-300 cursor-not-allowed bg-gray-50"
                : "text-gray-600 hover:text-black hover:bg-gray-50 border border-gray-200"
            }`}
            aria-label="Next page"
          >
            <span className="hidden sm:inline text-sm font-medium">Next</span>
            <ChevronRight size={20} className="ml-1" />
          </button>
        </div>
      </div>
      
      {/* Quick jump to pages (desktop only) */}
      <div className="hidden lg:flex justify-center mt-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Jump to:</span>
          <div className="flex gap-2">
            {[1, Math.floor(totalPages / 4), Math.floor(totalPages / 2), Math.floor(3 * totalPages / 4), totalPages]
              .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
              .sort((a, b) => a - b) // Ensure correct order
              .map((page, index) => (
                <button
                  key={index}
                  onClick={() => onPageChange(page)}
                  disabled={page === currentPage}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    page === currentPage
                      ? "bg-gray-100 text-black font-semibold"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}