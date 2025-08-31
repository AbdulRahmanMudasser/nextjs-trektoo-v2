'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const VideoSection = () => {
  return (
    <motion.div
      className="relative w-full pt-[56.25%] rounded-3xl overflow-hidden shadow-2xl"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* YouTube Video Embed */}
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-3xl"
        src="https://www.youtube.com/embed/278IRQ6HSi4?si=-ITT0DEL4dU3Sx11&autoplay=0&rel=0&modestbranding=1"
        title="Trektoo Adventure Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      
      {/* Enhanced overlay with gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      
      {/* Enhanced decorative elements */}
      <motion.div 
        className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{ willChange: 'transform, opacity' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.7, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-4 left-4 w-2 h-2 bg-blue-400 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        style={{ willChange: 'transform, opacity' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
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
      transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94], staggerChildren: 0.3 },
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
        stiffness: 100
      }
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
        ease: [0.25, 0.46, 0.45, 0.94]
      }
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
      {/* Enhanced background with animated elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated gradient circles */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Floating particles */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-indigo-400 rounded-full"
          animate={{
            y: [0, 15, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                 {/* Enhanced Header Section */}
         <motion.div
           className="text-center mb-16"
           variants={headerVariants}
         >
           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
             Enjoy{' '}
             <span className="text-blue-500">
               Real Adventure
             </span>
           </h2>
           
           <motion.p 
             className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
             variants={descriptionVariants}
           >
             Discover authentic experiences and get answers to your travel questions. 
             Let us guide you through every step of your adventure.
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
           <motion.div 
             variants={sectionVariants}
             className="relative"
           >
             <VideoSection />
           </motion.div>

          
        </motion.div>
      </div>
    </motion.section>
  );
};

AdventureVideoSection.propTypes = {};

export default AdventureVideoSection;
