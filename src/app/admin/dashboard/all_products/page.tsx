
// "use client"
// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';

// // Hardcoded categories
// const CATEGORIES = [
//   "ASHTRAY",
//   "CIGAR",
//   "CIGAR ACCESSORIES",
//   "ADULT NOVELTY",
//   "BRANDED APPARELS & MERCHANDISE",
//   "DETOX + SYNTHETICSHOT",
//   "GENERAL MERCHANDISE",
//   "INCENSE + SCENTS + SPRAYS",
//   "MEDICINE + ENERGY",
//   "PHONE ACCESSORIES",
//   "PHONE CARDS",
//   "510 THREAD BATTERIES",
//   "DRY + WAX ACCESSORIES",
//   "DRY + WAX VAPORIZERS",
//   "GLASS ACCESSORIES",
//   "GLASS CLEANER + ACCESSORIES",
//   "GLASS PIPES",
//   "HAND PIPES",
//   "HERBAL NON TOBACCO",
//   "HOOKAH ACCESSORIES",
//   "HOOKAH BOWLS",
//   "HOOKAH BURNERS",
//   "HOOKAH COALS",
//   "HOOKAH HOSES",
//   "HOOKAH TIPS",
//   "HOOKAHS",
//   "KRATOM",
//   "7-HYDROXYMITRAGYNINE",
//   "GRINDERS",
//   "JARS/SEALED BAGS",
//   "RAW ACCESSORIES",
//   "ROLLING PAPER + FILTERS",
//   "SCALES",
//   "SMOKE ACCESSORIES",
//   "TRAYS",
//   "BUTANE + LIGHTER FLUID",
//   "BIG TORCHES",
//   "LIGHTERS",
//   "MINI TORCHES",
//   "ZIPPO LIGHTERS",
//   "WHIP CREAM CHARGERS",
//   "WHIP CREAM DISPENSERS"
// ];

// const ProductManagementPage = () => {
//   // State for products and UI
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
  
//   // Modal states
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showFeatureModal, setShowFeatureModal] = useState(false);
//   const [featureType, setFeatureType] = useState('');
//   const [currentProduct, setCurrentProduct] = useState(null);
  
//   // Form states for add/edit modal
//   const [imageFiles, setImageFiles] = useState([]);
//   const [imageUrls, setImageUrls] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [autoCalculateRetail, setAutoCalculateRetail] = useState(true);
  
//   // Initialize form for add/edit product
//   const { register, handleSubmit, reset, setValue, getValues, formState: { errors } } = useForm({
//     defaultValues: {
//       name: '',
//       category: selectedCategory,
//       price: '',
//       retailPrice: '',
//       stockQuantity: 0,
//       description: '',
//       availability: true,
//       images: []
//     }
//   });
  
//   // Fetch products when category changes
//   useEffect(() => {
//     if (!selectedCategory) return;
    
//     const fetchProducts = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(`/api/product/get-products?category=${encodeURIComponent(selectedCategory)}`);
//         if (!response.ok) throw new Error('Failed to fetch products');
//         const data = await response.json();
//         setProducts(data.products);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchProducts();
//     // Clear selected products when changing category
//     setSelectedProducts([]);
//   }, [selectedCategory]);
  
//   // Filter categories based on search term (for add/edit modal)
//   const filteredCategories = CATEGORIES.filter(category => 
//     category.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  
//   // Handle category change
//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category);
//   };
  
//   // Handle product selection
//   const handleProductSelect = (productId) => {
//     setSelectedProducts(prev => {
//       if (prev.includes(productId)) {
//         return prev.filter(id => id !== productId);
//       } else {
//         return [...prev, productId];
//       }
//     });
//   };
  
//   // Select all products
//   const handleSelectAll = () => {
//     if (selectedProducts.length === products.length) {
//       setSelectedProducts([]);
//     } else {
//       setSelectedProducts(products.map(product => product.id));
//     }
//   };
  
//   // Open edit modal
//   const handleEditProduct = (product) => {
//     setCurrentProduct(product);
    
//     // Check if retail price is approximately 15% more than wholesale price
//     const autoCalculated = product.retailPrice && product.price && 
//       Math.abs(product.retailPrice - (product.price * 1.15)) < 0.01;
    
//     setAutoCalculateRetail(autoCalculated);
    
//     // Set form values
//     reset({
//       name: product.name,
//       category: product.category,
//       price: product.price,
//       retailPrice: product.retailPrice || (product.price ? (product.price * 1.15).toFixed(2) : ''),
//       stockQuantity: product.stockQuantity,
//       description: product.description || '',
//       availability: product.availability
//     });
    
//     // Set image URLs if any
//     if (product.images && product.images.length > 0) {
//       setImageUrls(product.images);
//     } else {
//       setImageUrls([]);
//     }
    
//     setShowEditModal(true);
//   };
  
//   // Open add modal
//   const handleAddProduct = () => {
//     // Reset form and states
//     reset({
//       name: '',
//       category: selectedCategory,
//       price: '',
//       retailPrice: '',
//       stockQuantity: 0,
//       description: '',
//       availability: true
//     });
    
//     setImageFiles([]);
//     setImageUrls([]);
//     setCurrentProduct(null);
//     setAutoCalculateRetail(true);
//     setShowAddModal(true);
//   };
  
//   // Handle delete product
//   const handleDeleteProduct = async (productId) => {
//     if (!confirm('Are you sure you want to delete this product?')) return;
    
//     try {
//       const response = await fetch(`/api/product/${productId}/delete`, {
//         method: 'DELETE',
//       });
      
//       if (!response.ok) throw new Error('Failed to delete product');
      
//       // Remove the product from the list
//       setProducts(prev => prev.filter(product => product.id !== productId));
      
//       // Remove from selected products if it's there
//       setSelectedProducts(prev => prev.filter(id => id !== productId));
      
//     } catch (error) {
//       console.error('Error deleting product:', error);
//       alert('Failed to delete product. Please try again.');
//     }
//   };
  
//   // Open feature modal with specific type
//   const openFeatureModal = (type) => {
//     if (selectedProducts.length === 0) {
//       alert('Please select at least one product');
//       return;
//     }
    
//     setFeatureType(type);
//     setShowFeatureModal(true);
//   };
  
//   // Handle feature update
//   const handleFeatureUpdate = async (option) => {
//     try {
//       const response = await fetch('/api/product/site-config', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           featureType,
//           productIds: selectedProducts,
//           action: option // 'add' or 'replace'
//         }),
//       });
      
//       if (!response.ok) throw new Error('Failed to update featured products');
      
//       alert(`Products successfully ${option === 'add' ? 'added to' : 'set as'} ${featureType}`);
//       setShowFeatureModal(false);
      
