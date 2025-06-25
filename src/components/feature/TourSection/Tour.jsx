'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaHeart,
  FaCamera,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
} from 'react-icons/fa';

const TourCard = ({
  image,
  title,
  location,
  price,
  duration,
  reviews,
  rating,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    hover: {
      scale: 1.02,
      boxShadow: '0 8px 24px rgba(59, 130, 246, 0.15)',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden bg-white/95 backdrop-blur-sm shadow-lg w-full max-w-[320px] sm:max-w-[360px] mx-auto border border-blue-50 flex flex-col h-[460px] sm:h-[480px]"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-[220px] sm:h-[240px] flex-shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 ease-out"
          style={{ transform: isHovered ? 'scale(1.08)' : 'scale(1)' }}
          quality={85}
          loading="lazy"
          placeholder="blur"
          blurDataURL={`${image.split('.')[0]}-placeholder.jpg`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <motion.div
          className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-medium tracking-wide uppercase px-2.5 py-1 rounded-full"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, ease: 'easeOut' }}
        >
          Featured
        </motion.div>
        <motion.div
          className="absolute top-3 right-3 bg-white/95 rounded-full w-9 h-9 flex items-center justify-center cursor-pointer hover:bg-blue-500/95 transition-all duration-300"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaHeart className="w-4 h-4 text-gray-600 hover:text-white transition-colors duration-300" />
        </motion.div>
        <motion.div
          className="absolute bottom-3 left-3 bg-white/95 rounded-full px-2.5 py-1 flex items-center text-xs font-medium text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ease: 'easeOut' }}
        >
          <FaCamera className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
          10
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center mb-3.5">
          {[...Array(5)].map((_, index) => (
            <motion.svg
              key={index}
              className={`w-4 h-4 sm:w-5 sm:h-5 mr-1 ${index < rating ? 'text-blue-500' : 'text-gray-200'}`}
              fill="currentColor"
              viewBox="0 0 24 24"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, ease: 'easeOut' }}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </motion.svg>
          ))}
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 tracking-tight line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
          {title}
        </h3>
        <div className="flex items-center mb-3 text-gray-600 text-sm sm:text-base">
          <FaMapMarkerAlt className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
          <span className="line-clamp-1">{location}</span>
        </div>
        <div className="flex items-center mb-4 text-gray-600 text-sm sm:text-base">
          <FaClock className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
          <span className="mr-4">{duration}</span>
          <FaUsers className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
          <span>{reviews}</span>
        </div>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-base sm:text-lg font-bold text-gray-900">
            {price}
          </span>
          <motion.button
            className="text-sm font-semibold text-blue-500 hover:text-blue-600 flex items-center group"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore
            <svg
              className="w-4 h-4 ml-1.5 group-hover:ml-2.5 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>
      </div>
      <svg
        className="absolute bottom-0 left-0 w-full h-10 text-blue-50"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,80L48,74.7C96,69,192,59,288,53.3C384,48,480,48,576,64C672,80,768,112,864,117.3C960,123,1056,101,1152,90.7C1248,80,1344,80,1392,80L1440,80L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
          fill="currentColor"
        />
      </svg>
    </motion.div>
  );
};

TourCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  reviews: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

const Tour = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tours = [
    {
      image:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      title: 'Discovery Island Kayak Tour',
      location: 'Phuket, Thailand',
      price: 'From $129.00',
      duration: '3 days',
      reviews: '10',
      rating: 5,
    },
    {
      image:
        'https://images.unsplash.com/photo-1526772662000-3f88f10405a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      title: 'Beautiful Floating Villa',
      location: 'Maldives',
      price: 'From $1290.00',
      duration: '5 days',
      reviews: '12',
      rating: 5,
    },
    {
      image:
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      title: 'Yucatán Peninsula Adventure',
      location: 'Cancún, Mexico',
      price: 'From $619.00',
      duration: '3 days',
      reviews: '12',
      rating: 4,
    },
    {
      image:
        'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
      title: 'Boathouse Neighborhood',
      location: 'Amsterdam, Netherlands',
      price: 'From $199.00',
      duration: '2 days',
      reviews: '12',
      rating: 5,
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.15 },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="relative w-full py-12 sm:py-1 px-0"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      aria-labelledby="tour-section-heading"
    >
      <div className="w-full">
        <motion.div
          className="bg-white/95 p-6 sm:p-8 border max-w-8xl mx-auto"
          variants={sectionVariants}
        >
          <div className="text-center mb-8 sm:mb-10">
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight"
              variants={sectionVariants}
            >
              Discover Extraordinary Adventures
            </motion.h2>
            <motion.p
              className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-4 leading-relaxed"
              variants={sectionVariants}
            >
              Embark on unforgettable journeys to the world’s most breathtaking
              destinations.
            </motion.p>
          </div>
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            <AnimatePresence>
              {tours.map((tour, index) => (
                <TourCard
                  key={index}
                  image={tour.image}
                  title={tour.title}
                  location={tour.location}
                  price={tour.price}
                  duration={tour.duration}
                  reviews={tour.reviews}
                  rating={tour.rating}
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

Tour.propTypes = {};

export default Tour;
