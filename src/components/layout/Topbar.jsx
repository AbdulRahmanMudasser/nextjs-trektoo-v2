'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {
  FaShoppingCart,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
} from 'react-icons/fa';

function Topbar({ cartCount }) {
  return (
    <header
      className="bg-gray-900 text-white h-10 flex items-center w-full z-40"
      aria-label="Topbar"
    >
      <div className="container mx-auto px-4 flex justify-between items-center text-xs md:text-sm">
        {/* Left Side: Address and Email (hidden on small screens) */}
        <div className="hidden sm:flex flex-row gap-4">
          <span className="flex items-center">
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>
            123 Trektoo St, Adventure City
          </span>
          <span className="flex items-center">
            <svg
              className="w-3 h-3 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            info@trektoo.com
          </span>
        </div>

        {/* Right Side: Links, Cart, and Social Icons */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
          <Link
            href="/booking"
            className="text-white hover:text-blue-400 transition-colors"
          >
            Booking Now
          </Link>
          <Link
            href="/about"
            className="text-white hover:text-blue-400 transition-colors"
          >
            About
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center text-white hover:text-blue-400 transition-colors"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <FaShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <div className="hidden sm:flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors"
              aria-label="Twitter/X"
            >
              <FaTwitter className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors"
              aria-label="Pinterest"
            >
              <FaPinterestP className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

Topbar.propTypes = {
  cartCount: PropTypes.number.isRequired,
};

export default Topbar;
