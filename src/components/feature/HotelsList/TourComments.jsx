'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { MessageCircle, Star } from 'lucide-react';

const TourComments = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
    saveInfo: false,
    ratings: {
      Quality: 0,
      Location: 0,
      Amenities: 0,
      Services: 0,
      Price: 0,
    },
  });

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRatingChange = (category, score) => {
    setFormData((prev) => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [category]: score,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic
    console.log('Form submitted:', formData);
  };

  const calculateAverageRating = () => {
    const ratings = Object.values(formData.ratings);
    const total = ratings.reduce((sum, score) => sum + score, 0);
    return ratings.length ? (total / ratings.length).toFixed(2) : '0.00';
  };

  return (
    <motion.div
      className="relative w-full max-w-7xl mx-auto mt-12 sm:mt-16 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl mb-12 sm:mb-16"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="w-full bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-blue-50"
        variants={itemVariants}
      >
        <motion.div className="mb-12" variants={itemVariants}>
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4 border-l-4 border-blue-500 pl-3"
            variants={itemVariants}
          >
            Guest Reviews
          </motion.h2>
          <motion.div
            className="w-12 h-1 bg-blue-500 mb-8"
            variants={itemVariants}
          />
          {[
            {
              author: 'John Doe',
              date: 'February 8, 2023',
              ratings: [
                ['Quality', 4],
                ['Location', 5],
                ['Amenities', 5],
                ['Services', 4],
                ['Price', 4],
              ],
              comment:
                'It is a great place to shop not too far from New York. We took the bus from Port Authority and traveled through the countryside to get there.',
            },
            {
              author: 'Jane Smith',
              date: 'February 8, 2023',
              ratings: [
                ['Quality', 3],
                ['Location', 4],
                ['Amenities', 3],
                ['Services', 5],
                ['Price', 4],
              ],
              comment:
                'This is the best tour on the east coast! It was amazing how many places we visited and what great memories we made!',
            },
          ].map(({ author, date, ratings, comment }, index) => (
            <motion.div
              key={index}
              className="mb-8 pb-8 border-b border-blue-100"
              variants={itemVariants}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="w-12 h-12 bg-blue-50 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center"
                  variants={itemVariants}
                >
                  <svg
                    className="w-8 h-8 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
                <div className="flex-1">
                  <motion.div
                    className="flex flex-wrap items-center justify-between mb-2"
                    variants={itemVariants}
                  >
                    <h3 className="text-lg font-semibold text-gray-900">
                      {author}
                    </h3>
                    <motion.button
                      className="text-blue-500 flex items-center text-sm hover:text-blue-600 transition"
                      aria-label="Reply to comment"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Reply
                    </motion.button>
                  </motion.div>
                  <motion.div
                    className="text-sm text-gray-600 mb-3"
                    variants={itemVariants}
                  >
                    <span className="text-blue-500 mr-2">—</span>
                    {date}
                  </motion.div>
                  <motion.div
                    className="flex flex-wrap gap-x-6 gap-y-2 mb-4"
                    variants={containerVariants}
                  >
                    {ratings.map(([label, score]) => (
                      <motion.div key={label} variants={itemVariants}>
                        <div className="text-sm text-gray-600 mb-1">
                          {label}
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={`${label}-${i}`}
                              className={`h-4 w-4 ${
                                i < score
                                  ? 'text-blue-500 fill-blue-500'
                                  : 'text-gray-300 fill-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                  <motion.p
                    className="text-gray-700 text-base"
                    variants={itemVariants}
                  >
                    {comment}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="border-t border-blue-100 pt-8"
          variants={itemVariants}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4 border-l-4 border-blue-500 pl-3"
            variants={itemVariants}
          >
            Add a Comment
          </motion.h2>
          <motion.div
            className="w-12 h-1 bg-blue-500 mb-4"
            variants={itemVariants}
          />
          <motion.p
            className="text-gray-600 text-base mb-6"
            variants={itemVariants}
          >
            Your email address will not be published.
          </motion.p>
          <form onSubmit={handleSubmit}>
            <motion.div
              className="flex flex-wrap gap-x-8 gap-y-4 mb-6"
              variants={containerVariants}
            >
              {['Quality', 'Location', 'Amenities'].map((label) => (
                <motion.div key={label} variants={itemVariants}>
                  <div className="text-gray-700 mb-1 text-base">{label}</div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.button
                        key={`${label}-${i}`}
                        type="button"
                        className={`h-5 w-5 ${
                          formData.ratings[label] >= i
                            ? 'text-blue-500 fill-blue-500'
                            : 'text-gray-300 fill-gray-300'
                        }`}
                        onClick={() => handleRatingChange(label, i)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Star />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ))}
              <motion.div
                className="ml-auto bg-blue-50 p-4 flex flex-col items-center justify-center rounded-md"
                variants={itemVariants}
              >
                <div className="text-blue-500 text-xl font-bold">
                  {calculateAverageRating()}
                </div>
                <div className="text-gray-600 text-sm">Average Rating</div>
              </motion.div>
            </motion.div>
            <motion.div
              className="flex flex-wrap gap-x-8 gap-y-4 mb-6"
              variants={containerVariants}
            >
              {['Services', 'Price'].map((label) => (
                <motion.div key={label} variants={itemVariants}>
                  <div className="text-gray-700 mb-1 text-base">{label}</div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.button
                        key={`${label}-${i}`}
                        type="button"
                        className={`h-5 w-5 ${
                          formData.ratings[label] >= i
                            ? 'text-blue-500 fill-blue-500'
                            : 'text-gray-300 fill-gray-300'
                        }`}
                        onClick={() => handleRatingChange(label, i)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Star />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
              variants={itemVariants}
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                className="w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                className="w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </motion.div>
            <motion.div className="mb-6" variants={itemVariants}>
              <textarea
                name="comment"
                placeholder="Write Your Comment"
                rows={6}
                className="w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={formData.comment}
                onChange={handleInputChange}
              />
            </motion.div>
            <motion.div
              className="flex items-center mb-6"
              variants={itemVariants}
            >
              <input
                type="checkbox"
                id="save-info"
                name="saveInfo"
                className="h-4 w-4 text-blue-500 border-blue-100 rounded focus:ring-blue-500 cursor-pointer"
                checked={formData.saveInfo}
                onChange={handleInputChange}
              />
              <label
                htmlFor="save-info"
                className="ml-2 text-gray-700 text-sm cursor-pointer"
              >
                Save my name, email, and website in this browser for the next
                time I comment.
              </label>
            </motion.div>
            <motion.button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md transition shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Post Comment
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

TourComments.propTypes = {};

export default TourComments;
