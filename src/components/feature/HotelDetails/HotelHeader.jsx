import React from 'react';
import PropTypes from 'prop-types';

import {
  MapPin,
  ThumbsUp,
  Clock,
  Leaf,
  Share2,
  MessageCircle,
  Heart,
  Percent,
} from 'lucide-react';
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
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-4.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 1 1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
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

const HotelHeader = ({
  id,
  title = 'Unnamed Hotel',
  location = 'Unknown Location',
  price = '0',
  duration = 'Per Night',
  rating = 0,
  photoCount = 0,
  discount = '',
  image = '/default-hotel.jpg',
}) => {
  const numericRating = parseFloat(rating) || 0;
  const numericPhotoCount = parseInt(photoCount) || 0;
  const fullStars = Math.floor(numericRating);
  const hasHalfStar = numericRating % 1 >= 0.5;

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
      className="bg-gradient-to-b from-blue-50 to-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Image Section */}
      <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] min-h-[300px] sm:min-h-[400px] max-h-[600px] overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover transform transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50" />
      </div>

      {/* Main Content Section */}
      <motion.div
        className="relative bg-white/95 backdrop-blur-sm py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8 -mt-12 sm:-mt-16 mx-2 sm:mx-4 md:mx-6 lg:mx-12 rounded-2xl sm:rounded-3xl"
        variants={itemVariants}
      >
        <div className="w-full">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-6 sm:gap-8">
            <motion.div
              className="space-y-3 sm:space-y-4"
              variants={itemVariants}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                {title}
              </h1>
              <div className="flex items-center text-gray-600 group cursor-pointer">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-2 transition-transform group-hover:scale-110 flex-shrink-0" />
                <span className="text-sm sm:text-base md:text-lg font-medium break-words">
                  {location}
                </span>
              </div>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-4 lg:mt-0"
              variants={containerVariants}
            >
              {[
                { icon: Clock, label: 'Duration', value: duration },
                { icon: Leaf, label: 'Hotel Type', value: 'Luxury' },
                ...(discount
                  ? [{ icon: Percent, label: 'Discount', value: discount }]
                  : []),
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center group"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-50 flex items-center justify-center mr-3 sm:mr-4 shadow-sm transition-shadow group-hover:shadow-md flex-shrink-0">
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-gray-500">
                      {item.label}
                    </p>
                    <p className="text-sm sm:text-lg font-semibold text-gray-800 truncate">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Footer Actions Section */}
      <motion.div
        className="bg-white border-t border-gray-100 py-4 sm:py-6 px-3 sm:px-4 md:px-6 lg:px-8"
        variants={itemVariants}
      >
        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <motion.div className="flex items-center" variants={itemVariants}>
              <div className="flex flex-wrap">
                {[...Array(fullStars)].map((_, i) => (
                  <motion.svg
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </motion.svg>
                ))}
                {hasHalfStar && (
                  <motion.svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 0 }}
                  >
                    <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
                    <path
                      d="M12 2V17.27L5.82 21L7.46 13.97L2 9.24L9.19 8.63L12 2Z"
                      fill="currentColor"
                    />
                  </motion.svg>
                )}
                {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map(
                  (_, i) => (
                    <svg
                      key={i + fullStars + 1}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-gray-200"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
                    </svg>
                  )
                )}
              </div>
              <span className="ml-2 sm:ml-3 text-sm sm:text-base text-gray-600 font-medium">
                {numericRating.toFixed(1)} ({numericPhotoCount} reviews)
              </span>
            </motion.div>
            <motion.div
              className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full sm:w-auto"
              variants={containerVariants}
            >
              {[
                { icon: Share2, label: 'SHARE', aria: 'Share hotel' },
                { icon: MessageCircle, label: 'REVIEWS', aria: 'View reviews' },
                { icon: Heart, label: 'WISHLIST', aria: 'Add to wishlist' },
              ].map((button, index) => (
                <motion.button
                  key={index}
                  className="flex items-center px-3 sm:px-5 py-2 sm:py-2.5 bg-blue-50 text-blue-600 rounded-full text-xs sm:text-sm font-medium hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md flex-1 sm:flex-none justify-center"
                  aria-label={button.aria}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button.icon className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 transition-colors flex-shrink-0" />
                  <span className="hidden xs:inline">{button.label}</span>
                  <span className="xs:hidden">
                    {button.label.split(' ')[0]}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

HotelHeader.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  location: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  duration: PropTypes.string,
  rating: PropTypes.number,
  photoCount: PropTypes.number,
  discount: PropTypes.string,
  image: PropTypes.string,
};

export default HotelHeader;
