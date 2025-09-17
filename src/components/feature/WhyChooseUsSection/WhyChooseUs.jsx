'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, Compass, MapPin } from 'lucide-react';

const WhyChooseUs = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Animation variants matching Hero Section
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden"
      aria-labelledby="plan-your-adventure-heading"
    >
      {/* Background Pattern - Matching Hero Section */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid-why"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="#2196F3"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid-why)" />
        </svg>
      </div>

      {/* Decorative Elements - Matching Hero Section */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-300/10 to-blue-500/10 rounded-full blur-lg"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight mb-6"
              style={{
                fontFamily:
                  "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                letterSpacing: '-0.02em',
              }}
            >
              Why Choose{' '}
              <span className="text-blue-500 relative">
                TREKTOO
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C50 2 100 2 198 10"
                    stroke="#E0C097"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
          </motion.div>
          <motion.div variants={itemVariants}>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Experience the difference with our commitment to safety, value,
              and authentic local expertise that makes every journey
              unforgettable.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* FeatureCard - Safety */}
          <motion.div
            variants={itemVariants}
            className="text-center p-8 rounded-3xl bg-white transition-all duration-300 border border-gray-200 hover:border-blue-500 group shadow-2xl hover:shadow-2xl hover:shadow-blue-500/10"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Compass className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-500 transition-colors duration-200">
              Safety First
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              Your security is our top priority. We work exclusively with
              verified, trusted partners to ensure every adventure is safe and
              worry-free.
            </p>
          </motion.div>

          {/* FeatureCard - Price */}
          <motion.div
            variants={itemVariants}
            className="text-center p-8 rounded-3xl bg-white transition-all duration-300 border border-gray-200 hover:border-blue-500 group shadow-2xl hover:shadow-2xl hover:shadow-blue-500/10"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Globe className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-500 transition-colors duration-200">
              Best Value
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              Get the most out of your travel budget with our competitive
              pricing, exclusive deals, and transparent pricing with no hidden
              fees.
            </p>
          </motion.div>

          {/* FeatureCard - Experience */}
          <motion.div
            variants={itemVariants}
            className="text-center p-8 rounded-3xl bg-white transition-all duration-300 border border-gray-200 hover:border-blue-500 group shadow-2xl hover:shadow-2xl hover:shadow-blue-500/10"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <MapPin className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-500 transition-colors duration-200">
              Local Experts
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              Discover hidden gems and authentic experiences with our network of
              local experts who know the best-kept secrets of every destination.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
