'use client';

import React from 'react';
import PropTypes from 'prop-types';

import { motion } from 'framer-motion';

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
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-4.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
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

const HeaderSubtitle = ({ children }) => (
  <p className="mt-4 text-lg md:text-xl text-gray-100 font-medium max-w-3xl mx-auto leading-relaxed">
    {children}
  </p>
);

HeaderSubtitle.propTypes = {
  children: PropTypes.node.isRequired,
};

const HeaderTitle = ({ children }) => (
  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
    {children}
  </h1>
);

HeaderTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

const HeaderContent = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="flex flex-col items-center text-center max-w-4xl mx-auto px-4"
  >
    <HeaderTitle>Discover Your Next Stay</HeaderTitle>
    <HeaderSubtitle>Find the perfect hotel for your journey</HeaderSubtitle>
  </motion.div>
);

const HeaderSection = () => (
  <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
       <ImageWithFallback
     src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
     alt="Hotel hero"
     className="absolute inset-0 w-full h-full object-cover"
   />
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
      <HeaderContent />
    </div>
  </section>
);

export default HeaderSection;
