'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [loadingStack, setLoadingStack] = useState([]);

  const startLoading = useCallback((message = 'Loading...', id = null) => {
    const loadingId = id || Date.now().toString();
    setLoadingStack(prev => [...prev, { id: loadingId, message }]);
    setGlobalLoading(true);
    setLoadingMessage(message);
  }, []);

  const stopLoading = useCallback((id = null) => {
    if (id) {
      setLoadingStack(prev => prev.filter(item => item.id !== id));
    } else {
      setLoadingStack(prev => prev.slice(0, -1));
    }
    
    setLoadingStack(prev => {
      if (prev.length === 0) {
        setGlobalLoading(false);
        setLoadingMessage('');
        return [];
      }
      const lastItem = prev[prev.length - 1];
      setLoadingMessage(lastItem.message);
      return prev;
    });
  }, []);

  const clearAllLoading = useCallback(() => {
    setLoadingStack([]);
    setGlobalLoading(false);
    setLoadingMessage('');
  }, []);

  const value = {
    globalLoading,
    loadingMessage,
    loadingStack,
    startLoading,
    stopLoading,
    clearAllLoading,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};
