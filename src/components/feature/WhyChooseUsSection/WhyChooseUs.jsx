'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, Compass, MapPin } from 'lucide-react';

const WhyChooseUs = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

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
      transition: { duration: 1, ease: 'easeOut', staggerChildren: 0.3 },
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
      backgroundColor: 'rgba(59, 130, 246, 0.05)',
      scale: 1.02,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="relative w-full py-12 sm:py-16 bg-blue-50/50 px-0 mb-4 sm:mb-6"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      aria-labelledby="plan-your-adventure-heading"
    >
      <div className="w-full">
        <motion.div
          className="bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl p-6 sm:p-8 border border-blue-50 max-w-7xl mx-auto"
          variants={sectionVariants}
        >
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Left Section - Image */}
            <motion.div className="w-full md:w-3/5" variants={sectionVariants}>
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/images/why-choose-us.jpg"
                  alt="Majestic mountain valley landscape"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  quality={90}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="/images/why-choose-us-placeholder.jpg"
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
            <motion.div className="w-full md:w-2/5" variants={sectionVariants}>
              <h2
                className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 leading-tight"
                id="plan-your-adventure-heading"
              >
                Plan Your Adventure
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
                    Your safety is our priority. We partner with trusted
                    providers to ensure worry-free adventures.
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
                    Exceptional experiences at competitive prices, designed to
                    make your dream trip a reality.
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
                    Our knowledgeable guides bring destinations to life with
                    insider tips and personalized care.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;
