'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Logo from '@/components/ui/Custom/Logo';
import DropdownMenu from './DropdownMenu';
import SearchInput from '@/components/ui/Custom/SearchInput';
import { useAuth } from '@/lib/api/auth';

// Dropdown items configuration
const dropdownItems = {
  pages: [
    { href: '/about', label: 'About Us' },
    { href: '/faq', label: 'FAQ' },
  ],
  news: [
    { href: '/news/latest', label: 'Latest News' },
    { href: '/news/archive', label: 'News Archive' },
  ],
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [topOffset, setTopOffset] = useState('top-10');
  const { user, logout } = useAuth();

  // Handle scroll effect for navbar position
  useEffect(() => {
    const handleScroll = () => {
      setTopOffset(window.scrollY > 10 ? 'top-0' : 'top-10');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed ${topOffset} z-20 w-full bg-gray-900 transition-all duration-300`}
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
        <div className="flex h-12 items-center justify-between md:h-14 lg:h-16">
          {/* Logo */}
          <div className="flex-shrink-0 scale-100 md:scale-110 lg:scale-125">
            <Logo />
          </div>
          {/* Navigation and Profile */}
          <div className="flex items-center gap-1 md:gap-3">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              <a
                href="/"
                className="text-white hover:text-blue-400 transition-colors font-medium text-sm md:text-base uppercase tracking-wide py-2 px-3 focus:outline-none"
              >
                Home
              </a>
              <DropdownMenu title="Pages" items={dropdownItems.pages} />
              <DropdownMenu title="News" items={dropdownItems.news} />
              <a
                href="/contact"
                className="text-white hover:text-blue-400 transition-colors font-medium text-sm md:text-base uppercase tracking-wide py-2 px-3 focus:outline-none"
              >
                Contact
              </a>
              <span className="h-6 border-l border-gray-300 mx-2"></span>
            </div>

            {/* Search Input */}
            <div className="hidden sm:block">
              <SearchInput />
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-1.5 rounded-full text-white hover:bg-blue-400 transition-colors"
                aria-label="Profile menu"
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white shadow-xl py-2 z-10 border border-blue-100">
                  {user ? (
                    <>
                      <a
                        href="/profile"
                        className="block px-3 py-1.5 text-xs md:text-sm text-gray-900 hover:bg-blue-100 hover:text-gray-900"
                      >
                        Profile
                      </a>
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="block w-full text-left px-3 py-1.5 text-xs md:text-sm text-gray-900 hover:bg-blue-100 hover:text-gray-900"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="block px-3 py-1.5 text-xs md:text-sm text-gray-900 hover:bg-blue-100 hover:text-gray-900"
                      >
                        Login
                      </a>
                      <a
                        href="/signup"
                        className="block px-3 py-1.5 text-xs md:text-sm text-gray-900 hover:bg-blue-100 hover:text-gray-900"
                      >
                        Sign Up
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-1.5 text-white hover:text-blue-400 transition-colors"
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
          <div className="lg:hidden bg-gray-900 rounded-lg shadow-lg fixed top-10 left-0 right-0 max-h-[calc(100vh-3rem)] overflow-y-auto">
            <div className="px-3 py-4 space-y-3">
              <div className="sm:hidden mb-3">
                <SearchInput />
              </div>
              <a
                href="/"
                className="block text-white hover:text-blue-400 font-medium text-xs md:text-sm uppercase tracking-wide py-1.5 focus:outline-none"
              >
                Home
              </a>
              <DropdownMenu title="Pages" items={dropdownItems.pages} />
              <DropdownMenu title="News" items={dropdownItems.news} />
              <a
                href="/contact"
                className="block text-white hover:text-blue-400 font-medium text-xs md:text-sm uppercase tracking-wide py-1.5 focus:outline-none"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {};

export default Navbar;