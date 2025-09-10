'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const VideoSection = () => {
  return (
    <motion.div
      className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-500 to-indigo-600"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{
        scale: 1.01,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Static Content Instead of Video */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <motion.div
            className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
          <h3 className="text-2xl font-bold mb-2">Watch Our Adventure</h3>
          <p className="text-blue-100">
            Experience the thrill of travel with TrekToo
          </p>
        </div>
      </div>

      {/* Simplified overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
};

VideoSection.propTypes = {};

const AdventureVideoSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.3,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      aria-labelledby="qa-section-heading"
    >
      {/* Simplified background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Single subtle gradient circle */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header Section */}
        <motion.div className="text-center mb-16" variants={headerVariants}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
            Enjoy <span className="text-blue-500">Real Adventure</span>
          </h2>

          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
            variants={descriptionVariants}
          >
            Discover authentic experiences and get answers to your travel
            questions. Let us guide you through every step of your adventure.
          </motion.p>
        </motion.div>

        {/* Enhanced Video Container */}
        <motion.div
          className="max-w-5xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Video Section with enhanced wrapper */}
          <motion.div variants={sectionVariants} className="relative">
            <VideoSection />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

AdventureVideoSection.propTypes = {};

export default AdventureVideoSection;
