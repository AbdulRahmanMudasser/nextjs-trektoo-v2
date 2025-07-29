'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Star, MapPin, Clock, Users, Filter, ChevronDown, X, Calendar, DollarSign, Sparkles,
  ArrowLeft, Share, ChevronLeft, ChevronRight, CheckCircle, Globe, Zap, Shield
} from 'lucide-react';

// Mock data for activities
const mockActivities = [
  {
    id: 1,
    title: 'Baan Farm Thai Cooking School',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&crop=center',
    rating: 4.9,
    reviews: 235,
    bookings: '3K+',
    price: 24.79,
    originalPrice: 30.99,
    discount: 20,
    location: 'Bangkok',
    duration: '4 hours',
    guide: 'English guide',
    category: 'luxury',
    description: 'Learn authentic Thai cooking techniques in a traditional farm setting',
    availableDates: [new Date(2025, 6, 28), new Date(2025, 6, 29)],
  },
  {
    id: 2,
    title: 'Phi Phi Islands Speedboat Tour',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&crop=center',
    rating: 4.7,
    reviews: 892,
    price: 45.5,
    originalPrice: 55.0,
    discount: 17,
    location: 'Phuket',
    duration: '8 hours',
    guide: 'Multi-language guide',
    category: 'midrange',
    description: 'Explore the stunning Phi Phi Islands with snorkeling and beach visits',
    availableDates: [new Date(2025, 6, 28), new Date(2025, 6, 30)],
  },
  {
    id: 3,
    title: 'Bangkok Hop-On Hop-Off Bus',
    image: 'https://images.unsplash.com/photo-1563492065_63a48b7f421?w=400&h=300&fit=crop&crop=center',
    rating: 4.3,
    reviews: 456,
    price: 15.99,
    location: 'Bangkok',
    duration: '24 hours',
    guide: 'Audio guide',
    category: 'budget',
    description: "Discover Bangkok's top attractions at your own pace",
    availableDates: [new Date(2025, 6, 28), new Date(2025, 6, 29)],
  },
  {
    id: 4,
    title: 'Chiang Mai Mountain Hiking Adventure',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop&crop=center',
    rating: 4.8,
    reviews: 324,
    price: 35.2,
    originalPrice: 42.0,
    discount: 16,
    location: 'Chiang Mai',
    duration: '6 hours',
    guide: 'Local guide',
    category: 'midrange',
    description: 'Trek through lush mountains and visit hill tribe villages',
    availableDates: [new Date(2025, 6, 29), new Date(2025, 6, 30)],
  },
  {
    id: 5,
    title: 'Bangkok Food Street Walking Tour',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop&crop=center',
    rating: 4.6,
    reviews: 678,
    bookings: '4K+',
    price: 28.99,
    location: 'Bangkok',
    duration: '3 hours',
    guide: 'Food expert guide',
    category: 'budget',
    description: 'Taste authentic street food and learn about Thai culinary culture',
    availableDates: [new Date(2025, 6, 28), new Date(2025, 6, 29)],
  },
  {
    id: 6,
    title: 'Pattaya Floating Market Day Trip',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center',
    rating: 4.4,
    reviews: 543,
    bookings: '2.5K+',
    price: 32.5,
    location: 'Pattaya',
    duration: 'Full day',
    guide: 'English guide',
    category: 'midrange',
    description: 'Experience traditional Thai floating market culture',
    availableDates: [new Date(2025, 6, 28), new Date(2025, 6, 30)],
  },
];

