'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Removed unused Loader2 import to fix HMR issues
import { useSearchParams, useRouter } from 'next/navigation';
import ErrorBoundary from '@/components/security/ErrorBoundary';
import { useHotels } from '@/hooks/useHotels';
import FilterSidebar from './FilterSidebar';
import TourListSection from './ToursListSection';
import EmptyState from '@/components/ui/EmptyState';
import { HotelListSkeleton } from '@/components/ui/LoadingSkeleton';

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

  // Create search params with page and per_page defaults
  const createSearchParamsWithDefaults = () => {
    const params = new URLSearchParams(searchParams);
    if (!params.has('page')) {
      params.set('page', '1');
    }
    if (!params.has('per_page')) {
      params.set('per_page', '10');
    }
    return params;
  };

  const {
    data: hotelResponse,
    isLoading,
    error,
  } = useHotels(createSearchParamsWithDefaults());

  // Extract data from the response
  const hotels = hotelResponse?.data || [];
  const totalHotels = hotelResponse?.total || 0;
  const totalPages = hotelResponse?.totalPages || 1;

  // Update state when URL params change
  useEffect(() => {
    setAdults(parseInt(searchParams.get('adults') || '1', 10));
    setChildren(parseInt(searchParams.get('children') || '0', 10));

    const checkinParam = searchParams.get('checkin');
    setCheckin(checkinParam ? new Date(checkinParam) : null);

    const checkoutParam = searchParams.get('checkout');
    setCheckout(checkoutParam ? new Date(checkoutParam) : null);
  }, [searchParams]);

  const handleApplyFilters = ({ checkin, checkout, adults, children }) => {
    // Create new search parameters, preserving location_id but resetting page to 1
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set('adults', String(adults));
    updatedParams.set('children', String(children));
    updatedParams.set('page', '1'); // Reset to first page when filters change

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

    // Remove price range parameters since we removed the price range filter
    updatedParams.delete('minPrice');
    updatedParams.delete('maxPrice');
    updatedParams.delete('ratings');

    // Update URL without page refresh
    router.push(`/hotels-list?${updatedParams.toString()}`, { scroll: false });
  };

  return (
    <ErrorBoundary>
      {isLoading ? (
        <HotelListSkeleton items={5} />
      ) : (
        <div className="w-full">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/5">
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
            <div className="lg:w-4/5">
              <TourListSection
                hotels={hotels}
                loading={isLoading}
                error={error?.message}
                checkin={checkin}
                checkout={checkout}
                adults={adults}
                children={children}
                totalHotels={totalHotels}
                totalPages={totalPages}
              />
            </div>
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
}
