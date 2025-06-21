'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
  Check,
  X,
  Users,
  MapPin,
  Globe,
  CreditCard,
  Shirt,
  Armchair,
  Calendar,
  Utensils,
  Cigarette,
} from 'lucide-react';

const TourInformation = () => {
  const amenities = [
    { name: 'Accepts Credit Cards', icon: CreditCard },
    { name: 'Laundry Service', icon: Shirt },
    { name: 'Outdoor Seating', icon: Armchair },
    { name: 'Reservations', icon: Calendar },
    { name: 'Restaurant', icon: Utensils },
    { name: 'Smoking Allowed', icon: Cigarette },
  ];

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

  return (
    <motion.div
      className="relative w-full max-w-7xl mx-auto mt-12 sm:mt-16 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex flex-col md:flex-row gap-8">
        <motion.div className="flex-1" variants={itemVariants}>
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-6 border-l-4 border-blue-500 pl-3"
            variants={itemVariants}
          >
            Included/Excluded
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8"
            variants={containerVariants}
          >
            <div className="space-y-4">
              {[
                'Pick and Drop Services',
                '1 Meal Per Day',
                'Cruise Dinner & Music Event',
                'Visit 7 Best Places in the City With Group',
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start group"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <Check className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600 text-base sm:text-lg">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="space-y-4">
              {[
                'Additional Services',
                'Insurance',
                'Food & Drinks',
                'Tickets',
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start group"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <X className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600 text-base sm:text-lg">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <div className="border-t border-blue-100 my-8"></div>
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-6 border-l-4 border-blue-500 pl-3"
            variants={itemVariants}
          >
            Tour Amenities
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8"
            variants={containerVariants}
          >
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                className="flex items-center group"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3 shadow-sm transition-shadow group-hover:shadow-md">
                  <amenity.icon className="h-5 w-5 text-blue-500" />
                </div>
                <span className="text-gray-600 text-base sm:text-lg">
                  {amenity.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div className="md:w-1/3" variants={itemVariants}>
          <motion.div
            className="bg-white/95 backdrop-blur-sm border border-blue-50 rounded-2xl p-6 sm:p-8 shadow-sm transition-all hover:shadow-md"
            variants={itemVariants}
          >
            <motion.h3
              className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-6 border-l-4 border-blue-500 pl-3"
              variants={itemVariants}
            >
              Tour Information
            </motion.h3>
            <motion.div className="space-y-6" variants={containerVariants}>
              {[
                { icon: Users, label: 'Max Guests', value: '12' },
                { icon: Users, label: 'Min Guests', value: '1' },
                { icon: Users, label: 'Min Age', value: '10+' },
                { icon: MapPin, label: 'Tour Location', value: '' },
                { icon: Globe, label: 'Languages Support', value: '' },
              ].map((info, index) => (
                <motion.div
                  key={index}
                  className="flex items-center group"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-4 shadow-sm transition-shadow group-hover:shadow-md">
                    <info.icon className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-base">{info.label}</p>
                    {info.value && (
                      <p className="text-gray-800 font-medium text-base">
                        {info.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

TourInformation.propTypes = {};

export default TourInformation;
