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
  const country = destination.split('Travel to ')[1];

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
    }),
    hover: {
      scale: 1.03,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="relative bg-white rounded-2xl w-full max-w-[300px] min-w-[280px] overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      custom={index}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-label={`Tour card for ${country}`}
    >
      <div className="relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={`Explore ${country} tours`}
          width={300}
          height={350}
          className="w-full h-[350px] object-cover transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 300px"
          quality={75}
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
            className="text-xl font-light text-white bg-transparent m-0 relative z-10"
            animate={{ y: isHovered ? -10 : 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            Travel to
          </motion.h3>
          <motion.h3
            className="text-2xl font-bold text-white m-0 relative z-10"
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
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
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
    visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, rotate: 5 },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <motion.section
        ref={ref}
        className="relative w-full py-16 overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        aria-labelledby="adventure-tours-heading"
      >
        {/* Background Image with Opacity */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/world-bg-2.png"
            alt="World map background"
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
          <motion.h2
            id="adventure-tours-heading"
            className="text-4xl md:text-5xl font-extrabold text-center text-white mb-12 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Explore Real Adventure
          </motion.h2>
          <div className="relative">
            {!isMobile && (
              <motion.button
                onClick={scrollLeft}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-blue-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className={`flex ${isMobile ? 'flex-col items-center gap-6' : 'overflow-x-auto snap-x snap-center gap-4 px-2 py-4 scrollbar-hidden'}`}
            >
              <AnimatePresence>
                {tours.map((tour, index) => (
                  <motion.div
                    key={tour.id}
                    className={`flex-none ${isMobile ? 'w-full max-w-[320px]' : 'max-w-[300px] min-w-[280px]'}`}
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
                ))}
              </AnimatePresence>
            </div>
            {!isMobile && (
              <motion.button
                onClick={scrollRight}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-blue-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
