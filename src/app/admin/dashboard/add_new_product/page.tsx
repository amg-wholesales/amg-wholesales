
"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const CATEGORIES = [
  "ASHTRAY",
  "CIGAR HOT",
  "CIGAR BY BRAND NEW",
  "CIGAR ACCESSORIES",
  "ADULT NOVELTYHOT",
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
  "GRINDERS",
  "JARS/SEALED BAGS",
  "RAW ACCESSORIES",
  "ROLLING PAPER + FILTERSH",
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

const AddProductForm = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      category: '',
      price: '',
      stockQuantity: 0,
      description: '',
      availability: true,
      images: []
    }
  });

  // Filter categories based on search term
  const filteredCategories = CATEGORIES.filter(category => 
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle image selection
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

  // Remove image
  const removeImage = (index) => {
    const newFiles = [...imageFiles];
    const newUrls = [...imageUrls];
    
    URL.revokeObjectURL(newUrls[index]); // Clean up URL object
    newFiles.splice(index, 1);
    newUrls.splice(index, 1);
    
    setImageFiles(newFiles);
    setImageUrls(newUrls);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // First, upload images to Cloudflare R2 (only if there are images)
      const uploadedImageUrls = [];
      
      if (imageFiles.length > 0) {
        for (let i = 0; i < imageFiles.length; i++) {
          const file = imageFiles[i];
          const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
          
          // Create a form just for this file
          const formData = new FormData();
          formData.append('file', file);
          formData.append('filename', filename);
          
          // Get a presigned URL and upload to Cloudflare R2
          const uploadResponse = await fetch('/api/upload-url', {
            method: 'POST',
            body: formData,
          });
          
          if (!uploadResponse.ok) {
            throw new Error(`Failed to upload image ${i + 1}`);
          }
          
          const { imageUrl } = await uploadResponse.json();
          uploadedImageUrls.push(imageUrl);
        }
      }
      
      // Now create the product with image URLs (or empty array if no images)
      const productData = {
        ...data,
        images: uploadedImageUrls,
        price: parseFloat(data.price),
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
      
      // Reset the form
      alert('Product added successfully!');
      setImageFiles([]);
      setImageUrls([]);
      
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg text-gray-900 max-h-screen overflow-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-8 gap-y-6">
        {/* Product Name */}
        <div className="form-group col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            {...register('name', { required: 'Product name is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1 text-gray-900"
            />
            <select
              {...register('category', { required: 'Category is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
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
        
        {/* Price */}
        <div className="form-group col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2">$</span>
            <input
              type="number"
              step="0.01"
              {...register('price', { 
                required: 'Price is required',
                min: { value: 0.01, message: 'Price must be greater than 0' }
              })}
              className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
          </div>
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
          {errors.stockQuantity && (
            <p className="text-red-500 text-sm mt-1">{errors.stockQuantity.message}</p>
          )}
        </div>
        
        {/* Availability Toggle */}
        <div className="form-group col-span-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register('availability')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Available for purchase</span>
          </label>
        </div>
        
        {/* Description (Optional) */}
        <div className="form-group col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          ></textarea>
        </div>
        
        {/* Images Upload (Now Optional) */}
        <div className="form-group col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Images (Max 5, Optional)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
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
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload images</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="sr-only"
                    disabled={imageFiles.length >= 5}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB each</p>
              <p className="text-xs text-gray-500">
                {imageFiles.length}/5 images uploaded
              </p>
            </div>
          </div>
          
          {/* Image Previews */}
          {imageUrls.length > 0 && (
            <div className="mt-4 grid grid-cols-5 gap-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="h-24 w-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {/* Removed the error message for no images */}
        </div>
        
        {/* Submit Button */}
        <div className="form-group col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;