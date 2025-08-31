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
      className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-full">
        {/* Header Section */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-full mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Award className="h-8 w-8 text-blue-600" />
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Experience Excellence
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="w-full">
          {/* Description Section */}
          <motion.div className="w-full space-y-6" variants={itemVariants}>
            <div className="p-8 sm:p-10 rounded-3xl border border-gray-100">
              <motion.h3
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center"
                variants={itemVariants}
              >
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-4" />
                About This Hotel
              </motion.h3>

              <motion.div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                variants={itemVariants}
                dangerouslySetInnerHTML={{ __html: description }}
              />

              {/* Location */}
              <motion.div
                className="mt-8 p-6 rounded-2xl border border-blue-100"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-2 bg-blue-500 rounded-full">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      Prime Location
                    </h4>
                    <p className="text-gray-700 font-medium">{address}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Rating Card */}
            {rating && (
              <motion.div
                className="p-6 sm:p-8 rounded-3xl border border-yellow-200"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4">
                    <Star className="h-8 w-8 text-white fill-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Guest Rating
                  </h3>
                  {renderStars(rating)}
                  <p className="text-gray-600 mt-2 text-sm">
                    Based on verified reviews
                  </p>
                </div>
              </motion.div>
            )}

            {/* Amenities Card */}
            {amenities && amenities.length > 0 && (
              <motion.div
                className="p-6 sm:p-8 rounded-3xl border border-green-200"
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  Premium Amenities
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {amenities.map((amenity, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-sm"
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="flex-shrink-0 text-green-600">
                        {getAmenityIcon(amenity)}
                      </div>
                      <span className="text-gray-700 font-medium text-sm">
                        {amenity}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Bottom Feature Strip */}
        <motion.div
          className="mt-16 p-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl shadow-xl"
          variants={itemVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div className="text-white" whileHover={{ y: -5 }}>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold mb-2">Award Winning</h4>
              <p className="text-gray-300 text-sm">
                Recognized for excellence in hospitality
              </p>
            </motion.div>

            <motion.div className="text-white" whileHover={{ y: -5 }}>
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold mb-2">5-Star Service</h4>
              <p className="text-gray-300 text-sm">
                Exceptional service guaranteed
              </p>
            </motion.div>

            <motion.div className="text-white" whileHover={{ y: -5 }}>
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold mb-2">Prime Location</h4>
              <p className="text-gray-300 text-sm">
                Perfectly situated for your convenience
              </p>
            </motion.div>
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
