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
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="flex items-center bg-white/90 rounded-lg p-3 backdrop-blur-sm"
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
      <p className="text-2xl md:text-4xl text-gray-600 font-bold">
        Welcome to Trektoo
      </p>
      <h1 className="text-xl md:text-2xl font-400 text-white leading-tight">
        We are the most exciting company for travel and adventure
      </h1>
      <p className="text-base text-white leading-relaxed">
        Discover unforgettable experiences with Trektoo. From thrilling
        adventures to serene escapes, our curated tours offer something for
        every traveler. Join us to explore the world in style and comfort.
      </p>
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
  };

  return (
    <motion.div
      className="w-full max-w-[900px] h-[400px] md:h-[550px] relative rounded-t-[100px] overflow-hidden"
      variants={imageVariants}
      initial="hidden"
      animate="visible"
    >
      <Image
        src="/images/welcome-image.jpg"
        alt="Couple camping in tent"
        fill
        className="object-cover"
        sizes="(max-width: 900px) 100vw, 900px"
        loading="lazy"
        quality={75}
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
    visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <motion.section
      ref={ref}
      className="relative w-full py-20 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? 'visible' : {}}
      aria-labelledby="go-wild-heading"
    >
      {/* Background Image with Opacity */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/welcome-bg.jpg"
          alt="Adventure landscape background"
          fill
          className="object-cover opacity-45"
          loading="lazy"
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Custom SVG Animation */}
      <motion.svg
        className="absolute top-0 left-0 w-full h-24 text-blue-500/20"
        viewBox="0 0 1440 100"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 2, ease: 'easeInOut' }}
      >
        <path
          d="M0,50 Q360,20 720,50 T1440,50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="10 5"
        />
      </motion.svg>

      <div className="relative max-w-full px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Side: Text Content and Activities */}
          <div className="space-y-8">
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
          </div>

          {/* Right Side: Image */}
          <div className="flex justify-center md:justify-end">
            <ActivityImage />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default GoWildSection;
