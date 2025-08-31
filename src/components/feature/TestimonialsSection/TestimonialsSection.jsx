'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, Calendar, Users, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Abdul Rahman',
    avatar: '/images/testimonials/sarah.jpg',
    location: 'New York, USA',
    trip: 'Bali Adventure Package',
    date: 'August 2025',
    travelers: 'Family of 4',
    rating: 5,
    content: 'Absolutely incredible experience! The Bali adventure package exceeded all our expectations. From the pristine beaches to the cultural tours, every moment was magical. Our kids loved the monkey forest and the cooking classes. Highly recommend!',
    highlights: ['Cultural Tours', 'Beach Activities', 'Family Friendly', 'Local Cuisine']
  },
  {
    id: 2,
    name: 'Ahmad Raza',
    avatar: '/images/testimonials/michael.jpg',
    location: 'Toronto, Canada',
    trip: 'European Explorer Tour',
    date: 'August 2025',
    travelers: 'Couple',
    rating: 5,
    content: 'This was our dream vacation come true! The European tour was perfectly planned with the right balance of guided tours and free time. The hotels were excellent, and our guide was incredibly knowledgeable. We visited 5 countries in 10 days and it felt seamless.',
    highlights: ['Multiple Countries', 'Expert Guide', 'Luxury Hotels', 'Cultural Sites']
  },
  {
    id: 3,
    name: 'Sohaib Azhar',
    avatar: '/images/testimonials/emma.jpg',
    location: 'Barcelona, Spain',
    trip: 'Maldives Luxury Escape',
    date: 'August 2025',
    travelers: 'Honeymoon',
    rating: 5,
    content: 'Our honeymoon in the Maldives was beyond words! The overwater bungalow was stunning, the service was impeccable, and the underwater activities were unforgettable. It was worth every penny for this once-in-a-lifetime experience.',
    highlights: ['Overwater Bungalow', 'Luxury Service', 'Water Activities', 'Romantic Setting']
  },
  {
    id: 4,
    name: 'Karim',
    avatar: '/images/testimonials/david.jpg',
    location: 'London, UK',
    trip: 'Tokyo City Experience',
    date: 'June 2025',
    travelers: 'Solo Traveler',
    rating: 4,
    content: 'As a solo traveler, I was initially nervous about visiting Japan, but the Tokyo experience package made everything so easy. The local guides were friendly, the accommodation was perfect, and I felt completely safe throughout my journey.',
    highlights: ['Solo Friendly', 'Local Guides', 'Safe Travel', 'Cultural Immersion']
  },
  {
    id: 5,
    name: 'Saqib Waheed',
    avatar: '/images/testimonials/lisa.jpg',
    location: 'Melbourne, Australia',
    trip: 'Machu Picchu Adventure',
    date: 'August 2025',
    travelers: 'Group of 6',
    rating: 5,
    content: 'The Machu Picchu adventure was absolutely breathtaking! The trek was challenging but rewarding, and our guide shared fascinating historical insights. The group size was perfect, and we made lifelong friends. The views were worth every step!',
    highlights: ['Adventure Trek', 'Historical Sites', 'Group Experience', 'Stunning Views']
  }
];

function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px'
  });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.2
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
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const backgroundVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.5, ease: "easeOut" }
    },
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section 
      ref={ref}
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        variants={backgroundVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-100 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6"
            style={{ willChange: 'transform, opacity' }}
          >
            What Our{' '}
            <span className="text-blue-500">
              Travelers Say
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={{ willChange: 'transform, opacity' }}
          >
            Real experiences from real travelers who have explored the world with us
          </motion.p>
        </motion.div>

        {/* Enhanced Testimonial Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative max-w-4xl mx-auto"
        >
          {/* Enhanced Navigation Buttons */}
          <motion.button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-blue-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{ willChange: 'transform' }}
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 mx-auto" />
          </motion.button>

          <motion.button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-blue-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{ willChange: 'transform' }}
          >
            <ChevronRight className="w-6 h-6 text-gray-600 mx-auto" />
          </motion.button>

          {/* Enhanced Testimonial Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Enhanced Quote Icon */}
              <motion.div 
                className="flex justify-center mb-8"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              {/* Enhanced Rating */}
              <motion.div 
                className="flex justify-center mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex gap-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Enhanced Testimonial Text */}
              <motion.blockquote 
                className="text-xl md:text-2xl text-gray-700 text-center leading-relaxed mb-8 italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{ willChange: 'transform, opacity' }}
              >
                "{currentTestimonial.content}"
              </motion.blockquote>

              {/* Enhanced Trip Details */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.div 
                  className="flex items-center justify-center gap-2 text-gray-600"
                  whileHover={{ scale: 1.05 }}
                  style={{ willChange: 'transform' }}
                >
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{currentTestimonial.trip}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center justify-center gap-2 text-gray-600"
                  whileHover={{ scale: 1.05 }}
                  style={{ willChange: 'transform' }}
                >
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{currentTestimonial.date}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center justify-center gap-2 text-gray-600"
                  whileHover={{ scale: 1.05 }}
                  style={{ willChange: 'transform' }}
                >
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{currentTestimonial.travelers}</span>
                </motion.div>
              </motion.div>

              {/* Enhanced Highlights */}
              <motion.div 
                className="flex flex-wrap justify-center gap-2 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {currentTestimonial.highlights.map((highlight, index) => (
                  <motion.span
                    key={index}
                    className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    style={{ willChange: 'transform' }}
                  >
                    {highlight}
                  </motion.span>
                ))}
              </motion.div>

              {/* Enhanced Author */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <motion.h4 
                  className="text-lg font-semibold text-gray-900"
                  style={{ willChange: 'color' }}
                >
                  {currentTestimonial.name}
                </motion.h4>
                <motion.p 
                  className="text-gray-600"
                  style={{ willChange: 'opacity' }}
                >
                  {currentTestimonial.location}
                </motion.p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Enhanced Dots Indicator */}
          <motion.div 
            className="flex justify-center gap-2 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-blue-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                style={{ willChange: 'transform' }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
