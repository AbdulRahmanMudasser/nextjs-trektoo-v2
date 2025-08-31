'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, MapPin, Wifi, Droplets, Utensils, Car, Spa, Users, Bed } from 'lucide-react';

const HotelsList = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const hotels = [
    {
      id: 1,
      name: 'Luxury Resort & Spa',
      location: 'Beachfront Paradise',
      rating: 4.9,
      reviewCount: 1247,
      price: '$280',
      perNight: '/night',
      category: 'Luxury',
      description: 'Exclusive beachfront resort with world-class amenities and stunning ocean views.',
      amenities: ['Private beach access', 'Infinity pool', 'Spa & wellness center', 'Fine dining'],
      image: '/images/hotels/luxury-resort.jpg',
      rooms: 150,
      poolCount: 3,
      restaurantCount: 4
    },
    {
      id: 2,
      name: 'Boutique City Hotel',
      location: 'Downtown District',
      rating: 4.7,
      reviewCount: 892,
      price: '$120',
      perNight: '/night',
      category: 'Boutique',
      description: 'Charming boutique hotel in the heart of the city with personalized service.',
      amenities: ['Central location', 'Rooftop bar', 'Business center', 'Concierge service'],
      image: '/images/hotels/boutique-hotel.jpg',
      rooms: 45,
      poolCount: 1,
      restaurantCount: 2
    },
    {
      id: 3,
      name: 'Mountain Lodge',
      location: 'Alpine Retreat',
      rating: 4.8,
      reviewCount: 678,
      price: '$180',
      perNight: '/night',
      category: 'Adventure',
      description: 'Rustic mountain lodge perfect for outdoor enthusiasts and nature lovers.',
      amenities: ['Mountain views', 'Hiking trails', 'Fireplace rooms', 'Adventure tours'],
      image: '/images/hotels/mountain-lodge.jpg',
      rooms: 25,
      poolCount: 0,
      restaurantCount: 1
    },
    {
      id: 4,
      name: 'Business Hotel',
      location: 'Financial District',
      rating: 4.6,
      reviewCount: 1563,
      price: '$150',
      perNight: '/night',
      category: 'Business',
      description: 'Modern business hotel with state-of-the-art facilities and conference rooms.',
      amenities: ['Business center', 'Conference facilities', 'Fitness center', 'Room service'],
      image: '/images/hotels/business-hotel.jpg',
      rooms: 200,
      poolCount: 1,
      restaurantCount: 3
    },
    {
      id: 5,
      name: 'Family Resort',
      location: 'Entertainment Zone',
      rating: 4.5,
      reviewCount: 945,
      price: '$200',
      perNight: '/night',
      category: 'Family',
      description: 'Family-friendly resort with activities for all ages and entertainment options.',
      amenities: ['Kids club', 'Water park', 'Family activities', 'All-inclusive options'],
      image: '/images/hotels/family-resort.jpg',
      rooms: 300,
      poolCount: 5,
      restaurantCount: 6
    },
    {
      id: 6,
      name: 'Eco-Friendly Inn',
      location: 'Nature Reserve',
      rating: 4.4,
      reviewCount: 456,
      price: '$90',
      perNight: '/night',
      category: 'Eco',
      description: 'Sustainable accommodation surrounded by nature with eco-friendly practices.',
      amenities: ['Solar powered', 'Organic dining', 'Nature trails', 'Wildlife viewing'],
      image: '/images/hotels/eco-inn.jpg',
      rooms: 15,
      poolCount: 0,
      restaurantCount: 1
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
    <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={headerVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-500 tracking-tight mb-6">
            Perfect Places to Stay
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover exceptional accommodations that match your style and budget. From luxury resorts 
            to cozy boutique hotels, find your perfect home away from home.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {hotels.map((hotel) => (
            <motion.div
              key={hotel.id}
              variants={itemVariants}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100 hover:border-blue-200"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                    {hotel.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-20">
                  <div className="flex items-center space-x-1 text-white">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                    <span className="text-xs opacity-80">({hotel.reviewCount})</span>
                  </div>
                </div>
                {/* Placeholder for hotel image */}
                <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-blue-600 flex items-center justify-center">
                  <Bed className="w-16 h-16 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {hotel.name}
                  </h3>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-blue-500">{hotel.price}</span>
                    <span className="text-sm text-gray-500">{hotel.perNight}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="text-sm">{hotel.location}</span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {hotel.description}
                </p>

                {/* Hotel Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center text-blue-500 mb-1">
                      <Bed className="w-4 h-4" />
                    </div>
                    <p className="text-xs text-gray-500">Rooms</p>
                    <p className="text-sm font-semibold text-gray-900">{hotel.rooms}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-blue-500 mb-1">
                                             <Droplets className="w-4 h-4" />
                    </div>
                    <p className="text-xs text-gray-500">Pools</p>
                    <p className="text-sm font-semibold text-gray-900">{hotel.poolCount}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-blue-500 mb-1">
                      <Utensils className="w-4 h-4" />
                    </div>
                    <p className="text-xs text-gray-500">Restaurants</p>
                    <p className="text-sm font-semibold text-gray-900">{hotel.restaurantCount}</p>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Amenities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Special Offers */}
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
                  Special Hotel Packages
                </h3>
                <p className="text-blue-100 mb-6">
                  Take advantage of our exclusive hotel packages including extended stays, 
                  all-inclusive deals, and seasonal promotions.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3" />
                    <span>Extended stay discounts</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3" />
                    <span>All-inclusive packages</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-3" />
                    <span>Seasonal promotions</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors duration-200 text-lg">
                  View Packages
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HotelsList;
