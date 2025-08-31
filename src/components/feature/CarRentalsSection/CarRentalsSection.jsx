'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Car, MapPin, Star, Clock, DollarSign, Shield, Zap, Users, Fuel } from 'lucide-react';

const CarRentalsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const carOptions = [
    {
      id: 1,
      name: 'Economy Compact',
      category: 'Budget',
      description: 'Perfect for city driving and fuel efficiency. Ideal for solo travelers or couples.',
      features: ['Fuel efficient', 'Easy parking', 'Automatic transmission', 'Bluetooth audio'],
      price: '$35',
      perDay: '/day',
      rating: 4.6,
      reviewCount: 892,
      image: '/images/cars/economy-compact.jpg',
      seats: 4,
      fuelType: 'Petrol',
      transmission: 'Automatic'
    },
    {
      id: 2,
      name: 'SUV Adventure',
      category: 'Adventure',
      description: 'Spacious and rugged for outdoor adventures and family trips. Handles all terrains.',
      features: ['All-wheel drive', 'Spacious interior', 'Roof rack', 'Off-road capable'],
      price: '$75',
      perDay: '/day',
      rating: 4.8,
      reviewCount: 1247,
      image: '/images/cars/suv-adventure.jpg',
      seats: 7,
      fuelType: 'Diesel',
      transmission: 'Automatic'
    },
    {
      id: 3,
      name: 'Luxury Sedan',
      category: 'Premium',
      description: 'Elegant and comfortable for business trips and special occasions.',
      features: ['Leather interior', 'Premium sound system', 'Advanced safety', 'Concierge service'],
      price: '$120',
      perDay: '/day',
      rating: 4.9,
      reviewCount: 678,
      image: '/images/cars/luxury-sedan.jpg',
      seats: 5,
      fuelType: 'Petrol',
      transmission: 'Automatic'
    },
    {
      id: 4,
      name: 'Electric Vehicle',
      category: 'Eco-friendly',
      description: 'Zero emissions and modern technology for environmentally conscious travelers.',
      features: ['Zero emissions', 'Fast charging', 'Smart connectivity', 'Regenerative braking'],
      price: '$65',
      perDay: '/day',
      rating: 4.7,
      reviewCount: 456,
      image: '/images/cars/electric-vehicle.jpg',
      seats: 5,
      fuelType: 'Electric',
      transmission: 'Automatic'
    },
    {
      id: 5,
      name: 'Van Transport',
      category: 'Group',
      description: 'Perfect for large groups, airport transfers, and business events.',
      features: ['12+ seats', 'Luggage space', 'Professional driver', 'Airport pickup'],
      price: '$95',
      perDay: '/day',
      rating: 4.5,
      reviewCount: 789,
      image: '/images/cars/van-transport.jpg',
      seats: 12,
      fuelType: 'Diesel',
      transmission: 'Manual'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={headerVariants}
          className="text-center mb-16"
        >
                  <h2 className="text-4xl md:text-5xl font-bold text-blue-500 tracking-tight mb-6">
          Freedom to Explore
        </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Choose from our extensive fleet of well-maintained vehicles. From budget-friendly compacts 
            to luxury vehicles, find the perfect car for your journey and explore at your own pace.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {carOptions.map((car) => (
            <motion.div
              key={car.id}
              variants={itemVariants}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100 hover:border-blue-200"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                    {car.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-20">
                  <div className="flex items-center space-x-1 text-white">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{car.rating}</span>
                    <span className="text-xs opacity-80">({car.reviewCount})</span>
                  </div>
                </div>
                {/* Placeholder for car image */}
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                  <Car className="w-16 h-16 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {car.name}
                  </h3>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-blue-500">{car.price}</span>
                    <span className="text-sm text-gray-500">{car.perDay}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {car.description}
                </p>

                {/* Car Specs */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center text-blue-500 mb-1">
                      <Users className="w-4 h-4" />
                    </div>
                    <p className="text-xs text-gray-500">Seats</p>
                    <p className="text-sm font-semibold text-gray-900">{car.seats}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-blue-500 mb-1">
                      <Fuel className="w-4 h-4" />
                    </div>
                    <p className="text-xs text-gray-500">Fuel</p>
                    <p className="text-sm font-semibold text-gray-900">{car.fuelType}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-blue-500 mb-1">
                      <Zap className="w-4 h-4" />
                    </div>
                    <p className="text-xs text-gray-500">Transmission</p>
                    <p className="text-sm font-semibold text-gray-900">{car.transmission}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {car.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
                  Rent Now
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Full Insurance</h3>
                <p className="text-blue-100 text-sm">
                  Comprehensive coverage included with every rental for peace of mind.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                <p className="text-blue-100 text-sm">
                  Round-the-clock assistance for any questions or emergencies.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Flexible Pickup</h3>
                <p className="text-blue-100 text-sm">
                  Choose from multiple pickup and drop-off locations.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CarRentalsSection;
