'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Loader2, RefreshCw, ArrowLeft } from 'lucide-react';

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
import { useHotelDetails, useHotelReviews } from '@/hooks/useHotels';

const TourDetail = ({ params }) => {
  const { id } = React.use(params); // Unwrap params with React.use()
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);
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
  // Use rooms directly from hotel data since they're included in the main response
  const availableRooms = hotel?.rooms || [];
  const isRoomsLoading = false; // No separate loading state needed
  const roomsError = null; // No separate error state needed

  // Debug: Log the hotel and rooms data
  console.log('Hotel detail page - hotel data:', hotel);
  console.log('Hotel detail page - availableRooms:', availableRooms);
  console.log('Hotel detail page - rooms length:', availableRooms?.length);

  if (isHotelLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl mx-auto p-8 text-center bg-white/95 rounded-3xl shadow-xl border border-blue-50"
        >
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin mx-auto" />
          <h3 className="text-2xl font-extrabold text-gray-800 mt-4">
            Loading Hotel Details
          </h3>
          <p className="text-gray-600 text-sm mt-2">
            Fetching the best accommodation details...
          </p>
        </motion.div>
      </div>
    );
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
      <div className="font-sans min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Main Content Container */}
        <div className="w-full">
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

          <ImageGallery images={hotel.gallery || []} />

          <HotelDetails
            id={hotel.id}
            description={hotel.content}
            address={hotel.address}
          />

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
          />

          <TourInformation
            facilities={hotel.terms?.['6']?.child || []}
            services={hotel.terms?.['7']?.child || []}
            extraPrices={hotel.extra_price || []}
            policies={hotel.policy || []}
            checkInTime={hotel.check_in_time || 'Not specified'}
            checkOutTime={hotel.check_out_time || 'Not specified'}
          />

          <Map
            lat={parseFloat(hotel.map_lat) || 0}
            lng={parseFloat(hotel.map_lng) || 0}
            zoom={parseInt(hotel.map_zoom) || 10}
            address={hotel.address}
            hotelName={hotel.title}
          />

          <ReviewScores
            scoreTotal={hotel.review_score?.score_total || 0}
            scoreText={hotel.review_score?.score_text || 'No rating'}
            totalReviews={hotel.review_score?.total_review || 0}
            reviewStats={hotel.review_score?.review_stats || []}
            rateScores={hotel.review_score?.rate_score || {}}
          />

          {isReviewsLoading ? (
            <div className="w-full py-12 sm:py-16 text-center px-4">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin mx-auto" />
              <p className="text-gray-600 text-sm mt-2">Loading reviews...</p>
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
    </ErrorBoundary>
  );
};

export default TourDetail;
