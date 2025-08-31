'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Star, MapPin, Calendar, Users, Heart, ArrowRight } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: 'Bali, Indonesia',
    image: '/images/destinations/bali.jpg',
    rating: 4.8,
    reviews: 1247,
    price: '$899',
    duration: '7 days',
    travelers: '2.5k',
    category: 'Beach & Culture',
    description: 'Tropical paradise with ancient temples and pristine beaches',
    featured: true
  },
  {
    id: 2,
    name: 'Santorini, Greece',
    image: '/images/destinations/santorini.jpg',
    rating: 4.9,
    reviews: 892,
    price: '$1299',
    duration: '6 days',
    travelers: '1.8k',
    category: 'Island & Romance',
    description: 'Stunning sunsets and white-washed architecture',
    featured: true
  },
  {
    id: 3,
    name: 'Tokyo, Japan',
    image: '/images/destinations/tokyo.jpg',
    rating: 4.7,
    reviews: 1563,
    price: '$1499',
    duration: '8 days',
    travelers: '3.2k',
    category: 'City & Technology',
    description: 'Modern metropolis with traditional culture',
    featured: false
  },
  {
    id: 4,
    name: 'Machu Picchu, Peru',
    image: '/images/destinations/machu-picchu.jpg',
    rating: 4.9,
    reviews: 734,
    price: '$799',
    duration: '5 days',
    travelers: '1.2k',
    category: 'Adventure & History',
    description: 'Ancient Incan citadel in the Andes',
    featured: false
  },
  {
    id: 5,
    name: 'Maldives',
    image: '/images/destinations/maldives.jpg',
    rating: 4.8,
    reviews: 567,
    price: '$2499',
    duration: '7 days',
    travelers: '890',
    category: 'Luxury & Beach',
    description: 'Overwater bungalows and crystal clear waters',
    featured: true
  },
  {
    id: 6,
    name: 'New York, USA',
    image: '/images/destinations/new-york.jpg',
    rating: 4.6,
    reviews: 2134,
    price: '$999',
    duration: '6 days',
    travelers: '4.1k',
    category: 'City & Entertainment',
    description: 'The city that never sleeps',
    featured: false
  }
];

function FeaturedDestinations() {
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
      className="relative py-20 bg-white overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-indigo-50 to-transparent rounded-full opacity-30 blur-3xl"></div>
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
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Star className="w-4 h-4" />
            <span>Trending Now</span>
          </motion.div>
          
                     <motion.h2 
             variants={itemVariants}
             className="text-4xl md:text-5xl font-bold text-blue-500 mb-6"
           >
             Featured Destinations
           </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Discover the world's most captivating places, handpicked by our travel experts
          </motion.p>
        </motion.div>

        {/* Destinations Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              variants={itemVariants}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Featured Badge */}
              {destination.featured && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                  Featured
                </div>
              )}

              {/* Heart Button */}
              <button className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 hover:text-red-500 transition-all duration-300 group-hover:scale-110">
                <Heart className="w-5 h-5" />
              </button>

              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Category */}
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                    {destination.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {destination.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{destination.price}</div>
                    <div className="text-sm text-gray-500">per person</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-900">{destination.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({destination.reviews} reviews)</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {destination.description}
                </p>

                {/* Details */}
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{destination.travelers} travelers</span>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
                  <span>Explore Destination</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mt-16"
        >
          <motion.button
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturedDestinations;
