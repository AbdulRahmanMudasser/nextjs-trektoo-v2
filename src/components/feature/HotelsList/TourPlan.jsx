'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const ImageWithFallback = ({ src, alt, ...props }) => {
  const [hasError, setHasError] = React.useState(false);
  const proxiedSrc = src.includes('staging.trektoo.com')
    ? `/api/image/proxy?url=${encodeURIComponent(src)}`
    : src;

  return (
    <div className="relative w-full h-full">
      {hasError ? (
        <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center">
          <span className="text-gray-600 text-sm font-medium">
            Image Unavailable
          </span>
        </div>
      ) : (
        <Image
          src={proxiedSrc}
          alt={alt}
          onError={(e) => {
            console.error('Image load error:', { src, error: e.message });
            setHasError(true);
          }}
          {...props}
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
                quality={80}
                loading="lazy"
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
