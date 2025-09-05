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
      className="bg-white/50 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-blue-50"
    >
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 border-l-4 border-blue-500 pl-2 sm:pl-3">
        {title}
      </h3>
      <ul className="space-y-2 sm:space-y-3">
        {items.map((item, index) => {
          const Icon = getIconForItem(item);
          return (
            <motion.li
              key={index}
              className="flex items-center gap-2 sm:gap-3 text-gray-600"
              variants={itemVariants}
              whileHover={{ x: 5 }}
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Icon className="h-3 w-3 sm:h-4 sm:w-5 text-blue-500" />
              </div>
              <span className="text-sm sm:text-base flex-1 min-w-0">
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
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header Section */}
      <motion.div className="text-center mb-8 sm:mb-12" variants={itemVariants}>
        <motion.div
          className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-full mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
        </motion.div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">
          Hotel Information
        </h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
          Everything you need to know about your stay, from facilities to
          policies
        </p>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
        {/* Facilities */}
        {facilities.length > 0 && renderList(facilities, 'Facilities')}

        {/* Services */}
        {services.length > 0 && renderList(services, 'Services')}
      </div>

      {/* Check-in/Check-out Times */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-green-100 mb-6 sm:mb-8"
      >
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 text-center">
          Check-in & Check-out Times
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="text-center p-3 sm:p-4 bg-white rounded-lg border border-green-200">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
              Check-in
            </h4>
            <p className="text-gray-700 text-sm">{checkInTime}</p>
          </div>
          <div className="text-center p-3 sm:p-4 bg-white rounded-lg border border-green-200">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
              Check-out
            </h4>
            <p className="text-gray-700 text-sm">{checkOutTime}</p>
          </div>
        </div>
      </motion.div>

      {/* Extra Prices */}
      {extraPrices.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-orange-100 mb-6 sm:mb-8"
        >
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 text-center">
            Additional Services & Pricing
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {extraPrices.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-3 sm:p-4 rounded-lg border border-orange-200 text-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                  {item.title || item.name}
                </h4>
                <p className="text-orange-600 font-bold text-sm sm:text-base">
                  {item.price || 'Contact for pricing'}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Policies */}
      {policies.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-purple-100"
        >
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 text-center">
            Hotel Policies
          </h3>
          <div className="space-y-3 sm:space-y-4">
            {policies.map((policy, index) => (
              <motion.div
                key={index}
                className="bg-white p-3 sm:p-4 rounded-lg border border-purple-200"
                whileHover={{ scale: 1.01 }}
              >
                <button
                  onClick={() =>
                    setExpandedPolicy(expandedPolicy === index ? null : index)
                  }
                  className="w-full flex items-center justify-between text-left"
                >
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900">
                    {policy.title || policy.name}
                  </h4>
                  {expandedPolicy === index ? (
                    <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedPolicy === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 pt-3 border-t border-purple-100"
                    >
                      <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                        {policy.content ||
                          policy.description ||
                          'No description available.'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
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
