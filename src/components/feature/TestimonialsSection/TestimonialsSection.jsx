'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Users,
  ArrowRight,
} from 'lucide-react';

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
    content:
      'Absolutely incredible experience! The Bali adventure package exceeded all our expectations. From the pristine beaches to the cultural tours, every moment was magical. Our kids loved the monkey forest and the cooking classes. Highly recommend!',
    highlights: [
      'Cultural Tours',
      'Beach Activities',
      'Family Friendly',
      'Local Cuisine',
    ],
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
    content:
      'This was our dream vacation come true! The European tour was perfectly planned with the right balance of guided tours and free time. The hotels were excellent, and our guide was incredibly knowledgeable. We visited 5 countries in 10 days and it felt seamless.',
    highlights: [
      'Multiple Countries',
      'Expert Guide',
      'Luxury Hotels',
      'Cultural Sites',
    ],
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
    content:
      'Our honeymoon in the Maldives was beyond words! The overwater bungalow was stunning, the service was impeccable, and the underwater activities were unforgettable. It was worth every penny for this once-in-a-lifetime experience.',
    highlights: [
      'Overwater Bungalow',
      'Luxury Service',
      'Water Activities',
      'Romantic Setting',
    ],
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
    content:
      'As a solo traveler, I was initially nervous about visiting Japan, but the Tokyo experience package made everything so easy. The local guides were friendly, the accommodation was perfect, and I felt completely safe throughout my journey.',
    highlights: [
      'Solo Friendly',
      'Local Guides',
      'Safe Travel',
      'Cultural Immersion',
    ],
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
    content:
      'The Machu Picchu adventure was absolutely breathtaking! The trek was challenging but rewarding, and our guide shared fascinating historical insights. The group size was perfect, and we made lifelong friends. The views were worth every step!',
    highlights: [
      'Adventure Trek',
      'Historical Sites',
      'Group Experience',
      'Stunning Views',
    ],
  },
];

function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px',
  });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  // Simplified variants for performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* Simplified Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-100 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Simplified Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
            What Our <span className="text-blue-500">Travelers Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real experiences from real travelers who have explored the world
            with us
          </p>
        </div>

        {/* Simplified Testimonial Content */}
        <div className="relative max-w-4xl mx-auto">
          {/* Simplified Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 mx-auto" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 mx-auto" />
          </button>

          {/* Simplified Testimonial Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            {/* Simplified Quote Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Simplified Rating */}
            <div className="flex justify-center mb-6">
              <div className="flex gap-1">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <div key={i}>
                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  </div>
                ))}
              </div>
            </div>

            {/* Simplified Testimonial Text */}
            <blockquote className="text-xl md:text-2xl text-gray-700 text-center leading-relaxed mb-8 italic">
              "{currentTestimonial.content}"
            </blockquote>

            {/* Simplified Trip Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{currentTestimonial.trip}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{currentTestimonial.date}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span className="text-sm">{currentTestimonial.travelers}</span>
              </div>
            </div>

            {/* Simplified Highlights */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {currentTestimonial.highlights.map((highlight, index) => (
                <span
                  key={index}
                  className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {highlight}
                </span>
              ))}
            </div>

            {/* Simplified Author */}
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-900">
                {currentTestimonial.name}
              </h4>
              <p className="text-gray-600">{currentTestimonial.location}</p>
            </div>
          </div>

          {/* Simplified Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-blue-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
