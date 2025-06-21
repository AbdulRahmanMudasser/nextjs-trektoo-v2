'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

  return (
    <div className="w-full md:w-1/3">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100 transition-all hover:shadow-xl">
        <h3
          className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-[#A3BFFA] pl-3"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Book Your Tour
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor={`from-${id}`}
              className="block text-gray-700 mb-1 text-sm font-medium"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
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
              />
            </div>
          </div>
          <div>
            <label
              htmlFor={`time-${id}`}
              className="block text-gray-700 mb-1 text-sm font-medium"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
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
              className="w-full border border-gray-200 rounded-md p-2 text-sm focus:ring-2 focus:ring-[#A3BFFA] focus:border-[#A3BFFA] transition"
              aria-label="Select tour time slot"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
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
          </div>
          <div>
            <label
              htmlFor={`tickets-${id}`}
              className="block text-gray-700 mb-1 text-sm font-medium"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
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
              className="w-full border border-gray-200 rounded-md p-2 text-sm focus:ring-2 focus:ring-[#A3BFFA] focus:border-[#A3BFFA] transition disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder={
                startDate
                  ? 'Enter number of tickets'
                  : 'Please select date first'
              }
              aria-label="Number of tickets"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`service-booking-${id}`}
                checked={serviceBooking}
                onChange={(e) => setServiceBooking(e.target.checked)}
                className="h-4 w-4 text-[#A3BFFA] border-gray-300 rounded focus:ring-[#A3BFFA] cursor-pointer"
                aria-label="Service per booking"
              />
              <label
                htmlFor={`service-booking-${id}`}
                className="ml-2 text-gray-700 text-sm cursor-pointer"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Service per booking
              </label>
            </div>
            <span
              className="text-gray-700 font-medium text-sm"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              $30.00
            </span>
          </div>
          <div>
            <h4
              className="text-lg font-bold text-gray-800 mb-2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Add Extras
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`service-person-${id}`}
                    checked={servicePerson}
                    onChange={(e) => setServicePerson(e.target.checked)}
                    className="h-4 w-4 text-[#A3BFFA] border-gray-300 rounded focus:ring-[#A3BFFA] cursor-pointer"
                    aria-label="Service per person"
                  />
                  <label
                    htmlFor={`service-person-${id}`}
                    className="ml-2 text-gray-700 text-sm cursor-pointer"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Service per person
                  </label>
                </div>
              </div>
              <div className="flex justify-between items-center pl-6">
                <span
                  className="text-gray-600 text-sm"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Children:
                </span>
                <span
                  className="text-gray-700 font-medium text-sm"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  $18.00
                </span>
              </div>
              <div className="flex justify-between items-center pl-6">
                <span
                  className="text-gray-600 text-sm"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Youth:
                </span>
                <span
                  className="text-gray-700 font-medium text-sm"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  $16.00
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <span
                className="text-lg font-bold text-gray-800"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Total:
              </span>
              <span
                className="text-lg font-bold text-gray-800"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                ${totalCost.toFixed(2)}
              </span>
            </div>
            {error && (
              <p
                className="text-red-500 text-sm mb-2"
                role="alert"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full border border-gray-200 bg-[#A3BFFA] hover:bg-[#8aa9ff] text-white font-bold py-2 px-4 rounded-md flex items-center justify-center text-sm transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={!startDate || !timeSlot}
              aria-label="Book tour"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

BookingForm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default BookingForm;
