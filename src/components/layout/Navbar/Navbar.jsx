'use client';

import React, { useState, useEffect } from 'react';
import Logo from '@/components/ui/Custom/Logo';
import DropdownMenu from './DropdownMenu';
import SearchInput from '@/components/ui/Custom/SearchInput';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const dropdownItems = {
  pages: [
    { href: '/about', label: 'About Us' },
    { href: '/faq', label: 'FAQ' },
  ],
  news: [
    { href: '/news/latest', label: 'Latest News' },
    { href: '/news/archive', label: 'News Archive' },
  ],
  exploreTrektoo: {
    'Things to do': [
      { href: '/tours-experiences', label: 'Tours & experiences' },
      { href: '/day-trips', label: 'Day trips' },
      { href: '/massages-spa', label: 'Massages & spa' },
      { href: '/outdoor-activities', label: 'Outdoor activities' },
      { href: '/cultural-experiences', label: 'Cultural experiences' },
      { href: '/water-sports', label: 'Water sports' },
      { href: '/cruises', label: 'Cruises' },
      { href: '/attraction-tickets', label: 'Attraction tickets' },
    ],
    Accommodation: [{ href: '/hotels', label: 'Hotels' }],
    'Transport options': [
      { href: '/airport-transfers', label: 'Airport transfers' },
      { href: '/car-rentals', label: 'Car rentals' },
      { href: '/europe-train-tickets', label: 'Europe train tickets' },
      { href: '/japan-train-tickets', label: 'Japan train tickets' },
      { href: '/japan-train-tickets/shinkansen', label: 'Shinkansen tickets' },
      { href: '/korea-bus', label: 'Korea bus' },
    ],
    'Travel essentials': [
      { href: '/insurance', label: 'Insurance' },
      { href: '/wifi-sim-cards', label: 'WiFi & SIM cards' },
    ],
  },
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [topOffset, setTopOffset] = useState('top-10');
  const {
    user,
    logout,
    isAuthenticated,
    authSuccess,
    authError,
    clearMessages,
  } = useAuth();
  const router = useRouter();

  // Handle scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setTopOffset(window.scrollY > 10 ? 'top-0' : 'top-10');
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clear messages when profile dropdown closes
  useEffect(() => {
    if (!isProfileOpen) clearMessages();
  }, [isProfileOpen, clearMessages]);

  // Listen for route changes to ensure auth state updates
  useEffect(() => {
    const handleStorageChange = () => {
      // Force re-render by triggering a state update
      setIsMobileMenuOpen(false); // Reset mobile menu to ensure UI consistency
      setIsProfileOpen(false); // Reset profile dropdown
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed in Navbar:', error.message);
    } finally {
      setIsProfileOpen(false);
    }
  };

  return (
    <nav
      className={`fixed ${topOffset} z-20 w-full bg-gradient-to-r from-white via-[url('/patterns/wave.svg')] via-30% to-blue-500 bg-blend-multiply bg-opacity-90 transition-all duration-300 font-montserrat shadow-2xl`}
      aria-label="Main navigation"
    >
      {(authSuccess || authError) && (
        <div
          className={`absolute top-full left-0 right-0 z-30 ${authSuccess ? 'bg-green-500' : 'bg-red-500'} text-white text-center py-1`}
        >
          {authSuccess || authError}
        </div>
      )}

      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
        <div className="flex h-12 items-center justify-between md:h-14 lg:h-16">
          {/* Logo */}
          <div className="flex-shrink-0 scale-100 md:scale-110 lg:scale-125">
            <Logo />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1 md:gap-3">
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-2">
              <Link
                href="/"
                className="text-white hover:text-blue-400 transition-colors font-medium text-sm md:text-base uppercase tracking-wide py-2 px-3 focus:outline-none"
              >
                Home
              </Link>
              <DropdownMenu title="Pages" items={dropdownItems.pages} />
              <DropdownMenu title="News" items={dropdownItems.news} />
              <DropdownMenu
                title="Explore Trektoo"
                items={dropdownItems.exploreTrektoo}
              />
              <Link
                href="/contact"
                className="text-white hover:text-blue-400 transition-colors font-medium text-sm md:text-base uppercase tracking-wide py-2 px-3 focus:outline-none"
              >
                Contact
              </Link>
              <span className="h-6 border-l border-gray-300 mx-2"></span>
            </div>

            {/* Search */}
            <div className="hidden sm:block">
              <SearchInput />
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-1.5 rounded-full text-white hover:bg-blue-400 transition-colors flex items-center gap-1"
                aria-label="Profile menu"
              >
                {user?.avatar_url ? (
                  <Image
                    src={user.avatar_url}
                    alt={user.display_name || 'User'}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ) : (
                  <svg
                    className="h-4 w-4 md:h-5 md:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                )}
                {user && (
                  <span className="hidden md:inline text-sm">
                    {user.first_name}
                  </span>
                )}
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-xl py-2 z-10 border border-blue-100">
                  {isAuthenticated ? (
                    <>
                      <div className="px-3 py-2 border-b">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.display_name || 'Welcome'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-3 py-2 text-sm text-gray-900 hover:bg-blue-100 hover:text-gray-900"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-900 hover:bg-blue-100 hover:text-gray-900"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-3 py-2 text-sm text-gray-900 hover:bg-blue-100 hover:text-gray-900"
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-3 py-2 text-sm text-gray-900 hover:bg-blue-100 hover:text-gray-900"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Toggle Button */}
            <button
              className="lg:hidden p-1.5 text-white hover:text-blue-400 transition-colors z-30 relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-4 w-4 md:h-5 md:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-blue-500 rounded-lg shadow-lg fixed top-10 left-0 right-0 max-h-[calc(100vh-3rem)] overflow-y-auto z-20">
            <div className="px-3 py-4 space-y-3">
              <div className="sm:hidden mb-3">
                <SearchInput />
              </div>
              <Link
                href="/"
                className="block text-white hover:text-blue-400 font-medium text-sm uppercase tracking-wide py-1.5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <DropdownMenu
                title="Pages"
                items={dropdownItems.pages}
                onItemClick={() => setIsMobileMenuOpen(false)}
              />
              <DropdownMenu
                title="News"
                items={dropdownItems.news}
                onItemClick={() => setIsMobileMenuOpen(false)}
              />
              <DropdownMenu
                title="Explore Trektoo"
                items={dropdownItems.exploreTrektoo}
                onItemClick={() => setIsMobileMenuOpen(false)}
              />
              <Link
                href="/contact"
                className="block text-white hover:text-blue-400 font-medium text-sm uppercase tracking-wide py-1.5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              <div className="pt-2 border-t border-blue-700">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/profile"
                      className="block text-white hover:text-blue-400 font-medium text-sm uppercase tracking-wide py-1.5"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left text-white hover:text-blue-400 font-medium text-sm uppercase tracking-wide py-1.5"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block text-white hover:text-blue-400 font-medium text-sm uppercase tracking-wide py-1.5"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="block text-white hover:text-blue-400 font-medium text-sm uppercase tracking-wide py-1.5"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
