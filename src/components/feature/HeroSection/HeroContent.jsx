'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import toast, { Toaster } from 'react-hot-toast';
import { SearchButton } from '@/components/ui/LoadingButton';
import {
  Search,
  X,
  Hotel,
  MapPin,
  Ticket,
  Car,
  Compass,
  Loader2,
  AlertCircle,
  CheckCircle,
  Users,
  ArrowRight,
} from 'lucide-react';
import DateInput from '@/components/ui/Custom/DateInput';
import { useLocations } from '@/hooks/useHotels';

// Utility function to add days to a date
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Enhanced service options with better visual hierarchy
const serviceOptions = [
  {
    id: 'hotels',
    label: 'Hotels',
    icon: Hotel,
    available: true,
    route: '/hotels-list',
    color: 'from-blue-500 to-blue-600',
    description: 'Find the perfect stay',
  },
  {
    id: 'tours',
    label: 'Tours & Experiences',
    icon: Compass,
    available: false,
    route: '/tours',
    color: 'from-blue-500 to-blue-600',
    description: 'Coming Soon',
  },
  {
    id: 'attractions',
    label: 'Attraction Tickets',
    icon: Ticket,
    available: false,
    route: '/attractions',
    color: 'from-blue-500 to-blue-600',
    description: 'Coming Soon',
  },
  {
    id: 'transport',
    label: 'Transport',
    icon: MapPin,
    available: false,
    route: '/transport',
    color: 'from-blue-500 to-blue-600',
    description: 'Coming Soon',
  },
  {
    id: 'cars',
    label: 'Car Rentals',
    icon: Car,
    available: false,
    route: '/car-rentals',
    color: 'from-blue-500 to-blue-600',
    description: 'Coming Soon',
  },
];

