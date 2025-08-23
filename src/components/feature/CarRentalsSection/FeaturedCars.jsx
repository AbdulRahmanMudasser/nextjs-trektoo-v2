'use client';

import React from 'react';
import { motion } from 'framer-motion';

const FeaturedCars = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Featured Vehicles
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our most popular and highly-rated rental vehicles for your next adventure.
          </p>
        </motion.div>

        <div className="text-center py-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon!</h3>
            <p className="text-gray-600 mb-6">We're working hard to bring you the best car rental experience.</p>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
              Get Notified
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
