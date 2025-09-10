'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, Compass, MapPin } from 'lucide-react';

const WhyChooseUs = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Simplified variants for performance
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <section
      ref={ref}
      className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      aria-labelledby="plan-your-adventure-heading"
    >
      {/* Simplified background texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
            Plan Your <span className="text-blue-500">Adventure</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Let us help you create the perfect journey with our expert planning,
            trusted partnerships, and personalized travel experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* FeatureCard - Safety */}
          <div className="text-center p-8 rounded-2xl bg-white transition-all duration-300 border border-gray-200 hover:border-blue-500 group shadow-lg hover:shadow-xl">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
              <Compass className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-500 transition-colors duration-200">
              Uncompromising Safety
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              Your safety is our priority. We partner with trusted providers to
              ensure worry-free adventures.
            </p>
          </div>

          {/* FeatureCard - Price */}
          <div className="text-center p-8 rounded-2xl bg-white transition-all duration-300 border border-gray-200 hover:border-blue-500 group shadow-lg hover:shadow-xl">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
              <Globe className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-500 transition-colors duration-200">
              Best Value Guarantee
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              We offer competitive prices and exclusive deals that give you the
              best value for your travel investment.
            </p>
          </div>

          {/* FeatureCard - Experience */}
          <div className="text-center p-8 rounded-2xl bg-white transition-all duration-300 border border-gray-200 hover:border-blue-500 group shadow-lg hover:shadow-xl">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
              <MapPin className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-500 transition-colors duration-200">
              Expert Local Knowledge
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              Our local experts provide insider knowledge and authentic
              experiences you won't find elsewhere.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
