'use client';

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const Map = () => {
  const [modeOfTravel, setModeOfTravel] = useState('Walking');
  const mapRef = useRef(null);

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
      <motion.div
        className="w-full bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-blue-50"
        variants={itemVariants}
      >
        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-6 border-l-4 border-blue-500 pl-3"
          variants={itemVariants}
        >
          Tour Location
        </motion.h1>
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label
              htmlFor="modeOfTravel"
              className="text-base font-medium text-gray-700"
            >
              Mode of Travel:
            </label>
            <select
              id="modeOfTravel"
              value={modeOfTravel}
              onChange={(e) => setModeOfTravel(e.target.value)}
              className="w-full sm:w-auto border border-blue-100 rounded-md p-2.5 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-blue-50/50"
            >
              <option value="Walking">Walking</option>
              <option value="Driving">Driving</option>
              <option value="Public Transit">Public Transit</option>
              <option value="Cycling">Cycling</option>
            </select>
          </div>
          <div className="relative flex-grow w-full">
            <input
              type="text"
              placeholder="Enter your address"
              className="w-full border border-blue-100 rounded-md p-2.5 pl-10 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-blue-50/50"
            />
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
          </div>
        </motion.div>
        <motion.div
          className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-blue-50 shadow-sm"
          variants={itemVariants}
        >
          <div
            ref={mapRef}
            className="w-full h-full flex items-center justify-center bg-blue-50/50"
          >
            <motion.p
              className="text-center text-gray-600 text-base sm:text-lg"
              variants={itemVariants}
            >
              Map feature is temporarily disabled. Please contact us for
              location details.
            </motion.p>
          </div>
        </motion.div>
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 text-sm text-gray-500"
          variants={itemVariants}
        >
          <span>Map ©2025 Google</span>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-blue-500 transition">
              Keyboard shortcuts
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              Map data ©2025 Google
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              Terms
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              Report a map error
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

Map.propTypes = {};

export default Map;
