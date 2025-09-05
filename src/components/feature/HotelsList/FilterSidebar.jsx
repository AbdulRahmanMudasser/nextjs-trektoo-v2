'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Minus, Plus, Filter } from 'lucide-react';
import DateInput from '@/components/ui/Custom/DateInput';
import { useRouter, useSearchParams } from 'next/navigation';

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
            onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
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
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isExpanded, setIsExpanded] = useState(true);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const clearFilters = () => {
    setAdults(1);
    setChildren(0);
    setCheckin(null);
    setCheckout(null);

    // Clear URL params
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('page');
    newParams.delete('minPrice');
    newParams.delete('maxPrice');
    newParams.delete('ratings');
    router.replace(`/hotels-list?${newParams.toString()}`, { scroll: false });
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      checkin,
      checkout,
      adults,
      children,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-3xl sticky top-8 border border-blue-50"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
          <Filter className="h-6 w-6" />
          Filter Hotels
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className="space-y-6">
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
                checkin
                  ? new Date(checkin.getTime() + 24 * 60 * 60 * 1000)
                  : today
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

          <div className="flex gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleApplyFilters}
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
        </div>
      </motion.div>
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
