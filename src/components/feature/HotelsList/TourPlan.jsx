'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown, Star } from 'lucide-react';

const TourPlan = () => {
  const [openDay, setOpenDay] = useState(null);

  const toggleDay = (dayNumber) => {
    setOpenDay(openDay === dayNumber ? null : dayNumber);
  };

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
            Tour Plan
          </motion.h2>
          <motion.div className="space-y-4" variants={containerVariants}>
            {[
              {
                day: 1,
                title: 'Day 1st',
                details: [
                  'Morning: Breakfast at hotel',
                  'Afternoon: City tour and sightseeing',
                  'Evening: Welcome dinner at local restaurant',
                ],
              },
              {
                day: 2,
                title: 'Day 2nd',
                details: [
                  'Morning: Visit to historical sites',
                  'Afternoon: Shopping at local market',
                  'Evening: Cultural show and dinner',
                ],
              },
              {
                day: 3,
                title: 'Day 3rd',
                details: [
                  'Morning: Adventure activities',
                  'Afternoon: Free time for relaxation',
                  'Evening: Farewell dinner',
                ],
              },
            ].map((day) => (
              <motion.div
                key={day.day}
                className="rounded-2xl overflow-hidden border border-blue-50 shadow-sm"
                variants={itemVariants}
              >
                <motion.button
                  onClick={() => toggleDay(day.day)}
                  className="w-full bg-blue-50 hover:bg-blue-100 text-gray-900 font-semibold py-4 px-6 flex justify-between items-center transition-all"
                  aria-label={`Toggle ${day.title} details`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="text-base sm:text-lg">{day.title}</span>
                  <motion.div
                    animate={{ rotate: openDay === day.day ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    <ChevronDown className="h-5 w-5 text-blue-500" />
                  </motion.div>
                </motion.button>
                {openDay === day.day && (
                  <motion.div
                    className="p-4 bg-white border-t border-blue-100"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                  >
                    {day.details.map((detail, index) => (
                      <p
                        key={index}
                        className="text-gray-600 text-base sm:text-lg mb-2"
                      >
                        {detail}
                      </p>
                    ))}
                  </motion.div>
                )}
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
              Last Minute Deals
            </motion.h3>
            <motion.div className="space-y-6" variants={containerVariants}>
              {[
                {
                  title: 'Walking the Amalfi Coast',
                  image: '/images/singapore-adventure.jpg',
                  rating: 4.5,
                  price: '$129.00',
                },
                {
                  title: 'Discovery Island Kayak Tour',
                  image: '/images/uk-adventure.jpg',
                  rating: 5,
                  price: '$129.00',
                },
              ].map((deal, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col space-y-3 group"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex space-x-4">
                    <div className="w-20 h-20 relative rounded-md overflow-hidden shadow-sm">
                      <Image
                        src={deal.image}
                        alt={deal.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        placeholder="blur"
                        blurDataURL="/default-tour.jpg"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(deal.rating)
                                ? 'fill-blue-500 text-blue-500'
                                : i < deal.rating
                                  ? 'fill-blue-500 text-blue-500 fill-opacity-50'
                                  : 'fill-gray-300 text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <h4 className="font-semibold text-gray-800 text-base sm:text-lg">
                        {deal.title}
                      </h4>
                      <p className="text-base text-gray-600">
                        From{' '}
                        <span className="text-blue-500 font-medium">
                          {deal.price}
                        </span>
                      </p>
                    </div>
                  </div>
                  {index === 0 && (
                    <div className="border-t border-blue-100 my-2"></div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

TourPlan.propTypes = {};

export default TourPlan;
