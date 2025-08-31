'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Lightbulb, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Briefcase, 
  Globe, 
  Shield, 
  Heart,
  ArrowRight 
} from 'lucide-react';

const tips = [
  {
    icon: Calendar,
    title: 'Best Time to Book',
    description: 'Book flights 2-8 weeks in advance for domestic, 1-4 months for international',
    category: 'Planning',
    readTime: '3 min read'
  },
  {
    icon: MapPin,
    title: 'Hidden Gem Destinations',
    description: 'Discover lesser-known places that offer authentic experiences without crowds',
    category: 'Destinations',
    readTime: '5 min read'
  },
  {
    icon: CreditCard,
    title: 'Travel Budget Hacks',
    description: 'Smart ways to save money while traveling without compromising on experience',
    category: 'Budget',
    readTime: '4 min read'
  },
  {
    icon: Briefcase,
    title: 'Packing Like a Pro',
    description: 'Essential packing tips for different climates and trip durations',
    category: 'Packing',
    readTime: '6 min read'
  },
  {
    icon: Globe,
    title: 'Cultural Etiquette',
    description: 'Respect local customs and traditions in different countries',
    category: 'Culture',
    readTime: '4 min read'
  },
  {
    icon: Shield,
    title: 'Travel Safety Tips',
    description: 'Stay safe while exploring new destinations and cultures',
    category: 'Safety',
    readTime: '5 min read'
  }
];

const featuredTip = {
  icon: Heart,
  title: 'Sustainable Travel Guide',
  description: 'Learn how to travel responsibly and minimize your environmental impact while exploring the world. From choosing eco-friendly accommodations to supporting local communities, discover ways to make your adventures more sustainable.',
  category: 'Sustainability',
  readTime: '8 min read',
  featured: true
};

function TravelTips() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px'
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="relative py-20 bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Lightbulb className="w-4 h-4" />
            <span>Expert Advice</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-blue-500 mb-6"
          >
            Travel Tips from the Experts
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Get insider knowledge and professional advice to make your travels more enjoyable, 
            affordable, and memorable. Our travel experts share their secrets and experiences.
          </motion.p>
        </motion.div>

        {/* Featured Tip */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 w-32 h-32 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-10 left-10 w-24 h-24 border-2 border-white rounded-full"></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <featuredTip.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                    {featuredTip.category}
                  </span>
                  <span className="text-white/70 text-sm ml-3">{featuredTip.readTime}</span>
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                {featuredTip.title}
              </h3>
              <p className="text-xl text-green-100 mb-6 leading-relaxed max-w-4xl">
                {featuredTip.description}
              </p>

              <button className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 hover:scale-105">
                <span>Read Full Guide</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Tips Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {tips.map((tip, index) => (
            <motion.div
              key={tip.title}
              variants={itemVariants}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 hover:border-green-200 cursor-pointer"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <tip.icon className="w-8 h-8 text-green-600" />
              </div>

              {/* Content */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                    {tip.category}
                  </span>
                  <span className="text-gray-500 text-sm">{tip.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                  {tip.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {tip.description}
                </p>
              </div>

              {/* Read More */}
              <div className="flex items-center gap-2 text-green-600 font-medium group-hover:text-green-700 transition-colors duration-300">
                <span>Read more</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Want More Travel Tips?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Subscribe to our weekly travel tips newsletter and get expert advice, 
              destination guides, and exclusive deals delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105">
                Subscribe to Tips
              </button>
              
              <button className="bg-white border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105">
                Browse All Tips
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default TravelTips;