//       // Clear selected products after feature update
//       setSelectedProducts([]);
      
//     } catch (error) {
//       console.error('Error updating featured products:', error);
//       alert('Failed to update. Please try again.');
//     }
//   };
  
//   // Handle image selection for add/edit modals
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
    
//     if (imageFiles.length + files.length > 5) {
//       alert("You can only upload a maximum of 5 images");
//       return;
//     }
    
//     // Add to files array
//     setImageFiles(prevFiles => [...prevFiles, ...files]);
    
//     // Create and store URLs for preview
//     const newImageUrls = files.map(file => URL.createObjectURL(file));
//     setImageUrls(prevUrls => [...prevUrls, ...newImageUrls]);
//   };
  
//   // Remove image in add/edit modal
//   const removeImage = (index) => {
//     const newFiles = [...imageFiles];
//     const newUrls = [...imageUrls];
    
//     URL.revokeObjectURL(newUrls[index]); // Clean up URL object
//     newFiles.splice(index, 1);
//     newUrls.splice(index, 1);
    
//     setImageFiles(newFiles);
//     setImageUrls(newUrls);
//   };
  
//   // Submit handler for add product
//   const handleAddSubmit = async (data) => {
//     setIsSubmitting(true);
    
//     try {
//       // First, upload images to AWS S3 (only if there are images)
//       const uploadedImageUrls = [];
      
//       if (imageFiles.length > 0) {
//         for (let i = 0; i < imageFiles.length; i++) {
//           const file = imageFiles[i];
//           const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
          
//           // Create a form just for this file
//           const formData = new FormData();
//           formData.append('file', file);
//           formData.append('filename', filename);
          
//           // Get a presigned URL and upload details from our API
//           const uploadResponse = await fetch('/api/upload-url', {
//             method: 'POST',
//             body: formData,
//           });
          
//           if (!uploadResponse.ok) {
//             throw new Error(`Failed to upload image ${i + 1}`);
//           }
          
//           const { presignedUrl, imageUrl, contentType } = await uploadResponse.json();
          
//           // Use the presigned URL to upload directly to S3
//           const s3UploadResponse = await fetch(presignedUrl, {
//             method: 'PUT',
//             headers: {
//               'Content-Type': contentType,
//             },
//             body: file,
//           });
          
//           if (!s3UploadResponse.ok) {
//             throw new Error(`Failed to upload image ${i + 1} to S3`);
//           }
          
//           uploadedImageUrls.push(imageUrl);
//         }
//       }
      
//       // If retail price is not provided but wholesale price is, calculate it
//       if (!data.retailPrice && data.price) {
//         data.retailPrice = (parseFloat(data.price) * 1.15).toFixed(2);
//       }
      
//       // Now create the product with image URLs (or empty array if no images)
//       const productData = {
//         ...data,
//         images: uploadedImageUrls,
//         price: parseFloat(data.price),
//         retailPrice: parseFloat(data.retailPrice || 0),
//         stockQuantity: parseInt(data.stockQuantity),
//       };
      
//       // Call your API to save the product
//       const response = await fetch('/api/product/create-product', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(productData),
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to add product');
//       }
      
//       const result = await response.json();
//       console.log('Product added successfully:', result);
      
//       // Add the new product to the list if it's in the current category
//       if (result.product.category === selectedCategory) {
//         setProducts(prev => [result.product, ...prev]);
//       }
      
//       // Close modal and reset form
//       setShowAddModal(false);
//       reset();
//       setImageFiles([]);
//       setImageUrls([]);
      
//     } catch (error) {
//       console.error('Error adding product:', error);
//       alert('Error adding product: ' + error.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  
//   // Submit handler for edit product
//   const handleEditSubmit = async (data) => {
//     if (!currentProduct) return;
//     setIsSubmitting(true);
    
//     try {
//       // Similar handling for images as in add product
//       const uploadedImageUrls = [];
      
//       if (imageFiles.length > 0) {
//         for (let i = 0; i < imageFiles.length; i++) {
//           const file = imageFiles[i];
//           const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
          
//           const formData = new FormData();
//           formData.append('file', file);
//           formData.append('filename', filename);
          
//           const uploadResponse = await fetch('/api/upload-url', {
//             method: 'POST',
//             body: formData,
//           });
          
//           if (!uploadResponse.ok) {
//             throw new Error(`Failed to upload image ${i + 1}`);
//           }
          
//           const { presignedUrl, imageUrl, contentType } = await uploadResponse.json();
          
//           // Upload directly to S3 using the presigned URL
//           const s3UploadResponse = await fetch(presignedUrl, {
//             method: 'PUT',
//             headers: {
//               'Content-Type': contentType,
//             },
//             body: file,
//           });
          
//           if (!s3UploadResponse.ok) {
//             throw new Error(`Failed to upload image ${i + 1} to S3`);
//           }
          
//           uploadedImageUrls.push(imageUrl);
//         }
//       }
      
//       // If retail price is not provided but wholesale price is, calculate it
//       if (!data.retailPrice && data.price) {
//         data.retailPrice = (parseFloat(data.price) * 1.15).toFixed(2);
//       }
      
//       // Combine existing image URLs with newly uploaded ones
//       const allImageUrls = [...imageUrls.filter(url => !url.startsWith('blob:')), ...uploadedImageUrls];
      
//       const productData = {
//         ...data,
//         images: allImageUrls,
//         price: parseFloat(data.price),
//         retailPrice: parseFloat(data.retailPrice || 0),
//         stockQuantity: parseInt(data.stockQuantity),
//       };
      
//       const response = await fetch(`/api/product/${currentProduct.id}/edit`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(productData),
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to update product');
//       }
      
//       const result = await response.json();
      
//       // Update the product in the list
//       setProducts(prev => prev.map(product => 
//         product.id === currentProduct.id ? result.product : product
//       ));
      
//       // Close modal and reset
//       setShowEditModal(false);
//       setCurrentProduct(null);
//       reset();
//       setImageFiles([]);
//       setImageUrls([]);
      
//     } catch (error) {
//       console.error('Error updating product:', error);
//       alert('Error updating product: ' + error.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  
//   // Get first image from product or placeholder
//   const getProductImage = (product) => {
//     if (product.images && product.images.length > 0) {
//       return product.images[0];
//     }
//     return '/placeholder-product.png'; // Make sure to have a placeholder image
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-black">Product Management</h1>
//         <button
//           onClick={handleAddProduct}
//           className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           Add New Product
//         </button>
//       </div>
      
