'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, Compass, MapPin } from 'lucide-react';

const WhyChooseUs = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0.05, 0.15]
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, staggerChildren: 0.3 },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    hover: {
      backgroundColor: '#EBF5FF',
      scale: 1.02,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="relative bg-gradient-to-b from-white to-blue-50/30 rounded-3xl overflow-hidden max-w-7xl mx-auto shadow-2xl my-16"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="absolute inset-0 bg-[url('/images/subtle-texture.png')] opacity-10"
        style={{ opacity: backgroundOpacity }}
      />

      {/* Content Container */}
      <div className="flex flex-col md:flex-row items-start pt-8 md:pt-12 pb-12 px-4 md:px-8">
        {/* Left Section - Image */}
        <motion.div className="w-full md:w-3/5" variants={sectionVariants}>
          <div className="relative w-full h-[300px] md:h-[600px] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/why-choose-us.jpg"
              alt="Majestic mountain valley landscape"
              fill
              className="object-cover transition-transform duration-700 hover:scale-110"
              quality={90}
              loading="lazy"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </div>
        </motion.div>

        {/* Right Section - Sidebar */}
        <motion.div
          className="w-full md:w-2/5 md:pl-8 pt-8 md:pt-0"
          variants={sectionVariants}
        >
          <motion.span
            className="inline-block bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg mb-4 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Why Choose Us
          </motion.span>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
            Craft Your Perfect Travel Experience
          </h2>

          {/* FeatureCard - Safety */}
          <motion.div
            className="mb-6 flex items-start p-4 rounded-xl"
            variants={featureVariants}
            whileHover="hover"
          >
            <motion.div
              className="w-10 h-10 bg-blue-500 rounded-full flex p-3 items-center justify-center mr-4 text-white"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Compass className="w-5 h-5" />
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Uncompromising Safety
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Your safety is our priority. We partner with trusted providers
                to ensure worry-free adventures.
              </p>
            </div>
          </motion.div>

          {/* FeatureCard - Price */}
          <motion.div
            className="mb-6 flex items-start p-4 rounded-xl"
            variants={featureVariants}
            whileHover="hover"
          >
            <motion.div
              className="w-10 h-10 bg-blue-500 rounded-full flex p-3 items-center justify-center mr-4 text-white"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <MapPin className="w-5 h-5" />
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Affordable Luxury
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Exceptional experiences at competitive prices, designed to make
                your dream trip a reality.
              </p>
            </div>
          </motion.div>

          {/* FeatureCard - Guide */}
          <motion.div
            className="mb-6 flex items-start p-4 rounded-xl"
            variants={featureVariants}
            whileHover="hover"
          >
            <motion.div
              className="w-10 h-10 bg-blue-500 rounded-full flex p-3 items-center justify-center mr-4 text-white"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Globe className="w-5 h-5" />
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Expert Guides
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our knowledgeable guides bring destinations to life with insider
                tips and personalized care.
              </p>
            </div>
          </motion.div>

          <motion.a
            href="/explore"
            className="inline-block bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 text-sm md:text-base shadow-md mt-4"
            whileHover={{
              scale: 1.1,
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            Plan Your Adventure
          </motion.a>
        </motion.div>
      </div>

      {/* Custom SVG Wave Animation */}
      <motion.svg
        className="absolute bottom-0 w-full h-24 text-blue-100"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <path
          fill="currentColor"
          d="M0,0 C300,100 600,0 900,80 1200,0 1440,100 1440,100 L1440,100 L0,100 Z"
        >
          <animate
            attributeName="d"
            values="
              M0,0 C300,100 600,0 900,80 1200,0 1440,100 1440,100 L1440,100 L0,100 Z;
              M0,0 C300,80 600,20 900,100 1200,20 1440,80 1440,100 L1440,100 L0,100 Z;
              M0,0 C300,100 600,0 900,80 1200,0 1440,100 1440,100 L1440,100 L0,100 Z"
            dur="10s"
            repeatCount="indefinite"
          />
        </path>
      </motion.svg>
    </motion.div>
  );
};

export default WhyChooseUs;
