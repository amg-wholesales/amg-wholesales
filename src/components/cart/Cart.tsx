// // components/cart/Cart.jsx
// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Minus, Plus, Trash, ShoppingBag } from "lucide-react";
// import { useAuth } from "@/context/authContext";

// export default function Cart({ onClose }) {
//   const router = useRouter();
//   const { isAuthenticated, userId } = useAuth();
  
//   const [cart, setCart] = useState({ items: [], total: 0, itemCount: 0 });
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState({ success: false, message: "" });
  
//   // Fetch cart data when component mounts or auth state changes
//   useEffect(() => {
//     if (isAuthenticated && userId) {
//       fetchCart();
//     } else {
//       setCart({ items: [], total: 0, itemCount: 0 });
//       setLoading(false);
//     }
//   }, [isAuthenticated, userId]);
  
//   const fetchCart = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/cart?userId=${userId}`);
      
//       if (response.ok) {
//         const data = await response.json();
//         setCart(data);
//       } else {
//         console.error("Failed to fetch cart");
//       }
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const updateItemQuantity = async (itemId, newQuantity) => {
//     if (newQuantity < 1) {
//       await removeItem(itemId);
//       return;
//     }
    
//     try {
//       const response = await fetch(`/api/cart/item/${itemId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId, quantity: newQuantity }),
//       });
      
//       if (response.ok) {
//         fetchCart();
//       } else {
//         console.error("Failed to update item quantity");
//       }
//     } catch (error) {
//       console.error("Error updating item quantity:", error);
//     }
//   };
  
//   const removeItem = async (itemId) => {
//     try {
//       const response = await fetch(`/api/cart/item/${itemId}?userId=${userId}`, {
//         method: "DELETE",
//       });
      
//       if (response.ok) {
//         fetchCart();
//       } else {
//         console.error("Failed to remove item from cart");
//       }
//     } catch (error) {
//       console.error("Error removing item from cart:", error);
//     }
//   };
  
//   const clearCart = async () => {
//     try {
//       const response = await fetch(`/api/cart?userId=${userId}`, {
//         method: "DELETE",
//       });
      
//       if (response.ok) {
//         fetchCart();
//       } else {
//         console.error("Failed to clear cart");
//       }
//     } catch (error) {
//       console.error("Error clearing cart:", error);
//     }
//   };
  
//   const handleCheckout = async () => {
//     if (!isAuthenticated) {
//       router.push("/auth/user/login");
//       onClose?.();
//       return;
//     }
    
//     if (cart.items.length === 0) {
//       setSubmitStatus({
//         success: false,
//         message: "Your cart is empty"
//       });
//       return;
//     }
    
//     setIsSubmitting(true);
//     setSubmitStatus({ success: false, message: "" });
    
//     try {
//       // Create a purchase request for each item in the cart
//       const requests = cart.items.map(item => 
//         fetch("/api/purchase-request", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId: userId,
//             productId: item.productId,
//             quantity: item.quantity,
//             notes: `Purchase request from cart for ${item.product.name}`
//           }),
//         })
//       );
      
//       // Wait for all requests to complete
//       const responses = await Promise.all(requests);
      
//       // Check if all requests were successful
//       const allSuccessful = responses.every(response => response.ok);
      
//       if (allSuccessful) {
//         await clearCart();
//         setSubmitStatus({
//           success: true,
//           message: "Purchase requests submitted successfully!"
//         });
//       } else {
//         setSubmitStatus({
//           success: false,
//           message: "Some items could not be processed. Please try again."
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting purchase requests:", error);
//       setSubmitStatus({
//         success: false,
//         message: "An error occurred. Please try again later."
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  
//   if (loading) {
//     return (
//       <div className="flex-1 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="flex flex-col h-full">
//       {/* Cart Items */}
//       <div className="flex-1 overflow-y-auto p-4">
//         {cart.items.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-full text-center">
//             <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-1">Your cart is empty</h3>
//             <p className="text-gray-500 mb-4">Add items to your cart to get started</p>
//             <button
//               onClick={onClose}
//               className="text-blue-600 font-medium hover:text-blue-700"
//             >
//               Continue Shopping
//             </button>
//           </div>
//         ) : (
//           <ul className="divide-y divide-gray-200">
//             {cart.items.map((item) => (
//               <li key={item.id} className="py-6 flex">
//                 {/* Product Image */}
//                 <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
//                   {item.product.image ? (
//                     <Image
//                       src={item.product.image}
//                       alt={item.product.name}
//                       fill
//                       sizes="96px"
//                       className="object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                       <span className="text-gray-400 text-xs">No image</span>
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Product Details */}
//                 <div className="ml-4 flex flex-1 flex-col">
//                   <div>
//                     <div className="flex justify-between text-base font-medium text-gray-900">
//                       <h3>{item.product.name}</h3>
//                       <p className="ml-4">${Number(item.product.price).toFixed(2)}</p>
//                     </div>
//                   </div>
                  
//                   {/* Quantity Controls */}
//                   <div className="flex-1 flex items-end justify-between text-sm">
//                     <div className="flex items-center border rounded">
//                       <button
//                         onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
//                         className="p-1.5 text-gray-600 hover:text-gray-900"
//                       >
//                         <Minus className="h-4 w-4" />
//                       </button>
//                       <span className="px-2 py-1">{item.quantity}</span>
//                       <button
//                         onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
//                         className="p-1.5 text-gray-600 hover:text-gray-900"
//                       >
//                         <Plus className="h-4 w-4" />
//                       </button>
//                     </div>
                    
//                     <div className="flex">
//                       <button
//                         onClick={() => removeItem(item.id)}
//                         className="text-red-600 hover:text-red-800 flex items-center"
//                       >
//                         <Trash className="h-4 w-4 mr-1" />
//                         <span>Remove</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
      
