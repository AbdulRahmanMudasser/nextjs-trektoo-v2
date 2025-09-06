'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
  Star,
  Award,
  Wifi,
  Car,
  Coffee,
  Utensils,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
} from 'lucide-react';

const HotelDetails = ({ id, description, address, rating, amenities = [] }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

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
        return Wifi;
      case 'parking':
      case 'car':
        return Car;
      case 'restaurant':
      case 'dining':
        return Utensils;
      case 'coffee':
        return Coffee;
      default:
        return Star;
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-5 w-5 text-yellow-400 fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />);
    }

    return (
      <div className="flex items-center space-x-1">
        {stars}
        <span className="ml-2 text-gray-600 font-medium">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  // Truncate description for preview
  const truncatedDescription = description
    ? description.length > 200
      ? description.substring(0, 200) + '...'
      : description
    : 'No description available.';

  const shouldTruncate = description && description.length > 200;

  return (
    <motion.div
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-full">
        {/* Unified About This Hotel Section */}
        <motion.div className="mb-8 sm:mb-12" variants={itemVariants}>
          <div className="max-w-[85vw] mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              {/* Header Section */}
              <div className="text-center mb-8">
                <motion.div
                  className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-full mb-6 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <Award className="h-8 w-8 text-white" />
                </motion.div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  About This Hotel
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover what makes this hotel special and why guests choose
                  to stay here
                </p>
              </div>

              {/* Description Section */}
              <div className="border-t border-gray-100 pt-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-600" />
                    Hotel Description
                  </h3>
                  {shouldTruncate && (
                    <button
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all duration-300"
                    >
                      {showFullDescription ? (
                        <>
                          <EyeOff className="h-4 w-4" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4" />
                          Show More
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="prose prose-lg max-w-none">
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: showFullDescription
                        ? description
                        : truncatedDescription,
                    }}
                  />
                </div>

                {shouldTruncate && !showFullDescription && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setShowFullDescription(true)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                    >
                      Read more
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Amenities Section */}
        {amenities && amenities.length > 0 && (
          <motion.div className="mb-8 sm:mb-12" variants={itemVariants}>
            <div className="max-w-[85vw] mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Hotel Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {amenities.map((amenity, index) => {
                    const Icon = getAmenityIcon(amenity);
                    return (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="text-blue-600">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {amenity}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Rating Section */}
        {rating && rating > 0 && (
          <motion.div className="mb-8 sm:mb-12" variants={itemVariants}>
            <div className="max-w-[85vw] mx-auto">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-100">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Guest Rating
                  </h3>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    {renderStars(rating)}
                  </div>
                  <p className="text-gray-600">
                    Based on guest reviews and ratings
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
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
