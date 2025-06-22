'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const ReviewScores = () => {
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

  const progressVariants = {
    hidden: { width: 0 },
    visible: (width) => ({
      width,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration: 1.5,
      },
    }),
  };

  return (
    <motion.div
      className="relative w-full max-w-7xl mx-auto mt-12 sm:mt-16 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="w-full bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-blue-50"
        variants={itemVariants}
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-6 border-l-4 border-blue-500 pl-3"
          variants={itemVariants}
        >
          Review Scores
        </motion.h2>
        <motion.div
          className="border border-blue-50 rounded-2xl overflow-hidden"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row">
            <motion.div
              className="p-8 md:w-1/3 border-b md:border-b-0 md:border-r border-blue-100"
              variants={itemVariants}
            >
              <div className="flex items-end">
                <motion.div
                  className="text-5xl sm:text-6xl font-extrabold text-gray-900"
                  variants={itemVariants}
                >
                  4.13
                </motion.div>
                <motion.div
                  className="text-lg text-gray-500 ml-1"
                  variants={itemVariants}
                >
                  /5
                </motion.div>
              </div>
              <motion.div
                className="text-lg text-blue-500 font-semibold mt-2"
                variants={itemVariants}
              >
                Wonderful
              </motion.div>
              <motion.div
                className="text-sm text-gray-600 mt-1"
                variants={itemVariants}
              >
                3 verified reviews
              </motion.div>
            </motion.div>
            <motion.div className="p-8 md:w-2/3" variants={itemVariants}>
              <div className="space-y-4">
                {[
                  { label: 'Quality', width: '73%', score: '3.67/5' },
                  { label: 'Location', width: '87%', score: '4.33/5' },
                  { label: 'Amenities', width: '93%', score: '4.67/5' },
                  { label: 'Services', width: '80%', score: '4/5' },
                  { label: 'Price', width: '80%', score: '4/5' },
                ].map(({ label, width, score }, index) => (
                  <motion.div
                    key={label}
                    className="flex items-center group"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-24 text-gray-700 text-base">{label}</div>
                    <div className="flex-1 mx-4">
                      <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-2 bg-blue-500 rounded-full group-hover:bg-blue-600 transition-colors duration-300"
                          custom={width}
                          initial="hidden"
                          animate="visible"
                          variants={progressVariants}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right text-gray-700 text-base">
                      {score}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

ReviewScores.propTypes = {};

export default ReviewScores;
