'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';

// Define interfaces for type safety
const Tour = PropTypes.shape({
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  tourCount: PropTypes.number.isRequired,
  destination: PropTypes.string.isRequired,
});

const TourCard = ({ imageUrl, tourCount, destination, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const country = destination.split('Travel to ')[1] || destination;

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: index * 0.1, duration: 0.5, ease: 'easeOut' },
    },
    hover: {
      scale: 1.03,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="relative bg-white/95 rounded-2xl w-full max-w-[300px] min-w-[280px] overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-50 backdrop-blur-sm"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-label={`Tour card for ${country}`}
    >
      <div className="relative w-full h-[350px] overflow-hidden">
        <Image
          src={imageUrl}
          alt={`Explore ${country} tours`}
          fill
          className="object-cover transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 300px"
          quality={85}
          placeholder="blur"
          blurDataURL={`${imageUrl.split('.')[0]}-placeholder.jpg`}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 50%)',
            pointerEvents: 'none',
          }}
        />
        <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide">
          {tourCount} Tour{tourCount !== 1 ? 's' : ''}
        </div>
        <div className="absolute bottom-6 left-0 right-0 text-center space-y-1">
          <motion.h3
            className="text-xl font-medium text-white bg-transparent m-0 relative z-10"
            animate={{ y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            Travel to
          </motion.h3>
          <motion.h3
            className="text-2xl font-extrabold text-white m-0 relative z-10"
            animate={{ y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {country}
          </motion.h3>
        </div>
      </div>
    </motion.div>
  );
};

TourCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  tourCount: PropTypes.number.isRequired,
  destination: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const AdventureTours = () => {
  const [tours, setTours] = useState([
    {
      id: '1',
      imageUrl: '/images/uk-adventure.jpg',
      tourCount: 3,
      destination: 'Travel to United Kingdom',
    },
    {
      id: '2',
      imageUrl: '/images/france-adventure.jpg',
      tourCount: 3,
      destination: 'Travel to France',
    },
    {
      id: '3',
      imageUrl: '/images/singapore-adventure.jpg',
      tourCount: 2,
      destination: 'Travel to Singapore',
    },
    {
      id: '4',
      imageUrl: '/images/thailand-adventure.jpg',
      tourCount: 1,
      destination: 'Travel to Thailand',
    },
    {
      id: '5',
      imageUrl: '/images/italy-adventure.png',
      tourCount: 4,
      destination: 'Travel to Italy',
    },
  ]);

  const sliderRef = useRef(null);
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.1, rotate: 5 },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <motion.section
        ref={ref}
        className="relative w-full py-12 sm:py-16 bg-blue-50/50 px-0 "
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        aria-labelledby="adventure-tours-heading"
      >
        <div className="w-full">
          <motion.div
            className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl p-6 sm:p-8 border border-blue-50 max-w-7xl mx-auto"
            variants={sectionVariants}
          >
            {/* <motion.h2
              id="adventure-tours-heading"
              className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              Explore Real Adventure
            </motion.h2> */}
            <div className="relative">
              {!isMobile && (
                <motion.button
                  onClick={scrollLeft}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-blue-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-50 backdrop-blur-sm"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  aria-label="Scroll tours left"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </motion.button>
              )}
              <div
                ref={sliderRef}
                className="flex flex-row gap-4 px-2 py-4 overflow-x-auto snap-x snap-mandatory scrollbar-hidden"
                style={{ scrollBehavior: 'smooth' }}
              >
                <AnimatePresence>
                  {tours.length > 0 ? (
                    tours.map((tour, index) => (
                      <motion.div
                        key={tour.id}
                        className="flex-none w-[280px] sm:w-[300px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <TourCard
                          imageUrl={tour.imageUrl}
                          tourCount={tour.tourCount}
                          destination={tour.destination}
                          index={index}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center w-full text-gray-600">
                      No tours available
                    </div>
                  )}
                </AnimatePresence>
              </div>
              {!isMobile && (
                <motion.button
                  onClick={scrollRight}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-blue-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-blue-50 backdrop-blur-sm"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  aria-label="Scroll tours right"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <style jsx>{`
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hidden {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </>
  );
};

AdventureTours.propTypes = {
  tours: PropTypes.arrayOf(Tour),
};

export default AdventureTours;
