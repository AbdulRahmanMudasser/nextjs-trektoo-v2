'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Clock,
  CreditCard,
  Home,
  Car,
  Bike,
  Tv,
  Wifi,
  Coffee,
  Luggage,
  Utensils,
  Ticket,
  Shield,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const TourInformation = ({
  facilities = [],
  services = [],
  extraPrices = [],
  policies = [],
  checkInTime = 'Not specified',
  checkOutTime = 'Not specified',
}) => {
  const [expandedPolicy, setExpandedPolicy] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const iconMap = {
    'Wake-up call': Clock,
    'Car hire': Car,
    'Bicycle hire': Bike,
    'Flat Tv': Tv,
    'Laundry and dry cleaning': Home,
    'Internet – Wifi': Wifi,
    'Coffee and tea': Coffee,
    'Havana Lobby bar': Home,
    'Fiesta Restaurant': Utensils,
    'Free luggage deposit': Luggage,
    Tickets: Ticket,
  };

  const getIconForItem = (item) => {
    const title = item.title || item.name;
    return (
      iconMap[title] ||
      (item.icon && item.icon.startsWith('icofont-') ? Check : Home)
    );
  };

  const renderList = (items, title) => (
    <motion.div
      variants={itemVariants}
      className="bg-white/50 p-6 rounded-2xl shadow-sm border border-blue-50"
    >
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-blue-500 pl-3">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, index) => {
          const Icon = getIconForItem(item);
          return (
            <motion.li
              key={index}
              className="flex items-center gap-3 text-gray-600"
              variants={itemVariants}
              whileHover={{ x: 5 }}
            >
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <Icon className="h-5 w-5 text-blue-500" />
              </div>
              <span className="text-base sm:text-lg">
                {item.title || item.name}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );

  const renderCheckInOut = () => (
    <motion.div
      variants={itemVariants}
      className="bg-white/50 p-6 rounded-2xl shadow-sm border border-blue-50"
    >
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-blue-500 pl-3">
        Check-In & Check-Out
      </h3>
      <ul className="space-y-3">
        <motion.li
          className="flex items-center gap-3 text-gray-600"
          variants={itemVariants}
          whileHover={{ x: 5 }}
        >
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <Clock className="h-5 w-5 text-blue-500" />
          </div>
          <span className="text-base sm:text-lg">Check-In: {checkInTime}</span>
        </motion.li>
        <motion.li
          className="flex items-center gap-3 text-gray-600"
          variants={itemVariants}
          whileHover={{ x: 5 }}
        >
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <Clock className="h-5 w-5 text-blue-500" />
          </div>
          <span className="text-base sm:text-lg">
            Check-Out: {checkOutTime}
          </span>
        </motion.li>
      </ul>
    </motion.div>
  );

  const renderExtraPrices = () => (
    <motion.div
      variants={itemVariants}
      className="bg-white/50 p-6 rounded-2xl shadow-sm border border-blue-50"
    >
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-blue-500 pl-3">
        Extra Prices
      </h3>
      <ul className="space-y-3">
        {extraPrices.map((price, index) => (
          <motion.li
            key={index}
            className="flex items-center gap-3 text-gray-600"
            variants={itemVariants}
            whileHover={{ x: 5 }}
          >
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-base sm:text-lg">
              {price.name}: ${parseFloat(price.price).toFixed(2)} ({price.type})
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );

  const renderPolicies = () => (
    <motion.div
      variants={itemVariants}
      className="bg-white/50 p-6 rounded-2xl shadow-sm border border-blue-50"
    >
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-blue-500 pl-3">
        Hotel Policies
      </h3>
      {policies && policies.length > 0 ? (
        <ul className="space-y-3">
          {policies.map((policy, index) => {
            const isExpanded = expandedPolicy === index;

            const parseContent = (content) => {
              if (!content || typeof content !== 'string') {
                return ['No policy details available'];
              }

              return content
                .split(/\r\n|\n|\r/)
                .filter((line) => line.trim() && line.trim() !== '-')
                .map((line) => line.replace(/^-\s*/, '').trim())
                .filter((line) => line.length > 0);
            };

            const contentLines = parseContent(policy.content);

            return (
              <motion.li
                key={index}
                className="border border-blue-100 rounded-xl overflow-hidden bg-white/70"
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div
                  className="flex items-center justify-between gap-3 cursor-pointer p-4 hover:bg-blue-50/50 transition-colors"
                  onClick={() => setExpandedPolicy(isExpanded ? null : index)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-blue-500" />
                    </div>
                    <h4 className="text-base sm:text-lg text-gray-600">
                      {policy.title}
                    </h4>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4 text-blue-500" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="border-t border-blue-100"
                    >
                      <div className="p-4">
                        <ul className="space-y-2">
                          {contentLines.map((line, lineIndex) => (
                            <motion.li
                              key={lineIndex}
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: lineIndex * 0.1 }}
                              className="flex items-start gap-2 text-gray-600"
                            >
                              <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                              <span className="text-sm leading-relaxed">
                                {line}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      ) : (
        <div className="text-center py-8">
          <Shield className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-base">
            No hotel policies available at this time.
          </p>
        </div>
      )}
    </motion.div>
  );

  // Don't render if no data is available
  if (
    facilities.length === 0 &&
    services.length === 0 &&
    extraPrices.length === 0 &&
    policies.length === 0
  ) {
    return null;
  }

  return (
    <motion.div
      className="relative w-full max-w-7xl mx-auto mt-12 sm:mt-16 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-8 border-l-4 border-blue-500 pl-3"
        variants={itemVariants}
      >
        Hotel Amenities & Policies
      </motion.h2>

      <div className="flex flex-col md:flex-row gap-8">
        <motion.div className="flex-1 space-y-6" variants={itemVariants}>
          {facilities.length > 0 && renderList(facilities, 'Facilities')}
          {services.length > 0 && renderList(services, 'Services')}
          {renderCheckInOut()}
        </motion.div>

        <motion.div className="flex-1 space-y-6" variants={itemVariants}>
          {extraPrices.length > 0 && renderExtraPrices()}
          {renderPolicies()}
        </motion.div>
      </div>
    </motion.div>
  );
};

TourInformation.propTypes = {
  facilities: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,
    })
  ),
  services: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,
    })
  ),
  extraPrices: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      type: PropTypes.string.isRequired,
    })
  ),
  policies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string,
    })
  ),
  checkInTime: PropTypes.string,
  checkOutTime: PropTypes.string,
};

export default TourInformation;
