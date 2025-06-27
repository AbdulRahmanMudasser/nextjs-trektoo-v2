'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const NotFound = () => {
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
      className="relative w-full py-8 sm:py-12 md:py-16 mt-10 bg-blue-50/50 px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      aria-label="404 Not Found Page"
    >
      <div className="w-full max-w-screen-xl mx-auto">
        <motion.div
          className="bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-blue-50"
          variants={sectionVariants}
        >
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            {/* Left Section - Image */}
            <motion.div className="w-full md:w-1/2" variants={itemVariants}>
              <div className="relative w-full h-[200px] xs:h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-xl sm:rounded-2xl shadow-lg">
                <Image
                  src="/images/error/404-placeholder.jpg"
                  alt="Lost traveler in a scenic landscape"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  quality={90}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="/images/error/404-placeholder.jpg"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                />
              </div>
            </motion.div>

            {/* Right Section - Content */}
            <motion.div
              className="w-full md:w-1/2 text-center md:text-left"
              variants={itemVariants}
            >
              <motion.h1
                className="text-3xl xs:text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 tracking-tight"
                variants={itemVariants}
              >
                404 - Page Not Found
              </motion.h1>
              <motion.p
                className="text-sm xs:text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed"
                variants={itemVariants}
              >
                Oops! It looks like you've wandered off the beaten path. The
                page you're looking for doesn't exist, but don't worry—there are
                plenty of adventures waiting for you!
              </motion.p>
              <motion.div variants={itemVariants}>
                <Link href="/">
                  <motion.div
                    className="inline-block bg-blue-500 text-white font-semibold px-4 xs:px-5 sm:px-6 md:px-8 py-2 xs:py-2.5 rounded-lg hover:bg-blue-600 transition-all duration-300 text-sm xs:text-base sm:text-lg shadow-md"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back to Home
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default NotFound;
