'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LoaderCircle,
  Bed,
  Users,
  Baby,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import BookingDialog from './BookingDialog';
import { format, addDays } from 'date-fns';

const ImageWithFallback = ({ src, alt, ...props }) => {
  const [hasError, setHasError] = React.useState(false);
  const proxiedSrc = src.includes('staging.trektoo.com')
    ? `/api/image/proxy?url=${encodeURIComponent(src)}`
    : src;

  return (
    <div className="relative w-full h-full overflow-hidden">
      {hasError ? (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
          <span className="text-gray-600 text-xs font-medium">
            Image Unavailable
          </span>
        </div>
      ) : (
        <Image
          src={proxiedSrc}
          alt={alt}
          onError={() => {
            console.error('Image load error:', { src });
            setHasError(true);
          }}
          className="object-cover w-full h-full"
          {...props}
        />
      )}
    </div>
  );
};

ImageWithFallback.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

const RoomAvailability = ({ rooms, loading, error, hotelId, hotelData }) => {
  const [currentImages, setCurrentImages] = useState({});
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
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.5 } },
  };

  const handleNextImage = (roomId) => {
    setCurrentImages((prev) => {
      const room = rooms.find((r) => r.id === roomId);
      const currentIndex = prev[roomId] || 0;
      const nextIndex = (currentIndex + 1) % (room.gallery?.length || 1);
      return { ...prev, [roomId]: nextIndex };
    });
  };

  const handlePrevImage = (roomId) => {
    setCurrentImages((prev) => {
      const room = rooms.find((r) => r.id === roomId);
      const currentIndex = prev[roomId] || 0;
      const prevIndex =
        (currentIndex - 1 + (room.gallery?.length || 1)) %
        (room.gallery?.length || 1);
      return { ...prev, [roomId]: prevIndex };
    });
  };

  const handleThumbnailClick = (roomId, index) => {
    setCurrentImages((prev) => ({ ...prev, [roomId]: index }));
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto p-8 text-center bg-white/95 rounded-3xl shadow-xl mt-12 border border-blue-100"
      >
        <LoaderCircle className="h-8 w-8 text-blue-600 animate-spin mx-auto" />
        <p className="text-gray-600 text-sm mt-2">
          Loading room availability...
        </p>
      </motion.div>
    );
  }

  if (error || !rooms.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto p-8 text-center bg-white/95 rounded-3xl shadow-xl mt-12 border border-blue-100"
      >
        <p className="text-gray-600 text-sm">
          {error
            ? 'Failed to load rooms. Please try again later.'
            : 'No rooms available.'}
        </p>
        {error && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 text-sm font-medium rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </motion.button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative w-full max-w-7xl mx-auto mt-12 py-8 px-4 sm:px-6 lg:px-8 bg-white/95 backdrop-blur-sm shadow-xl rounded-3xl border border-blue-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-8 border-l-4 border-blue-600 pl-4 font-montserrat"
        variants={itemVariants}
      >
        Available Rooms
      </motion.h2>
      {bookingError && !isDialogOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm"
        >
          <p>{bookingError}</p>
        </motion.div>
      )}
      <div className="space-y-8">
        {rooms.map((room) => {
          const priceMatch = room.price_text.match(/\$(\d+\.?\d*)/);
          const roomPrice = priceMatch ? parseFloat(priceMatch[1]) : 0;
          return (
            <motion.div
              key={room.id}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="relative">
                  <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden">
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={currentImages[room.id] || 0}
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute inset-0"
                      >
                        <ImageWithFallback
                          src={
                            room.gallery?.[currentImages[room.id] || 0]
                              ?.large || room.image
                          }
                          alt={`${room.title} image ${currentImages[room.id] || 0 + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          quality={85}
                          loading="lazy"
                        />
                      </motion.div>
                    </AnimatePresence>
                    {room.gallery?.length > 1 && (
                      <div className="absolute inset-x-0 bottom-0 flex justify-between p-3">
                        <button
                          onClick={() => handlePrevImage(room.id)}
                          className="p-2 bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleNextImage(room.id)}
                          className="p-2 bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-gray-100 pb-2">
                    {room.gallery?.map((img, index) => (
                      <button
                        key={index}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          currentImages[room.id] === index
                            ? 'border-blue-600'
                            : 'border-transparent'
                        } hover:border-blue-600 transition-all min-w-0`}
                        onClick={() => handleThumbnailClick(room.id, index)}
                        aria-label={`View image ${index + 1}`}
                      >
                        <ImageWithFallback
                          src={img.thumb}
                          alt={`${room.title} thumbnail ${index + 1}`}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4 font-montserrat">
                      {room.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm sm:text-base mb-4">
                      <div className="flex items-center">
                        <Bed className="h-5 w-5 text-blue-600 mr-2" />
                        <span>{room.beds_html}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-blue-600 mr-2" />
                        <span>{room.adults_html} Adults</span>
                      </div>
                      <div className="flex items-center">
                        <Baby className="h-5 w-5 text-blue-600 mr-2" />
                        <span>{room.children_html} Children</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">{room.size_html}</span>
                      </div>
                    </div>
                    <div className="text-gray-600 text-lg sm:text-xl mb-4">
                      <span className="font-bold text-gray-900 text-xl sm:text-2xl">
                        {room.price_text}
                      </span>
                    </div>
                    <div className="mb-6">
                      <h4 className="text-sm sm:text-base font-medium text-gray-700 mb-3 font-montserrat">
                        Amenities
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {room.term_features.map((feature, index) => (
                          <span
                            key={index}
                            className="flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 text-xs sm:text-sm font-medium rounded-full"
                          >
                            <i
                              className={`${feature.icon} mr-1.5 text-blue-600`}
                            ></i>
                            {feature.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.div variants={itemVariants} className="flex-1">
                      <button
                        onClick={() => handleBookNowClick(room)}
                        disabled={isDialogOpen}
                        className={`block w-full text-center bg-blue-500 text-white py-3 px-8 rounded-xl hover:from-blue-700 hover:to-blue-900 transition-all duration-300 ${
                          isDialogOpen ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <motion.span
                          whileHover={{ scale: isDialogOpen ? 1 : 1.05 }}
                          whileTap={{ scale: isDialogOpen ? 1 : 0.95 }}
                        >
                          Book Now
                        </motion.span>
                      </button>
                    </motion.div>
                    <motion.div variants={itemVariants} className="flex-1">
                      <Link
                        href={`/hotel/${hotelId}/room/${room.id}`}
                        className="block w-full text-center bg-gray-100 text-gray-700 font-semibold py-3 px-8 rounded-xl hover:bg-blue-100 transition-all duration-300"
                      >
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details
                        </motion.span>
                      </Link>
                    </motion.div>
                  </div>
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
