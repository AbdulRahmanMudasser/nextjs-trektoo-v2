'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Car, Plane, Train, Ship, Bus, MapPin, Clock, DollarSign, Star } from 'lucide-react';

const TransportSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const transportOptions = [
    {
      id: 1,
      name: 'Private Car Service',
      icon: Car,
      description: 'Luxury vehicles with professional drivers for comfortable city tours and airport transfers.',
      features: ['Door-to-door service', 'Professional drivers', 'Luxury vehicles', '24/7 availability'],
      price: 'From $50',
      duration: 'Flexible',
      rating: 4.9,
      reviewCount: 1247,
      category: 'Premium'
    },
    {
      id: 2,
      name: 'Domestic Flights',
      icon: Plane,
      description: 'Quick and convenient air travel between major destinations with flexible scheduling.',
      features: ['Multiple daily flights', 'Flexible booking', 'Luggage included', 'Priority boarding'],
      price: 'From $120',
      duration: '1-3 hours',
      rating: 4.7,
      reviewCount: 892,
      category: 'Fast'
    },
    {
      id: 3,
      name: 'High-Speed Rail',
      icon: Train,
      description: 'Eco-friendly and scenic rail journeys connecting major cities and tourist destinations.',
      features: ['Scenic routes', 'Comfortable seating', 'On-board dining', 'Free WiFi'],
      price: 'From $35',
      duration: '2-6 hours',
      rating: 4.8,
      reviewCount: 1563,
      category: 'Eco-friendly'
    },
    {
      id: 4,
      name: 'Cruise Ships',
      icon: Ship,
      description: 'Luxury ocean voyages with world-class amenities and breathtaking coastal views.',
      features: ['All-inclusive packages', 'Multiple destinations', 'Entertainment', 'Fine dining'],
      price: 'From $200',
      duration: '3-14 days',
      rating: 4.6,
      reviewCount: 2034,
      category: 'Luxury'
    },
    {
      id: 5,
      name: 'Public Bus Network',
      icon: Bus,
      description: 'Affordable and extensive public transportation covering urban and rural areas.',
      features: ['Frequent service', 'Affordable fares', 'Extensive coverage', 'Real-time tracking'],
      price: 'From $2',
      duration: '15-60 min',
      rating: 4.4,
      reviewCount: 945,
      category: 'Budget'
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
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={headerVariants}
          className="text-center mb-16"
        >
                  <h2 className="text-4xl md:text-5xl font-bold text-blue-500 tracking-tight mb-6">
          Getting Around Made Easy
        </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Choose from a wide range of transportation options designed to make your journey seamless, 
            comfortable, and memorable. From luxury private services to budget-friendly public transport.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {transportOptions.map((option) => (
            <motion.div
              key={option.id}
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100 hover:border-blue-200"
            >
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-4 group-hover:bg-blue-600 transition-colors duration-200">
                  <option.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  {option.name}
                </h3>
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full mt-2">
                  {option.category}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6 text-center">
                {option.description}
              </p>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center text-blue-500 mb-1">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="text-sm font-semibold text-gray-900">{option.price}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center text-blue-500 mb-1">
                    <Clock className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="text-sm font-semibold text-gray-900">{option.duration}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center text-blue-500 mb-1">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="text-xs text-gray-500">Rating</p>
                  <p className="text-sm font-semibold text-gray-900">{option.rating}</p>
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
                Book Now
              </button>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Need Custom Transportation?
                </h3>
                <p className="text-blue-100 mb-6">
                  We offer personalized transportation solutions for groups, special events, and unique itineraries. 
                  Let us create the perfect travel experience for your specific needs.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3" />
                    <span>Group transportation for events</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3" />
                    <span>Custom tour packages</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3" />
                    <span>VIP airport transfers</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors duration-200 text-lg">
                  Get Custom Quote
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TransportSection;
