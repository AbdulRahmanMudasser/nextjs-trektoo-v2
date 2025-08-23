'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Users, Heart, Calendar } from 'lucide-react';
import Image from 'next/image';

const FeaturedTours = () => {
  const featuredTours = [
    {
      id: 1,
      title: 'Swiss Alps Adventure Trek',
      location: 'Interlaken, Switzerland',
      duration: '5 Days',
      groupSize: 'Max 12',
      rating: 4.9,
      reviewCount: 127,
      price: 1299,
      originalPrice: 1599,
      discount: 19,
      image: '/images/hero-bg-1.jpg',
      category: 'Adventure',
      highlights: ['Mountain hiking', 'Lake views', 'Local cuisine', 'Expert guide'],
      featured: true
    },
    {
      id: 2,
      title: 'Japanese Cultural Immersion',
      location: 'Kyoto, Japan',
      duration: '7 Days',
      groupSize: 'Max 8',
      rating: 4.8,
      reviewCount: 89,
      price: 1899,
      originalPrice: 2199,
      discount: 14,
      image: '/images/hero-bg-2.jpg',
      category: 'Cultural',
      highlights: ['Temple visits', 'Tea ceremony', 'Traditional crafts', 'Local markets'],
      featured: false
    },
    {
      id: 3,
      title: 'Safari Wildlife Experience',
      location: 'Serengeti, Tanzania',
      duration: '6 Days',
      groupSize: 'Max 6',
      rating: 4.9,
      reviewCount: 156,
      price: 2499,
      originalPrice: 2899,
      discount: 14,
      image: '/images/hero-bg-3.jpg',
      category: 'Nature',
      highlights: ['Big Five viewing', 'Luxury lodges', 'Expert rangers', 'Photography'],
      featured: true
    },
    {
      id: 4,
      title: 'Italian Wine & Food Journey',
      location: 'Tuscany, Italy',
      duration: '4 Days',
      groupSize: 'Max 10',
      rating: 4.7,
      reviewCount: 73,
      price: 999,
      originalPrice: 1199,
      discount: 17,
      image: '/images/italy-adventure.png',
      category: 'Food & Wine',
      highlights: ['Wine tasting', 'Cooking classes', 'Vineyard tours', 'Local restaurants'],
      featured: false
    },
    {
      id: 5,
      title: 'Iceland Northern Lights',
      location: 'Reykjavik, Iceland',
      duration: '5 Days',
      groupSize: 'Max 15',
      rating: 4.8,
      reviewCount: 94,
      price: 1699,
      originalPrice: 1999,
      discount: 15,
      image: '/images/france-adventure.jpg',
      category: 'Nature',
      highlights: ['Aurora viewing', 'Geothermal baths', 'Glacier hiking', 'Hot springs'],
      featured: true
    },
    {
      id: 6,
      title: 'Moroccan Desert Adventure',
      location: 'Marrakech, Morocco',
      duration: '6 Days',
      groupSize: 'Max 12',
      rating: 4.6,
      reviewCount: 67,
      price: 1199,
      originalPrice: 1399,
      discount: 14,
      image: '/images/thailand-adventure.jpg',
      category: 'Adventure',
      highlights: ['Desert camping', 'Camel trekking', 'Berber culture', 'Market exploration'],
      featured: false
    }
  ];

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
            Featured Tours & Experiences
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our handpicked selection of premium tours that offer unforgettable experiences and exceptional value.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
                {/* Image Container - Fixed Height */}
                <div className="relative h-64 overflow-hidden flex-shrink-0">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback to a default image if the specified image fails to load
                      e.target.src = '/images/hero-bg-1.jpg';
                    }}
                  />
                  
                  {/* Featured Badge */}
                  {tour.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      Featured
                    </div>
                  )}

                  {/* Heart Button - Positioned to the left of discount */}
                  <button className="absolute top-4 right-16 bg-white/90 hover:bg-white text-gray-600 hover:text-red-500 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-md">
                    <Heart className="w-4 h-4" />
                  </button>

                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{tour.discount}%
                  </div>

                  {/* Category Badge */}
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                    {tour.category}
                  </div>
                </div>

                {/* Content - Balanced Layout */}
                <div className="p-6 flex flex-col">
                  {/* Title and Rating */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {tour.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-gray-900">{tour.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({tour.reviewCount} reviews)</span>
                    </div>
                  </div>

                  {/* Location and Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{tour.location}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{tour.groupSize}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights - Compact Design with Background */}
                  <div className="mb-4 p-3 bg-gradient-to-r from-gray-50/50 to-blue-50/30 rounded-xl border border-gray-100/50">
                    <div className="flex flex-wrap gap-1.5">
                      {tour.highlights.slice(0, 3).map((highlight, idx) => (
                        <span
                          key={idx}
                          className="bg-white text-blue-700 text-xs font-medium px-2.5 py-1 rounded-lg border border-blue-200/50 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 hover:bg-blue-50"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price and CTA - Natural Flow */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">${tour.price}</span>
                        <span className="text-sm text-gray-500 line-through">${tour.originalPrice}</span>
                      </div>
                      <span className="text-xs text-gray-500">per person</span>
                    </div>
                    <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-md">
                      View Details
                    </button>
                  </div>
                </div>
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
            View All Tours
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedTours;
