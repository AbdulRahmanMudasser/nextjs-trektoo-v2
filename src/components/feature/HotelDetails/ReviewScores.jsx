'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const ReviewScores = ({
  scoreTotal = 0,
  scoreText = 'No rating',
  totalReviews = 0,
  reviewStats = [],
  rateScores = {},
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

  const numericScore = parseFloat(scoreTotal) || 0;
  const fullStars = Math.floor(numericScore);
  const hasHalfStar = numericScore % 1 >= 0.5;

  // Mock scores for reviewStats since API only provides names
  const reviewStatsWithScores = reviewStats.map(stat => ({
    name: stat,
    score: numericScore, // Use overall score as a fallback
  }));

  return (
    <motion.div
      className="relative w-full py-10 px-6 sm:px-8 lg:px-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      data-testid="review-scores"
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 border-l-4 border-blue-600 pl-4"
        variants={itemVariants}
      >
        Guest Reviews
      </motion.h2>
      <div className="flex flex-col lg:flex-row gap-8">
        <motion.div className="flex-1 space-y-6" variants={itemVariants}>
          <div className="p-6 rounded-xl border border-gray-100" data-testid="overall-rating">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Overall Rating</h3>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(fullStars)].map((_, i) => (
                  <motion.div key={i} variants={itemVariants}>
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                ))}
                {hasHalfStar && (
                  <motion.div variants={itemVariants}>
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
                  </motion.div>
                )}
                {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
                  <Star key={i + fullStars + 1} className="w-6 h-6 text-gray-200" />
                ))}
              </div>
              <span className="ml-3 text-xl font-semibold text-gray-800">
                {numericScore.toFixed(1)} - {scoreText} ({totalReviews} reviews)
              </span>
            </div>
          </div>
          <div className="p-6 rounded-xl border border-gray-100" data-testid="rating-distribution">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Rating Distribution</h3>
            {['5', '4', '3', '2', '1'].map((rating) => {
              const score = rateScores[rating] || { title: '', total: 0, percent: 0 };
              return (
                <motion.div key={rating} className="mb-4" variants={itemVariants}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700">{score.title || `${rating} Star`}</span>
                    <span className="text-gray-800 font-semibold">{score.total} ({score.percent}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${score.percent}%` }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        <motion.div className="flex-1" variants={itemVariants}>
          <div className="p-6 rounded-xl border border-gray-100" data-testid="review-stats">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Review Categories</h3>
            {reviewStatsWithScores.length > 0 ? (
              reviewStatsWithScores.map((stat, index) => (
                <motion.div key={index} className="mb-4" variants={itemVariants}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700">{stat.name}</span>
                    <span className="text-gray-800 font-semibold">{stat.score.toFixed(1)}/5</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(stat.score / 5) * 100}%` }}
                    />
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-700 text-lg" data-testid="no-stats">
                No review categories available.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

ReviewScores.propTypes = {
  scoreTotal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  scoreText: PropTypes.string,
  totalReviews: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  reviewStats: PropTypes.arrayOf(PropTypes.string),
  rateScores: PropTypes.object,
};

export default ReviewScores;