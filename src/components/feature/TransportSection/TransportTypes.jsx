'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TransportTypes = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Transport Types
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore different transportation options available for your travel needs.
          </p>
        </motion.div>

        <div className="text-center py-12">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Transport Types Coming Soon!</h3>
            <p className="text-gray-600 mb-6">We're preparing comprehensive transport options for you.</p>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
              Get Notified
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransportTypes;
