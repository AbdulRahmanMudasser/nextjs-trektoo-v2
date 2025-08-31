'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Award, Star, CheckCircle } from 'lucide-react';

const partners = [
  {
    name: 'Booking.com',
    logo: '/images/partners/booking.png',
    category: 'Hotel Partner',
    rating: 4.8,
    description: 'World\'s leading hotel booking platform'
  },
  {
    name: 'Expedia',
    logo: '/images/partners/expedia.png',
    category: 'Travel Partner',
    rating: 4.7,
    description: 'Global travel technology company'
  },
  {
    name: 'Airbnb',
    logo: '/images/partners/airbnb.png',
    category: 'Accommodation Partner',
    rating: 4.9,
    description: 'Unique stays and experiences'
  },
  {
    name: 'TripAdvisor',
    logo: '/images/partners/tripadvisor.png',
    category: 'Review Partner',
    rating: 4.6,
    description: 'Trusted travel reviews and recommendations'
  },
  {
    name: 'Viator',
    logo: '/images/partners/viator.png',
    category: 'Experience Partner',
    rating: 4.8,
    description: 'Book tours, activities, and attractions'
  },
  {
    name: 'Kayak',
    logo: '/images/partners/kayak.png',
    category: 'Flight Partner',
    rating: 4.7,
    description: 'Search flights, hotels, and car rentals'
  }
];

const certifications = [
  {
    icon: Shield,
    title: 'IATA Certified',
    description: 'International Air Transport Association member'
  },
  {
    icon: Award,
    title: 'ISO 9001:2015',
    description: 'Quality management system certified'
  },
  {
    icon: Star,
    title: '5-Star Rating',
    description: 'Consistently rated 5 stars by customers'
  },
  {
    icon: CheckCircle,
    title: 'BBB Accredited',
    description: 'Better Business Bureau accredited business'
  }
];

function PartnersSection() {
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
            <Shield className="w-4 h-4" />
            <span>Trusted Partners</span>
          </motion.div>
          
                     <motion.h2 
             variants={itemVariants}
             className="text-4xl md:text-5xl font-bold text-blue-500 mb-6"
           >
             Partnering with Industry Leaders
           </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            We collaborate with the world's most trusted travel brands to bring you the best 
            experiences, prices, and service quality. Our partnerships ensure you get access 
            to exclusive deals and premium services.
          </motion.p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              variants={itemVariants}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 hover:border-blue-200"
            >
              {/* Partner Logo Placeholder */}
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="text-2xl font-bold text-blue-600">
                  {partner.name.charAt(0)}
                </div>
              </div>

              {/* Partner Info */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {partner.name}
                </h3>
                <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
                  {partner.category}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {partner.description}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(partner.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {partner.rating}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12"
        >
          <motion.h3
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900 text-center mb-12"
          >
            Our Certifications & Accreditations
          </motion.h3>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <cert.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {cert.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mt-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-6 py-3 rounded-full text-sm font-medium"
          >
            <CheckCircle className="w-4 h-4" />
            <span>100% Secure & Trusted</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default PartnersSection;
