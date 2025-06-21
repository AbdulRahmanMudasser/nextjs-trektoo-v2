'use client';

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

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
            gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth;
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
    '/images/hero-bg-1.jpg',
    '/images/hero-bg-1.jpg',
    '/images/hero-bg-1.jpg',
    '/images/hero-bg-2.jpg',
    '/images/hero-bg-2.jpg',
    '/images/hero-bg-2.jpg',
  ];

  return (
    <div className="relative w-full" tabIndex={0} onKeyDown={handleKeyDown}>
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-2 rounded-r hover:bg-black/70 transition-all duration-300"
        aria-label="Scroll left"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <div
        ref={galleryRef}
        className="w-full overflow-x-hidden whitespace-nowrap cursor-pointer flex items-center gap-4 py-4"
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-64 flex-shrink-0"
          >
            <Image
              src={src}
              alt={`Gallery Image ${index + 1}`}
              fill
              className="object-cover transition-all duration-300 hover:scale-105 hover:shadow-lg rounded-lg"
            />
          </div>
        ))}
      </div>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 p-2 rounded-l hover:bg-black/70 transition-all duration-300"
        aria-label="Scroll right"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

ImageGallery.propTypes = {};

export default ImageGallery;
