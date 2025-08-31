'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Collapse } from 'react-collapse';
import { useInView } from 'react-intersection-observer';

const ExpandableItem = ({ question, answer, isExpandedByDefault = false, index }) => {
  const [isExpanded, setIsExpanded] = useState(isExpandedByDefault);

  return (
    <motion.div
      className="border border-gray-200 rounded-2xl p-6 bg-white transition-all duration-300 hover:border-blue-500 shadow-lg hover:shadow-xl"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      style={{ willChange: 'transform, opacity' }}
    >
      <motion.div
        className="flex justify-between items-center cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.01 }}
        style={{ willChange: 'transform' }}
      >
        <motion.h4 
          className="text-lg font-bold text-gray-900 tracking-tight m-0 pr-4 group-hover:text-blue-500 transition-colors duration-200"
          style={{ willChange: 'color' }}
        >
          {question}
        </motion.h4>
        <motion.div
          className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          style={{ willChange: 'transform' }}
        >
          <motion.svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ willChange: 'transform' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </motion.div>
      </motion.div>
      
      <Collapse
        isOpened={isExpanded}
        theme={{
          collapse: 'ReactCollapse--collapse',
          content: 'ReactCollapse--content'
        }}
        springConfig={{ 
          stiffness: 400, 
          damping: 35,
          mass: 0.7
        }}
        className="mt-4 pt-4 border-t border-gray-100"
        style={{
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <motion.p 
          className="text-gray-600 leading-relaxed text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isExpanded ? 1 : 0, 
            y: isExpanded ? 0 : 10 
          }}
          transition={{ 
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          style={{ willChange: 'transform, opacity' }}
        >
          {answer}
        </motion.p>
      </Collapse>
    </motion.div>
  );
};

ExpandableItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  isExpandedByDefault: PropTypes.bool,
  index: PropTypes.number.isRequired,
};

const FAQSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const sectionVariants = {
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

  const headerVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.95 },
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.5, ease: "easeOut" }
    },
  };

  // Custom CSS for smooth collapse animations
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .ReactCollapse--collapse {
        transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
      }
      .ReactCollapse--content {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <motion.section
      ref={ref}
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      aria-labelledby="faq-section-heading"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.h2 
            id="faq-section-heading"
            className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6"
            style={{ willChange: 'transform, opacity' }}
          >
            Frequently Asked{' '}
            <span className="text-blue-500">
              Questions
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={{ willChange: 'transform, opacity' }}
          >
            Everything you need to know about planning your perfect adventure with TrekToo
          </motion.p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
                                <div className="space-y-6">
            <ExpandableItem
              question="How Much Price About Tour & Travels?"
              answer="Our tours are priced competitively, offering premium experiences starting from $129. From kayaking in Phuket to luxurious villas in the Maldives, we tailor adventures to your budget."
              isExpandedByDefault={true}
              index={0}
            />
            <ExpandableItem
              question="What Services Do You Provide?"
              answer="We offer comprehensive travel planning, including guided tours, accommodations, transportation, and 24/7 support to ensure a seamless and unforgettable journey."
              index={1}
            />
            <ExpandableItem
              question="Why Choose Our Travel Agency?"
              answer="With years of expertise, we curate personalized adventures to the world's most stunning destinations, delivering exceptional service and memorable experiences."
              index={2}
            />
            <ExpandableItem
              question="What is the cancellation policy for tours?"
              answer="We offer flexible cancellation policies with full refunds available up to 48 hours before departure. For last-minute changes, we provide credit for future bookings. Special circumstances are always considered on a case-by-case basis."
              index={3}
            />
            <ExpandableItem
              question="Do you provide travel insurance?"
              answer="Yes, we offer comprehensive travel insurance packages that cover medical emergencies, trip cancellations, lost luggage, and more. We highly recommend our insurance to ensure peace of mind during your adventure."
              index={4}
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

FAQSection.propTypes = {};

export default FAQSection;
