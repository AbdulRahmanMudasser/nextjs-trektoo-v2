'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import Link from 'next/link';

const ImageWithFallback = ({ src, alt, ...props }) => {
  const [hasError, setHasError] = React.useState(false);

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
           style={{ width: '100%', height: '100%', objectFit: 'cover' }}
         />
      )}
    </div>
  );
};

ImageWithFallback.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

const TourPlan = ({ relatedHotels = [] }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      className="relative w-full max-w-7xl mx-auto mt-12 sm:mt-16 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-6 border-l-4 border-blue-500 pl-3"
        variants={itemVariants}
      >
        Related Hotels
      </motion.h2>
      {relatedHotels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedHotels.map((hotel, index) => (
            <motion.div
              key={index}
              className="relative bg-white rounded-2xl shadow-md overflow-hidden"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
            >
                             <ImageWithFallback
                 src={hotel.image}
                 alt={hotel.title}
                 className="w-full h-48 object-cover"
               />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {hotel.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {hotel.location?.name || 'Unknown Location'}
                </p>
                <Link
                  href={`/hotel/${hotel.id}`}
                  className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.p className="text-gray-600 text-lg" variants={itemVariants}>
          No related hotels available.
        </motion.p>
      )}
    </motion.div>
  );
};

TourPlan.propTypes = {
  relatedHotels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      location: PropTypes.shape({
        name: PropTypes.string,
      }),
    })
  ),
};

export default TourPlan;
