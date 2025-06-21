'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageGallery = () => {
  const galleryRef = useRef(null);

  const scrollLeft = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const gallery = galleryRef.current;
    let scrollInterval;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (gallery) {
          const isAtEnd =
            gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth - 1;
          if (isAtEnd) {
            gallery.scrollLeft = 0;
          } else {
            gallery.scrollLeft += 1;
          }
        }
      }, 30);
    };

    const stopAutoScroll = () => {
      clearInterval(scrollInterval);
    };

    gallery?.addEventListener('mouseenter', stopAutoScroll);
    gallery?.addEventListener('mouseleave', startAutoScroll);
    startAutoScroll();

    return () => {
      stopAutoScroll();
      gallery?.removeEventListener('mouseenter', stopAutoScroll);
      gallery?.removeEventListener('mouseleave', startAutoScroll);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      scrollLeft();
    } else if (e.key === 'ArrowRight') {
      scrollRight();
    }
  };

  const images = [
    '/images/hero-bg-1.jpg',
    '/images/hero-bg-2.jpg',
    '/images/hero-bg-3.jpg',
    '/images/hero-bg-1.jpg',
    '/images/hero-bg-2.jpg',
    '/images/hero-bg-3.jpg',
    '/images/hero-bg-2.jpg',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      className="relative w-full max-w-7xl mx-auto mt-12 sm:mt-16 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <motion.div className="relative" variants={itemVariants}>
        <motion.button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-6 sm:-ml-12 z-10 bg-blue-50 text-blue-500 p-3 rounded-full shadow-sm hover:bg-blue-500 hover:text-white transition-all duration-300"
          aria-label="Scroll left"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="h-6 w-6" />
        </motion.button>
        <div
          ref={galleryRef}
          className="w-full overflow-x-hidden whitespace-nowrap flex items-center gap-4 sm:gap-6 py-4"
        >
          {images.map((src, index) => (
            <motion.div
              key={index}
              className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-64 sm:h-72 lg:h-80 flex-shrink-0 rounded-2xl overflow-hidden group"
              variants={itemVariants}
              whileHover={{ scale: 1.03, x: 5 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <Image
                src={src}
                alt={`Gallery Image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                placeholder="blur"
                blurDataURL="/default-tour.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div
                className="absolute bottom-4 left-4 bg-blue-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100"
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1 }}
              >
                View Details
              </motion.div>
            </motion.div>
          ))}
        </div>
        <motion.button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-6 sm:-mr-12 z-10 bg-blue-50 text-blue-500 p-3 rounded-full shadow-sm hover:bg-blue-500 hover:text-white transition-all duration-300"
          aria-label="Scroll right"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight className="h-6 w-6" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

ImageGallery.propTypes = {};

export default ImageGallery;
