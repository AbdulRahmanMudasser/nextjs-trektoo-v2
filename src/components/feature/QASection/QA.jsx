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

const ExpandableItem = ({ question, answer, isExpandedByDefault = false }) => {
  const [isExpanded, setIsExpanded] = useState(isExpandedByDefault);

  return (
    <motion.div
      className="border border-gray-200 rounded-2xl p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -2 }}
    >
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4 className="text-lg font-bold text-gray-900 tracking-tight m-0 pr-4">
          {question}
        </h4>
        <motion.div
          className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white flex-shrink-0"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </motion.div>
      </div>
      {isExpanded && (
        <motion.div
          className="mt-4 pt-4 border-t border-gray-100"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-gray-600 leading-relaxed text-base">
            {answer}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

ExpandableItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  isExpandedByDefault: PropTypes.bool,
};

const QASection = () => {
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Video Section */}
          <motion.div variants={sectionVariants}>
            <VideoSection />
          </motion.div>

          {/* Q&A Section */}
          <motion.div variants={sectionVariants}>
            <div className="space-y-6">
              <ExpandableItem
                question="How Much Price About Tour & Travels?"
                answer="Our tours are priced competitively, offering premium experiences starting from $129. From kayaking in Phuket to luxurious villas in the Maldives, we tailor adventures to your budget."
                isExpandedByDefault={true}
              />
              <ExpandableItem
                question="What Services Do You Provide?"
                answer="We offer comprehensive travel planning, including guided tours, accommodations, transportation, and 24/7 support to ensure a seamless and unforgettable journey."
              />
              <ExpandableItem
                question="Why Choose Our Travel Agency?"
                answer="With years of expertise, we curate personalized adventures to the world's most stunning destinations, delivering exceptional service and memorable experiences."
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

QASection.propTypes = {};

export default QASection;
