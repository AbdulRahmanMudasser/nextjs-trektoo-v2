'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import toast, { Toaster } from 'react-hot-toast';
import {
  Search,
  Loader2,
  AlertCircle,
  Calendar,
  MapPin,
  Users,
  Car,
  Building,
  Ticket,
} from 'lucide-react';
import DateInput from '@/components/ui/Custom/DateInput';
import { useLocations } from '@/hooks/useHotels';

// Utility function to add days to a date
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Service options with new design system
const serviceOptions = [
  {
    id: 'hotels',
    label: 'Hotels',
    icon: Building,
    available: true,
    route: '/hotels-list',
    color: 'from-blue-500 to-blue-600',
    description: 'Find the perfect stay',
  },
  {
    id: 'cars',
    label: 'Car Rentals',
    icon: Car,
    available: true,
    route: '/car-rentals',
    color: 'from-blue-500 to-blue-600',
    description: 'Rent your perfect ride',
  },
  {
    id: 'activities',
    label: 'Activities',
    icon: Ticket,
    available: true,
    route: '/activities',
    color: 'from-blue-500 to-blue-600',
    description: 'Discover amazing activities',
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

      // For cars and experiences, navigate to their dedicated pages
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
    <div ref={contentRef} className="w-full mx-auto px-4 sm:px-6">
      {/* Centered Layout with New Design System */}
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-12">
        {/* Main Heading with New Color Palette */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-8 text-center"
        >
          {/* Primary Headline */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-800 leading-tight"
              style={{
                fontFamily:
                  "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
                letterSpacing: '-0.02em',
              }}
            >
              Life's an{' '}
              <span className="text-blue-500 relative">
                adventure
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10C50 2 100 2 198 10"
                    stroke="#E0C097"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              , live it!
            </h1>
          </motion.div>

          {/* Subheading with New Typography */}
          <motion.div
            variants={itemVariants}
            className="space-y-4 max-w-4xl mx-auto"
          >
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
              Discover amazing destinations, book unforgettable experiences, and
              create memories that last a lifetime.
            </p>
          </motion.div>
        </motion.div>

        {/* Compact Search Form with Integrated Service Tabs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative w-full max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-visible">
            {/* Service Tabs - Top of the search form */}
            <div className="bg-gray-50 px-4 sm:px-6 pt-4 sm:pt-6 pb-4 border-b border-gray-100">
              <div className="flex flex-wrap justify-center gap-2">
                {serviceOptions.map((service, index) => {
                  const IconComponent = service.icon;
                  const isSelected = selectedService === service.id;

                  return (
                    <motion.button
                      key={service.id}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                      onClick={() => handleServiceSelect(service.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-sm ${
                        isSelected
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      {service.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Compact Search Fields */}
            <div className="p-4 sm:p-6 overflow-visible">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-4 mb-6">
                {/* Location Input - 3 Columns */}
                <div
                  className="sm:col-span-2 lg:col-span-3 relative"
                  ref={searchInputRef}
                >
                  <label className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-500" />
                    Destination
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder="Where to?"
                    className={`w-full h-12 sm:h-14 px-4 text-base justify-start text-left font-normal border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition rounded-xl ${
                      searchError
                        ? 'border-red-300'
                        : 'border-gray-200 focus:border-blue-500'
                    } focus:outline-none bg-gray-50`}
                    onFocus={() =>
                      searchQuery.length >= 3 && setIsSearchDropdownOpen(true)
                    }
                    aria-label="Search for a city"
                  />
                  {searchError && (
                    <p className="text-red-500 text-xs mt-1">{searchError}</p>
                  )}

                  {/* Location Dropdown */}
                  <AnimatePresence>
                    {isSearchDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-[60] w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-xl max-h-48 overflow-y-auto"
                      >
                        {isLoading ? (
                          <div className="p-3 text-gray-500 text-sm flex items-center gap-2">
                            <Loader2 className="animate-spin h-4 w-4 text-blue-500" />
                            <span>Searching cities...</span>
                          </div>
                        ) : errorMessage ? (
                          <div className="p-3 text-red-500 text-sm flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errorMessage}</span>
                          </div>
                        ) : filteredLocations.length > 0 ? (
                          filteredLocations.map((location) => (
                            <button
                              key={location.id}
                              onClick={() => handleCitySelect(location)}
                              className="w-full p-3 text-left hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0 text-sm"
                            >
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3 h-3 text-gray-400" />
                                {location.title}
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="p-3 text-gray-500 text-sm">
                            No cities found
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Check-in Date Field */}
                <div className="sm:col-span-1 lg:col-span-2">
                  <label className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-blue-500" />
                    Check-in
                  </label>
                  <DateInput
                    selectedDate={selectedDateFrom}
                    onChange={setSelectedDateFrom}
                    placeholder="Check-in"
                    minDate={today}
                    className="w-full"
                  />
                  {searchError && (
                    <p className="text-red-500 text-xs mt-1">{searchError}</p>
                  )}
                </div>

                {/* Check-out Date Field */}
                <div className="sm:col-span-1 lg:col-span-2">
                  <label className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-blue-500" />
                    Check-out
                  </label>
                  <DateInput
                    selectedDate={selectedDateTo}
                    onChange={setSelectedDateTo}
                    placeholder="Check-out"
                    minDate={selectedDateFrom || today}
                    className="w-full"
                  />
                  {searchError && (
                    <p className="text-red-500 text-xs mt-1">{searchError}</p>
                  )}
                </div>

                {/* Guests - 3 Columns */}
                <div
                  className="sm:col-span-2 lg:col-span-3 relative"
                  ref={guestsDropdownRef}
                >
                  <label className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
                    <Users className="w-3 h-3 text-blue-500" />
                    Guests
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setIsGuestsDropdownOpen(!isGuestsDropdownOpen)
                    }
                    className={`w-full h-12 sm:h-14 px-4 text-base justify-start text-left font-normal border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition rounded-xl ${
                      searchError
                        ? 'border-red-300'
                        : 'border-gray-200 focus:border-blue-500'
                    } focus:outline-none bg-gray-50 flex items-center justify-between ${
                      totalGuests === 0 ? 'text-gray-500' : 'text-gray-900'
                    }`}
                  >
                    <span className="truncate">
                      {totalGuests > 0
                        ? `${totalGuests} guest${totalGuests !== 1 ? 's' : ''}`
                        : 'Select guests'}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ml-2 ${isGuestsDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {searchError && (
                    <p className="text-red-500 text-xs mt-1">{searchError}</p>
                  )}

                  {/* Compact Guest Dropdown with Higher Z-Index */}
                  <AnimatePresence>
                    {isGuestsDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-[9999] w-full bg-white border border-gray-200 rounded-lg mt-2 shadow-2xl p-4"
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '0',
                          right: '0',
                          zIndex: 9999,
                          minWidth: '300px',
                        }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col items-center text-center">
                            <div className="mb-3">
                              <h4 className="font-semibold text-gray-800 text-sm">
                                Adults
                              </h4>
                              <p className="text-xs text-gray-500">Ages 13+</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() =>
                                  handleGuestChange('adult', false)
                                }
                                disabled={guests.adult <= 1}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-500 disabled:opacity-50 text-sm font-semibold transition-all duration-200"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-bold text-gray-900 text-base">
                                {guests.adult}
                              </span>
                              <button
                                onClick={() => handleGuestChange('adult', true)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-500 text-sm font-semibold transition-all duration-200"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="flex flex-col items-center text-center">
                            <div className="mb-3">
                              <h4 className="font-semibold text-gray-800 text-sm">
                                Children
                              </h4>
                              <p className="text-xs text-gray-500">Ages 2-12</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() =>
                                  handleGuestChange('children', false)
                                }
                                disabled={guests.children <= 0}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-500 disabled:opacity-50 text-sm font-semibold transition-all duration-200"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-bold text-gray-900 text-base">
                                {guests.children}
                              </span>
                              <button
                                onClick={() =>
                                  handleGuestChange('children', true)
                                }
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-blue-500 text-sm font-semibold transition-all duration-200"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Compact Search Button */}
              <motion.button
                onClick={handleSearch}
                disabled={isSearching}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Search{' '}
                    {selectedService === 'hotels'
                      ? 'Hotels'
                      : selectedService === 'cars'
                        ? 'Cars'
                        : 'Activities'}
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Error Display */}
      {searchError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2 max-w-md mx-auto"
        >
          <AlertCircle className="h-5 w-5" />
          <span>{searchError}</span>
        </motion.div>
      )}

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
