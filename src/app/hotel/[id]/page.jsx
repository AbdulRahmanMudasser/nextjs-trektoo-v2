'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

import HotelHeader from '@/components/feature/HotelsList/HotelHeader';
import ImageGallery from '@/components/feature/HotelsList/ImageGallery';
import HotelDetails from '@/components/feature/HotelsList/HotelDetails';
import TourInformation from '@/components/feature/HotelsList/TourInformation';
import TourPlan from '@/components/feature/HotelsList/TourPlan';
import Map from '@/components/feature/HotelsList/Map';
import CalendarPrice from '@/components/feature/HotelsList/CalendarPrice';
import ReviewScores from '@/components/feature/HotelsList/ReviewScores';
import TourComments from '@/components/feature/HotelsList/TourComments';
import { ErrorBoundary } from '@/components/feature/Error/ErrorBoundary';
import { useHotelDetails } from '@/hooks/useHotels';
import ReviewList from '@/components/feature/HotelsList/ReviewList';

const TourDetail = ({ params }) => {
  const { id } = params;
  const { data: hotel, isLoading, error } = useHotelDetails(id);

  console.log('Hotel data:', hotel);
  console.log('Hotel policy:', hotel?.policy[0].title);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto p-8 text-center bg-white/95 rounded-3xl shadow-xl my-12 border border-blue-50"
      >
        <Loader2 className="h-10 w-10 text-blue-500 animate-spin mx-auto" />
        <h3 className="text-2xl font-extrabold text-gray-800 mt-4">
          Loading Hotel Details
        </h3>
        <p className="text-gray-600 text-sm mt-2">
          Fetching the best accommodation details...
        </p>
      </motion.div>
    );
  }

  if (error || !hotel) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto p-8 text-center bg-white/95 rounded-3xl shadow-xl my-12 border border-blue-50"
      >
        <h3 className="text-2xl font-extrabold text-gray-800 mt-4">
          Error Loading Hotel
        </h3>
        <p className="text-gray-600 text-sm mt-2">
          Unable to load hotel details. Please try again later.
        </p>
      </motion.div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="font-sans">
        <HotelHeader
          id={hotel.id}
          title={hotel.title}
          location={hotel.location?.name || 'Unknown Location'}
          price={hotel.sale_price || hotel.price}
          duration="Per Night"
          rating={parseFloat(hotel.review_score?.score_total) || 0}
          photoCount={hotel.review_score?.total_review || 0}
          discount={hotel.discount_percent ? `${hotel.discount_percent}%` : ''}
          image={hotel.banner_image || hotel.image}
        />
        <ImageGallery images={hotel.gallery || []} />
        <HotelDetails
          id={hotel.id}
          description={hotel.content}
          address={hotel.address}
        />
        <TourInformation
          facilities={hotel.terms?.['6']?.child || []}
          services={hotel.terms?.['7']?.child || []}
          extraPrices={hotel.extra_price || []}
          policies={hotel.policy || []}
          checkInTime={hotel.check_in_time || 'Not specified'}
          checkOutTime={hotel.check_out_time || 'Not specified'}
        />
        {/* <TourPlan relatedHotels={hotel.related || []} /> */}
        <Map
          lat={parseFloat(hotel.map_lat) || 0}
          lng={parseFloat(hotel.map_lng) || 0}
          zoom={parseInt(hotel.map_zoom) || 10}
        />
        <CalendarPrice
          price={hotel.sale_price || hotel.price}
          bookingFees={hotel.booking_fee || '0'}
        />
        <ReviewScores
          scoreTotal={hotel.review_score?.score_total || 0}
          scoreText={hotel.review_score?.score_text || 'No rating'}
          totalReviews={hotel.review_score?.total_review || 0}
          reviewStats={hotel.review_stats || []}
          rateScores={hotel.review_score?.rate_score || {}}
        />
        <ReviewList reviews={hotel.review_lists?.data || []} />
      </div>
    </ErrorBoundary>
  );
};

export default TourDetail;
