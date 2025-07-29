import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, X, Calendar, Sparkles } from 'lucide-react';

const categories = [
  {
    id: 'luxury',
    label: 'Luxury',
    color:
      'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-purple-200',
  },
  {
    id: 'midrange',
    label: 'Mid-range',
    color:
      'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'budget',
    label: 'Budget',
    color:
      'bg-gradient-to-r from-orange-50 to-yellow-50 text-orange-700 border-orange-200',
  },
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
  onClearFilters,
}) => {
  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
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
        <span className="font-semibold text-gray-800 group-hover:text-blue-500 transition-colors">
          Filters
        </span>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transition-all duration-300 ${isOpen ? 'rotate-180 text-blue-500' : 'group-hover:text-blue-500'}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
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
                <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">
                  Categories
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryToggle(category.id)}
                      className={`px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-300 text-left ${
                        selectedCategories.includes(category.id)
                          ? 'bg-blue-500 text-white border-blue-500 shadow-lg transform scale-[1.02]'
                          : category.color +
                            ' hover:shadow-md hover:scale-[1.01]'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">
                  Price Range
                </h4>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full h-3 bg-gradient-to-r from-gray-200 to-blue-200 rounded-full appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #e5e7eb 0%, #e5e7eb ${priceRange[1]}%, #3b82f6 ${priceRange[1]}%, #3b82f6 100%)`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
                      ${priceRange[0]}
                    </span>
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                      ${priceRange[1]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Guests */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">
                  Guests
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-2 block uppercase tracking-wide">
                      Adults
                    </label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(parseInt(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-semibold"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-2 block uppercase tracking-wide">
                      Children
                    </label>
                    <select
                      value={children}
                      onChange={(e) => setChildren(parseInt(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-semibold"
                    >
                      {[0, 1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">
                  Date
                </h4>
                <div className="relative">
                  <input
                    type="date"
                    value={checkin ? checkin.toISOString().split('T')[0] : ''}
                    onChange={(e) =>
                      setCheckin(
                        e.target.value ? new Date(e.target.value) : null
                      )
                    }
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

export default FilterDropdown;
