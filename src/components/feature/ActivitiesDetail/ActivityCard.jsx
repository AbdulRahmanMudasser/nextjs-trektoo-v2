'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Star,
  MapPin,
  Clock,
  Users,
  Globe,
  Eye,
  Sparkles,
} from 'lucide-react';

const ActivityCard = ({
  activity,
  onFavoriteToggle,
  isFavorite,
  onViewDetails,
  viewMode = 'grid',
}) => {
  const [imageError, setImageError] = useState(false);

  // Get country and city names from IDs (you might want to create a mapping service)
  const getLocationName = (cityId, countryId) => {
    // This would typically come from a location mapping service
    return `City ${cityId}, Country ${countryId}`;
  };

  // Get category name from ID
  const getCategoryName = (categoryId) => {
    const categoryMap = {
      1: 'Attractions',
      15: 'Experience',
      2: 'Tours',
      17: 'Transportation',
      // Add more mappings as needed
    };
    return categoryMap[categoryId] || 'Activity';
  };

  // Get supported languages count
  const getLanguageCount = (languages) => {
    return languages ? languages.length : 0;
  };

  // Default image fallback
  const defaultImage =
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop&crop=center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{
        y: -12,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}
      className={`group bg-gradient-to-br from-white via-white to-gray-50/50 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-700 border border-gray-200/50 relative cursor-pointer backdrop-blur-sm w-full ${
        viewMode === 'list' ? 'flex flex-row h-64' : 'h-full flex flex-col'
      }`}
      onClick={() => onViewDetails(activity)}
    >
      {/* Premium Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />

      {/* Image Container */}
      <div
        className={`relative overflow-hidden flex-shrink-0 ${
          viewMode === 'list' ? 'w-80' : ''
        }`}
      >
        <div
          className={
            viewMode === 'list' ? 'w-full h-full' : 'aspect-w-16 aspect-h-10'
          }
        >
          <img
            src={imageError ? defaultImage : activity.image || defaultImage}
            alt={activity.title}
            className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 filter group-hover:brightness-110 ${
              viewMode === 'list' ? 'h-full' : 'h-48 sm:h-52 md:h-56 lg:h-60'
            }`}
          />
        </div>

        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent group-hover:from-black/50 transition-all duration-700" />

        {/* Premium Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-all duration-1000" />

        {/* Floating Heart Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle(activity.activity_id);
          }}
          className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-md rounded-2xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-2xl border border-white/20 hover:scale-110"
          aria-label="Toggle favorite"
        >
          <Heart
            className={`h-5 w-5 transition-all duration-300 ${
              isFavorite
                ? 'text-red-500 fill-current scale-110'
                : 'text-gray-600'
            }`}
          />
        </button>

        {/* Premium Category Badge */}
        <div className="absolute bottom-4 left-6">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-blue-600 to-blue-500 text-white backdrop-blur-sm shadow-lg border border-blue-400/20">
            <Sparkles className="h-3 w-3" />
            {getCategoryName(activity.category_id)}
          </span>
        </div>

        {/* Top Right Accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/20 to-transparent" />
      </div>

      {/* Content */}
      <div
        className={`p-4 sm:p-6 lg:p-8 relative flex-1 flex flex-col ${
          viewMode === 'list' ? 'justify-center' : ''
        }`}
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/30 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <div className="relative z-10 flex-1 flex flex-col">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-500 mb-3 line-clamp-2 flex-shrink-0">
            {activity.title}
          </h3>

          {activity.sub_title && (
            <p className="text-gray-600 text-sm mb-4 sm:mb-6 line-clamp-2 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 flex-shrink-0">
              {activity.sub_title}
            </p>
          )}

          {/* Enhanced Meta Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6 flex-shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
              <div className="p-2 sm:p-2.5 bg-gradient-to-br from-gray-100 to-gray-200/50 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300 flex-shrink-0">
                <MapPin className="h-4 w-4 text-gray-600" />
              </div>
              <span className="font-medium truncate text-xs sm:text-sm">
                {getLocationName(activity.city_id, activity.country_id)}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
              <div className="p-2 sm:p-2.5 bg-gradient-to-br from-gray-100 to-gray-200/50 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300 flex-shrink-0">
                <Globe className="h-4 w-4 text-gray-600" />
              </div>
              <span className="font-medium text-xs sm:text-sm">
                {getLanguageCount(activity.supported_languages)} languages
              </span>
            </div>
          </div>

          {/* Enhanced Rating Section */}
          <div className="flex items-center justify-between mb-4 sm:mb-6 flex-shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-50 to-orange-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-sm border border-yellow-200/50">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                <span className="text-xs sm:text-sm font-bold text-gray-900">
                  4.5
                </span>
              </div>
              <span className="text-xs sm:text-sm text-gray-500 font-medium hidden sm:block">
                (128 reviews)
              </span>
              <span className="text-xs text-gray-500 font-medium sm:hidden">
                (128)
              </span>
            </div>
            <span className="text-xs font-semibold text-gray-400 bg-gradient-to-r from-gray-100 to-gray-200/70 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gray-200/50">
              ID: {activity.activity_id}
            </span>
          </div>

          {/* Premium Price and CTA - Push to bottom */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {activity.price || 'From $25'}
                </span>
              </div>
              <span className="text-xs text-gray-500 font-medium">
                per person
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(activity);
              }}
              className="relative px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 font-bold text-xs sm:text-sm shadow-lg hover:shadow-2xl flex items-center gap-1.5 sm:gap-2 border border-blue-500/20 overflow-hidden group/btn flex-shrink-0"
            >
              {/* Button Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transform -skew-x-12 translate-x-full group-hover/btn:translate-x-[-200%] transition-all duration-700" />
              <Eye className="h-3 w-3 sm:h-4 sm:w-4 relative z-10" />
              <span className="relative z-10 hidden sm:inline">
                View Details
              </span>
              <span className="relative z-10 sm:hidden">View</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityCard;
