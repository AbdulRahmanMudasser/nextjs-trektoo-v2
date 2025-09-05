'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
} from '@/lib/api/authApi';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const toast = useToast();

  // Load user and token from localStorage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if we're in browser environment
        if (typeof window === 'undefined') {
          setIsLoading(false);
          setIsInitialized(true);
          return;
        }

        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('authUser');

        if (storedToken && storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);

            // Validate token format (basic check)
            if (typeof storedToken === 'string' && storedToken.length > 10) {
              setToken(storedToken);
              setUser(parsedUser);

              // Optionally validate token with server
              try {
                // This could be a token validation call
                // await validateToken(storedToken);
              } catch (validationError) {
                console.warn('Token validation failed:', validationError);
                // Clear invalid token
                localStorage.removeItem('authToken');
                localStorage.removeItem('authUser');
                setToken(null);
                setUser(null);
              }
            } else {
              // Invalid token format
              localStorage.removeItem('authToken');
              localStorage.removeItem('authUser');
            }
          } catch (parseError) {
            console.error('Error parsing stored user data:', parseError);
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        toast.error('Failed to load your session. Please log in again.');
        // Clear potentially corrupted data
        try {
          localStorage.removeItem('authToken');
          localStorage.removeItem('authUser');
        } catch (clearError) {
          console.error('Error clearing corrupted auth data:', clearError);
        }
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  // Clear error/success messages
  const clearMessages = () => {
    setAuthError(null);
    setAuthSuccess(null);
  };

  // Login function
  const login = async (credentials) => {
    clearMessages();
    setIsLoading(true);

    try {
      // Validate credentials
      if (!credentials || !credentials.email || !credentials.password) {
        throw new Error('Email and password are required');
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(credentials.email)) {
        throw new Error('Please enter a valid email address');
      }

      const data = await loginApi(credentials);

      if (data.status === 1 && data.access_token && data.user) {
        // Validate response data
        if (
          typeof data.access_token !== 'string' ||
          data.access_token.length < 10
        ) {
          throw new Error('Invalid authentication token received');
        }

        if (!data.user || typeof data.user !== 'object') {
          throw new Error('Invalid user data received');
        }

        // Store auth data
        try {
          localStorage.setItem('authToken', data.access_token);
          localStorage.setItem('authUser', JSON.stringify(data.user));
          setToken(data.access_token);
          setUser(data.user);
          toast.success("Welcome back! You're logged in.");

          // Clear any cached data that might be user-specific
          queryClient.clear();

          // Redirect to home or intended destination
          const redirectTo = router.query?.redirect || '/';
          router.push(redirectTo);
        } catch (storageError) {
          console.error('Error storing auth data:', storageError);
          throw new Error(
            'Failed to save login information. Please try again.'
          );
        }
      } else {
        throw new Error(
          data.message ||
            'Login failed. Please check your credentials and try again.'
        );
      }
    } catch (error) {
      console.error('Login error:', error);

      // Handle different error types
      let errorMessage =
        'An unexpected error occurred during login. Please try again.';

      if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        errorMessage = errorMessages.join(', ');
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    clearMessages();
    setIsLoading(true);

    try {
      // Validate user data
      if (!userData || !userData.email || !userData.password) {
        throw new Error('Email and password are required');
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Password strength validation
      if (userData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Name validation
      if (userData.first_name && userData.first_name.trim().length < 2) {
        throw new Error('First name must be at least 2 characters long');
      }

      if (userData.last_name && userData.last_name.trim().length < 2) {
        throw new Error('Last name must be at least 2 characters long');
      }

      const data = await registerApi(userData);

      if (data.status === true || data.status === 1) {
        toast.success(
          data.message || 'Registration successful! Please log in.'
        );
        router.push('/login');
      } else {
        throw new Error(
          data.message || 'Registration failed. Please try again.'
        );
      }
    } catch (error) {
      console.error('Registration error:', error);

      // Handle different error types
      let errorMessage =
        'An unexpected error occurred during registration. Please try again.';

      if (error.message && typeof error.message === 'string') {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat();
        errorMessage = errorMessages.join(', ');
      } else {
        // Fallback: try to convert error to string
        errorMessage = error.toString();
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      console.log('Logout initiated', { user: user?.email, hasToken: !!token });
      clearMessages();

      // Store current values for API call
      const currentUser = user;
      const currentToken = token;

      // Immediately clear state and redirect to prevent flash
      setToken(null);
      setUser(null);
      queryClient.clear();

      // Clean up storage immediately to prevent any state issues
      try {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        console.log('Storage cleared successfully');
      } catch (error) {
        console.error('Error clearing storage:', error);
      }

      // Redirect immediately
      try {
        router.push('/');
        console.log('Redirect initiated');
      } catch (error) {
        console.error('Error during redirect:', error);
        // Fallback redirect
        try {
          window.location.href = '/';
        } catch (fallbackError) {
          console.error('Fallback redirect also failed:', fallbackError);
        }
      }

      // Then handle API cleanup in background
      try {
        if (currentUser?.email && currentToken) {
          console.log('Making logout API call');
          await logoutApi(currentUser.email, currentToken);
          console.log('Logout API call successful');
          toast.success('Logged out successfully');
        } else {
          console.log('Skipping logout API call - missing email or token');
          toast.success('Logged out successfully');
        }
      } catch (error) {
        console.error('Logout API error:', error.message);
        // Don't show error to user since they're already logged out
        toast.success('Logged out successfully');
      }
    } catch (error) {
      console.error('Unexpected error during logout:', error);
      // Emergency cleanup
      try {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        setToken(null);
        setUser(null);
        queryClient.clear();
        router.push('/');
      } catch (emergencyError) {
        console.error('Emergency cleanup failed:', emergencyError);
        // Last resort - force page reload
        window.location.href = '/';
      }
    }
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    authError,
    authSuccess,
    clearMessages,
    isAuthenticated: !!token && !!user,
    isLoading,
    isInitialized,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
