'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, ChevronDown, X, Sparkles
} from 'lucide-react';

const FilterDropdown = ({ 
  isOpen, 
  onToggle, 
  selectedCategories, 
  setSelectedCategories,
  selectedCountries,
  setSelectedCountries,
  selectedCities,
  setSelectedCities,
  categories,
  onClearFilters 
}) => {
  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleCountryToggle = (countryId) => {
    setSelectedCountries(prev => 
      prev.includes(countryId) 
        ? prev.filter(id => id !== countryId)
        : [...prev, countryId]
    );
  };

  const handleCityToggle = (cityId) => {
    setSelectedCities(prev => 
      prev.includes(cityId) 
        ? prev.filter(id => id !== cityId)
        : [...prev, cityId]
    );
  };

  // Get main categories for filtering
  const mainCategories = categories?.slice(0, 10) || []; // Show first 10 categories

  // Sample countries and cities (you would typically get these from an API)
  const sampleCountries = [
    { id: 1004, name: 'Thailand' },
    { id: 1012, name: 'Japan' },
    { id: 1014, name: 'Malaysia' },
    { id: 1022, name: 'Hong Kong' },
  ];

  const sampleCities = [
    { id: 2, name: 'Hong Kong' },
    { id: 4, name: 'Bangkok' },
    { id: 5, name: 'Chiang Mai' },
    { id: 17, name: 'Pattaya' },
    { id: 28, name: 'Tokyo' },
  ];

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
                <div className="grid grid-cols-1 gap-3 max-h-48 overflow-y-auto">
                  {mainCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryToggle(category.id)}
                      className={`px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-300 text-left ${
                        selectedCategories.includes(category.id)
                          ? 'bg-blue-500 text-white border-blue-500 shadow-lg transform scale-[1.02]'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:shadow-md hover:scale-[1.01] hover:border-blue-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Countries */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Countries</h4>
                <div className="grid grid-cols-2 gap-3">
                  {sampleCountries.map(country => (
                    <button
                      key={country.id}
                      onClick={() => handleCountryToggle(country.id)}
                      className={`px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all duration-300 text-center ${
                        selectedCountries.includes(country.id)
                          ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:shadow-md hover:border-blue-200'
                      }`}
                    >
                      {country.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cities */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Cities</h4>
                <div className="grid grid-cols-2 gap-3">
                  {sampleCities.map(city => (
                    <button
                      key={city.id}
                      onClick={() => handleCityToggle(city.id)}
                      className={`px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-all duration-300 text-center ${
                        selectedCities.includes(city.id)
                          ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:shadow-md hover:border-blue-200'
                      }`}
                    >
                      {city.name}
                    </button>
                  ))}
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

export default FilterDropdown;