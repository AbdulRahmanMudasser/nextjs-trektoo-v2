'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Star, User, ChevronLeft, ChevronRight } from 'lucide-react';

const ReviewList = ({
  reviews = [],
  pagination = {},
  onPageChange = () => {},
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return `${content.substring(0, maxLength)}...`;
  };

  const handlePageChange = (url, label) => {
    if (url && label !== '« Previous' && label !== 'Next »') {
      onPageChange(url);
    } else if (url && label === '« Previous') {
      onPageChange(url);
    } else if (url && label === 'Next »') {
      onPageChange(url);
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-7xl mx-auto mt-12 sm:mt-16 py-10 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-gray-50 to-white rounded-3xl shadow-lg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      data-testid="review-list"
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 border-l-4 border-blue-600 pl-4"
        variants={itemVariants}
      >
        Guest Feedback
      </motion.h2>
      {reviews.length > 0 ? (
        <div className="space-y-8">
          {reviews.map((review, index) => {
            const numericScore = parseFloat(review.rate_number) || 0;
            const fullStars = Math.floor(numericScore);
            const hasHalfStar = numericScore % 1 >= 0.5;

            return (
              <motion.div
                key={review.id}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-4 hover:shadow-xl transition-shadow duration-300"
                variants={itemVariants}
                data-testid={`review-${review.id}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        Guest {review.author_id}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {formatDate(review.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(fullStars)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                    {hasHalfStar && (
                      <Star
                        className="w-5 h-5 text-yellow-400 fill-yellow-400"
                        style={{ clipPath: 'inset(0 50% 0 0)' }}
                      />
                    )}
                    {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map(
                      (_, i) => (
                        <Star
                          key={i + fullStars + 1}
                          className="w-5 h-5 text-gray-200"
                        />
                      )
                    )}
                  </div>
                </div>
                <h5 className="text-md font-medium text-gray-800 mb-2">
                  {review.title}
                </h5>
                <p className="text-gray-700 text-base leading-relaxed">
                  {truncateContent(review.content)}
                </p>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <p
          className="text-gray-700 text-lg font-medium"
          data-testid="no-reviews"
        >
          No reviews available for this hotel.
        </p>
      )}
      {pagination.links && pagination.links.length > 0 && (
        <motion.div
          className="mt-8 flex justify-center items-center gap-2"
          variants={itemVariants}
          data-testid="pagination"
        >
          {pagination.links.map((link, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(link.url, link.label)}
              disabled={!link.url || link.active}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                link.active
                  ? 'bg-blue-600 text-white'
                  : link.url
                    ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              data-testid={`pagination-${link.label}`}
            >
              {link.label === '« Previous' ? (
                <ChevronLeft className="w-5 h-5" />
              ) : link.label === 'Next »' ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                link.label
              )}
            </button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      rate_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      created_at: PropTypes.string.isRequired,
      author_id: PropTypes.number.isRequired,
    })
  ),
  pagination: PropTypes.shape({
    current_page: PropTypes.number,
    last_page: PropTypes.number,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        label: PropTypes.string.isRequired,
        active: PropTypes.bool.isRequired,
      })
    ),
  }),
  onPageChange: PropTypes.func,
};

export default ReviewList;
