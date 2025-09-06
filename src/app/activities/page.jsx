'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Users,
  AlertCircle,
  ArrowLeft,
  Grid,
  List,
  Search,
  Filter,
  Loader2,
} from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ActivityGridSkeleton } from '@/components/ui/LoadingSkeleton';
import { useActivities, useCategories } from '@/hooks/klookHooks';
import ActivityCard from '@/components/feature/ActivitiesDetail/ActivityCard';
import FilterDropdown from '@/components/feature/ActivitiesDetail/FilterDropdown';
import EmptyState from '@/components/ui/EmptyState';
import Link from 'next/link';

const ActivitiesPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryName, setSelectedCategoryName] = useState('');

  // Fetch categories
  const { data: categoriesData, isLoading: categoriesLoading } =
    useCategories();

  // Handle URL parameters for category filtering
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
      // Find category name for display
      const category = categoriesData?.categories?.find(
        (cat) => cat.id.toString() === categoryParam
      );
      if (category) {
        setSelectedCategoryName(category.name);
      }
    }
  }, [searchParams, categoriesData]);

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
    setSelectedCategoryName('');
    // Clear URL parameters
    router.push('/activities');
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-blue-500/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-200/25 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-indigo-900/20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/activities-categories">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm text-gray-700 rounded-2xl hover:bg-white transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Categories
              </motion.button>
            </Link>
          </div>

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                {selectedCategoryName ? (
                  <>
                    {selectedCategoryName}
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                      Activities
                    </span>
                  </>
                ) : (
                  <>
                    Discover Amazing
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                      Activities
                    </span>
                  </>
                )}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                {selectedCategoryName
                  ? `Explore incredible ${selectedCategoryName.toLowerCase()} experiences and create unforgettable memories`
                  : 'Explore incredible experiences and create unforgettable memories with our curated selection of premium activities worldwide'}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Controls */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium"
              />
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-white rounded-2xl border-2 border-gray-200 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === 'grid'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === 'list'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
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

          {/* Stats */}
          <div className="flex items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span>
                {activitiesLoading
                  ? 'Loading...'
                  : `${activitiesData?.total || 0} Activities`}
              </span>
            </div>
            {selectedCategoryName && (
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-blue-500" />
                <span>Filtered by: {selectedCategoryName}</span>
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {activitiesLoading && (
          <div className="py-20">
            <ActivityGridSkeleton items={6} />
          </div>
        )}

        {/* Activities Grid/List */}
        {!activitiesLoading && activitiesData?.data && (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10'
                : 'space-y-6'
            }
          >
            {activitiesData.data.map((activity, index) => (
              <motion.div
                key={activity.activity_id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={viewMode === 'list' ? 'flex' : ''}
              >
                <ActivityCard
                  activity={activity}
                  onFavoriteToggle={handleFavoriteToggle}
                  isFavorite={favorites.has(activity.activity_id)}
                  onViewDetails={handleViewDetails}
                  viewMode={viewMode}
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
