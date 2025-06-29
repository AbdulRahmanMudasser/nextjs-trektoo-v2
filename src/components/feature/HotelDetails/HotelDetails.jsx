'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

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

const HotelDetails = ({
  id,
  description = 'No description provided.',
  address = 'Unknown address',
}) => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <motion.div
          className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-blue-50"
          variants={itemVariants}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4 border-l-4 border-blue-500 pl-3"
            variants={itemVariants}
          >
            About This Hotel
          </motion.h2>
          <motion.div
            className="text-gray-600 text-base sm:text-lg mb-6"
            variants={itemVariants}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <motion.div
            className="flex items-center text-gray-600"
            variants={itemVariants}
          >
            <MapPin className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-base sm:text-lg font-medium">{address}</span>
          </motion.div>
        </motion.div>
        <motion.div
          className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden"
          variants={itemVariants}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Hotel Overview"
            fill
            className="object-cover"
            quality={80}
            loading="lazy"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

HotelDetails.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string,
  address: PropTypes.string,
};

export default HotelDetails;
