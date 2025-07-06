'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import DateInput from '@/components/ui/Custom/DateInput';

const FilterCheckbox = ({ label, value, checked, onChange }) => (
  <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer group">
    <input
      type="checkbox"
      value={value}
      checked={checked}
      onChange={() => onChange(value)}
      className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500 transition-colors"
    />
    <span className="group-hover:text-blue-600 transition-colors font-medium">
      {label}
    </span>
  </label>
);

FilterCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

const GuestSelector = ({ adults, setAdults, children, setChildren }) => (
  <div className="mb-8">
    <label className="block text-sm font-medium text-gray-700 mb-3">
      Guests
    </label>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Adults</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAdults((prev) => Math.encoding.max(0, prev - 1))}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Decrease adults"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium text-gray-900">{adults}</span>
          <button
            onClick={() => setAdults((prev) => Math.min(10, prev + 1))}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Increase adults"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Children</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Decrease children"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium text-gray-900">{children}</span>
          <button
            onClick={() => setChildren((prev) => Math.min(10, prev + 1))}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Increase children"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

GuestSelector.propTypes = {
  adults: PropTypes.number.isRequired,
  setAdults: PropTypes.func.isRequired,
  children: PropTypes.number.isRequired,
  setChildren: PropTypes.func.isRequired,
};

const FilterSidebar = ({
  adults,
  setAdults,
  children,
  setChildren,
  checkin,
  setCheckin,
  checkout,
  setCheckout,
  onApplyFilters,
}) => {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const categories = [
    { label: 'Luxury Hotels', value: 'luxury', price: '$500+' },
    { label: 'Budget Hotels', value: 'budget', price: '$100-$300' },
    { label: 'Mid-range Hotels', value: 'midrange', price: '$300-$500' },
  ];

  const handleCategoryChange = (value) => {
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((cat) => cat !== value)
        : [...prev, value]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 5000]);
    setSelectedCategories([]);
    setAdults(1);
    setChildren(0);
    setCheckin(null);
    setCheckout(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-xl sticky top-40 border border-blue-50"
    >
      <h3 className="text-2xl font-extrabold text-gray-900 mb-6">
        Filter Hotels
      </h3>
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Check-in
        </label>
        <DateInput
          selectedDate={checkin}
          onChange={setCheckin}
          placeholder="Check-in"
          minDate={today}
          className="h-10 text-sm"
        />
      </div>
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Check-out
        </label>
        <DateInput
          selectedDate={checkout}
          onChange={setCheckout}
          placeholder="Check-out"
          minDate={
            checkin ? new Date(checkin.getTime() + 24 * 60 * 60 * 1000) : today
          }
          disabled={!checkin}
          className="h-10 text-sm"
        />
      </div>
      <GuestSelector
        adults={adults}
        setAdults={setAdults}
        children={children}
        setChildren={setChildren}
      />
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Price Range
        </label>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="w-full h-1 bg-gray-200 rounded-full cursor-pointer accent-blue-500"
          />
          <input
            type="range"
            min="0"
            max="5000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="w-full h-1 bg-gray-200 rounded-full cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-sm text-gray-600 font-medium">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-extrabold text-gray-900 mb-4">
        Hotel Categories
      </h3>
      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.value}
            className="flex justify-between items-center"
          >
            <FilterCheckbox
              label={category.label}
              value={category.value}
              checked={selectedCategories.includes(category.value)}
              onChange={handleCategoryChange}
            />
            <span className="text-sm text-gray-600 font-medium">
              {category.price}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            onApplyFilters({
              priceRange,
              selectedCategories,
              checkin,
              checkout,
              adults,
              children,
            })
          }
          className="flex-1 px-6 py-3 bg-blue-500 text-white text-sm font-medium uppercase rounded-xl hover:bg-blue-600 transition-colors"
        >
          Apply Filters
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearFilters}
          className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 text-sm font-medium uppercase rounded-xl hover:bg-gray-300 transition-colors"
          aria-label="Clear all filters"
        >
          Clear Filters
        </motion.button>
      </div>
    </motion.div>
  );
};

FilterSidebar.propTypes = {
  adults: PropTypes.number.isRequired,
  setAdults: PropTypes.func.isRequired,
  children: PropTypes.number.isRequired,
  setChildren: PropTypes.func.isRequired,
  checkin: PropTypes.instanceOf(Date),
  setCheckin: PropTypes.func,
  checkout: PropTypes.instanceOf(Date),
  setCheckout: PropTypes.func,
  onApplyFilters: PropTypes.func.isRequired,
};

export default FilterSidebar;