//       {/* Cart Footer */}
//       <div className="border-t border-gray-200 p-4 space-y-4">
//         {/* Subtotal */}
//         <div className="flex justify-between text-base font-medium text-gray-900">
//           <p>Subtotal</p>
//           <p>${cart.total.toFixed(2)}</p>
//         </div>
        
//         {/* Request Status Message */}
//         {submitStatus.message && (
//           <div className={`p-3 rounded ${
//             submitStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//           }`}>
//             {submitStatus.message}
//           </div>
//         )}
        
//         {/* Action Buttons */}
//         <div className="mt-6 space-y-3">
//           <button
//             onClick={handleCheckout}
//             disabled={cart.items.length === 0 || isSubmitting}
//             className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
//               cart.items.length === 0 || isSubmitting
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {isSubmitting ? (
//               <>
//                 <div className="mr-2 h-4 w-4 animate-spin rounded-full border-t-2 border-white"></div>
//                 Processing...
//               </>
//             ) : (
//               "Request Purchase"
//             )}
//           </button>
          
//           <button
//             onClick={onClose}
//             className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
//           >
//             Continue Shopping
//           </button>
          
//           {cart.items.length > 0 && (
//             <button
//               onClick={clearCart}
//               className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center justify-center w-full pt-2"
//             >
//               <Trash className="h-4 w-4 mr-1" />
//               Clear Cart
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// components/cart/Cart.jsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash, ShoppingBag } from "lucide-react";
import { useAuth } from "@/context/authContext";

export default function Cart({ onClose }) {
  const router = useRouter();
  const { isAuthenticated, userId } = useAuth();
  
  const [cart, setCart] = useState({ items: [], total: 0, itemCount: 0 });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: "" });
  
  // Fetch cart data when component mounts or auth state changes
  useEffect(() => {
    if (isAuthenticated && userId) {
      fetchCart();
    } else {
      setCart({ items: [], total: 0, itemCount: 0 });
      setLoading(false);
    }
  }, [isAuthenticated, userId]);
  
  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/cart?userId=${userId}`);
      
      if (response.ok) {
        const data = await response.json();
        setCart(data);
      } else {
        console.error("Failed to fetch cart");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const updateItemQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      await removeItem(itemId);
      return;
    }
    
    try {
      const response = await fetch(`/api/cart/item/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, quantity: newQuantity }),
      });
      
      if (response.ok) {
        fetchCart();
      } else {
        console.error("Failed to update item quantity");
      }
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };
  
  const removeItem = async (itemId) => {
    try {
      const response = await fetch(`/api/cart/item/${itemId}?userId=${userId}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        fetchCart();
      } else {
        console.error("Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  
  const clearCart = async () => {
    try {
      const response = await fetch(`/api/cart?userId=${userId}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        fetchCart();
      } else {
        console.error("Failed to clear cart");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };
  
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      router.push("/auth/user/login");
      onClose?.();
      return;
    }
    
    if (cart.items.length === 0) {
      setSubmitStatus({
        success: false,
        message: "Your cart is empty"
      });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: "" });
    
    try {
      // Create a purchase request for each item in the cart
      const requests = cart.items.map(item => 
        fetch("/api/purchase-request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            productId: item.productId,
            quantity: item.quantity,
            notes: `Purchase request from cart for ${item.product.name}`
          }),
        })
      );
      
      // Wait for all requests to complete
      const responses = await Promise.all(requests);
      
      // Check if all requests were successful
      const allSuccessful = responses.every(response => response.ok);
      
      if (allSuccessful) {
        await clearCart();
        setSubmitStatus({
          success: true,
          message: "Purchase requests submitted successfully!"
        });
      } else {
        setSubmitStatus({
          success: false,
          message: "Some items could not be processed. Please try again."
        });
      }
    } catch (error) {
      console.error("Error submitting purchase requests:", error);
      setSubmitStatus({
        success: false,
        message: "An error occurred. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full bg-white text-gray-900">
      {/* Cart Header */}
      {/* <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Your Cart</h2>
      </div>
       */}
      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Your cart is empty</h3>
            <p className="text-gray-500 mb-4">Add items to your cart to get started</p>
            <button
              onClick={onClose}
              className="text-blue-600 font-medium hover:text-blue-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {cart.items.map((item) => (
              <li key={item.id} className="py-6 flex">
                {/* Product Image */}
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
                  {item.product.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No image</span>
                    </div>
                  )}
                </div>
                
                {/* Product Details */}
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.product.name}</h3>
                      <p className="ml-4">${Number(item.product.price).toFixed(2)}</p>
                    </div>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex-1 flex items-end justify-between text-sm">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-gray-600 hover:text-gray-900"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-2 py-1">{item.quantity}</span>
                      <button
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-gray-600 hover:text-gray-900"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="flex">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 flex items-center"
                      >
                        <Trash className="h-4 w-4 mr-1" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Cart Footer */}
      <div className="border-t border-gray-200 p-4 space-y-4 bg-gray-50">
        {/* Subtotal */}
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${cart.total.toFixed(2)}</p>
        </div>
        
        {/* Request Status Message */}
        {submitStatus.message && (
          <div className={`p-3 rounded ${
            submitStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {submitStatus.message}
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleCheckout}
            disabled={cart.items.length === 0 || isSubmitting}
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
              cart.items.length === 0 || isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-t-2 border-white"></div>
                Processing...
              </>
            ) : (
              "Request Purchase"
            )}
          </button>
          
          <button
            onClick={onClose}
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Continue Shopping
          </button>
          
          {cart.items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center justify-center w-full pt-2"
            >
              <Trash className="h-4 w-4 mr-1" />
              Clear Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}