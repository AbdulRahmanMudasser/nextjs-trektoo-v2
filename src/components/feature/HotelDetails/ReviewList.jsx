'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Star, User, Calendar, ThumbsUp, MessageCircle } from 'lucide-react';

const PaginationButton = ({ label, active, onClick, disabled = false }) => (
  <motion.button
    whileHover={{ scale: disabled ? 1 : 1.05 }}
    whileTap={{ scale: disabled ? 1 : 0.95 }}
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
      active
        ? 'bg-blue-600 text-white shadow-lg'
        : disabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600'
    }`}
  >
    {label}
  </motion.button>
);

PaginationButton.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const itemsPerPageOptions = [5, 10, 15, 20];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200">
      {/* Items per page selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 font-medium">Show:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
        >
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option} per page
            </option>
          ))}
        </select>
      </div>

      {/* Page navigation */}
      <div className="flex items-center gap-2">
        <PaginationButton
          label="Previous"
          disabled={currentPage <= 1}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        />

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const page = i + 1;
          return (
            <PaginationButton
              key={page}
              label={page.toString()}
              active={currentPage === page}
              onClick={() => onPageChange(page)}
            />
          );
        })}

        {totalPages > 5 && (
          <>
            <span className="px-2 text-gray-500">...</span>
            <PaginationButton
              label={totalPages.toString()}
              active={currentPage === totalPages}
              onClick={() => onPageChange(totalPages)}
            />
          </>
        )}

        <PaginationButton
          label="Next"
          disabled={currentPage >= totalPages}
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
        />
      </div>

      {/* Page info */}
      <div className="text-sm text-gray-600 font-medium">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  setItemsPerPage: PropTypes.func.isRequired,
};

const ReviewCard = ({ review, index }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  const rating = parseFloat(review.rating) || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <motion.div
      className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Review Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">
              {review.user_name || 'Anonymous'}
            </h4>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>
                {review.created_at
                  ? new Date(review.created_at).toLocaleDateString()
                  : 'Recently'}
              </span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < fullStars
                  ? 'text-yellow-400 fill-current'
                  : i === fullStars && hasHalfStar
                    ? 'text-yellow-400 fill-current opacity-50'
                    : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm font-medium text-gray-700">
            {rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Review Content */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">
          {review.content || review.comment || 'No review content available.'}
        </p>
      </div>

      {/* Review Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          {review.helpful_count > 0 && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <ThumbsUp className="h-4 w-4" />
              <span>{review.helpful_count} helpful</span>
            </div>
          )}
          {review.reply_count > 0 && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MessageCircle className="h-4 w-4" />
              <span>{review.reply_count} replies</span>
            </div>
          )}
        </div>

        {/* Review Tags */}
        {review.tags && review.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {review.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200"
              >
                {tag}
              </span>
            ))}
            {review.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                +{review.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    user_name: PropTypes.string,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    content: PropTypes.string,
    comment: PropTypes.string,
    created_at: PropTypes.string,
    helpful_count: PropTypes.number,
    reply_count: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
};

const ReviewList = ({
  reviews = [],
  pagination = {},
  onPageChange = () => {},
  onItemsPerPageChange = () => {},
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

  const {
    current_page = 1,
    total_pages = 1,
    total = 0,
    per_page = 10,
  } = pagination;

  if (reviews.length === 0) {
    return (
      <motion.section
        className="relative w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="w-full">
          <div className="w-full p-6 sm:p-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Reviews Yet
              </h3>
              <p className="text-gray-600">
                Be the first to share your experience with this hotel.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.div
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Reviews Header */}
      <motion.div
        className="flex items-center justify-between mb-8"
        variants={containerVariants}
      >
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Guest Reviews
          </h2>
          <p className="text-gray-600">
            {total} {total === 1 ? 'review' : 'reviews'} from our guests
          </p>
        </div>
      </motion.div>

      {/* Reviews Grid */}
      <div className="space-y-6 mb-8">
        {reviews.map((review, index) => (
          <ReviewCard key={review.id || index} review={review} index={index} />
        ))}
      </div>

      {/* Pagination */}
      {total_pages > 1 && (
        <Pagination
          currentPage={current_page}
          totalPages={total_pages}
          onPageChange={onPageChange}
          itemsPerPage={per_page}
          setItemsPerPage={onItemsPerPageChange}
        />
      )}
    </motion.div>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      user_name: PropTypes.string,
      rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      content: PropTypes.string,
      comment: PropTypes.string,
      created_at: PropTypes.string,
      helpful_count: PropTypes.number,
      reply_count: PropTypes.number,
      tags: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  pagination: PropTypes.shape({
    current_page: PropTypes.number,
    total_pages: PropTypes.number,
    total: PropTypes.number,
    per_page: PropTypes.number,
  }),
  onPageChange: PropTypes.func,
  onItemsPerPageChange: PropTypes.func,
};

export default ReviewList;
