import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, MapPin, Clock } from 'lucide-react';

const categories = [
  {
    id: 'luxury',
    label: 'Luxury',
    color:
      'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-purple-200',
  },
  {
    id: 'midrange',
    label: 'Mid-range',
    color:
      'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'budget',
    label: 'Budget',
    color:
      'bg-gradient-to-r from-orange-50 to-yellow-50 text-orange-700 border-orange-200',
  },
];

const ActivityCard = ({
  activity,
  onFavoriteToggle,
  isFavorite,
  onViewDetails,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 relative cursor-pointer"
      onClick={() => onViewDetails(activity)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className="aspect-w-16 aspect-h-11">
          <img
            src={activity.image}
            alt={activity.title}
            className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-all duration-500" />

        {/* Floating Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle(activity.id);
          }}
          className="absolute top-6 right-6 p-3 bg-white/95 backdrop-blur-sm rounded-2xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
          aria-label="Toggle favorite"
        >
          <Heart
            className={`h-5 w-5 transition-all duration-300 ${isFavorite ? 'text-red-500 fill-current scale-110' : 'text-gray-600'}`}
          />
        </button>

        {/* Discount Badge */}
        {activity.discount && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-6 left-6 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg"
          >
            {activity.discount}% OFF
          </motion.div>
        )}

        {/* Category Badge */}
        <div className="absolute bottom-4 left-6">
          {categories.map(
            (cat) =>
              cat.id === activity.category && (
                <span
                  key={cat.id}
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${cat.color} backdrop-blur-sm`}
                >
                  {cat.label}
                </span>
              )
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-500 transition-colors duration-300 mb-3 line-clamp-2">
          {activity.title}
        </h3>

        <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
          {activity.description}
        </p>

        {/* Meta Information */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="p-2 bg-gray-100 rounded-lg">
              <MapPin className="h-4 w-4" />
            </div>
            <span className="font-medium">{activity.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Clock className="h-4 w-4" />
            </div>
            <span className="font-medium">{activity.duration}</span>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-bold text-gray-900">
                {activity.rating}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              ({activity.reviews} reviews)
            </span>
          </div>
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {activity.bookings} booked
          </span>
        </div>

        {/* Pricing and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
                ${activity.price.toFixed(2)}
              </span>
              {activity.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${activity.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">per person</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(activity);
            }}
            className="px-6 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all duration-300 font-bold text-sm shadow-lg hover:shadow-xl"
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityCard;
