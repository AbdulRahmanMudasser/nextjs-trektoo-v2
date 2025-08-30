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
      transition: { duration: 1, ease: 'easeOut', staggerChildren: 0.3 },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
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
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                 <motion.div
           className="text-center mb-16"
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
         >
           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
             Plan Your Adventure
           </h2>
           
           <motion.p 
             className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2, duration: 0.6 }}
           >
             Let us help you create the perfect journey with our expert planning, 
             trusted partnerships, and personalized travel experiences.
           </motion.p>
         </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          {/* FeatureCard - Safety */}
          <motion.div
            className="text-center p-8 rounded-2xl bg-white transition-all duration-300 border border-gray-200 hover:border-blue-500 group"
            variants={featureVariants}
            whileHover={{ y: -4 }}
          >
            <motion.div
              className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Compass className="w-10 h-10" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-500 transition-colors duration-200">
              Uncompromising Safety
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              Your safety is our priority. We partner with trusted
              providers to ensure worry-free adventures.
            </p>
          </motion.div>

          {/* FeatureCard - Price */}
          <motion.div
            className="text-center p-8 rounded-2xl bg-white transition-all duration-300 border border-gray-200 hover:border-blue-500 group"
            variants={featureVariants}
            whileHover={{ y: -4 }}
          >
            <motion.div
              className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <MapPin className="w-10 h-10" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-500 transition-colors duration-200">
              Affordable Luxury
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              Exceptional experiences at competitive prices, designed to
              make your dream trip a reality.
            </p>
          </motion.div>

          {/* FeatureCard - Guide */}
          <motion.div
            className="text-center p-8 rounded-2xl bg-white transition-all duration-300 border border-gray-200 hover:border-blue-500 group"
            variants={featureVariants}
            whileHover={{ y: -4 }}
          >
            <motion.div
              className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <Globe className="w-10 h-10" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-500 transition-colors duration-200">
              Expert Guides
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              Our knowledgeable guides bring destinations to life with
              insider tips and personalized care.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;
