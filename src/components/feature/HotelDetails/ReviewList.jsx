'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Star, User } from 'lucide-react';

const PaginationButton = ({ label, active, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-full ${
      active
        ? 'bg-blue-500 text-white'
        : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
    } transition-colors`}
    data-testid={`pagination-${label.replace(/\s/g, '-')}`}
  >
    {label}
  </motion.button>
);

PaginationButton.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  setItemsPerPage,
}) => (
  <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
    <div className="flex gap-3">
      {Array.from({ length: totalPages }, (_, i) => (
        <PaginationButton
          key={i + 1}
          label={(i + 1).toString()}
          active={currentPage === i + 1}
          onClick={() => onPageChange(i + 1)}
        />
      ))}
      <PaginationButton
        label="Next"
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
      />
    </div>
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 font-medium">Show:</span>
      <select
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(+e.target.value)}
        className="border border-blue-50 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/95"
        data-testid="items-per-page"
      >
        <option value={2}>2 per page</option>
        <option value={4}>4 per page</option>
        <option value={5}>5 per page</option>
        <option value={6}>6 per page</option>
        <option value={10}>10 per page</option>
      </select>
    </div>
  </div>
);

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  setItemsPerPage: PropTypes.func.isRequired,
};

const ReviewList = ({
  reviews = [],
  pagination = { current_page: 1, total_pages: 1, total: 0 },
  onPageChange = () => {},
  itemsPerPage = 5,
  setItemsPerPage = () => {},
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

  // Ensure totalPages is at least 1 and handle API inconsistencies
  const safeTotalPages = Math.max(1, pagination.total_pages || 1);
  const safeCurrentPage = Math.min(
    pagination.current_page || 1,
    safeTotalPages
  );

  return (
    <motion.div
      className="relative w-full py-10 px-6 sm:px-8 lg:px-12 mb-16"
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
          {reviews.map((review) => {
            const numericScore = parseFloat(review.rate_number) || 0;
            const fullStars = Math.floor(numericScore);
            const hasHalfStar = numericScore % 1 >= 0.5;

            return (
              <motion.div
                key={review.id}
                className="p-6 rounded-xl border border-gray-100 mb-6 transition-shadow duration-300"
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
          No reviews available for this hotel on this page.
        </p>
      )}
      {pagination.total > 0 && (
        <Pagination
          currentPage={safeCurrentPage}
          totalPages={safeTotalPages}
          onPageChange={onPageChange}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
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
    total_pages: PropTypes.number,
    total: PropTypes.number,
  }),
  onPageChange: PropTypes.func,
  itemsPerPage: PropTypes.number,
  setItemsPerPage: PropTypes.func,
};

export default ReviewList;
