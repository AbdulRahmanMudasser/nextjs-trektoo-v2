'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mountain, 
  Camera, 
  Utensils, 
  Waves, 
  Building2, 
  TreePine, 
  Compass,
  Heart 
} from 'lucide-react';

const ToursCategories = () => {
  const categories = [
    {
      id: 'adventure',
      title: 'Adventure Tours',
      description: 'Thrilling outdoor experiences and adrenaline-pumping activities',
      icon: Mountain,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      count: '150+ tours',
      popular: true
    },
    {
      id: 'cultural',
      title: 'Cultural Experiences',
      description: 'Immerse yourself in local traditions and historical sites',
      icon: Camera,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      count: '200+ tours',
      popular: false
    },
    {
      id: 'nature',
      title: 'Nature & Wildlife',
      description: 'Explore pristine landscapes and encounter amazing wildlife',
      icon: TreePine,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      count: '120+ tours',
      popular: true
    },
    {
      id: 'food',
      title: 'Food & Wine Tours',
      description: 'Savor local cuisines and discover culinary traditions',
      icon: Utensils,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      count: '80+ tours',
      popular: false
    },
    {
      id: 'water',
      title: 'Water Sports',
      description: 'Dive into aquatic adventures and marine experiences',
      icon: Waves,
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      count: '90+ tours',
      popular: false
    },
    {
      id: 'urban',
      title: 'Urban Exploration',
      description: 'Discover city secrets and architectural marvels',
      icon: Building2,
      color: 'from-slate-500 to-gray-500',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      count: '180+ tours',
      popular: true
    },
    {
      id: 'photography',
      title: 'Photography Tours',
      description: 'Capture stunning moments with expert guidance',
      icon: Camera,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      count: '60+ tours',
      popular: false
    },
    {
      id: 'wellness',
      title: 'Wellness & Spa',
      description: 'Rejuvenate your mind and body in serene settings',
      icon: Heart,
      color: 'from-rose-500 to-pink-500',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      count: '70+ tours',
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Explore by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From adrenaline-pumping adventures to serene cultural experiences, find the perfect tour that matches your interests and travel style.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className={`relative ${category.bgColor} ${category.borderColor} border-2 rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group-hover:border-opacity-60`}>
                {/* Popular Badge */}
                {category.popular && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Popular
                  </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-sm font-medium text-gray-500">
                      {category.count}
                    </span>
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Compass className="w-4 h-4 text-gray-600" />
                    </div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
            View All Categories
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ToursCategories;
