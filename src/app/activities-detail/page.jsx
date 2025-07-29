'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users } from 'lucide-react';

// Import the separated components
import FilterDropdown from './components/FilterDropdown';
import ActivityCard from './components/ActivityCard';
import ActivityDetailsView from './components/ActivityDetailsView';
import { mockActivities } from './data/mockData';

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
    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(activity.category)) {
      return false;
    }
    
    // Price range filter
    if (activity.price < priceRange[0] || activity.price > priceRange[1]) {
      return false;
    }
    
    // Date filter (if checkin is provided, check if activity is available on that date)
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
    
    // Guest filter (assuming activities have a max capacity of 15 for consistency)
    const totalGuests = adults + children;
    if (totalGuests > 15) {
      return false;
    }
    
    return true;
  });

  const sortedActivities = [...filteredActivities].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviews - a.reviews; // 'popular' sorts by reviews
  });

  // If an activity is selected, show the details view
  if (selectedActivity) {
    return (
      <ActivityDetailsView 
        activity={selectedActivity} 
        onBack={handleBackToList}
        isFavorite={favorites.has(selectedActivity.id)}
        onFavoriteToggle={handleFavoriteToggle}
      />
    );
  }

  // Otherwise, show the main activities listing page
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
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