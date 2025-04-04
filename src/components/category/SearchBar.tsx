
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Search, X, History, TrendingUp } from "lucide-react";

// export default function SearchBar({ onSearch, initialValue = "" }) {
//   const [searchInput, setSearchInput] = useState(initialValue);
//   const [recentSearches, setRecentSearches] = useState([]);
//   const [popularSearches, setPopularSearches] = useState([
//     "glass pipes", "lighters", "hookahs", "rolling papers", "grinders"
//   ]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const inputRef = useRef(null);
//   const suggestionsRef = useRef(null);
  
//   // Load recent searches from localStorage on component mount
//   useEffect(() => {
//     const savedSearches = localStorage.getItem('recentSearches');
//     if (savedSearches) {
//       setRecentSearches(JSON.parse(savedSearches).slice(0, 5));
//     }
//   }, []);
  
//   // Update input when initialValue prop changes
//   useEffect(() => {
//     setSearchInput(initialValue);
//   }, [initialValue]);
  
//   // Close suggestions panel when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
//           inputRef.current && !inputRef.current.contains(event.target)) {
//         setShowSuggestions(false);
//       }
//     };
    
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     const term = searchInput.trim();
//     if (!term) return;
    
//     // Save to recent searches
//     const updatedSearches = [term, ...recentSearches.filter(item => item !== term)].slice(0, 5);
//     setRecentSearches(updatedSearches);
//     localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    
//     setShowSuggestions(false);
//     onSearch(term);
    
//     // Simulate search loading
//     setLoading(true);
//     setTimeout(() => setLoading(false), 500);
//   };
  
//   const handleClear = () => {
//     setSearchInput("");
//     inputRef.current.focus();
//   };
  
//   const handleSuggestionClick = (term) => {
//     setSearchInput(term);
//     onSearch(term);
//     setShowSuggestions(false);
    
//     // Save to recent searches
//     const updatedSearches = [term, ...recentSearches.filter(item => item !== term)].slice(0, 5);
//     setRecentSearches(updatedSearches);
//     localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
//   };
  
//   const removeRecentSearch = (e, term) => {
//     e.stopPropagation();
//     const updatedSearches = recentSearches.filter(item => item !== term);
//     setRecentSearches(updatedSearches);
//     localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
//   };
  
//   return (
//     <div className="relative max-w-3xl mx-auto mb-8">
//       <form onSubmit={handleSubmit}>
//         <div className="relative">
//           <input
//             ref={inputRef}
//             type="text"
//             placeholder="Search for products..."
//             value={searchInput}
//             onChange={(e) => setSearchInput(e.target.value)}
//             onFocus={() => setShowSuggestions(true)}
//             className="w-full p-4 pl-12 pr-16 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-gray-700"
//             disabled={loading}
//           />
          
//           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//             {loading ? (
//               <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//             ) : (
//               <Search className="h-5 w-5 text-gray-400" />
//             )}
//           </div>
          
//           {searchInput && (
//             <button
//               type="button"
//               onClick={handleClear}
//               className="absolute inset-y-0 right-14 flex items-center pr-3 text-gray-400 hover:text-gray-600"
//             >
//               <X className="h-5 w-5" />
//             </button>
//           )}
          
//           <button 
//             type="submit" 
//             className="absolute inset-y-0 right-0 pr-4 flex items-center"
//             disabled={loading}
//           >
//             <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
//               loading 
//                 ? "bg-blue-400 text-white cursor-wait" 
//                 : "bg-blue-600 hover:bg-blue-700 text-white transition-colors"
//             }`}>
//               Search
//             </div>
//           </button>
//         </div>
//       </form>
      
//       {/* Search suggestions dropdown */}
//       {showSuggestions && (searchInput || recentSearches.length > 0 || popularSearches.length > 0) && (
//         <div 
//           ref={suggestionsRef}
//           className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden"
//         >
//           {/* Search input matches */}
//           {searchInput && (
//             <div className="p-2 border-b border-gray-100">
//               <div 
//                 className="p-2 hover:bg-gray-50 rounded cursor-pointer transition flex items-center text-gray-800"
//                 onClick={() => handleSuggestionClick(searchInput)}
//               >
//                 <Search className="h-4 w-4 mr-3 text-gray-400" />
//                 <span>Search for "<strong>{searchInput}</strong>"</span>
//               </div>
//             </div>
//           )}
          
//           {/* Recent searches */}
//           {recentSearches.length > 0 && (
//             <div className="p-2 border-b border-gray-100">
//               <div className="px-2 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Recent Searches
//               </div>
//               {recentSearches.map((term, index) => (
//                 <div 
//                   key={index}
//                   className="p-2 hover:bg-gray-50 rounded cursor-pointer transition flex items-center justify-between group"
//                   onClick={() => handleSuggestionClick(term)}
//                 >
//                   <div className="flex items-center text-gray-700">
//                     <History className="h-4 w-4 mr-3 text-gray-400" />
//                     <span>{term}</span>
//                   </div>
//                   <button 
//                     onClick={(e) => removeRecentSearch(e, term)}
//                     className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
          
