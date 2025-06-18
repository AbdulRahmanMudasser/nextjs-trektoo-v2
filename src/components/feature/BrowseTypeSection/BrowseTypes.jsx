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
      className="relative text-center py-6"
      aria-label="Browse Types Section"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-20 shadow-lg hover:bg-blue-100/80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          aria-label="Scroll left"
        >
          <svg
            className="w-6 h-6 text-gray-800"
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
            <div key={index} className="flex-shrink-0 snap-center">
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
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-20 shadow-lg hover:bg-blue-100/80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          aria-label="Scroll right"
        >
          <svg
            className="w-6 h-6 text-gray-800"
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
