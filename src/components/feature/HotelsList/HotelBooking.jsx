'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Shirt,
  Armchair,
  Calendar,
  Utensils,
  Cigarette,
} from 'lucide-react';
import BookingForm from './BookingForm';

const HotelBooking = ({ id, description = 'None' }) => {
  const capitalizeFirstLetter = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const parseDescription = (desc) => {
    const placesNearbyRegex = /places\s+nearby:/i;
    const accessibilityRegex = /accessibility:/i;

    let mainDescription = desc;
    let placesNearby = '';
    let accessibility = '';

    const placesNearbyMatch = desc.match(placesNearbyRegex);
    if (placesNearbyMatch) {
      const startIndex = placesNearbyMatch.index;
      const endIndex = desc.match(accessibilityRegex)?.index || desc.length;
      placesNearby = capitalizeFirstLetter(
        desc
          .substring(startIndex + placesNearbyMatch[0].length, endIndex)
          .trim()
      );
      mainDescription = desc
        .substring(0, startIndex)
        .concat(desc.substring(endIndex))
        .trim();
    }

    const accessibilityMatch = mainDescription.match(accessibilityRegex);
    if (accessibilityMatch) {
      const startIndex = accessibilityMatch.index;
      accessibility = capitalizeFirstLetter(
        mainDescription
          .substring(startIndex + accessibilityMatch[0].length)
          .trim()
      );
      mainDescription = mainDescription.substring(0, startIndex).trim();
    }

    return {
      mainDescription: mainDescription || 'None',
      placesNearby,
      accessibility,
    };
  };

  const { mainDescription, placesNearby, accessibility } =
    parseDescription(description);

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <motion.div
          className="md:col-span-2 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-blue-50"
          variants={itemVariants}
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4 border-l-4 border-blue-500 pl-3"
            variants={itemVariants}
          >
            Discover Your Journey
          </motion.h2>
          <motion.p
            className="text-gray-600 text-base sm:text-lg mb-6"
            variants={itemVariants}
          >
            {mainDescription}
          </motion.p>
          {placesNearby && (
            <>
              <motion.h3
                className="text-xl sm:text-2xl font-bold text-gray-900 mb-3"
                variants={itemVariants}
              >
                Places Nearby
              </motion.h3>
              <motion.p
                className="text-gray-600 text-base sm:text-lg mb-6"
                variants={itemVariants}
              >
                {placesNearby}
              </motion.p>
            </>
          )}
          {accessibility && (
            <>
              <motion.h3
                className="text-xl sm:text-2xl font-bold text-gray-900 mb-3"
                variants={itemVariants}
              >
                Accessibility
              </motion.h3>
              <motion.p
                className="text-gray-600 text-base sm:text-lg mb-6"
                variants={itemVariants}
              >
                {accessibility}
              </motion.p>
            </>
          )}
          <motion.h3
            className="text-xl sm:text-2xl font-bold text-gray-900 mb-4"
            variants={itemVariants}
          >
            Premium Amenities
          </motion.h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
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
                <span className="text-gray-600 text-base">{amenity.name}</span>
              </motion.div>
            ))}
          </motion.div>
          <motion.h3
            className="text-xl sm:text-2xl font-bold text-gray-900 mb-3"
            variants={itemVariants}
          >
            Adventure Awaits
          </motion.h3>
          <motion.p
            className="text-gray-600 text-base sm:text-lg"
            variants={itemVariants}
          >
            Embark on a thrilling journey through breathtaking landscapes,
            guided by experts who bring every destination to life.
          </motion.p>
        </motion.div>
        <div className="md:col-span-1 flex flex-col gap-6 sm:gap-8">
          <motion.div
            className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-md group"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <Image
              src="/images/explore-1.jpg"
              alt="Beautiful tour destination with scenic landscapes"
              fill
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              placeholder="blur"
              blurDataURL="/default-tour.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
          <motion.div variants={itemVariants}>
            <BookingForm id={id} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

HotelBooking.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default HotelBooking;
