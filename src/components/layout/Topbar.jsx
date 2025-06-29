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
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa';

function Topbar({ cartCount }) {
  return (
    <header
      className="bg-gray-900 text-white h-10 flex items-center w-full z-40"
      aria-label="Topbar"
    >
      <div className="container mx-auto px-2 sm:px-4 flex flex-wrap justify-between items-center text-[10px] xs:text-xs md:text-sm">
        {/* Left Side: Phone and Email (hidden on small screens) */}
        <div className="hidden sm:flex flex-row gap-3 md:gap-4 flex-wrap md:pt-1">
          <a
            href="tel:01063425677"
            className="flex items-center whitespace-nowrap hover:text-blue-400 transition-colors"
          >
            <FaPhone className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1" />
            0106 342 5677
          </a>
          <a
            href="mailto:info@trektoo.com"
            className="flex items-center whitespace-nowrap hover:text-blue-400 transition-colors"
          >
            <FaEnvelope className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1" />
            info@trektoo.com
          </a>
        </div>

        {/* Right Side: Links, Cart, and Social Icons */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 ml-auto sm:ml-0 flex-wrap">
          <Link
            href="/booking"
            className="text-white hover:text-blue-400 transition-colors whitespace-nowrap"
          >
            Booking Now
          </Link>
          <Link
            href="/about"
            className="text-white hover:text-blue-400 transition-colors whitespace-nowrap"
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
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="hidden sm:flex gap-2 md:gap-3">
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
