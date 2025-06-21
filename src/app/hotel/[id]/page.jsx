'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'next/navigation';
import TourHeader from '@/components/feature/HotelDetails/TourHeader';
import ImageGallery from '@/components/feature/HotelDetails/ImageGallery';
import TourBooking from '@/components/feature/HotelDetails/TourBooking';
import TourInformation from '@/components/feature/HotelDetails/TourInformation';
import TourPlan from '@/components/feature/HotelDetails/TourPlan';
import Map from '@/components/feature/HotelDetails/Map';
import CalendarPrice from '@/components/feature/HotelDetails/CalendarPrice';
import ReviewScores from '@/components/feature/HotelDetails/ReviewScores';
import TourComments from '@/components/feature/HotelDetails/TourComments';

const TourDetail = () => {
  const searchParams = useSearchParams();

  // Extract query parameters
  const id = searchParams.get('id') || 'default-id';
  const title = searchParams.get('title') || 'Unnamed Hotel';
  const location = searchParams.get('location') || 'Unknown Location';
  const price = searchParams.get('price') || '$199.99';
  const duration = searchParams.get('duration') || '3 Days';
  const rating = parseFloat(searchParams.get('rating') || '3');
  const photoCount = parseInt(searchParams.get('photoCount') || '5', 10);
  const discount = searchParams.get('discount') || '';
  const image = searchParams.get('image') || '/default-hotel.jpg';
  const description =
    searchParams.get('description') || 'No description provided.';
  // Optional: Use hotel_name for SEO or display purposes
  // const hotelName = searchParams.get('hotel_name') || title;

  return (
    <div className="font-sans">
      <TourHeader
        id={id}
        title={title}
        location={location}
        price={price}
        duration={duration}
        rating={rating}
        photoCount={photoCount}
        discount={discount}
        image={image}
      />
      <ImageGallery />
      <TourBooking id={id} description={description} />
      <TourInformation />
      <TourPlan />
      <Map />
      <CalendarPrice />
      <ReviewScores />
      <TourComments />
    </div>
  );
};

TourDetail.propTypes = {
  // No props are passed directly; all data comes from query parameters
};

export default TourDetail;
