'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { useHotels } from '@/hooks/useHotels';
import FilterSidebar from './FilterSidebar';
import TourListSection from './ToursListSection';

export default function HotelListContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Parse query parameters
  const initialAdults = parseInt(searchParams.get('adults') || '1', 10);
  const initialChildren = parseInt(searchParams.get('children') || '0', 10);
  const initialCheckin = searchParams.get('checkin')
    ? new Date(searchParams.get('checkin'))
    : null;
  const initialCheckout = searchParams.get('checkout')
    ? new Date(searchParams.get('checkout'))
    : null;

  const [adults, setAdults] = useState(initialAdults);
  const [children, setChildren] = useState(initialChildren);
  const [checkin, setCheckin] = useState(initialCheckin);
  const [checkout, setCheckout] = useState(initialCheckout);

  const { data: hotels = [], isLoading, error } = useHotels(searchParams);

  const handleApplyFilters = ({
    priceRange,
    selectedCategories,
    checkin,
    checkout,
    adults,
    children,
  }) => {
    // Create new search parameters, preserving location_id
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set('adults', String(adults));
    updatedParams.set('children', String(children));
    if (checkin) {
      updatedParams.set('checkin', checkin.toISOString().split('T')[0]);
    } else {
      updatedParams.delete('checkin');
    }
    if (checkout) {
      updatedParams.set('checkout', checkout.toISOString().split('T')[0]);
    } else {
      updatedParams.delete('checkout');
    }
    updatedParams.set('minPrice', String(priceRange[0]));
    updatedParams.set('maxPrice', String(priceRange[1]));
    if (selectedCategories.length > 0) {
      updatedParams.set('categories', selectedCategories.join(','));
    } else {
      updatedParams.delete('categories');
    }
    router.push(`/hotels-list?${updatedParams.toString()}`);
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
                checkin={checkin}
                setCheckin={setCheckin}
                checkout={checkout}
                setCheckout={setCheckout}
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
