'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { login as loginApi, register as registerApi, logout as logoutApi } from '@/lib/api/authApi';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const queryClient = useQueryClient();

  // Load user and token from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('authUser');
      if (storedToken && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error loading auth data:', error);
      setAuthError('Failed to load your session. Please log in again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Clear error/success messages
  const clearMessages = () => {
    setAuthError(null);
    setAuthSuccess(null);
  };

  // Login function
  const login = async (credentials) => {
    clearMessages();
    try {
      const data = await loginApi(credentials);
      if (data.status === 1 && data.access_token) {
        localStorage.setItem('authToken', data.access_token);
        localStorage.setItem('authUser', JSON.stringify(data.user));
        setToken(data.access_token);
        setUser(data.user);
        setAuthSuccess('Welcome back! You\'re logged in.');
        router.push('/');
      } else {
        setAuthError('Login failed. Please try again.');
      }
    } catch (error) {
      setAuthError(error.message);
    }
  };

  // Register function
  const register = async (userData) => {
    clearMessages();
    try {
      const data = await registerApi(userData);
      if (data.status === true) {
        setAuthSuccess(data.message || 'Registration successful! Please log in.');
        router.push('/login');
      } else {
        setAuthError('Registration failed. Please try again.');
      }
    } catch (error) {
      setAuthError(error.message);
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
        } else {
          console.log('Skipping logout API call - missing email or token');
        }
      } catch (error) {
        console.error('Logout API error:', error.message);
        // Don't show error to user since they're already logged out
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
    isAuthenticated: !!token,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
