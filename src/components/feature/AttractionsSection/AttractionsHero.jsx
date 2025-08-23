'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, MapPin, Clock, Star, Zap } from 'lucide-react';
import Image from 'next/image';

const AttractionsHero = () => {
  const features = [
    { icon: Ticket, value: '1000+', label: 'Attractions' },
    { icon: MapPin, value: '100+', label: 'Cities' },
    { icon: Clock, value: 'Skip', label: 'Priority Access' },
    { icon: Star, value: '4.8/5', label: 'Rating' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/attractions-hero-bg.jpg"
          alt="World famous attractions and landmarks"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-purple-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            World's Most
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
              Amazing
            </span>
            Attractions
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Skip the lines, get exclusive access, and experience the world's most iconic landmarks, museums, and entertainment venues with our premium attraction tickets.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
            Browse Attractions
          </button>
          <button className="border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm bg-white/10 hover:bg-white/20">
            Skip-the-Line Passes
          </button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <feature.icon className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                <div className="text-3xl font-bold text-white mb-1">{feature.value}</div>
                <div className="text-sm text-gray-300">{feature.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 hidden lg:block"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
          <Ticket className="w-6 h-6 text-purple-400" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-20 hidden lg:block"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
          <Zap className="w-6 h-6 text-pink-400" />
        </div>
      </motion.div>
    </section>
  );
};

export default AttractionsHero;
