'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Car, 
  Truck, 
  Bike, 
  CarFront, 
  Compass,
  Zap,
  CarTaxiFront
} from 'lucide-react';

const CarCategories = () => {
  const categories = [
    {
      id: 'economy',
      title: 'Economy Cars',
      description: 'Fuel-efficient and budget-friendly options for city driving',
      icon: Car,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      count: '2000+ cars',
      popular: true,
      price: 'From $25/day'
    },
    {
      id: 'compact',
      title: 'Compact Cars',
      description: 'Perfect balance of size and comfort for urban adventures',
      icon: CarFront,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      count: '1500+ cars',
      popular: false,
      price: 'From $35/day'
    },
    {
      id: 'midsize',
      title: 'Midsize Sedans',
      description: 'Spacious and comfortable for family trips and business travel',
      icon: CarTaxiFront,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      count: '1200+ cars',
      popular: true,
      price: 'From $45/day'
    },
    {
      id: 'suv',
      title: 'SUVs & Crossovers',
      description: 'Versatile vehicles for adventure and family travel',
      icon: CarFront,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      count: '800+ cars',
      popular: false,
      price: 'From $55/day'
    },
    {
      id: 'luxury',
      title: 'Luxury Vehicles',
      description: 'Premium cars for special occasions and business travel',
      icon: Car,
      color: 'from-amber-500 to-yellow-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      count: '300+ cars',
      popular: true,
      price: 'From $120/day'
    },
    {
      id: 'vans',
      title: 'Vans & Minibuses',
      description: 'Spacious options for groups and family travel',
      icon: Truck,
      color: 'from-slate-500 to-gray-500',
      bgColor: 'bg-slate-50',
      borderColor: 'border-slate-200',
      count: '200+ cars',
      popular: false,
      price: 'From $65/day'
    },
    {
      id: 'convertible',
      title: 'Convertibles',
      description: 'Open-top driving experience for scenic routes',
      icon: Car,
      color: 'from-rose-500 to-pink-500',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      count: '150+ cars',
      popular: false,
      price: 'From $80/day'
    },
    {
      id: 'electric',
      title: 'Electric Vehicles',
      description: 'Eco-friendly options with modern technology',
      icon: Zap,
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      count: '100+ cars',
      popular: true,
      price: 'From $60/day'
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
            Choose Your Perfect Vehicle
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From compact city cars to luxury vehicles, we have the perfect rental car for every journey and budget.
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
                  <div className="space-y-2 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        {category.count}
                      </span>
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                        <Compass className="w-4 h-4 text-gray-600" />
                      </div>
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      {category.price}
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

export default CarCategories;
