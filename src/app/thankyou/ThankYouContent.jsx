'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useBookingDetails } from '@/hooks/useHotels';

const ThankYouContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated, token } = useAuth();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const bookingCode = searchParams.get('booking_code');
  const roomTitle = searchParams.get('roomTitle');
  const roomImage = searchParams.get('roomImage');
  const beds = searchParams.get('beds');
  const adults = searchParams.get('adults');
  const children = searchParams.get('children');
  const number_of_rooms = searchParams.get('number_of_rooms');
  const start_date = searchParams.get('start_date');
  const end_date = searchParams.get('end_date');
  const hotelTitle = searchParams.get('hotelTitle');

  const {
    data: bookingData,
    isLoading: isBookingLoading,
    error: bookingError,
  } = useBookingDetails(bookingCode, token);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated || !token) {
        console.warn('Redirecting to login: User not authenticated', {
          isAuthenticated,
          token,
          localStorageToken: localStorage.getItem('authToken'),
        });
        router.push(`/login?redirect=/thankyou&${searchParams.toString()}`);
      } else {
        console.log('Authentication successful', { isAuthenticated, token });
      }
      setIsAuthChecked(true);
    }, 200);

    return () => clearTimeout(timer);
  }, [isAuthenticated, token, router, searchParams]);

  if (!isAuthChecked || isBookingLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 bg-[url('/pattern.png')] bg-cover bg-fixed"
      >
        <div className="max-w-md mx-auto p-8 text-center bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-100">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin mx-auto" />
          <p className="text-gray-600 text-base mt-3 font-montserrat">
            Loading confirmation...
          </p>
        </div>
      </motion.div>
    );
  }

  if (!bookingCode || bookingError || !bookingData?.status) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 bg-[url('/pattern.png')] bg-cover bg-fixed"
      >
        <div className="max-w-md mx-auto p-8 text-center bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-100">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <h3 className="text-3xl font-bold text-gray-900 mt-4 font-montserrat">
            Invalid Booking
          </h3>
          <p className="text-gray-600 text-base mt-3">
            {bookingError
              ? bookingError.message
              : 'No booking code provided. Please try booking again.'}
          </p>
          <Button
            onClick={() => router.push('/')}
            className="mt-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 rounded-xl px-6 py-3 font-semibold shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Button>
        </div>
      </motion.div>
    );
  }

  // Hardcoded values as per request
  const roomPrice = '0.00';
  const hotelPrice = '900.00';
  const bookingFee = '1090';
  const totalPrice = '1090';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-blue-50 bg-[url('/pattern.png')] bg-cover bg-fixed"
    >
      <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border mt-12 p-8">
        {/* Hero Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 font-montserrat">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600 text-lg mt-2 font-montserrat">
            Thank you for your reservation. We look forward to welcoming you!
          </p>
          <div className="flex justify-center items-center mt-4">
            <CheckCircle className="h-6 w-6 text-blue-500 mr-2" />
            <span className="text-sm font-semibold text-gray-600">
              Booking Secured
            </span>
          </div>
        </div>

        {roomImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative h-72 rounded-xl overflow-hidden mb-10"
          >
            <Image
              src={
                roomImage.includes('staging.trektoo.com')
                  ? `/api/image/proxy?url=${encodeURIComponent(roomImage)}`
                  : roomImage
              }
              alt={roomTitle || 'Room Image'}
              fill
              className="object-cover"
              quality={90}
            />
          </motion.div>
        )}

        {/* Booking Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 font-montserrat">
              Booking Details
            </h2>
            <CheckCircle className="h-7 w-7 text-blue-500" />
          </div>
          <div className="space-y-6 text-gray-700 text-lg">
            <div className="flex justify-between">
              <span className="font-semibold">Booking Code:</span>
              <span>{bookingCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Hotel:</span>
              <span>{hotelTitle || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Room:</span>
              <span>{roomTitle || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Number of Rooms:</span>
              <span>{number_of_rooms || '1'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Check-in:</span>
              <span>{start_date || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Check-out:</span>
              <span>{end_date || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Guests:</span>
              <span>
                {adults || 1} Adult{adults > 1 ? 's' : ''}, {children || 0}{' '}
                Child
                {children > 1 ? 'ren' : ''}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Beds:</span>
              <span>{beds || 'N/A'}</span>
            </div>
            <div className="border-t border-blue-100 pt-6 mt-6">
              <div className="flex justify-between">
                <span className="font-semibold">Room Price (4 rooms):</span>
                <span>${roomPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Hotel Price:</span>
                <span>${hotelPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Booking Fee:</span>
                <span>${bookingFee}</span>
              </div>
              <div className="flex justify-between font-bold text-xl mt-4">
                <span>Total Price:</span>
                <span className="text-blue-500">${totalPrice}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8 flex justify-center space-x-4"
        >
          <Button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 rounded-lg px-6 py-4 text-lg shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ThankYouContent;
