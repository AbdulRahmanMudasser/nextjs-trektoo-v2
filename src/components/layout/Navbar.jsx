'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Logo from '../ui/Logo';
import DropdownMenu from '../feature/DropdownMenu';
import SearchInput from '../ui/SearchInput';

// Dropdown items configuration
const dropdownItems = {
  home: [
    { href: '/home-1', label: 'Home Layout 1' },
    { href: '/home-2', label: 'Home Layout 2' },
  ],
  tours: [
    { href: '/tourslist', label: 'Tours List' },
    { href: '/tours/grid', label: 'Tours Grid' },
  ],
  destinations: [
    { href: '/destinations/europe', label: 'Europe' },
    { href: '/destinations/asia', label: 'Asia' },
  ],
  pages: [
    { href: '/about', label: 'About Us' },
    { href: '/faq', label: 'FAQ' },
  ],
  news: [
    { href: '/news/latest', label: 'Latest News' },
    { href: '/news/archive', label: 'News Archive' },
  ],
};

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-20 w-full transition-all duration-300 ${
        isScrolled ? 'bg-gray-900 shadow-md' : 'bg-transparent backdrop-blur-sm'
      }`}
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
        <div className="flex h-14 items-center justify-between md:h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 scale-75 md:scale-90 lg:scale-100">
            <Logo />
          </div>
          {/* Navigation and Profile */}
          <div className="flex items-center gap-1 md:gap-3">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              <DropdownMenu title="Home" items={dropdownItems.home} />
              <DropdownMenu title="Tours page" items={dropdownItems.tours} />
              <DropdownMenu
                title="Destination"
                items={dropdownItems.destinations}
              />
              <DropdownMenu title="Pages" items={dropdownItems.pages} />
              <DropdownMenu title="News" items={dropdownItems.news} />
              <a
                href="/contact"
                className="text-blue-300 hover:text-gray-900 transition-colors font-medium text-xs md:text-sm uppercase tracking-wide py-1.5 px-2"
              >
                Contact
              </a>
            </div>

            {/* Search Input */}
            <div className="hidden sm:block">
              <SearchInput />
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-1.5 rounded-full text-blue-300 hover:bg-gray-900 transition-colors"
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
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-1.5 text-blue-300 hover:text-gray-900 transition-colors"
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
          <div className="lg:hidden bg-gray-900 rounded-lg shadow-lg fixed top-14 left-0 right-0 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
            <div className="px-3 py-4 space-y-3">
              <div className="sm:hidden mb-3">
                <SearchInput />
              </div>
              <DropdownMenu title="Home" items={dropdownItems.home} />
              <DropdownMenu title="Tours page" items={dropdownItems.tours} />
              <DropdownMenu
                title="Destination"
                items={dropdownItems.destinations}
              />
              <DropdownMenu title="Pages" items={dropdownItems.pages} />
              <DropdownMenu title="News" items={dropdownItems.news} />
              <a
                href="/contact"
                className="block text-blue-300 hover:text-gray-900 font-medium text-xs md:text-sm uppercase tracking-wide py-1.5"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  // No props currently, but PropTypes included for future extensibility
};

export default Navbar;
