import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Star, MapPin, Clock, Users, Globe, Zap, Shield, CheckCircle, X,
  ArrowLeft, Share, ChevronLeft, ChevronRight, Sparkles
} from 'lucide-react';

const ActivityDetailsView = ({ activity, onBack, isFavorite, onFavoriteToggle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [activeTab, setActiveTab] = useState('overview');

  // Enhanced activity data for details view
  const detailsData = {
    ...activity,
    subtitle: "Immerse yourself in authentic local culture with expert guides",
    images: [
      activity.image,
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1563492065_63a48b7f421?w=800&h=600&fit=crop&crop=center'
    ],
    highlights: [
      'Expert local guide with 10+ years experience',
      'Small intimate groups (max 15 people)',
      'Authentic cultural immersion experience',
      'Professional photography session included',
      'All entrance fees and permits covered',
      'Traditional local meal with vegetarian options',
      'Premium air-conditioned transportation',
      'Complimentary bottled water and snacks'
    ],
    fullDescription: `Embark on an extraordinary journey that transcends typical tourist experiences. This meticulously crafted adventure combines cultural immersion, culinary discovery, and authentic local interactions that will leave you with memories to last a lifetime.

Our expert guides are not just knowledgeable - they're passionate locals who have spent years perfecting this experience. They'll share hidden stories, local legends, and insider knowledge that you won't find in any guidebook.

From bustling markets filled with exotic spices to serene temples where monks have meditated for centuries, every moment is carefully curated to provide maximum cultural impact while ensuring your comfort and safety.

The culinary portion features carefully selected local establishments - some family-run for generations - where you'll taste authentic flavors that represent the true essence of the region's gastronomic heritage.`,
    
    itinerary: [
      { 
        time: '08:30', 
        title: 'Premium Hotel Pickup', 
        description: 'Luxury air-conditioned vehicle with complimentary refreshments',
        icon: '🚗',
        duration: '30 min'
      },
      { 
        time: '09:00', 
        title: 'Morning Market Exploration', 
        description: 'Discover exotic spices, tropical fruits, and local delicacies with tastings',
        icon: '🛒',
        duration: '90 min'
      },
      { 
        time: '10:30', 
        title: 'Hidden Temple Discovery', 
        description: 'Visit ancient temples away from crowds with meditation session',
        icon: '🏛️',
        duration: '75 min'
      },
      { 
        time: '12:00', 
        title: 'Traditional Cooking Workshop', 
        description: 'Hands-on cooking class with local chef and family recipes',
        icon: '👨‍🍳',
        duration: '120 min'
      },
      { 
        time: '14:00', 
        title: 'Authentic Local Lunch', 
        description: 'Enjoy the dishes you prepared with wine pairing',
        icon: '🍽️',
        duration: '60 min'
      },
      { 
        time: '15:00', 
        title: 'Cultural Performance', 
        description: 'Traditional dance and music with historical context',
        icon: '🎭',
        duration: '45 min'
      },
      { 
        time: '16:00', 
        title: 'Artisan Workshop Visit', 
        description: 'Meet local craftspeople and try traditional techniques',
        icon: '🎨',
        duration: '60 min'
      },
      { 
        time: '17:00', 
        title: 'Sunset Photo Session', 
        description: 'Professional photographer captures your memories',
        icon: '📸',
        duration: '30 min'
      },
      { 
        time: '17:30', 
        title: 'Return Journey', 
        description: 'Comfortable return with photo slideshow and certificate',
        icon: '🏨',
        duration: '45 min'
      }
    ],
    
    included: [
      'Expert English-speaking guide (certified)',
      'Premium air-conditioned transportation',
      'All entrance fees and permits',
      'Traditional cooking workshop with chef',
      'Authentic local lunch with beverages',
      'Professional photography session (20+ photos)',
      'Cultural performance tickets',
      'Artisan workshop materials',
      'Bottled water and local snacks',
      'Travel insurance coverage',
      'Certificate of cultural participation',
      'Digital recipe book with cooking techniques'
    ],
    
    excluded: [
      'Personal shopping and souvenirs',
      'Additional alcoholic beverages',
      'Tips for guides (optional but appreciated)',
      'Hotel accommodation',
      'International flights',
      'Travel visa fees'
    ],
    
    importantInfo: [
      'Comfortable walking shoes recommended',
      'Moderate fitness level required (2km walking)',
      'Not suitable for mobility-impaired guests',
      'Minimum age: 12 years',
      'Dietary restrictions accommodated with advance notice',
      'Weather-dependent outdoor activities',
      'Photography restrictions in some temples',
      'Respectful attire required for cultural sites'
    ],
    
    whatToBring: [
      'Camera or smartphone for personal photos',
      'Sunscreen and hat for outdoor activities',
      'Light, comfortable clothing',
      'Refillable water bottle',
      'Cash for optional purchases',
      'Respectful attire for temples',
      'Appetite for adventure and new flavors!'
    ],
    
    reviews: [
      {
        id: 1,
        name: 'Sarah Chen',
        country: 'Singapore',
        rating: 5,
        date: '2025-07-25',
        comment: 'Absolutely phenomenal experience! Our guide Maya was incredibly knowledgeable and passionate. The cooking class was the highlight - I still make the recipes at home. The small group size made it feel very personal and intimate.',
        verified: true,
        photos: 2,
        helpful: 23
      },
      {
        id: 2,
        name: 'Marcus Johnson',
        country: 'USA',
        rating: 5,
        date: '2025-07-22',
        comment: 'This tour exceeded all expectations. The hidden temples were breathtaking and the cultural performance was mesmerizing. The photography session was a nice touch - we got amazing shots. Highly recommend for anyone wanting authentic cultural immersion.',
        verified: true,
        photos: 5,
        helpful: 18
      },
      {
        id: 3,
        name: 'Emma Wilson',
        country: 'Australia',
        rating: 4,
        date: '2025-07-20',
        comment: 'Great overall experience with excellent food and knowledgeable guide. The artisan workshop was fascinating. Only minor complaint was the pace felt a bit rushed at times, but understandable given the packed itinerary.',
        verified: true,
        photos: 1,
        helpful: 12
      },
      {
        id: 4,
        name: 'David Kim',
        country: 'South Korea',
        rating: 5,
        date: '2025-07-18',
        comment: 'Perfect blend of culture, food, and hands-on activities. The cooking workshop was fun and the local lunch was delicious. Our guide spoke perfect English and was very accommodating to our dietary needs.',
        verified: true,
        photos: 3,
        helpful: 15
      }
    ],
    
    languages: ['English', 'Thai', 'Mandarin', 'Japanese'],
    maxGuests: 15,
    instantConfirmation: true,
    freeCancellation: true,
    mobileTicket: true,
    accessibility: 'Not wheelchair accessible',
    ageRestriction: 'Minimum age 12 years'
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'itinerary', label: 'Itinerary', icon: '📅' },
    { id: 'included', label: 'What\'s Included', icon: '✅' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
    { id: 'policies', label: 'Policies', icon: '📜' }
  ];

  const dates = [
    { date: '2025-07-29', label: 'Tomorrow', price: activity.price, availability: 'Limited spots', spots: 3 },
    { date: '2025-07-30', label: 'Wed, Jul 30', price: activity.price, availability: 'Available', spots: 8 },
    { date: '2025-07-31', label: 'Thu, Jul 31', price: activity.price + 5, availability: 'Available', spots: 12 },
    { date: '2025-08-01', label: 'Fri, Aug 1', price: activity.price + 10, availability: 'High demand', spots: 2 },
    { date: '2025-08-02', label: 'Sat, Aug 2', price: activity.price + 15, availability: 'Available', spots: 6 },
    { date: '2025-08-03', label: 'Sun, Aug 3', price: activity.price + 12, availability: 'Available', spots: 9 }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % detailsData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + detailsData.images.length) % detailsData.images.length);
  };

  const getAvailabilityColor = (availability) => {
    switch(availability) {
      case 'Limited spots': return 'text-red-600 bg-red-50';
      case 'High demand': return 'text-orange-600 bg-orange-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Premium Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300 group"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600 group-hover:text-blue-500" />
            </motion.button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 truncate">{activity.title}</h1>
              <p className="text-sm text-gray-600">{activity.location}</p>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onFavoriteToggle(activity.id)}
                className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300"
              >
                <Heart className={`h-6 w-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300"
              >
                <Share className="h-6 w-6 text-gray-600" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Image Gallery */}
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden group">
                <img
                  src={detailsData.images[currentImageIndex]}
                  alt="Activity"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                
                {/* Play button for first image (video) */}
                {currentImageIndex === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-6 bg-white/90 rounded-full shadow-2xl backdrop-blur-sm"
                    >
                      <div className="w-6 h-6 ml-1 bg-blue-500 rounded-sm flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent"></div>
                      </div>
                    </motion.button>
                  </div>
                )}
                
                {/* Navigation Arrows */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 p-4 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all duration-300"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-800" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 p-4 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all duration-300"
                >
                  <ChevronRight className="h-6 w-6 text-gray-800" />
                </motion.button>

                {/* Image Counter & View All Button */}
                <div className="absolute bottom-6 right-6 flex items-center gap-3">
                  <button className="px-4 py-2 bg-black/70 text-white rounded-full text-sm font-medium hover:bg-black/80 transition-colors">
                    View All Photos
                  </button>
                  <div className="px-4 py-2 bg-black/70 text-white rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {detailsData.images.length}
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-6 left-6">
                  <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {activity.category}
                  </span>
                </div>
              </div>

              {/* Enhanced Thumbnail Strip */}
              <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
                {detailsData.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-3 transition-all ${
                      currentImageIndex === index ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    {index === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-[6px] border-l-gray-800 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent ml-0.5"></div>
                        </div>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Premium Title & Info Section */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold">
                  Premium Experience
                </span>
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  Instant Confirmation
                </span>
                <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-bold">
                  Small Groups Only
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{activity.title}</h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">{detailsData.subtitle}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-2xl">
                  <MapPin className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-800">{activity.location}</p>
                  <p className="text-xs text-gray-600">Location</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-2xl">
                  <Clock className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-800">{activity.duration}</p>
                  <p className="text-xs text-gray-600">Duration</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-2xl">
                  <Users className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-800">Max {detailsData.maxGuests}</p>
                  <p className="text-xs text-gray-600">Group Size</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-2xl">
                  <Globe className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-800">{detailsData.languages.length} Languages</p>
                  <p className="text-xs text-gray-600">Available</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-6 w-6 ${i < Math.floor(activity.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-xl font-bold text-gray-900">{activity.rating}</span>
                    <span className="text-gray-600">({activity.reviews} reviews)</span>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                  {activity.bookings} travelers booked
                </div>
              </div>
            </div>

            {/* Experience Highlights */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                What Makes This Special
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detailsData.highlights.map((highlight, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm"
                  >
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Enhanced Tabs */}
            <div>
              <div className="flex gap-2 mb-8 bg-white p-2 rounded-2xl shadow-lg border border-gray-100 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 rounded-xl font-bold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Premium Tab Content */}
              <div className="min-h-[500px]">
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">About This Experience</h3>
                      <div className="prose prose-lg max-w-none">
                        {detailsData.fullDescription.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-3xl border border-red-100">
                        <h4 className="font-bold text-red-800 mb-6 flex items-center gap-3 text-xl">
                          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-lg">⚠️</span>
                          </div>
                          Important Information
                        </h4>
                        <ul className="space-y-3">
                          {detailsData.importantInfo.map((info, index) => (
                            <li key={index} className="flex items-start gap-3 text-red-700">
                              <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="font-medium">{info}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl border border-purple-100">
                        <h4 className="font-bold text-purple-800 mb-6 flex items-center gap-3 text-xl">
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-lg">🎒</span>
                          </div>
                          What to Bring
                        </h4>
                        <ul className="space-y-3">
                          {detailsData.whatToBring.map((item, index) => (
                            <li key={index} className="flex items-start gap-3 text-purple-700">
                              <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="font-medium">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'itinerary' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                      <h3 className="text-2xl font-bold text-gray-900 mb-8">Detailed Schedule</h3>
                      <div className="space-y-6">
                        {detailsData.itinerary.map((item, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex gap-6 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl border border-gray-100 hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex-shrink-0">
                              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                                {item.icon}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-3">
                                <span className="font-bold text-blue-600 text-lg bg-blue-100 px-3 py-1 rounded-full">{item.time}</span>
                                <span className="text-sm font-medium text-gray-500 bg-gray-200 px-3 py-1 rounded-full">{item.duration}</span>
                              </div>
                              <h4 className="font-bold text-gray-900 text-xl mb-2">{item.title}</h4>
                              <p className="text-gray-700 leading-relaxed text-lg">{item.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'included' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl border border-green-100 shadow-lg">
                        <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-white" />
                          </div>
                          What's Included
                        </h3>
                        <ul className="space-y-4">
                          {detailsData.included.map((item, index) => (
                            <li key={index} className="flex items-start gap-4">
                              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                              <span className="text-gray-700 font-medium text-lg">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-red-50 to-pink-50 p-8 rounded-3xl border border-red-100 shadow-lg">
                        <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center gap-3">
                          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                            <X className="h-5 w-5 text-white" />
                          </div>
                          What's Not Included
                        </h3>
                        <ul className="space-y-4">
                          {detailsData.excluded.map((item, index) => (
                            <li key={index} className="flex items-start gap-4">
                              <X className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                              <span className="text-gray-700 font-medium text-lg">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-gray-900">Guest Reviews</h3>
                        <div className="flex items-center gap-3">
                          <Star className="h-6 w-6 text-yellow-400 fill-current" />
                          <span className="font-bold text-gray-900 text-xl">{activity.rating}</span>
                          <span className="text-gray-600">({activity.reviews} reviews)</span>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        {detailsData.reviews.map((review) => (
                          <div key={review.id} className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-100">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                  {review.name.charAt(0)}
                                </div>
                                <div>
                                  <h4 className="font-bold text-gray-900 text-lg">{review.name}</h4>
                                  <p className="text-gray-600">{review.country}</p>
                                </div>
                              </div>
                              {review.verified && (
                                <div className="flex items-center gap-2 text-green-600 bg-green-100 px-3 py-1 rounded-full">
                                  <CheckCircle className="h-4 w-4" />
                                  <span className="text-sm font-medium">Verified</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-4 mb-4">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                              <span className="text-gray-500 font-medium">{review.date}</span>
                              {review.photos > 0 && (
                                <span className="text-blue-600 bg-blue-100 px-2 py-1 rounded-full text-xs font-medium">
                                  {review.photos} photos
                                </span>
                              )}
                            </div>
                            
                            <p className="text-gray-700 leading-relaxed text-lg mb-4">{review.comment}</p>
                            
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>{review.helpful} people found this helpful</span>
                              <button className="text-blue-600 hover:text-blue-800 font-medium">Helpful</button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="text-center mt-8">
                        <button className="px-8 py-4 border-2 border-blue-500 text-blue-600 rounded-2xl hover:bg-blue-500 hover:text-white transition-all font-bold text-lg">
                          View All {activity.reviews} Reviews
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'policies' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                      <h3 className="text-2xl font-bold text-gray-900 mb-8">Cancellation & Refund Policy</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl text-center border border-green-100">
                          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="h-8 w-8 text-white" />
                          </div>
                          <h4 className="font-bold text-green-800 mb-2 text-lg">Free Cancellation</h4>
                          <p className="text-green-700 font-medium">Up to 24 hours before</p>
                          <p className="text-sm text-green-600 mt-2">100% refund guaranteed</p>
                        </div>

                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl text-center border border-yellow-100">
                          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="h-8 w-8 text-white" />
                          </div>
                          <h4 className="font-bold text-yellow-800 mb-2 text-lg">Partial Refund</h4>
                          <p className="text-yellow-700 font-medium">12-24 hours before</p>
                          <p className="text-sm text-yellow-600 mt-2">50% refund available</p>
                        </div>

                        <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl text-center border border-red-100">
                          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <X className="h-8 w-8 text-white" />
                          </div>
                          <h4 className="font-bold text-red-800 mb-2 text-lg">No Refund</h4>
                          <p className="text-red-700 font-medium">Less than 12 hours</p>
                          <p className="text-sm text-red-600 mt-2">No refund available</p>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                        <h4 className="font-bold text-blue-800 mb-4 text-lg">Additional Terms</h4>
                        <ul className="space-y-3 text-blue-700">
                          <li className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span>Weather-related cancellations receive full refund</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span>Refunds processed within 5-7 business days</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span>Group bookings may have different terms</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <span>24/7 customer support for cancellations</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
              >
                {/* Premium Price Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-bold">
                      ${activity.price}
                    </span>
                    {activity.originalPrice && (
                      <span className="text-xl text-blue-100 line-through">
                        ${activity.originalPrice}
                      </span>
                    )}
                    {activity.discount && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {activity.discount}% OFF
                      </span>
                    )}
                  </div>
                  <p className="text-blue-100">per person • Best price guaranteed</p>
                </div>

                <div className="p-6">
                  {/* Enhanced Date Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-800 mb-4">Select Your Date</label>
                    <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
                      {dates.map((dateOption) => (
                        <button
                          key={dateOption.date}
                          onClick={() => setSelectedDate(dateOption.date)}
                          className={`p-4 rounded-2xl border-2 text-left transition-all ${
                            selectedDate === dateOption.date
                              ? 'border-blue-500 bg-blue-50 shadow-lg'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-gray-800">{dateOption.label}</span>
                            <span className="font-bold text-gray-900">${dateOption.price}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getAvailabilityColor(dateOption.availability)}`}>
                              {dateOption.availability}
                            </span>
                            <span className="text-xs text-gray-500">{dateOption.spots} spots left</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Guests Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-800 mb-4">Number of Travelers</label>
                    <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-2xl bg-gray-50">
                      <div>
                        <span className="font-bold text-gray-800">Adults</span>
                        <p className="text-xs text-gray-600">Age 13+</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 font-bold text-lg"
                        >
                          -
                        </button>
                        <span className="font-bold text-gray-900 w-8 text-center text-lg">{guests}</span>
                        <button
                          onClick={() => setGuests(Math.min(15, guests + 1))}
                          className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 font-bold text-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Base price x {guests}</span>
                      <span className="font-medium text-gray-900">${(activity.price * guests).toFixed(2)}</span>
                    </div>
                    {activity.discount && (
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-green-600">Discount ({activity.discount}%)</span>
                        <span className="font-medium text-green-600">-${((activity.originalPrice - activity.price) * guests).toFixed(2)}</span>
                      </div>
                    )}
                    <hr className="my-3" />
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900 text-lg">Total</span>
                      <span className="text-2xl font-bold text-gray-900">
                        ${(activity.price * guests).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Enhanced Book Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!selectedDate}
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    {selectedDate ? 'Reserve Your Spot' : 'Select Date First'}
                  </motion.button>

                  {/* Trust Signals */}
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-3 text-sm text-green-600">
                      <Zap className="h-5 w-5" />
                      <span className="font-medium">Instant confirmation guaranteed</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-green-600">
                      <Shield className="h-5 w-5" />
                      <span className="font-medium">Free cancellation up to 24h</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Mobile ticket accepted</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-green-600">
                      <Users className="h-5 w-5" />
                      <span className="font-medium">Small group experience</span>
                    </div>
                  </div>

                  {/* Contact Support */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <h4 className="font-bold text-blue-800 mb-2">Need Help?</h4>
                    <p className="text-blue-700 text-sm mb-3">Our travel experts are here to assist you</p>
                    <button className="text-blue-600 hover:text-blue-800 font-bold text-sm">
                      Contact Support →
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Call Us</h4>
              <p className="text-gray-600 text-sm">+66 2 123 4567</p>
              <p className="text-gray-500 text-xs">Available 24/7</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Live Chat</h4>
              <p className="text-gray-600 text-sm">Instant support</p>
              <p className="text-gray-500 text-xs">Response in 2 minutes</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Email</h4>
              <p className="text-gray-600 text-sm">support@klook.com</p>
              <p className="text-gray-500 text-xs">Reply within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailsView;