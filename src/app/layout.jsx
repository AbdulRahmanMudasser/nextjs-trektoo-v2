import Footer from '@/components/layout/Footer/Footer';
import Navbar from '@/components/layout/Navbar/Navbar';
import Topbar from '@/components/layout/Topbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import ClientWrapper from '@/components/providers/ClientWrapper';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Discover authentic travel experiences with TrekToo. Book hotels, tours, and adventures worldwide with secure payments and expert guidance."
        />
        <meta
          name="keywords"
          content="travel, hotels, tours, adventures, booking, secure payments"
        />
        <meta name="author" content="TrekToo" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://trektoo.com" />
        <meta
          property="og:title"
          content="TrekToo - Authentic Travel Experiences"
        />
        <meta
          property="og:description"
          content="Discover authentic travel experiences with TrekToo. Book hotels, tours, and adventures worldwide."
        />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://trektoo.com" />
        <meta
          property="twitter:title"
          content="TrekToo - Authentic Travel Experiences"
        />
        <meta
          property="twitter:description"
          content="Discover authentic travel experiences with TrekToo. Book hotels, tours, and adventures worldwide."
        />
        <meta property="twitter:image" content="/og-image.jpg" />

        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        <title>TREKTOO - Authentic Travel Experiences</title>
      </head>
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