function HeroContent() {
  const [selectedService, setSelectedService] = useState('hotels');
  const [isGuestsDropdownOpen, setIsGuestsDropdownOpen] = useState(false);
  const [guests, setGuests] = useState({ children: 0, adult: 1 });
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

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

  // Enhanced intersection observer for better performance
  const { ref: contentRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px',
  });

  // Filter locations case-insensitively for additional client-side matching
  const filteredLocations = locations.filter((location) =>
    location.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Enhanced click outside handling with better performance
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

  // Enhanced service selection with better feedback
  const handleServiceSelect = useCallback(
    (serviceId) => {
      const service = serviceOptions.find((s) => s.id === serviceId);

      if (!service.available) {
        toast.error('Coming Soon!', {
          duration: 3000,
          position: 'top-center',
        });
        return;
      }

      // If it's hotels, use the existing hotel search functionality
      if (serviceId === 'hotels') {
        setSelectedService(serviceId);
        toast.success(`Selected ${service.label}`, {
          duration: 2000,
          position: 'top-center',
        });
        return;
      }

      // For other services, navigate to their dedicated pages
      if (service.route) {
        toast.loading(`Redirecting to ${service.label}...`, {
          duration: 1000,
          position: 'top-center',
        });
        setTimeout(() => {
          router.push(service.route);
        }, 1000);
        return;
      }

      setSelectedService(serviceId);
    },
    [router]
  );

  // Enhanced guest management with validation
  const handleGuestChange = useCallback((category, increment) => {
    setGuests((prev) => {
      const newValue = Math.max(0, prev[category] + (increment ? 1 : -1));

      // Ensure at least one adult
      if (category === 'adult' && newValue === 0) {
        toast.error('At least one adult is required', {
          duration: 3000,
          position: 'top-center',
        });
        return prev;
      }

      return {
        ...prev,
        [category]: newValue,
      };
    });
  }, []);

  // Enhanced date formatting with validation
  const formatDateToApi = useCallback((date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  // Enhanced search with better error handling and loading states
  const handleSearch = useCallback(async () => {
    // Clear previous errors
    setSearchError(null);

    // Validation with better user feedback
    if (!selectedCity) {
      setSearchError('Please select a destination city');
      toast.error('Please select a destination city', {
        duration: 4000,
        position: 'top-center',
      });
      return;
    }

    if (!selectedDateFrom) {
      setSearchError('Please select a check-in date');
      toast.error('Please select a check-in date', {
        duration: 4000,
        position: 'top-center',
      });
      return;
    }

    if (!selectedDateTo) {
      setSearchError('Please select a check-out date');
      toast.error('Please select a check-out date', {
        duration: 4000,
        position: 'top-center',
      });
      return;
    }

    if (totalGuests === 0) {
      setSearchError('Please select at least one guest');
      toast.error('Please select at least one guest', {
        duration: 4000,
        position: 'top-center',
      });
      return;
    }

    // Check if checkout is after checkin
    if (selectedDateTo <= selectedDateFrom) {
      setSearchError('Check-out date must be after check-in date');
      toast.error('Check-out date must be after check-in date', {
        duration: 4000,
        position: 'top-center',
      });
      return;
    }

    setIsSearching(true);

    try {
      const queryParams = new URLSearchParams({
        location_id: selectedCity.id,
        checkin: formatDateToApi(selectedDateFrom),
        checkout: formatDateToApi(selectedDateTo),
        adults: String(guests.adult),
        children: String(guests.children),
      }).toString();

      toast.success('Searching for hotels...', {
        duration: 2000,
        position: 'top-center',
      });

      // Simulate search delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1500));

      router.push(`/hotels-list?${queryParams}`);
    } catch (error) {
      setSearchError('An error occurred while searching. Please try again.');
      toast.error('Search failed. Please try again.', {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setIsSearching(false);
    }
  }, [
    selectedCity,
    selectedDateFrom,
    selectedDateTo,
    guests,
    formatDateToApi,
    router,
  ]);

  // Enhanced city selection with better UX
  const handleCitySelect = useCallback((location) => {
    setSelectedCity(location);
    setSearchQuery(location.title);
    setIsSearchDropdownOpen(false);
    setSearchError(null);

    toast.success(`Selected ${location.title}`, {
      duration: 2000,
      position: 'top-center',
    });
  }, []);

  // Enhanced input handling with debouncing
  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSelectedCity(null);
    setSearchError(null);

    if (value.length >= 3) {
      setIsSearchDropdownOpen(true);
    } else {
      setIsSearchDropdownOpen(false);
    }
  }, []);

  // Enhanced clear search with confirmation
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setSelectedCity(null);
    setIsSearchDropdownOpen(false);
    setSearchError(null);

    toast.success('Search cleared', {
      duration: 2000,
      position: 'top-center',
    });
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Animation variants for enhanced performance
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div
      ref={contentRef}
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 text-center"
    >
      {/* Enhanced Typography with Better Hierarchy */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="mb-8 sm:mb-12"
      >
        {/* Enhanced Main Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight"
          style={{
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            willChange: 'transform',
          }}
        >
          Where Would You Like
          <span className="block bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            To Go?
          </span>
        </motion.h1>

        {/* Enhanced Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-light"
        >
          Discover breathtaking destinations and create unforgettable memories
          with our curated travel experiences
        </motion.p>
      </motion.div>

      {/* Enhanced Service Selection Tabs */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="mb-6 sm:mb-8"
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl border border-white/30 inline-block">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {serviceOptions.map((service, index) => {
              const IconComponent = service.icon;
              const isSelected = selectedService === service.id;
              const isAvailable = service.available;

              return (
                <motion.button
                  key={service.id}
                  variants={itemVariants}
                  onClick={() => handleServiceSelect(service.id)}
                  className={`
                    group relative flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300
                    ${
                      isSelected && isAvailable
                        ? `bg-gradient-to-r ${service.color} text-white shadow-lg transform scale-105`
                        : !isAvailable
                          ? 'text-gray-400 bg-gray-100 cursor-not-allowed opacity-60'
                          : 'text-gray-700 hover:bg-gray-100/80 hover:scale-105'
                    }
                    active:scale-95
                  `}
                  whileHover={isAvailable ? { y: -2 } : {}}
                  whileTap={isAvailable ? { scale: 0.98 } : {}}
                  aria-label={`Select ${service.label}`}
                >
                  <IconComponent className="h-4 w-4 flex-shrink-0" />
                  <span className="hidden sm:inline whitespace-nowrap">
                    {service.label}
                  </span>
                  <span className="sm:hidden">
                    {service.label.split(' ')[0]}
                  </span>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-[9999]">
                    {service.description}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Enhanced Search Form */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="w-full"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/30">
          {/* Enhanced City Search */}
          <div className="lg:col-span-1 relative" ref={searchInputRef}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search for a city"
                className={`w-full h-12 sm:h-14 px-4 text-base rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  searchError && !selectedCity
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-white'
                }`}
                onFocus={() =>
                  searchQuery.length >= 3 && setIsSearchDropdownOpen(true)
                }
                aria-label="Search for a city"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-5 w-5" />
                </button>
              )}

              {selectedCity && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                </div>
              )}
            </div>

            {/* Enhanced Search Dropdown */}
            <AnimatePresence>
              {isSearchDropdownOpen && searchQuery.length >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl mt-2 z-[9999] shadow-2xl max-h-60 overflow-y-auto"
                  ref={searchDropdownRef}
                  aria-label="City search results"
                >
                  {isLoading ? (
                    <div className="p-4 text-gray-500 text-base flex items-center gap-3">
                      <Loader2 className="animate-spin h-5 w-5 text-blue-500" />
                      <span>Searching cities...</span>
                    </div>
                  ) : errorMessage ? (
                    <div className="p-4 text-red-500 text-base flex items-center gap-3">
                      <AlertCircle className="h-5 w-5" />
                      <span>{errorMessage}</span>
                    </div>
                  ) : filteredLocations.length > 0 ? (
                    filteredLocations.map((location) => (
                      <motion.div
                        key={location.id}
                        onClick={() => handleCitySelect(location)}
                        className="p-4 flex items-center hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                        role="option"
                        aria-selected={selectedCity?.id === location.id}
                        whileHover={{ backgroundColor: '#f9fafb' }}
                      >
                        <span className="text-gray-900 text-base font-medium">
                          {location.title}
                        </span>
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-4 text-gray-500 text-base">
                      No cities found
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Enhanced Date Inputs */}
          <div className="lg:col-span-1" ref={dateFromPickerRef}>
            <DateInput
              selectedDate={selectedDateFrom}
              onChange={setSelectedDateFrom}
              placeholder="Check-in"
              minDate={today}
              className={`h-12 sm:h-14 text-base ${
                searchError && !selectedDateFrom
                  ? 'border-red-500 bg-red-50'
                  : ''
              }`}
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
              className={`h-12 sm:h-14 text-base ${
                searchError && !selectedDateTo ? 'border-red-500 bg-red-50' : ''
              }`}
              aria-label="Select check-out date"
            />
          </div>

          {/* Enhanced Guests Selection */}
          <div className="lg:col-span-1 relative" ref={guestsDropdownRef}>
            <button
              type="button"
              onClick={() => setIsGuestsDropdownOpen(!isGuestsDropdownOpen)}
              className={`w-full h-12 sm:h-14 px-4 text-base rounded-xl border transition-all duration-300 text-left flex items-center gap-3 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                searchError && totalGuests === 0
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 bg-white'
              }`}
              aria-label="Select number of guests"
            >
              <Users className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <span
                className={`truncate ${totalGuests > 0 ? 'text-gray-900' : 'text-gray-500'}`}
              >
                {totalGuests > 0
                  ? `${totalGuests} Guest${totalGuests > 1 ? 's' : ''}`
                  : 'Guests'}
              </span>
              <svg
                className={`ml-auto h-5 w-5 text-gray-400 transition-transform duration-200 ${
                  isGuestsDropdownOpen ? 'rotate-180' : ''
                }`}
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

            {/* Enhanced Guests Dropdown */}
            <AnimatePresence>
              {isGuestsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl mt-2 z-[9999] shadow-2xl"
                >
                  <div className="p-4 space-y-4">
                    {['adult', 'children'].map((category) => (
                      <div
                        key={category}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-700 capitalize font-medium text-base">
                          {category === 'adult' ? 'Adults' : 'Children'}
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleGuestChange(category, false)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
                            disabled={
                              guests[category] === 0 ||
                              (category === 'adult' && guests[category] === 1)
                            }
                            aria-label={`Decrease number of ${category}`}
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-medium text-gray-900 text-base">
                            {guests[category]}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleGuestChange(category, true)}
                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors text-base"
                            aria-label={`Increase number of ${category}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Enhanced Search Button */}
          <div className="lg:col-span-1 sm:col-span-2">
            <motion.button
              type="button"
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full min-w-[200px] h-12 sm:h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold gap-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl hover:scale-105 flex flex-row items-center justify-center disabled:cursor-not-allowed"
              whileHover={!isSearching ? { scale: 1.02 } : {}}
              whileTap={!isSearching ? { scale: 0.98 } : {}}
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin flex-shrink-0" />
                  <span className="whitespace-nowrap">Searching...</span>
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 flex-shrink-0" />
                  <span className="whitespace-nowrap">Search</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Enhanced Error Display */}
        {searchError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2 max-w-md mx-auto"
          >
            <AlertCircle className="h-5 w-5" />
            <span>{searchError}</span>
          </motion.div>
        )}
      </motion.div>

      {/* Toast Notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#3b82f6',
            color: '#fff',
            border: '1px solid #2563eb',
            borderRadius: '12px',
            fontSize: '14px',
            padding: '16px',
            marginTop: '10px',
          },
          success: {
            icon: null,
            style: {
              background: '#3b82f6',
              color: '#fff',
              border: '1px solid #2563eb',
              borderRadius: '12px',
              fontSize: '14px',
              padding: '16px',
              marginTop: '10px',
            },
          },
          error: {
            icon: null,
            style: {
              background: '#ef4444',
              color: '#fff',
              border: '1px solid #dc2626',
              borderRadius: '12px',
              fontSize: '14px',
              padding: '16px',
              marginTop: '10px',
            },
          },
          loading: {
            icon: null,
            style: {
              background: '#3b82f6',
              color: '#fff',
              border: '1px solid #2563eb',
              borderRadius: '12px',
              fontSize: '14px',
              padding: '16px',
              marginTop: '10px',
            },
          },
        }}
      />
    </div>
  );
}

export default HeroContent;
