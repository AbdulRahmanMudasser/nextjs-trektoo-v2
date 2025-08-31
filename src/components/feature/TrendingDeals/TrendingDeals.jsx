'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { Star, Clock, Tag, MapPin, Users, ArrowRight, Flame } from 'lucide-react';

const deals = [
  {
    id: 1,
    title: 'Early Bird Special: Bali Adventure',
    image: '/images/deals/bali-deal.jpg',
    originalPrice: '$1299',
    discountedPrice: '$899',
    discount: '30% OFF',
    validUntil: '2024-02-15',
    rating: 4.8,
    reviews: 1247,
    duration: '7 days',
    travelers: '2-4 people',
    location: 'Bali, Indonesia',
    description: 'Book early and save big on this tropical paradise adventure',
    featured: true,
    urgency: 'high'
  },
  {
    id: 2,
    title: 'Last Minute: European Explorer',
    image: '/images/deals/europe-deal.jpg',
    originalPrice: '$2499',
    discountedPrice: '$1799',
    discount: '28% OFF',
    validUntil: '2024-01-30',
    rating: 4.7,
    reviews: 892,
    duration: '10 days',
    travelers: '2-6 people',
    location: 'Multiple Cities',
    description: 'Visit 5 countries in one unforgettable journey',
    featured: false,
    urgency: 'medium'
  },
  {
    id: 3,
    title: 'Family Package: Disney World',
    image: '/images/deals/disney-deal.jpg',
    originalPrice: '$1899',
    discountedPrice: '$1399',
    discount: '26% OFF',
    validUntil: '2024-03-01',
    rating: 4.9,
    reviews: 2156,
    duration: '6 days',
    travelers: '4-6 people',
    location: 'Orlando, Florida',
    description: 'Magical family vacation with exclusive perks',
    featured: true,
    urgency: 'low'
  },
  {
    id: 4,
    title: 'Luxury Escape: Maldives Resort',
    image: '/images/deals/maldives-deal.jpg',
    originalPrice: '$3999',
    discountedPrice: '$2999',
    discount: '25% OFF',
    validUntil: '2024-02-28',
    rating: 4.9,
    reviews: 567,
    duration: '8 days',
    travelers: '2 people',
    location: 'Maldives',
    description: 'Overwater bungalow experience at premium resorts',
    featured: false,
    urgency: 'high'
  }
];

function TrendingDeals() {
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

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-red-500 bg-red-100';
      case 'medium': return 'text-orange-500 bg-orange-100';
      case 'low': return 'text-green-500 bg-green-100';
      default: return 'text-blue-500 bg-blue-100';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'high': return <Flame className="w-4 h-4" />;
      case 'medium': return <Clock className="w-4 h-4" />;
      case 'low': return <Tag className="w-4 h-4" />;
      default: return <Tag className="w-4 h-4" />;
    }
  };

  return (
    <section 
      ref={ref}
      className="relative py-20 bg-gradient-to-br from-orange-50 via-white to-red-50 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-40 h-40 bg-orange-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-red-100 rounded-full opacity-20 blur-3xl"></div>
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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
                            <Flame className="w-4 h-4" />
            <span>Limited Time Offers</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-blue-500 mb-6"
          >
            Trending Deals & Offers
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Don't miss out on these incredible travel deals. Book now and save big on your next adventure!
          </motion.p>
        </motion.div>

        {/* Deals Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              variants={itemVariants}
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                deal.featured ? 'ring-2 ring-orange-500' : ''
              }`}
            >
              {/* Featured Badge */}
              {deal.featured && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                  Featured Deal
                </div>
              )}

              {/* Urgency Badge */}
              <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-medium shadow-lg flex items-center gap-1 ${getUrgencyColor(deal.urgency)}`}>
                {getUrgencyIcon(deal.urgency)}
                <span className="font-medium">
                  {deal.urgency === 'high' ? 'Hurry!' : deal.urgency === 'medium' ? 'Soon' : 'Limited'}
                </span>
              </div>

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={deal.image}
                  alt={deal.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Discount Badge */}
                <div className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                  {deal.discount}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Header */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                  {deal.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-900">{deal.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({deal.reviews} reviews)</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {deal.description}
                </p>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{deal.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{deal.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{deal.travelers}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span>Valid until {new Date(deal.validUntil).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-orange-600">{deal.discountedPrice}</span>
                    <span className="text-lg text-gray-400 line-through">{deal.originalPrice}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Save</div>
                    <div className="text-lg font-bold text-green-600">
                      ${parseInt(deal.originalPrice.replace('$', '')) - parseInt(deal.discountedPrice.replace('$', ''))}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2">
                  <span>Book Now & Save</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Deals Button */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mt-16"
        >
          <motion.button
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <span>View All Deals</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default TrendingDeals;
