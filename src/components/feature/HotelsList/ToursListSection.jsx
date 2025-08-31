'use client';

import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Listbox, Transition } from '@headlessui/react';
// Fallback SVG icons in case Heroicons has issues
const ChevronDownIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';

const PaginationButton = ({ label, active, onClick, disabled }) => (
  <motion.button
    whileHover={{ scale: disabled ? 1 : 1.05 }}
    whileTap={{ scale: disabled ? 1 : 0.95 }}
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 border-2 ${
      active
        ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-200/50 scale-105'
        : disabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200'
          : 'bg-white text-gray-700 border-blue-100 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 hover:shadow-md hover:scale-105'
    }`}
  >
    {label}
  </motion.button>
);

PaginationButton.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  setItemsPerPage,
}) => {
  // Generate page numbers to show (max 7 buttons)
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      if (totalPages > 1) rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex justify-center items-center mt-8">
      <div className="flex gap-2">
        <PaginationButton
          label="Previous"
          disabled={currentPage <= 1}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        />

        {visiblePages.map((page, index) =>
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2.5 text-gray-500 font-medium">
              ...
            </span>
          ) : (
            <PaginationButton
              key={`page-${page}`}
              label={String(page)}
              active={currentPage === page}
              onClick={() => onPageChange(page)}
            />
          )
        )}

        <PaginationButton
          label="Next"
          disabled={currentPage >= totalPages}
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
        />
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  setItemsPerPage: PropTypes.func.isRequired,
};

const CustomDropdown = ({ value, onChange, options, placeholder, className = "" }) => {
  const selectedOption = options.find(option => option.value === value);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  const updatePosition = (buttonElement) => {
    if (buttonElement) {
      const rect = buttonElement.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  };

  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className="relative">
          <Listbox.Button 
            ref={updatePosition}
            className={`relative w-full cursor-pointer rounded-xl bg-white border-2 border-blue-100 py-3 pl-4 pr-10 text-left shadow-sm hover:border-blue-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${className}`}
          >
            <span className="block truncate text-sm font-medium text-gray-900">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDownIcon
                className="h-5 w-5 text-blue-500 transition-transform duration-200 ui-open:rotate-180"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {open && (
              <div 
                className="fixed inset-0 z-[999999]"
                style={{ pointerEvents: 'none' }}
              >
                <Listbox.Options 
                  className="absolute max-h-60 overflow-auto rounded-xl bg-white py-2 shadow-xl border border-blue-100 ring-1 ring-black ring-opacity-5 focus:outline-none"
                  style={{ 
                    position: 'absolute',
                    top: dropdownPosition.top,
                    left: dropdownPosition.left,
                    width: dropdownPosition.width,
                    pointerEvents: 'auto',
                    zIndex: 999999
                  }}
                >
                  {options.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2.5 pl-4 pr-10 transition-colors duration-150 ${
                          active ? 'bg-blue-50 text-blue-900' : 'text-gray-900'
                        }`
                      }
                      value={option.value}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate text-sm font-medium ${selected ? 'text-blue-600' : ''}`}>
                            {option.label}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-500">
                              <CheckIcon className="h-4 w-4" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            )}
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

CustomDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

const TourListHeader = ({ tourCount, sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'price', label: 'Price (Low to High)' },
    { value: 'rating', label: 'Rating (High to Low)' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-8 mb-8"
    >
      <div className="flex-1">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
          {tourCount} Hotels Found
        </h3>
        <p className="text-gray-600 text-sm sm:text-base">
          Discover amazing places to stay for your next adventure
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-700">Sort by:</span>
          <CustomDropdown
            value={sortBy}
            onChange={onSortChange}
            options={sortOptions}
            placeholder="Select sorting"
            className="min-w-[180px]"
          />
        </div>
      </div>
    </motion.div>
  );
};

TourListHeader.propTypes = {
  tourCount: PropTypes.number.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

const TourCardSkeleton = () => (
  <div className="relative bg-white/95 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row h-64 border border-blue-50">
    {/* Image skeleton with shimmer effect */}
    <div className="w-full md:w-1/2 h-64 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      </div>
    </div>
    
    {/* Content skeleton */}
    <div className="p-6 flex flex-col justify-between w-full md:w-1/2">
      <div className="space-y-3">
        {/* Rating skeleton */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
            ))}
          </div>
          <div className="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
        </div>
        
        {/* Title skeleton */}
        <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
        
        {/* Location skeleton */}
        <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 rounded w-full animate-pulse"></div>
          <div className="h-3 bg-gray-300 rounded w-2/3 animate-pulse"></div>
        </div>
        
        {/* Price skeleton */}
        <div className="h-8 bg-gray-300 rounded w-1/3 animate-pulse"></div>
      </div>
      
      {/* Button skeleton */}
      <div className="h-10 bg-gray-300 rounded-xl w-full animate-pulse"></div>
    </div>
  </div>
);

const ImageWithFallback = ({ src, alt, ...props }) => {
  const [hasError, setHasError] = useState(false);

  // Clean and validate image URL
  const cleanImageUrl = (url) => {
    if (!url || typeof url !== 'string') return null;
    // Remove trailing quotes and whitespace
    let cleanedUrl = url
      .trim()
      .replace(/["']+$/, '')
      .replace(/^["']+/, '');
    // Check for common invalid patterns
    if (
      cleanedUrl === '' ||
      cleanedUrl === 'null' ||
      cleanedUrl === 'undefined'
    )
      return null;
    return cleanedUrl;
  };

  const isValidImageUrl = (url) => {
    if (!url) return false;
    // Check if it's a valid URL format
    try {
      new URL(url);
      return true;
    } catch {
      // If it's not a valid absolute URL, check if it's a valid relative path
      return (
        url.startsWith('/') || url.startsWith('./') || url.startsWith('../')
      );
    }
  };

  const cleanedSrc = cleanImageUrl(src);
  const validSrc = cleanedSrc && isValidImageUrl(cleanedSrc);

  // Enhanced error handling with better logging
  const handleImageError = (e) => {
    console.error('Image load error:', {
      originalSrc: src,
      cleanedSrc,
      error: e.message,
      timestamp: new Date().toISOString(),
    });
    setHasError(true);
  };

  return (
    <div className="relative w-full h-full">
      {hasError || !validSrc ? (
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center">
          <div className="h-12 w-12 text-blue-500 flex items-center justify-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-4.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
          <span className="text-gray-600 text-sm font-medium text-center px-2">
            Image Unavailable
          </span>
        </div>
      ) : (
                 <img
           src={cleanedSrc}
           alt={alt}
           onError={handleImageError}
           onLoad={() => {
             // Reset error state if image loads successfully
             if (hasError) setHasError(false);
           }}
           className="w-full h-full object-cover"
         />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
};

ImageWithFallback.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

const TourListSection = ({
  hotels,
  loading,
  error,
  checkin,
  checkout,
  adults,
  children,
  totalHotels,
  totalPages,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState('name');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Get current page and items per page from URL params
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [itemsPerPage, setItemsPerPage] = useState(
    parseInt(searchParams.get('per_page') || '15', 10)
  );

  const { ref, inView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.1,
    rootMargin: '50px'
  });

  // Performance optimization: Memoize sorted hotels
  const sortedHotels = useMemo(() => {
    if (!hotels.length) return [];
    
    return [...hotels].sort((a, b) => {
      if (sortBy === 'price') {
        return (
          parseFloat(a.sale_price || a.price) -
          parseFloat(b.sale_price || b.price)
        );
      }
      if (sortBy === 'rating') {
        return (
          parseFloat(b.review_score.score_total) -
          parseFloat(a.review_score.score_total)
        );
      }
      return a.title.localeCompare(b.title);
    });
  }, [hotels, sortBy]);

  // Handle initial load state
  useEffect(() => {
    if (!loading && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [loading, isInitialLoad]);

  // Update URL when page or items per page changes
  const updateUrlParams = (newPage, newPerPage) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set('page', String(newPage));
    updatedParams.set('per_page', String(newPerPage));
    router.push(`/hotels-list?${updatedParams.toString()}`);
  };

  const handlePageChange = (newPage) => {
    updateUrlParams(newPage, itemsPerPage);
  };

  const handleItemsPerPageChange = (newPerPage) => {
    setItemsPerPage(newPerPage);
    // Reset to page 1 when changing items per page
    updateUrlParams(1, newPerPage);
  };

  useEffect(() => {
    // Update items per page state if URL param changes
    const urlPerPage = parseInt(searchParams.get('per_page') || '15', 10);
    setItemsPerPage(urlPerPage);
  }, [searchParams]);



  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 },
    },
  };

  if (loading) {
    return (
      <motion.section
        ref={ref}
        className="relative w-full py-12 sm:py-16 bg-blue-50/50 px-0 mb-4 sm:mb-6"
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <div className="w-full">
          <motion.div
            className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl p-6 sm:p-8 border border-blue-50 max-w-7xl mx-auto"
            variants={sectionVariants}
          >
            {/* Loading header skeleton */}
            <div className="mb-8">
              <div className="h-8 bg-gray-300 rounded w-1/3 mb-3 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
            </div>
            
            {/* Loading cards with staggered animation */}
            <div className="space-y-6">
              {[...Array(itemsPerPage)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                >
                  <TourCardSkeleton />
                </motion.div>
              ))}
            </div>
            
            {/* Loading progress indicator */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 text-blue-600">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm font-medium">Loading amazing hotels...</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  if (error) {
    return (
      <motion.section
        ref={ref}
        className="relative w-full py-12 sm:py-16 bg-blue-50/50 px-0 mb-4 sm:mb-6"
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <div className="w-full">
          <motion.div
            className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl p-6 sm:p-8 border border-blue-50 max-w-7xl mx-auto"
            variants={sectionVariants}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              {/* Error Icon */}
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Oops! Something went wrong</h3>
              <p className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
                We couldn't load the hotels right now. This might be a temporary issue.
              </p>
              
              {/* Retry Button */}
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  if (!hotels.length) {
    return (
      <motion.section
        ref={ref}
        className="relative w-full py-12 sm:py-16 bg-blue-50/50 px-0 mb-4 sm:mb-6"
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <div className="w-full">
          <motion.div
            className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl p-6 sm:p-8 border border-blue-50 max-w-7xl mx-auto"
            variants={sectionVariants}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              {/* Empty State Icon */}
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Hotels Found</h3>
              <p className="text-gray-600 text-lg mb-6 max-w-lg mx-auto">
                We couldn't find any hotels matching your search criteria. Try adjusting your dates, location, or guest count.
              </p>
              
              {/* Suggestions */}
              <div className="bg-blue-50 rounded-xl p-4 max-w-md mx-auto mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Try these tips:</h4>
                <ul className="text-sm text-blue-800 space-y-1 text-left">
                  <li>• Check different dates</li>
                  <li>• Try a nearby location</li>
                  <li>• Adjust guest count</li>
                  <li>• Clear some filters</li>
                </ul>
              </div>
              
              {/* Back to Search Button */}
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Search
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      ref={ref}
      className="relative w-full bg-blue-50/50 px-0 mb-4 sm:mb-6"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      aria-labelledby="hotel-list-heading"
    >
      <div className="w-full">
        <motion.div
          className="border-blue-50 max-w-7xl mx-auto"
          variants={sectionVariants}
        >
          <div className="space-y-8">
            <TourListHeader
              tourCount={totalHotels}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
            <div className="grid grid-cols-1 gap-8">
              <AnimatePresence mode="wait">
                {sortedHotels.map((hotel, index) => {
                  const queryParams = new URLSearchParams({
                    ...(checkin && { checkin: format(checkin, 'yyyy-MM-dd') }),
                    ...(checkout && {
                      checkout: format(checkout, 'yyyy-MM-dd'),
                    }),
                    adults: String(adults),
                    children: String(children),
                  }).toString();
                  
                  return (
                    <motion.div
                      key={`${hotel.id}-${sortBy}-${currentPage}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: Math.min(index * 0.08, 0.8),
                        ease: "easeOut"
                      }}
                      className="relative bg-white/95 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row h-auto border border-blue-50 hover:shadow-2xl transition-all duration-300"
                      role="article"
                      aria-label={`Hotel: ${hotel.title}`}
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative w-full md:w-1/2 h-85">
                                                 <ImageWithFallback
                           src={hotel.image}
                           alt={hotel.title}
                           className="object-cover transition-transform duration-700 hover:scale-105"
                         />
                        {hotel.discount_percent && (
                          <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                            {hotel.discount_percent}% Off
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col justify-between w-full md:w-1/2">
                        <div>
                          {/* Rating stars removed */}
                          <h3 className="text-xl font-semibold text-gray-900 truncate mb-2">
                            {hotel.title}
                          </h3>
                          <div className="flex items-center text-gray-600 text-sm font-medium mb-2">
                            <span className="mr-2">📍</span> {hotel.address}
                          </div>
                          <p
                            className="text-sm text-gray-600 leading-relaxed mb-4"
                            dangerouslySetInnerHTML={{
                              __html: hotel.content.substring(0, 100) + '...',
                            }}
                          />
                          <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-2xl font-bold text-gray-900">
                              ${hotel.sale_price || hotel.price}
                            </span>
                            <span className="text-sm text-gray-600 font-medium">
                              /night
                            </span>
                          </div>
                        </div>
                        <Link
                          href={`/hotel/${hotel.id}?${queryParams}`}
                          className="mt-4 inline-block w-full text-center bg-blue-500 text-white font-medium py-2 sm:py-2.5 px-5 sm:px-8 rounded-xl hover:bg-blue-600 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={handleItemsPerPageChange}
              />
            )}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

TourListSection.propTypes = {
  hotels: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  checkin: PropTypes.instanceOf(Date),
  checkout: PropTypes.instanceOf(Date),
  adults: PropTypes.number.isRequired,
  children: PropTypes.number.isRequired,
  totalHotels: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default TourListSection;
