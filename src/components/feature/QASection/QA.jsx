'use client';

import React, { useState, useEffect, useRef } from 'react';
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
      className="border border-blue-50 rounded-xl p-4 mb-4 bg-white/95 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4 className="text-lg font-semibold text-gray-900 tracking-tight m-0">
          {question}
        </h4>
        <motion.svg
          className="w-5 h-5 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </div>
      {isExpanded && (
        <motion.p
          className="text-sm text-gray-600 mt-3 leading-relaxed"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {answer}
        </motion.p>
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
  const [isMobile, setIsMobile] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      className="relative w-full py-12 sm:py-16 bg-blue-50/50 px-0 "
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      aria-labelledby="qa-section-heading"
    >
      <div className="w-full">
        <motion.div
          className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl p-6 sm:p-8 border border-blue-50 max-w-7xl mx-auto"
          variants={sectionVariants}
        >
          <motion.div
            className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-start gap-8`}
            variants={sectionVariants}
          >
            {/* Video Section */}
            <motion.div
              className={isMobile ? 'w-full' : 'flex-1 max-w-[60%]'}
              variants={sectionVariants}
            >
              <VideoSection />
            </motion.div>

            {/* Q&A Sidebar */}
            <motion.div
              className={isMobile ? 'w-full' : 'flex-1 max-w-[40%]'}
              variants={sectionVariants}
            >
              <motion.p
                className="text-lg text-white font-semibold bg-blue-500 inline-block px-4 py-2 rounded-md shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                Availability
              </motion.p>

              <motion.h2
                className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-6 mt-6"
                variants={sectionVariants}
              >
                Enjoy Real Adventure
              </motion.h2>

              {/* Expandable Items */}
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
                answer="With years of expertise, we curate personalized adventures to the world’s most stunning destinations, delivering exceptional service and memorable experiences."
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

QASection.propTypes = {};

export default QASection;
