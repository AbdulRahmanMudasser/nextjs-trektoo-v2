'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import HeroContent from './HeroContent';

function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px',
  });

  const images = [
    '/images/hero-bg-1.jpg',
    '/images/hero-bg-2.jpg',
    '/images/hero-bg-3.jpg',
  ];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  // Enhanced slideshow with smooth transitions
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
          setIsTransitioning(false);
        }, 500);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length, isTransitioning]);

  // Removed mouse parallax for performance
  // const handleMouseMove = useCallback(
  //   (e) => {
  //     const rect = e.currentTarget.getBoundingClientRect();
  //     const x = e.clientX - rect.left - rect.width / 2;
  //     const y = e.clientY - rect.top - rect.height / 2;

  //     mouseX.set(x);
  //     mouseY.set(y);
  //     setMousePosition({ x, y });
  //   },
  //   [mouseX, mouseY]
  // );

  // const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  // const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  // Removed floating particles for performance
  // const floatingParticles = Array.from({ length: 5 }, (_, i) => ({
  //   id: i,
  //   x: Math.random() * 100,
  //   y: Math.random() * 100,
  //   size: Math.random() * 3 + 2,
  //   duration: Math.random() * 15 + 10,
  //   delay: Math.random() * 3,
  // }));

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen pt-12 z-0 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
      aria-label="Hero section"
    >
      {/* Simplified Background Images - Single Image for Performance */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={images[currentImageIndex]}
          alt={`Hero background ${currentImageIndex + 1}`}
          fill
          className="object-cover object-center transition-opacity duration-1000"
          sizes="100vw"
          priority={true}
          quality={60}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>

      {/* Enhanced Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-blue-900/50 z-10" />

      {/* Removed floating particles for performance */}

      {/* Simplified Content Container */}
      <div className="relative z-20 flex items-center justify-center min-h-[70vh] sm:min-h-[80vh] pt-16 sm:pt-20">
        <HeroContent />
      </div>

      {/* Removed CSS animations for performance */}
    </section>
  );
}

export default HeroSection;
