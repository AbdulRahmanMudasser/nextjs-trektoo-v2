'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { useHotels } from '@/hooks/useHotels';
import FilterSidebar from './FilterSidebar';
import TourListSection from './ToursListSection';

export default function HotelListContent() {
  const searchParams = useSearchParams();
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const { data: hotels = [], isLoading, error } = useHotels(searchParams);

  const handleApplyFilters = ({ priceRange, selectedCategories }) => {
    // Implement client-side filtering or update searchParams for server-side
  };

  return (
    <ErrorBoundary>
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl mx-auto p-8 text-center bg-white/95 rounded-3xl shadow-xl my-12 border border-blue-50"
        >
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin mx-auto" />
          <h3 className="text-2xl font-extrabold text-gray-800 mt-4">
            Finding Your Hotels
          </h3>
          <p className="text-gray-600 text-sm mt-2">
            Searching for the best accommodations...
          </p>
        </motion.div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <FilterSidebar
                adults={adults}
                setAdults={setAdults}
                children={children}
                setChildren={setChildren}
                onApplyFilters={handleApplyFilters}
              />
            </div>
            <div className="lg:w-3/4">
              <TourListSection
                hotels={hotels}
                loading={isLoading}
                error={error?.message}
              />
            </div>
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
}
