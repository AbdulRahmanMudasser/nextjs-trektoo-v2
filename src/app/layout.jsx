'use client';

import Footer from '@/components/layout/Footer/Footer';
import Navbar from '@/components/layout/Navbar/Navbar';
import Topbar from '@/components/layout/Topbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './globals.css';

// Initialize QueryClient with default options suitable for a large application
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes for large app
      retry: 2, // Retry failed requests twice
      refetchOnWindowFocus: false, // Disable refetch on window focus for performance
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Topbar cartCount={3} />{' '}
        {/* Sample cart count; replace with dynamic state */}
        <Navbar />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <Footer />
      </body>
    </html>
  );
}
