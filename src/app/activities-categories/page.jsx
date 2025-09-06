'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useCategories } from '@/hooks/klookHooks';
import {
  Sparkles,
  MapPin,
  Star,
  Users,
  Clock,
  ArrowRight,
  Filter,
  Search,
  Grid,
  List,
  Heart,
  Eye,
} from 'lucide-react';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';

const ActivitiesCategoriesPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [sortBy, setSortBy] = useState('popular');

  const { data: categoriesData, isLoading, error } = useCategories();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Enhanced categories with additional data for better display
  const enhancedCategories =
    categoriesData?.categories?.map((category) => ({
      ...category,
      activityCount: Math.floor(Math.random() * 500) + 50, // Mock data
      rating: (Math.random() * 1.5 + 3.5).toFixed(1), // Mock rating 3.5-5.0
      priceRange: {
        min: Math.floor(Math.random() * 50) + 20,
        max: Math.floor(Math.random() * 200) + 100,
      },
      image: `/images/categories/${category.id}.jpg`, // Placeholder
      description: `Discover amazing ${category.name.toLowerCase()} experiences and create unforgettable memories.`,
      highlights: [
        'Expert local guides',
        'Small group sizes',
        'Instant confirmation',
        'Free cancellation',
      ],
    })) || [];

  // Filter categories based on search
  const filteredCategories = enhancedCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFavoriteToggle = (categoryId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(categoryId)) {
        newFavorites.delete(categoryId);
      } else {
        newFavorites.add(categoryId);
      }
      return newFavorites;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
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
        damping: 15,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            Failed to load activity categories. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
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
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-indigo-900/20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Activity
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Categories
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Explore incredible experiences organized by category. From
              thrilling adventures to cultural immersions, find the perfect
              activity for your next adventure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Controls */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={headerVariants}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories..."
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

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white font-semibold transition-all hover:border-gray-300"
              >
                <option value="popular">Most Popular</option>
                <option value="name">Name A-Z</option>
                <option value="activities">Most Activities</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span>{filteredCategories.length} Categories</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span>1000+ Activities</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span>50+ Cities</span>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-20">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Categories Grid/List */}
        {!isLoading && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'
                : 'space-y-6'
            }
          >
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className={`group bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-700 border border-gray-200/50 relative cursor-pointer backdrop-blur-sm ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Image Container */}
                <div
                  className={`relative overflow-hidden ${
                    viewMode === 'list' ? 'w-80 h-48 flex-shrink-0' : 'h-48'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {category.name.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/50 transition-all duration-700" />

                  {/* Floating Heart Action */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavoriteToggle(category.id);
                    }}
                    className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-2xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-2xl border border-white/20 hover:scale-110"
                  >
                    <Heart
                      className={`h-5 w-5 transition-all duration-300 ${
                        favorites.has(category.id)
                          ? 'text-red-500 fill-current scale-110'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>

                  {/* Activity Count Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-blue-600 to-blue-500 text-white backdrop-blur-sm shadow-lg border border-blue-400/20">
                      <Sparkles className="h-3 w-3" />
                      {category.activityCount} Activities
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`p-6 relative flex-1 flex flex-col ${
                    viewMode === 'list' ? 'justify-center' : ''
                  }`}
                >
                  <div className="relative z-10 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-500 mb-3 line-clamp-2 flex-shrink-0">
                      {category.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 sm:mb-6 line-clamp-2 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 flex-shrink-0">
                      {category.description}
                    </p>

                    {/* Meta Information */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6 flex-shrink-0">
                      <div className="flex items-center gap-2 sm:gap-3 text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        <div className="p-2 sm:p-2.5 bg-gradient-to-br from-gray-100 to-gray-200/50 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300 flex-shrink-0">
                          <Star className="h-4 w-4 text-gray-600" />
                        </div>
                        <span className="font-medium text-xs sm:text-sm">
                          {category.rating} Rating
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        <div className="p-2 sm:p-2.5 bg-gradient-to-br from-gray-100 to-gray-200/50 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300 flex-shrink-0">
                          <Clock className="h-4 w-4 text-gray-600" />
                        </div>
                        <span className="font-medium text-xs sm:text-sm">
                          ${category.priceRange.min}-${category.priceRange.max}
                        </span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-4 sm:mb-6 flex-shrink-0">
                      <div className="flex flex-wrap gap-2">
                        {category.highlights
                          .slice(0, 2)
                          .map((highlight, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
                            >
                              {highlight}
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex flex-col">
                        <div className="text-sm text-gray-500 font-medium">
                          {category.activityCount} activities available
                        </div>
                      </div>

                      <Link href={`/activities?category=${category.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 font-bold text-xs sm:text-sm shadow-lg hover:shadow-2xl flex items-center gap-1.5 sm:gap-2 border border-blue-500/20 overflow-hidden group/btn flex-shrink-0"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transform -skew-x-12 translate-x-full group-hover/btn:translate-x-[-200%] transition-all duration-700" />
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4 relative z-10" />
                          <span className="relative z-10 hidden sm:inline">
                            Explore
                          </span>
                          <span className="relative z-10 sm:hidden">View</span>
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && filteredCategories.length === 0 && (
          <EmptyState
            icon={Sparkles}
            title="No categories found"
            subtitle="We couldn't find any categories matching your search. Try adjusting your search criteria."
            action={
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchQuery('')}
                className="px-10 py-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-all font-bold text-lg shadow-xl hover:shadow-2xl"
              >
                Clear Search
              </motion.button>
            }
          />
        )}
      </div>
    </div>
  );
};

export default ActivitiesCategoriesPage;


