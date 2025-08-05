'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Share, Heart, Star, MapPin, Clock, Users, Globe, 
  ChevronLeft, ChevronRight, CheckCircle, Sparkles, Calendar,
  Zap, Shield, Eye, Phone, Mail, Award, Camera
} from 'lucide-react';

const ActivityDetailView = ({ activity, onBack, isFavorite, onFavoriteToggle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Enhanced activity data with fallbacks
  const detailsData = {
    ...activity,
    images: activity.gallery || [
      activity.image || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center'
    ],
    highlights: activity.highlights || [
      'Expert local guide included',
      'Small group experience (max 15)',
      'Authentic cultural immersion',
      'Professional photos included',
      'All entrance fees covered',
      'Traditional local meal',
      'Hotel pickup and drop-off',
      'Free cancellation up to 24h'
    ],
    itinerary: activity.itinerary || [
      { time: '09:00', title: 'Departure & Pickup', description: 'Comfortable pickup from your hotel or meeting point' },
      { time: '10:00', title: 'Activity Begins', description: 'Start your amazing experience with expert guidance' },
      { time: '12:00', title: 'Lunch Break', description: 'Enjoy authentic local cuisine (if included)' },
      { time: '14:00', title: 'Main Experience', description: 'Dive deep into the core activity experience' },
      { time: '16:00', title: 'Return Journey', description: 'Return to your hotel with unforgettable memories' }
    ],
    packages: activity.packages || [
      { 
        id: 1, 
        name: 'Standard Package', 
        price: 45, 
        originalPrice: 55,
        features: ['Basic experience', 'Group tour', 'Standard lunch'],
        duration: '6 hours'
      },
      { 
        id: 2, 
        name: 'Premium Package', 
        price: 75, 
        originalPrice: 90,
        features: ['Premium experience', 'Small group (max 8)', 'Gourmet lunch', 'Professional photos'],
        duration: '8 hours',
        popular: true
      },
      { 
        id: 3, 
        name: 'VIP Package', 
        price: 120, 
        originalPrice: 150,
        features: ['Private experience', 'Personal guide', 'Luxury transport', 'Premium meal', 'Photo package'],
        duration: '10 hours'
      }
    ]
  };

  // Sample available dates
  const dates = [
    { date: '2025-08-05', label: 'Tomorrow', available: true },
    { date: '2025-08-06', label: 'Wed, Aug 6', available: true },
    { date: '2025-08-07', label: 'Thu, Aug 7', available: false },
    { date: '2025-08-08', label: 'Fri, Aug 8', available: true },
    { date: '2025-08-09', label: 'Sat, Aug 9', available: true },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % detailsData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + detailsData.images.length) % detailsData.images.length);
  };

  const getLocationName = (cityId, countryId) => {
    const locationMap = {
      2: 'Hong Kong',
      4: 'Bangkok, Thailand',
      5: 'Chiang Mai, Thailand',
      17: 'Pattaya, Thailand',
      28: 'Tokyo, Japan',
    };
    return locationMap[cityId] || `City ${cityId}`;
  };

  const getCategoryName = (categoryId) => {
    const categoryMap = {
      1: 'Attractions',
      15: 'Experience',
      2: 'Tours',
      17: 'Transportation',
    };
    return categoryMap[categoryId] || 'Activity';
  };

  const getLanguageCount = (languages) => {
    return languages ? languages.length : 0;
  };

  const calculateTotalPrice = () => {
    if (!selectedPackage) return 0;
    return selectedPackage.price * guests;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-lg bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 truncate">{activity.title}</h1>
              <p className="text-sm text-gray-500">{getLocationName(activity.city_id, activity.country_id)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onFavoriteToggle(activity.activity_id)}
                className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Heart className={`h-6 w-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
              </button>
              <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
                <Share className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden group">
              <img
                src={detailsData.images[currentImageIndex]}
                alt={activity.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-gray-800" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white rounded-full text-sm flex items-center gap-2">
                <Camera className="h-4 w-4" />
                {currentImageIndex + 1} / {detailsData.images.length}
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  {getCategoryName(activity.category_id)}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {detailsData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    currentImageIndex === index ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Title & Basic Info */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {getCategoryName(activity.category_id)}
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Instant Confirmation
                </span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  Premium Experience
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{activity.title}</h1>
              
              {activity.sub_title && (
                <p className="text-lg text-gray-600 mb-6">{activity.sub_title}</p>
              )}
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span>{getLocationName(activity.city_id, activity.country_id)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span>6-8 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span>Max 15 guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-500" />
                  <span>{getLanguageCount(activity.supported_languages)} languages</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">4.8</span>
                  <span className="text-gray-600">(324 reviews)</span>
                </div>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  2,450+ booked
                </div>
              </div>
            </div>

            {/* Package Selection */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Choose Your Package</h3>
              <div className="space-y-4">
                {detailsData.packages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    whileHover={{ scale: 1.02 }}
                    className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedPackage?.id === pkg.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                    onClick={() => setSelectedPackage(pkg)}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-6">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{pkg.name}</h4>
                        <p className="text-sm text-gray-600">{pkg.duration}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-gray-900">${pkg.price}</span>
                          {pkg.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">${pkg.originalPrice}</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">per person</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                Experience Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {detailsData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">What to Expect</h3>
              <div className="space-y-4">
                {detailsData.itinerary.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-blue-600">{item.time}</span>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
              >
                {/* Price Display */}
                <div className="mb-6">
                  {selectedPackage ? (
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl font-bold text-gray-900">
                          ${selectedPackage.price}
                        </span>
                        {selectedPackage.originalPrice && (
                          <span className="text-lg text-gray-400 line-through">
                            ${selectedPackage.originalPrice}
                          </span>
                        )}
                        {selectedPackage.originalPrice && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            {Math.round(((selectedPackage.originalPrice - selectedPackage.price) / selectedPackage.originalPrice) * 100)}% OFF
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600">per person • {selectedPackage.name}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg text-gray-600 mb-2">From</p>
                      <span className="text-3xl font-bold text-gray-900">$45</span>
                      <p className="text-gray-600">per person</p>
                    </div>
                  )}
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-800 mb-3">Select Date</label>
                  <div className="grid grid-cols-1 gap-2">
                    {dates.map((dateOption) => (
                      <button
                        key={dateOption.date}
                        onClick={() => dateOption.available && setSelectedDate(dateOption.date)}
                        disabled={!dateOption.available}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          selectedDate === dateOption.date
                            ? 'border-blue-500 bg-blue-50'
                            : dateOption.available
                            ? 'border-gray-200 hover:border-gray-300'
                            : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`font-medium ${dateOption.available ? 'text-gray-800' : 'text-gray-400'}`}>
                            {dateOption.label}
                          </span>
                          {!dateOption.available && (
                            <span className="text-xs text-red-500">Sold Out</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Guests */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-800 mb-3">Guests</label>
                  <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl">
                    <span className="font-medium text-gray-800">Travelers</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="font-bold text-gray-900 w-8 text-center">{guests}</span>
                      <button
                        onClick={() => setGuests(Math.min(15, guests + 1))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Total */}
                {selectedPackage && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-800">Subtotal</span>
                      <span className="font-bold text-gray-900">
                        ${(selectedPackage.price * guests).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>{selectedPackage.price} × {guests} guests</span>
                    </div>
                  </div>
                )}

                {/* Book Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!selectedDate || !selectedPackage}
                  className="w-full py-4 bg-blue-500 text-white rounded-2xl font-bold text-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg mb-4"
                >
                  {!selectedPackage ? 'Select Package First' : !selectedDate ? 'Select Date First' : 'Book Now'}
                </motion.button>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Zap className="h-4 w-4" />
                    <span>Instant confirmation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Shield className="h-4 w-4" />
                    <span>Free cancellation up to 24h</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Phone className="h-4 w-4" />
                    <span>24/7 customer support</span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-3">Need Help?</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>support@klook.com</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailView;