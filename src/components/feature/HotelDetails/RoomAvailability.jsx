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
import { usePrebookHotel } from '@/hooks/useHotels';

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

  // Transform room data to match component expectations
  const transformedRooms = rooms.map((room) => ({
    ...room,
    // Format price display - handle empty string and null values
    price_text:
      room.price && room.price !== '' && room.price !== '0.00'
        ? `$${parseFloat(room.price).toFixed(2)}`
        : 'Price on request',
    // Format capacity display
    adults_html:
      room.adults && room.adults > 0
        ? `${room.adults} Adult${room.adults > 1 ? 's' : ''}`
        : 'Not specified',
    children_html:
      room.children && room.children !== '' && room.children > 0
        ? `${room.children} Child${room.children > 1 ? 'ren' : ''}`
        : 'Not specified',
    beds_html:
      room.beds && room.beds > 0
        ? `${room.beds} Bed${room.beds > 1 ? 's' : ''}`
        : 'Not specified',
    size_html:
      room.size && room.size !== '' ? `${room.size} m²` : 'Not specified',
    // Add default amenities if none exist
    term_features: room.term_features || [
      { title: 'Wi-Fi', icon: 'fas fa-wifi' },
      { title: 'Air Conditioning', icon: 'fas fa-snowflake' },
      { title: 'Private Bathroom', icon: 'fas fa-bath' },
      { title: 'TV', icon: 'fas fa-tv' },
    ],
    // Add gallery fallback
    gallery:
      room.gallery && room.gallery !== ''
        ? Array.isArray(room.gallery)
          ? room.gallery
          : [room.gallery]
        : [],
    // Add image fallback
    image:
      room.image && room.image !== ''
        ? room.image
        : room.gallery && room.gallery !== ''
          ? Array.isArray(room.gallery)
            ? room.gallery[0]
            : room.gallery
          : null,
  }));

  const hasValidPricing = (room) => {
    const price = room.price_text || room.price;
    return (
      price &&
      price !== 'Price on request' &&
      price !== '0.00' &&
      price !== '0' &&
      price !== '' &&
      price !== 'Contact for Pricing' &&
      price.trim() !== '' &&
      !price.includes('NaN')
    );
  };

  const prebookMutation = usePrebookHotel();

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
        const query = new URLSearchParams({
          checkin: format(checkinDate, 'yyyy-MM-dd'),
          checkout: format(checkoutDate, 'yyyy-MM-dd'),
          adults: adults.toString(),
          children: children.toString(),
          roomId: room.id,
        }).toString();

        router.push(
          `/login?returnUrl=${encodeURIComponent(`/hotel/${hotelId}?${query}`)}`
        );
        return;
      }

      // If authenticated, call prebook API
      const prebookData = {
        roomId: room.id,
        checkin: format(checkinDate, 'yyyy-MM-dd'),
        checkout: format(checkoutDate, 'yyyy-MM-dd'),
        adults,
        children,
      };

      console.log('🔍 Calling prebook API with:', prebookData);

      const prebookResponse = await prebookMutation.mutateAsync(prebookData);

      console.log('🔍 Prebook response:', prebookResponse);

      // Check if prices changed
      if (
        prebookResponse &&
        prebookResponse['0'] &&
        prebookResponse['0'].changes
      ) {
        const priceChanged = prebookResponse['0'].changes.price_changed;

        if (priceChanged) {
          // Show error message that prices changed
          setBookingError(
            'Room prices have changed. Please select a room again to see updated pricing.'
          );
          return;
        }
      }

      // If prices didn't change, proceed to checkout
      if (
        prebookResponse &&
        prebookResponse.success &&
        prebookResponse.isAllowed
      ) {
        // Store prebook data for checkout
        try {
          sessionStorage.setItem(
            'prebookData',
            JSON.stringify(prebookResponse)
          );
        } catch (error) {
          console.warn('Could not store prebook data:', error);
        }

        // Redirect to checkout
        const query = new URLSearchParams({
          checkin: format(checkinDate, 'yyyy-MM-dd'),
          checkout: format(checkoutDate, 'yyyy-MM-dd'),
          adults: adults.toString(),
          children: children.toString(),
          roomId: room.id,
        }).toString();

        router.push(`/hotel/${hotelId}/checkout?${query}`);
      } else {
        setBookingError(
          prebookResponse?.message ||
            'Unable to proceed with booking. Please try again.'
        );
      }
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
      <div className="w-full">
        <div className="text-center space-y-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Loading Available Rooms...
          </h2>
          <p className="text-gray-600">
            Please wait while we fetch available rooms for your selected
            dates...
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="flex items-center justify-center">
            <LoadingSpinner size="lg" message="Loading Room Availability" />
          </div>
        </div>
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

  if (!transformedRooms || transformedRooms.length === 0) {
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
      {/* Simple Header Section */}
      <div className="text-center space-y-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {isSearching ? 'Searching Available Rooms...' : 'Available Rooms'}
        </h2>
        <p className="text-gray-600">
          {isSearching
            ? 'Finding the best available rooms for your selected dates...'
            : 'Choose from our selection of comfortable and well-appointed rooms for your stay'}
        </p>

        {/* Room Summary Information - Matching Room Availability Style */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Check-in</p>
                  <p className="font-bold text-gray-900 text-lg">
                    {format(checkinDate, 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Check-out</p>
                  <p className="font-bold text-gray-900 text-lg">
                    {format(checkoutDate, 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">Guests</p>
                  <p className="font-bold text-gray-900 text-lg">
                    {adults} adult{adults !== 1 ? 's' : ''}
                    {children > 0 &&
                      `, ${children} child${children !== 1 ? 'ren' : ''}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Refresh Button - Matching Search Available Rooms Style */}
            {onRefresh && (
              <div className="flex justify-center lg:justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onRefresh}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw
                    className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`}
                  />
                  {loading ? 'Refreshing...' : 'Refresh Rooms'}
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rooms Table - Matching Room Availability Style */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-50">
              <tr className="border-b border-blue-200">
                <th className="text-left py-6 px-6 font-bold text-gray-900 text-lg">
                  Room Type
                </th>
                <th className="text-left py-6 px-6 font-bold text-gray-900 text-lg">
                  Capacity
                </th>
                <th className="text-left py-6 px-6 font-bold text-gray-900 text-lg">
                  Amenities
                </th>
                <th className="text-left py-6 px-6 font-bold text-gray-900 text-lg">
                  Price
                </th>
                <th className="text-center py-6 px-6 font-bold text-gray-900 text-lg">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {transformedRooms.map((room, index) => {
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
                    className="hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                  >
                    {/* Room Details */}
                    <td className="py-6 px-6">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-900">
                          {safeRoom.title || 'Standard Room'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {safeRoom.size_html || 'Room size not specified'}
                        </p>
                        {safeRoom.content && safeRoom.content.trim() !== '' && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {safeRoom.content.substring(0, 100)}...
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Capacity */}
                    <td className="py-6 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Users className="h-4 w-4 text-blue-500" />
                          <span>
                            {safeRoom.adults_html || 'Occupancy not specified'}
                          </span>
                        </div>
                        {safeRoom.children_html &&
                          safeRoom.children_html !== 'Not specified' && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Users className="h-4 w-4 text-blue-500" />
                              <span>{safeRoom.children_html}</span>
                            </div>
                          )}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Bed className="h-4 w-4 text-blue-500" />
                          <span>
                            {safeRoom.beds_html ||
                              'Bed configuration not specified'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Amenities */}
                    <td className="py-6 px-6">
                      <div className="flex flex-wrap gap-1">
                        {(safeRoom.term_features || []).length > 0 ? (
                          <>
                            {(safeRoom.term_features || [])
                              .slice(0, 3)
                              .map((amenity, amenityIndex) => {
                                const Icon = getAmenityIcon(amenity);
                                return (
                                  <div
                                    key={amenityIndex}
                                    className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                                  >
                                    <Icon className="h-3 w-3" />
                                    <span>
                                      {amenity.title || amenity.name || amenity}
                                    </span>
                                  </div>
                                );
                              })}
                            {(safeRoom.term_features || []).length > 3 && (
                              <div className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                +{(safeRoom.term_features || []).length - 3}{' '}
                                more
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            Standard amenities included
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-6 px-6">
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">
                          {roomHasValidPricing
                            ? totalPrice
                            : 'Contact for Pricing'}
                        </div>
                        <div className="text-sm text-gray-600">
                          {roomHasValidPricing
                            ? `for ${nights} night${nights !== 1 ? 's' : ''}`
                            : 'Pricing available on request'}
                        </div>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-6 px-6 text-center">
                      <motion.button
                        whileHover={
                          roomHasValidPricing && !prebookMutation.isPending
                            ? { scale: 1.05 }
                            : {}
                        }
                        whileTap={
                          roomHasValidPricing && !prebookMutation.isPending
                            ? { scale: 0.95 }
                            : {}
                        }
                        onClick={() =>
                          roomHasValidPricing &&
                          !prebookMutation.isPending &&
                          handleBookNow(safeRoom)
                        }
                        disabled={
                          !roomHasValidPricing || prebookMutation.isPending
                        }
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          roomHasValidPricing && !prebookMutation.isPending
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white cursor-pointer'
                            : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed opacity-60'
                        }`}
                      >
                        {prebookMutation.isPending
                          ? 'Processing...'
                          : roomHasValidPricing
                            ? 'Book Now'
                            : 'Contact for Pricing'}
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
