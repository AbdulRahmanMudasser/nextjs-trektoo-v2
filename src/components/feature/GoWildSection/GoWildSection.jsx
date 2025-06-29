'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';

// ActivityItem Component
const ActivityItem = ({ activity, rotation }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hover: {
      scale: 1.05,
      rotate: 0,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="flex items-center bg-white/95 rounded-lg p-3 backdrop-blur-sm border border-blue-50"
      variants={itemVariants}
      initial="hidden"
      whileHover="hover"
      style={{ transform: `rotate(${rotation})` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="listitem"
      aria-label={activity}
    >
      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <span className="text-base font-medium text-gray-900">{activity}</span>
    </motion.div>
  );
};

ActivityItem.propTypes = {
  activity: PropTypes.string.isRequired,
  rotation: PropTypes.string.isRequired,
};

// TextContent Component
const TextContent = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="space-y-6 max-w-lg"
      variants={textVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.p
        className="text-lg text-white font-semibold bg-blue-500 inline-block px-4 py-2 rounded-md shadow-sm"
        whileHover={{ scale: 1.05 }}
      >
        Go Wild
      </motion.p>
      <motion.h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
        We are the most exciting company for travel and adventure
      </motion.h1>
      <motion.p className="text-base text-gray-600 leading-relaxed">
        Discover unforgettable experiences with Trektoo. From thrilling
        adventures to serene escapes, our curated tours offer something for
        every traveler. Join us to explore the world in style and comfort.
      </motion.p>
    </motion.div>
  );
};

// ActivityImage Component
const ActivityImage = () => {
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
    hover: {
      scale: 1.03,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="w-full max-w-[900px] h-[400px] sm:h-[500px] md:h-[550px] relative rounded-2xl overflow-hidden shadow-xl"
      variants={imageVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <Image
        src="/images/welcome-image.jpg"
        alt="Couple camping in tent"
        fill
        className="object-cover"
        sizes="(max-width: 900px) 100vw, 900px"
        loading="lazy"
        quality={85}
        placeholder="blur"
        blurDataURL="/images/welcome-image-placeholder.jpg"
      />
    </motion.div>
  );
};

// Main GoWildSection Component
const GoWildSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const activities = [
    'Family Camping',
    'Wild Camping',
    'Fishing',
    'Mountain Biking',
    'Luxury Cabin',
    'Couple Camping',
  ];
  const rotations = ['-5deg', '5deg', '-3deg', '3deg', '-4deg', '4deg'];

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
      className="relative w-full py-12 sm:py-16 bg-blue-50/50 px-0"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? 'visible' : {}}
      aria-labelledby="go-wild-heading"
    >
      <div className="w-full">
        <motion.div
          className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl p-6 sm:p-8 border border-blue-50 max-w-7xl mx-auto"
          variants={sectionVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Side: Text Content and Activities */}
            <motion.div className="space-y-8" variants={sectionVariants}>
              <TextContent />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.5,
                      ease: 'easeOut',
                    }}
                  >
                    <ActivityItem
                      activity={activity}
                      rotation={rotations[index % rotations.length]}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side: Image */}
            <motion.div
              className="flex justify-center md:justify-end"
              variants={sectionVariants}
            >
              <ActivityImage />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default GoWildSection;
