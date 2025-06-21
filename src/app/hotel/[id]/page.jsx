'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'next/navigation';
import HotelHeader from '@/components/feature/HotelsList/HotelHeader';
import ImageGallery from '@/components/feature/HotelsList/ImageGallery';
import HotelBooking from '@/components/feature/HotelsList/HotelBooking';
import TourInformation from '@/components/feature/HotelsList/TourInformation';
import TourPlan from '@/components/feature/HotelsList/TourPlan';
import Map from '@/components/feature/HotelsList/Map';
import CalendarPrice from '@/components/feature/HotelsList/CalendarPrice';
import ReviewScores from '@/components/feature/HotelsList/ReviewScores';
import TourComments from '@/components/feature/HotelsList/TourComments';

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
      <HotelHeader
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
      <HotelBooking id={id} description={description} />
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
