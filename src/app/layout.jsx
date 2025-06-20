import Footer from '@/components/layout/Footer/Footer';
import './globals.css';
import Topbar from '@/components/layout/Topbar';
import Navbar from '@/components/layout/Navbar/Navbar';

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
        {children}
        <Footer />
      </body>
    </html>
  );
}
