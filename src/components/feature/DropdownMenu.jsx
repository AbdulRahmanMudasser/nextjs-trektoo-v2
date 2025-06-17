'use client';

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

function DropdownMenu({ title, items }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle outside clicks to close the submenu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation for accessibility
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    }
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="flex items-center gap-1 text-blue-300 hover:text-gray-900 transition-colors font-medium text-sm uppercase tracking-wide py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-left lg:text-center lg:w-auto"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Toggle ${title} menu`}
      >
        {title}
        <svg
          className={`w-4 h-4 text-blue-300 transition-transform ${isOpen ? 'rotate-180' : ''} ml-auto lg:ml-1`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`w-full lg:w-56 bg-white rounded-lg shadow-xl py-2 z-10 border border-blue-100 transition-all duration-200 ease-in-out lg:absolute lg:left-0 lg:top-full lg:mt-0 ${
          isOpen ? 'block' : 'hidden'
        }`}
        role="menu"
      >
        {items.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-4 py-2 text-sm text-gray-900 hover:bg-blue-100 hover:text-gray-900 transition-colors"
            role="menuitem"
            tabIndex={0}
            onClick={() => setIsOpen(false)} // Close submenu on item click
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.location.href = item.href;
                setIsOpen(false);
              }
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

DropdownMenu.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DropdownMenu;
