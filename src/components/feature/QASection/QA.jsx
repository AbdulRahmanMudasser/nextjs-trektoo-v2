'use client';

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const PlayButton = ({ onClick, isPlaying }) => {
  if (isPlaying) return null;

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaPlay className="w-6 h-6 text-white ml-1" />
    </motion.div>
  );
};

PlayButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

const VideoSection = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      className="relative w-full pt-[56.25%] rounded-2xl overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-paradise-beach-42347-large.mp4"
        loop
        muted
        playsInline
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <PlayButton onClick={handlePlayPause} isPlaying={isPlaying} />
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
      transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      aria-labelledby="qa-section-heading"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Enjoy Real Adventure
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover authentic experiences and get answers to your travel questions. 
            Let us guide you through every step of your adventure.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Video Section */}
          <motion.div variants={sectionVariants}>
            <VideoSection />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

AdventureVideoSection.propTypes = {};

export default AdventureVideoSection;
