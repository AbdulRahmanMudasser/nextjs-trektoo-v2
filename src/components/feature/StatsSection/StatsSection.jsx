'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Globe, 
  Star, 
  Users, 
  Zap, 
  Award, 
  Shield, 
  Heart, 
  TrendingUp 
} from 'lucide-react';

const stats = [
  {
    icon: Globe,
    value: '150+',
    label: 'Countries Covered',
    description: 'Explore destinations worldwide'
  },
  {
    icon: Users,
    value: '2M+',
    label: 'Happy Travelers',
    description: 'Trusted by millions'
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'Customer Rating',
    description: 'Exceptional service quality'
  },
  {
    icon: Award,
    value: '25+',
    label: 'Years Experience',
    description: 'Industry expertise'
  },
  {
    icon: Shield,
    value: '100%',
    label: 'Secure Booking',
    description: 'Your safety first'
  },
  {
    icon: Heart,
    value: '98%',
    label: 'Satisfaction Rate',
    description: 'Customer happiness'
  }
];

function StatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px'
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 1, 
        ease: [0.25, 0.46, 0.45, 0.94], 
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      scale: 0.9,
      rotateY: -15
    },
    visible: {
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        duration: 0.8
      }
    }
  };

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: -30, 
      scale: 0.95 
    },
    visible: {
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const backgroundVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: {
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        variants={backgroundVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-100 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Enhanced Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            style={{ willChange: 'transform, opacity' }}
          >
            Trusted by{' '}
            <span className="text-blue-500">
              Millions Worldwide
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={{ willChange: 'transform, opacity' }}
          >
            Join our community of satisfied travelers who have discovered the world with confidence and ease
          </motion.p>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center group"
              style={{ willChange: 'transform, opacity' }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <div className="relative">
                {/* Enhanced Icon Container */}
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1,
                    transition: { duration: 0.5, ease: "easeOut" }
                  }}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                {/* Enhanced Value */}
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300"
                  style={{ willChange: 'color' }}
                >
                  {stat.value}
                </motion.h3>
                
                {/* Enhanced Label */}
                <motion.h4 
                  className="text-sm md:text-base font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-300"
                  style={{ willChange: 'color' }}
                >
                  {stat.label}
                </motion.h4>
                
                {/* Enhanced Description */}
                <motion.p 
                  className="text-xs md:text-sm text-gray-500 leading-relaxed"
                  style={{ willChange: 'opacity' }}
                >
                  {stat.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default StatsSection;