const categories = [
  { id: 'luxury', label: 'Luxury', color: 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-purple-200' },
  { id: 'midrange', label: 'Mid-range', color: 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-emerald-200' },
  { id: 'budget', label: 'Budget', color: 'bg-gradient-to-r from-orange-50 to-yellow-50 text-orange-700 border-orange-200' },
];

const FilterDropdown = ({ 
  isOpen, 
  onToggle, 
  selectedCategories, 
  setSelectedCategories,
  priceRange,
  setPriceRange,
  adults,
  setAdults,
  children,
  setChildren,
  checkin,
  setCheckin,
  onClearFilters 
}) => {
  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onToggle}
        className="flex items-center gap-3 px-6 py-3 bg-white border-2 border-gray-200 rounded-2xl hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
      >
        <Filter className="h-5 w-5 text-gray-600 group-hover:text-blue-500 transition-colors" />
        <span className="font-semibold text-gray-800 group-hover:text-blue-500 transition-colors">Filters</span>
        <ChevronDown className={`h-5 w-5 text-gray-500 transition-all duration-300 ${isOpen ? 'rotate-180 text-blue-500' : 'group-hover:text-blue-500'}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 mt-3 w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 z-50 overflow-hidden backdrop-blur-lg"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-500" />
                  Filters
                </h3>
                <button
                  onClick={onToggle}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Categories</h4>
                <div className="grid grid-cols-1 gap-3">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryToggle(category.id)}
                      className={`px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-300 text-left ${
                        selectedCategories.includes(category.id)
                          ? 'bg-blue-500 text-white border-blue-500 shadow-lg transform scale-[1.02]'
                          : category.color + ' hover:shadow-md hover:scale-[1.01]'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Price Range</h4>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-3 bg-gradient-to-r from-gray-200 to-blue-200 rounded-full appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #e5e7eb 0%, #e5e7eb ${priceRange[1]}%, #3b82f6 ${priceRange[1]}%, #3b82f6 100%)`
                      }}
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">${priceRange[0]}</span>
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Guests */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Guests</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-2 block uppercase tracking-wide">Adults</label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(parseInt(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-semibold"
                    >
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-2 block uppercase tracking-wide">Children</label>
                    <select
                      value={children}
                      onChange={(e) => setChildren(parseInt(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-semibold"
                    >
                      {[0,1,2,3,4].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Date</h4>
                <div className="relative">
                  <input
                    type="date"
                    value={checkin ? checkin.toISOString().split('T')[0] : ''}
                    onChange={(e) => setCheckin(e.target.value ? new Date(e.target.value) : null)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-semibold"
                  />
                  <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={onClearFilters}
                  className="flex-1 px-6 py-3 text-gray-600 hover:text-gray-800 font-bold transition-colors border-2 border-gray-200 rounded-xl hover:border-gray-300"
                >
                  Clear All
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onToggle}
                  className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 font-bold transition-all shadow-lg hover:shadow-xl"
                >
                  Apply Filters
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ActivityCard = ({ activity, onFavoriteToggle, isFavorite, onViewDetails }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 relative cursor-pointer"
      onClick={() => onViewDetails(activity)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className="aspect-w-16 aspect-h-11">
          <img
            src={activity.image}
            alt={activity.title}
            className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/30 transition-all duration-500" />
        
        {/* Floating Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle(activity.id);
          }}
          className="absolute top-6 right-6 p-3 bg-white/95 backdrop-blur-sm rounded-2xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
          aria-label="Toggle favorite"
        >
          <Heart
            className={`h-5 w-5 transition-all duration-300 ${isFavorite ? 'text-red-500 fill-current scale-110' : 'text-gray-600'}`}
          />

        </button>
        
        {/* Discount Badge */}
        {activity.discount && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-6 left-6 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg"
          >
            {activity.discount}% OFF
          </motion.div>
        )}

        {/* Category Badge */}
        <div className="absolute bottom-4 left-6">
          {categories.map(cat => cat.id === activity.category && (
            <span key={cat.id} className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${cat.color} backdrop-blur-sm`}>
              {cat.label}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-500 transition-colors duration-300 mb-3 line-clamp-2">
          {activity.title}
        </h3>

        <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
          {activity.description}
        </p>

        {/* Meta Information */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="p-2 bg-gray-100 rounded-lg">
              <MapPin className="h-4 w-4" />
            </div>
            <span className="font-medium">{activity.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Clock className="h-4 w-4" />
            </div>
            <span className="font-medium">{activity.duration}</span>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm font-bold text-gray-900">{activity.rating}</span>
            </div>
            <span className="text-sm text-gray-500">({activity.reviews} reviews)</span>
          </div>
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {activity.bookings} booked
          </span>
        </div>

        {/* Pricing and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
                ${activity.price.toFixed(2)}
              </span>
              {activity.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${activity.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">per person</span>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(activity);
            }}
            className="px-6 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all duration-300 font-bold text-sm shadow-lg hover:shadow-xl"
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const ActivityDetailsView = ({ activity, onBack, isFavorite, onFavoriteToggle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [guests, setGuests] = useState(2);

  // Enhanced activity data for details view
  const detailsData = {
    ...activity,
    images: [
      activity.image,
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center'
    ],
    highlights: [
      'Expert local guide included',
      'Small group experience (max 15)',
      'Authentic cultural immersion',
      'Professional photos included',
      'All entrance fees covered',
      'Traditional local meal'
    ],
    itinerary: [
      { time: '09:00', title: 'Hotel Pickup', description: 'Comfortable pickup from your hotel' },
      { time: '10:00', title: 'Cultural Site Visit', description: 'Explore local landmarks and hidden gems' },
      { time: '12:00', title: 'Traditional Lunch', description: 'Authentic local cuisine experience' },
      { time: '14:00', title: 'Hands-on Activity', description: 'Interactive cultural workshop' },
      { time: '16:00', title: 'Return Journey', description: 'Return to your hotel with memories' }
    ]
  };

  const dates = [
    { date: '2025-07-29', label: 'Tomorrow', price: activity.price },
    { date: '2025-07-30', label: 'Wed, Jul 30', price: activity.price },
    { date: '2025-07-31', label: 'Thu, Jul 31', price: activity.price + 5 },
    { date: '2025-08-01', label: 'Fri, Aug 1', price: activity.price + 10 },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % detailsData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + detailsData.images.length) % detailsData.images.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
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
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onFavoriteToggle(activity.id)}
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
                alt="Activity"
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
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white rounded-full text-sm">
                {currentImageIndex + 1} / {detailsData.images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-3 overflow-x-auto">
              {detailsData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    currentImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Title & Basic Info */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {activity.category}
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Instant Confirmation
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{activity.title}</h1>
              <p className="text-lg text-gray-600 mb-4">{activity.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{activity.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{activity.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Max 15 guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>English, Thai</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(activity.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">{activity.rating}</span>
                  <span className="text-gray-600">({activity.reviews} reviews)</span>
                </div>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {activity.bookings} booked
                </div>
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
              <h3 className="text-xl font-bold text-gray-900 mb-4">What to Expect</h3>
              <div className="space-y-4">
                {detailsData.itinerary.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100">
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
            <div className="sticky top-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
              >
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ${activity.price}
                    </span>
                    {activity.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        ${activity.originalPrice}
                      </span>
                    )}
                    {activity.discount && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {activity.discount}% OFF
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">per person</p>
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-800 mb-3">Select Date</label>
                  <div className="grid grid-cols-1 gap-2">
                    {dates.map((dateOption) => (
                      <button
                        key={dateOption.date}
                        onClick={() => setSelectedDate(dateOption.date)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          selectedDate === dateOption.date
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-800">{dateOption.label}</span>
                          <span className="font-bold text-gray-900">${dateOption.price}</span>
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
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Total</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ${(activity.price * guests).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Book Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!selectedDate}
                  className="w-full py-4 bg-blue-500 text-white rounded-2xl font-bold text-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
                >
                  {selectedDate ? 'Book Now' : 'Select Date First'}
                </motion.button>

                {/* Features */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Zap className="h-4 w-4" />
                    <span>Instant confirmation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Shield className="h-4 w-4" />
                    <span>Free cancellation up to 24h</span>
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

const ActivitiesPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [checkin, setCheckin] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleFavoriteToggle = (activityId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(activityId)) {
        newFavorites.delete(activityId);
      } else {
        newFavorites.add(activityId);
      }
      return newFavorites;
    });
  };

  const handleViewDetails = (activity) => {
    setSelectedActivity(activity);
  };

  const handleBackToList = () => {
    setSelectedActivity(null);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 100]);
    setAdults(1);
    setChildren(0);
    setCheckin(null);
    setIsFilterOpen(false);
  };

  const filteredActivities = mockActivities.filter((activity) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(activity.category)) {
      return false;
    }
    if (activity.price < priceRange[0] || activity.price > priceRange[1]) {
      return false;
    }
    if (checkin) {
      const checkinDate = new Date(checkin);
      checkinDate.setHours(0, 0, 0, 0);
      const isAvailable = activity.availableDates.some((date) => {
        const activityDate = new Date(date);
        activityDate.setHours(0, 0, 0, 0);
        return activityDate.getTime() === checkinDate.getTime();
      });
      if (!isAvailable) return false;
    }
    const totalGuests = adults + children;
    if (totalGuests > 10) {
      return false;
    }
    return true;
  });

  const sortedActivities = [...filteredActivities].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviews - a.reviews;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {selectedActivity ? (
        <ActivityDetailsView 
          activity={selectedActivity} 
          onBack={handleBackToList}
          isFavorite={favorites.has(selectedActivity.id)}
          onFavoriteToggle={handleFavoriteToggle}
        />
      ) : (
        <>
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Discover Amazing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Experiences
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Book unforgettable experiences and create lasting memories with our curated selection of premium tours and activities
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-blue-500/25"
            >
              Explore Now
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-8">
          <div className="flex items-center gap-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {sortedActivities.length} Premium Activities
              </h2>
              <p className="text-gray-600">Handpicked experiences just for you</p>
            </div>
            <FilterDropdown
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              adults={adults}
              setAdults={setAdults}
              children={children}
              setChildren={setChildren}
              checkin={checkin}
              setCheckin={setCheckin}
              onClearFilters={clearFilters}
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-semibold transition-all hover:border-gray-300"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {sortedActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ActivityCard
                activity={activity}
                onFavoriteToggle={handleFavoriteToggle}
                isFavorite={favorites.has(activity.id)}
                onViewDetails={handleViewDetails}
              />
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {sortedActivities.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <div className="relative">
              <div className="text-gray-300 mb-8">
                <Users className="h-24 w-24 mx-auto" />
              </div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              No activities found
            </h3>
            <p className="text-gray-600 mb-10 max-w-md mx-auto text-lg">
              We couldn't find any activities matching your current filters. Try adjusting your search criteria.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              className="px-10 py-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all font-bold text-lg shadow-xl hover:shadow-2xl"
            >
              Clear All Filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </>
    )}

    {/* Overlay for mobile filter */}
    <AnimatePresence>
      {isFilterOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsFilterOpen(false)}
        />
      )}
    </AnimatePresence>
  </div>
);
};

export default ActivitiesPage;