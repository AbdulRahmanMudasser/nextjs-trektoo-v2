'use client';

import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypeCard from './TypeCard';

const BrowseTypes = () => {
  const types = [
    {
      title: 'Adventure',
      type: 'adventure',
      description:
        'Explore thrilling treks and outdoor challenges in rugged terrains.',
    },
    {
      title: 'Discovery',
      type: 'discovery',
      description:
        'Uncover hidden gems and cultural landmarks with guided tours.',
    },
    {
      title: 'Mountain Biking',
      type: 'mountain-biking',
      description:
        'Ride through scenic trails with challenging ascents and descents.',
    },
    {
      title: 'Beach Escape',
      type: 'beache',
      description:
        'Relax on sandy shores with crystal-clear waters and water sports.',
    },
    {
      title: 'Wildlife Safari',
      type: 'adventure',
      description:
        'Experience wildlife up close in natural habitats and reserves.',
    },
    {
      title: 'Hiking Expedition',
      type: 'adventure',
      description:
        'Embark on multi-day hikes with breathtaking mountain views.',
    },
    {
      title: 'Cultural Tour',
      type: 'discovery',
      description:
        'Immerse in local traditions and historical sites with expert guides.',
    },
  ];

  const sliderRef = useRef(null);

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

  return (
    <div
      className="relative -mt-28 text-center py-6"
      style={{ background: 'transparent' }}
      aria-label="Browse Types Section"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center cursor-pointer z-20 shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          aria-label="Scroll left"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <motion.div
          ref={sliderRef}
          className="flex overflow-x-auto scroll-smooth gap-4 p-4 hide-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <AnimatePresence>
            {types.map((type, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 snap-center"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TypeCard
                  title={type.title}
                  type={type.type}
                  description={type.description}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center cursor-pointer z-20 shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          aria-label="Scroll right"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @media (min-width: 640px) {
          .hide-scrollbar {
            gap: 1.5rem;
          }
        }
        @media (min-width: 1024px) {
          .hide-scrollbar {
            gap: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BrowseTypes;
