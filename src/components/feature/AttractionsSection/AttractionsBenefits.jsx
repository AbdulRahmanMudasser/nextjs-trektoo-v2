'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AttractionsBenefits = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Choose Our Attraction Tickets?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the best attractions with our premium features and exclusive benefits.
          </p>
        </motion.div>

        <div className="text-center py-12">
          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Benefits Coming Soon!</h3>
            <p className="text-gray-600 mb-6">We're preparing an amazing attraction experience with exclusive benefits.</p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttractionsBenefits;
