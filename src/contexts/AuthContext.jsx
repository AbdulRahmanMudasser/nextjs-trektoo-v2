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
    clearMessages();
    try {
      if (!user?.email) {
        throw new Error('No user email found. Please log in again.');
      }
      const data = await logoutApi(user.email, token);
      if (data.status === true) {
        // setAuthSuccess(data.message || 'You have been logged out.');
      }
    } catch (error) {
      console.error('Logout error:', error.message);
      setAuthError(error.message);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      setToken(null);
      setUser(null);
      queryClient.clear();
      router.push('/');
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
