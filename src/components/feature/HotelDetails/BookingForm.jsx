'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { CalendarIcon, ShoppingCart } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import DateInput from '@/components/ui/Custom/DateInput';

const BookingForm = ({ id }) => {
  const [startDate, setStartDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState('');
  const [ticketCount, setTicketCount] = useState(1);
  const [serviceBooking, setServiceBooking] = useState(false);
  const [servicePerson, setServicePerson] = useState(false);
  const [error, setError] = useState('');

  const timeSlots = ['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM'];

  const baseTicketPrice = 50;
  const serviceBookingCost = serviceBooking ? 30 : 0;
  const servicePersonCost = servicePerson ? ticketCount * (18 + 16) : 0;
  const totalCost =
    ticketCount * baseTicketPrice + serviceBookingCost + servicePersonCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate) {
      setError('Please select a date.');
      return;
    }
    if (!timeSlot) {
      setError('Please select a time slot.');
      return;
    }
    setError('');
    console.log({
      id,
      startDate,
      timeSlot,
      ticketCount,
      serviceBooking,
      servicePerson,
      totalCost,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-sm border border-blue-50 transition-all hover:shadow-md"
        variants={itemVariants}
      >
        <motion.h3
          className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mb-4 border-l-4 border-blue-500 pl-3"
          variants={itemVariants}
        >
          Book Your Hotel
        </motion.h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div variants={itemVariants}>
            <label
              htmlFor={`from-${id}`}
              className="block text-gray-700 mb-1 text-base font-medium"
            >
              From:
            </label>
            <div className="relative">
              <DateInput
                selectedDate={startDate}
                onChange={(date) => {
                  console.log('Date selected:', date);
                  setStartDate(date);
                  setError('');
                }}
                placeholder="Select tour start date"
                minDate={new Date()}
                aria-label="Select tour start date"
                className="w-full border border-blue-100 rounded-md p-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-blue-50/50"
              />
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <label
              htmlFor={`time-${id}`}
              className="block text-gray-700 mb-1 text-base font-medium"
            >
              Time:
            </label>
            <select
              id={`time-${id}`}
              value={timeSlot}
              onChange={(e) => {
                setTimeSlot(e.target.value);
                setError('');
              }}
              className="w-full border border-blue-100 rounded-md p-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-blue-50/50"
              aria-label="Select tour time slot"
            >
              <option value="" disabled>
                Select time
              </option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </motion.div>
          <motion.div variants={itemVariants}>
            <label
              htmlFor={`tickets-${id}`}
              className="block text-gray-700 mb-1 text-base font-medium"
            >
              Tickets:
            </label>
            <input
              type="number"
              id={`tickets-${id}`}
              value={ticketCount}
              onChange={(e) =>
                setTicketCount(Math.max(1, Math.min(10, +e.target.value)))
              }
              min={1}
              max={10}
              disabled={!startDate}
              className="w-full border border-blue-100 rounded-md p-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-blue-50/50 disabled:bg-gray-100 disabled:cursor-not-allowed"
              placeholder={
                startDate
                  ? 'Enter number of tickets'
                  : 'Please select date first'
              }
              aria-label="Number of tickets"
            />
          </motion.div>
          <motion.div className="space-y-4" variants={itemVariants}>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`service-booking-${id}`}
                  checked={serviceBooking}
                  onChange={(e) => setServiceBooking(e.target.checked)}
                  className="h-4 w-4 text-blue-500 border-blue-200 rounded focus:ring-blue-500 cursor-pointer"
                  aria-label="Service per booking"
                />
                <label
                  htmlFor={`service-booking-${id}`}
                  className="ml-2 text-gray-700 text-base cursor-pointer"
                >
                  Service per booking
                </label>
              </div>
              <span className="text-gray-700 font-medium text-base">
                $30.00
              </span>
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                Add Extras
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`service-person-${id}`}
                      checked={servicePerson}
                      onChange={(e) => setServicePerson(e.target.checked)}
                      className="h-4 w-4 text-blue-500 border-blue-200 rounded focus:ring-blue-500 cursor-pointer"
                      aria-label="Service per person"
                    />
                    <label
                      htmlFor={`service-person-${id}`}
                      className="ml-2 text-gray-700 text-base cursor-pointer"
                    >
                      Service per person
                    </label>
                  </div>
                </div>
                <div className="flex justify-between items-center pl-6">
                  <span className="text-gray-600 text-base">Children:</span>
                  <span className="text-gray-700 font-medium text-base">
                    $18.00
                  </span>
                </div>
                <div className="flex justify-between items-center pl-6">
                  <span className="text-gray-600 text-base">Youth:</span>
                  <span className="text-gray-700 font-medium text-base">
                    $16.00
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                Total:
              </span>
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                ${totalCost.toFixed(2)}
              </span>
            </div>
            {error && (
              <motion.p
                className="text-red-500 text-base mb-3"
                role="alert"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.p>
            )}
            <motion.button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center text-base transition-all disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              disabled={!startDate || !timeSlot}
              aria-label="Book Hotel"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Book Now
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

BookingForm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default BookingForm;
