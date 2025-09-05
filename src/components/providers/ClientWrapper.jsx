'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { ToastProvider } from '@/components/ui/toast';
import { PageLoader } from '@/components/ui/PageLoader';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer/Footer';
import ErrorBoundary from '@/components/security/ErrorBoundary';
import { useState, useEffect } from 'react';

// Create a new QueryClient instance for each session
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes (renamed from cacheTime in v5)
        retry: (failureCount, error) => {
          // Don't retry on 4xx errors
          if (error?.response?.status >= 400 && error?.response?.status < 500) {
            return false;
          }
          return failureCount < 2;
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: true,
      },
      mutations: {
        retry: 1,
        retryDelay: 1000,
      },
    },
  });
}

export default function ClientWrapper({ children }) {
  const [queryClient] = useState(() => createQueryClient());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show a loading state instead of null to prevent blank screen
  if (!isClient) {
    return <PageLoader message="Initializing..." />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <LoadingProvider>
          <ToastProvider>
            <AuthProvider>
              <Topbar cartCount={99} />
              <Navbar />
              <main className="relative overflow-hidden">{children}</main>
              <Footer />
            </AuthProvider>
          </ToastProvider>
        </LoadingProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
