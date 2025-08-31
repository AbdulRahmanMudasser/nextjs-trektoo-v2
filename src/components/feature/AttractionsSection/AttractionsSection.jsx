'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Star, Clock, Ticket, Heart } from 'lucide-react';
import Image from 'next/image';

const AttractionsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const attractions = [
    {
      id: 1,
      name: 'Historic City Center',
      location: 'Downtown District',
      rating: 4.8,
      reviewCount: 1247,
      duration: '2-3 hours',
      price: '$15',
      image: '/images/attractions/historic-center.jpg',
      category: 'Cultural',
      description: 'Explore centuries-old architecture and vibrant street life in the heart of the city.',
      highlights: ['Architecture', 'Street Food', 'Local Markets', 'Photo Spots']
    },
    {
      id: 2,
      name: 'Mountain Viewpoint',
      location: 'Highland Region',
      rating: 4.9,
      reviewCount: 892,
      duration: '4-6 hours',
      price: '$25',
      image: '/images/attractions/mountain-view.jpg',
      category: 'Nature',
      description: 'Breathtaking panoramic views of the surrounding mountains and valleys.',
      highlights: ['Hiking Trails', 'Sunset Views', 'Wildlife', 'Camping']
    },
    {
      id: 3,
      name: 'Ancient Temple Complex',
      location: 'Sacred Valley',
      rating: 4.7,
      reviewCount: 1563,
      duration: '3-4 hours',
      price: '$20',
      image: '/images/attractions/ancient-temple.jpg',
      category: 'Historical',
      description: 'Discover the spiritual heritage and architectural marvels of ancient civilizations.',
      highlights: ['Architecture', 'Spiritual Sites', 'Guided Tours', 'Meditation']
    },
    {
      id: 4,
      name: 'Coastal Beach Resort',
      location: 'Seaside Paradise',
      rating: 4.6,
      reviewCount: 2034,
      duration: 'Full Day',
      price: '$35',
      image: '/images/attractions/coastal-beach.jpg',
      category: 'Leisure',
      description: 'Relax on pristine beaches with crystal clear waters and golden sands.',
      highlights: ['Beach Activities', 'Water Sports', 'Sunbathing', 'Beach Bars']
    },
    {
      id: 5,
      name: 'Adventure Park',
      location: 'Thrill Zone',
      rating: 4.5,
      reviewCount: 678,
      duration: '5-7 hours',
      price: '$45',
      image: '/images/attractions/adventure-park.jpg',
      category: 'Adventure',
      description: 'Experience adrenaline-pumping activities and outdoor adventures.',
      highlights: ['Zip Lining', 'Rock Climbing', 'Rope Courses', 'Team Building']
    },
    {
      id: 6,
      name: 'Botanical Gardens',
      location: 'Green Oasis',
      rating: 4.4,
      reviewCount: 945,
      duration: '2-3 hours',
      price: '$12',
      image: '/images/attractions/botanical-gardens.jpg',
      category: 'Nature',
      description: 'Wander through beautifully landscaped gardens with rare plant species.',
      highlights: ['Flora & Fauna', 'Walking Paths', 'Educational Tours', 'Peaceful Atmosphere']
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
          Must-See Attractions
        </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the most iconic and breathtaking attractions that make every destination unforgettable. 
            From ancient wonders to natural marvels, experience the best of what each place has to offer.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {attractions.map((attraction) => (
            <motion.div
              key={attraction.id}
              variants={itemVariants}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <div className="absolute top-4 right-4 z-20">
                  <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200">
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors duration-200" />
                  </button>
                </div>
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                    {attraction.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="flex items-center space-x-1 text-white">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{attraction.rating}</span>
                    <span className="text-xs opacity-80">({attraction.reviewCount})</span>
                  </div>
                </div>
                {/* Placeholder for image */}
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                  <span className="text-white text-lg font-medium">{attraction.name}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                    {attraction.name}
                  </h3>
                  <span className="text-2xl font-bold text-blue-500">{attraction.price}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="text-sm">{attraction.location}</span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {attraction.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="text-sm">{attraction.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Ticket className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="text-sm">Entry Fee</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {attraction.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
                  Book Experience
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Explore More Attractions?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Get exclusive access to hidden gems and local favorites that most tourists never discover.
            </p>
            <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              Discover Hidden Gems
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AttractionsSection;
