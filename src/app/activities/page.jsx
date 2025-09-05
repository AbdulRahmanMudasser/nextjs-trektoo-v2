'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, AlertCircle } from 'lucide-react';
import { useActivities, useCategories } from '@/hooks/klookHooks';
import ActivityCard from '@/components/feature/ActivitiesDetail/ActivityCard';
import FilterDropdown from '@/components/feature/ActivitiesDetail/FilterDropdown';
import EmptyState from '@/components/ui/EmptyState';

const ActivitiesPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Fetch categories
  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();

  // Fetch activities with current filters
  const activitiesParams = {
    page: currentPage,
    limit: 12,
    categoryIds: selectedCategories.join(','),
    countryIds: selectedCountries.join(','),
    cityIds: selectedCities.join(','),
  };

  const {
    data: activitiesData,
    isLoading: activitiesLoading,
    error: activitiesError,
    refetch: refetchActivities,
  } = useActivities(activitiesParams);

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
    // You can navigate to details page or open modal here
    console.log('View details for:', activity);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedCountries([]);
    setSelectedCities([]);
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Error handling
  if (activitiesError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            Failed to load activities. Please try again.
          </p>
          <button
            onClick={() => refetchActivities()}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Discover Amazing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Activities
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Explore incredible experiences and create unforgettable memories
              with our curated selection of premium activities worldwide
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-blue-500/25"
              onClick={() =>
                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
              }
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
                {activitiesLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    Loading Activities...
                  </span>
                ) : (
                  `${activitiesData?.total || 0} Premium Activities`
                )}
              </h2>
              <p className="text-gray-600">
                Handpicked experiences just for you
              </p>
            </div>
            <FilterDropdown
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedCountries={selectedCountries}
              setSelectedCountries={setSelectedCountries}
              selectedCities={selectedCities}
              setSelectedCities={setSelectedCities}
              categories={categoriesData?.categories || []}
              onClearFilters={clearFilters}
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-600">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-semibold transition-all hover:border-gray-300"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {activitiesLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                Loading amazing activities...
              </p>
            </div>
          </div>
        )}

        {/* Activities Grid */}
        {!activitiesLoading && activitiesData?.data && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {activitiesData.data.map((activity, index) => (
              <motion.div
                key={activity.activity_id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ActivityCard
                  activity={activity}
                  onFavoriteToggle={handleFavoriteToggle}
                  isFavorite={favorites.has(activity.activity_id)}
                  onViewDetails={handleViewDetails}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!activitiesLoading &&
          (!activitiesData?.data || activitiesData.data.length === 0) && (
            <EmptyState
              icon={Users}
              title="No activities found"
              subtitle="We couldn't find any activities matching your current filters. Try adjusting your search criteria."
              action={
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="px-10 py-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all font-bold text-lg shadow-xl hover:shadow-2xl"
                >
                  Clear All Filters
                </motion.button>
              }
            />
          )}

        {/* Pagination */}
        {!activitiesLoading &&
          activitiesData?.data &&
          activitiesData.data.length > 0 && (
            <div className="flex justify-center items-center mt-16 gap-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from(
                  {
                    length: Math.min(
                      5,
                      Math.ceil(activitiesData.total / activitiesData.limit)
                    ),
                  },
                  (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-12 h-12 rounded-xl font-bold transition-all ${
                          currentPage === page
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                )}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!activitiesData?.hasNext}
                className="px-6 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
              >
                Next
              </button>
            </div>
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
