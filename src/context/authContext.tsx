// // 'use client'
// // // context/AuthContext.js
// // import { createContext, useContext, useState, useEffect } from 'react';

// // const AuthContext = createContext();

// // export function AuthProvider({ children }) {
// //   const [userId, setUserId] = useState(null);
// //   const [vendorId, setVendorId] = useState(null);
// //   const [userType, setUserType] = useState(null);
// //   const [userEmail, setUserEmail] = useState(null);
// //   const [isLoading, setIsLoading] = useState(true);

// //   // Function to check auth status
// //   const checkAuth = async () => {
// //     try {
// //       const res = await fetch('/api/check-auth', {
// //         method: 'GET',
// //         credentials: 'include',
// //       });

// //       const data = await res.json();

// //       if (data.success && data.user) {
// //         if (data.user.type === 'user') {
// //           setUserId(data.user.id);
// //           setVendorId(null);
// //         } else if (data.user.type === 'vendor') {
// //           setVendorId(data.user.id);
// //           setUserId(null);
// //         }
// //         setUserType(data.user.type);
// //         setUserEmail(data.user.email);
// //       } else {
// //         setUserId(null);
// //         setVendorId(null);
// //         setUserType(null);
// //         setUserEmail(null);
// //       }
// //     } catch (error) {
// //       console.error('Error checking auth status:', error);
// //       setUserId(null);
// //       setVendorId(null);
// //       setUserType(null);
// //       setUserEmail(null);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     checkAuth();
// //   }, []);

// //   const login = async (formData) => {
// //     try {
// //       console.log('Login attempt with:', formData);

// //       const response = await fetch("/api/common-login", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         credentials: 'include',
// //         body: JSON.stringify(formData),
// //       });

// //       const data = await response.json();
// //       console.log('Login API response:', data);

// //       if (data.success) {
// //         if (data.user.type === 'user') {
// //           setUserId(data.user.id);
// //           setVendorId(null);
// //         } else if (data.user.type === 'vendor') {
// //           setVendorId(data.user.id);
// //           setUserId(null);
// //         }
// //         setUserType(data.user.type);
// //         setUserEmail(data.user.email);

// //         return { success: true, type: data.user.type };
// //       }
// //       return { success: false, error: data.error };
// //     } catch (error) {
// //       console.error('Login error:', error);
// //       return { success: false, error: 'An unexpected error occurred' };
// //     }
// //   };

// //   const logout = async () => {
// //     try {
// //       const res = await fetch('/api/logout', {
// //         method: 'POST',
// //         credentials: 'include',
// //       });

// //       const data = await res.json();

// //       if (data.success) {
// //         // Store the userType before clearing it
// //         const currentUserType = userType;

// //         // Clear all user state
// //         setUserId(null);
// //         setVendorId(null);
// //         setUserType(null);
// //         setUserEmail(null);

// //         // Redirect based on stored user type
// //         if (currentUserType === 'vendor') {
// //             window.location.href = '/auth/vendor/login';
// //         } else if (currentUserType === 'user') {
// //             window.location.href = '/auth/user/login';
// //         }
// //       } else {
// //         console.error('Logout failed:', data.error);
// //       }
// //     } catch (error) {
// //       console.error('Error during logout:', error);
// //     }
// //   };

// //   // Create the value object with all context values
// //   const value = {
// //     userId,
// //     vendorId,
// //     userType,
// //     userEmail,
// //     isAuthenticated: !!(userId || vendorId),
// //     isLoading,
// //     login,    // Make sure login is included here
// //     logout
// //   };

// //   return (
// //     <AuthContext.Provider value={value}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // }

// // export function useAuth() {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // }
// 'use client'
// // context/AuthContext.js
// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [userId, setUserId] = useState(null);
//   const [adminId, setAdminId] = useState(null);
//   const [userType, setUserType] = useState(null);
//   const [userEmail, setUserEmail] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Function to check auth status
//   const checkAuth = async () => {
//     try {
//       const res = await fetch('/api/check-auth', {
//         method: 'GET',
//         credentials: 'include',
//       });

//       const data = await res.json();

//       if (data.success && data.user) {
//         if (data.user.type === 'user') {
//           setUserId(data.user.id);
//           setAdminId(null);
//         } else if (data.user.type === 'admin') {
//           setAdminId(data.user.id);
//           setUserId(null);
//         }
//         setUserType(data.user.type);
//         setUserEmail(data.user.email);
//       } else {
//         setUserId(null);
//         setAdminId(null);
//         setUserType(null);
//         setUserEmail(null);
//       }
//     } catch (error) {
//       console.error('Error checking auth status:', error);
//       setUserId(null);
//       setAdminId(null);
//       setUserType(null);
//       setUserEmail(null);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const login = async (formData) => {
//     try {
//       console.log('Login attempt with:', formData);

//       const response = await fetch("/api/common-login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: 'include',
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       console.log('Login API response:', data);

//       if (data.success) {
//         if (data.user.type === 'user') {
//           setUserId(data.user.id);
//           setAdminId(null);
//         } else if (data.user.type === 'admin') {
//           setAdminId(data.user.id);
//           setUserId(null);
//         }
//         setUserType(data.user.type);
//         setUserEmail(data.user.email);

//         return { success: true, type: data.user.type };
//       }
//       return { success: false, error: data.error };
//     } catch (error) {
//       console.error('Login error:', error);
//       return { success: false, error: 'An unexpected error occurred' };
//     }
//   };

//   const logout = async () => {
//     try {
//       const res = await fetch('/api/logout', {
//         method: 'POST',
//         credentials: 'include',
//       });

//       const data = await res.json();

//       if (data.success) {
//         // Store the userType before clearing it
//         const currentUserType = userType;

//         // Clear all user state
//         setUserId(null);
//         setAdminId(null);
//         setUserType(null);
//         setUserEmail(null);

//         // Redirect based on stored user type
//         if (currentUserType === 'admin') {
//             window.location.href = '/auth/admin/login';
//         } else if (currentUserType === 'user') {
//             window.location.href = '/auth/user/login';
//         }
//       } else {
//         console.error('Logout failed:', data.error);
//       }
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };

//   // Create the value object with all context values
//   const value = {
//     userId,
//     adminId,
//     userType,
//     userEmail,
//     isAuthenticated: !!(userId || adminId),
//     isLoading,
//     login,    // Make sure login is included here
//     logout
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }
'use client'
// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to check auth status
  const checkAuth = async () => {
    try {
      const res = await fetch('/api/check-auth', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await res.json();

      if (data.success && data.user) {
        setUserId(data.user.id);
        setUserType(data.user.type);
        setUserEmail(data.user.email);
      } else {
        setUserId(null);
        setUserType(null);
        setUserEmail(null);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setUserId(null);
      setUserType(null);
      setUserEmail(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (formData) => {
    try {
      console.log('Login attempt with:', formData);

      const response = await fetch("/api/auth/common-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Login API response:', data);

      if (data.success) {
        setUserId(data.user.id);
        setUserType(data.user.userType);
        setUserEmail(data.user.email);

        return { success: true, type: data.user.userType };
      }
      return { success: false, error: data.error };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      const data = await res.json();

      if (data.success) {
        // Store the userType before clearing it
        const currentUserType = userType;

        // Clear all user state
        setUserId(null);
        setUserType(null);
        setUserEmail(null);

        // Redirect based on stored user type
        if (currentUserType === 'ADMIN') {
            window.location.href = '/auth/admin/login';
        } else if (currentUserType === 'BUYER') {
            window.location.href = '/auth/user/login';
        }
      } else {
        console.error('Logout failed:', data.error);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Create the value object with all context values
  const value = {
    userId,
    userType,
    userEmail,
    isAuthenticated: !!userId,
    isAdmin: userType === 'ADMIN',
    isBuyer: userType === 'BUYER',
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}