//       {/* Category Tabs - Now using flex-wrap for multiple rows */}
//       <div className="mb-6">
//         <div className="flex flex-wrap gap-2">
//           {CATEGORIES.map((category) => (
//             <button
//               key={category}
//               onClick={() => handleCategoryChange(category)}
//               className={`px-4 py-2 text-sm rounded-md mb-2 ${
//                 selectedCategory === category
//                   ? 'bg-blue-600 text-white'
//                   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </div>
      
//       {/* Bulk Actions */}
//       {selectedProducts.length > 0 && (
//         <div className="bg-gray-100 p-4 rounded-md mb-6 flex flex-wrap items-center justify-between">
//           <div>
//             <span className="font-medium">{selectedProducts.length} products selected</span>
//           </div>
//           <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
//             <button
//               onClick={() => openFeatureModal('featuredProducts')}
//               className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
//             >
//               Featured
//             </button>
//             <button
//               onClick={() => openFeatureModal('bestSellers')}
//               className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
//             >
//               Best Sellers
//             </button>
//             <button
//               onClick={() => openFeatureModal('newArrivals')}
//               className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
//             >
//               New Arrivals
//             </button>
//             <button
//               onClick={() => openFeatureModal('onSale')}
//               className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
//             >
//               On Sale
//             </button>
//           </div>
//         </div>
//       )}
      
