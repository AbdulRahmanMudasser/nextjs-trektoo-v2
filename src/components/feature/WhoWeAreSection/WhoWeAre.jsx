'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';

const ProgressCircle = ({ percentage, label }) => {
  const circleVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      variants={circleVariants}
      whileHover="hover"
    >
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center relative"
        style={{
          background: `conic-gradient(#3B82F6 ${percentage}%, #E5E7EB ${percentage}%)`,
        }}
      >
        <motion.div
          className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-base font-semibold text-gray-900 shadow-sm"
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.2, duration: 0.4 } }}
        >
          {percentage}%
        </motion.div>
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </motion.div>
  );
};

ProgressCircle.propTypes = {
  percentage: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

const HalfRoundedImage = () => {
  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-xl"
      variants={imageVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <Image
        src="/images/who-we-are.png"
        alt="Selfie outdoor camping"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        loading="lazy"
        quality={85}
        placeholder="blur"
        blurDataURL="/images/who-we-are-placeholder.png"
      />
    </motion.div>
  );
};

const WhoWeAreSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="relative w-full py-12 sm:py-16 bg-blue-50/50 px-0"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? 'visible' : {}}
      aria-labelledby="who-we-are-heading"
    >
      <div className="w-full">
        <motion.div
          className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl p-6 sm:p-8 border border-blue-50 max-w-7xl mx-auto"
          variants={sectionVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Image */}
            <motion.div className="flex-1" variants={itemVariants}>
              <HalfRoundedImage />
            </motion.div>

            {/* Right Content */}
            <motion.div className="flex-1 space-y-6" variants={itemVariants}>
              <motion.p
                className="text-lg text-white font-semibold bg-blue-500 inline-block px-4 py-2 rounded-md shadow-sm"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                Who We Are
              </motion.p>

              <motion.h1
                className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight"
                variants={itemVariants}
              >
                Great opportunity for adventure & travels
              </motion.h1>

              <motion.p
                className="text-base text-gray-600 leading-relaxed"
                variants={itemVariants}
              >
                As a trusted travel agency and hotel booking partner, we
                specialize in seamless journey planning, curated tours, and
                top-rated accommodations worldwide. Whether you're chasing
                adventure or relaxation, we make travel easy, personalized, and
                memorable from the first click to your final destination.
              </motion.p>

              <motion.div
                className="flex bg-white/95 rounded-2xl p-6 sm:p-8 shadow-sm border border-blue-50 gap-12 items-center justify-center max-w-xl mt-8"
                variants={itemVariants}
              >
                <ProgressCircle percentage={92} label="Satisfied Clients" />
                <div className="w-0.5 bg-blue-100 h-24" />
                <ProgressCircle percentage={95} label="Success Rate" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

WhoWeAreSection.propTypes = {};

export default WhoWeAreSection;
