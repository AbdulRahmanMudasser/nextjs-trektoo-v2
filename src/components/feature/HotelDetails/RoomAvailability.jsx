'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LoaderCircle,
  Bed,
  Users,
  Baby,
  RefreshCw,
  Eye,
  Star,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import BookingDialog from './BookingDialog';
import { format, addDays } from 'date-fns';

const RoomAvailability = ({ rooms, loading, error, hotelId, hotelData }) => {
  const [bookingError, setBookingError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const searchParams = useSearchParams();

  // Parse query parameters
  const checkin = searchParams.get('checkin')
    ? new Date(searchParams.get('checkin'))
    : new Date();
  const checkout = searchParams.get('checkout')
    ? new Date(searchParams.get('checkout'))
    : addDays(new Date(), 1);
  const adults = parseInt(searchParams.get('adults') || '1', 10);
  const children = parseInt(searchParams.get('children') || '0', 10);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 120, damping: 15 },
    },
  };

  const handleBookNowClick = (room) => {
    const priceMatch = room.price_text.match(/\$(\d+\.?\d*)/);
    const roomPrice = priceMatch ? parseFloat(priceMatch[1]) : 0;
    const query = new URLSearchParams({
      roomId: room.id.toString(),
      roomTitle: room.title,
      roomPrice: roomPrice.toString(),
      roomImage: room.gallery?.[0]?.large || room.image,
      beds: room.beds_html,
      adults: String(adults),
      children: String(children),
      start_date: format(checkin, 'yyyy-MM-dd'),
      end_date: format(checkout, 'yyyy-MM-dd'),
      hotelTitle: hotelData.title,
      hotelPrice: hotelData.price.toString(),
      bookingFee: hotelData.bookingFee,
    }).toString();

    if (!isAuthenticated) {
      router.push(`/login?redirect=/hotel/${hotelId}/checkout&${query}`);
      return;
    }

    setSelectedRoom(room);
    setIsDialogOpen(true);
    setBookingError(null);
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto p-12 text-center bg-white rounded-3xl shadow-2xl mt-12 border border-blue-100/50 backdrop-blur-sm"
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <LoaderCircle className="h-12 w-12 text-blue-500 animate-spin" />
            <div className="absolute inset-0 h-12 w-12 border-2 border-blue-200 rounded-full animate-ping"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">
              Finding Available Rooms
            </h3>
            <p className="text-gray-500 text-sm">
              Searching for the perfect accommodation for your stay...
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error || !rooms.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-7xl mx-auto p-12 text-center bg-white rounded-3xl shadow-2xl mt-12 border border-blue-100/50"
      >
        <div className="space-y-6">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
            <Bed className="h-8 w-8 text-blue-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">
              {error ? 'Unable to Load Rooms' : 'No Rooms Available'}
            </h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              {error
                ? 'We encountered an issue while fetching room availability. Please try again.'
                : 'No rooms match your current search criteria. Try adjusting your dates or preferences.'}
            </p>
          </div>
          {error && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative w-full max-w-7xl mx-auto mt-12 py-12 px-4 sm:px-6 lg:px-8 bg-white rounded-3xl shadow-2xl border border-blue-100/50 backdrop-blur-sm"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Enhanced Header Section */}
      <motion.div className="text-center mb-12" variants={itemVariants}>
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
            <Bed className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 font-montserrat">
            Available Rooms
          </h2>
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto"></div>
        <p className="text-gray-600 mt-4 text-lg">
          Choose from our selection of comfortable and well-appointed rooms
        </p>
      </motion.div>

      {bookingError && !isDialogOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-red-500 rounded-full flex-shrink-0"></div>
            <p className="font-medium">{bookingError}</p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {rooms.map((room) => {
          const priceMatch = room.price_text.match(/\$(\d+\.?\d*)/);
          const roomPrice = priceMatch ? parseFloat(priceMatch[1]) : 0;
          return (
            <motion.div
              key={room.id}
              className="group bg-white rounded-3xl shadow-lg border border-blue-100/50 hover:shadow-2xl transition-all duration-500 hover:border-blue-200 hover:-translate-y-2 overflow-hidden"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              {/* Enhanced Room Header */}
              <div className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-8 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold leading-tight font-montserrat">
                      {room.title}
                    </h3>
                    <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold">
                    {room.price_text}
                    <span className="text-sm font-normal text-blue-100 ml-2">
                      per night
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Enhanced Room Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-5 text-center border border-blue-100/50 group-hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Bed className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-sm font-semibold text-gray-800 mb-1">
                      Beds
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      {room.beds_html}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-5 text-center border border-blue-100/50 group-hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-sm font-semibold text-gray-800 mb-1">
                      Adults
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      {room.adults_html}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-5 text-center border border-blue-100/50 group-hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Baby className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-sm font-semibold text-gray-800 mb-1">
                      Children
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      {room.children_html}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-5 text-center border border-blue-100/50 group-hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <span className="text-white text-sm font-bold">m²</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-800 mb-1">
                      Size
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      {room.size_html}
                    </div>
                  </div>
                </div>

                {/* Enhanced Amenities Section */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gray-800 mb-4 font-montserrat flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Room Amenities
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {room.term_features.slice(0, 4).map((feature, index) => (
                      <span
                        key={index}
                        className="flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-700 text-sm font-medium rounded-xl border border-blue-200/50 shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <i className={`${feature.icon} mr-2 text-blue-600`}></i>
                        {feature.title}
                      </span>
                    ))}
                    {room.term_features.length > 4 && (
                      <span className="flex items-center px-4 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 text-sm font-medium rounded-xl border border-gray-200 shadow-sm">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                        +{room.term_features.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="space-y-4">
                  <motion.div variants={itemVariants}>
                    <button
                      onClick={() => handleBookNowClick(room)}
                      disabled={isDialogOpen}
                      className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-4 px-8 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 ${
                        isDialogOpen ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <motion.span
                        whileHover={{ scale: isDialogOpen ? 1 : 1.05 }}
                        whileTap={{ scale: isDialogOpen ? 1 : 0.95 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <Star className="h-5 w-5 fill-current" />
                        Book This Room
                      </motion.span>
                    </button>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Link
                      href={`/hotel/${hotelId}/room/${room.id}`}
                      className="group flex items-center justify-center gap-2 w-full bg-white text-blue-600 font-semibold py-4 px-8 rounded-2xl hover:bg-blue-50 transition-all duration-300 border-2 border-blue-200 hover:border-blue-300 shadow-lg hover:shadow-xl"
                    >
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                        View Details
                      </motion.span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {selectedRoom && (
        <BookingDialog
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          room={selectedRoom}
          hotelId={hotelId}
          hotelData={hotelData}
          bookingError={bookingError}
          setBookingError={setBookingError}
          staticData={{
            start_date: format(checkin, 'yyyy-MM-dd'),
            end_date: format(checkout, 'yyyy-MM-dd'),
            adults: String(adults),
            children: String(children),
          }}
        />
      )}
    </motion.div>
  );
};

RoomAvailability.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      size_html: PropTypes.string.isRequired,
      beds_html: PropTypes.string.isRequired,
      adults_html: PropTypes.string.isRequired,
      children_html: PropTypes.string.isRequired,
      price_text: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      gallery: PropTypes.arrayOf(
        PropTypes.shape({
          large: PropTypes.string.isRequired,
          thumb: PropTypes.string.isRequired,
        })
      ).isRequired,
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
};

export default RoomAvailability;
