'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useAddToCart } from '@/hooks/useHotels';
import { useAuth } from '@/hooks/useAuth';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';

const BookingDialog = ({
  isOpen,
  setIsOpen,
  room,
  hotelId,
  hotelData,
  bookingError,
  setBookingError,
  staticData,
}) => {
  const [formData, setFormData] = useState({
    number_of_rooms: '1',
  });
  const [progressMessage, setProgressMessage] = useState('');
  const router = useRouter();
  const { token } = useAuth();
  const { mutate: addToCart, isPending: isBooking } = useAddToCart(token);

  const progressMessages = [
    'Adding to cart...',
    'Processing booking...',
    'Almost there...',
    'Booking added!',
  ];

  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.3, ease: 'easeIn' },
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      borderColor: '#3B82F6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2)',
      transition: { duration: 0.2 },
    },
  };

  const handleFormSubmit = () => {
    if (!formData.number_of_rooms) {
      setBookingError('Please select the number of rooms.');
      return;
    }

    const priceMatch = room.price_text.match(/\$(\d+\.?\d*)/);
    const roomPrice = priceMatch ? parseFloat(priceMatch[1]) : 0;

    const bookingData = {
      service_id: parseInt(hotelId),
      service_type: 'hotel',
      start_date: staticData.start_date,
      end_date: staticData.end_date,
      extra_price: null,
      adults: parseInt(staticData.adults),
      children: parseInt(staticData.children),
      rooms: [
        {
          id: room.id,
          number_selected: parseInt(formData.number_of_rooms),
        },
      ],
    };

    let messageIndex = 0;
    setProgressMessage(progressMessages[messageIndex]);
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % progressMessages.length;
      setProgressMessage(progressMessages[messageIndex]);
    }, 2000);

    addToCart(bookingData, {
      onSuccess: (data) => {
        clearInterval(messageInterval);
        if (data.status === 1) {
          setProgressMessage('Booking added!');
          setTimeout(() => {
            localStorage.setItem('booking_code', data.booking_code);
            const query = new URLSearchParams({
              booking_code: data.booking_code,
              roomId: room.id.toString(),
              roomTitle: room.title,
              roomPrice: roomPrice.toString(),
              roomImage: room.gallery?.[0]?.large || room.image,
              beds: room.beds_html,
              adults: staticData.adults,
              children: staticData.children,
              number_of_rooms: formData.number_of_rooms,
              start_date: staticData.start_date,
              end_date: staticData.end_date,
              hotelTitle: hotelData.title,
              hotelPrice: hotelData.price.toString(),
              bookingFee: hotelData.bookingFee,
            }).toString();
            router.push(`/hotel/${hotelId}/checkout?${query}`);
            setIsOpen(false);
          }, 1000);
        } else {
          clearInterval(messageInterval);
          setBookingError(data.message || 'Failed to add to cart');
          setProgressMessage('');
        }
      },
      onError: (error) => {
        clearInterval(messageInterval);
        setBookingError(
          error.response?.data?.message || 'Failed to add to cart'
        );
        setProgressMessage('');
      },
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !isBooking && setIsOpen(open)}
    >
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-xl borde p-8">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Book {room?.title}</DialogTitle>
          </VisuallyHidden>
          <h2 className="text-2xl font-bold text-gray-900 font-montserrat tracking-tight">
            Book {room?.title}
          </h2>
          <p className="text-gray-600 text-sm mt-1 font-montserrat">
            Select the number of rooms for your stay
          </p>
        </DialogHeader>
        <motion.div
          variants={dialogVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="mt-6"
        >
          {isBooking ? (
            <div className="py-12 text-center">
              <Loader2 className="h-10 w-10 text-blue-500 animate-spin mx-auto" />
              <p className="text-gray-700 mt-4 text-lg font-medium font-montserrat">
                {progressMessage}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {bookingError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-200 shadow-sm"
                >
                  {bookingError}
                </motion.div>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2 font-montserrat">
                  Number of Rooms
                </label>
                <motion.div
                  variants={inputVariants}
                  whileHover="focus"
                  whileFocus="focus"
                >
                  <Select
                    value={formData.number_of_rooms}
                    onValueChange={(value) =>
                      setFormData({ ...formData, number_of_rooms: value })
                    }
                  >
                    <SelectTrigger className="w-full border-blue-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg py-3 px-4 text-gray-700 text-base font-montserrat bg-white/80 shadow-sm transition-all duration-200">
                      <SelectValue placeholder="Select number of rooms" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-blue-100 shadow-lg rounded-lg">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem
                          key={num}
                          value={num.toString()}
                          className="text-gray-700 font-montserrat hover:bg-blue-50"
                        >
                          {num} Room{num > 1 ? 's' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleFormSubmit}
                  disabled={!formData.number_of_rooms}
                  className="w-full bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-3 text-lg font-montserrat shadow-md hover:shadow-lg transition-all duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  Confirm Booking
                </Button>
              </motion.div>
            </div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

BookingDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  room: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price_text: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    gallery: PropTypes.arrayOf(
      PropTypes.shape({
        large: PropTypes.string.isRequired,
        thumb: PropTypes.string.isRequired,
      })
    ).isRequired,
    beds_html: PropTypes.string.isRequired,
  }).isRequired,
  hotelId: PropTypes.string.isRequired,
  hotelData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    bookingFee: PropTypes.string.isRequired,
  }).isRequired,
  bookingError: PropTypes.string,
  setBookingError: PropTypes.func.isRequired,
  staticData: PropTypes.shape({
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string.isRequired,
    adults: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookingDialog;
