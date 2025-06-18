'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, User } from 'lucide-react';
import DateInput from '@/components/ui/Custom/DateInput';
import { addDays } from 'date-fns';

function HeroContent() {
  const [isGuestsDropdownOpen, setIsGuestsDropdownOpen] = useState(false);
  const [guests, setGuests] = useState({ children: 0, adult: 0 });
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');

  const dateFromPickerRef = useRef(null);
  const dateToPickerRef = useRef(null);
  const guestsDropdownRef = useRef(null);

  const router = useRouter();
  const totalGuests = guests.children + guests.adult;

  const cities = [
    'Seoul',
    'Beijing',
    'Dubai',
    'Cairo',
    'Luxor',
    'Tokyo',
    'Kyoto',
    'Osaka',
    'Singapore',
    'Paris',
    'Rome',
    'Barcelona',
    'Bangkok',
    'Chiang Mai',
    'Phuket',
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutside = (ref) =>
        ref.current && !ref.current.contains(event.target);
      if (isOutside(dateFromPickerRef)) setSelectedDateFrom((prev) => prev);
      if (isOutside(dateToPickerRef)) setSelectedDateTo((prev) => prev);
      if (isOutside(guestsDropdownRef)) setIsGuestsDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleGuestChange = (category, increment) => {
    setGuests((prev) => ({
      ...prev,
      [category]: Math.max(0, prev[category] + (increment ? 1 : -1)),
    }));
  };

  const formatDateToApi = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSearch = () => {
    if (!selectedCity || !selectedDateFrom || !selectedDateTo) {
      alert('Please select a city, check-in date, and check-out date.');
      return;
    }

    if (totalGuests === 0) {
      alert('Please select at least one guest.');
      return;
    }

    const queryParams = new URLSearchParams({
      city: selectedCity,
      checkin: formatDateToApi(selectedDateFrom),
      checkout: formatDateToApi(selectedDateTo),
      adults: String(guests.adult),
      children: String(guests.children),
    }).toString();

    router.push(`/tourslist?${queryParams}`);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 text-center">
      {/* Custom font styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

        .hero-title {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          letter-spacing: -0.02em;
        }

        .hero-subtitle {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          letter-spacing: 0.01em;
        }
      `}</style>

      {/* Responsive Typography - Optimized for mobile, original for large */}
      <h1 className="hero-title text-xl sm:text-4xl md:text-5xl lg:text-5xl text-white mb-3 sm:mb-4">
        Find Your Perfect Hotel
      </h1>
      <p className="hero-subtitle text-sm sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 px-2 sm:px-0">
        Explore the world with our curated hotel selections
      </p>

      <form onSubmit={(e) => e.preventDefault()} className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-xl border border-white/20">
          {/* City Selection */}
          <div className="lg:col-span-1">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none cursor-pointer hover:border-gray-300"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")",
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem',
              }}
            >
              <option value="" disabled>
                Select City
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Check-in Date */}
          <div className="lg:col-span-1" ref={dateFromPickerRef}>
            <DateInput
              selectedDate={selectedDateFrom}
              onChange={setSelectedDateFrom}
              placeholder="Check-in"
              minDate={today}
              className="h-10 sm:h-12 text-sm sm:text-base"
            />
          </div>

          {/* Check-out Date */}
          <div className="lg:col-span-1" ref={dateToPickerRef}>
            <DateInput
              selectedDate={selectedDateTo}
              onChange={setSelectedDateTo}
              placeholder="Check-out"
              minDate={selectedDateFrom ? addDays(selectedDateFrom, 1) : today}
              disabled={!selectedDateFrom}
              className="h-10 sm:h-12 text-sm sm:text-base"
            />
          </div>

          {/* Guests Selection */}
          <div className="lg:col-span-1 relative" ref={guestsDropdownRef}>
            <button
              type="button"
              onClick={() => setIsGuestsDropdownOpen(!isGuestsDropdownOpen)}
              className="w-full h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-lg border border-gray-200 bg-white text-left text-gray-900 flex items-center gap-2 sm:gap-3 transition hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
              <span
                className={`${totalGuests > 0 ? 'text-gray-900' : 'text-gray-500'} truncate`}
              >
                {totalGuests > 0
                  ? `${totalGuests} Guest${totalGuests > 1 ? 's' : ''}`
                  : 'Guests'}
              </span>
              <svg
                className={`ml-auto h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-transform ${isGuestsDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 20 20"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 8l4 4 4-4"
                />
              </svg>
            </button>

            {isGuestsDropdownOpen && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 sm:mt-2 z-50 shadow-xl">
                <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
                  {['adult', 'children'].map((category) => (
                    <div
                      key={category}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-700 capitalize font-medium flex-shrink-0 text-sm sm:text-base">
                        {category === 'adult' ? 'Adults' : 'Children'}
                      </span>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button
                          type="button"
                          onClick={() => handleGuestChange(category, false)}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                          disabled={guests[category] === 0}
                        >
                          -
                        </button>
                        <span className="w-5 sm:w-6 text-center font-medium text-gray-900 text-sm sm:text-base">
                          {guests[category]}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleGuestChange(category, true)}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition text-sm sm:text-base"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <div className="lg:col-span-1 sm:col-span-2">
            <button
              type="button"
              onClick={handleSearch}
              className="w-full h-10 sm:h-12 bg-blue-500 hover:bg-blue-400 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg text-sm sm:text-base"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default HeroContent;
