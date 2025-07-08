'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, User, X } from 'lucide-react';
import DateInput from '@/components/ui/Custom/DateInput';
import { useLocations } from '@/hooks/useHotels';
import Image from 'next/image';

// Utility function to add days to a date
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

function HeroContent() {
  const [isGuestsDropdownOpen, setIsGuestsDropdownOpen] = useState(false);
  const [guests, setGuests] = useState({ children: 0, adult: 0 });
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);

  const dateFromPickerRef = useRef(null);
  const dateToPickerRef = useRef(null);
  const guestsDropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchDropdownRef = useRef(null);

  const router = useRouter();
  const totalGuests = guests.children + guests.adult;

  const { data: locationsData, isLoading, error } = useLocations(searchQuery);
  const locations = locationsData?.data || [];
  const errorMessage = locationsData?.errorMessage;

  // Filter locations case-insensitively for additional client-side matching
  const filteredLocations = locations.filter((location) =>
    location.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutside = (ref) =>
        ref.current && !ref.current.contains(event.target);
      if (isOutside(dateFromPickerRef)) setSelectedDateFrom((prev) => prev);
      if (isOutside(dateToPickerRef)) setSelectedDateTo((prev) => prev);
      if (isOutside(guestsDropdownRef)) setIsGuestsDropdownOpen(false);
      if (isOutside(searchDropdownRef) && isOutside(searchInputRef))
        setIsSearchDropdownOpen(false);
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
      location_id: selectedCity.id,
      checkin: formatDateToApi(selectedDateFrom),
      checkout: formatDateToApi(selectedDateTo),
      adults: String(guests.adult),
      children: String(guests.children),
    }).toString();
    router.push(`/hotels-list?${queryParams}`);
  };

  const handleCitySelect = (location) => {
    setSelectedCity(location);
    setSearchQuery(location.title);
    setIsSearchDropdownOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedCity(null);
    setIsSearchDropdownOpen(true);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedCity(null);
    setIsSearchDropdownOpen(false);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 text-center -mt-8">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        .hero-title {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        .hero-subtitle {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          letter-spacing: 0.01em;
        }
        .transition-wrapper {
          transition:
            background 0.3s,
            border 0.3s,
            border-radius 0.3s,
            box-shadow 0.3s,
            transform 0.4s;
        }
        .curved-arrow {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>

      <h1 className="hero-title text-xl sm:text-4xl md:text-5xl lg:text-5xl text-white mb-3 sm:mb-4">
        Where Would You Like To Go?
      </h1>
      <p className="hero-subtitle text-sm sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 px-2 sm:px-0">
        Checkout Beautiful Places Around The World
      </p>

      <div onSubmit={(e) => e.preventDefault()} className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-xl border border-white/20">
          <div className="lg:col-span-1 relative" ref={searchInputRef}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search for a city"
                className="w-full h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                onFocus={() =>
                  searchQuery.length >= 4 && setIsSearchDropdownOpen(true)
                }
                aria-label="Search for a city"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              )}
            </div>
            {isSearchDropdownOpen && searchQuery.length >= 4 && (
              <div
                className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 sm:mt-2 z-50 shadow-xl max-h-60 overflow-y-auto"
                ref={searchDropdownRef}
                aria-label="City search results"
              >
                {isLoading ? (
                  <div className="p-3 sm:p-4 text-gray-500 text-sm sm:text-base flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading cities...
                  </div>
                ) : errorMessage ? (
                  <div className="p-3 sm:p-4 text-red-500 text-sm sm:text-base">
                    {errorMessage}
                  </div>
                ) : filteredLocations.length > 0 ? (
                  filteredLocations.map((location) => (
                    <div
                      key={location.id}
                      onClick={() => handleCitySelect(location)}
                      className="p-3 sm:p-4 flex items-center gap-3 hover:bg-gray-100 cursor-pointer transition"
                      role="option"
                      aria-selected={selectedCity?.id === location.id}
                    >
                      <Image
                        src={location.image}
                        alt={location.title}
                        width={40}
                        height={40}
                        className="object-cover rounded"
                      />
                      <span className="text-gray-900 text-sm sm:text-base">
                        {location.title}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 sm:p-4 text-gray-500 text-sm sm:text-base">
                    No cities found
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-1" ref={dateFromPickerRef}>
            <DateInput
              selectedDate={selectedDateFrom}
              onChange={setSelectedDateFrom}
              placeholder="Check-in"
              minDate={today}
              className="h-10 sm:h-12 text-sm sm:text-base"
              aria-label="Select check-in date"
            />
          </div>

          <div className="lg:col-span-1" ref={dateToPickerRef}>
            <DateInput
              selectedDate={selectedDateTo}
              onChange={setSelectedDateTo}
              placeholder="Check-out"
              minDate={selectedDateFrom ? addDays(selectedDateFrom, 1) : today}
              disabled={!selectedDateFrom}
              className="h-10 sm:h-12 text-sm sm:text-base"
              aria-label="Select check-out date"
            />
          </div>

          <div className="lg:col-span-1 relative" ref={guestsDropdownRef}>
            <button
              type="button"
              onClick={() => setIsGuestsDropdownOpen(!isGuestsDropdownOpen)}
              className="w-full h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base rounded-lg border border-gray-200 bg-white text-left text-gray-900 flex items-center gap-2 sm:gap-3 transition hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Select number of guests"
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
                      <div className="flex items-center gap-3 sm:gap-1">
                        <button
                          type="button"
                          onClick={() => handleGuestChange(category, false)}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                          disabled={guests[category] === 0}
                          aria-label={`Decrease number of ${category}`}
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
                          aria-label={`Increase number of ${category}`}
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

          <div className="lg:col-span-1 sm:col-span-2">
            <button
              type="button"
              onClick={handleSearch}
              className="w-full h-10 sm:h-12 bg-blue-500 hover:bg-blue-400 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg text-sm sm:text-base"
              aria-label="Search for hotels"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="transition-wrapper mt-8 sm:mt-12 md:mt-16">
        <div className="relative flex flex-col items-center">
          <div className="curved-arrow mb-4 sm:mb-6 absolute left-68 top-14 hidden sm:block">
            <img
              src="/images/line-arrow.png"
              alt="Arrow pointing down"
              className="w-16 h-12 sm:w-20 sm:h-16 md:w-24 md:h-20 object-contain opacity-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroContent;
