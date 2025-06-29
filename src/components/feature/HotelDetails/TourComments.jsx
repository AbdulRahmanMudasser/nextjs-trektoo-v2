'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const TourComments = ({ reviews = [] }) => {
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
        Guest Comments
      </motion.h2>
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md border border-blue-50"
              variants={itemVariants}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {review.user_name || 'Anonymous'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-600">{review.content}</p>
              <div className="mt-2 flex">
                {[...Array(Math.floor(parseFloat(review.score) || 0))].map(
                  (_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  )
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.p className="text-gray-600 text-lg" variants={itemVariants}>
          No reviews available for this hotel.
        </motion.p>
      )}
    </motion.div>
  );
};

TourComments.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      user_name: PropTypes.string,
      content: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
};

export default TourComments;
