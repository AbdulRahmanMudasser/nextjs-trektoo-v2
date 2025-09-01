'use client';

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function SearchInput() {
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  // Close search input on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={searchRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full text-gray-800 hover:bg-blue-100 transition-colors"
        aria-label="Toggle search"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-10 transition-all duration-300 ease-in-out transform origin-top-right">
          <input
            type="text"
            placeholder="Search destinations..."
            className="w-full px-4 py-2 text-sm text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        </div>
      )}
    </div>
  );
}

SearchInput.propTypes = {
  // No props currently
};

export default SearchInput;
