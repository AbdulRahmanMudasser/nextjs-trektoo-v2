'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { Search } from 'lucide-react';
import { format } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import EmptyState from '@/components/ui/EmptyState';

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
    <div className="flex justify-center items-center gap-4 mt-8">
      {/* Page navigation */}
      <div className="flex gap-2">
        <PaginationButton
          label="Previous"
          disabled={currentPage <= 1}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        />

        {visiblePages.map((page, index) =>
          page === '...' ? (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-2.5 text-gray-500 font-medium"
            >
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

      {/* Page info */}
      <div className="text-sm text-gray-600 font-medium">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
};

const TourListHeader = ({ tourCount }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <div className="flex-1">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
          {tourCount} Hotels Found
        </h3>
        <p className="text-gray-600 text-sm sm:text-base">
          Discover amazing places to stay for your next adventure
        </p>
      </div>
    </motion.div>
  );
};

TourListHeader.propTypes = {
  tourCount: PropTypes.number.isRequired,
};

const TourCardSkeleton = () => (
  <div className="relative bg-white/95 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row h-64 border border-blue-50">
    <div className="w-full md:w-1/2 h-32 md:h-full bg-gray-200 animate-pulse"></div>
    <div className="p-6 flex flex-col justify-between w-full md:w-1/2">
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      </div>
      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
);

const ImageWithFallback = ({ src, alt, className }) => {
  const [hasError, setHasError] = React.useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ${className}`}
      >
        <div className="text-gray-400 text-center">
          <div className="w-12 h-12 mx-auto mb-2">
            <svg
              className="w-full h-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <span className="text-sm font-medium">Image Unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

ImageWithFallback.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Update current page when URL changes
  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    setCurrentPage(page);
  }, [searchParams]);

  const handlePageChange = (page) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', String(page));
    router.push(`/hotels-list?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  // Use hotels directly since we removed sorting
  const displayHotels = hotels;

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8"
      >
        {[...Array(5)].map((_, index) => (
          <TourCardSkeleton key={index} />
        ))}
      </motion.div>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={Search}
        title="Error Loading Hotels"
        subtitle={error}
        className="bg-red-50 border border-red-200 rounded-3xl p-8"
      />
    );
  }

  if (!displayHotels || displayHotels.length === 0) {
    return (
      <EmptyState
        icon={Search}
        title="No Hotels Found"
        subtitle="Try adjusting your search criteria or filters."
        className="bg-gray-50 border border-gray-200 rounded-3xl p-8"
      />
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div className="space-y-8">
        <TourListHeader tourCount={totalHotels} />
        <div className="grid grid-cols-1 gap-8">
          {displayHotels.map((hotel, index) => {
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
                key={`${hotel.id}-${currentPage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(index * 0.05, 0.5),
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row h-auto border border-gray-200 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
                role="article"
                aria-label={`Hotel: ${hotel.title}`}
                whileHover={{ y: -3 }}
                style={{ willChange: 'transform, opacity' }}
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
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
          />
        )}
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
