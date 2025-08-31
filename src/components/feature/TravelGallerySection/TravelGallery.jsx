'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';

const GalleryCard = ({ image, title, subtitle, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-gray-100"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[360px]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={80}
          loading="lazy"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center space-y-3">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto shadow-lg"
              whileHover={{ scale: 1.2, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <FaPlus className="text-white text-xl" />
            </motion.div>
            <h3 className="text-xl font-bold text-white capitalize tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-blue-200 uppercase tracking-widest font-medium">
              {subtitle}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

GalleryCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const TravelGallerySection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1200);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const galleryImages = [
    {
      image: '/images/gallery/gallery-islands.jpg',
      title: 'Tropical Islands',
      subtitle: 'Adventure Awaits',
    },
    {
      image: '/images/gallery/gallery-mountain.jpg',
      title: 'Alpine Peaks',
      subtitle: 'Serenity Found',
    },
    {
      image: '/images/gallery/gallery-city.jpg',
      title: 'Urban Escape',
      subtitle: 'Cultural Dive',
    },
    {
      image: '/images/gallery/gallery-beach.jpg',
      title: 'Desert Odyssey',
      subtitle: 'Mystic Sands',
    },
    {
      image: '/images/gallery/gallery-forest.jpg',
      title: 'Coastal Haven',
      subtitle: 'Ocean Breeze',
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          
                  <h2 className="text-4xl md:text-5xl font-bold text-blue-500 tracking-tight">
          Explore Your Next Adventure
        </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover breathtaking destinations that ignite your wanderlust and
            create unforgettable memories.
          </p>
        </motion.div> */}

        <motion.div
          className={`grid gap-6 ${
            isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'
          }`}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          {galleryImages.map((item, index) => (
            <GalleryCard
              key={index}
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

TravelGallerySection.propTypes = {};

export default TravelGallerySection;
