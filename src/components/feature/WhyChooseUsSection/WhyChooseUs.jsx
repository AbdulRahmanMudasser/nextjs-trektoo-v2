'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, Compass, MapPin } from 'lucide-react';

const WhyChooseUs = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, ease: 'easeOut', staggerChildren: 0.2 },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 20
      }
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
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
  };

  const backgroundVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.5, ease: "easeOut" }
    },
  };

  return (
    <motion.section
      ref={ref}
      className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      aria-labelledby="plan-your-adventure-heading"
    >
      {/* Enhanced background texture */}
      <motion.div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        variants={backgroundVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`
        }}></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6"
            style={{ willChange: 'transform, opacity' }}
          >
            Plan Your{' '}
            <span className="text-blue-500">
              Adventure
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ willChange: 'transform, opacity' }}
          >
            Let us help you create the perfect journey with our expert planning, 
            trusted partnerships, and personalized travel experiences.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* FeatureCard - Safety */}
          <motion.div
            className="text-center p-8 rounded-2xl bg-white transition-all duration-300 border border-gray-200 hover:border-blue-500 group shadow-lg hover:shadow-xl"
            variants={featureVariants}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            style={{ willChange: 'transform' }}
          >
            <motion.div
              className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg"
              whileHover={{ 
                rotate: 360, 
                scale: 1.1,
                transition: { duration: 0.5, ease: "easeOut" }
              }}
              transition={{ duration: 0.5 }}
              style={{ willChange: 'transform' }}
            >
              <Compass className="w-10 h-10" />
            </motion.div>
            <motion.h3 
              className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-500 transition-colors duration-200"
              style={{ willChange: 'color' }}
            >
              Uncompromising Safety
            </motion.h3>
            <motion.p 
              className="text-gray-600 leading-relaxed text-base"
              style={{ willChange: 'opacity' }}
            >
              Your safety is our priority. We partner with trusted
              providers to ensure worry-free adventures.
            </motion.p>
          </motion.div>

          {/* FeatureCard - Price */}
          <motion.div
            className="text-center p-8 rounded-2xl bg-white transition-all duration-300 border border-gray-200 hover:border-blue-500 group shadow-lg hover:shadow-xl"
            variants={featureVariants}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            style={{ willChange: 'transform' }}
          >
            <motion.div
              className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg"
              whileHover={{ 
                rotate: 360, 
                scale: 1.1,
                transition: { duration: 0.5, ease: "easeOut" }
              }}
              transition={{ duration: 0.5 }}
              style={{ willChange: 'transform' }}
            >
              <Globe className="w-10 h-10" />
            </motion.div>
            <motion.h3 
              className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-500 transition-colors duration-200"
              style={{ willChange: 'color' }}
            >
              Best Value Guarantee
            </motion.h3>
            <motion.p 
              className="text-gray-600 leading-relaxed text-base"
              style={{ willChange: 'opacity' }}
            >
              We offer competitive prices and exclusive deals that
              give you the best value for your travel investment.
            </motion.p>
          </motion.div>

          {/* FeatureCard - Experience */}
          <motion.div
            className="text-center p-8 rounded-2xl bg-white transition-all duration-300 border border-gray-200 hover:border-blue-500 group shadow-lg hover:shadow-xl"
            variants={featureVariants}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            style={{ willChange: 'transform' }}
          >
            <motion.div
              className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg"
              whileHover={{ 
                rotate: 360, 
                scale: 1.1,
                transition: { duration: 0.5, ease: "easeOut" }
              }}
              transition={{ duration: 0.5 }}
              style={{ willChange: 'transform' }}
            >
              <MapPin className="w-10 h-10" />
            </motion.div>
            <motion.h3 
              className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-500 transition-colors duration-200"
              style={{ willChange: 'color' }}
            >
              Expert Local Knowledge
            </motion.h3>
            <motion.p 
              className="text-gray-600 leading-relaxed text-base"
              style={{ willChange: 'opacity' }}
            >
              Our local experts provide insider knowledge and
              authentic experiences you won't find elsewhere.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;
