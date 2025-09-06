'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
  Calendar,
  Users,
  Bed,
  Square,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Star,
  RefreshCw,
} from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { format, addDays } from 'date-fns';

const RoomAvailability = ({
  rooms = [],
  loading = false,
  error = null,
  hotelId,
  hotelData,
  checkin,
  checkout,
  adults,
  children,
  isSearching = false,
  onRefresh = null,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bookingError, setBookingError] = useState(null);

  // Convert string dates to Date objects if needed
  const checkinDate = typeof checkin === 'string' ? new Date(checkin) : checkin;
  const checkoutDate =
    typeof checkout === 'string' ? new Date(checkout) : checkout;

  const hasValidPricing = (room) => {
    const price = room.price_text || room.price;
    return (
      price &&
      price !== 'Price on request' &&
      price !== '0.00' &&
      price !== '0' &&
      price !== 'Contact for Pricing' &&
      price.trim() !== ''
    );
  };

  const handleBookNow = async (room) => {
    try {
      setBookingError(null);

      // Check if user is authenticated
      const token = localStorage.getItem('authToken');
      if (!token) {
        // Store booking intent for after login
        const bookingIntent = {
          hotelId,
          roomId: room.id,
          checkin: format(checkinDate, 'yyyy-MM-dd'),
          checkout: format(checkoutDate, 'yyyy-MM-dd'),
          adults,
          children,
          roomData: room,
          hotelData,
        };

        try {
          sessionStorage.setItem(
            'bookingIntent',
            JSON.stringify(bookingIntent)
          );
        } catch (error) {
          console.warn('Could not store booking intent:', error);
        }

        // Redirect to login with return URL
        router.push(
          `/login?returnUrl=${encodeURIComponent(`/hotel/${hotelId}/checkout?${query}`)}`
        );
        return;
      }

      // If authenticated, proceed to checkout
      const query = new URLSearchParams({
        checkin: format(checkinDate, 'yyyy-MM-dd'),
        checkout: format(checkoutDate, 'yyyy-MM-dd'),
        adults: adults.toString(),
        children: children.toString(),
        roomId: room.id,
      }).toString();

      router.push(`/hotel/${hotelId}/checkout?${query}`);
    } catch (error) {
      console.error('Booking error:', error);
      setBookingError(
        'An error occurred while processing your booking. Please try again.'
      );
    }
  };

  // Cleanup booking intent on unmount
  useEffect(() => {
    return () => {
      try {
        sessionStorage.removeItem('bookingIntent');
      } catch (error) {
        console.warn('Could not clean up booking intent:', error);
      }
    };
  }, []);

  const getAmenityIcon = (amenity) => {
    const title = amenity.title || amenity.name || amenity;
    switch (title.toLowerCase()) {
      case 'wifi':
      case 'wi-fi':
        return Wifi;
      case 'parking':
      case 'car':
        return Car;
      case 'restaurant':
      case 'dining':
        return Utensils;
      case 'coffee':
        return Coffee;
      default:
        return Star;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-2xl mx-auto p-8 text-center bg-white/95 rounded-3xl shadow-xl border border-blue-50"
        >
          <LoadingSpinner size="xl" message="Loading Room Availability" />
          <p className="text-gray-600 mt-4">
            Please wait while we fetch available rooms for your selected
            dates...
          </p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon={Calendar}
        title="Unable to Load Rooms"
        subtitle={error}
        className="bg-red-50 border border-red-200 rounded-3xl p-8"
      />
    );
  }

  if (!rooms || rooms.length === 0) {
    return (
      <EmptyState
        icon={Bed}
        title="No Rooms Available"
        subtitle="No rooms are currently available for the selected dates."
      />
    );
  }

  return (
    <div className="w-full">
      {/* Enhanced Header Section */}
      <div className="text-center space-y-6 mb-8">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {isSearching ? 'Searching Available Rooms...' : 'Available Rooms'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {isSearching
              ? 'Finding the best available rooms for your selected dates...'
              : 'Choose from our selection of comfortable and well-appointed rooms for your stay'}
          </p>

          {/* Enhanced Room Summary Information */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Check-in</p>
                  <p className="font-semibold text-gray-900">
                    {format(checkinDate, 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Check-out</p>
                  <p className="font-semibold text-gray-900">
                    {format(checkoutDate, 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Guests</p>
                  <p className="font-semibold text-gray-900">
                    {adults} adult{adults !== 1 ? 's' : ''}
                    {children > 0 &&
                      `, ${children} child${children !== 1 ? 'ren' : ''}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      {onRefresh && (
        <div className="flex justify-center mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
            Refresh Rooms
          </motion.button>
        </div>
      )}

      {/* Rooms Table */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-blue-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  Room Type
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  Capacity
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  Amenities
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  Price
                </th>
                <th className="text-center py-4 px-6 font-semibold text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => {
                const safeRoom = room || {};
                const roomHasValidPricing = hasValidPricing(safeRoom);

                // Calculate total price for the stay
                const nights = Math.ceil(
                  (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24)
                );

                let totalPrice = 'NaN';
                if (roomHasValidPricing) {
                  const priceMatch = safeRoom.price_text.match(/[\d,]+\.?\d*/);
                  if (priceMatch) {
                    const pricePerNight = parseFloat(
                      priceMatch[0].replace(/,/g, '')
                    );
                    totalPrice = `$${(pricePerNight * nights).toFixed(2)}`;
                  }
                }

                return (
                  <tr
                    key={safeRoom.id}
                    className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                  >
                    {/* Room Details */}
                    <td className="py-6 px-6">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {safeRoom.title || 'Standard Room'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {safeRoom.size_html || 'Size not specified'}
                        </p>
                      </div>
                    </td>

                    {/* Capacity */}
                    <td className="py-6 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Users className="h-4 w-4 text-blue-500" />
                          <span>{safeRoom.adults_html || 'Not specified'}</span>
                        </div>
                        {safeRoom.children_html && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users className="h-4 w-4 text-green-500" />
                            <span>{safeRoom.children_html}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Bed className="h-4 w-4 text-purple-500" />
                          <span>{safeRoom.beds_html || 'Not specified'}</span>
                        </div>
                      </div>
                    </td>

                    {/* Amenities */}
                    <td className="py-6 px-6">
                      <div className="flex flex-wrap gap-2">
                        {(safeRoom.term_features || [])
                          .slice(0, 3)
                          .map((amenity, amenityIndex) => {
                            const Icon = getAmenityIcon(amenity);
                            return (
                              <div
                                key={amenityIndex}
                                className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                              >
                                <Icon className="h-3 w-3" />
                                <span>
                                  {amenity.title || amenity.name || amenity}
                                </span>
                              </div>
                            );
                          })}
                        {(safeRoom.term_features || []).length > 3 && (
                          <div className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            +{(safeRoom.term_features || []).length - 3} more
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-6 px-6">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {roomHasValidPricing ? totalPrice : 'NaN'}
                        </div>
                        <div className="text-sm text-gray-600">
                          {roomHasValidPricing
                            ? `for ${nights} night${nights !== 1 ? 's' : ''}`
                            : 'No pricing available'}
                        </div>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-6 px-6 text-center">
                      <motion.button
                        whileHover={{ scale: roomHasValidPricing ? 1.05 : 1 }}
                        whileTap={{ scale: roomHasValidPricing ? 0.95 : 1 }}
                        onClick={() =>
                          roomHasValidPricing && handleBookNow(safeRoom)
                        }
                        disabled={!roomHasValidPricing}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          roomHasValidPricing
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Book Now
                      </motion.button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Error Display */}
      {bookingError && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{bookingError}</p>
        </div>
      )}
    </div>
  );
};

RoomAvailability.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      price_text: PropTypes.string,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      adults_html: PropTypes.string,
      children_html: PropTypes.string,
      beds_html: PropTypes.string,
      size_html: PropTypes.string,
      term_features: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  hotelId: PropTypes.string.isRequired,
  hotelData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    bookingFee: PropTypes.string.isRequired,
    policy: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  checkin: PropTypes.string,
  checkout: PropTypes.string,
  adults: PropTypes.number,
  children: PropTypes.number,
  isSearching: PropTypes.bool,
  onRefresh: PropTypes.func,
};

export default RoomAvailability;
