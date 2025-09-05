'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Star, Users, TrendingUp } from 'lucide-react';

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
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
  const reviewStatsWithScores = reviewStats.map((stat) => ({
    name: stat,
    score: numericScore, // Use overall score as a fallback
  }));

  return (
    <motion.div
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div className="text-center mb-8" variants={itemVariants}>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Guest Reviews
        </h2>
        <p className="text-lg text-gray-600">
          See what our guests have to say about their experience
        </p>
      </motion.div>

      {/* Main Rating Card */}
      <motion.div
        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8 border border-blue-100"
        variants={itemVariants}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Overall Score */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <div className="text-5xl font-bold text-blue-600">
                {numericScore.toFixed(1)}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`h-5 w-5 ${
                        index < fullStars
                          ? 'text-yellow-400 fill-current'
                          : index === fullStars && hasHalfStar
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 mt-1">{scoreText}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="h-4 w-4" />
              <span className="text-sm">
                Based on {totalReviews}{' '}
                {totalReviews === 1 ? 'review' : 'reviews'}
              </span>
            </div>
          </div>

          {/* Rating Breakdown */}
          {Object.keys(rateScores).length > 0 && (
            <div className="flex-1 max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center lg:text-left">
                Rating Breakdown
              </h3>
              <div className="space-y-3">
                {Object.entries(rateScores).map(([rating, count]) => {
                  const percentage =
                    totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  return (
                    <div key={rating} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-16">
                        <span className="text-sm font-medium text-gray-700">
                          {rating}
                        </span>
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8 text-right">
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Review Categories */}
      {reviewStatsWithScores.length > 0 && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {reviewStatsWithScores.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{stat.name}</h4>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">
                    {stat.score.toFixed(1)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className={`h-4 w-4 ${
                      starIndex < Math.floor(stat.score)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

ReviewScores.propTypes = {
  scoreTotal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  scoreText: PropTypes.string,
  totalReviews: PropTypes.number,
  reviewStats: PropTypes.arrayOf(PropTypes.string),
  rateScores: PropTypes.object,
};

export default ReviewScores;
