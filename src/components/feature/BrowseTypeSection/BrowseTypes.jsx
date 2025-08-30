'use client';

import React, { useRef } from 'react';
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
      sliderRef.current.scrollBy({ left: -208, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 208, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="relative text-center py-6 z-10"
      aria-label="Browse Types Section"
    >
      {/* Premium Header - Hidden */}
      {/* <div className="text-white text-center -mt-56 mb-10 animate-fade-in">
        <h2 className="text-xl sm:text-2xl  md:text-3xl lg:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-white">
          Browse By Categories
        </h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
      </div> */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer z-20 shadow-xl hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          aria-label="Scroll left"
        >
          <svg
            className="w-6 h-6"
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
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scroll-smooth gap-6 p-4 hide-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {types.map((type, index) => (
            <div
              key={index}
              className="flex-shrink-0 snap-center transform transition-transform duration-300 hover:scale-105"
            >
              <TypeCard
                title={type.title}
                type={type.type}
                description={type.description}
              />
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer z-20 shadow-xl hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          aria-label="Scroll right"
        >
          <svg
            className="w-6 h-6"
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
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        @media (min-width: 640px) {
          .hide-scrollbar {
            gap: 8px;
          }
        }
        @media (min-width: 1024px) {
          .hide-scrollbar {
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default BrowseTypes;
