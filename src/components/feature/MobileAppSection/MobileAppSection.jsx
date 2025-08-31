'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { 
  Smartphone, 
  Download, 
  Star, 
  Users, 
  Zap, 
  Shield, 
  Globe, 
  ArrowRight,
  CheckCircle 
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Book flights, hotels, and tours in seconds'
  },
  {
    icon: Shield,
    title: 'Secure & Safe',
    description: 'Bank-level security for all transactions'
  },
  {
    icon: Globe,
    title: 'Offline Access',
    description: 'Access your bookings without internet'
  },
  {
    icon: Users,
    title: '24/7 Support',
    description: 'Get help anytime, anywhere'
  }
];

const appStats = [
  { value: '4.8', label: 'App Store Rating', icon: Star },
  { value: '2M+', label: 'Downloads', icon: Download },
  { value: '98%', label: 'Satisfaction', icon: CheckCircle }
];

function MobileAppSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px'
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="relative py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile App</span>
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Travel the World{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                From Your Phone
              </span>
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Download our award-winning mobile app and take your travel experience to the next level. 
              Book flights, hotels, and tours with just a few taps, get real-time updates, and enjoy 
              exclusive mobile-only deals.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <div className="w-10 h-10 bg-blue-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <feature.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">{feature.title}</h4>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* App Stats */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-3 gap-6 mb-8"
            >
              {appStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-blue-400 mr-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Download Buttons */}
            <motion.div
              variants={containerVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="flex items-center justify-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                <Image
                  src="/images/app-store-badge.png"
                  alt="Download on App Store"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </button>
              
              <button className="flex items-center justify-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                <Image
                  src="/images/google-play-badge.png"
                  alt="Get it on Google Play"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </button>
            </motion.div>

            {/* Learn More Link */}
            <motion.div
              variants={itemVariants}
              className="mt-6"
            >
              <button className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 group">
                <span className="font-medium">Learn more about the app</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - App Mockup */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative flex justify-center lg:justify-end"
          >
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              {/* Phone Frame */}
              <div className="relative w-80 h-[600px] mx-auto">
                {/* Phone Mockup */}
                <div className="absolute inset-0 bg-gray-800 rounded-[3rem] shadow-2xl border-8 border-gray-700">
                  {/* Screen */}
                  <div className="absolute inset-2 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-[2rem] overflow-hidden">
                    {/* App Content Mockup */}
                    <div className="h-full p-6 text-white">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                        <h3 className="text-lg font-bold">TrekToo</h3>
                        <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                      </div>

                      {/* Search Bar */}
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-white/60 rounded-full"></div>
                          <div className="text-white/80 text-sm">Where to next?</div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                          <div className="w-8 h-8 bg-white/40 rounded-full mx-auto mb-2"></div>
                          <div className="text-xs">Flights</div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                          <div className="w-8 h-8 bg-white/40 rounded-full mx-auto mb-2"></div>
                          <div className="text-xs">Hotels</div>
                        </div>
                      </div>

                      {/* Featured Destination */}
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-6">
                        <div className="w-full h-24 bg-white/30 rounded-lg mb-3"></div>
                        <div className="text-sm font-semibold mb-1">Bali, Indonesia</div>
                        <div className="text-xs text-white/70">From $899</div>
                      </div>

                      {/* Bottom Navigation */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center justify-around bg-white/20 backdrop-blur-sm rounded-xl p-3">
                          {['🏠', '✈️', '🏨', '❤️', '👤'].map((icon, index) => (
                            <div key={index} className="text-lg">{icon}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Star className="w-8 h-8 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Zap className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default MobileAppSection;
