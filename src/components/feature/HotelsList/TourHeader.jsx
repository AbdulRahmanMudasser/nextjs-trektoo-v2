import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
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

const TourHeader = ({
  id,
  title = 'Unnamed Tour',
  location = 'Unknown Location',
  price = '$199.99',
  duration = '3 Days',
  rating = 3,
  photoCount = 5,
  discount = '',
  image = '/default-tour.jpg',
}) => {
  const numericRating = parseFloat(rating.toString()) || 3;
  const numericPhotoCount = parseInt(photoCount.toString()) || 5;
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
      className=" bg-gradient-to-b from-blue-50 to-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Image Section */}
      <div className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transform transition-transform duration-1000 hover:scale-105"
          placeholder="blur"
          blurDataURL="/default-tour.jpg"
          priority
          onError={(e) => {
            console.warn(`Failed to load header image for ${title}: ${image}`);
            e.currentTarget.src = '/default-tour.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50" />
      </div>

      {/* Main Content Section */}
      <motion.div
        className="relative bg-white/95 backdrop-blur-sm py-8 sm:py-12 px-4 sm:px-6 lg:px-8 shadow-xl -mt-16 mx-4 sm:mx-6 lg:mx-12 rounded-3xl"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
            <motion.div className="space-y-4" variants={itemVariants}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                {title}
              </h1>
              <div className="flex items-center text-gray-600 group cursor-pointer">
                <MapPin className="h-5 w-5 text-blue-500 mr-2 transition-transform group-hover:scale-110" />
                <span className="text-base sm:text-lg font-medium">
                  {location}
                </span>
              </div>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
              variants={containerVariants}
            >
              {[
                { icon: ThumbsUp, label: 'From', value: price },
                { icon: Clock, label: 'Duration', value: duration },
                { icon: Leaf, label: 'Tour Type', value: discount || 'Luxury' },
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
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4 shadow-sm transition-shadow group-hover:shadow-md">
                    <item.icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="text-lg font-semibold text-gray-800">
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
        className="bg-white border-t border-gray-100 py-6 px-4 sm:px-6 lg:px-8"
        variants={itemVariants}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <motion.div className="flex items-center" variants={itemVariants}>
              <div className="flex">
                {[...Array(fullStars)].map((_, i) => (
                  <motion.svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
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
                    className="w-5 h-5 text-yellow-400"
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
                      className="w-5 h-5 text-gray-200"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
                    </svg>
                  )
                )}
              </div>
              <span className="ml-3 text-base text-gray-600 font-medium">
                {numericRating.toFixed(2)} ({numericPhotoCount} reviews)
              </span>
            </motion.div>
            <motion.div
              className="flex flex-wrap justify-center gap-3"
              variants={containerVariants}
            >
              {[
                { icon: Share2, label: 'SHARE', aria: 'Share tour' },
                { icon: MessageCircle, label: 'REVIEWS', aria: 'View reviews' },
                { icon: Heart, label: 'WISHLIST', aria: 'Add to wishlist' },
              ].map((button, index) => (
                <motion.button
                  key={index}
                  className="flex items-center px-5 py-2.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                  aria-label={button.aria}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button.icon className="h-4 w-4 mr-2 transition-colors" />
                  {button.label}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

TourHeader.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  location: PropTypes.string,
  price: PropTypes.string,
  duration: PropTypes.string,
  rating: PropTypes.number,
  photoCount: PropTypes.number,
  discount: PropTypes.string,
  image: PropTypes.string,
};

export default TourHeader;