//       {/* Products Table */}
//       <div className="bg-white rounded-lg shadow overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 <input
//                   type="checkbox"
//                   checked={selectedProducts.length === products.length && products.length > 0}
//                   onChange={handleSelectAll}
//                   className="h-4 w-4 text-blue-600 rounded"
//                 />
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Image
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Product
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Wholesale Price
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Retail Price
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Stock
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {isLoading ? (
//               <tr>
//                 <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
//                   Loading products...
//                 </td>
//               </tr>
//             ) : products.length === 0 ? (
//               <tr>
//                 <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
//                   No products found in this category
//                 </td>
//               </tr>
//             ) : (
//               products.map((product) => (
//                 <tr key={product.id}>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <input
//                       type="checkbox"
//                       checked={selectedProducts.includes(product.id)}
//                       onChange={() => handleProductSelect(product.id)}
//                       className="h-4 w-4 text-blue-600 rounded"
//                     />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <img 
//                       src={getProductImage(product)} 
//                       alt={product.name}
//                       className="h-10 w-10 object-cover rounded-md"
//                     />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">
//                       {product.name}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">
//                       ${parseFloat(product.price || 0).toFixed(2)}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">
//                       ${parseFloat(product.retailPrice || product.price * 1.15 || 0).toFixed(2)}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">
//                       {product.stockQuantity}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       product.availability 
//                         ? 'bg-green-100 text-green-800' 
//                         : 'bg-red-100 text-red-800'
//                     }`}>
//                       {product.availability ? 'Active' : 'Inactive'}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex justify-end space-x-2">
//                       <button
//                         onClick={() => handleEditProduct(product)}
//                         className="text-indigo-600 hover:text-indigo-900"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteProduct(product.id)}
//                         className="text-red-600 hover:text-red-900"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
      
//       {/* Add Product Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-5 max-w-4xl w-full max-h-screen overflow-y-auto my-4">
//             <div className="flex justify-between items-center mb-3">
//               <h2 className="text-xl font-bold text-black">Add New Product</h2>
//               <button 
//                 onClick={() => setShowAddModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 ×
//               </button>
//             </div>
            
//             <form onSubmit={handleSubmit(handleAddSubmit)} className="grid grid-cols-2 gap-x-6 gap-y-4">
//               {/* Product Name */}
//               <div className="form-group col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Product Name *
//                 </label>
//                 <input
//                   type="text"
//                   {...register('name', { required: 'Product name is required' })}
//                   className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
//                 />
//                 {errors.name && (
//                   <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
//                 )}
//               </div>
              
//               {/* Category Dropdown with Search */}
//               <div className="form-group col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Category *
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     placeholder="Search categories..."
//                     className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1 text-gray-900"
//                   />
//                   <select
//                     {...register('category', { required: 'Category is required' })}
//                     className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
//                   >
//                     <option value="">Select a category</option>
//                     {filteredCategories.map((category) => (
//                       <option key={category} value={category}>
//                         {category}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 {errors.category && (
//                   <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
//                 )}
//               </div>
              
//               {/* Price Section */}
//               <div className="form-group col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Wholesale Price * <span className="text-xs text-gray-500">(for wholesale buyers)</span>
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1.5">$</span>
//                   <input
//                     type="number"
//                     step="0.01"
//                     {...register('price', { 
//                       required: 'Wholesale price is required',
//                       min: { value: 0.01, message: 'Price must be greater than 0' },
//                       onChange: (e) => {
//                         // If auto-calculating retail price, update it
//                         if (autoCalculateRetail) {
//                           const wholesalePrice = parseFloat(e.target.value) || 0;
//                           setValue('retailPrice', (wholesalePrice * 1.15).toFixed(2));
//                         }
//                       }
//                     })}
//                     className="w-full pl-7 pr-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
//                   />
//                 </div>
//                 {errors.price && (
//                   <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
//                 )}
//               </div>
              
//               {/* Retail Price */}
//               <div className="form-group col-span-1">
//                 <div className="flex justify-between items-center">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Retail Price <span className="text-xs text-gray-500">(for retail buyers)</span>
//                   </label>
//                   <label className="inline-flex items-center text-xs text-gray-600">
//                     <input
//                       type="checkbox"
//                       checked={autoCalculateRetail}
//                       onChange={(e) => {
//                         setAutoCalculateRetail(e.target.checked);
//                         if (e.target.checked) {
//                           // Recalculate retail price based on current wholesale price
//                           const wholesalePrice = parseFloat(getValues('price')) || 0;
//                           setValue('retailPrice', (wholesalePrice * 1.15).toFixed(2));
//                         }
//                       }}
//                       className="mr-1 h-3 w-3"
//                     />
//                     Auto-calculate (15% markup)
//                   </label>
//                 </div>
                
//                 <div className="relative">
//                   <span className="absolute left-3 top-1.5">$</span>
//                   <input
//                     type="number"
//                     step="0.01"
//                     {...register('retailPrice')}
//                     disabled={autoCalculateRetail}
//                     className={`w-full pl-7 pr-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 ${
//                       autoCalculateRetail ? 'bg-gray-100 cursor-not-allowed' : ''
//                     }`}
//                   />
//                 </div>
//               </div>
              
//               {/* Stock Quantity */}
//               <div className="form-group col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Stock Quantity *
//                 </label>
//                 <input
//                   type="number"
//                   {...register('stockQuantity', { 
//                     required: 'Stock quantity is required',
//                     min: { value: 0, message: 'Stock quantity cannot be negative' }
//                   })}
//                   className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
//                 />
//                 {errors.stockQuantity && (
//                   <p className="text-red-500 text-sm mt-1">{errors.stockQuantity.message}</p>
//                 )}
//               </div>
              
//               {/* Availability Toggle */}
//               <div className="form-group col-span-1">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     {...register('availability')}
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <span className="ml-2 text-sm text-gray-700">Available for purchase</span>
//                 </label>
//               </div>
              
//               {/* Description (Optional) */}
//               <div className="form-group col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description (Optional)
//                 </label>
//                 <textarea
//                   {...register('description')}
//                   rows={3}
//                   className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
//                 ></textarea>
//               </div>
              
//               {/* Images Upload (Optional) */}
//               <div className="form-group col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Images (Max 5, Optional)
//                 </label>
//                 <div className="mt-1 flex justify-center px-6 pt-3 pb-3 border-2 border-gray-300 border-dashed rounded-md">
//                   <div className="space-y-1 text-center">
//                     <svg
//                       className="mx-auto h-8 w-8 text-gray-400"
//                       stroke="currentColor"
//                       fill="none"
//                       viewBox="0 0 48 48"
//                       aria-hidden="true"
//                     >
//                       <path
//                         d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                         strokeWidth={2}
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                     <div className="flex text-sm text-gray-600">
//                       <label
//                         htmlFor="file-upload-add"
//                         className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-1 focus-within:ring-blue-500"
//                       >
//                         <span>Upload images</span>
//                         <input
//                           id="file-upload-add"
//                           name="file-upload"
//                           type="file"
//                           accept="image/*"
//                           multiple
//                           onChange={handleImageChange}
//                           className="sr-only"
//                           disabled={imageFiles.length >= 5}
//                         />
//                       </label>
//                       <p className="pl-1">or drag and drop</p>
//                     </div>
//                     <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB each</p>
//                     <p className="text-xs text-gray-500">
//                       {imageFiles.length}/5 images uploaded
//                     </p>
//                   </div>
//                 </div>
                
//                 {/* Image Previews */}
//                 {imageUrls.length > 0 && (
//                   <div className="mt-4 grid grid-cols-5 gap-3">
//                     {imageUrls.map((url, index) => (
//                       <div key={index} className="relative">
//                         <img
//                           src={url}
//                           alt={`Preview ${index + 1}`}
//                           className="h-20 w-20 object-cover rounded-md"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeImage(index)}
//                           className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
//                         >
//                           x
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
              
//               {/* Submit Button */}
//               <div className="form-group col-span-2 mt-2">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className={`w-full py-1.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-500 ${
//                     isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                 >
//                   {isSubmitting ? 'Adding Product...' : 'Add Product'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
      
//       {/* Edit Product Modal */}
//       {showEditModal && currentProduct && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-5 max-w-4xl w-full max-h-screen overflow-y-auto my-4">
//             <div className="flex justify-between items-center mb-3">
//               <h2 className="text-xl font-bold text-black">Edit Product</h2>
//               <button 
//                 onClick={() => setShowEditModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 ×
//               </button>
//             </div>
            
//             <form onSubmit={handleSubmit(handleEditSubmit)} className="grid grid-cols-2 gap-x-6 gap-y-4">
//               {/* Product Name */}
//               <div className="form-group col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Product Name *
//                 </label>
//                 <input
//                   type="text"
//                   {...register('name', { required: 'Product name is required' })}
//                   className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
//                 />
//                 {errors.name && (
//                   <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
//                 )}
//               </div>
              
//               {/* Category Dropdown with Search */}
//               <div className="form-group col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Category *
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     placeholder="Search categories..."
//                     className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1 text-gray-900"
//                   />
//                   <select
//                     {...register('category', { required: 'Category is required' })}
//                     className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
//                   >
//                     <option value="">Select a category</option>
//                     {filteredCategories.map((category) => (
//                       <option key={category} value={category}>
//                         {category}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 {errors.category && (
//                   <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
//                 )}
//               </div>
              
//               {/* Price Section */}
//               <div className="form-group col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Wholesale Price * <span className="text-xs text-gray-500">(for wholesale buyers)</span>
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1.5">$</span>
//                   <input
//                     type="number"
//                     step="0.01"
//                     {...register('price', { 
//                       required: 'Wholesale price is required',
//                       min: { value: 0.01, message: 'Price must be greater than 0' },
//                       onChange: (e) => {
//                         // If auto-calculating retail price, update it
//                         if (autoCalculateRetail) {
//                           const wholesalePrice = parseFloat(e.target.value) || 0;
//                           setValue('retailPrice', (wholesalePrice * 1.15).toFixed(2));
//                         }
//                       }
//                     })}
//                     className="w-full pl-7 pr-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
//                   />
//                 </div>
//                 {errors.price && (
//                   <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
//                 )}
//               </div>
              
//               {/* Retail Price */}
//               <div className="form-group col-span-1">
//                 <div className="flex justify-between items-center">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Retail Price <span className="text-xs text-gray-500">(for retail buyers)</span>
//                   </label>
//                   <label className="inline-flex items-center text-xs text-gray-600">
//                     <input
//                       type="checkbox"
//                       checked={autoCalculateRetail}
//                       onChange={(e) => {
//                         setAutoCalculateRetail(e.target.checked);
//                         if (e.target.checked) {
//                           // Recalculate retail price based on current wholesale price
//                           const wholesalePrice = parseFloat(getValues('price')) || 0;
//                           setValue('retailPrice', (wholesalePrice * 1.15).toFixed(2));
//                         }
//                       }}
//                       className="mr-1 h-3 w-3"
//                     />
//                     Auto-calculate (15% markup)
//                   </label>
//                 </div>
                
//                 <div className="relative">
//                   <span className="absolute left-3 top-1.5">$</span>
//                   <input
//                     type="number"
//                     step="0.01"
//                     {...register('retailPrice')}
//                     disabled={autoCalculateRetail}
//                     className={`w-full pl-7 pr-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 ${
//                       autoCalculateRetail ? 'bg-gray-100 cursor-not-allowed' : ''
//                     }`}
//                   />
//                 </div>
//               </div>
              
//               {/* Stock Quantity */}
//               <div className="form-group col-span-1">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Stock Quantity *
//                 </label>
//                 <input
//                   type="number"
//                   {...register('stockQuantity', { 
//                     required: 'Stock quantity is required',
//                     min: { value: 0, message: 'Stock quantity cannot be negative' }
//                   })}
//                   className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
//                 />
//                 {errors.stockQuantity && (
//                   <p className="text-red-500 text-sm mt-1">{errors.stockQuantity.message}</p>
//                 )}
//               </div>
              
//               {/* Availability Toggle */}
//               <div className="form-group col-span-1">
//                 <label className="flex items-center">
//                   <input
//                     type="checkbox"
//                     {...register('availability')}
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                   <span className="ml-2 text-sm text-gray-700">Available for purchase</span>
//                 </label>
//               </div>
              
//               {/* Description (Optional) */}
//               <div className="form-group col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description (Optional)
//                 </label>
//                 <textarea
//                   {...register('description')}
//                   rows={3}
//                   className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
//                 ></textarea>
//               </div>
              
//               {/* Images Upload (Optional) */}
//               <div className="form-group col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Images (Max 5, Optional)
//                 </label>
//                 <div className="mt-1 flex justify-center px-6 pt-3 pb-3 border-2 border-gray-300 border-dashed rounded-md">
//                   <div className="space-y-1 text-center">
//                     <svg
//                       className="mx-auto h-8 w-8 text-gray-400"
//                       stroke="currentColor"
//                       fill="none"
//                       viewBox="0 0 48 48"
//                       aria-hidden="true"
//                     >
//                       <path
//                         d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                         strokeWidth={2}
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                     <div className="flex text-sm text-gray-600">
//                       <label
//                         htmlFor="file-upload-edit"
//                         className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-1 focus-within:ring-blue-500"
//                       >
//                         <span>Upload images</span>
//                         <input
//                           id="file-upload-edit"
//                           name="file-upload"
//                           type="file"
//                           accept="image/*"
//                           multiple
//                           onChange={handleImageChange}
//                           className="sr-only"
//                           disabled={imageFiles.length >= 5}
//                         />
//                       </label>
//                       <p className="pl-1">or drag and drop</p>
//                     </div>
//                     <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB each</p>
//                     <p className="text-xs text-gray-500">
//                       {imageUrls.length}/5 images uploaded
//                     </p>
//                   </div>
//                 </div>
                
//                 {/* Image Previews */}
//                 {imageUrls.length > 0 && (
//                   <div className="mt-4 grid grid-cols-5 gap-3">
//                     {imageUrls.map((url, index) => (
//                       <div key={index} className="relative">
//                         <img
//                           src={url}
//                           alt={`Preview ${index + 1}`}
//                           className="h-20 w-20 object-cover rounded-md"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeImage(index)}
//                           className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
//                         >
//                           ×
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
              
//               {/* Submit Button */}
//               <div className="form-group col-span-2 mt-2">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className={`w-full py-1.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-500 ${
//                     isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                 >
//                   {isSubmitting ? 'Updating Product...' : 'Update Product'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
      
//       {/* Feature Modal */}
//       {showFeatureModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full">
//             <h2 className="text-xl font-bold mb-4">Update {featureType.replace(/([A-Z])/g, ' $1').trim()}</h2>
//             <p className="mb-4">
//               You have selected {selectedProducts.length} product(s). What would you like to do?
//             </p>
//             <div className="flex justify-end space-x-3 mt-6">
//               <button
//                 onClick={() => setShowFeatureModal(false)}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleFeatureUpdate('add')}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//               >
//                 Add to Existing
//               </button>
//               <button
//                 onClick={() => handleFeatureUpdate('replace')}
//                 className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
//               >
//                 Replace All
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductManagementPage;
"use client"
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Hardcoded categories
const CATEGORIES = [
  "ASHTRAY",
  "CIGAR",
  "CIGAR ACCESSORIES",
  "ADULT NOVELTY",
  "BRANDED APPARELS & MERCHANDISE",
  "DETOX + SYNTHETICSHOT",
  "GENERAL MERCHANDISE",
  "INCENSE + SCENTS + SPRAYS",
  "MEDICINE + ENERGY",
  "PHONE ACCESSORIES",
  "PHONE CARDS",
  "510 THREAD BATTERIES",
  "DRY + WAX ACCESSORIES",
  "DRY + WAX VAPORIZERS",
  "GLASS ACCESSORIES",
  "GLASS CLEANER + ACCESSORIES",
  "GLASS PIPES",
  "HAND PIPES",
  "HERBAL NON TOBACCO",
  "HOOKAH ACCESSORIES",
  "HOOKAH BOWLS",
  "HOOKAH BURNERS",
  "HOOKAH COALS",
  "HOOKAH HOSES",
  "HOOKAH TIPS",
  "HOOKAHS",
  "KRATOM",
  "7-HYDROXYMITRAGYNINE",
  "GRINDERS",
  "JARS/SEALED BAGS",
  "RAW ACCESSORIES",
  "ROLLING PAPER + FILTERS",
  "SCALES",
  "SMOKE ACCESSORIES",
  "TRAYS",
  "BUTANE + LIGHTER FLUID",
  "BIG TORCHES",
  "LIGHTERS",
  "MINI TORCHES",
  "ZIPPO LIGHTERS",
  "WHIP CREAM CHARGERS",
  "WHIP CREAM DISPENSERS"
];

const ProductManagementPage = () => {
  // State for products and UI
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [featureType, setFeatureType] = useState('');
  const [currentProduct, setCurrentProduct] = useState(null);
  
  // Form states for add/edit modal
  const [imageFiles, setImageFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoCalculateRetail, setAutoCalculateRetail] = useState(true);
  
  // State for category dropdown in mobile view
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  
  // Initialize form for add/edit product
  const { register, handleSubmit, reset, setValue, getValues, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      category: selectedCategory,
      price: '',
      retailPrice: '',
      stockQuantity: 0,
      description: '',
      availability: true,
      images: []
    }
  });
  
  // Fetch products when category changes
  useEffect(() => {
    if (!selectedCategory) return;
    
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/product/get-products?category=${encodeURIComponent(selectedCategory)}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
    // Clear selected products when changing category
    setSelectedProducts([]);
  }, [selectedCategory]);
  
  // Filter categories based on search term (for add/edit modal)
  const filteredCategories = CATEGORIES.filter(category => 
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false); // Close dropdown after selection on mobile
  };
  
  // Handle product selection
  const handleProductSelect = (productId) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };
  
  // Select all products
  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(product => product.id));
    }
  };
  
  // Open edit modal
  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    
    // Check if retail price is approximately 15% more than wholesale price
    const autoCalculated = product.retailPrice && product.price && 
      Math.abs(product.retailPrice - (product.price * 1.15)) < 0.01;
    
    setAutoCalculateRetail(autoCalculated);
    
    // Set form values
    reset({
      name: product.name,
      category: product.category,
      price: product.price,
      retailPrice: product.retailPrice || (product.price ? (product.price * 1.15).toFixed(2) : ''),
      stockQuantity: product.stockQuantity,
      description: product.description || '',
      availability: product.availability
    });
    
    // Set image URLs if any
    if (product.images && product.images.length > 0) {
      setImageUrls(product.images);
    } else {
      setImageUrls([]);
    }
    
    setShowEditModal(true);
  };
  
  // Open add modal
  const handleAddProduct = () => {
    // Reset form and states
    reset({
      name: '',
      category: selectedCategory,
      price: '',
      retailPrice: '',
      stockQuantity: 0,
      description: '',
      availability: true
    });
    
    setImageFiles([]);
    setImageUrls([]);
    setCurrentProduct(null);
    setAutoCalculateRetail(true);
    setShowAddModal(true);
  };
  
  // Handle delete product
  const handleDeleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await fetch(`/api/product/${productId}/delete`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete product');
      
      // Remove the product from the list
      setProducts(prev => prev.filter(product => product.id !== productId));
      
      // Remove from selected products if it's there
      setSelectedProducts(prev => prev.filter(id => id !== productId));
      
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };
  
  // Open feature modal with specific type
  const openFeatureModal = (type) => {
    if (selectedProducts.length === 0) {
      alert('Please select at least one product');
      return;
    }
    
    setFeatureType(type);
    setShowFeatureModal(true);
  };
  
  // Handle feature update
  const handleFeatureUpdate = async (option) => {
    try {
      const response = await fetch('/api/product/site-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          featureType,
          productIds: selectedProducts,
          action: option // 'add' or 'replace'
        }),
      });
      
      if (!response.ok) throw new Error('Failed to update featured products');
      
      alert(`Products successfully ${option === 'add' ? 'added to' : 'set as'} ${featureType}`);
      setShowFeatureModal(false);
      
      // Clear selected products after feature update
      setSelectedProducts([]);
      
    } catch (error) {
      console.error('Error updating featured products:', error);
      alert('Failed to update. Please try again.');
    }
  };
  
  // Handle image selection for add/edit modals
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (imageFiles.length + files.length > 5) {
      alert("You can only upload a maximum of 5 images");
      return;
    }
    
    // Add to files array
    setImageFiles(prevFiles => [...prevFiles, ...files]);
    
    // Create and store URLs for preview
    const newImageUrls = files.map(file => URL.createObjectURL(file));
    setImageUrls(prevUrls => [...prevUrls, ...newImageUrls]);
  };
  
  // Remove image in add/edit modal
  const removeImage = (index) => {
    const newFiles = [...imageFiles];
    const newUrls = [...imageUrls];
    
    URL.revokeObjectURL(newUrls[index]); // Clean up URL object
    newFiles.splice(index, 1);
    newUrls.splice(index, 1);
    
    setImageFiles(newFiles);
    setImageUrls(newUrls);
  };
  
  // Submit handler for add product
  const handleAddSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // First, upload images to AWS S3 (only if there are images)
      const uploadedImageUrls = [];
      
      if (imageFiles.length > 0) {
        for (let i = 0; i < imageFiles.length; i++) {
          const file = imageFiles[i];
          const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
          
          // Create a form just for this file
          const formData = new FormData();
          formData.append('file', file);
          formData.append('filename', filename);
          
          // Get a presigned URL and upload details from our API
          const uploadResponse = await fetch('/api/upload-url', {
            method: 'POST',
            body: formData,
          });
          
          if (!uploadResponse.ok) {
            throw new Error(`Failed to upload image ${i + 1}`);
          }
          
          const { presignedUrl, imageUrl, contentType } = await uploadResponse.json();
          
          // Use the presigned URL to upload directly to S3
          const s3UploadResponse = await fetch(presignedUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': contentType,
            },
            body: file,
          });
          
          if (!s3UploadResponse.ok) {
            throw new Error(`Failed to upload image ${i + 1} to S3`);
          }
          
          uploadedImageUrls.push(imageUrl);
        }
      }
      
      // If retail price is not provided but wholesale price is, calculate it
      if (!data.retailPrice && data.price) {
        data.retailPrice = (parseFloat(data.price) * 1.15).toFixed(2);
      }
      
      // Now create the product with image URLs (or empty array if no images)
      const productData = {
        ...data,
        images: uploadedImageUrls,
        price: parseFloat(data.price),
        retailPrice: parseFloat(data.retailPrice || 0),
        stockQuantity: parseInt(data.stockQuantity),
      };
      
      // Call your API to save the product
      const response = await fetch('/api/product/create-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      
      const result = await response.json();
      console.log('Product added successfully:', result);
      
      // Add the new product to the list if it's in the current category
      if (result.product.category === selectedCategory) {
        setProducts(prev => [result.product, ...prev]);
      }
      
      // Close modal and reset form
      setShowAddModal(false);
      reset();
      setImageFiles([]);
      setImageUrls([]);
      
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Submit handler for edit product
  const handleEditSubmit = async (data) => {
    if (!currentProduct) return;
    setIsSubmitting(true);
    
    try {
      // Similar handling for images as in add product
      const uploadedImageUrls = [];
      
      if (imageFiles.length > 0) {
        for (let i = 0; i < imageFiles.length; i++) {
          const file = imageFiles[i];
          const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
          
          const formData = new FormData();
          formData.append('file', file);
          formData.append('filename', filename);
          
          const uploadResponse = await fetch('/api/upload-url', {
            method: 'POST',
            body: formData,
          });
          
          if (!uploadResponse.ok) {
            throw new Error(`Failed to upload image ${i + 1}`);
          }
          
          const { presignedUrl, imageUrl, contentType } = await uploadResponse.json();
          
          // Upload directly to S3 using the presigned URL
          const s3UploadResponse = await fetch(presignedUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': contentType,
            },
            body: file,
          });
          
          if (!s3UploadResponse.ok) {
            throw new Error(`Failed to upload image ${i + 1} to S3`);
          }
          
          uploadedImageUrls.push(imageUrl);
        }
      }
      
      // If retail price is not provided but wholesale price is, calculate it
      if (!data.retailPrice && data.price) {
        data.retailPrice = (parseFloat(data.price) * 1.15).toFixed(2);
      }
      
      // Combine existing image URLs with newly uploaded ones
      const allImageUrls = [...imageUrls.filter(url => !url.startsWith('blob:')), ...uploadedImageUrls];
      
      const productData = {
        ...data,
        images: allImageUrls,
        price: parseFloat(data.price),
        retailPrice: parseFloat(data.retailPrice || 0),
        stockQuantity: parseInt(data.stockQuantity),
      };
      
      const response = await fetch(`/api/product/${currentProduct.id}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      
      const result = await response.json();
      
      // Update the product in the list
      setProducts(prev => prev.map(product => 
        product.id === currentProduct.id ? result.product : product
      ));
      
      // Close modal and reset
      setShowEditModal(false);
      setCurrentProduct(null);
      reset();
      setImageFiles([]);
      setImageUrls([]);
      
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Get first image from product or placeholder
  const getProductImage = (product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    return '/placeholder-product.png'; // Make sure to have a placeholder image
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-black mb-3 sm:mb-0">Product Management</h1>
        <button
          onClick={handleAddProduct}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
        >
          Add New Product
        </button>
      </div>
      
      {/* Mobile Category Dropdown */}
      <div className="mb-4 block sm:hidden">
        <div className="relative">
          <button 
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="w-full bg-gray-100 py-2 px-4 rounded-md text-left flex justify-between items-center"
          >
            <span>{selectedCategory || 'Select Category'}</span>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showCategoryDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    selectedCategory === category ? 'bg-blue-100 font-medium' : ''
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Desktop Category Tabs - Now using flex-wrap for multiple rows */}
      <div className="mb-6 hidden sm:block">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 text-sm rounded-md mb-2 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="bg-gray-100 p-3 sm:p-4 rounded-md mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-3 sm:mb-0">
              <span className="font-medium">{selectedProducts.length} products selected</span>
            </div>
            <div className="grid grid-cols-2 sm:flex gap-2 mt-2 sm:mt-0">
              <button
                onClick={() => openFeatureModal('featuredProducts')}
                className="bg-purple-600 text-white px-3 py-2 sm:py-1 rounded text-sm hover:bg-purple-700"
              >
                Featured
              </button>
              <button
                onClick={() => openFeatureModal('bestSellers')}
                className="bg-yellow-600 text-white px-3 py-2 sm:py-1 rounded text-sm hover:bg-yellow-700"
              >
                Best Sellers
              </button>
              <button
                onClick={() => openFeatureModal('newArrivals')}
                className="bg-green-600 text-white px-3 py-2 sm:py-1 rounded text-sm hover:bg-green-700"
              >
                New Arrivals
              </button>
              <button
                onClick={() => openFeatureModal('onSale')}
                className="bg-red-600 text-white px-3 py-2 sm:py-1 rounded text-sm hover:bg-red-700"
              >
                On Sale
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Desktop Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden hidden sm:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === products.length && products.length > 0}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-blue-600 rounded"
                />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Wholesale Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Retail Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                  Loading products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                  No products found in this category
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleProductSelect(product.id)}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img 
                      src={getProductImage(product)} 
                      alt={product.name}
                      className="h-10 w-10 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${parseFloat(product.price || 0).toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${parseFloat(product.retailPrice || product.price * 1.15 || 0).toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.stockQuantity}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.availability 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.availability ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Mobile Products List */}
      <div className="sm:hidden">
        {isLoading ? (
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white p-4 rounded-lg shadow text-center text-gray-500">
            No products found in this category
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-3 border-b border-gray-200 flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleProductSelect(product.id)}
                    className="h-5 w-5 text-blue-600 rounded mr-3"
                  />
                  <div className="text-sm font-medium text-gray-900 flex-1 truncate">
                    {product.name}
                  </div>
                  <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.availability 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.availability ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div className="p-3 flex">
                  <div className="mr-3">
                    <img 
                      src={getProductImage(product)} 
                      alt={product.name}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-1 text-sm">
                      <div className="text-gray-600">Wholesale:</div>
                      <div className="font-medium">${parseFloat(product.price || 0).toFixed(2)}</div>
                      
                      <div className="text-gray-600">Retail:</div>
                      <div className="font-medium">${parseFloat(product.retailPrice || product.price * 1.15 || 0).toFixed(2)}</div>
                      
                      <div className="text-gray-600">Stock:</div>
                      <div className="font-medium">{product.stockQuantity}</div>
                    </div>
                  </div>
                </div>
                
                <div className="px-3 py-2 bg-gray-50 flex justify-between">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-indigo-600 font-medium text-sm py-1 px-3 rounded-md hover:bg-indigo-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 font-medium text-sm py-1 px-3 rounded-md hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Select All floating button for mobile */}
      {products.length > 0 && (
        <div className="fixed bottom-4 right-4 sm:hidden z-10">
          <button
            onClick={handleSelectAll}
            className={`shadow-lg rounded-full w-12 h-12 flex items-center justify-center ${
              selectedProducts.length === products.length && products.length > 0
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border border-blue-600'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      )}
      
      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowAddModal(false)}></div>
          <div className="bg-white rounded-lg p-4 sm:p-5 w-full max-w-4xl max-h-screen overflow-y-auto my-4 mx-2 sm:mx-4 relative z-10">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg sm:text-xl font-bold text-black">Add New Product</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit(handleAddSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {/* Product Name */}
              <div className="form-group col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Product name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              
              {/* Category Dropdown with Search */}
              <div className="form-group col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search categories..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1 text-gray-900"
                  />
                  <select
                    {...register('category', { required: 'Category is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
                  >
                    <option value="">Select a category</option>
                    {filteredCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>
              
              {/* Price Section */}
              <div className="form-group col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Wholesale Price * <span className="text-xs text-gray-500">(for wholesale buyers)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2">$</span>
                  <input
                    type="number"
                    step="0.01"
                    {...register('price', { 
                      required: 'Wholesale price is required',
                      min: { value: 0.01, message: 'Price must be greater than 0' },
                      onChange: (e) => {
                        // If auto-calculating retail price, update it
                        if (autoCalculateRetail) {
                          const wholesalePrice = parseFloat(e.target.value) || 0;
                          setValue('retailPrice', (wholesalePrice * 1.15).toFixed(2));
                        }
                      }
                    })}
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                )}
              </div>
              
              {/* Retail Price */}
              <div className="form-group col-span-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Retail Price <span className="text-xs text-gray-500">(for retail buyers)</span>
                  </label>
                  <label className="inline-flex items-center text-xs text-gray-600 mb-1 sm:mb-0">
                    <input
                      type="checkbox"
                      checked={autoCalculateRetail}
                      onChange={(e) => {
                        setAutoCalculateRetail(e.target.checked);
                        if (e.target.checked) {
                          // Recalculate retail price based on current wholesale price
                          const wholesalePrice = parseFloat(getValues('price')) || 0;
                          setValue('retailPrice', (wholesalePrice * 1.15).toFixed(2));
                        }
                      }}
                      className="mr-1 h-3 w-3"
                    />
                    Auto-calculate (15% markup)
                  </label>
                </div>
                
                <div className="relative">
                  <span className="absolute left-3 top-2">$</span>
                  <input
                    type="number"
                    step="0.01"
                    {...register('retailPrice')}
                    disabled={autoCalculateRetail}
                    className={`w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 ${
                      autoCalculateRetail ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  />
                </div>
              </div>
              
              {/* Stock Quantity */}
              <div className="form-group col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  {...register('stockQuantity', { 
                    required: 'Stock quantity is required',
                    min: { value: 0, message: 'Stock quantity cannot be negative' }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
                />
                {errors.stockQuantity && (
                  <p className="text-red-500 text-sm mt-1">{errors.stockQuantity.message}</p>
                )}
              </div>
              
              {/* Availability Toggle */}
              <div className="form-group col-span-1">
                <label className="flex items-center h-full pt-6">
                  <input
                    type="checkbox"
                    {...register('availability')}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Available for purchase</span>
                </label>
              </div>
              
              {/* Description (Optional) */}
              <div className="form-group col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
                ></textarea>
              </div>
              
              {/* Images Upload (Optional) */}
              <div className="form-group col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Images (Max 5, Optional)
                </label>
                <div className="mt-1 flex justify-center px-4 sm:px-6 pt-3 pb-3 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-8 w-8 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex flex-col sm:flex-row text-sm text-gray-600 items-center justify-center">
                      <label
                        htmlFor="file-upload-add"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-1 focus-within:ring-blue-500"
                      >
                        <span>Upload images</span>
                        <input
                          id="file-upload-add"
                          name="file-upload"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageChange}
                          className="sr-only"
                          disabled={imageFiles.length >= 5}
                        />
                      </label>
                      <p className="pl-1 mt-1 sm:mt-0">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB each</p>
                    <p className="text-xs text-gray-500">
                      {imageFiles.length}/5 images uploaded
                    </p>
                  </div>
                </div>
                
                {/* Image Previews */}
                {imageUrls.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="h-20 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Submit Button */}
              <div className="form-group col-span-1 sm:col-span-2 mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-500 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Adding Product...' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Edit Product Modal */}
      {showEditModal && currentProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowEditModal(false)}></div>
          <div className="bg-white rounded-lg p-4 sm:p-5 w-full max-w-4xl max-h-screen overflow-y-auto my-4 mx-2 sm:mx-4 relative z-10">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg sm:text-xl font-bold text-black">Edit Product</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit(handleEditSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {/* Product Name */}
              <div className="form-group col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Product name is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              
              {/* Category Dropdown with Search */}
              <div className="form-group col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search categories..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1 text-gray-900"
                  />
                  <select
                    {...register('category', { required: 'Category is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
                  >
                    <option value="">Select a category</option>
                    {filteredCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>
              
              {/* Price Section */}
              <div className="form-group col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Wholesale Price * <span className="text-xs text-gray-500">(for wholesale buyers)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2">$</span>
                  <input
                    type="number"
                    step="0.01"
                    {...register('price', { 
                      required: 'Wholesale price is required',
                      min: { value: 0.01, message: 'Price must be greater than 0' },
                      onChange: (e) => {
                        // If auto-calculating retail price, update it
                        if (autoCalculateRetail) {
                          const wholesalePrice = parseFloat(e.target.value) || 0;
                          setValue('retailPrice', (wholesalePrice * 1.15).toFixed(2));
                        }
                      }
                    })}
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                )}
              </div>
              
              {/* Retail Price */}
              <div className="form-group col-span-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Retail Price <span className="text-xs text-gray-500">(for retail buyers)</span>
                  </label>
                  <label className="inline-flex items-center text-xs text-gray-600 mb-1 sm:mb-0">
                    <input
                      type="checkbox"
                      checked={autoCalculateRetail}
                      onChange={(e) => {
                        setAutoCalculateRetail(e.target.checked);
                        if (e.target.checked) {
                          // Recalculate retail price based on current wholesale price
                          const wholesalePrice = parseFloat(getValues('price')) || 0;
                          setValue('retailPrice', (wholesalePrice * 1.15).toFixed(2));
                        }
                      }}
                      className="mr-1 h-3 w-3"
                    />
                    Auto-calculate (15% markup)
                  </label>
                </div>
                
                <div className="relative">
                  <span className="absolute left-3 top-2">$</span>
                  <input
                    type="number"
                    step="0.01"
                    {...register('retailPrice')}
                    disabled={autoCalculateRetail}
                    className={`w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900 ${
                      autoCalculateRetail ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                  />
                </div>
              </div>
              
              {/* Stock Quantity */}
              <div className="form-group col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  {...register('stockQuantity', { 
                    required: 'Stock quantity is required',
                    min: { value: 0, message: 'Stock quantity cannot be negative' }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
                />
                {errors.stockQuantity && (
                  <p className="text-red-500 text-sm mt-1">{errors.stockQuantity.message}</p>
                )}
              </div>
              
              {/* Availability Toggle */}
              <div className="form-group col-span-1">
                <label className="flex items-center h-full pt-6">
                  <input
                    type="checkbox"
                    {...register('availability')}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Available for purchase</span>
                </label>
              </div>
              
              {/* Description (Optional) */}
              <div className="form-group col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
                ></textarea>
              </div>
              
              {/* Images Upload (Optional) */}
              <div className="form-group col-span-1 sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Images (Max 5, Optional)
                </label>
                <div className="mt-1 flex justify-center px-4 sm:px-6 pt-3 pb-3 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-8 w-8 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex flex-col sm:flex-row text-sm text-gray-600 items-center justify-center">
                      <label
                        htmlFor="file-upload-edit"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-1 focus-within:ring-blue-500"
                      >
                        <span>Upload images</span>
                        <input
                          id="file-upload-edit"
                          name="file-upload"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageChange}
                          className="sr-only"
                          disabled={imageFiles.length >= 5}
                        />
                      </label>
                      <p className="pl-1 mt-1 sm:mt-0">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB each</p>
                    <p className="text-xs text-gray-500">
                      {imageUrls.length}/5 images uploaded
                    </p>
                  </div>
                </div>
                
                {/* Image Previews */}
                {imageUrls.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="h-20 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Submit Button */}
              <div className="form-group col-span-1 sm:col-span-2 mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-500 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Updating Product...' : 'Update Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Feature Modal */}
      {showFeatureModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowFeatureModal(false)}></div>
          <div className="bg-white rounded-lg p-5 max-w-md w-full mx-4 relative z-10">
            <h2 className="text-xl font-bold mb-4">Update {featureType.replace(/([A-Z])/g, ' $1').trim()}</h2>
            <p className="mb-4">
              You have selected {selectedProducts.length} product(s). What would you like to do?
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
              <button
                onClick={() => setShowFeatureModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 order-3 sm:order-1"
              >
                Cancel
              </button>
              <button
                onClick={() => handleFeatureUpdate('add')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 order-2"
              >
                Add to Existing
              </button>
              <button
                onClick={() => handleFeatureUpdate('replace')}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 order-1 sm:order-3"
              >
                Replace All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagementPage;