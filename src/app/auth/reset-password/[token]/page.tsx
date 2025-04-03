
"use client";
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2, Eye, EyeOff, Check, X } from 'lucide-react';
import { z } from 'zod';

// Zod schema for password validation
const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(
    /[^A-Za-z0-9]/,
    'Password must contain at least one special character'
  );

interface ValidationState {
  minLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

const ResetPasswordPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split('/');
  const token = parts[parts.length - 1];

  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [validationState, setValidationState] = useState<ValidationState>({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecial: false,
  });

  // Validate password in real-time
  useEffect(() => {
    setValidationState({
      minLength: newPassword.length >= 8,
      hasUpperCase: /[A-Z]/.test(newPassword),
      hasLowerCase: /[a-z]/.test(newPassword),
      hasNumber: /[0-9]/.test(newPassword),
      hasSpecial: /[^A-Za-z0-9]/.test(newPassword),
    });
  }, [newPassword]);

  useEffect(() => {
    if (!token) {
      setErrorMessage("Token is missing.");
      setTokenValid(false);
      return;
    }

    const validateToken = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/verify-pass-reset-token/${token}`);
        const data = await res.json();
        if (res.ok) {
          setTokenValid(true);
        } else {
          setTokenValid(false);
          setErrorMessage(data.message);
        }
      } catch (error) {
        setTokenValid(false);
        setErrorMessage('Something went wrong while validating the token.');
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [token]);

  const validatePassword = () => {
    try {
      passwordSchema.parse(newPassword);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrorMessage(error.errors[0].message);
      }
      return false;
    }
  };

  const handlePasswordReset = async () => {
    setErrorMessage('');
  
    // Validate password
    if (!validatePassword()) {
      return;
    }
  
    // Validate confirmation
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
  
    setLoading(true);
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        // Check the type and redirect accordingly
        if (data.type === 'vendor') {
          window.location.href = '/auth/vendor/login';
        } else if (data.type === 'user') {
          window.location.href = '/auth/user/login';
        } else {
          // Handle unknown types, if necessary
          setErrorMessage('Unexpected user type.');
        }
  
        // Optionally reset states
        setShowSuccessDialog(true);
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage('An error occurred while resetting your password.');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading || tokenValid === null) {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md">
          <div className="p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin text-blue-600">
                <Loader2 className="h-8 w-8" />
              </div>
              <p className="text-gray-500">
                {tokenValid === null ? 'Validating reset token...' : 'Processing your request...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md">
          <div className="p-6">
            {errorMessage && (
              <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${!!errorMessage ? 'block' : 'hidden'}`}>
                <div className="bg-white rounded-lg max-w-md w-full">
                  <div className="p-4">
                    <h3 className="text-lg font-medium">Error</h3>
                    <p className="text-red-500 mt-2">{errorMessage}</p>
                  </div>
                  <div className="p-4 bg-gray-50 flex justify-end rounded-b-lg">
                    <button 
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      onClick={() => {
                        setErrorMessage('');
                        router.push('/sign-in');
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const ValidationItem = ({ satisfied, text }: { satisfied: boolean; text: string }) => (
    <div className="flex items-center space-x-2">
      {satisfied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-gray-300" />
      )}
      <span className={`text-sm ${satisfied ? 'text-green-500' : 'text-gray-500'}`}>
        {text}
      </span>
    </div>
  );

  return (
    <>
      <div className="min-h-[400px] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <h3 className="text-2xl font-semibold text-center">Reset Your Password</h3>
            <p className="text-center text-gray-500 mt-1">
              Please enter your new password below
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Password Requirements:</p>
              <div className="space-y-2 border rounded-lg p-3 bg-gray-50">
                <ValidationItem 
                  satisfied={validationState.minLength} 
                  text="At least 8 characters long"
                />
                <ValidationItem 
                  satisfied={validationState.hasUpperCase} 
                  text="Contains uppercase letter"
                />
                <ValidationItem 
                  satisfied={validationState.hasLowerCase} 
                  text="Contains lowercase letter"
                />
                <ValidationItem 
                  satisfied={validationState.hasNumber} 
                  text="Contains number"
                />
                <ValidationItem 
                  satisfied={validationState.hasSpecial} 
                  text="Contains special character"
                />
              </div>
            </div>
          </div>
          <div className="p-6 border-t">
            <button 
              onClick={handlePasswordReset} 
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !newPassword || !confirmPassword || !Object.values(validationState).every(Boolean)}
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>

      {/* Error Dialog */}
      {errorMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-4">
              <h3 className="text-lg font-medium">Error</h3>
              <p className="text-red-500 mt-2">{errorMessage}</p>
            </div>
            <div className="p-4 bg-gray-50 flex justify-end rounded-b-lg">
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => setErrorMessage('')}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-4">
              <h3 className="text-lg font-medium">Password Reset Successful!</h3>
              <p className="text-gray-600 mt-2">
                Your password has been successfully reset. You can now log in with your new password.
              </p>
            </div>
            <div className="p-4 bg-gray-50 flex justify-end rounded-b-lg">
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => {
                  setShowSuccessDialog(false);
                  router.push('/sign-in');
                }}
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPasswordPage;