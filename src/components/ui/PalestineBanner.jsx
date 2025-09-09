'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Heart,
  Star,
  Sparkles,
  Shield,
  Globe,
  Bird,
  Flame,
  Crown,
  Zap,
} from 'lucide-react';

const PalestineBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the banner
    const hasSeenBanner = localStorage.getItem('palestine-banner-dismissed');
    console.log('🔍 Palestine Banner - hasSeenBanner:', hasSeenBanner);

    // TEMPORARY: Always show for testing
    console.log('🔍 Palestine Banner - TEMPORARY: Always showing for testing');
    const timer = setTimeout(() => {
      console.log('🔍 Palestine Banner - Setting visible to true');
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);

    // Original code (commented out for testing):
    // if (!hasSeenBanner) {
    //   // Show banner after a short delay for better UX
    //   const timer = setTimeout(() => {
    //     console.log('🔍 Palestine Banner - Setting visible to true');
    //     setIsVisible(true);
    //   }, 1500);
    //   return () => clearTimeout(timer);
    // } else {
    //   console.log('🔍 Palestine Banner - Already dismissed, not showing');
    // }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('palestine-banner-dismissed', 'true');
    }, 500);
  };

  console.log(
    '🔍 Palestine Banner - isVisible:',
    isVisible,
    'isClosing:',
    isClosing
  );

  if (!isVisible) {
    console.log('🔍 Palestine Banner - Not visible, returning null');
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isClosing ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Full Screen Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isClosing ? 0 : 0.95 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/90 to-blue-900/90 backdrop-blur-md"
        />

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Geometric Shapes */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                scale: 0,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                rotate: 0,
              }}
              animate={{
                opacity: [0, 0.3, 0],
                scale: [0, 1, 0],
                rotate: [0, 360, 720],
                x: [null, Math.random() * window.innerWidth],
                y: [null, Math.random() * window.innerHeight],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 0.4,
                ease: 'easeInOut',
              }}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
            />
          ))}

          {/* Animated Blue Theme Colors */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.4, 0],
                scale: [0, 2, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
              className="absolute w-16 h-16 rounded-full"
              style={{
                background:
                  i % 3 === 0
                    ? 'linear-gradient(45deg, #3b82f6, #60a5fa)'
                    : i % 3 === 1
                      ? 'linear-gradient(45deg, #1e40af, #3b82f6)'
                      : 'linear-gradient(45deg, #dbeafe, #bfdbfe)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Main Banner Container */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.3,
            rotateY: -180,
            y: 100,
          }}
          animate={{
            opacity: isClosing ? 0 : 1,
            scale: isClosing ? 0.3 : 1,
            rotateY: isClosing ? -180 : 0,
            y: isClosing ? 100 : 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.3,
            rotateY: -180,
            y: 100,
          }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 25,
            duration: 1.2,
          }}
          className="relative max-w-5xl w-full mx-auto"
        >
          {/* Outer Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-blue-400/20 to-blue-600/20 rounded-3xl blur-3xl scale-110" />

          {/* Main Banner */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            {/* Multi-layered Border with Blue Theme */}
            <div className="relative p-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700">
              <div className="relative p-2 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900">
                <div className="relative p-2 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500">
                  <div className="relative p-2 bg-gradient-to-r from-white via-blue-50 to-white">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 overflow-hidden">
                      {/* Rotating Star Pattern */}
                      {[...Array(24)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 0.6, 0],
                            scale: [0, 1, 0],
                            rotate: [0, 360, 720],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: 'easeInOut',
                          }}
                          className="absolute"
                          style={{
                            left: `${(i % 6) * 16.66}%`,
                            top: `${Math.floor(i / 6) * 20}%`,
                          }}
                        >
                          <Star className="w-4 h-4 text-blue-400 fill-current" />
                        </motion.div>
                      ))}

                      {/* Floating Hearts */}
                      {[...Array(16)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{
                            opacity: [0, 0.8, 0],
                            y: [-30, -60, -90],
                            scale: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: 'easeOut',
                          }}
                          className="absolute"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                        >
                          <Heart className="w-5 h-5 text-blue-500 fill-current" />
                        </motion.div>
                      ))}

                      {/* Sparkle Effects */}
                      {[...Array(30)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                            rotate: [0, 180, 360],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: 'easeInOut',
                          }}
                          className="absolute"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                        >
                          <Sparkles className="w-3 h-3 text-blue-300" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Main Content */}
                    <div className="relative z-10 text-center py-12 px-8">

                      {/* Main Title with Advanced Typography */}
                      <motion.h1
                        initial={{ opacity: 0, y: 30, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="text-6xl md:text-7xl font-black mb-6 leading-tight"
                      >
                        <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent">
                          Long Live
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900 bg-clip-text text-transparent">
                          Palestine
                        </span>
                      </motion.h1>

                      {/* Subtitle with Enhanced Styling */}
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.8 }}
                        className="text-2xl md:text-3xl text-gray-700 mb-8 font-semibold"
                      >
                        Standing in Solidarity with the Palestinian People
                      </motion.p>

                      {/* Decorative Elements */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.4, duration: 1.5 }}
                        className="flex items-center justify-center mb-8"
                      >
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
                        <div className="w-8 h-8 mx-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center">
                          <Star className="w-5 h-5 text-white fill-current" />
                        </div>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full" />
                      </motion.div>

                      {/* Values Section */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.7, duration: 0.8 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
                      >
                        {[
                          {
                            icon: Shield,
                            text: 'Freedom',
                            color: 'from-blue-500 to-blue-600',
                          },
                          {
                            icon: Heart,
                            text: 'Justice',
                            color: 'from-blue-500 to-blue-600',
                          },
                          {
                            icon: Bird,
                            text: 'Peace',
                            color: 'from-blue-400 to-blue-500',
                          },
                          {
                            icon: Globe,
                            text: 'Unity',
                            color: 'from-blue-600 to-blue-700',
                          },
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: 2 + index * 0.2,
                              duration: 0.6,
                            }}
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="flex flex-col items-center space-y-2"
                          >
                            <div
                              className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}
                            >
                              <item.icon className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-sm font-semibold text-gray-700">
                              {item.text}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Additional Decorative Elements */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5, duration: 0.8 }}
                        className="flex items-center justify-center space-x-8 mb-8"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        >
                          <Crown className="w-8 h-8 text-blue-500" />
                        </motion.div>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Flame className="w-8 h-8 text-blue-500" />
                        </motion.div>
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        >
                          <Zap className="w-8 h-8 text-blue-400" />
                        </motion.div>
                      </motion.div>

                      {/* Close Button */}
                      <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 3, duration: 0.5 }}
                        whileHover={{ scale: 1.15, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleClose}
                        className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white/95 hover:bg-white shadow-xl flex items-center justify-center transition-all duration-300 group border-2 border-gray-200 hover:border-blue-300"
                      >
                        <X className="w-7 h-7 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                      </motion.button>
                    </div>

                    {/* Bottom Decorative Border */}
                    <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PalestineBanner;
