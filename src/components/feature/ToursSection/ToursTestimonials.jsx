'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const ToursTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      rating: 5,
      review: 'The Swiss Alps Adventure Trek was absolutely incredible! The guides were knowledgeable, the scenery was breathtaking, and the experience exceeded all expectations. Highly recommend!',
      tour: 'Swiss Alps Adventure Trek',
      date: 'March 2024'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Toronto, Canada',
      rating: 5,
      review: 'Our Japanese Cultural Immersion tour was a once-in-a-lifetime experience. The tea ceremony, temple visits, and local interactions made us feel truly connected to Japanese culture.',
      tour: 'Japanese Cultural Immersion',
      date: 'February 2024'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      location: 'Barcelona, Spain',
      rating: 5,
      review: 'The Safari Wildlife Experience in Tanzania was beyond words. Seeing the Big Five in their natural habitat was magical. The luxury lodges and expert rangers made it perfect.',
      tour: 'Safari Wildlife Experience',
      date: 'January 2024'
    },
    {
      id: 4,
      name: 'David Thompson',
      location: 'London, UK',
      rating: 5,
      review: 'The Italian Wine & Food Journey in Tuscany was a culinary dream come true. The wine tastings, cooking classes, and authentic local experiences were unforgettable.',
      tour: 'Italian Wine & Food Journey',
      date: 'December 2023'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      location: 'Melbourne, Australia',
      rating: 5,
      review: 'Iceland Northern Lights tour was spectacular! The aurora viewing, geothermal baths, and glacier hiking were all incredible. The guides were friendly and knowledgeable.',
      tour: 'Iceland Northern Lights',
      date: 'November 2023'
    },
    {
      id: 6,
      name: 'James Wilson',
      location: 'Chicago, USA',
      rating: 5,
      review: 'Moroccan Desert Adventure was an amazing cultural experience. Desert camping under the stars, camel trekking, and exploring the markets of Marrakech was incredible.',
      tour: 'Moroccan Desert Adventure',
      date: 'October 2023'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Our Travelers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our amazing travelers have to say about their unforgettable experiences with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 relative">
                {/* Quote Icon */}
                <div className="absolute -top-3 left-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-4 h-4" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4 mt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.review}"
                </blockquote>

                {/* Tour Name */}
                <div className="mb-4">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    {testimonial.tour}
                  </span>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                    <p className="text-xs text-gray-500">{testimonial.date}</p>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">15K+</div>
              <div className="text-gray-600">Happy Travelers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Tours Completed</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Create Your Own Story?
            </h3>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied travelers and embark on your next unforgettable adventure with TrekToo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Planning
              </button>
              <button className="border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm bg-white/10 hover:bg-white/20">
                Contact Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ToursTestimonials;
