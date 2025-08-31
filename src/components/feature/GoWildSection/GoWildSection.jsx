'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';





// ActivityImage Component
const ActivityImage = () => {
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
         <motion.div
       className="w-full max-w-[600px] h-[400px] sm:h-[450px] relative rounded-2xl overflow-hidden shadow-lg"
       variants={imageVariants}
       initial="hidden"
       animate="visible"
       whileHover="hover"
     >
      <Image
        src="/images/welcome-image.jpg"
        alt="Couple camping in tent"
        fill
        className="object-cover"
        sizes="(max-width: 900px) 100vw, 900px"
        loading="lazy"
        quality={85}
        placeholder="blur"
        blurDataURL="/images/welcome-image-placeholder.jpg"
      />
    </motion.div>
  );
};

// Main GoWildSection Component
const GoWildSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const activities = [
    'Family Camping',
    'Wild Camping',
    'Fishing',
    'Mountain Biking',
    'Luxury Cabin',
    'Couple Camping',
  ];

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.2 },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      aria-labelledby="go-wild-heading"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
                  <h2 className="text-4xl md:text-5xl font-bold text-blue-500 tracking-tight mb-6">
          Go Wild
        </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We are the most exciting company for travel and adventure
          </p>
        </motion.div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
           {/* Left Side: Text Content and Activities */}
           <motion.div className="space-y-8" variants={sectionVariants}>
             <motion.p className="text-base text-gray-600 leading-relaxed">
               Discover unforgettable experiences with Trektoo. From thrilling
               adventures to serene escapes, our curated tours offer something for
               every traveler. Join us to explore the world in style and comfort.
             </motion.p>
             
             {/* Activities Section */}
             <div className="space-y-6">
               <h3 className="text-xl font-semibold text-gray-800 mb-6">
                 Popular Activities
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {activities.map((activity, index) => (
                   <div key={index} className="group">
                     <div className="flex items-center bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-500 transition-all duration-300 hover:shadow-md">
                       <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors duration-300">
                         <svg
                           className="w-4 h-4 text-white"
                           fill="none"
                           viewBox="0 0 24 24"
                           stroke="currentColor"
                         >
                           <path
                             strokeLinecap="round"
                             strokeLinejoin="round"
                             strokeWidth={2}
                             d="M5 13l4 4L19 7"
                           />
                         </svg>
                       </div>
                       <span className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                         {activity}
                       </span>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           </motion.div>

           {/* Right Side: Image */}
           <motion.div
             className="flex justify-center md:justify-end"
             variants={sectionVariants}
           >
             <ActivityImage />
           </motion.div>
         </div>
      </div>
    </motion.section>
  );
};

export default GoWildSection;