//           {/* Popular searches */}
//           {popularSearches.length > 0 && (
//             <div className="p-2">
//               <div className="px-2 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Popular Searches
//               </div>
//               {popularSearches.map((term, index) => (
//                 <div 
//                   key={index}
//                   className="p-2 hover:bg-gray-50 rounded cursor-pointer transition flex items-center"
//                   onClick={() => handleSuggestionClick(term)}
//                 >
//                   <TrendingUp className="h-4 w-4 mr-3 text-gray-400" />
//                   <span className="text-gray-700">{term}</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, History, TrendingUp, Sparkles, Clock, Zap } from "lucide-react";

export default function SearchBar({ onSearch, initialValue = "" }) {
  const [searchInput, setSearchInput] = useState(initialValue);
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches, setPopularSearches] = useState([
    "glass pipes", "lighters", "hookahs", "rolling papers", "grinders"
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  
  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches).slice(0, 5));
    }
  }, []);
  
  // Update input when initialValue prop changes
  useEffect(() => {
    setSearchInput(initialValue);
  }, [initialValue]);
  
  // Close suggestions panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const term = searchInput.trim();
    if (!term) return;
    
    // Save to recent searches
    const updatedSearches = [term, ...recentSearches.filter(item => item !== term)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    
    setShowSuggestions(false);
    onSearch(term);
    
    // Simulate search loading
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };
  
  const handleClear = () => {
    setSearchInput("");
    inputRef.current.focus();
  };
  
  const handleSuggestionClick = (term) => {
    setSearchInput(term);
    onSearch(term);
    setShowSuggestions(false);
    
    // Save to recent searches
    const updatedSearches = [term, ...recentSearches.filter(item => item !== term)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };
  
  const removeRecentSearch = (e, term) => {
    e.stopPropagation();
    const updatedSearches = recentSearches.filter(item => item !== term);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };
  
  return (
    <div className="relative max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="animate-fadeIn">
        <div className="relative">
          <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
            <Search className="h-5 w-5 text-indigo-500" />
          </div>
          
          {loading && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <div className="animate-spin h-5 w-5">
                <svg className="h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          )}
          
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className={`w-full p-4 pl-12 pr-20 bg-white border ${showSuggestions ? 'border-indigo-400' : 'border-gray-300'} rounded-xl 
                      focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm text-gray-700
                      ${loading ? 'bg-indigo-50' : 'bg-white'}`}
            disabled={loading}
          />
          
          {searchInput && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-16 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          
          <button 
            type="submit" 
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
            disabled={loading}
          >
            <div className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              loading 
                ? "bg-indigo-400 text-white cursor-wait" 
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow"
            }`}>
              Search
            </div>
          </button>
        </div>
      </form>
      
      {/* Search suggestions dropdown */}
      {showSuggestions && (searchInput || recentSearches.length > 0 || popularSearches.length > 0) && (
        <div 
          ref={suggestionsRef}
          className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden animate-slideDown"
        >
          {/* Search input matches */}
          {searchInput && (
            <div className="p-2 border-b border-gray-100">
              <div 
                className="p-3 hover:bg-indigo-50 rounded-lg cursor-pointer transition-colors flex items-center text-gray-800 group"
                onClick={() => handleSuggestionClick(searchInput)}
              >
                <Zap className="h-4 w-4 mr-3 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
                <span>Search for "<strong className="text-indigo-600">{searchInput}</strong>"</span>
              </div>
            </div>
          )}
          
          {/* Recent searches */}
          {recentSearches.length > 0 && (
            <div className="p-2 border-b border-gray-100">
              <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
                <Clock className="h-3 w-3 mr-1 text-gray-400" />
                Recent Searches
              </div>
              {recentSearches.map((term, index) => (
                <div 
                  key={index}
                  className="p-2 hover:bg-indigo-50 rounded-lg cursor-pointer transition-colors flex items-center justify-between group"
                  onClick={() => handleSuggestionClick(term)}
                >
                  <div className="flex items-center text-gray-700">
                    <History className="h-4 w-4 mr-3 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                    <span className="group-hover:text-indigo-700 transition-colors">{term}</span>
                  </div>
                  <button 
                    onClick={(e) => removeRecentSearch(e, term)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity p-1 hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* Popular searches */}
          {popularSearches.length > 0 && (
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
                <Sparkles className="h-3 w-3 mr-1 text-amber-400" />
                Popular Searches
              </div>
              {popularSearches.map((term, index) => (
                <div 
                  key={index}
                  className="p-2 hover:bg-indigo-50 rounded-lg cursor-pointer transition-colors flex items-center group"
                  onClick={() => handleSuggestionClick(term)}
                >
                  <TrendingUp className="h-4 w-4 mr-3 text-amber-500 group-hover:text-amber-600 transition-colors" />
                  <span className="text-gray-700 group-hover:text-indigo-700 transition-colors">{term}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Add some CSS for animations */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}