'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
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
    rootMargin: '-50px'
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

  // Mouse parallax effect
  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    mouseX.set(x);
    mouseY.set(y);
    setMousePosition({ x, y });
  }, [mouseX, mouseY]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);



  // Floating particles animation
  const floatingParticles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen pt-12 z-0 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
      aria-label="Hero section"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ willChange: 'transform' }}
    >
      {/* Enhanced Background Images with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {images.map((src, index) => (
            <motion.div
              key={`${src}-${index}`}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{
                opacity: index === currentImageIndex ? 1 : 0,
                scale: index === currentImageIndex ? 1 : 1.1,
                rotateX: isHovered ? rotateX : 0,
                rotateY: isHovered ? rotateY : 0,
              }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                willChange: 'transform, opacity',
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              <Image
                src={src}
                alt={`Hero background ${index + 1}`}
                fill
                className="object-cover object-center"
                sizes="100vw"
                priority={index === 0}
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Enhanced Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-blue-900/50 z-10" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {/* Floating Particles */}
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border border-blue-400/20 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 border border-indigo-400/20 rotate-45"
          animate={{
            rotate: [45, 405],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Enhanced Content Container */}
      <motion.div
        className="relative z-20 flex items-center justify-center min-h-[70vh] sm:min-h-[80vh] pt-16 sm:pt-20"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 1,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{ willChange: 'transform, opacity' }}
      >
        <HeroContent />
      </motion.div>



      {/* Performance Optimized CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
            transform: scale(1.05);
          }
        }
        
        .hero-section {
          will-change: transform;
          contain: layout style paint;
        }
        
        .hero-image {
          will-change: transform, opacity;
          contain: layout style paint;
        }
      `}</style>
    </section>
  );
}

export default HeroSection;

