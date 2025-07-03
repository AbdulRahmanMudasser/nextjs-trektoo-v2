'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Calendar, DollarSign } from 'lucide-react';

const CalendarPrice = ({ price = '0', bookingFees = '0' }) => {
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
        Pricing Details
      </motion.h2>
      <motion.div className="space-y-6" variants={itemVariants}>
        <div className="flex items-center gap-4">
          <DollarSign className="h-6 w-6 text-blue-500" />
          <div>
            <p className="text-lg font-semibold text-gray-900">
              Base Price: ${parseFloat(price).toFixed(2)}
            </p>
            <p className="text-gray-600 text-sm">Per night</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <DollarSign className="h-6 w-6 text-blue-500" />
          <div>
            <p className="text-lg font-semibold text-gray-900">
              Booking Fee: ${parseFloat(bookingFees).toFixed(2)}
            </p>
            <p className="text-gray-600 text-sm">One-time fee</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Calendar className="h-6 w-6 text-blue-500" />
          <div>
            <p className="text-lg font-semibold text-gray-900">
              Total: ${(parseFloat(price) + parseFloat(bookingFees)).toFixed(2)}
            </p>
            <p className="text-gray-600 text-sm">Per night including fees</p>
          </div>
        </div>
      </motion.div>
      {/* <motion.button
        className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Book Now
      </motion.button> */}
    </motion.div>
  );
};

CalendarPrice.propTypes = {
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bookingFees: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CalendarPrice;
