'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Collapse } from 'react-collapse';
import { useInView } from 'react-intersection-observer';

const ExpandableItem = ({
  question,
  answer,
  isExpandedByDefault = false,
  index,
}) => {
  const [isExpanded, setIsExpanded] = useState(isExpandedByDefault);

  return (
    <div className="border border-gray-200 rounded-3xl p-6 bg-white transition-all duration-300 hover:border-blue-500 shadow-2xl hover:shadow-2xl hover:shadow-blue-500/10">
      <div
        className="flex justify-between items-center cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h4 className="text-lg font-bold text-gray-800 tracking-tight m-0 pr-4 group-hover:text-blue-500 transition-colors duration-200">
          {question}
        </h4>
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <Collapse
        isOpened={isExpanded}
        theme={{
          collapse: 'ReactCollapse--collapse',
          content: 'ReactCollapse--content',
        }}
        springConfig={{
          stiffness: 400,
          damping: 35,
          mass: 0.7,
        }}
        className="mt-4 pt-4 border-t border-gray-100"
        style={{
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <p className="text-gray-600 leading-relaxed text-base">{answer}</p>
      </Collapse>
    </div>
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

  // Animation variants matching Hero Section
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
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
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden"
      aria-labelledby="faq-section-heading"
    >
      {/* Background Pattern - Matching Hero Section */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid-faq"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="#2196F3"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid-faq)" />
        </svg>
      </div>

      {/* Decorative Elements - Matching Hero Section */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-300/10 to-blue-500/10 rounded-full blur-lg"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <h2
              id="faq-section-heading"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight mb-6"
              style={{
                fontFamily:
                  "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                letterSpacing: '-0.02em',
              }}
            >
              Frequently Asked{' '}
              <span className="text-blue-500 relative">
                Questions
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C50 2 100 2 198 10"
                    stroke="#E0C097"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
          </motion.div>
          <motion.div variants={itemVariants}>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Everything you need to know about planning your perfect adventure
              with TrekToo
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="space-y-6">
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

FAQSection.propTypes = {};

export default FAQSection;
