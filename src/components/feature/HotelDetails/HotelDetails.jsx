'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { MapPin, Star, Award, Wifi, Car, Coffee, Utensils } from 'lucide-react';

const HotelDetails = ({ id, description, address, rating, amenities = [] }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 25,
      },
    },
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
      case 'wi-fi':
      case 'internet':
        return <Wifi className="h-5 w-5" />;
      case 'parking':
      case 'car park':
        return <Car className="h-5 w-5" />;
      case 'restaurant':
      case 'dining':
        return <Utensils className="h-5 w-5" />;
      case 'coffee shop':
      case 'cafe':
      case 'coffee':
        return <Coffee className="h-5 w-5" />;
      default:
        return <Star className="h-5 w-5" />;
    }
  };

  // Don't render the component if essential data is missing
  if (!description || !address) {
    return null;
  }
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStars = (rating) => {
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`h-5 w-5 ${
            index < fullStars
              ? 'text-yellow-400 fill-yellow-400'
              : index === fullStars && hasHalfStar
                ? 'text-yellow-400 fill-yellow-400/50'
                : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-2 text-gray-600 font-medium">
        {rating.toFixed(1)}
      </span>
    </div>;
  };

  return (
    <motion.section
      className="w-full py-6 sm:py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-full">
        {/* Header Section */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-full mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Award className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">
            Experience Excellence
          </h2>
        </motion.div>

        {/* Description Section */}
        <motion.div
          className="max-w-4xl mx-auto mb-12 sm:mb-16"
          variants={itemVariants}
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-lg border border-gray-100">
            <div className="prose prose-lg sm:prose-xl max-w-none">
              <div
                className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </div>
        </motion.div>

        {/* Address Section */}
        <motion.div className="max-w-4xl mx-auto" variants={itemVariants}>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-blue-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Location
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed break-words">
                  {address}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

HotelDetails.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string,
  address: PropTypes.string,
  rating: PropTypes.number,
  amenities: PropTypes.arrayOf(PropTypes.string),
};

export default HotelDetails;
