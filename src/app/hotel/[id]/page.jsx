'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Loader2, RefreshCw, ArrowLeft, Calendar, Users } from 'lucide-react';
import { PageLoader } from '@/components/ui/PageLoader';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { format, addDays } from 'date-fns';
import DateInput from '@/components/ui/Custom/DateInput';

import HotelHeader from '@/components/feature/HotelDetails/HotelHeader';
import ImageGallery from '@/components/feature/HotelDetails/ImageGallery';
import HotelDetails from '@/components/feature/HotelDetails/HotelDetails';
import RoomAvailability from '@/components/feature/HotelDetails/RoomAvailability';
import TourInformation from '@/components/feature/HotelDetails/TourInformation';
import Map from '@/components/feature/HotelDetails/Map';
import CalendarPrice from '@/components/feature/HotelDetails/CalendarPrice';
import ReviewScores from '@/components/feature/HotelDetails/ReviewScores';
import ReviewList from '@/components/feature/HotelDetails/ReviewList';
import ErrorBoundary from '@/components/security/ErrorBoundary';
import {
  useHotelDetails,
  useHotelReviews,
  useHotelAvailability,
} from '@/hooks/useHotels';

const TourDetail = ({ params }) => {
  const { id } = React.use(params); // Unwrap params with React.use()
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);

  // Room search state
  const [searchRooms, setSearchRooms] = useState(false);
  const [searchedRooms, setSearchedRooms] = useState(null);
  const [shouldLoadRooms, setShouldLoadRooms] = useState(false); // Control when to load rooms
  const [apiDates, setApiDates] = useState({ checkin: null, checkout: null }); // Store dates for API call

  // Date state management
  const [checkin, setCheckin] = useState(() => {
    const checkinParam = searchParams.get('checkin');
    return checkinParam ? new Date(checkinParam) : new Date();
  });

  const [checkout, setCheckout] = useState(() => {
    const checkoutParam = searchParams.get('checkout');
    if (checkoutParam) {
      return new Date(checkoutParam);
    }
    // Default to tomorrow if no checkout date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });

  const [adults, setAdults] = useState(() =>
    parseInt(searchParams.get('adults') || '1', 10)
  );

  const [children, setChildren] = useState(() =>
    parseInt(searchParams.get('children') || '0', 10)
  );

  const {
    data: hotel,
    isLoading: isHotelLoading,
    error: hotelError,
  } = useHotelDetails(id);

  const {
    data: reviewsData,
    isLoading: isReviewsLoading,
    error: reviewsError,
  } = useHotelReviews(id, currentPage, itemsPerPage);

  // Room availability query - only fetch when user clicks search
  const {
    data: roomAvailabilityData,
    isLoading: isRoomsLoading,
    error: roomsError,
    refetch: refetchRooms,
  } = useHotelAvailability(
    shouldLoadRooms ? hotel?.id || id : null, // Only fetch when shouldLoadRooms is true
    shouldLoadRooms && apiDates.checkin
      ? format(apiDates.checkin, 'yyyy-MM-dd')
      : null,
    shouldLoadRooms && apiDates.checkout
      ? format(apiDates.checkout, 'yyyy-MM-dd')
      : null,
    adults,
    children
  );

  // Use only room availability data (not hotel rooms)
  const availableRooms = roomAvailabilityData || [];

  // Update searched rooms when room availability data is fetched (for backward compatibility)
  useEffect(() => {
    if (roomAvailabilityData) {
      setSearchedRooms(roomAvailabilityData);
    }
  }, [roomAvailabilityData]);

  // Load rooms automatically when hotel is loaded (only once)
  useEffect(() => {
    if (hotel?.id && !shouldLoadRooms) {
      setApiDates({ checkin, checkout }); // Set initial dates
      setShouldLoadRooms(true);
    }
  }, [hotel?.id, shouldLoadRooms, checkin, checkout]);

  // Function to refresh room availability
  const handleRefreshRooms = async () => {
    setApiDates({ checkin, checkout }); // Update API dates with current dates
    setShouldLoadRooms(true); // Enable API call
    try {
      await refetchRooms();
    } catch (error) {
      console.error('Error refreshing rooms:', error);
    }
  };

  // Debug: Log the hotel and rooms data
  console.log('Hotel detail page - URL ID:', id, 'Type:', typeof id);
  console.log(
    'Hotel detail page - Hotel ID:',
    hotel?.id,
    'Type:',
    typeof hotel?.id
  );
  console.log(
    'Hotel detail page - Using ID:',
    hotel?.id || id,
    'Type:',
    typeof (hotel?.id || id)
  );
  console.log('Hotel detail page - Hotel loaded:', !!hotel);
  console.log('Hotel detail page - checkin:', format(checkin, 'yyyy-MM-dd'));
  console.log('Hotel detail page - checkout:', format(checkout, 'yyyy-MM-dd'));
  console.log('Hotel detail page - adults:', adults, 'children:', children);
  console.log('Hotel detail page - shouldLoadRooms:', shouldLoadRooms);
  console.log('Hotel detail page - apiDates:', apiDates);
  console.log('Hotel detail page - isRoomsLoading:', isRoomsLoading);
  console.log('Hotel detail page - roomsError:', roomsError);
  console.log(
    'Hotel detail page - roomAvailabilityData:',
    roomAvailabilityData
  );
  console.log('Hotel detail page - availableRooms:', availableRooms);
  console.log('Hotel detail page - rooms length:', availableRooms?.length);

  // Update URL when dates change
  const updateURL = (newCheckin, newCheckout, newAdults, newChildren) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newCheckin) {
      newSearchParams.set('checkin', format(newCheckin, 'yyyy-MM-dd'));
    }
    if (newCheckout) {
      newSearchParams.set('checkout', format(newCheckout, 'yyyy-MM-dd'));
    }
    if (newAdults) {
      newSearchParams.set('adults', String(newAdults));
    }
    if (newChildren) {
      newSearchParams.set('children', String(newChildren));
    }

    // Update URL without page refresh
    router.replace(`?${newSearchParams.toString()}`, { scroll: false });
  };

  // Handle date changes
  const handleDateChange = (type, date) => {
    if (type === 'checkin') {
      const newCheckin = date;
      let newCheckout = checkout;

      // Ensure checkout is after checkin
      if (newCheckin >= checkout) {
        newCheckout = addDays(newCheckin, 1);
        setCheckout(newCheckout);
      }

      setCheckin(newCheckin);
      updateURL(newCheckin, newCheckout, adults, children);
    } else if (type === 'checkout') {
      const newCheckout = date;
      setCheckout(newCheckout);
      updateURL(checkin, newCheckout, adults, children);
    }
  };

  // Handle guest count changes
  const handleGuestChange = (type, value) => {
    if (type === 'adults') {
      const newAdults = Math.max(1, Math.min(10, value));
      setAdults(newAdults);
      updateURL(checkin, checkout, newAdults, children);
    } else if (type === 'children') {
      const newChildren = Math.max(0, Math.min(10, value));
      setChildren(newChildren);
      updateURL(checkin, checkout, adults, newChildren);
    }
  };

  // Quick date presets
  const quickDatePresets = [
    { label: 'Tonight', checkin: new Date(), checkout: addDays(new Date(), 1) },
    {
      label: '2 Nights',
      checkin: new Date(),
      checkout: addDays(new Date(), 2),
    },
    { label: 'Weekend', checkin: new Date(), checkout: addDays(new Date(), 3) },
    { label: 'Week', checkin: new Date(), checkout: addDays(new Date(), 7) },
  ];

  const applyQuickDate = (preset) => {
    setCheckin(preset.checkin);
    setCheckout(preset.checkout);
    updateURL(preset.checkin, preset.checkout, adults, children);
  };

  if (isHotelLoading) {
    return <PageLoader message="Loading hotel details..." />;
  }

  if (hotelError || !hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl mx-auto p-8 text-center bg-white/95 rounded-3xl shadow-xl border border-blue-50"
        >
          <h3 className="text-2xl font-extrabold text-gray-800 mt-4">
            Error Loading Hotel
          </h3>
          <p className="text-gray-600 text-sm mt-2">
            Unable to load hotel details. Please try again or explore other
            hotels.
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => queryClient.invalidateQueries(['hotel', id])}
              className="px-4 py-2 text-sm font-medium rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push('/hotels')}
              className="px-4 py-2 text-sm font-medium rounded-full bg-gray-100 text-gray-700 hover:bg-blue-100 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go to Hotels List
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <ErrorBoundary>
      <main className="relative min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Main Content Container */}
        <div className="w-full">
          {/* Hotel Header - Full Width */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full py-8 sm:py-12"
          >
            <HotelHeader
              id={hotel.id}
              title={hotel.title}
              location={hotel.location?.name || 'Unknown Location'}
              price={hotel.sale_price || hotel.price}
              duration="Per Night"
              rating={parseFloat(hotel.review_score?.score_total) || 0}
              photoCount={hotel.review_score?.total_review || 0}
              discount={
                hotel.discount_percent ? `${hotel.discount_percent}%` : ''
              }
              image={hotel.banner_image || hotel.image}
            />
          </motion.section>

          {/* Image Gallery - Full Width */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full py-8 sm:py-12"
          >
            <ImageGallery images={hotel.gallery || []} />
          </motion.section>

          {/* Hotel Details - Profile Style Layout */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full py-8 sm:py-12"
          >
            <div className="max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-8">
              <HotelDetails
                id={hotel.id}
                description={hotel.content}
                address={hotel.address}
              />
            </div>
          </motion.section>

          {/* Dynamic Date Selection Section - Unified Design */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full py-8 sm:py-12"
          >
            <div className="max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-8">
              {/* Unified Date Selection Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 sm:p-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                    Select Your Dates
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Choose your check-in and check-out dates to see available
                    rooms and pricing
                  </p>
                </div>

                {/* Date and Guest Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* Check-in Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-in Date
                    </label>
                    <DateInput
                      selectedDate={checkin}
                      onChange={(date) => handleDateChange('checkin', date)}
                      placeholder="Select check-in date"
                      minDate={new Date()}
                    />
                  </div>

                  {/* Check-out Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-out Date
                    </label>
                    <DateInput
                      selectedDate={checkout}
                      onChange={(date) => handleDateChange('checkout', date)}
                      placeholder="Select check-out date"
                      minDate={addDays(checkin, 1)}
                    />
                  </div>

                  {/* Adults */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adults
                    </label>
                    <div className="flex items-center border border-gray-200 rounded-xl h-12 sm:h-14">
                      <button
                        onClick={() => handleGuestChange('adults', adults - 1)}
                        disabled={adults <= 1}
                        className="px-4 py-3 text-blue-500 hover:text-blue-700 disabled:opacity-50 disabled:text-gray-400 transition-colors"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center py-3 font-medium text-base">
                        {adults}
                      </span>
                      <button
                        onClick={() => handleGuestChange('adults', adults + 1)}
                        disabled={adults >= 10}
                        className="px-4 py-3 text-blue-500 hover:text-blue-700 disabled:opacity-50 disabled:text-gray-400 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Children
                    </label>
                    <div className="flex items-center border border-gray-200 rounded-xl h-12 sm:h-14">
                      <button
                        onClick={() =>
                          handleGuestChange('children', children - 1)
                        }
                        disabled={children <= 0}
                        className="px-4 py-3 text-blue-500 hover:text-blue-700 disabled:opacity-50 disabled:text-gray-400 transition-colors"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center py-3 font-medium text-base">
                        {children}
                      </span>
                      <button
                        onClick={() =>
                          handleGuestChange('children', children + 1)
                        }
                        disabled={children >= 10}
                        className="px-4 py-3 text-blue-500 hover:text-blue-700 disabled:opacity-50 disabled:text-gray-400 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Stay Summary */}
                <div className="p-4 bg-blue-50 rounded-xl text-center mb-8">
                  <div className="flex items-center justify-center gap-4 text-sm text-blue-800">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {format(checkin, 'MMM d')} -{' '}
                        {format(checkout, 'MMM d, yyyy')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>
                        {adults} adult{adults !== 1 ? 's' : ''}
                        {children > 0 &&
                          `, ${children} child${children !== 1 ? 'ren' : ''}`}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">
                        {Math.ceil(
                          (checkout - checkin) / (1000 * 60 * 60 * 24)
                        )}{' '}
                        night
                        {Math.ceil(
                          (checkout - checkin) / (1000 * 60 * 60 * 24)
                        ) !== 1
                          ? 's'
                          : ''}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Search Available Rooms Button */}
                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRefreshRooms}
                    disabled={isRoomsLoading}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Calendar className="h-5 w-5" />
                    {isRoomsLoading ? 'Searching...' : 'Search Available Rooms'}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Room Availability - Profile Style */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full py-8 sm:py-12"
          >
            <div className="max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 sm:p-8">
                <RoomAvailability
                  rooms={availableRooms}
                  loading={isRoomsLoading}
                  error={roomsError?.message}
                  hotelId={id}
                  hotelData={{
                    id: hotel.id,
                    title: hotel.title,
                    price: hotel.sale_price || hotel.price,
                    bookingFee: hotel.booking_fee || '0',
                    policy: hotel.policy || [],
                  }}
                  checkin={checkin}
                  checkout={checkout}
                  adults={adults}
                  children={children}
                  isSearching={isRoomsLoading}
                  onRefresh={handleRefreshRooms}
                />
              </div>
            </div>
          </motion.section>

          {/* Tour Information - Profile Style */}
          {/* <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-full py-8 sm:py-12"
          >
            <div className="max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 sm:p-8">
                <TourInformation
                  facilities={hotel.terms?.['6']?.child || []}
                  services={hotel.terms?.['7']?.child || []}
                  extraPrices={hotel.extra_price || []}
                  policies={hotel.policy || []}
                  checkInTime={hotel.check_in_time || 'Not specified'}
                  checkOutTime={hotel.check_out_time || 'Not specified'}
                />
              </div>
            </div>
          </motion.section> */}

          {/* Map - Profile Style */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="w-full py-8 sm:py-12"
          >
            <div className="max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 sm:p-8">
                <Map
                  lat={hotel.map_lat}
                  lng={hotel.map_lng}
                  zoom={hotel.map_zoom}
                  address={hotel.address}
                  hotelName={hotel.title}
                />
              </div>
            </div>
          </motion.section>

          {/* Review Scores - Profile Style */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="w-full py-8 sm:py-12"
          >
            <div className="max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 sm:p-8">
                <ReviewScores
                  scoreTotal={hotel.review_score?.score_total || 0}
                  scoreText={hotel.review_score?.score_text || 'No rating'}
                  totalReviews={hotel.review_score?.total_review || 0}
                  reviewStats={hotel.review_score?.review_stats || []}
                  rateScores={hotel.review_score?.rate_score || {}}
                />
              </div>
            </div>
          </motion.section>

          {/* Review List - Profile Style */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="w-full py-8 sm:py-12"
          >
            <div className="max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 p-6 sm:p-8">
                {isReviewsLoading ? (
                  <div className="w-full py-12 sm:py-16 text-center px-4">
                    <Loader2 className="h-8 w-8 text-blue-500 animate-spin mx-auto" />
                    <p className="text-gray-600 text-sm mt-2">
                      Loading reviews...
                    </p>
                  </div>
                ) : reviewsError ? (
                  <div className="w-full py-12 sm:py-16 text-center px-4">
                    <p className="text-gray-600 text-sm">
                      Failed to load reviews. Please try again later.
                    </p>
                  </div>
                ) : (
                  <ReviewList
                    reviews={reviewsData?.data || []}
                    pagination={{
                      current_page: reviewsData?.current_page || 1,
                      total_pages: reviewsData?.last_page || 1,
                      total: reviewsData?.total || 0,
                    }}
                    onPageChange={handlePageChange}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={(value) => {
                      setItemsPerPage(value);
                      setCurrentPage(1);
                    }}
                  />
                )}
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </ErrorBoundary>
  );
};

export default TourDetail;
