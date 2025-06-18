'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import HeroContent from './HeroContent';

function HeroSection() {
  const images = [
    '/images/hero-bg-1.jpg',
    '/images/hero-bg-2.jpg',
    '/images/hero-bg-3.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Slideshow interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      className="relative w-full min-h-screen pt-12 z-0 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Image container with overflow hidden for extra safety */}
      <div className="absolute inset-0 overflow-hidden">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Hero background ${index + 1}`}
            fill
            className={`object-cover object-top transition-opacity duration-1000 z-0 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            } animate-[zoomIn_25s_ease-in-out] md:animate-[zoomIn_25s_ease-in-out] sm:animate-[zoomInMobile_25s_ease-in-out]`}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, 100vw"
            priority={index === 0}
          />
        ))}
      </div>

      {/* Overlay with proper z-index */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content with higher z-index than overlay */}
      <div className="relative z-20 flex items-center justify-center min-h-screen pt-4">
        <HeroContent className="w-full max-w-5xl" />
      </div>
    </section>
  );
}

export default HeroSection;
