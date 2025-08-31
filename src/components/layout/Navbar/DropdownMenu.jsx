import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const DropdownMenu = ({ title, items, onItemClick }) => {
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

  // Determine if items is an array (single-column) or object (multi-column)
  const isMultiColumn = !Array.isArray(items);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="flex items-center gap-1 text-gray-800 hover:text-blue-600 transition-colors font-medium text-sm uppercase tracking-wide py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-left lg:text-center lg:w-auto"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Toggle ${title} menu`}
      >
        {title}
        <svg
          className={`w-4 h-4 text-gray-800 transition-transform ${isOpen ? 'rotate-180' : ''} ml-auto lg:ml-1`}
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
        } ${isMultiColumn ? 'lg:w-[700px]' : ''}`}
        role="menu"
      >
        {isMultiColumn ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 px-4 py-2">
            {Object.entries(items).map(([category, subItems]) => (
              <div key={category}>
                <h3 className="px-4 py-2 text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  {category}
                </h3>
                {subItems.map((item) => (
                  <Link
                    key={item.key || item.href}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-900 hover:bg-blue-100 hover:text-gray-900 transition-colors"
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => {
                      setIsOpen(false);
                      if (onItemClick) onItemClick();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        window.location.href = item.href;
                        setIsOpen(false);
                        if (onItemClick) onItemClick();
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        ) : (
          items.map((item) => (
            <Link
              key={item.key || item.href}
              href={item.href}
              className="block px-4 py-2 text-sm text-gray-900 hover:bg-blue-100 hover:text-gray-900 transition-colors"
              role="menuitem"
              tabIndex={0}
              onClick={() => {
                setIsOpen(false);
                if (onItemClick) onItemClick();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.location.href = item.href;
                  setIsOpen(false);
                  if (onItemClick) onItemClick();
                }
              }}
            >
              {item.label}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

DropdownMenu.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        href: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        key: PropTypes.string,
      })
    ),
    PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          href: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
          key: PropTypes.string,
        })
      )
    ),
  ]).isRequired,
  onItemClick: PropTypes.func,
};

export default DropdownMenu;
